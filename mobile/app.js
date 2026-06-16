const state = {
  role: "driver",
  view: "home",
  accepted: new Set(),
};

const dispatches = [
  { id: "INC-9823", severity: "Khẩn cấp", tone: "high", title: "Hỏng động cơ - Cháy nổ nhẹ", plate: "29C-458.21", distance: "1.2 KM", place: "Quốc lộ 1A, Km 15 + 200", staff: "Nguyễn Văn A" },
  { id: "INC-9844", severity: "Trung bình", tone: "medium", title: "Lỗi hệ thống điện - Đèn tín hiệu", plate: "51D-122.90", distance: "3.8 KM", place: "Cầu Sài Gòn, hướng về Quận 1", staff: "Trần Thị B" },
  { id: "INC-9851", severity: "Thấp", tone: "low", title: "Kiểm tra lốp - Mòn quá mức", plate: "30H-991.02", distance: "0.5 KM", place: "Bãi đỗ xe J&T Long Biên", staff: "Lê Văn C" },
];

const incidents = [
  { code: "SC-2026-0615-01", name: "Thủng lốp", plate: "61H-445.23", status: "Đang xử lý", type: "Sự cố nhỏ" },
  { code: "SC-2026-0614-02", name: "Hết bình Ắc-quy", plate: "51C-892.10", status: "Đã ghi nhận", type: "Sự cố động cơ" },
  { code: "SC-2026-0610-03", name: "Mất phanh", plate: "50H-781.88", status: "Hoàn tất sửa chữa", type: "Kỹ thuật nghiêm trọng" },
];

const inspections = [
  { code: "NT-7781", incident: "SC-2026-0615-01", plate: "61H-445.23", cost: "4.200.000đ", status: "Chờ nghiệm thu" },
  { code: "NT-7719", incident: "SC-2026-0610-03", plate: "50H-781.88", cost: "12.500.000đ", status: "Đã xác nhận" },
];

const invoices = [
  { code: "HD-991", garage: "GA-01", acceptance: "NT-7781", total: "4.200.000đ", method: "Chuyển khoản" },
  { code: "HD-975", garage: "GA-02", acceptance: "NT-7719", total: "12.500.000đ", method: "Chuyển khoản" },
];

const navByRole = {
  driver: [
    ["home", "⌂", "Trang chủ"],
    ["report", "△", "Báo cáo"],
    ["edit", "✎", "Cập nhật"],
    ["notify", "☷", "Thông báo"],
  ],
  tech: [
    ["home", "⌂", "Trang chủ"],
    ["incidents", "△", "Sự cố"],
    ["inspections", "▣", "Nghiệm thu"],
    ["invoices", "▤", "Hóa đơn"],
  ],
};

const els = {
  roleScreen: document.getElementById("role-screen"),
  loginScreen: document.getElementById("login-screen"),
  registerScreen: document.getElementById("register-screen"),
  loginForm: document.getElementById("login-form"),
  loginRole: document.getElementById("login-role"),
  loginRoleDisplay: document.getElementById("login-role-display"),
  loginCode: document.getElementById("login-code"),
  backRole: document.getElementById("back-role"),
  backLogin: document.getElementById("back-login"),
  openRegister: document.getElementById("open-register"),
  submitRegister: document.getElementById("submit-register"),
  app: document.getElementById("app"),
  appTitle: document.getElementById("app-title"),
  bell: document.getElementById("bell-button"),
  view: document.getElementById("view"),
  nav: document.querySelector(".bottom-nav"),
  toast: document.getElementById("toast"),
  success: document.getElementById("success-pop"),
  modalRoot: document.getElementById("modal-root"),
};

document.addEventListener("click", (event) => {
  const roleChoice = event.target.closest("[data-role-choice]");
  if (!roleChoice) return;
  chooseRole(roleChoice.dataset.roleChoice);
});

els.backRole.addEventListener("click", () => {
  els.loginScreen.classList.add("hidden");
  els.roleScreen.classList.remove("hidden");
});

els.openRegister.addEventListener("click", () => {
  els.loginScreen.classList.add("hidden");
  els.registerScreen.classList.remove("hidden");
});

els.backLogin.addEventListener("click", () => {
  els.registerScreen.classList.add("hidden");
  els.loginScreen.classList.remove("hidden");
});

els.submitRegister.addEventListener("click", () => {
  toast("Đã gửi thông tin đăng ký tài khoản.");
  els.registerScreen.classList.add("hidden");
  els.loginScreen.classList.remove("hidden");
});

els.loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  state.role = els.loginRole.value;
  state.view = "home";
  els.roleScreen.classList.add("hidden");
  els.loginScreen.classList.add("hidden");
  els.app.classList.remove("hidden");
  els.appTitle.textContent = state.role === "driver" ? "Trần Văn Bình" : "Hoàng Gia Phúc";
  renderNav();
  render();
  toast(state.role === "driver" ? "Xin chào Trần Văn Bình" : "Xin chào Hoàng Gia Phúc");
});

function chooseRole(role) {
  state.role = role;
  els.loginRole.value = role;
  els.loginRoleDisplay.textContent = role === "driver" ? "Tài xế - Trần Văn Bình" : "Nhân viên - Hoàng Gia Phúc";
  els.loginCode.value = role === "driver" ? "TX228" : "KT031";
  els.roleScreen.classList.add("hidden");
  els.loginScreen.classList.remove("hidden");
}

els.nav.addEventListener("click", (event) => {
  const button = event.target.closest("[data-view]");
  if (!button) return;
  state.view = button.dataset.view;
  render();
});

els.bell.addEventListener("click", () => {
  if (state.role !== "tech") {
    toast("Không có thông báo mới.");
    return;
  }
  openModal(`
    <div class="dispatch-alert">
      <strong>Bạn nhận được lệnh điều động từ nhân viên an toàn</strong>
      <p>Sự cố #INC-9823 cần kỹ thuật viên tiếp nhận và di chuyển đến hiện trường.</p>
      <button type="button" class="danger-button" data-modal-accept>Nhận</button>
    </div>
  `);
});

document.addEventListener("click", (event) => {
  const accept = event.target.closest("[data-accept]");
  if (accept) {
    state.accepted.add(accept.dataset.accept);
    render();
    toast("Đã xác nhận tiếp nhận lệnh điều động.");
  }
  if (event.target.closest("[data-submit-report]")) toast("Đã gửi báo cáo sự cố đến nhân viên an toàn.");
  if (event.target.closest("[data-save-edit]")) toast("Đã lưu cập nhật sự cố.");
  const go = event.target.closest("[data-go]");
  if (go) {
    state.view = go.dataset.go;
    render();
  }
  if (event.target.closest("[data-modal-close]")) closeModal();
  if (event.target.closest("[data-modal-accept]")) {
    state.accepted.add("INC-9823");
    closeModal();
    render();
    showSuccess();
    toast("Đã nhận lệnh điều động.");
  }
});

function renderNav() {
  els.nav.innerHTML = navByRole[state.role].map(([id, icon, label]) => `
    <button type="button" data-view="${id}">
      <span>${icon}</span>
      ${label}
    </button>
  `).join("");
}

function render() {
  [...els.nav.querySelectorAll("button")].forEach((button) => {
    button.classList.toggle("active", button.dataset.view === state.view);
  });
  const driverViews = { home: renderDriverHome, report: renderReport, edit: renderEdit, notify: renderNotify };
  const techViews = { home: renderTechHome, incidents: renderIncidents, inspections: renderInspections, invoices: renderInvoices };
  els.view.innerHTML = (state.role === "driver" ? driverViews : techViews)[state.view]();
}

function renderDriverHome() {
  return `
    <div class="page-title">
      <h1>Trang chủ tài xế</h1>
      <p>Xin chào Trần Văn Bình. Theo dõi chuyến hàng hiện tại và gửi báo cáo khi có sự cố.</p>
    </div>
    <section class="mobile-card trip-card">
      <h2>Chuyến hàng hiện tại <span class="code-chip">JT-8892-XQL</span></h2>
      <div class="mobile-grid">
        <div class="metric"><span>Biển số xe</span><strong>29C-123.45</strong></div>
        <div class="metric"><span>Hành trình</span><strong>Hà Nội → HP</strong></div>
      </div>
      <div class="route-line">
        <div><strong>08:30 - Kho trung chuyển Mê Linh</strong><small>Đã xuất kho - Đang vận chuyển</small></div>
        <div><strong>Dự kiến 11:45 - Kho Hải Phòng 02</strong><small>Kho tập kết cuối</small></div>
      </div>
    </section>
    <div class="mobile-grid">
      <section class="mobile-card"><h3>Nhiên liệu</h3><div class="bar"><span style="width:65%"></span></div><strong>65%</strong></section>
      <section class="mobile-card"><h3>Thời gian lái</h3><strong>03:45h</strong><p>Đã lái hôm nay</p></section>
    </div>
    <section class="mobile-card">
      <h2>Vị trí hiện tại</h2>
      <div class="gps-card"><strong>Quốc lộ 5, Hải Dương</strong></div>
    </section>
    <button type="button" class="danger-button full-button" data-go="report">Báo cáo sự cố</button>
  `;
}

function renderTechHome() {
  return `
    <div class="page-title">
      <h1>Lệnh điều động mới</h1>
      <p>Chào Hoàng Gia Phúc, hiện có 3 sự cố đang chờ xử lý.</p>
    </div>
    <div class="dispatch-list">${dispatches.map(renderDispatch).join("")}</div>
    <section class="dispatch-card map-card">
      <img src="../images/quoclo5.png" alt="">
      <div class="map-footer"><span>Xem bản đồ điều phối</span><strong>›</strong></div>
    </section>
  `;
}

function renderDispatch(item) {
  const accepted = state.accepted.has(item.id);
  return `
    <article class="dispatch-card ${accepted ? "accepted" : ""}">
      <div class="dispatch-head">
        <span class="severity ${item.tone === "medium" ? "medium" : item.tone === "low" ? "low" : ""}">● ${item.severity}</span>
        <span class="code-chip">#${item.id}</span>
      </div>
      <h2>${item.title}</h2>
      <div class="metric-row">
        <div class="metric"><span>Biển số xe</span><strong>${item.plate}</strong></div>
        <div class="metric"><span>Khoảng cách</span><strong>${item.distance}</strong></div>
      </div>
      <div class="place"><span>⌖</span><div>${item.place}<small>Nhân viên an toàn: ${item.staff}</small></div></div>
      <button type="button" class="${accepted ? "outline-button" : item.tone === "high" ? "danger-button" : "outline-button"}" data-accept="${item.id}">
        ${accepted ? "Đã tiếp nhận" : "Xác nhận tiếp nhận"}
      </button>
    </article>
  `;
}

function renderReport() {
  return `
    <div class="page-title"><h1>Báo cáo sự cố</h1><p>Gửi nhanh vị trí, mô tả và tình trạng xe về trung tâm điều phối.</p></div>
    <section class="mobile-card">
      <div class="status-strip">● Đang kết nối với nhân viên an toàn</div>
      <div class="mobile-grid" style="margin-top:12px">
        <div class="metric"><span>Mã</span><strong>SC-2026-0615-01</strong></div>
        <div class="metric"><span>Thời gian</span><strong>01:23:45</strong></div>
        <div class="metric"><span>Mã chuyến</span><strong>CH-8891</strong></div>
        <div class="metric"><span>Mã tài xế</span><strong>TX228</strong></div>
        <div class="metric"><span>Biển số xe</span><strong>29C-123.45</strong></div>
        <div class="metric"><span>Trạng thái</span><strong>Đã ghi nhận</strong></div>
      </div>
    </section>
    <section class="mobile-card"><h2>Vị trí hiện tại</h2><div class="gps-card"><strong>123 Đường Duy Tân, Cầu Giấy, Hà Nội</strong></div></section>
    <section class="mobile-card">
      <form class="form-stack">
        <label><span>Mã</span><input value="SC-2026-0615-01" readonly></label>
        <label><span>Thời gian</span><input value="01:23:45" readonly></label>
        <label><span>Mã chuyến</span><input value="CH-8891" readonly></label>
        <label><span>Mã tài xế</span><input value="TX228" readonly></label>
        <label><span>Biển số</span><input value="29C-123.45" readonly></label>
        <label><span>Trạng thái</span><input value="Đã ghi nhận" readonly></label>
        <label><span>Mô tả tình trạng</span><textarea placeholder="Nhập chi tiết sự cố, tình trạng xe, hàng hóa..."></textarea></label>
        <button type="button" class="danger-button" data-submit-report>Gửi báo cáo</button>
      </form>
    </section>
  `;
}

function renderEdit() {
  return `
    <div class="page-title"><h1>Cập nhật sự cố</h1><p>Bổ sung hình ảnh, mô tả và thông tin mới cho báo cáo đã gửi.</p></div>
    <section class="mobile-card"><div class="mobile-grid"><div class="metric"><span>Mã sự cố</span><strong>SC-2026-0615-01</strong></div><div class="metric"><span>Trạng thái</span><strong>Đang xử lý</strong></div></div></section>
    <section class="mobile-card"><h2>Ảnh minh chứng</h2><div class="evidence-preview"><img src="../images/anhminhchung.png" alt=""><div class="upload-box">Thêm ảnh/PDF<br>Camera, biên bản hoặc video ngắn</div></div></section>
    <section class="mobile-card"><label><span>Nội dung bổ sung</span><textarea>Xe rung mạnh khi tăng tốc, lốp trước có dấu thủng và cần hỗ trợ kỹ thuật.</textarea></label><button type="button" class="danger-button" style="margin-top:14px" data-save-edit>Lưu cập nhật</button></section>
  `;
}

function renderNotify() {
  return `
    <section class="notice-banner"><h1>Thông báo: Loại sự cố: sự cố nhỏ</h1><p>Vui lòng giữ bình tĩnh và thực hiện các bước cứu hộ ngay lập tức.</p></section>
    <section class="mobile-card" style="margin-top:14px"><h2>Tự thay lốp dự phòng</h2><p>Dưới đây là quy trình 3 bước thực hiện nhanh chóng:</p></section>
    ${guideStep("1. Nới lỏng ốc bánh xe", "../images/noilongoc.png", "Dùng tròng tuýp quay ngược chiều kim đồng hồ để nới lỏng các hạt ốc bánh xe bị thủng khi xe còn chạm đất.")}
    ${guideStep("2. Kích gầm và tháo bánh thủng", "../images/kichgamvathaobanhthung.png", "Đặt kích vào đúng phần khung kim loại chịu lực dưới gầm xe rồi tháo bánh thủng.")}
    ${guideStep("3. Lắp lốp dự phòng và siết ốc", "../images/laplopduphong.png", "Nhấc lốp dự phòng vào cụm may-ơ, siết chéo rồi hạ kích và siết chặt lần cuối.")}
  `;
}

function renderIncidents() {
  return `<div class="page-title"><h1>Quản lý sự cố</h1><p>Theo dõi các sự cố được giao cho bộ phận kỹ thuật.</p></div>${incidents.map((item) => listCard(item.code, item.name, `${item.plate} · ${item.type}`, item.status)).join("")}`;
}

function renderInspections() {
  return `<div class="page-title"><h1>Phiếu nghiệm thu</h1><p>Kiểm tra kết quả sửa chữa và chi phí gara.</p></div>${inspections.map((item) => listCard(item.code, `Sự cố ${item.incident}`, `${item.plate} · ${item.cost}`, item.status)).join("")}`;
}

function renderInvoices() {
  return `<div class="page-title"><h1>Hóa đơn</h1><p>Quản lý chứng từ thanh toán sau nghiệm thu.</p></div>${invoices.map((item) => listCard(item.code, `Gara ${item.garage}`, `${item.acceptance} · ${item.method}`, item.total)).join("")}`;
}

function listCard(code, title, meta, status) {
  return `<article class="mobile-card list-card"><div><span class="code-chip">${code}</span><h2>${title}</h2><p>${meta}</p></div><span class="badge">${status}</span></article>`;
}

function guideStep(title, image, text) {
  return `<article class="guide-card"><strong>${title}</strong><img src="${image}" alt=""><p>${text}</p></article>`;
}

function openModal(body) {
  els.modalRoot.classList.remove("hidden");
  els.modalRoot.innerHTML = `<div class="modal-card">${body}<button type="button" class="outline-button" data-modal-close>Đóng</button></div>`;
}

function closeModal() {
  els.modalRoot.classList.add("hidden");
  els.modalRoot.innerHTML = "";
}

function toast(message) {
  els.toast.textContent = message;
  els.toast.classList.remove("hidden");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => els.toast.classList.add("hidden"), 2400);
}

function showSuccess() {
  els.success.classList.remove("hidden");
  clearTimeout(showSuccess.timer);
  showSuccess.timer = setTimeout(() => els.success.classList.add("hidden"), 1200);
}
