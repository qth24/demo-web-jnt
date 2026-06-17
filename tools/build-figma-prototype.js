const fs = require("fs");
const path = require("path");
const http = require("http");
const { chromium } = require("playwright");

const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "figma-prototype-plugin");
const ASSET_DIR = path.join(OUT_DIR, "assets");
const REPORT_PATH = path.join(OUT_DIR, "prototype-report.json");
const PORT = Number(process.env.PORT || 4173);
const BASE_URL = `http://127.0.0.1:${PORT}`;
const VIEWPORT = { width: 1440, height: 900 };
const APP_ROLES = ["fleet", "safety"];

const NAV_VIEWS = [
  "dashboard",
  "accounts",
  "trucks",
  "drivers",
  "employees",
  "branches",
  "incidents",
  "inspections",
  "trips",
  "garages",
  "invoices",
  "categories",
];

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
    const requested = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
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
    .slice(0, 48);
}

function appViewKey(role, view) {
  return `${role}-${view}`;
}

function modalKey(role, view, action) {
  return `${role}-${view}-${action}-modal`;
}

async function getBox(page, selector, name, target) {
  const handle = await page.$(selector);
  if (!handle) return null;
  const box = await handle.boundingBox();
  if (!box) return null;
  return {
    name,
    target,
    x: Math.round(box.x),
    y: Math.round(box.y),
    w: Math.round(box.width),
    h: Math.round(box.height),
  };
}

async function getAllBoxes(page, selector, targetFromElement) {
  return page.$$eval(selector, (nodes) =>
    nodes
      .map((node) => {
        const rect = node.getBoundingClientRect();
        const text = (node.innerText || node.textContent || node.getAttribute("aria-label") || "").trim();
        const attrs = {};
        for (const attr of node.attributes) attrs[attr.name] = attr.value;
        return {
          text,
          attrs,
          x: Math.round(rect.x),
          y: Math.round(rect.y),
          w: Math.round(rect.width),
          h: Math.round(rect.height),
        };
      })
      .filter((box) => box.w > 0 && box.h > 0)
  ).then((boxes) =>
    boxes
      .map((box) => {
        const target = targetFromElement(box);
        if (!target) return null;
        return {
          name: toName(box.text || target),
          target,
          x: box.x,
          y: box.y,
          w: box.w,
          h: box.h,
        };
      })
      .filter(Boolean)
  );
}

function buttonTarget(box, context) {
  const attrs = box.attrs || {};
  const id = attrs.id || "";
  const text = toName(box.text);
  const role = context.role;
  const self = context.key;

  if (attrs["data-role-choice"]) return `login-${attrs["data-role-choice"]}`;
  if (attrs["data-view"]) return role ? appViewKey(role, attrs["data-view"]) : attrs["data-view"];
  if (attrs["data-driver-tab"]) return `driver-${attrs["data-driver-tab"]}`;
  if (attrs["data-add"]) return role ? modalKey(role, attrs["data-add"], "add") : self;
  if (attrs["data-edit"]) return role ? modalKey(role, attrs["data-edit"], "edit") : self;
  if (attrs["data-detail"]) return role ? modalKey(role, attrs["data-detail"], "detail") : self;
  if (attrs["data-delete"]) return role ? modalKey(role, attrs["data-delete"], "delete") : self;
  if (attrs["data-call"]) return role ? modalKey(role, "incidents", "call") : self;
  if ("data-close-modal" in attrs) return context.closeTarget || self;
  if ("data-driver-submit" in attrs) return context.submitTarget || self;

  if (id === "back-role-btn") return "role";
  if (id === "toggle-password") return self;
  if (id === "open-register-btn") return "register-modal";
  if (id === "submit-register-btn") return "login-fleet";
  if (id === "logout-btn") return "role";
  if (id === "quick-incident-btn") return role ? modalKey(role, "incidents", "quick") : self;
  if (id === "export-btn") return role ? `${role}-export-toast` : self;
  if (id === "save-entity-btn") return context.saveTarget || context.closeTarget || self;
  if (id === "confirm-delete-btn") return context.closeTarget || self;
  if (id === "mark-done-btn") return context.closeTarget || self;

  if (attrs.type === "submit" || text === "Đăng nhập" || text.endsWith("Đăng nhập")) {
    return context.loginTarget || self;
  }
  if (text === "Quên mật khẩu?" || text === "Tìm kiếm" || text === "Điều phối") return self;
  if (text === "Sửa" || text === "Xóa") return self;

  return context.defaultTarget || self;
}

async function getButtonHotspots(page, context) {
  return getAllBoxes(page, "button", (box) => buttonTarget(box, context));
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

async function capture(page, key, name, hotspots = []) {
  await page.waitForTimeout(250);
  const file = `${key}.png`;
  const filePath = path.join(ASSET_DIR, file);
  await page.screenshot({ path: filePath, fullPage: true, type: "png" });
  const size = await page.evaluate(() => ({
    width: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
    height: Math.max(document.documentElement.scrollHeight, document.body.scrollHeight),
  }));
  const buttonCount = await page.$$eval("button", (nodes) =>
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
    width: size.width,
    height: size.height,
    buttonCount,
    hotspots: hotspots.filter(Boolean),
  };
}

async function gotoFresh(page) {
  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: "networkidle" });
}

async function loginAsRole(page, role) {
  await gotoFresh(page);
  await page.click(`[data-role-choice="${role}"]`);
  await page.click(".login-submit");
  await page.waitForSelector("#app:not(.hidden)");
}

async function main() {
  resetOutput();
  const server = await startServer();
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 1, acceptDownloads: true });
  const page = await context.newPage();
  const screens = [];
  const pushScreen = (screen) => {
    screen.hotspots = withoutDuplicateHotspots(screen.hotspots);
    screens.push(screen);
  };

  async function captureCurrent(key, name, contextOverrides = {}) {
    const hotspots = await getButtonHotspots(page, { key, ...contextOverrides });
    pushScreen(await capture(page, key, name, hotspots));
  }

  async function openRoleView(role, view) {
    await loginAsRole(page, role);
    await page.click(`[data-view="${view}"]`);
  }

  async function captureEntityModal(role, view, action, selector, label, options = {}) {
    await openRoleView(role, view);
    const handle = await page.$(selector);
    if (!handle) return;
    await handle.click();
    const key = modalKey(role, view, action);
    await captureCurrent(key, `${role.toUpperCase()} - ${label}`, {
      role,
      view,
      closeTarget: appViewKey(role, view),
      saveTarget: options.saveTarget || appViewKey(role, view),
      defaultTarget: key,
    });
  }

  try {
    await gotoFresh(page);
    await captureCurrent("role", "01 - Chon vai tro");

    for (const role of ["driver", "safety", "fleet"]) {
      await gotoFresh(page);
      await page.click(`[data-role-choice="${role}"]`);
      await captureCurrent(`login-${role}`, `02 - Login ${role}`, {
        loginTarget: role === "driver" ? "driver-home" : appViewKey(role, "dashboard"),
      });
    }

    await gotoFresh(page);
    await page.click('[data-role-choice="fleet"]');
    await page.click("#open-register-btn");
    await captureCurrent("register-modal", "03 - Modal dang ki", {
      closeTarget: "login-fleet",
      defaultTarget: "login-fleet",
    });

    for (const role of APP_ROLES) {
      await loginAsRole(page, role);
      for (const view of NAV_VIEWS) {
        await page.click(`[data-view="${view}"]`);
        await captureCurrent(appViewKey(role, view), `${role.toUpperCase()} - ${view}`, {
          role,
          view,
          defaultTarget: appViewKey(role, view),
        });
      }

      await loginAsRole(page, role);
      const downloadPromise = page.waitForEvent("download", { timeout: 1200 }).catch(() => null);
      await page.click("#export-btn");
      const download = await downloadPromise;
      if (download) await download.delete().catch(() => {});
      await captureCurrent(`${role}-export-toast`, `${role.toUpperCase()} - Export toast`, {
        role,
        view: "dashboard",
        defaultTarget: appViewKey(role, "dashboard"),
      });

      await openRoleView(role, "incidents");
      await page.click("#quick-incident-btn");
      await captureCurrent(modalKey(role, "incidents", "quick"), `${role.toUpperCase()} - Bao cao su co`, {
        role,
        view: "incidents",
        closeTarget: appViewKey(role, "incidents"),
        saveTarget: modalKey(role, "incidents", "classification"),
        defaultTarget: modalKey(role, "incidents", "quick"),
      });

      await openRoleView(role, "incidents");
      await page.click("#quick-incident-btn");
      await page.click("#save-entity-btn");
      await captureCurrent(modalKey(role, "incidents", "classification"), `${role.toUpperCase()} - Phan loai tu dong`, {
        role,
        view: "incidents",
        closeTarget: appViewKey(role, "incidents"),
        defaultTarget: appViewKey(role, "incidents"),
      });

      await captureEntityModal(role, "incidents", "call", "[data-call]", "Goi tai xe");
    }

    for (const role of APP_ROLES) {
      for (const view of NAV_VIEWS.filter((item) => item !== "dashboard" && item !== "accounts")) {
        await captureEntityModal(role, view, "add", `[data-add="${view}"]`, `${view} add`, {
          saveTarget: view === "incidents" ? modalKey(role, "incidents", "classification") : appViewKey(role, view),
        });
        await captureEntityModal(role, view, "detail", `[data-detail="${view}"]`, `${view} detail`);
        await captureEntityModal(role, view, "edit", `[data-edit="${view}"]`, `${view} edit`, {
          saveTarget: view === "incidents" ? modalKey(role, "incidents", "classification") : appViewKey(role, view),
        });
        await captureEntityModal(role, view, "delete", `[data-delete="${view}"]`, `${view} delete`);
      }
    }

    await gotoFresh(page);
    await page.click('[data-role-choice="driver"]');
    await page.click(".login-submit");
    await page.waitForSelector("#app:not(.hidden)");
    for (const [tab, key] of [
      ["home", "driver-home"],
      ["report", "driver-report"],
      ["edit", "driver-edit"],
      ["notify", "driver-notify"],
    ]) {
      await page.click(`[data-driver-tab="${tab}"]`);
      await captureCurrent(key, `Driver - ${tab}`, {
        role: null,
        defaultTarget: key,
      });
    }
  } finally {
    await context.close();
    await browser.close();
    server.close();
  }

  writePlugin(screens);
  console.log(`Generated ${screens.length} screens in ${OUT_DIR}`);
}

function writePlugin(screens) {
  const assets = {};
  for (const screen of screens) {
    if (!assets[screen.file]) {
      assets[screen.file] = fs.readFileSync(path.join(ASSET_DIR, screen.file)).toString("base64");
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
        hotspotCount: screens.reduce((sum, screen) => sum + screen.hotspots.length, 0),
        missingTargets,
        screens: screens.map(({ key, name, file, width, height, buttonCount, hotspots }) => ({
          key,
          name,
          file,
          width,
          height,
          buttonCount,
          hotspotCount: hotspots.length,
          hotspots: hotspots.map(({ name, target, x, y, w, h }) => ({ name, target, x, y, w, h })),
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
        name: "J&T Desktop Prototype Importer",
        id: "jt-desktop-prototype-importer",
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
    '<h3 style="margin:0 0 8px;font-size:14px">J&T Prototype Importer</h3>' +
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
  page.name = "J&T Desktop Prototype";
  await figma.setCurrentPageAsync(page);

  const framesByKey = {};
  const allHotspots = [];
  const gapX = 220;
  const gapY = 180;
  const columnWidth = 1500;
  let rowY = 0;
  let rowMaxHeight = 0;

  for (let i = 0; i < SCREENS.length; i += 1) {
    const screen = SCREENS[i];
    const col = i % 3;
    if (col === 0 && i > 0) {
      rowY += rowMaxHeight + gapY;
      rowMaxHeight = 0;
    }
    log("Importing " + (i + 1) + "/" + SCREENS.length + ": " + screen.name, "Importing screens");
    const frame = figma.createFrame();
    frame.name = screen.name;
    frame.resize(screen.width, screen.height);
    frame.x = col * (columnWidth + gapX);
    frame.y = rowY;
    frame.clipsContent = true;
    frame.fills = [{ type: "SOLID", color: { r: 0.945, g: 0.953, b: 0.965 } }];
    page.appendChild(frame);

    const image = figma.createImage(base64ToBytes(ASSETS[screen.file]));
    const rect = figma.createRectangle();
    rect.name = "Screen capture";
    rect.resize(screen.width, screen.height);
    rect.fills = [{ type: "IMAGE", imageHash: image.hash, scaleMode: "FILL" }];
    frame.appendChild(rect);

    framesByKey[screen.key] = frame;
    rowMaxHeight = Math.max(rowMaxHeight, screen.height);
    if (i % 3 === 2) await tick();
  }

  log("Creating hotspot layers", "Creating hotspots");
  for (const screen of SCREENS) {
    const frame = framesByKey[screen.key];
    for (const hotspot of screen.hotspots || []) {
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
    await tick();
  }

  log("Hotspots: " + allHotspots.length, "Linking prototype");
  let linked = 0;
  let failed = 0;
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
  figma.closePlugin("Imported J&T desktop prototype with " + SCREENS.length + " screens and " + linked + " linked hotspots.");
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
