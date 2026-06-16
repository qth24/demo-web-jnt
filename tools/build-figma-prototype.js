const fs = require("fs");
const path = require("path");
const http = require("http");
const { chromium } = require("playwright");

const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "figma-prototype-plugin");
const ASSET_DIR = path.join(OUT_DIR, "assets");
const PORT = Number(process.env.PORT || 4173);
const BASE_URL = `http://127.0.0.1:${PORT}`;
const VIEWPORT = { width: 1440, height: 900 };

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

async function capture(page, key, name, hotspots = []) {
  await page.waitForTimeout(250);
  const file = `${key}.jpg`;
  const filePath = path.join(ASSET_DIR, file);
  await page.screenshot({ path: filePath, fullPage: true, type: "jpeg", quality: 74 });
  const size = await page.evaluate(() => ({
    width: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
    height: Math.max(document.documentElement.scrollHeight, document.body.scrollHeight),
  }));
  return {
    key,
    name,
    file,
    width: size.width,
    height: size.height,
    hotspots: hotspots.filter(Boolean),
  };
}

async function gotoFresh(page) {
  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: "networkidle" });
}

async function loginAsFleet(page) {
  await gotoFresh(page);
  await page.click('[data-role-choice="fleet"]');
  await page.click(".login-submit");
  await page.waitForSelector("#app:not(.hidden)");
}

async function main() {
  ensureDir(ASSET_DIR);
  const server = await startServer();
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: VIEWPORT, deviceScaleFactor: 1 });
  const screens = [];

  try {
    await gotoFresh(page);
    screens.push(
      await capture(page, "role", "01 - Chon vai tro", [
        await getBox(page, '[data-role-choice="driver"]', "Tai xe dang nhap", "login-driver"),
        await getBox(page, '[data-role-choice="safety"]', "Nhan vien dang nhap", "login-safety"),
        await getBox(page, '[data-role-choice="fleet"]', "Quan ly dang nhap", "login-fleet"),
      ])
    );

    for (const role of ["driver", "safety", "fleet"]) {
      await gotoFresh(page);
      await page.click(`[data-role-choice="${role}"]`);
      screens.push(
        await capture(page, `login-${role}`, `02 - Login ${role}`, [
          await getBox(page, "#back-role-btn", "Quay lai", "role"),
          await getBox(page, ".login-submit", "Dang nhap", role === "driver" ? "driver-home" : "dashboard"),
          await getBox(page, "#open-register-btn", "Dang ki", "register-modal"),
        ])
      );
    }

    await gotoFresh(page);
    await page.click('[data-role-choice="fleet"]');
    await page.click("#open-register-btn");
    screens.push(
      await capture(page, "register-modal", "03 - Modal dang ki", [
        await getBox(page, "[data-close-modal]", "Huy", "login-fleet"),
        await getBox(page, "#submit-register-btn", "Dang ki", "login-fleet"),
      ])
    );

    await loginAsFleet(page);
    for (const view of NAV_VIEWS) {
      await page.click(`[data-view="${view}"]`);
      const hotspots = [];
      hotspots.push(...await getAllBoxes(page, ".nav button[data-view]", (box) => box.attrs["data-view"]));
      hotspots.push(await getBox(page, "#logout-btn", "Dang xuat", "role"));
      hotspots.push(await getBox(page, "#export-btn", "Xuat bao cao", view));
      hotspots.push(await getBox(page, "#quick-incident-btn", "Bao cao su co", "quick-incident-modal"));
      hotspots.push(...await getAllBoxes(page, "[data-add]", (box) => `${box.attrs["data-add"]}-form-modal`));
      hotspots.push(...await getAllBoxes(page, "[data-detail]", (box) => `${box.attrs["data-detail"]}-detail-modal`));
      hotspots.push(...await getAllBoxes(page, "[data-edit]", (box) => `${box.attrs["data-edit"]}-form-modal`));
      hotspots.push(...await getAllBoxes(page, "[data-delete]", () => "delete-modal"));
      hotspots.push(...await getAllBoxes(page, "[data-call]", () => "call-modal"));
      screens.push(await capture(page, view, `App - ${view}`, hotspots));
    }

    await page.click('[data-view="incidents"]');
    await page.click("#quick-incident-btn");
    screens.push(
      await capture(page, "quick-incident-modal", "Modal - Bao cao su co", [
        await getBox(page, "[data-close-modal]", "Huy", "incidents"),
        await getBox(page, "#save-entity-btn", "Bao cao", "classification-modal"),
      ])
    );

    await loginAsFleet(page);
    await page.click('[data-view="incidents"]');
    await page.click('[data-detail="incidents"]');
    screens.push(
      await capture(page, "incidents-detail-modal", "Modal - Chi tiet su co", [
        await getBox(page, "[data-close-modal]", "Dong", "incidents"),
      ])
    );

    await loginAsFleet(page);
    await page.click('[data-view="incidents"]');
    await page.click('[data-call]');
    screens.push(
      await capture(page, "call-modal", "Modal - Goi tai xe", [
        await getBox(page, "[data-close-modal]", "Ket thuc cuoc goi", "incidents"),
      ])
    );

    await loginAsFleet(page);
    await page.click('[data-view="incidents"]');
    await page.click('[data-edit="incidents"]');
    screens.push(
      await capture(page, "incidents-form-modal", "Modal - Cap nhat su co", [
        await getBox(page, "[data-close-modal]", "Huy", "incidents"),
        await getBox(page, "#save-entity-btn", "Luu", "classification-modal"),
      ])
    );

    await loginAsFleet(page);
    await page.click('[data-view="incidents"]');
    await page.click('[data-delete="incidents"]');
    screens.push(
      await capture(page, "delete-modal", "Modal - Xac nhan xoa", [
        await getBox(page, "[data-close-modal]", "Huy", "incidents"),
        await getBox(page, "#confirm-delete-btn", "Xoa", "incidents"),
      ])
    );

    await loginAsFleet(page);
    await page.click('[data-view="incidents"]');
    await page.click("#quick-incident-btn");
    await page.click("#save-entity-btn");
    screens.push(
      await capture(page, "classification-modal", "Modal - Phan loai tu dong", [
        await getBox(page, "[data-close-modal]", "Da hieu", "incidents"),
      ])
    );

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
      const hotspots = [];
      hotspots.push(...await getAllBoxes(page, ".nav button[data-driver-tab]", (box) => `driver-${box.attrs["data-driver-tab"]}`));
      hotspots.push(await getBox(page, "#logout-btn", "Dang xuat", "role"));
      hotspots.push(...await getAllBoxes(page, "[data-driver-submit]", () => key));
      screens.push(await capture(page, key, `Driver - ${tab}`, hotspots));
    }
  } finally {
    await browser.close();
    server.close();
  }

  writePlugin(screens);
  console.log(`Generated ${screens.length} screens in ${OUT_DIR}`);
}

function writePlugin(screens) {
  const embedded = screens.map((screen) => ({
    ...screen,
    imageBase64: fs.readFileSync(path.join(ASSET_DIR, screen.file)).toString("base64"),
  }));

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
    `const SCREENS = ${JSON.stringify(embedded)};\n\n${pluginRuntime()}`
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

  for (let i = 0; i < SCREENS.length; i += 1) {
    const screen = SCREENS[i];
    log("Importing " + (i + 1) + "/" + SCREENS.length + ": " + screen.name, "Importing screens");
    const frame = figma.createFrame();
    frame.name = screen.name;
    frame.resize(screen.width, screen.height);
    frame.x = (i % 3) * (columnWidth + gapX);
    frame.y = Math.floor(i / 3) * (980 + gapY);
    frame.clipsContent = true;
    frame.fills = [{ type: "SOLID", color: { r: 0.945, g: 0.953, b: 0.965 } }];
    page.appendChild(frame);

    const image = figma.createImage(base64ToBytes(screen.imageBase64));
    const rect = figma.createRectangle();
    rect.name = "Screen capture";
    rect.resize(screen.width, screen.height);
    rect.fills = [{ type: "IMAGE", imageHash: image.hash, scaleMode: "FILL" }];
    frame.appendChild(rect);

    framesByKey[screen.key] = frame;
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
