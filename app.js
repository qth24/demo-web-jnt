const STORAGE_KEY = "jt-fleet-incident-control-v1";

const translations = {
  vi: {
    tagline: "Giao đúng giờ, Nhận chu toàn",
    login_title: "Đăng nhập",
    login_welcome: "Chào mừng bạn quay trở lại!",
    account_label: "Số điện thoại / Email",
    account_placeholder: "Nhập số điện thoại hoặc email",
    password_label: "Mật khẩu",
    password_placeholder: "Nhập mật khẩu",
    forgot_password: "Quên mật khẩu?",
    or_login: "Hoặc đăng nhập với",
    no_account: "Chưa có tài khoản?",
    register_now: "Đăng ký ngay",
    hero_title: "Giao hàng nhanh chóng<br />Kết nối thành công",
    hero_desc: "Đăng nhập để quản lý sự cố, theo dõi đội xe và trải nghiệm dịch vụ tốt nhất từ J&T Express.",
    employee_code: "Mã nhân viên / tài xế",
    role: "Vai trò",
    login: "Đăng nhập",
    export_ok: "Đã tạo báo cáo JSON trong trình duyệt.",
    logout: "Đăng xuất",
    quick_incident: "Báo sự cố nhanh",
    export_report: "Xuất báo cáo",
    operations: "Vận hành đội xe",
    policy_area: "Chính sách và pháp chế",
    close: "Đóng",
    cancel: "Hủy",
    save: "Lưu",
    view: "Xem",
    edit: "Sửa",
    delete: "Xóa",
    call: "Gọi",
    process: "Xử lý",
    search_placeholder: "Tìm kiếm theo mã, tên, biển số, trạng thái...",
    choose_login: "Vui lòng chọn vị trí đăng nhập:",
    driver_login: "Tài xế đăng nhập",
    staff_login: "Nhân viên đăng nhập",
    manager_login: "Quản lý đăng nhập",
    back: "Quay lại",
    copyright: "Tất cả quyền được bảo lưu",
    terms: "Điều khoản sử dụng",
    privacy: "Chính sách bảo mật",
    support: "Trung tâm hỗ trợ",
    all: "Tất cả",
    no_data: "Không có dữ liệu phù hợp.",
  },
  en: {
    tagline: "Express your online business",
    login_title: "Login",
    login_welcome: "Welcome back!",
    account_label: "Phone / Email",
    account_placeholder: "Enter phone number or email",
    password_label: "Password",
    password_placeholder: "Enter password",
    forgot_password: "Forgot password?",
    or_login: "Or login with",
    no_account: "No account?",
    register_now: "Register now",
    hero_title: "Fast delivery<br />Successful connection",
    hero_desc: "Login to manage incidents, track fleet operations and experience J&T Express service.",
    employee_code: "Employee / driver code",
    role: "Role",
    login: "Login",
    export_ok: "JSON report generated in browser.",
    logout: "Logout",
    quick_incident: "Quick incident",
    export_report: "Export report",
    operations: "Fleet operations",
    policy_area: "Policy and compliance",
    close: "Close",
    cancel: "Cancel",
    save: "Save",
    view: "View",
    edit: "Edit",
    delete: "Delete",
    call: "Call",
    process: "Process",
    search_placeholder: "Search by code, name, plate, status...",
    choose_login: "Please choose login position:",
    driver_login: "Driver login",
    staff_login: "Staff login",
    manager_login: "Manager login",
    back: "Back",
    copyright: "All rights reserved",
    terms: "Terms of use",
    privacy: "Privacy policy",
    support: "Support center",
    all: "All",
    no_data: "No matching data.",
  },
  zh: {
    tagline: "极兔速递 - Jitu Sudi",
    login_title: "登录",
    login_welcome: "欢迎回来！",
    account_label: "手机号 / 邮箱",
    account_placeholder: "请输入手机号或邮箱",
    password_label: "密码",
    password_placeholder: "请输入密码",
    forgot_password: "忘记密码？",
    or_login: "或使用以下方式登录",
    no_account: "还没有账号？",
    register_now: "立即注册",
    hero_title: "快速配送<br />连接成功",
    hero_desc: "登录以管理事故、跟踪车队并体验 J&T Express 服务。",
    employee_code: "员工 / 司机编号",
    role: "角色",
    login: "登录",
    export_ok: "已在浏览器生成 JSON 报告。",
    logout: "退出登录",
    quick_incident: "快速上报",
    export_report: "导出报告",
    operations: "车队运营",
    policy_area: "政策与合规",
    close: "关闭",
    cancel: "取消",
    save: "保存",
    view: "查看",
    edit: "编辑",
    delete: "删除",
    call: "呼叫",
    process: "处理",
    search_placeholder: "按编号、名称、车牌、状态搜索...",
    choose_login: "请选择登录身份：",
    driver_login: "司机登录",
    staff_login: "员工登录",
    manager_login: "管理者登录",
    back: "返回",
    copyright: "版权所有",
    terms: "使用条款",
    privacy: "隐私政策",
    support: "帮助中心",
    all: "全部",
    no_data: "没有匹配数据。",
  },
};

const roleLabelsByLang = {
  vi: {
    fleet: "Quản lý đội xe",
    branch: "Quản lý chi nhánh",
    safety: "Nhân viên an toàn",
    driver: "Tài xế",
    tech: "Bộ phận kỹ thuật",
  },
  en: {
    fleet: "Fleet manager",
    branch: "Branch manager",
    safety: "Safety officer",
    driver: "Driver",
    tech: "Technical team",
  },
  zh: {
    fleet: "车队经理",
    branch: "网点经理",
    safety: "安全专员",
    driver: "司机",
    tech: "技术团队",
  },
};

const roleLabels = {
  fleet: "Quản lý đội xe",
  branch: "Quản lý chi nhánh",
  safety: "Nhân viên an toàn",
  driver: "Tài xế",
  tech: "Bộ phận kỹ thuật",
};

const navItems = [
  { id: "dashboard", label: "Dashboard sự cố", icon: "DB", roles: ["fleet", "branch", "safety", "tech"] },
  { id: "accounts", label: "Tài khoản", icon: "AC", roles: ["fleet", "branch", "safety"] },
  { id: "trucks", label: "Xe tải", icon: "TR", roles: ["fleet", "branch", "safety"] },
  { id: "drivers", label: "Tài xế", icon: "DR", roles: ["fleet", "branch", "safety", "driver"] },
  { id: "employees", label: "Nhân viên", icon: "EM", roles: ["branch", "safety", "fleet"] },
  { id: "branches", label: "Chi nhánh", icon: "BR", roles: ["branch", "fleet", "safety"] },
  { id: "incidents", label: "Sự cố", icon: "IN", roles: ["fleet", "branch", "safety", "driver", "tech"] },
  { id: "inspections", label: "Phiếu nghiệm thu", icon: "NT", roles: ["tech", "safety", "fleet"] },
  { id: "trips", label: "Chuyến hàng", icon: "CH", roles: ["fleet", "branch", "driver", "safety"] },
  { id: "garages", label: "Gara", icon: "GA", roles: ["fleet", "safety", "tech"] },
  { id: "invoices", label: "Hóa đơn", icon: "HD", roles: ["fleet", "safety"] },
  { id: "categories", label: "Danh mục sự cố", icon: "DM", roles: ["fleet", "safety", "driver"] },
  { id: "policy", label: "Chính sách & tuân thủ", icon: "PL", roles: ["fleet", "branch", "safety", "driver", "tech"] },
];

const navLabels = {
  vi: {
    dashboard: "Dashboard sự cố",
    accounts: "Tài khoản",
    trucks: "Xe tải",
    drivers: "Tài xế",
    employees: "Nhân viên",
    branches: "Chi nhánh",
    incidents: "Sự cố",
    inspections: "Phiếu nghiệm thu",
    trips: "Chuyến hàng",
    garages: "Gara",
    invoices: "Hóa đơn",
    categories: "Danh mục sự cố",
    policy: "Chính sách & tuân thủ",
  },
  en: {
    dashboard: "Incident dashboard",
    accounts: "Accounts",
    trucks: "Trucks",
    drivers: "Drivers",
    employees: "Employees",
    branches: "Branches",
    incidents: "Incidents",
    inspections: "Acceptance forms",
    trips: "Shipments",
    garages: "Garages",
    invoices: "Invoices",
    categories: "Incident categories",
    policy: "Policy & compliance",
  },
  zh: {
    dashboard: "事故看板",
    accounts: "账号",
    trucks: "货车",
    drivers: "司机",
    employees: "员工",
    branches: "网点",
    incidents: "事故",
    inspections: "验收单",
    trips: "运输任务",
    garages: "维修站",
    invoices: "发票",
    categories: "事故分类",
    policy: "政策与合规",
  },
};

const entityLabels = {
  vi: {
    accounts: ["Quản lý tài khoản", "Thêm tài khoản"],
    trucks: ["Quản lý xe tải", "Thêm xe tải"],
    drivers: ["Quản lý tài xế", "Thêm tài xế"],
    employees: ["Quản lý nhân viên", "Thêm nhân viên"],
    branches: ["Quản lý chi nhánh", "Tạo chi nhánh"],
    incidents: ["Quản lý sự cố", "Tạo báo cáo sự cố"],
    inspections: ["Phiếu nghiệm thu", "Tạo phiếu nghiệm thu"],
    trips: ["Quản lý chuyến hàng", "Thêm chuyến hàng"],
    garages: ["Quản lý gara", "Thêm gara"],
    invoices: ["Hóa đơn thanh toán", "Thêm hóa đơn"],
    categories: ["Danh mục sự cố", "Thêm danh mục"],
  },
  en: {
    accounts: ["Account management", "Add account"],
    trucks: ["Truck management", "Add truck"],
    drivers: ["Driver management", "Add driver"],
    employees: ["Employee management", "Add employee"],
    branches: ["Branch management", "Create branch"],
    incidents: ["Incident management", "Create incident report"],
    inspections: ["Acceptance forms", "Create acceptance form"],
    trips: ["Shipment management", "Add shipment"],
    garages: ["Garage management", "Add garage"],
    invoices: ["Payment invoices", "Add invoice"],
    categories: ["Incident categories", "Add category"],
  },
  zh: {
    accounts: ["账号管理", "新增账号"],
    trucks: ["货车管理", "新增货车"],
    drivers: ["司机管理", "新增司机"],
    employees: ["员工管理", "新增员工"],
    branches: ["网点管理", "创建网点"],
    incidents: ["事故管理", "创建事故报告"],
    inspections: ["验收单", "创建验收单"],
    trips: ["运输任务管理", "新增运输任务"],
    garages: ["维修站管理", "新增维修站"],
    invoices: ["付款发票", "新增发票"],
    categories: ["事故分类", "新增分类"],
  },
};

const fieldLabels = {
  code: "Mã",
  name: "Tên",
  employeeCode: "Mã nhân viên",
  driverCode: "Mã tài xế",
  phone: "Số điện thoại",
  email: "Email",
  role: "Vai trò",
  branch: "Chi nhánh",
  status: "Trạng thái",
  plate: "Biển số",
  payload: "Tải trọng",
  brand: "Nhãn hiệu",
  year: "Năm sản xuất",
  insurance: "Bảo hiểm",
  citizenId: "CCCD",
  licenseClass: "Hạng GPLX",
  licenseExpiry: "Hạn GPLX",
  department: "Bộ phận",
  position: "Chức vụ",
  address: "Địa chỉ",
  region: "Khu vực",
  trips: "Số chuyến",
  incidentRate: "Tỷ lệ sự cố",
  productivity: "Năng suất",
  time: "Thời gian",
  gps: "GPS",
  incidentType: "Loại sự cố",
  tripCode: "Mã chuyến",
  staffCode: "Mã nhân viên",
  staffName: "Tên nhân viên",
  images: "Hình ảnh",
  severity: "Mức độ",
  cost: "Chi phí",
  fault: "Phán định lỗi",
  approval: "Duyệt chi phí",
  date: "Ngày",
  solution: "Phương án",
  quote: "Chi phí báo giá",
  invoiceCode: "Mã hóa đơn",
  services: "Dịch vụ",
  total: "Tổng tiền",
  paidAt: "Ngày thanh toán",
  method: "Phương thức",
  route: "Tuyến đường",
  eta: "Thời gian dự kiến",
  quantity: "Số lượng hàng",
  garageCode: "Mã gara",
  acceptanceCode: "Mã nghiệm thu",
  categoryCode: "Mã loại",
  description: "Mô tả",
  guide: "Hướng dẫn xử lý",
};

const fieldLabelsByLang = {
  vi: fieldLabels,
  en: {
    code: "Code",
    name: "Name",
    employeeCode: "Employee code",
    driverCode: "Driver code",
    phone: "Phone",
    email: "Email",
    role: "Role",
    branch: "Branch",
    status: "Status",
    plate: "License plate",
    payload: "Payload",
    brand: "Brand",
    year: "Year",
    insurance: "Insurance",
    citizenId: "Citizen ID",
    licenseClass: "License class",
    licenseExpiry: "License expiry",
    department: "Department",
    position: "Position",
    address: "Address",
    region: "Region",
    trips: "Trips",
    incidentRate: "Incident rate",
    productivity: "Productivity",
    time: "Time",
    gps: "GPS",
    incidentType: "Incident type",
    tripCode: "Shipment code",
    staffCode: "Staff code",
    staffName: "Staff name",
    images: "Images",
    severity: "Severity",
    cost: "Cost",
    fault: "Fault assessment",
    approval: "Approval",
    date: "Date",
    solution: "Solution",
    quote: "Quote",
    invoiceCode: "Invoice code",
    services: "Services",
    total: "Total",
    paidAt: "Payment date",
    method: "Method",
    route: "Route",
    eta: "ETA",
    quantity: "Quantity",
    garageCode: "Garage code",
    acceptanceCode: "Acceptance code",
    categoryCode: "Category code",
    description: "Description",
    guide: "Handling guide",
  },
  zh: {
    code: "编号",
    name: "名称",
    employeeCode: "员工编号",
    driverCode: "司机编号",
    phone: "电话",
    email: "邮箱",
    role: "角色",
    branch: "网点",
    status: "状态",
    plate: "车牌",
    payload: "载重",
    brand: "品牌",
    year: "生产年份",
    insurance: "保险",
    citizenId: "身份证",
    licenseClass: "驾照等级",
    licenseExpiry: "驾照到期",
    department: "部门",
    position: "职位",
    address: "地址",
    region: "区域",
    trips: "运输数",
    incidentRate: "事故率",
    productivity: "效率",
    time: "时间",
    gps: "GPS",
    incidentType: "事故类型",
    tripCode: "运输编号",
    staffCode: "员工编号",
    staffName: "员工姓名",
    images: "图片",
    severity: "级别",
    cost: "费用",
    fault: "责任判定",
    approval: "审批",
    date: "日期",
    solution: "方案",
    quote: "报价",
    invoiceCode: "发票编号",
    services: "服务",
    total: "总额",
    paidAt: "付款日期",
    method: "方式",
    route: "路线",
    eta: "预计时间",
    quantity: "货量",
    garageCode: "维修站编号",
    acceptanceCode: "验收编号",
    categoryCode: "分类编号",
    description: "描述",
    guide: "处理指南",
  },
};

function labelFor(field) {
  return fieldLabelsByLang[currentLang]?.[field] || fieldLabels[field] || field;
}

const entityConfigs = {
  accounts: {
    title: "Quản lý tài khoản",
    addLabel: "Thêm tài khoản",
    source: "accounts",
    columns: ["employeeCode", "name", "role", "phone", "branch", "status"],
    fields: ["employeeCode", "name", "role", "phone", "email", "branch", "status"],
    filters: ["role", "branch", "status"],
  },
  trucks: {
    title: "Quản lý xe tải",
    addLabel: "Thêm xe tải",
    source: "trucks",
    columns: ["plate", "payload", "brand", "year", "status", "insurance", "branch"],
    fields: ["plate", "payload", "brand", "year", "status", "insurance", "branch"],
    filters: ["status", "branch", "insurance"],
  },
  drivers: {
    title: "Quản lý tài xế",
    addLabel: "Thêm tài xế",
    source: "drivers",
    columns: ["driverCode", "name", "phone", "licenseClass", "licenseExpiry", "status", "branch"],
    fields: ["driverCode", "name", "citizenId", "phone", "licenseClass", "licenseExpiry", "status", "branch"],
    filters: ["status", "branch", "licenseClass"],
  },
  employees: {
    title: "Quản lý nhân viên",
    addLabel: "Thêm nhân viên",
    source: "employees",
    columns: ["employeeCode", "name", "phone", "email", "department", "position", "branch"],
    fields: ["employeeCode", "name", "phone", "email", "department", "position", "branch"],
    filters: ["department", "branch"],
  },
  branches: {
    title: "Quản lý chi nhánh",
    addLabel: "Tạo chi nhánh",
    source: "branches",
    columns: ["code", "name", "address", "region", "status", "trips", "incidentRate", "productivity"],
    fields: ["code", "name", "address", "region", "status", "trips", "incidentRate", "productivity"],
    filters: ["region", "status"],
  },
  incidents: {
    title: "Quản lý sự cố",
    addLabel: "Tạo báo cáo sự cố",
    source: "incidents",
    columns: ["code", "name", "time", "incidentType", "status", "tripCode", "driverCode", "plate", "approval"],
    fields: ["code", "time", "gps", "incidentType", "name", "status", "tripCode", "driverCode", "plate", "staffCode", "staffName", "images", "severity", "cost", "fault", "approval"],
    filters: ["incidentType", "status", "approval"],
  },
  inspections: {
    title: "Phiếu nghiệm thu",
    addLabel: "Tạo phiếu nghiệm thu",
    source: "inspections",
    columns: ["code", "date", "solution", "quote", "plate", "invoiceCode", "incidentCode", "staffName"],
    fields: ["code", "date", "solution", "quote", "plate", "invoiceCode", "incidentCode", "staffCode", "staffName"],
    filters: ["plate", "staffName"],
  },
  trips: {
    title: "Quản lý chuyến hàng",
    addLabel: "Thêm chuyến hàng",
    source: "trips",
    columns: ["code", "route", "eta", "quantity", "status", "plate", "driverCode", "driverName"],
    fields: ["code", "route", "eta", "quantity", "status", "plate", "driverCode", "driverName"],
    filters: ["status", "plate", "driverCode"],
  },
  garages: {
    title: "Quản lý gara",
    addLabel: "Thêm gara",
    source: "garages",
    columns: ["code", "name", "address", "phone", "region", "status"],
    fields: ["code", "name", "address", "phone", "region", "status"],
    filters: ["region", "status"],
  },
  invoices: {
    title: "Hóa đơn thanh toán",
    addLabel: "Thêm hóa đơn",
    source: "invoices",
    columns: ["code", "garageCode", "acceptanceCode", "services", "total", "paidAt", "method"],
    fields: ["code", "garageCode", "acceptanceCode", "services", "total", "paidAt", "method", "images"],
    filters: ["garageCode", "method"],
  },
  categories: {
    title: "Danh mục sự cố",
    addLabel: "Thêm danh mục",
    source: "categories",
    columns: ["categoryCode", "name", "severity", "description", "guide"],
    fields: ["categoryCode", "name", "severity", "description", "guide"],
    filters: ["severity"],
  },
};

const seedData = {
  accounts: [
    { id: 1, employeeCode: "QL001", name: "Nguyễn Minh Quân", role: "Quản lý đội xe", phone: "0901000001", email: "quan@jtexpress.vn", branch: "HCM-01", status: "Hoạt động" },
    { id: 2, employeeCode: "AT014", name: "Lê Thanh Mai", role: "Nhân viên an toàn", phone: "0901000014", email: "mai@jtexpress.vn", branch: "HCM-01", status: "Hoạt động" },
    { id: 3, employeeCode: "TX228", name: "Trần Văn Bình", role: "Tài xế", phone: "0901000228", email: "binh@jtexpress.vn", branch: "BD-02", status: "Hoạt động" },
  ],
  trucks: [
    { id: 1, plate: "51C-892.10", payload: "8 tấn", brand: "Hino", year: "2021", status: "Đang vận hành", insurance: "PJICO 2026", branch: "HCM-01" },
    { id: 2, plate: "61H-445.23", payload: "5 tấn", brand: "Isuzu", year: "2020", status: "Đang sửa chữa", insurance: "Bảo Việt 2026", branch: "BD-02" },
    { id: 3, plate: "50H-781.88", payload: "12 tấn", brand: "Hyundai", year: "2022", status: "Sẵn sàng", insurance: "PVI 2026", branch: "HN-03" },
  ],
  drivers: [
    { id: 1, driverCode: "TX228", name: "Trần Văn Bình", citizenId: "079088000001", phone: "0901000228", licenseClass: "FC", licenseExpiry: "2026-06-26", status: "Đang chạy", branch: "BD-02" },
    { id: 2, driverCode: "TX019", name: "Phạm Quốc Huy", citizenId: "031077000019", phone: "0901000019", licenseClass: "C", licenseExpiry: "2026-07-10", status: "Sẵn sàng", branch: "HCM-01" },
    { id: 3, driverCode: "TX301", name: "Lý Anh Đức", citizenId: "001082000301", phone: "0901000301", licenseClass: "FC", licenseExpiry: "2027-02-01", status: "Nghỉ phép", branch: "HN-03" },
  ],
  employees: [
    { id: 1, employeeCode: "AT014", name: "Lê Thanh Mai", phone: "0901000014", email: "mai@jtexpress.vn", department: "An toàn", position: "Điều phối sự cố", branch: "HCM-01" },
    { id: 2, employeeCode: "KT031", name: "Hoàng Gia Phúc", phone: "0901000031", email: "phuc@jtexpress.vn", department: "Kỹ thuật", position: "Kỹ thuật viên", branch: "BD-02" },
    { id: 3, employeeCode: "CN008", name: "Vũ Khánh Linh", phone: "0901000008", email: "linh@jtexpress.vn", department: "Chi nhánh", position: "Quản lý chi nhánh", branch: "HN-03" },
  ],
  branches: [
    { id: 1, code: "HCM-01", name: "Trung tâm Hồ Chí Minh", address: "KCN Tân Bình, TP.HCM", region: "Miền Nam", status: "Hoạt động", trips: "128", incidentRate: "2.8%", productivity: "96%" },
    { id: 2, code: "BD-02", name: "Kho Bình Dương", address: "Thuận An, Bình Dương", region: "Miền Nam", status: "Hoạt động", trips: "84", incidentRate: "4.1%", productivity: "91%" },
    { id: 3, code: "HN-03", name: "Hub Hà Nội", address: "Long Biên, Hà Nội", region: "Miền Bắc", status: "Hoạt động", trips: "102", incidentRate: "1.9%", productivity: "98%" },
  ],
  incidents: [
    { id: 1, code: "SC-2026-0615-01", name: "Nổ lốp trên QL13", time: "2026-06-15 08:20", gps: "10.957, 106.713", incidentType: "Lốp xe", status: "Đang xử lý", tripCode: "CH-8891", driverCode: "TX228", plate: "61H-445.23", staffCode: "AT014", staffName: "Lê Thanh Mai", images: "3 ảnh hiện trường", severity: "Trung bình", cost: "4200000", fault: "Chưa phán định", approval: "Chi nhánh duyệt" },
    { id: 2, code: "SC-2026-0614-02", name: "Va chạm nhẹ tại bãi xe", time: "2026-06-14 19:45", gps: "10.803, 106.629", incidentType: "Va chạm", status: "Đã ghi nhận", tripCode: "CH-8874", driverCode: "TX019", plate: "51C-892.10", staffCode: "AT014", staffName: "Lê Thanh Mai", images: "2 ảnh hiện trường", severity: "Nhẹ", cost: "2800000", fault: "Tài xế bất cẩn", approval: "Tài xế chi trả" },
    { id: 3, code: "SC-2026-0610-03", name: "Hỏng hộp số", time: "2026-06-10 11:10", gps: "21.038, 105.882", incidentType: "Động cơ", status: "Hoàn tất sửa chữa", tripCode: "CH-8720", driverCode: "TX301", plate: "50H-781.88", staffCode: "KT031", staffName: "Hoàng Gia Phúc", images: "5 ảnh, 1 biên bản", severity: "Nặng", cost: "12500000", fault: "Hao mòn kỹ thuật", approval: "Duyệt khẩn cấp" },
  ],
  inspections: [
    { id: 1, code: "NT-7781", date: "2026-06-15", solution: "Thay lốp trước, kiểm tra cân bằng", quote: "4200000", plate: "61H-445.23", invoiceCode: "HD-991", incidentCode: "SC-2026-0615-01", staffCode: "KT031", staffName: "Hoàng Gia Phúc" },
    { id: 2, code: "NT-7719", date: "2026-06-11", solution: "Sửa hộp số, thay dầu", quote: "12500000", plate: "50H-781.88", invoiceCode: "HD-975", incidentCode: "SC-2026-0610-03", staffCode: "KT031", staffName: "Hoàng Gia Phúc" },
  ],
  trips: [
    { id: 1, code: "CH-8891", route: "Bình Dương - TP.HCM", eta: "2026-06-15 12:30", quantity: "320 kiện", status: "Đang xử lý sự cố", plate: "61H-445.23", driverCode: "TX228", driverName: "Trần Văn Bình" },
    { id: 2, code: "CH-8874", route: "TP.HCM - Đồng Nai", eta: "2026-06-14 22:00", quantity: "180 kiện", status: "Không hoàn thành", plate: "51C-892.10", driverCode: "TX019", driverName: "Phạm Quốc Huy" },
    { id: 3, code: "CH-8910", route: "Hà Nội - Hải Phòng", eta: "2026-06-16 09:15", quantity: "240 kiện", status: "Đang vận hành", plate: "50H-781.88", driverCode: "TX301", driverName: "Lý Anh Đức" },
  ],
  garages: [
    { id: 1, code: "GA-01", name: "Gara Minh Tâm", address: "Thuận An, Bình Dương", phone: "0274000111", region: "Miền Nam", status: "Liên kết" },
    { id: 2, code: "GA-02", name: "Trạm kỹ thuật Long Biên", address: "Long Biên, Hà Nội", phone: "0243000222", region: "Miền Bắc", status: "Liên kết" },
    { id: 3, code: "GA-03", name: "Cứu hộ 24/7 Sài Gòn", address: "Tân Bình, TP.HCM", phone: "0283000333", region: "Miền Nam", status: "Ưu tiên" },
  ],
  invoices: [
    { id: 1, code: "HD-991", garageCode: "GA-01", acceptanceCode: "NT-7781", services: "Thay lốp; cân bằng động", total: "4200000", paidAt: "2026-06-15", method: "Chuyển khoản", images: "invoice-991.jpg" },
    { id: 2, code: "HD-975", garageCode: "GA-02", acceptanceCode: "NT-7719", services: "Sửa hộp số; thay dầu", total: "12500000", paidAt: "2026-06-11", method: "Chuyển khoản", images: "invoice-975.jpg" },
  ],
  categories: [
    { id: 1, categoryCode: "LS-01", name: "Lốp xe", severity: "Trung bình", description: "Nổ lốp, mòn lốp, mất áp suất.", guide: "Dừng xe an toàn, chụp hiện trường, gọi gara gần nhất." },
    { id: 2, categoryCode: "VC-02", name: "Va chạm", severity: "Tùy mức độ", description: "Va quẹt, tai nạn giao thông.", guide: "Bật cảnh báo, chụp ảnh, báo nhân viên an toàn và công an nếu cần." },
    { id: 3, categoryCode: "DC-03", name: "Động cơ", severity: "Nặng", description: "Hỏng hộp số, quá nhiệt, chết máy.", guide: "Không tiếp tục vận hành, yêu cầu cứu hộ và lập hồ sơ bảo hiểm." },
  ],
};

let state = loadState();
let currentRole = "fleet";
let currentView = "dashboard";
let currentLang = "vi";
let gpsTick = 0;

const els = {
  roleScreen: document.getElementById("role-screen"),
  loginScreen: document.getElementById("login-screen"),
  app: document.getElementById("app"),
  loginForm: document.getElementById("login-form"),
  loginRole: document.getElementById("login-role"),
  loginLanguageSelect: document.getElementById("login-language-select"),
  roleLanguageSelect: document.getElementById("role-language-select"),
  userRoleLabel: document.getElementById("user-role-label"),
  nav: document.getElementById("nav"),
  sectionTitle: document.getElementById("section-title"),
  sectionEyebrow: document.getElementById("section-eyebrow"),
  modalRoot: document.getElementById("modal-root"),
  toastRoot: document.getElementById("toast-root"),
  languageSelect: document.getElementById("language-select"),
};

document.addEventListener("DOMContentLoaded", () => {
  els.loginForm.addEventListener("submit", handleLogin);
  document.getElementById("back-role-btn").addEventListener("click", showRoleScreen);
  document.getElementById("logout-btn").addEventListener("click", logout);
  document.getElementById("quick-incident-btn").addEventListener("click", openQuickIncident);
  document.getElementById("export-btn").addEventListener("click", exportReport);
  els.languageSelect.addEventListener("change", applyLanguage);
  els.loginLanguageSelect.addEventListener("change", applyLanguage);
  els.roleLanguageSelect.addEventListener("change", applyLanguage);
  document.getElementById("toggle-password").addEventListener("click", togglePassword);
  document.addEventListener("click", handleDocumentClick);
  applyLanguage(null, true);
  renderAll();
  setInterval(updateGps, 1800);
});

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return structuredClone(seedData);
  try {
    return JSON.parse(saved);
  } catch {
    return structuredClone(seedData);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function handleLogin(event) {
  event.preventDefault();
  currentRole = els.loginRole.value;
  els.userRoleLabel.textContent = roleLabelsByLang[currentLang][currentRole];
  els.roleScreen.classList.add("hidden");
  els.loginScreen.classList.add("hidden");
  els.app.classList.remove("hidden");
  currentView = navItems.find((item) => item.roles.includes(currentRole)).id;
  renderAll();
  toast(`Đăng nhập với vai trò ${roleLabels[currentRole]}`);
}

function logout() {
  els.app.classList.add("hidden");
  els.loginScreen.classList.add("hidden");
  els.roleScreen.classList.remove("hidden");
}

function showRoleScreen() {
  els.loginScreen.classList.add("hidden");
  els.app.classList.add("hidden");
  els.roleScreen.classList.remove("hidden");
}

function chooseLoginRole(role) {
  const demoCodes = { driver: "TX228", safety: "AT014", fleet: "QL001" };
  currentRole = role;
  els.loginRole.value = role;
  document.getElementById("login-code").value = demoCodes[role] || "QL001";
  els.roleScreen.classList.add("hidden");
  els.loginScreen.classList.remove("hidden");
  updateRoleOptions();
}

function renderAll() {
  renderNav();
  renderDashboard();
  Object.keys(entityConfigs).forEach(renderEntity);
  renderPolicy();
  switchView(currentView);
}

function renderNav() {
  els.nav.innerHTML = navItems
    .filter((item) => item.roles.includes(currentRole))
    .map((item) => `<button type="button" data-view="${item.id}"><span class="icon">${navIcon(item.id)}</span>${navLabels[currentLang][item.id] || item.label}</button>`)
    .join("");
}

function navIcon(id) {
  const icons = {
    dashboard: '<path d="M4 5h7v7H4zM13 5h7v4h-7zM13 11h7v8h-7zM4 14h7v5H4z"/>',
    accounts: '<path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4z"/><path d="M4 20a8 8 0 0 1 16 0"/>',
    trucks: '<path d="M3 7h11v9H3z"/><path d="M14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',
    drivers: '<path d="M12 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4z"/><path d="M5 21v-2a7 7 0 0 1 14 0v2"/><path d="M8 15l4 3 4-3"/>',
    employees: '<path d="M8 11a3 3 0 1 0-3-3 3 3 0 0 0 3 3z"/><path d="M16 11a3 3 0 1 0-3-3 3 3 0 0 0 3 3z"/><path d="M2 20a6 6 0 0 1 12 0"/><path d="M10 20a6 6 0 0 1 12 0"/>',
    branches: '<path d="M4 20V8l8-4 8 4v12"/><path d="M9 20v-7h6v7"/><path d="M4 10h16"/>',
    incidents: '<path d="M12 3 2 20h20L12 3z"/><path d="M12 9v5"/><path d="M12 17h.01"/>',
    inspections: '<path d="M7 3h10l3 3v15H4V3h3z"/><path d="M14 3v5h6"/><path d="M8 13h8"/><path d="M8 17h6"/>',
    trips: '<path d="M5 17 3 12l2-5h14l2 5-2 5z"/><path d="M7 17v3"/><path d="M17 17v3"/><path d="M8 12h8"/>',
    garages: '<path d="M4 20V9l8-5 8 5v11"/><path d="M8 20v-6h8v6"/><path d="M10 11h4"/>',
    invoices: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6"/><path d="M9 12h6"/><path d="M9 16h4"/>',
    categories: '<path d="M4 5h7v7H4z"/><path d="M13 5h7v7h-7z"/><path d="M4 14h7v7H4z"/><path d="M13 14h7v7h-7z"/>',
    policy: '<path d="M12 3 5 6v6c0 4 3 7 7 9 4-2 7-5 7-9V6z"/><path d="m9 12 2 2 4-5"/>',
  };
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[id] || icons.dashboard}</svg>`;
}

function switchView(viewId) {
  currentView = viewId;
  document.querySelectorAll(".view").forEach((view) => view.classList.toggle("active", view.id === `${viewId}-view`));
  document.querySelectorAll(".nav button").forEach((btn) => btn.classList.toggle("active", btn.dataset.view === viewId));
  const item = navItems.find((nav) => nav.id === viewId);
  els.sectionTitle.textContent = navLabels[currentLang][item?.id] || item?.label || navLabels[currentLang].dashboard;
  els.sectionEyebrow.textContent = viewId === "policy" ? translations[currentLang].policy_area : translations[currentLang].operations;
}

function renderDashboard() {
  const totalCost = 685000000 + state.incidents.reduce((sum, item) => sum + Number(item.cost || 0), 0);
  const activeIncidents = 42 + state.incidents.filter((item) => item.status !== "Hoàn tất sửa chữa").length;
  const expiring = 126 + getExpiringDrivers().length;
  const emergency = 5 + state.incidents.filter((item) => Number(item.cost || 0) > 5000000).length;
  const weeklyColumns = [
    ["T2", 186],
    ["T3", 244],
    ["T4", 318],
    ["T5", 271],
    ["T6", 392],
    ["T7", 228],
  ];
  const incoming = [
    ["!!", "Tai nạn giao thông - Đội xe Quận 7", "#INC-28491 · 15 phút trước", "KHẨN CẤP", "Xe: 51C-123.45"],
    ["BX", "Thất thoát hàng hóa - Kho HCM-01", "#INC-28485 · 1 giờ trước", "TRUNG BÌNH", "Giá trị: Cao"],
    ["AT", "Vi phạm quy trình ATLĐ - Bưu cục 22", "#INC-28477 · 3 giờ trước", "THẤP", "Thanh tra định kỳ"],
  ];

  document.getElementById("dashboard-view").innerHTML = `
    <div class="dashboard-intro">
      <div>
        <h3>Dashboard An toàn</h3>
        <p>Chào buổi sáng, ${roleLabelsByLang[currentLang][currentRole]}. Kiểm tra các sự cố mới nhất bên dưới.</p>
      </div>
      <img src="./images/jnt-ngang.png" alt="J&T Express" style="width:180px;max-width:30%" />
    </div>
    <div class="grid kpi-grid">
      ${kpi("Tổng số sự cố", "1,248", "+12% so với tháng trước")}
      ${kpi("Đang xử lý", activeIncidents, "Hiện tại")}
      ${kpi("Khẩn cấp", String(emergency).padStart(2, "0"), "Cần xử lý ngay", "hot")}
      ${kpi("Đã hoàn thành", "1,201", "96% SLA")}
    </div>
    <div class="chart-grid">
      <section class="panel">
        <h3>Sự cố cần tiếp nhận ngay</h3>
        <div class="incident-cards">
          ${incoming.map((item, index) => `
            <article class="incident-card">
              <div class="incident-icon">${item[0]}</div>
              <div>
                <strong>${item[1]}</strong><br>
                <span style="color:var(--muted)">${item[2]}</span><br>
                <span class="badge ${index === 0 ? "red" : index === 1 ? "amber" : "blue"}">${item[3]}</span>
                <span style="margin-left:8px;color:#6b4b4b">${item[4]}</span>
              </div>
              <button type="button" class="${index === 0 ? "danger-btn" : "secondary-btn"}" data-view="incidents">Tiếp nhận</button>
            </article>
          `).join("")}
        </div>
      </section>
      <section class="panel">
        <h3>Phân loại sự cố</h3>
        <div class="donut-wrap">
          <div class="donut" data-total="100%"></div>
          <div class="legend">
            <div class="legend-row"><span><i class="dot"></i>Giao thông</span><strong>58%</strong></div>
            <div class="legend-row"><span><i class="dot amber"></i>Hàng hóa</span><strong>23%</strong></div>
            <div class="legend-row"><span><i class="dot muted"></i>Khác</span><strong>19%</strong></div>
          </div>
        </div>
      </section>
    </div>
    <div class="chart-grid">
      <section class="panel">
        <h3>Thống kê sự cố trong tuần</h3>
        <div class="column-chart">
          ${weeklyColumns.map(([day, value]) => `<div class="column"><strong>${value}</strong><div class="column-bar" style="height:${value / 4}px"></div><span>${day}</span></div>`).join("")}
        </div>
      </section>
      <section class="panel">
        <h3>Thao tác nhanh</h3>
        <div class="quick-grid">
          <button type="button" class="quick-tile" data-add="incidents">Tạo sự cố</button>
          <button type="button" class="quick-tile" data-view="invoices">Báo cáo tuần</button>
          <button type="button" class="quick-tile" data-view="trips">Bản đồ nóng</button>
          <button type="button" class="quick-tile" data-view="policy">Cài đặt</button>
        </div>
        <h3 style="margin-top:22px">Chi phí phát sinh</h3>
        <strong style="font-size:26px">${formatMoney(totalCost)}</strong>
        <p style="color:var(--muted)">Bao gồm cứu hộ, sửa chữa và chi phí ngoài bảo hiểm.</p>
      </section>
    </div>
  `;
}

function renderEntity(key) {
  const config = entityConfigs[key];
  const [title, addLabel] = entityLabels[currentLang][key] || [config.title, config.addLabel];
  const rows = state[config.source];
  const view = document.getElementById(`${key}-view`);
  view.innerHTML = `
    ${renderEntityHero(key, title, rows.length)}
    <section class="panel">
      <div class="toolbar">
        <div class="filters">
          <input data-search="${key}" placeholder="${translations[currentLang].search_placeholder}" />
          ${config.filters.map((field) => renderFilter(key, field, rows)).join("")}
        </div>
        <button type="button" class="primary-btn" data-add="${key}">${addLabel}</button>
      </div>
      <div class="table-wrap" id="${key}-table"></div>
    </section>
    ${key === "incidents" ? renderIncidentTools() : ""}
    ${key === "branches" ? renderBranchSuggestion() : ""}
    ${key === "garages" ? renderGarageSuggestion() : ""}
  `;
  drawTable(key, rows);
}

function renderEntityHero(key, title, count) {
  const descriptions = {
    accounts: "Quản lý tài khoản theo mã nhân viên, vai trò, chi nhánh và trạng thái hoạt động.",
    trucks: "Theo dõi biển số, tải trọng, bảo hiểm, trạng thái vận hành và lịch sửa chữa xe tải.",
    drivers: "Quản lý hồ sơ tài xế, giấy phép lái xe, cảnh báo sắp hết hạn và chi nhánh phụ trách.",
    employees: "Danh sách nhân viên an toàn, kỹ thuật và quản lý chi nhánh tham gia xử lý sự cố.",
    branches: "Theo dõi chi nhánh, khu vực, năng suất, tỷ lệ sự cố và trạng thái hoạt động.",
    incidents: "Điều phối sự cố, kết nối tài xế, cập nhật hình ảnh, chi phí và luồng duyệt.",
    inspections: "Lập và kiểm tra phiếu nghiệm thu sau sửa chữa trước khi thanh toán gara.",
    trips: "Theo dõi chuyến hàng, tuyến đường, GPS và trạng thái vận hành theo thời gian thực.",
    garages: "Quản lý gara liên kết, đề xuất gara gần nhất theo khu vực và loại sự cố.",
    invoices: "Kiểm soát hóa đơn thanh toán, hạng mục sửa chữa, phương thức và ảnh chứng từ.",
    categories: "Chuẩn hóa loại sự cố, mức độ và hướng dẫn xử lý ban đầu cho tài xế.",
  };
  const image = ["trucks", "trips", "incidents", "garages", "inspections"].includes(key) ? "./images/xetai.jpg" : "./images/jnt-ngang.png";
  return `
    <section class="entity-hero">
      <div class="entity-hero-copy">
        <span class="eyebrow">${count} bản ghi đang quản lý</span>
        <h3>${title}</h3>
        <p>${descriptions[key] || "Theo dõi dữ liệu vận hành và xử lý nghiệp vụ trong hệ thống."}</p>
      </div>
      <img src="${image}" alt="" />
    </section>
  `;
}

function renderFilter(key, field, rows) {
  const values = [...new Set(rows.map((row) => row[field]).filter(Boolean))];
  return `
    <select data-filter="${key}" data-field="${field}">
      <option value="">${labelFor(field)}: ${translations[currentLang].all}</option>
      ${values.map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join("")}
    </select>
  `;
}

function drawTable(key, rows) {
  const config = entityConfigs[key];
  const search = document.querySelector(`[data-search="${key}"]`)?.value?.toLowerCase() || "";
  const activeFilters = [...document.querySelectorAll(`[data-filter="${key}"]`)].reduce((acc, select) => {
    if (select.value) acc[select.dataset.field] = select.value;
    return acc;
  }, {});
  const filtered = rows.filter((row) => {
    const inSearch = Object.values(row).join(" ").toLowerCase().includes(search);
    const inFilters = Object.entries(activeFilters).every(([field, value]) => row[field] === value);
    return inSearch && inFilters;
  });
  document.getElementById(`${key}-table`).innerHTML = `
    <table>
      <thead>
        <tr>
          ${config.columns.map((field) => `<th>${labelFor(field)}</th>`).join("")}
          <th>${currentLang === "vi" ? "Thao tác" : currentLang === "en" ? "Actions" : "操作"}</th>
        </tr>
      </thead>
      <tbody>
        ${filtered.map((row) => renderRow(key, row, config.columns)).join("") || `<tr><td colspan="${config.columns.length + 1}">${translations[currentLang].no_data}</td></tr>`}
      </tbody>
    </table>
  `;
}

function renderRow(key, row, columns) {
  return `
    <tr>
      ${columns.map((field) => `<td>${formatCell(field, row[field])}</td>`).join("")}
      <td>
        <div class="actions">
          <button type="button" class="table-btn" data-detail="${key}" data-id="${row.id}">${translations[currentLang].view}</button>
          <button type="button" class="table-btn" data-edit="${key}" data-id="${row.id}">${translations[currentLang].edit}</button>
          ${key === "incidents" ? `<button type="button" class="table-btn" data-call="${row.id}">${translations[currentLang].call}</button><button type="button" class="table-btn" data-process="${row.id}">${translations[currentLang].process}</button>` : ""}
          <button type="button" class="table-btn" data-delete="${key}" data-id="${row.id}">${translations[currentLang].delete}</button>
        </div>
      </td>
    </tr>
  `;
}

function formatCell(field, value) {
  const text = escapeHtml(value ?? "");
  if (field === "status") return statusBadge(text);
  if (field === "approval") return approvalBadge(text);
  if (field === "severity") return severityBadge(text);
  if (["cost", "quote", "total"].includes(field)) return formatMoney(Number(value || 0));
  return text;
}

function renderIncidentTools() {
  return `
    <div class="split" style="margin-top:16px">
      <section class="panel">
        <h3>Luồng xử lý sự cố</h3>
        <div class="timeline">
          ${timeline("1 phút", "Tài xế bấm báo sự cố, hệ thống ghi GPS và tạo mã sự cố.")}
          ${timeline("3 phút", "Feishu Bot gửi cảnh báo cho nhân viên an toàn chi nhánh gần nhất.")}
          ${timeline("15 phút", "Nhân viên cập nhật hình ảnh, phân loại và gọi trực tiếp tài xế.")}
          ${timeline("> 5 triệu", "Hệ thống khóa duyệt cấp cơ sở và kích hoạt duyệt khẩn cấp lên Giám đốc.")}
        </div>
      </section>
      <section class="panel">
        <h3>Kiểm tra chi phí và kỷ luật</h3>
        <p class="chip">Hư hỏng dưới 3.000.000 VNĐ: tài xế chi trả và nhắc nhở.</p>
        <p class="chip">Hư hỏng trên 3.000.000 VNĐ: tài xế chi trả và đình chỉ 01 tuần.</p>
        <p class="chip">Khấu trừ lương không vượt quá 30% lương tháng.</p>
      </section>
    </div>
  `;
}

function renderBranchSuggestion() {
  return `
    <section class="panel" style="margin-top:16px">
      <h3>Đề xuất chi nhánh gần sự cố</h3>
      <p>SC-2026-0615-01 tại Bình Dương phù hợp điều phối từ <strong>Kho Bình Dương (BD-02)</strong>, khoảng cách 8.4 km, có nhân viên kỹ thuật KT031.</p>
    </section>
  `;
}

function renderGarageSuggestion() {
  return `
    <section class="panel" style="margin-top:16px">
      <h3>Đề xuất gara gần nhất</h3>
      <p>Với sự cố lốp xe của CH-8891, hệ thống đề xuất <strong>Gara Minh Tâm (GA-01)</strong>, khu vực Miền Nam, trạng thái liên kết, hỗ trợ cứu hộ trong 20 phút.</p>
    </section>
  `;
}

function renderPolicy() {
  document.getElementById("policy-view").innerHTML = `
    <div class="policy-grid">
      ${policy("Bảo hiểm và hồ sơ giám định", "Bắt buộc chụp hình hiện trường, lập báo cáo chi tiết, lưu GPS, báo đúng thời hạn và phối hợp giám định theo Nghị định 67/2023/NĐ-CP.")}
      ${policy("Duyệt cứu hộ", "Chi phí cứu hộ ≤ 5.000.000 VNĐ do quản lý chi nhánh duyệt. Báo giá > 5.000.000 VNĐ tự động chuyển duyệt khẩn cấp cấp Giám đốc.")}
      ${policy("Kỷ luật và khấu trừ", "Hệ thống chỉ mô phỏng đề xuất chế tài, có cảnh báo giới hạn khấu trừ không vượt 30% lương tháng và bảo toàn quyền tạm ứng lương.")}
      ${policy("Lưu trữ vĩnh viễn", "Toàn bộ lịch sử sự cố, hình ảnh, nghiệm thu, hóa đơn và phán định lỗi được giữ để phân tích nguyên nhân gốc rễ và cải tiến đào tạo, bảo dưỡng.")}
      ${policy("Nguồn lực triển khai", "Quy trình tận dụng tài xế, nhân viên an toàn, kỹ thuật, quản lý đội xe và Feishu Bot; không yêu cầu thêm tầng nhân sự vận hành.")}
    </div>
  `;
}

function policy(title, text) {
  return `<article class="policy-card"><h3>${title}</h3><p>${text}</p></article>`;
}

function kpi(label, value, hint, tone = "") {
  return `<article class="kpi ${tone}"><span>${label}</span><strong>${value}</strong><small>${hint}</small></article>`;
}

function renderBars(group) {
  const entries = Object.entries(group);
  const max = Math.max(...entries.map(([, count]) => count), 1);
  return `<div class="bars">${entries.map(([name, count]) => `
    <div class="bar-row">
      <span>${escapeHtml(name)}</span>
      <div class="bar-track"><div class="bar-fill" style="width:${(count / max) * 100}%"></div></div>
      <strong>${count}</strong>
    </div>
  `).join("")}</div>`;
}

function timeline(time, content) {
  return `<div class="timeline-item"><time>${time}</time><div>${content}</div></div>`;
}

function handleDocumentClick(event) {
  if (event.target === els.modalRoot && !els.modalRoot.classList.contains("hidden")) {
    closeModal();
    return;
  }
  const target = event.target.closest("button");
  if (!target) return;
  if (target.dataset.roleChoice) chooseLoginRole(target.dataset.roleChoice);
  if (target.dataset.view) switchView(target.dataset.view);
  if (target.dataset.add) openEntityForm(target.dataset.add);
  if (target.dataset.edit) openEntityForm(target.dataset.edit, Number(target.dataset.id));
  if (target.dataset.detail) openDetail(target.dataset.detail, Number(target.dataset.id));
  if (target.dataset.delete) deleteItem(target.dataset.delete, Number(target.dataset.id));
  if (target.hasAttribute("data-close-modal")) closeModal();
  if (target.dataset.call) callDriver(Number(target.dataset.call));
  if (target.dataset.process) processIncident(Number(target.dataset.process));
}

document.addEventListener("input", (event) => {
  const key = event.target.dataset.search;
  if (key) drawTable(key, state[entityConfigs[key].source]);
});

document.addEventListener("change", (event) => {
  const key = event.target.dataset.filter;
  if (key) drawTable(key, state[entityConfigs[key].source]);
});

function openEntityForm(key, id = null) {
  const config = entityConfigs[key];
  const [titleLabel, addLabel] = entityLabels[currentLang][key] || [config.title, config.addLabel];
  const existing = id ? state[config.source].find((item) => item.id === id) : {};
  const title = id ? `${currentLang === "vi" ? "Cập nhật" : currentLang === "en" ? "Update" : "更新"} ${titleLabel.toLowerCase()}` : addLabel;
  openModal(title, `
    <form id="entity-form" class="form-grid">
      ${config.fields.map((field) => renderInput(field, existing[field])).join("")}
    </form>
  `, `
    <button type="button" class="secondary-btn" data-close-modal>${translations[currentLang].cancel}</button>
    <button type="button" class="primary-btn" id="save-entity-btn">${translations[currentLang].save}</button>
  `);
  document.getElementById("save-entity-btn").addEventListener("click", () => saveEntity(key, id));
}

function renderInput(field, value = "") {
  const textareaFields = ["description", "guide", "services", "images", "address", "solution"];
  const selectOptions = getOptionsForField(field);
  if (selectOptions.length) {
    return `<label><span>${labelFor(field)}</span><select name="${field}">${selectOptions.map((option) => `<option ${option === value ? "selected" : ""}>${option}</option>`).join("")}</select></label>`;
  }
  if (textareaFields.includes(field)) {
    return `<label class="full"><span>${labelFor(field)}</span><textarea name="${field}" rows="3">${escapeHtml(value)}</textarea></label>`;
  }
  const type = field.includes("date") || field === "paidAt" || field === "licenseExpiry" ? "date" : "text";
  return `<label><span>${labelFor(field)}</span><input name="${field}" type="${type}" value="${escapeHtml(value)}" /></label>`;
}

function getOptionsForField(field) {
  const options = {
    role: ["Quản lý đội xe", "Quản lý chi nhánh", "Nhân viên an toàn", "Tài xế", "Bộ phận kỹ thuật"],
    status: ["Hoạt động", "Sẵn sàng", "Đang vận hành", "Đang chạy", "Đang sửa chữa", "Đang xử lý", "Đã ghi nhận", "Hoàn tất sửa chữa", "Nghỉ phép", "Ngừng hoạt động", "Liên kết", "Ưu tiên", "Chưa bắt đầu", "Không hoàn thành"],
    branch: state.branches.map((item) => item.code),
    incidentType: state.categories.map((item) => item.name),
    severity: ["Nhẹ", "Trung bình", "Nặng", "Tùy mức độ"],
    approval: ["Chi nhánh duyệt", "Duyệt khẩn cấp", "Tài xế chi trả", "Chờ phán định"],
    method: ["Chuyển khoản", "Tiền mặt", "Cấn trừ công nợ"],
    insurance: ["PJICO 2026", "Bảo Việt 2026", "PVI 2026", "Chưa cập nhật"],
  };
  return options[field] || [];
}

function saveEntity(key, id) {
  const config = entityConfigs[key];
  const form = document.getElementById("entity-form");
  const data = Object.fromEntries(new FormData(form).entries());
  if (key === "incidents") {
    data.approval = Number(data.cost || 0) > 5000000 ? "Duyệt khẩn cấp" : data.approval || "Chi nhánh duyệt";
  }
  if (id) {
    state[config.source] = state[config.source].map((item) => (item.id === id ? { ...item, ...data } : item));
  } else {
    state[config.source].unshift({ id: Date.now(), ...data });
  }
  saveState();
  closeModal();
  renderAll();
  toast("Đã lưu thay đổi.");
}

function openDetail(key, id) {
  const config = entityConfigs[key];
  const [titleLabel] = entityLabels[currentLang][key] || [config.title];
  const item = state[config.source].find((row) => row.id === id);
  const prefix = currentLang === "vi" ? "Chi tiết" : currentLang === "en" ? "Details" : "详情";
  openModal(`${prefix} ${titleLabel.toLowerCase()}`, `
    <div class="detail-list">
      ${Object.entries(item).filter(([field]) => field !== "id").map(([field, value]) => `
        <div><span>${labelFor(field)}</span>${formatCell(field, value)}</div>
      `).join("")}
    </div>
  `, `<button type="button" class="primary-btn" data-close-modal>${translations[currentLang].close}</button>`);
}

function deleteItem(key, id) {
  const config = entityConfigs[key];
  const item = state[config.source].find((row) => row.id === id);
  openModal("Xác nhận xóa", `<p>Bạn muốn xóa bản ghi <strong>${escapeHtml(item.code || item.name || item.plate || item.driverCode)}</strong>? Thao tác này mô phỏng xóa khỏi danh sách hiện tại.</p>`, `
    <button type="button" class="secondary-btn" data-close-modal>${translations[currentLang].cancel}</button>
    <button type="button" class="danger-btn" id="confirm-delete-btn">${translations[currentLang].delete}</button>
  `);
  document.getElementById("confirm-delete-btn").addEventListener("click", () => {
    state[config.source] = state[config.source].filter((row) => row.id !== id);
    saveState();
    closeModal();
    renderAll();
    toast("Đã xóa bản ghi.");
  });
}

function openQuickIncident() {
  const next = `SC-2026-${String(Date.now()).slice(-6)}`;
  openModal("Báo sự cố nhanh", `
    <form id="entity-form" class="form-grid">
      ${renderInput("code", next)}
      ${renderInput("time", new Date().toLocaleString("vi-VN"))}
      ${renderInput("gps", "10.957, 106.713")}
      ${renderInput("incidentType", "Lốp xe")}
      ${renderInput("name", "Sự cố mới từ tài xế")}
      ${renderInput("status", "Đã ghi nhận")}
      ${renderInput("tripCode", "CH-8891")}
      ${renderInput("driverCode", "TX228")}
      ${renderInput("plate", "61H-445.23")}
      ${renderInput("staffCode", "AT014")}
      ${renderInput("staffName", "Lê Thanh Mai")}
      ${renderInput("images", "Chưa tải ảnh")}
      ${renderInput("severity", "Trung bình")}
      ${renderInput("cost", "0")}
      ${renderInput("fault", "Chưa phán định")}
      ${renderInput("approval", "Chờ phán định")}
    </form>
  `, `
    <button type="button" class="secondary-btn" data-close-modal>${translations[currentLang].cancel}</button>
    <button type="button" class="primary-btn" id="save-entity-btn">Feishu Bot</button>
  `);
  document.getElementById("save-entity-btn").addEventListener("click", () => saveEntity("incidents"));
}

function callDriver(id) {
  const incident = state.incidents.find((item) => item.id === id);
  const driver = state.drivers.find((item) => item.driverCode === incident.driverCode);
  openModal("Kết nối cuộc gọi tức thì", `
    <div class="detail-list">
      <div><span>Tài xế</span>${driver?.name || incident.driverCode}</div>
      <div><span>Số điện thoại</span>${driver?.phone || "Chưa có"}</div>
      <div><span>Sự cố</span>${incident.name}</div>
      <div><span>GPS</span>${incident.gps}</div>
    </div>
    <p style="margin-top:14px">Mô phỏng cuộc gọi đã sẵn sàng. Nhân viên an toàn có thể xác nhận tình trạng, hướng dẫn chụp ảnh hiện trường và điều phối gara.</p>
  `, `<button type="button" class="success-btn" data-close-modal>${currentLang === "vi" ? "Đã kết nối" : currentLang === "en" ? "Connected" : "已连接"}</button>`);
}

function processIncident(id) {
  const incident = state.incidents.find((item) => item.id === id);
  const cost = Number(incident.cost || 0);
  const discipline = cost > 3000000 ? "Tài xế chi trả theo phán định và đình chỉ công tác 01 tuần nếu cố ý gây hư hỏng." : "Tài xế chi trả theo phán định và bị nhắc nhở nếu cố ý gây hư hỏng.";
  const approval = cost > 5000000 ? "Duyệt khẩn cấp cấp Giám đốc" : "Quản lý chi nhánh được duyệt";
  openModal("Mô phỏng xử lý sự cố", `
    <div class="detail-list">
      <div><span>Mã sự cố</span>${incident.code}</div>
      <div><span>Chi phí</span>${formatMoney(cost)}</div>
      <div><span>Luồng duyệt</span>${approval}</div>
      <div><span>Chế tài</span>${discipline}</div>
      <div><span>Bảo hiểm</span>Yêu cầu ảnh hiện trường, báo cáo chi tiết, hóa đơn và phiếu nghiệm thu.</div>
      <div><span>Tuân thủ lương</span>Cảnh báo khấu trừ không vượt 30% lương tháng.</div>
    </div>
  `, `
    <button type="button" class="secondary-btn" data-close-modal>${translations[currentLang].close}</button>
    <button type="button" class="primary-btn" id="mark-done-btn">${currentLang === "vi" ? "Đánh dấu hoàn tất sửa chữa" : currentLang === "en" ? "Mark repair completed" : "标记维修完成"}</button>
  `);
  document.getElementById("mark-done-btn").addEventListener("click", () => {
    incident.status = "Hoàn tất sửa chữa";
    saveState();
    closeModal();
    renderAll();
    toast("Sự cố đã chuyển trạng thái hoàn tất sửa chữa.");
  });
}

function openModal(title, body, footer = "") {
  els.modalRoot.classList.remove("hidden");
  els.modalRoot.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true">
      <header>
        <h3>${title}</h3>
        <button type="button" class="ghost-btn" data-close-modal>${translations[currentLang].close}</button>
      </header>
      <div class="modal-body">${body}</div>
      <div class="modal-footer">${footer}</div>
    </div>
  `;
}

function closeModal() {
  els.modalRoot.classList.add("hidden");
  els.modalRoot.innerHTML = "";
}

function toast(message) {
  const node = document.createElement("div");
  node.className = "toast";
  node.textContent = message;
  els.toastRoot.appendChild(node);
  setTimeout(() => node.remove(), 2800);
}

function exportReport() {
  const report = {
    generatedAt: new Date().toISOString(),
    brandMessage: {
      vi: translations.vi.tagline,
      en: translations.en.tagline,
      zh: translations.zh.tagline,
    },
    summary: {
      incidents: state.incidents.length,
      openIncidents: state.incidents.filter((item) => item.status !== "Hoàn tất sửa chữa").length,
      trucks: state.trucks.length,
      drivers: state.drivers.length,
      invoices: state.invoices.length,
    },
    data: state,
  };
  const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "jt-fleet-incident-report.json";
  link.click();
  URL.revokeObjectURL(link.href);
  toast(translations[currentLang].export_ok);
}

function applyLanguage(event = null, silent = false) {
  const lang = event?.target?.value || currentLang;
  currentLang = lang;
  els.languageSelect.value = lang;
  els.loginLanguageSelect.value = lang;
  els.roleLanguageSelect.value = lang;
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = translations[lang][node.dataset.i18n] || node.textContent;
  });
  document.querySelectorAll("[data-i18n-html]").forEach((node) => {
    node.innerHTML = translations[lang][node.dataset.i18nHtml] || node.innerHTML;
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.placeholder = translations[lang][node.dataset.i18nPlaceholder] || node.placeholder;
  });
  document.getElementById("logout-btn").textContent = translations[lang].logout;
  document.getElementById("quick-incident-btn").textContent = translations[lang].quick_incident;
  document.getElementById("export-btn").textContent = translations[lang].export_report;
  updateRoleOptions();
  els.userRoleLabel.textContent = roleLabelsByLang[lang][currentRole];
  if (!els.app.classList.contains("hidden")) {
    renderAll();
  } else {
    renderNav();
  }
  if (!silent) toast(`Ngôn ngữ: ${els.languageSelect.options[els.languageSelect.selectedIndex].text}`);
}

function updateRoleOptions() {
  [...els.loginRole.options].forEach((option) => {
    option.textContent = roleLabelsByLang[currentLang][option.value] || option.textContent;
  });
}

function togglePassword() {
  const input = document.getElementById("login-password");
  input.type = input.type === "password" ? "text" : "password";
}

function updateGps() {
  const truck = document.getElementById("gps-truck");
  if (!truck) return;
  const path = [
    [12, 66],
    [25, 58],
    [42, 50],
    [59, 42],
    [72, 34],
    [82, 48],
    [64, 61],
    [46, 70],
  ];
  const [left, top] = path[gpsTick % path.length];
  truck.style.left = `${left}%`;
  truck.style.top = `${top}%`;
  gpsTick += 1;
}

function getExpiringDrivers() {
  const today = new Date("2026-06-15T00:00:00");
  return state.drivers.filter((driver) => {
    const expiry = new Date(`${driver.licenseExpiry}T00:00:00`);
    const diff = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    return diff >= 0 && diff <= 30;
  });
}

function groupCount(items, field) {
  return items.reduce((acc, item) => {
    const key = item[field] || "Chưa cập nhật";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

function statusBadge(value) {
  const color = value.includes("Hoàn tất") || value.includes("Hoạt động") || value.includes("Sẵn sàng") || value.includes("Liên kết") ? "green" : value.includes("Đang") ? "amber" : value.includes("Ngừng") || value.includes("Không") ? "red" : "blue";
  return `<span class="badge ${color}">${escapeHtml(value)}</span>`;
}

function approvalBadge(value) {
  const color = value.includes("khẩn") ? "red" : value.includes("chi trả") ? "amber" : value.includes("duyệt") ? "green" : "blue";
  return `<span class="badge ${color}">${escapeHtml(value)}</span>`;
}

function severityBadge(value) {
  const color = value.includes("Nặng") ? "red" : value.includes("Trung") || value.includes("Tùy") ? "amber" : "green";
  return `<span class="badge ${color}">${escapeHtml(value)}</span>`;
}

function formatMoney(value) {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(value);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
