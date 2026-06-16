const state = {
  view: "home",
  accepted: new Set(),
};

const dispatches = [
  {
    id: "INC-9823",
    severity: "Khẩn cấp",
    tone: "high",
    title: "Hỏng động cơ - Cháy nổ nhẹ",
    plate: "29C-458.21",
    distance: "1.2 KM",
    place: "Quốc lộ 1A, Km 15 + 200",
    staff: "Nguyễn Văn A",
  },
  {
    id: "INC-9844",
    severity: "Trung bình",
    tone: "medium",
    title: "Lỗi hệ thống điện - Đèn tín hiệu",
    plate: "51D-122.90",
    distance: "3.8 KM",
    place: "Cầu Sài Gòn, hướng về Quận 1",
    staff: "Trần Thị B",
  },
  {
    id: "INC-9851",
    severity: "Thấp",
    tone: "low",
    title: "Kiểm tra lốp - Mòn quá mức",
    plate: "30H-991.02",
    distance: "0.5 KM",
    place: "Bãi đỗ xe J&T Long Biên",
    staff: "Lê Văn C",
  },
];

const els = {
  loginScreen: document.getElementById("login-screen"),
  loginForm: document.getElementById("login-form"),
  app: document.getElementById("app"),
  view: document.getElementById("view"),
  nav: document.querySelector(".bottom-nav"),
  toast: document.getElementById("toast"),
};

els.loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  els.loginScreen.classList.add("hidden");
  els.app.classList.remove("hidden");
  render();
  toast("Xin chào Trần Văn Bình");
});

els.nav.addEventListener("click", (event) => {
  const button = event.target.closest("[data-view]");
  if (!button) return;
  state.view = button.dataset.view;
  render();
});

document.addEventListener("click", (event) => {
  const accept = event.target.closest("[data-accept]");
  if (accept) {
    state.accepted.add(accept.dataset.accept);
    render();
    toast("Đã xác nhận tiếp nhận lệnh điều động.");
  }
  if (event.target.closest("[data-submit-report]")) {
    toast("Đã gửi báo cáo sự cố đến nhân viên an toàn.");
  }
  if (event.target.closest("[data-save-edit]")) {
    toast("Đã lưu cập nhật sự cố.");
  }
});

function render() {
  [...els.nav.querySelectorAll("button")].forEach((button) => {
    button.classList.toggle("active", button.dataset.view === state.view);
  });
  const views = {
    home: renderHome,
    report: renderReport,
    edit: renderEdit,
    notify: renderNotify,
  };
  els.view.innerHTML = views[state.view]();
}

function renderHome() {
  return `
    <div class="page-title">
      <h1>Lệnh điều động mới</h1>
      <p>Chào Trần Văn Bình, hiện có 3 sự cố đang chờ xử lý.</p>
    </div>
    <div class="dispatch-list">
      ${dispatches.map(renderDispatch).join("")}
    </div>
    <section class="dispatch-card map-card">
      <img src="../images/quoclo5.png" alt="">
      <div class="map-footer">
        <span>Xem bản đồ điều phối</span>
        <strong>›</strong>
      </div>
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
      <div class="place">
        <span>⌖</span>
        <div>${item.place}<small>Nhân viên an toàn: ${item.staff}</small></div>
      </div>
      <button type="button" class="${accepted ? "outline-button" : item.tone === "high" ? "danger-button" : "outline-button"}" data-accept="${item.id}">
        ${accepted ? "Đã tiếp nhận" : "Xác nhận tiếp nhận"}
      </button>
    </article>
  `;
}

function renderReport() {
  return `
    <div class="page-title">
      <h1>Báo cáo sự cố</h1>
      <p>Gửi nhanh vị trí, mô tả và tình trạng xe về trung tâm điều phối.</p>
    </div>
    <section class="mobile-card">
      <div class="status-strip">● Đang kết nối với nhân viên an toàn</div>
      <div class="mobile-grid" style="margin-top:12px">
        <div class="metric"><span>Thời gian</span><strong>01:23:45</strong></div>
        <div class="metric"><span>Biển số xe</span><strong>29C-123.45</strong></div>
      </div>
    </section>
    <section class="mobile-card">
      <h2>Vị trí hiện tại</h2>
      <div class="gps-card"><strong>123 Đường Duy Tân, Cầu Giấy, Hà Nội</strong></div>
    </section>
    <section class="mobile-card">
      <form class="form-stack">
        <label><span>Mã chuyến hàng</span><input value="JT-V98273041-EXP"></label>
        <label><span>Mô tả tình trạng</span><textarea placeholder="Nhập chi tiết sự cố, tình trạng xe, hàng hóa..."></textarea></label>
        <button type="button" class="danger-button" data-submit-report>Gửi báo cáo</button>
      </form>
    </section>
  `;
}

function renderEdit() {
  return `
    <div class="page-title">
      <h1>Cập nhật sự cố</h1>
      <p>Bổ sung hình ảnh, mô tả và thông tin mới cho báo cáo đã gửi.</p>
    </div>
    <section class="mobile-card">
      <div class="mobile-grid">
        <div class="metric"><span>Mã sự cố</span><strong>SC-2026-0615-01</strong></div>
        <div class="metric"><span>Trạng thái</span><strong>Đang xử lý</strong></div>
      </div>
    </section>
    <section class="mobile-card">
      <h2>Ảnh minh chứng</h2>
      <div class="evidence-preview">
        <img src="../images/anhminhchung.png" alt="">
        <div class="upload-box">Thêm ảnh/PDF<br>Camera, biên bản hoặc video ngắn</div>
      </div>
    </section>
    <section class="mobile-card">
      <label><span>Nội dung bổ sung</span><textarea>Xe rung mạnh khi tăng tốc, lốp trước có dấu thủng và cần hỗ trợ kỹ thuật.</textarea></label>
      <button type="button" class="danger-button" style="margin-top:14px" data-save-edit>Lưu cập nhật</button>
    </section>
  `;
}

function renderNotify() {
  return `
    <section class="notice-banner">
      <h1>Thông báo: Loại sự cố: sự cố nhỏ</h1>
      <p>Vui lòng giữ bình tĩnh và thực hiện các bước cứu hộ ngay lập tức.</p>
    </section>
    <section class="mobile-card" style="margin-top:14px">
      <h2>Tự thay lốp dự phòng</h2>
      <p>Dưới đây là quy trình 3 bước thực hiện nhanh chóng:</p>
    </section>
    ${guideStep("1. Nới lỏng ốc bánh xe", "../images/noilongoc.png", "Dùng tròng tuýp quay ngược chiều kim đồng hồ để nới lỏng các hạt ốc bánh xe bị thủng khi xe còn chạm đất. Chỉ nới lỏng khoảng 1 vòng, không tháo rời hoàn toàn.")}
    ${guideStep("2. Kích gầm và tháo bánh thủng", "../images/kichgamvathaobanhthung.png", "Đặt kích vào đúng phần khung kim loại chịu lực dưới gầm xe. Nâng xe đến khi bánh thủng cao hơn mặt đất khoảng 2 - 3 cm rồi tháo bánh.")}
    ${guideStep("3. Lắp lốp dự phòng và siết ốc", "../images/laplopduphong.png", "Nhấc lốp dự phòng vào cụm may-ơ, vặn ốc bằng tay trước, siết chéo theo hình ngôi sao rồi hạ kích và siết chặt lần cuối.")}
  `;
}

function guideStep(title, image, text) {
  return `
    <article class="guide-card">
      <strong>${title}</strong>
      <img src="${image}" alt="">
      <p>${text}</p>
    </article>
  `;
}

function toast(message) {
  els.toast.textContent = message;
  els.toast.classList.remove("hidden");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => els.toast.classList.add("hidden"), 2400);
}
