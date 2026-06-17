const fs = require("fs");
const path = require("path");
const http = require("http");
const { chromium } = require("playwright");

const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "figma-mobile-prototype-plugin");
const ASSET_DIR = path.join(OUT_DIR, "assets");
const REPORT_PATH = path.join(OUT_DIR, "prototype-report.json");
const PORT = Number(process.env.MOBILE_PORT || 4174);
const BASE_URL = `http://127.0.0.1:${PORT}/mobile/`;
const VIEWPORT = { width: 430, height: 932 };
const DISPATCH_IDS = ["INC-9823", "INC-9844", "INC-9851"];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function resetOutput() {
  fs.rmSync(ASSET_DIR, { recursive: true, force: true });
  fs.rmSync(path.join(OUT_DIR, "code.js"), { force: true });
  fs.rmSync(path.join(OUT_DIR, "manifest.json"), { force: true });
  fs.rmSync(REPORT_PATH, { force: true });
  ensureDir(ASSET_DIR);
}

function contentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".html") return "text/html; charset=utf-8";
  if (ext === ".css") return "text/css; charset=utf-8";
  if (ext === ".js") return "application/javascript; charset=utf-8";
  if (ext === ".png") return "image/png";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".webp") return "image/webp";
  if (ext === ".svg") return "image/svg+xml";
  return "application/octet-stream";
}

function startServer() {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, BASE_URL);
    const requested = decodeURIComponent(
      url.pathname === "/" || url.pathname === "/mobile/" ? "/mobile/index.html" : url.pathname
    );
    const filePath = path.normalize(path.join(ROOT, requested));
    if (!filePath.startsWith(ROOT)) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("Not found");
        return;
      }
      res.writeHead(200, { "Content-Type": contentType(filePath) });
      res.end(data);
    });
  });
  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(PORT, "127.0.0.1", () => resolve(server));
  });
}

function toName(text) {
  return String(text || "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, 54);
}

function appKey(role, view) {
  return `${role}-${view}`;
}

function toastKey(role, view, action) {
  return `${role}-${view}-${action}`;
}

function modalKey(role, view, action) {
  return `${role}-${view}-${action}-modal`;
}

async function getAllBoxes(page, selector, targetFromElement) {
  const boxes = await page.$$eval(selector, (nodes) =>
    nodes
      .map((node) => {
        const rect = node.getBoundingClientRect();
        const style = getComputedStyle(node);
        const text = (node.innerText || node.textContent || node.getAttribute("aria-label") || "").trim();
        const attrs = {};
        for (const attr of node.attributes) attrs[attr.name] = attr.value;
        return {
          text,
          attrs,
          display: style.display,
          visibility: style.visibility,
          isBottomNav: Boolean(node.closest(".bottom-nav")),
          isModal: Boolean(node.closest("#modal-root")),
          x: Math.round(rect.x),
          y: Math.round(rect.y),
          w: Math.round(rect.width),
          h: Math.round(rect.height),
        };
      })
      .filter((box) => box.w > 0 && box.h > 0 && box.display !== "none" && box.visibility !== "hidden")
  );
  return boxes
    .map((box) => {
      const target = targetFromElement(box);
      if (!target) return null;
      return {
        name: toName(box.text || box.attrs.id || target),
        target,
        fixed: Boolean(box.isBottomNav || box.isModal),
        x: box.x,
        y: box.y,
        w: box.w,
        h: box.h,
      };
    })
    .filter(Boolean);
}

function buttonTarget(box, context) {
  const attrs = box.attrs || {};
  const id = attrs.id || "";
  const text = toName(box.text);
  const self = context.key;
  const role = context.role;
  const view = context.view;

  if (attrs["data-role-choice"]) return `login-${attrs["data-role-choice"]}`;
  if (attrs["data-view"]) return appKey(role, attrs["data-view"]);
  if (attrs["data-go"]) return appKey(role, attrs["data-go"]);
  if (attrs["data-accept"]) return toastKey(role, view, `accept-${attrs["data-accept"]}`);
  if ("data-submit-report" in attrs) return toastKey("driver", "report", "submitted");
  if ("data-save-edit" in attrs) return toastKey("driver", "edit", "saved");
  if ("data-modal-close" in attrs) return context.closeTarget || self;
  if ("data-modal-accept" in attrs) return toastKey("tech", view || "home", "modal-accepted");

  if (id === "back-role") return "role";
  if (id === "open-register") return context.role ? `register-${context.role}` : "register-driver";
  if (id === "back-login") return context.closeTarget || `login-${role || "driver"}`;
  if (id === "submit-register") return toastKey(role || "driver", "register", "submitted");
  if (id === "bell-button") {
    return role === "tech" ? modalKey("tech", view || "home", "dispatch") : toastKey("driver", view || "home", "bell");
  }
  if (attrs.type === "submit" || text === "Đăng nhập") return appKey(role || "driver", "home");
  if (text === "Thêm phiếu nghiệm thu") return toastKey("tech", "inspections", "add");
  if (text === "Thêm hóa đơn") return toastKey("tech", "invoices", "add");

  return context.defaultTarget || self;
}

async function getButtonHotspots(page, context) {
  return getAllBoxes(page, context.modalOnly ? "#modal-root button" : "button", (box) =>
    buttonTarget(box, context)
  );
}

function withoutDuplicateHotspots(hotspots) {
  const seen = new Set();
  return hotspots.filter((item) => {
    const key = [item.target, item.x, item.y, item.w, item.h, item.name].join("|");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function capture(page, key, name, hotspots = [], options = {}) {
  await page.waitForTimeout(300);
  const file = `${key}.png`;
  const filePath = path.join(ASSET_DIR, file);
  const nav = await getBottomNavCapture(page, key);
  await setBottomNavVisibility(page, false);
  await page.screenshot({ path: filePath, fullPage: true, type: "png" });
  await setBottomNavVisibility(page, true);
  const size = await page.evaluate(() => ({
    width: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
    height: Math.max(document.documentElement.scrollHeight, document.body.scrollHeight),
  }));
  const buttonSelector = options.modalOnly ? "#modal-root button" : "button";
  const buttonCount = await page.$$eval(buttonSelector, (nodes) =>
    nodes.filter((node) => {
      const rect = node.getBoundingClientRect();
      const style = getComputedStyle(node);
      return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none";
    }).length
  );
  return {
    key,
    name,
    file,
    nav,
    width: size.width,
    height: size.height,
    viewportHeight: VIEWPORT.height,
    buttonCount,
    hotspots: withoutDuplicateHotspots(hotspots),
  };
}

async function getBottomNavCapture(page, key) {
  const navBox = await page
    .$eval(".bottom-nav", (nav) => {
      const modal = document.querySelector("#modal-root:not(.hidden)");
      if (modal) return null;
      const rect = nav.getBoundingClientRect();
      const style = getComputedStyle(nav);
      if (rect.width <= 0 || rect.height <= 0 || style.display === "none" || style.visibility === "hidden") {
        return null;
      }
      return {
        x: Math.round(rect.x),
        y: Math.round(rect.y),
        w: Math.round(rect.width),
        h: Math.round(rect.height),
      };
    })
    .catch(() => null);
  if (!navBox) return null;
  const file = `${key}-nav.png`;
  await page.locator(".bottom-nav").screenshot({ path: path.join(ASSET_DIR, file), type: "png" });
  return { ...navBox, file };
}

async function setBottomNavVisibility(page, visible) {
  await page.evaluate((shouldShow) => {
    const nav = document.querySelector(".bottom-nav");
    if (!nav) return;
    if (shouldShow) {
      nav.style.visibility = nav.dataset.exportPreviousVisibility || "";
      delete nav.dataset.exportPreviousVisibility;
      return;
    }
    nav.dataset.exportPreviousVisibility = nav.style.visibility || "";
    nav.style.visibility = "hidden";
  }, visible);
}

async function gotoFresh(page) {
  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: "networkidle" });
}

async function loginAs(page, role) {
  await gotoFresh(page);
  await page.click(`[data-role-choice="${role}"]`);
  await page.click('button[type="submit"]');
  await page.waitForSelector("#app:not(.hidden)");
  await page.evaluate(() => {
    document.getElementById("toast")?.classList.add("hidden");
    document.getElementById("success-pop")?.classList.add("hidden");
  });
}

async function captureCurrent(page, screens, key, name, context) {
  const hotspots = await getButtonHotspots(page, { key, ...context });
  screens.push(await capture(page, key, name, hotspots, context));
}

async function captureLogin(page, screens, role) {
  await gotoFresh(page);
  await page.click(`[data-role-choice="${role}"]`);
  await captureCurrent(page, screens, `login-${role}`, `Login - ${role}`, {
    role,
    closeTarget: "role",
    defaultTarget: `login-${role}`,
  });
}

async function captureRegister(page, screens, role) {
  await gotoFresh(page);
  await page.click(`[data-role-choice="${role}"]`);
  await page.click("#open-register");
  await captureCurrent(page, screens, `register-${role}`, `Register - ${role}`, {
    role,
    closeTarget: `login-${role}`,
    defaultTarget: `login-${role}`,
  });
}

async function captureRegisterSubmitted(page, screens, role) {
  await gotoFresh(page);
  await page.click(`[data-role-choice="${role}"]`);
  await page.click("#open-register");
  await page.click("#submit-register");
  await captureCurrent(page, screens, toastKey(role, "register", "submitted"), `Register submitted - ${role}`, {
    role,
    closeTarget: `login-${role}`,
    defaultTarget: `login-${role}`,
  });
}

async function captureRoleView(page, screens, role, view) {
  await loginAs(page, role);
  if (view !== "home") await page.click(`[data-view="${view}"]`);
  await captureCurrent(page, screens, appKey(role, view), `${role.toUpperCase()} - ${view}`, {
    role,
    view,
    defaultTarget: appKey(role, view),
  });
}

async function captureToastAfterClick(page, screens, role, view, selector, key, name) {
  await loginAs(page, role);
  if (view !== "home") await page.click(`[data-view="${view}"]`);
  await page.click(selector);
  await captureCurrent(page, screens, key, name, {
    role,
    view,
    defaultTarget: appKey(role, view),
  });
}

async function captureTechDispatchModal(page, screens, view) {
  await loginAs(page, "tech");
  if (view !== "home") await page.click(`[data-view="${view}"]`);
  await page.click("#bell-button");
  await captureCurrent(page, screens, modalKey("tech", view, "dispatch"), `TECH - Dispatch modal - ${view}`, {
    role: "tech",
    view,
    closeTarget: appKey("tech", view),
    defaultTarget: modalKey("tech", view, "dispatch"),
    modalOnly: true,
  });

  await loginAs(page, "tech");
  if (view !== "home") await page.click(`[data-view="${view}"]`);
  await page.click("#bell-button");
  await page.click("[data-modal-accept]");
  await captureCurrent(page, screens, toastKey("tech", view, "modal-accepted"), `TECH - Dispatch accepted - ${view}`, {
    role: "tech",
    view,
    defaultTarget: appKey("tech", view),
  });
}

async function main() {
  resetOutput();
  const server = await startServer();
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148",
  });
  const page = await context.newPage();
  const screens = [];

  try {
    await gotoFresh(page);
    await captureCurrent(page, screens, "role", "Role selection", { defaultTarget: "role" });

    for (const role of ["driver", "tech"]) {
      await captureLogin(page, screens, role);
      await captureRegister(page, screens, role);
      await captureRegisterSubmitted(page, screens, role);
    }

    for (const view of ["home", "report", "edit", "notify"]) {
      await captureRoleView(page, screens, "driver", view);
    }

    for (const view of ["home", "report", "edit", "notify"]) {
      await captureToastAfterClick(
        page,
        screens,
        "driver",
        view,
        "#bell-button",
        toastKey("driver", view, "bell"),
        `DRIVER - Bell toast - ${view}`
      );
    }
    await captureToastAfterClick(page, screens, "driver", "report", "[data-submit-report]", toastKey("driver", "report", "submitted"), "DRIVER - Report submitted");
    await captureToastAfterClick(page, screens, "driver", "edit", "[data-save-edit]", toastKey("driver", "edit", "saved"), "DRIVER - Edit saved");

    const techViews = ["home", "incidents", "inspections", "invoices"];
    for (const view of techViews) {
      await captureRoleView(page, screens, "tech", view);
    }

    for (const view of techViews) {
      await captureTechDispatchModal(page, screens, view);
    }
    for (const dispatchId of DISPATCH_IDS) {
      await captureToastAfterClick(
        page,
        screens,
        "tech",
        "home",
        `[data-accept='${dispatchId}']`,
        toastKey("tech", "home", `accept-${dispatchId}`),
        `TECH - Accept dispatch card - ${dispatchId}`
      );
    }
    await captureToastAfterClick(page, screens, "tech", "inspections", ".full-button", toastKey("tech", "inspections", "add"), "TECH - Add inspection toast");
    await captureToastAfterClick(page, screens, "tech", "invoices", ".full-button", toastKey("tech", "invoices", "add"), "TECH - Add invoice toast");
  } finally {
    await context.close();
    await browser.close();
    server.close();
  }

  writePlugin(screens);
  console.log(`Generated ${screens.length} mobile screens in ${OUT_DIR}`);
}

function writePlugin(screens) {
  const assets = {};
  for (const screen of screens) {
    assets[screen.file] = fs.readFileSync(path.join(ASSET_DIR, screen.file)).toString("base64");
    if (screen.nav) {
      assets[screen.nav.file] = fs.readFileSync(path.join(ASSET_DIR, screen.nav.file)).toString("base64");
    }
  }

  const screenKeys = new Set(screens.map((screen) => screen.key));
  const missingTargets = [];
  for (const screen of screens) {
    for (const hotspot of screen.hotspots) {
      if (!screenKeys.has(hotspot.target)) {
        missingTargets.push({ screen: screen.key, hotspot: hotspot.name, target: hotspot.target });
      }
    }
  }

  fs.writeFileSync(
    REPORT_PATH,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        viewport: VIEWPORT,
        screenCount: screens.length,
        assetCount: Object.keys(assets).length,
        fixedNavAssetCount: screens.filter((screen) => screen.nav).length,
        hotspotCount: screens.reduce((sum, screen) => sum + screen.hotspots.length, 0),
        missingTargets,
        screens: screens.map(({ key, name, file, nav, width, height, viewportHeight, buttonCount, hotspots }) => ({
          key,
          name,
          file,
          nav,
          width,
          height,
          viewportHeight,
          buttonCount,
          hotspotCount: hotspots.length,
          fixedHotspotCount: hotspots.filter((hotspot) => hotspot.fixed).length,
          hotspots: hotspots.map(({ name, target, fixed, x, y, w, h }) => ({ name, target, fixed, x, y, w, h })),
        })),
      },
      null,
      2
    )
  );

  fs.writeFileSync(
    path.join(OUT_DIR, "manifest.json"),
    JSON.stringify(
      {
        name: "J&T Mobile Prototype Importer",
        id: "jt-mobile-prototype-importer",
        api: "1.0.0",
        main: "code.js",
        editorType: ["figma"],
        documentAccess: "current-page",
      },
      null,
      2
    )
  );

  fs.writeFileSync(
    path.join(OUT_DIR, "code.js"),
    `const SCREENS = ${JSON.stringify(screens)};\nconst ASSETS = ${JSON.stringify(assets)};\n\n${pluginRuntime()}`
  );
}

function pluginRuntime() {
  return String.raw`
figma.showUI(
  '<main style="font:12px Inter,Arial,sans-serif;padding:12px;color:#111827">' +
    '<h3 style="margin:0 0 8px;font-size:14px">J&T Mobile Prototype Importer</h3>' +
    '<div id="status">Starting...</div>' +
    '<pre id="log" style="height:260px;overflow:auto;white-space:pre-wrap;background:#f3f4f6;border:1px solid #e5e7eb;padding:8px"></pre>' +
    '<script>onmessage=function(e){var m=e.data.pluginMessage||{};if(m.status)document.getElementById("status").textContent=m.status;if(m.line){var l=document.getElementById("log");l.textContent+=m.line+"\\n";l.scrollTop=l.scrollHeight;}}</script>' +
  '</main>',
  { width: 420, height: 360 }
);

function log(line, status) {
  figma.ui.postMessage({ line, status });
}

function tick() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

function base64ToBytes(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function makeReaction(destinationId) {
  return [{
    trigger: { type: "ON_CLICK" },
    actions: [{
      type: "NODE",
      destinationId,
      navigation: "NAVIGATE",
      transition: null
    }]
  }];
}

async function run() {
  log("Screens: " + SCREENS.length, "Preparing page");
  const page = figma.createPage();
  page.name = "J&T Mobile Prototype";
  await figma.setCurrentPageAsync(page);

  const framesByKey = {};
  const allHotspots = [];
  const gapX = 120;
  const gapY = 160;
  const colWidth = 520;
  let rowY = 0;
  let rowMaxHeight = 0;

  for (let i = 0; i < SCREENS.length; i += 1) {
    const screen = SCREENS[i];
    const col = i % 4;
    if (col === 0 && i > 0) {
      rowY += rowMaxHeight + gapY;
      rowMaxHeight = 0;
    }
    log("Importing " + (i + 1) + "/" + SCREENS.length + ": " + screen.name, "Importing screens");
    const frame = figma.createFrame();
    frame.name = screen.name;
    const frameHeight = Math.min(screen.height, screen.viewportHeight || screen.height);
    frame.resize(screen.width, frameHeight);
    frame.x = col * (colWidth + gapX);
    frame.y = rowY;
    frame.clipsContent = true;
    try {
      frame.overflowDirection = screen.height > frameHeight ? "VERTICAL" : "NONE";
    } catch (error) {
      log("Scroll setup skipped for " + screen.name + ": " + String(error && error.message || error));
    }
    frame.fills = [{ type: "SOLID", color: { r: 0.973, g: 0.973, b: 0.976 } }];
    page.appendChild(frame);

    const image = figma.createImage(base64ToBytes(ASSETS[screen.file]));
    const rect = figma.createRectangle();
    rect.name = "Screen capture";
    rect.resize(screen.width, screen.height);
    rect.fills = [{ type: "IMAGE", imageHash: image.hash, scaleMode: "FILL" }];
    frame.appendChild(rect);

    framesByKey[screen.key] = frame;
    rowMaxHeight = Math.max(rowMaxHeight, frameHeight);
    if (i % 4 === 3) await tick();
  }

  log("Creating hotspots", "Creating hotspots");
  for (const screen of SCREENS) {
    const frame = framesByKey[screen.key];
    const fixedNodes = [];
    const frameHeight = frame.height;
    const normalHotspots = (screen.hotspots || []).filter((hotspot) => !hotspot.fixed);
    const fixedHotspots = (screen.hotspots || []).filter((hotspot) => hotspot.fixed);
    for (const hotspot of normalHotspots) {
      const target = framesByKey[hotspot.target];
      if (!target || hotspot.w <= 0 || hotspot.h <= 0) continue;
      const node = figma.createRectangle();
      node.name = "Hotspot - " + hotspot.name;
      node.x = hotspot.x;
      node.y = hotspot.y;
      node.resize(hotspot.w, hotspot.h);
      node.fills = [{ type: "SOLID", color: { r: 1, g: 0, b: 0 }, opacity: 0.001 }];
      node.strokes = [];
      frame.appendChild(node);
      allHotspots.push({ node, targetId: target.id });
    }
    if (screen.nav && ASSETS[screen.nav.file]) {
      const navImage = figma.createImage(base64ToBytes(ASSETS[screen.nav.file]));
      const navRect = figma.createRectangle();
      navRect.name = "Fixed bottom nav";
      navRect.x = screen.nav.x || 0;
      navRect.y = frameHeight - screen.nav.h;
      navRect.resize(screen.nav.w, screen.nav.h);
      navRect.fills = [{ type: "IMAGE", imageHash: navImage.hash, scaleMode: "FILL" }];
      frame.appendChild(navRect);
      fixedNodes.push(navRect);
    }
    for (const hotspot of fixedHotspots) {
      const target = framesByKey[hotspot.target];
      if (!target || hotspot.w <= 0 || hotspot.h <= 0) continue;
      const node = figma.createRectangle();
      node.name = "Fixed hotspot - " + hotspot.name;
      node.x = hotspot.x;
      node.y = screen.nav && hotspot.y >= screen.nav.y ? frameHeight - screen.nav.h + (hotspot.y - screen.nav.y) : hotspot.y;
      node.resize(hotspot.w, hotspot.h);
      node.fills = [{ type: "SOLID", color: { r: 1, g: 0, b: 0 }, opacity: 0.001 }];
      node.strokes = [];
      frame.appendChild(node);
      fixedNodes.push(node);
      allHotspots.push({ node, targetId: target.id });
    }
    if (fixedNodes.length > 0) {
      try {
        frame.numberOfFixedChildren = fixedNodes.length;
      } catch (error) {
        log("Fixed children setup skipped for " + screen.name + ": " + String(error && error.message || error));
      }
    }
    await tick();
  }

  let linked = 0;
  let failed = 0;
  log("Hotspots: " + allHotspots.length, "Linking prototype");
  for (const item of allHotspots) {
    try {
      item.node.reactions = makeReaction(item.targetId);
      linked += 1;
    } catch (error) {
      failed += 1;
      log("Reaction failed on " + item.node.name + ": " + String(error && error.message || error));
    }
    if ((linked + failed) % 25 === 0) {
      log("Linked " + linked + "/" + allHotspots.length + " hotspots", "Linking prototype");
      await tick();
    }
  }

  figma.viewport.scrollAndZoomIntoView([framesByKey.role || page.children[0]]);
  page.selection = [framesByKey.role || page.children[0]];
  log("Done. Linked " + linked + ", failed " + failed + ".", "Complete");
  await tick();
  figma.closePlugin("Imported J&T mobile prototype with " + SCREENS.length + " screens and " + linked + " linked hotspots.");
}

run().catch((error) => {
  log("Fatal error: " + String(error && error.stack || error), "Failed");
  throw error;
});
`;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
