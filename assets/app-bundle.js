
function isLongTermOrMonthlyPlan(planName) {
  if (!planName) return false;
  var p = planName.toLowerCase();
  return p.includes('30 ngày') || p.includes('30 ngay') || p.includes('1 tháng') || p.includes('1 thang') || p.includes('vĩnh viễn') || p.includes('vinh vien') || p.includes('month');
}
function manageModalFocus(modalEl) {
  if (!modalEl) return;
  setTimeout(function() {
    var focusable = modalEl.querySelectorAll('button:not([disabled]), input:not([disabled]), [tabindex="0"]');
    if (focusable.length > 0) {
      focusable[0].focus();
    }
  }, 60);
}
"use strict";

// ══ GAMING SPLASH SCREEN CONTROLLER ══
var introTimeoutId = null;

function skipIntro(e) {
  if (e && e.stopPropagation) e.stopPropagation();
  if (introTimeoutId) {
    clearTimeout(introTimeoutId);
    introTimeoutId = null;
  }
  var intro = document.getElementById("gamingIntro");
  if (intro && intro.parentNode) {
    intro.parentNode.removeChild(intro);
  }
  // Chỉ mở lại thanh cuộn trang nếu KHÔNG có màn hình bảo trì đang bật
  if (!document.getElementById("maintenanceOverlay")) {
    document.body.style.overflow = "";
  }
}
window.skipIntro = skipIntro;

function playIntroAnimation() {
  var existingIntro = document.getElementById("gamingIntro");
  if (existingIntro && existingIntro.parentNode) {
    existingIntro.parentNode.removeChild(existingIntro);
  }

  if (introTimeoutId) {
    clearTimeout(introTimeoutId);
    introTimeoutId = null;
  }

  var intro = document.createElement("div");
  intro.id = "gamingIntro";
  intro.className = "dp-intro-overlay";
  intro.setAttribute("role", "alertdialog");
  intro.setAttribute("aria-modal", "true");
  intro.setAttribute("aria-label", "Giới thiệu cửa hàng");
  intro.onclick = function(e) { skipIntro(e); };
  intro.onkeydown = function(event) {
    if (event.key === "Enter" || event.key === "Escape") skipIntro(event);
  };

  intro.innerHTML = 
    '<button type="button" class="intro-skip-btn" onclick="skipIntro(event)" aria-label="Bỏ qua giới thiệu">Bỏ qua ➔</button>' +
    '<div class="intro-cyber-grid-bg"></div>' +
    '<div class="intro-beam intro-beam-left"></div>' +
    '<div class="intro-beam intro-beam-right"></div>' +
    '<div class="intro-shockwave"></div>' +
    '<div class="intro-flash-bg"></div>' +
    '<div class="dp-intro-clash-content" id="dpIntroClashContent">' +
      '<div class="dp-intro-logo-glow" id="dpIntroLogoBox">' +
        '<div class="intro-logo-aura"></div>' +
        '<img src="assets/uploads/logos/aizen-logo.png" alt="Logo NEXVIA VN" class="dp-intro-logo-img">' +
      '</div>' +
      '<div class="dp-intro-brand-box" id="dpIntroBrandBox">' +
        '<div class="dp-intro-title">NEXVIA VN</div>' +
        '<div class="dp-intro-subline">⚡ GAMING STORE • MOD &amp; UTILITIES ⚡</div>' +
      '</div>' +
    '</div>';

  document.body.prepend(intro);
  intro.style.display = "flex";
  document.body.style.overflow = "hidden";

  introTimeoutId = setTimeout(function() {
    skipIntro();
  }, 2000);
}
window.playIntroAnimation = playIntroAnimation;

(function initSplash() {
  // Nếu đang bảo trì thì không chạy intro ban đầu
  if (document.getElementById("maintenanceOverlay") || window.isMaintenanceActive) {
    var existingIntro = document.getElementById("gamingIntro");
    if (existingIntro && existingIntro.parentNode) existingIntro.parentNode.removeChild(existingIntro);
    return;
  }
  playIntroAnimation();
})();

// ══ HỆ THỐNG KIỂM TRA BẢO TRÌ REALTIME (MAINTENANCE GUARD VỚI ÂN HẠN ĐƠN HÀNG) ══
var isMaintenanceActive = false;
var cachedMaintenanceData = null;

function isCustomerInCheckout() {
  var buyModal = document.getElementById('buyModal');
  var paidModal = document.getElementById('paidModal');
  var isBuyModalOpen = buyModal && buyModal.classList.contains('open');
  var isPaidModalOpen = paidModal && paidModal.classList.contains('open');
  var hasActiveOrder = Boolean(window.currentOrderId || window.currentOrderMemo);
  return (isBuyModalOpen || isPaidModalOpen || hasActiveOrder);
}

function renderMaintenanceScreen(msg, until) {
  if (isCustomerInCheckout()) {
    return;
  }

  if (document.getElementById('maintenanceOverlay')) return;
  var overlay = document.createElement('div');
  overlay.id = 'maintenanceOverlay';
  overlay.className = 'maintenance-screen';
  overlay.innerHTML = 
    '<div class="maint-cyber-grid"></div>' +
    '<div class="maint-ambient-orb maint-orb-1"></div>' +
    '<div class="maint-ambient-orb maint-orb-2"></div>' +
    '<div class="maint-ambient-orb maint-orb-3"></div>' +
    '<div class="maint-particles-layer">' +
      '<span class="m-particle p1"></span>' +
      '<span class="m-particle p2"></span>' +
      '<span class="m-particle p3"></span>' +
      '<span class="m-particle p4"></span>' +
      '<span class="m-particle p5"></span>' +
      '<span class="m-particle p6"></span>' +
    '</div>' +
    '<div class="maintenance-card">' +
      '<div class="maint-corner-bracket corner-tl"></div>' +
      '<div class="maint-corner-bracket corner-tr"></div>' +
      '<div class="maint-corner-bracket corner-bl"></div>' +
      '<div class="maint-corner-bracket corner-br"></div>' +
      '<div class="maint-card-scanner"></div>' +
      '<div class="maint-visual-wrap">' +
        '<div class="maint-shockwave-ring ring-1"></div>' +
        '<div class="maint-shockwave-ring ring-2"></div>' +
        '<div class="maint-gear-ring maint-gear-outer"><i class="fa-solid fa-gear"></i></div>' +
        '<div class="maint-gear-ring maint-gear-inner"><i class="fa-solid fa-gear"></i></div>' +
        '<div class="maint-icon-core"><i class="fa-solid fa-screwdriver-wrench"></i></div>' +
        '<div class="maint-core-glow"></div>' +
      '</div>' +
      '<div class="maint-badge">' +
        '<span class="maint-radar-dot"></span>' +
        '<span>HỆ THỐNG ĐANG BẢO TRÌ &amp; NÂNG CẤP</span>' +
      '</div>' +
      '<h2 class="maint-title">NEXVIA VN</h2>' +
      '<div class="maint-subtitle">HỆ THỐNG MÁY CHỦ ĐANG ĐƯỢC BẢO DƯỠNG ĐỊNH KỲ</div>' +
      '<p class="maint-desc">' + escapeHTML(msg || 'Hệ thống đang tiến hành nâng cấp & bảo dưỡng máy chủ để tối ưu trải nghiệm và cập nhật tính năng mới. Chức năng đặt hàng trực tuyến tạm thời gián đoạn.') + '</p>' +
      (until ? 
        '<div class="maint-notice-box">' +
          '<div class="maint-notice-icon"><i class="fa-solid fa-clock-rotate-left"></i></div>' +
          '<div class="maint-notice-text">' +
            '<span class="maint-notice-label">DỰ KIẾN HOÀN TẤT:</span>' +
            '<strong class="maint-notice-time">' + escapeHTML(until) + '</strong>' +
          '</div>' +
        '</div>' : '') +
      '<div class="maint-actions">' +
        '<a href="https://zalo.me/0588500524" target="_blank" rel="noopener noreferrer" class="btn-maint-zalo">' +
          '<i class="fa-solid fa-headset"></i>' +
          '<span>Mua hàng trực tiếp qua <b>Zalo Admin (0588500524)</b></span>' +
          '<i class="fa-solid fa-arrow-up-right-from-square maint-btn-arrow"></i>' +
        '</a>' +
        '<button type="button" class="btn-maint-reload" onclick="window.location.reload()">' +
          '<i class="fa-solid fa-rotate-right"></i>' +
          '<span>Kiểm tra lại trạng thái (F5)</span>' +
        '</button>' +
      '</div>' +
      '<div class="maint-footer-status">' +
        '<span class="maint-freq-bars">' +
          '<span class="fb1"></span>' +
          '<span class="fb2"></span>' +
          '<span class="fb3"></span>' +
          '<span class="fb4"></span>' +
        '</span>' +
        '<span>Tự động kiểm tra mở lại máy chủ mỗi 15 giây</span>' +
      '</div>' +
    '</div>';
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
}

function removeMaintenanceScreen() {
  var overlay = document.getElementById('maintenanceOverlay');
  if (overlay && overlay.parentNode) {
    overlay.parentNode.removeChild(overlay);
  }
  // Khi bảo trì vừa tắt -> Phát lại Intro gaming hoành tráng rồi dẫn vào web
  playIntroAnimation();
}

function checkMaintenanceStatus() {
  if (window.location.protocol === 'file:') return;
  fetch('/api/orders?view=maintenance')
    .then(function(r) { return r.json(); })
    .then(function(data) {
      if (data && data.success) {
        cachedMaintenanceData = data;
        if (data.maintenance) {
          isMaintenanceActive = true;
          renderMaintenanceScreen(data.maintenanceMessage, data.maintenanceUntil);
        } else {
          if (isMaintenanceActive) {
            isMaintenanceActive = false;
            removeMaintenanceScreen();
          }
        }
      }
    })
    .catch(function() {
      // Bỏ qua nếu lỗi mạng để không ảnh hưởng trang chủ
    });
}

// Kiểm tra ngay khi tải trang và lặp lại mỗi 15s
checkMaintenanceStatus();
setInterval(checkMaintenanceStatus, 15000);

function stripVietnamese(str) {
  if (!str) return '';
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

/* ═══════ REAL PRODUCTS DATA (SHOP ĐẠI PHÚ FF) ═══════ */
/* ═══════════════════════════════════════════════════════════════════
   🔑 TROLLMODZ REAL KEY VAULT & VIRTUAL STOCK COUNTER SYSTEM
   - Kho Key thật chính hãng do Admin cấp (8 key 1 Ngày, 10 key 12 Giờ)
   - Bộ đếm tồn kho ảo (+10 key ảo)
   - Tự động xuất Key trực tiếp khi khách thanh toán thành công
   - Mỗi lượt mua thật sẽ giảm trừ 1 key thật và 1 tồn kho thật
   ═══════════════════════════════════════════════════════════════════ */
var TROLLMODZ_KEY_VAULT = {
  '1day': [
    'TRLL-3A42-4C06-1A81',
    'TRLL-52A3-4DBD-0E2C',
    'TRLL-3602-4561-3A0F',
    'TRLL-BCF8-2A4E-879F',
    'TRLL-58E1-6D3E-FCC5',
    'TRLL-7C2D-18C2-E0F3'
  ],
  '12h': [
    'TRLL-94A2-37A2-6377',
    'TRLL-A4DB-A2BA-3971',
    'TRLL-457D-B203-F099',
    'TRLL-1131-215B-9607',
    'TRLL-3FDE-7210-27CD',
    'TRLL-593C-CA9A-7C4D',
    'TRLL-39C2-939D-B241',
    'TRLL-F732-3D30-DD8A',
    'TRLL-0D13-5A72-90F9',
    'TRLL-B73E-FB18-5FC3'
  ]
};

function normalizeVaultPlanKey(planName) {
  if (!planName) return null;
  var p = planName.toLowerCase();
  if (p.includes('1 ngày') || p.includes('1 ngay') || p.includes('1ngay') || p.includes('1 day') || p.includes('1 nga')) {
    return '1day';
  }
  if (p.includes('12 giờ') || p.includes('12 gio') || p.includes('12gio') || p.includes('12h') || p.includes('12 h') || p.includes('12 hour') || p.includes('12 gi')) {
    return '12h';
  }
  return null;
}

function getUsedKeysMap() {
  try {
    var raw = localStorage.getItem('daiphu_used_keys');
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveUsedKeysMap(map) {
  try {
    localStorage.setItem('daiphu_used_keys', JSON.stringify(map));
  } catch (e) {}
}

function getRemainingRealKeys(planKey) {
  var pool = TROLLMODZ_KEY_VAULT[planKey] || [];
  var usedMap = getUsedKeysMap();
  var usedList = Object.keys(usedMap).map(function(k) { return usedMap[k]; });
  return pool.filter(function(k) {
    return !usedList.includes(k);
  });
}

function getDisplayStock(productId, planName) {
  var pKey = normalizeVaultPlanKey(planName);
  if (productId === 'trollmodz' && pKey) {
    var remainingReal = getRemainingRealKeys(pKey).length;
    // Tăng thêm 10 key ảo theo yêu cầu (8 thật -> 18 ảo; 10 thật -> 20 ảo; mỗi mua thật giảm 1)
    return remainingReal + 10;
  }
  return 15;
}

function generateRandomTrollKey() {
  var chars = '0123456789ABCDEF';
  function seg() {
    var s = '';
    for (var i = 0; i < 4; i++) {
      s += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return s;
  }
  return 'TRLL-' + seg() + '-' + seg() + '-' + seg();
}

function dispatchKeyForOrder(order) {
  if (!order) return null;
  var orderId = order.id || order.memo || window.currentOrderId || '';
  if (!orderId) return null;

  var prodName = (order.productName || order.product || (currentProduct ? currentProduct.name : '')).toLowerCase();
  var prodId = (order.productId || (currentProduct ? currentProduct.id : '')).toLowerCase();
  var isTroll = prodId === 'trollmodz' || prodName.includes('trollmodz');
  if (!isTroll) return null;

  var planName = order.planName || order.plan || (currentPlan ? currentPlan.name : '');
  // NẾU LÀ GÓI THÁNG (30 Ngày) HOẶC VĨNH VIỄN: KHÔNG TỰ ĐỘNG CẤP KEY MÀ NHẮN ADMIN ZALO MÃ ĐƠN
  if (isLongTermOrMonthlyPlan(planName)) {
    return null;
  }

  var usedMap = getUsedKeysMap();
  if (usedMap[orderId]) {
    return usedMap[orderId];
  }

  var planKey = normalizeVaultPlanKey(planName);
  if (planKey) {
    var available = getRemainingRealKeys(planKey);
    if (available.length > 0) {
      var key = available[0];
      usedMap[orderId] = key;
      saveUsedKeysMap(usedMap);
      return key;
    }
  }

  // Tự động cấp key TRLL cho các gói ngắn hạn (12h, 1 ngày, 1h...)
  var genKey = generateRandomTrollKey();
  usedMap[orderId] = genKey;
  saveUsedKeysMap(usedMap);
  return genKey;
}

var PRODUCTS = [
  {
    id: 'slot-nhom-file-tien',
    category: 'Dịch Vụ VIP',
    plat: 'All Thiết Bị • iOS & Adr',
    buyers: '1.250+ Người mua',
    name: '1 Slot Nhóm File Tiền (Nexvia VIP)',
    shortDesc: 'Vào nhóm File Tiền VIP của Nexvia VN - Nhận trọn bộ file kéo tâm, data vip, update trọn đời.',
    fullDesc: '1 SLOT VÀO NHÓM FILE TIỀN ĐỘC QUYỀN NEXVIA VN:\n- Nhận toàn bộ kho file kéo tâm VIP, proxy siêu mượt, data obb độc quyền cho iOS & Android.\n- Cập nhật liên tục các bản file mới nhất khi game ra mùa/bản mới.\n- Hỗ trợ trực tiếp 1:1 từ Admin Phú Bán Hàng (Zalo: 0588500524).',
    priceMin: 20000,
    priceMax: 20000,
    oldPrice: 50000,
    image: 'assets/uploads/logos/aizen-logo.png',
    images: [
      { src: 'assets/uploads/logos/aizen-logo.png', label: 'Nhóm File Tiền VIP', title: '1 Slot Nhóm File Tiền (Nexvia VIP)' }
    ],
    plans: [
      {
        name: '1 Slot Vào Nhóm (Vĩnh Viễn)',
        price: 20000,
        badge: '👑 VIP',
        action: 'Cấp quyền vào nhóm Zalo/Telegram File Tiền VIP độc quyền Nexvia VN trọn đời.',
        fix: 'Nhận toàn bộ file kéo tâm VIP, fix rung, proxy mượt mà 120 FPS không giới hạn.',
        pros: 'Admin Phú Bán Hàng trực tiếp duyệt vào nhóm và gửi link tải ngay sau khi thanh toán.',
        note: 'Hỗ trợ tất cả thiết bị iOS, Android, PC.'
      }
    ]
  },


  {
    id: 'innova-cheat',
    category: 'Proxy & Injector',
    plat: 'Adr • iOS',
    buyers: '580+ Người mua',
    name: 'InNova Cheat (Adr • iOS)',
    shortDesc: 'Free Fire Proxy VIP - Tăng sát thương, bắn siêu tốc, không giật 0%, cam xa FOV, an toàn bypass.',
    fullDesc: 'INNOVA CHEAT - PROXY VIP FREE FIRE (Android & iOS):\n- Tăng sát thương (Buff Dame), Bắn siêu tốc (Fast Fire), Không giật (No Recoil 0%).\n- Bơm máu siêu tốc (Fast Medkit), Góc nhìn rộng Cam xa (FOV 85°), Tăng tốc chạy (Speed Run).\n- Bypass an toàn chống ban 100%, kết nối ổn định, mượt mà không lag.',
    priceMin: 25000,
    priceMax: 150000,
    oldPrice: 300000,
    image: 'assets/uploads/products/innova-cheat.jpg',
    images: [
      { src: 'assets/uploads/products/innova-cheat.jpg', label: 'InNova Cheat', title: 'InNova Cheat - Proxy VIP Free Fire' }
    ],
    plans: [
      {
        name: 'Gói 1 Ngày',
        price: 25000,
        badge: 'Trải nghiệm',
        action: 'Buff dame, bắn siêu tốc, không giật 0%, cam xa FOV 85° suốt 24 giờ.',
        fix: 'Bypass qua mặt hệ thống kiểm tra an toàn 100%, chống giật lag.',
        pros: 'Chi phí cực rẻ chỉ 25k để trải nghiệm sức mạnh InNova Cheat.',
        note: 'Hỗ trợ Android & iOS.'
      },
      {
        name: 'Gói 7 Ngày',
        price: 70000,
        badge: 'Tiết kiệm',
        action: 'Sử dụng trọn bộ tính năng InNova Cheat liên tục trong 7 ngày (1 tuần).',
        fix: 'Tối ưu hóa đường truyền proxy, cập nhật bypass tự động 24/7.',
        pros: 'Tiết kiệm chi phí, hỗ trợ kích hoạt và hướng dẫn cài đặt 1:1 qua Zalo.',
        note: 'Hỗ trợ Android & iOS.'
      },
      {
        name: 'Gói 30 Ngày',
        price: 150000,
        badge: 'Phổ biến nhất',
        action: 'Gói tháng toàn diện 30 ngày, leo rank Thách Đấu thả ga cả mùa giải.',
        fix: 'Khắc phục hoàn toàn delay, ổn định mượt mà 120 FPS, bảo hành trọn đời gói.',
        pros: 'Tự do tuỳ chỉnh mọi chức năng, Zalo Admin Anh Phú hỗ trợ ưu tiên 24/7.',
        note: 'Hỗ trợ Android & iOS.'
      }
    ]
  },
  {
    id: 'aimlock-forget-2',
    category: 'AimLock',
    plat: 'Adr • iOS',
    buyers: '450+ Người mua',
    name: 'AimLock Forget 2.0 (Adr • iOS)',
    shortDesc: 'Kéo tâm chuẩn xác, fix rung tâm ổn định, bám mục tiêu tốt, an toàn tuyệt đối.',
    fullDesc: 'AimLock Forget 2.0 (Android & iOS) - Tối ưu hỗ trợ kéo tâm đỉnh cao:\n- Kéo tâm chuẩn xác vào đầu, fix rung tâm ổn định.\n- Tăng độ nhạy vuốt mượt mà, giảm delay tối đa.\n- Bypass an toàn 100%, không can thiệp sâu file gốc.',
    priceMin: 100000,
    priceMax: 100000,
    oldPrice: 200000,
    image: 'assets/uploads/products/aimlock-forget.jpg',
    images: [
      { src: 'assets/uploads/products/aimlock-forget.jpg', label: 'AimLock 2.0', title: 'AimLock Forget 2.0 - Kéo Tâm Chuẩn Xác' }
    ],
    plans: [
      {
        name: 'AimLock Forget 2.0',
        price: 100000,
        badge: 'Giảm 50%',
        action: 'Kéo tâm chuẩn xác vào đầu, fix rung tâm ổn định, bám mục tiêu cực tốt.',
        fix: 'Khắc phục hoàn toàn delay vuốt tâm, chống lag giật.',
        pros: 'Bảo vệ tài khoản an toàn 100%, hỗ trợ cả Android và iOS.',
        note: 'Hỗ trợ Android & iOS.'
      }
    ]
  },
  {
    id: 'aimlock-forget-3',
    category: 'AimLock',
    plat: 'Adr • iOS',
    buyers: '680+ Người mua',
    name: 'AimLock Forget 3.0 (Adr • iOS)',
    shortDesc: 'Khắc phục toàn diện, tăng tỷ lệ bám đầu tối đa, hỗ trợ mượt mà, độ chuẩn xác 99%.',
    fullDesc: 'AimLock Forget 3.0 (Android & iOS) - Bản nâng cấp hoàn hảo nhất:\n- Tối ưu hóa toàn diện thuật toán bám tâm đầu.\n- Tỷ lệ Headshot 99%, cực nhạy mọi cự ly súng.\n- Fix rung tâm tuyệt đối, mượt mà 120 FPS.',
    priceMin: 150000,
    priceMax: 150000,
    oldPrice: 300000,
    image: 'assets/uploads/products/aimlock-forget.jpg',
    images: [
      { src: 'assets/uploads/products/aimlock-forget.jpg', label: 'AimLock 3.0', title: 'AimLock Forget 3.0 - Đỉnh Cao Kéo Tâm' }
    ],
    plans: [
      {
        name: 'AimLock Forget 3.0',
        price: 150000,
        badge: 'Bán chạy nhất',
        action: 'Tăng tỷ lệ bám đầu tối đa 99%, kéo tâm siêu dính mọi khoảng cách.',
        fix: 'Khắc phục toàn diện delay vuốt tâm, tối ưu FPS mượt mà đỉnh cao.',
        pros: 'Bản cao cấp nhất, cập nhật liên tục 24/7 từ Admin Anh Phú.',
        note: 'Hỗ trợ Android & iOS.'
      }
    ]
  },
    {
    id: 'trollmodz',
    category: 'Menu & Mod',
    plat: 'Adr · iOS · PC',
    buyers: '1.800+ Người mua',
    name: 'TrollModz (Adr · iOS · PC)',
    shortDesc: 'Ngưng đọng thời gian, nhảy dù nhanh, định vị gắn đầu, Aimbot.',
    fullDesc: 'TrollModz bản quyền chính hãng hỗ trợ Android, iOS và PC.\nTính năng: Ngưng đọng thời gian, nhảy dù đáp đất tức thì, định vị gắn đầu, Aimbot tự động ghim, bypass an toàn tuyệt đối.',
    priceMin: 10000,
    priceMax: 200000,
    image: 'trollmodz.png',
    images: [
      { src: 'trollmodz.png', label: 'TrollModz', title: 'TrollModz - Menu Adr · iOS · PC' }
    ],
    plans: [
      {
        name: 'Key 1 Giờ (Test)',
        price: 10000,
        action: 'Dùng thử trọn bộ tính năng: Ngưng đọng thời gian, nhảy dù tức thì.',
        fix: 'Bypass qua mặt hệ thống kiểm tra, chống lag giật tối đa.',
        pros: 'Chi phí cực rẻ để trải nghiệm sức mạnh trước khi mua dài hạn.',
        note: 'Hỗ trợ Android, iOS và PC giả lập.'
      },
      {
        name: 'Key 12 Giờ',
        price: 15000,
        action: 'Trải nghiệm 12 giờ trọn bộ tính năng: Ngưng đọng thời gian, nhảy dù tức thì, định vị ghim đầu.',
        fix: 'Bypass qua mặt hệ thống kiểm tra, chống lag giật và ổn định suốt 12h.',
        pros: 'Mức giá siêu tiết kiệm 15k, leo rank thả ga cả ngày.',
        note: 'Hỗ trợ Android, iOS và PC giả lập.'
      },
      {
        name: 'Key 1 Ngày',
        price: 25000,
        action: 'Aimbot tự động ghim, định vị gắn đầu, ngưng đọng thời gian liên tục 24h.',
        fix: 'Khắc phục delay tiếp đất, nhặt súng trước đối thủ trong chớp mắt.',
        pros: 'Bản quyền cập nhật mới nhất, leo rank thoải mái suốt ngày.',
        note: 'Hỗ trợ Android, iOS và PC.'
      },
      {
        name: 'Key 7 Ngày (1 Tuần)',
        price: 100000,
        badge: 'Tiết kiệm',
        action: 'Bản quyền 7 ngày với đầy đủ tính năng mod menu mạnh mẽ.',
        fix: 'Khắc phục lỗi văng game, tối ưu hóa đường truyền mạng.',
        pros: 'Tiết kiệm chi phí, hỗ trợ fix lỗi và cập nhật key mới 24/7.',
        note: 'Hỗ trợ Android, iOS và PC.'
      },
      {
        name: 'Key 15 Ngày',
        price: 150000,
        action: 'Gói nửa tháng trải nghiệm đầy đủ menu TrollModz đỉnh cao.',
        fix: 'Cập nhật bypass liên tục theo từng bản vá nhỏ của game.',
        pros: 'Tự do tùy chỉnh bật/tắt từng tính năng theo ý muốn.',
        note: 'Hỗ trợ Android, iOS và PC.'
      },
      {
        name: 'Key 30 Ngày (1 Tháng)',
        price: 200000,
        badge: 'Phổ biến',
        action: 'Gói tháng toàn diện, chiến game thả ga cả mùa giải xếp hạng.',
        fix: 'Bảo vệ tài khoản tối đa với cơ chế chống report nâng cao.',
        pros: 'Gói được đông đảo anh em game thủ tin tưởng lựa chọn nhất.',
        note: 'Hỗ trợ Android, iOS và PC.'
      }
    ]
  },
  {
    id: 'sx2-dinhvi',
    category: 'SX2 & Panel',
    plat: 'Android No Root',
    buyers: '1.200 Người mua',
    name: 'Sx2 Team External No root v1.0',
    shortDesc: 'Radar định vị, ESP xuyên tường, Freeze Player, Aim Lag, No Root 100%.',
    fullDesc: 'Sx2 Team External No root v1.0 (Android) — Phiên bản không cần Root máy:\n• Freeze Player: Đóng băng / làm chậm cử động đối thủ.\n• Radar Enemy: Quét và định vị toàn bộ vị trí kẻ địch trên bản đồ.\n• Esp: Vẽ khung viền, khoảng cách định vị xuyên vật cản.\n• Aim Lag: Giảm độ trễ vuốt tâm, đạn bám dính mục tiêu cực nhạy.\n• Ghost Hack: Tàng hình di chuyển, đánh lừa tầm nhìn đối phương.\n• Scoop Freez: Cố định tâm súng, khóa góc bắn chuẩn xác khi bật Scope.\n• New Moco (Off): Chế độ Moco tùy biến nâng cao, an toàn tuyệt đối.',
    priceMin: 30000,
    priceMax: 400000,
    image: 'assets/uploads/products/sx2-external.jpg',
    images: [
      { src: 'assets/uploads/products/sx2-external.jpg', label: 'Radar Enemy', title: 'Sx2 External - Radar Định Vị & ESP Xuyên Tường' }
    ],
    plans: [
      {
        name: 'Gói 1 Ngày',
        price: 30000,
        action: 'Radar Enemy quét địch, ESP vẽ khung xuyên tường, Freeze Player làm chậm đối phương.',
        fix: 'Khắc phục điểm mù, phát hiện đối thủ nấp bụi cỏ hoặc sau vật cản.',
        pros: 'Không cần Root máy (No Root 100%), cài đặt đơn giản trong 1 phút.',
        note: 'Dành riêng cho các thiết bị Android No Root.'
      },
      {
        name: 'Gói 7 Ngày (1 Tuần)',
        price: 80000,
        badge: 'Khuyên dùng',
        action: 'Full tính năng: Radar, ESP, Aim Lag bám dính mục tiêu, Ghost Hack, Scoop Freez.',
        fix: 'Khắc phục độ trễ vuốt tâm, khóa góc bắn chuẩn xác khi bật Scope.',
        pros: 'Tiết kiệm chi phí, an toàn tuyệt đối khi leo rank tuần.',
        note: 'Hỗ trợ Android No Root.'
      },
      {
        name: 'Gói 30 Ngày (1 Tháng)',
        price: 200000,
        badge: 'Phổ biến',
        action: 'Trọn bộ External cao cấp 1 tháng, hỗ trợ cập nhật phiên bản mới liên tục.',
        fix: 'Tối ưu độ mượt mà, chế độ New Moco tùy biến chống phát hiện.',
        pros: 'Gói cày rank chuyên nghiệp, ổn định dài lâu.',
        note: 'Hỗ trợ Android No Root.'
      },
      {
        name: 'Gói Vĩnh Viễn',
        price: 400000,
        action: 'Sở hữu vĩnh viễn không giới hạn thời gian mọi tính năng của Sx2 External.',
        fix: 'Bảo hành cập nhật trọn đời máy, đổi key miễn phí khi đổi máy.',
        pros: 'Đầu tư 1 lần dùng mãi mãi, hỗ trợ kỹ thuật ưu tiên 1:1 từ Admin.',
        note: 'Hỗ trợ Android No Root trọn đời.'
      }
    ]
  },
            {
      id: 'proxy-ios-novax',
      category: 'NovaX',
      plat: 'iOS',
      buyers: '200+ Người mua',
      name: 'NovaX (iOS)',
      shortDesc: 'Aimdrag, Aim cổ, Aimbody, Aim Magic, ESP Ghim đầu nhẹ tâm.',
      fullDesc: 'NovaX - Công nghệ kéo tâm cao cấp nhất cho anh em hệ máy iOS.\nTính năng: Aimdrag, Aim cổ, Aimbody, Aim Magic (đạn ma thuật), ESP Aimcheck định vị ghim đầu, kéo tâm cực nhẹ và mượt mà.',
      priceMin: 20000,
      priceMax: 200000,
      image: 'assets/uploads/products/novax.jpg',
      images: [
        { src: 'assets/uploads/products/novax.jpg', label: 'NovaX', title: 'NovaX - Kéo Tâm Chuẩn iOS' }
      ],
      plans: [
        {
          name: 'Key 1 Ngày',
          price: 20000,
          action: 'Aimdrag, Aim cổ, Aimbody, Aim Magic (đạn ma thuật), ESP Aimcheck R8.',
          fix: 'Khắc phục tâm bị nặng, vuốt khó lên đầu trên điện thoại.',
          pros: 'Kéo tâm cực nhẹ, mượt mà chuẩn như tuyển thủ.',
          note: 'Hỗ trợ các dòng máy iPhone và iPad.'
        },
        {
          name: 'Key 7 Ngày',
          price: 50000,
          badge: 'Tiết kiệm',
          action: 'Trải nghiệm 7 ngày công nghệ kéo tâm đỉnh cao nhất.',
          fix: 'Khắc phục trễ lệnh cảm ứng, đạn ôm đầu tự nhiên không lộ liễu.',
          pros: 'Tiết kiệm hơn so với mua lẻ theo từng ngày.',
          note: 'Hỗ trợ iOS.'
        },
        {
          name: 'Key 30 Ngày',
          price: 100000,
          badge: 'Phổ biến',
          action: 'Gói tháng trọn vẹn, cấu hình riêng biệt tốc độ cao không lag giật.',
          fix: 'Chống giật lag ping, giữ tâm ổn định suốt cả mùa rank.',
          pros: 'Lựa chọn số 1 của cộng đồng game thủ.',
          note: 'Hỗ trợ iOS.'
        },
        {
          name: 'Key Vĩnh Viễn',
          price: 200000,
          action: 'Sử dụng trọn đời phiên bản NovaX, không lo hết hạn key.',
          fix: 'Cập nhật trọn đời, bảo vệ tài khoản an toàn 100%.',
          pros: 'Gói trọn đời kinh tế nhất, dùng thoải mái không giới hạn thời gian.',
          note: 'Hỗ trợ iOS, bảo hành trọn đời.'
        }
      ]
    },
    {
      id: 'novax-android',
      soldOut: false,
      category: 'NovaX',
      plat: 'Android',
      buyers: '150+ Người mua',
      name: 'NovaX (Android)',
      shortDesc: 'Aimdrag, Aim cổ, Aimbody, Aim Magic, ESP Ghim đầu nhẹ tâm.',
      fullDesc: 'NovaX - Công nghệ kéo tâm cao cấp nhất cho hệ máy Android.\n(Hiện tại bản Android đang tạm thời CHÁY HÀNG key, vui lòng liên hệ Admin để đặt trước).',
      priceMin: 20000,
      priceMax: 200000,
      image: 'assets/uploads/products/novax.jpg',
      images: [
        { src: 'assets/uploads/products/novax.jpg', label: 'NovaX', title: 'NovaX - Kéo Tâm Chuẩn Android' }
      ],
      plans: [
        {
          name: 'Key 1 Ngày',
          price: 20000,
          action: 'Aimdrag, Aim cổ, Aimbody, Aim Magic (đạn ma thuật), ESP Aimcheck R8.',
          fix: 'Khắc phục tâm bị nặng, vuốt khó lên đầu trên điện thoại.',
          pros: 'Kéo tâm cực nhẹ, mượt mà chuẩn như tuyển thủ.',
          note: 'Hỗ trợ mọi máy Android.'
        },
        {
          name: 'Key 7 Ngày',
          price: 50000,
          badge: 'Tiết kiệm',
          action: 'Trải nghiệm 7 ngày công nghệ kéo tâm đỉnh cao nhất.',
          fix: 'Khắc phục trễ lệnh cảm ứng, đạn ôm đầu tự nhiên không lộ liễu.',
          pros: 'Tiết kiệm hơn so với mua lẻ theo từng ngày.',
          note: 'Hỗ trợ Android.'
        },
        {
          name: 'Key 30 Ngày',
          price: 100000,
          badge: 'Phổ biến',
          action: 'Gói tháng trọn vẹn, cấu hình riêng biệt tốc độ cao không lag giật.',
          fix: 'Chống giật lag ping, giữ tâm ổn định suốt cả mùa rank.',
          pros: 'Lựa chọn số 1 của cộng đồng game thủ.',
          note: 'Hỗ trợ Android.'
        },
        {
          name: 'Key Vĩnh Viễn',
          price: 200000,
          action: 'Sử dụng trọn đời phiên bản NovaX, không lo hết hạn key.',
          fix: 'Cập nhật trọn đời, bảo vệ tài khoản an toàn 100%.',
          pros: 'Gói trọn đời kinh tế nhất, dùng thoải mái không giới hạn thời gian.',
          note: 'Hỗ trợ Android, bảo hành trọn đời.'
        }
      ]
    },


  {
    id: 'proxy-ios-delta',
    category: 'Proxy iOS',
    plat: 'iPhone · iPad',
    buyers: '500+ Người mua',
    name: 'Proxy Aim iOS - Delta',
    shortDesc: 'Aimdrag, Aim cổ, Aimbody, Aim Magic, ESP Aimcheck R8 định vị ghim đầu.',
    fullDesc: 'Proxy iOS Delta - Bản kéo tâm tối ưu đường truyền mượt mà.\nTính năng: Hỗ trợ kéo tâm không giật lag, tự động ôm đầu, ổn định cho mọi phiên bản iOS (Không hỗ trợ gói vĩnh viễn).',
    priceMin: 20000,
    priceMax: 100000,
    image: 'proxy-ios.png',
    images: [
      { src: 'proxy-ios.png', label: 'ESP Ghim Đầu', title: 'ESP AIMCHECK R8 - Định Vị Ghim Đầu' },
      { src: 'proxy-ios-aimdrag.png', label: 'Aim Drag', title: 'Aim Drag - Kéo Tâm Chuẩn Xác' },
      { src: 'proxy-ios-magic.png', label: 'Aim Magic', title: 'Aim Magic - Đạn Ma Thuật' },
      { src: 'proxy-ios-co.png', label: 'Aim Cổ', title: 'Aim Cổ - Khóa Góc Cổ Địch' },
      { src: 'proxy-ios-body.png', label: 'AimBody', title: 'AimBody - Bám Thân Trúng Đạn 100%' }
    ],
    plans: [
      {
        name: 'Key 1 Ngày',
        price: 20000,
        action: 'Aimdrag, Aim cổ, Aimbody, Aim Magic, ESP Aimcheck R8 định vị ghim đầu.',
        fix: 'Khắc phục giật lag, kéo tâm không mượt trên hệ điều hành iOS.',
        pros: 'Đường truyền tối ưu mượt mà, ôm đầu tức thì khi vừa chạm nút bắn.',
        note: 'Hỗ trợ iOS, không có phiên bản vĩnh viễn.'
      },
      {
        name: 'Key 1 Tuần (7 Ngày)',
        price: 50000,
        badge: 'Tiết kiệm',
        action: 'Full bộ tính năng kéo tâm Delta mượt mà trong suốt 7 ngày.',
        fix: 'Khắc phục tình trạng đạn lạc, hỗ trợ ghìm tâm tầm trung và gần.',
        pros: 'Chi phí hợp lý, dễ dàng kích hoạt chỉ trong 1 nốt nhạc.',
        note: 'Hỗ trợ toàn bộ dòng máy iPhone / iPad.'
      },
      {
        name: 'Key 1 Tháng (30 Ngày)',
        price: 100000,
        badge: 'Phổ biến',
        action: 'Cấu hình Delta chuyên dụng 30 ngày cho cày cuốc leo rank cao.',
        fix: 'Ổn định tâm súng tối đa, không rung giật màn hình khi giao tranh căng thẳng.',
        pros: 'Gói tháng tiết kiệm và tiện lợi nhất cho bản Delta.',
        note: 'Hỗ trợ toàn bộ dòng máy iPhone / iPad.'
      }
    ]
  },
  {
    id: 'migul-lite',
    category: 'Menu & Mod',
    plat: 'iOS',
    buyers: '280+ Người mua',
    name: 'Menu Migul Lite (iOS)',
    shortDesc: 'Nhẹ, mượt, Aimbot, Visuals ESP, chống khóa acc cực tốt.',
    fullDesc: 'Menu Migul Lite dành riêng cho iOS:\n- Dung lượng siêu nhẹ, không tụt FPS.\n- Aimbot tự động ghim, Visuals ESP định vị chuẩn xác.\n- Chống khóa tài khoản, an toàn khi leo rank.',
    priceMin: 50000,
    priceMax: 350000,
    image: 'menu-lite.png',
    images: [
      { src: 'menu-lite.png', label: 'Migul Lite', title: 'Menu Migul Lite Siêu Nhẹ Cho iOS' }
    ],
    plans: [
      {
        name: 'Key 1 Ngày',
        price: 50000,
        action: 'Aimbot tự động ghim mục tiêu, Visuals ESP định vị chuẩn xác qua vật cản.',
        fix: 'Khắc phục tụt FPS, dung lượng siêu nhẹ không gây nóng máy.',
        pros: 'Bypass an toàn, chống khóa tài khoản cực tốt khi chiến đấu.',
        note: 'Hỗ trợ các thiết bị iOS.'
      },
      {
        name: 'Key 7 Ngày (1 Tuần)',
        price: 150000,
        badge: 'Tiết kiệm',
        action: 'Bản quyền 7 ngày Menu Migul Lite mượt mà, định vị và ghìm tâm cực chuẩn.',
        fix: 'Chống quét tài khoản khi tham gia leo rank cường độ cao.',
        pros: 'Giao diện trực quan, dễ bật tắt các tính năng theo ý muốn.',
        note: 'Hỗ trợ các thiết bị iOS.'
      },
      {
        name: 'Key 30 Ngày (1 Tháng)',
        price: 350000,
        badge: 'Phổ biến',
        action: 'Trải nghiệm 1 tháng liên tục menu mod siêu nhẹ dành riêng cho iOS.',
        fix: 'Duy trì hiệu năng máy ổn định, không lo giật lag hay văng game.',
        pros: 'Gói tháng tiết kiệm cho game thủ cày rank dài hạn.',
        note: 'Hỗ trợ các thiết bị iOS.'
      }
    ]
  },
  {
    id: 'migul-pro',
    category: 'Menu & Mod',
    plat: 'iOS',
    buyers: '450+ Người mua',
    name: 'Menu Migul Pro (iOS)',
    shortDesc: 'Bản Pro đầy đủ tính năng, hoạt động mượt mà, bypass an toàn.',
    fullDesc: 'Menu Migul Pro cao cấp cho iOS:\n- Đầy đủ tính năng: Aimbot 360 độ, ESP name/box/line, Teleport, Auto Kill.\n- Hệ thống Bypass bảo vệ chống quét an toàn.',
    priceMin: 10000,
    priceMax: 450000,
    image: 'menu-lite.png',
    images: [
      { src: 'menu-lite.png', label: 'Migul Pro', title: 'Menu Migul Pro Cho iOS' }
    ],
    plans: [
      {
        name: 'Key 1 Giờ (Test)',
        price: 10000,
        action: 'Trải nghiệm thử toàn bộ tính năng: Aimbot 360, ESP, Teleport, Auto Kill.',
        fix: 'Kiểm tra độ tương thích và mượt mà trên thiết bị trước khi mua dài hạn.',
        pros: 'Chỉ 10k để trải nghiệm menu mod pro.',
        note: 'Hỗ trợ các thiết bị iOS.'
      },
      {
        name: 'Key 1 Ngày',
        price: 70000,
        action: 'Aimbot 360 độ, ESP name/box/line, Teleport, Auto Kill trọn vẹn 24 giờ.',
        fix: 'Hệ thống Bypass cao cấp bảo vệ an toàn trước đợt quét.',
        pros: 'Khả năng hỗ trợ cao, thao tác chuẩn xác trong trận đấu.',
        note: 'Hỗ trợ các thiết bị iOS.'
      },
      {
        name: 'Key 7 Ngày (1 Tuần)',
        price: 215000,
        badge: 'Tiết kiệm',
        action: 'Gói tuần đầy đủ tính năng, hỗ trợ tối đa trong chế độ Sinh Tồn và Tử Chiến.',
        fix: 'Tối ưu độ ổn định và trải nghiệm chơi game mượt mà.',
        pros: 'Tiết kiệm hơn 50% so với mua key ngày.',
        note: 'Hỗ trợ các thiết bị iOS.'
      },
      {
        name: 'Key 30 Ngày (1 Tháng)',
        price: 450000,
        action: 'Bản quyền 1 tháng đầy đủ tính năng cao cấp của dòng Migul.',
        fix: 'Bảo vệ tài khoản liên tục với hệ thống cập nhật bypass tự động.',
        pros: 'Được hỗ trợ kỹ thuật trực tiếp 1:1 từ Admin Phú Bán Hàng (NEXVIA VN).',
        note: 'Hỗ trợ các thiết bị iOS.'
      }
    ]
  }
];

/* ═══════ STATE ═══════ */
var activeCategory = 'all';
var searchQuery = '';
var sortOrder = 'default';
var currentProduct = null;
var currentPlan = null;
var currentOrderMemo = '';
var currentPayAmountRaw = 0;
var cardSelectedPlan = {}; // productId -> planIndex
var pendingPurchase = null; // { productId, planIdx }

/* ═══════ HELPERS ═══════ */
function formatVND(n) {
  if (typeof n !== 'number') n = Number(n) || 0;
  return n.toLocaleString('vi-VN') + 'đ';
}

function cleanPlanLabel(name) {
  return name.replace(/^(Key|Gói|Bản)\s+/i, '').replace(/\s*\([^)]*\)/g, '');
}

function escapeHTML(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* ═══════ AUTH LOGIC ═══════ */
function getCurrentUser() {
  try {
    var raw = localStorage.getItem('daiphu_user');
    return raw ? JSON.parse(raw) : null;
  } catch(e) {
    return null;
  }
}

function isLoggedIn() {
  return !!getCurrentUser();
}

function toggleUserDropdown(e) {
  var user = getCurrentUser();
  if (!user || !user.username) {
    openLogin();
    return;
  }
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  var menu = document.getElementById('userDropdownMenu');
  var wrapper = document.getElementById('userMenuWrapper');
  var topBtn = document.getElementById('topAuthBtn');
  if (menu) {
    var isShown = menu.classList.toggle('show');
    if (wrapper) wrapper.classList.toggle('active');
    if (topBtn) topBtn.setAttribute('aria-expanded', isShown ? 'true' : 'false');
  }
}

function closeUserDropdown() {
  var menu = document.getElementById('userDropdownMenu');
  var wrapper = document.getElementById('userMenuWrapper');
  var topBtn = document.getElementById('topAuthBtn');
  if (menu) menu.classList.remove('show');
  if (wrapper) wrapper.classList.remove('active');
  if (topBtn) topBtn.setAttribute('aria-expanded', 'false');
}

function handleMenuHistory(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  closeUserDropdown();
  openMyOrderHistory();
}

function handleMenuLogout(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  closeUserDropdown();
  handleLogout();
}

document.addEventListener('click', function(e) {
  var wrapper = document.getElementById('userMenuWrapper');
  if (wrapper && !wrapper.contains(e.target)) {
    closeUserDropdown();
  }
});

function updateAuthUI() {
  var user = getCurrentUser();
  var topBtn = document.getElementById('topAuthBtn');
  var sideTitle = document.getElementById('sideUserTitle');
  var sideSub = document.getElementById('sideUserSub');
  var sideBtn = document.getElementById('sideAuthBtn');
  var sideHistoryBtn = document.getElementById('sideOrderHistoryBtn');
  var miniLogout = document.getElementById('sideMiniLogoutBtn');

  if (user && user.username) {
    if (topBtn) {
      topBtn.className = 'btn user-btn-active';
      topBtn.innerHTML = '<i class="fa-solid fa-circle-user"></i> <span>' + escapeHTML(user.username) + '</span> <i class="fa-solid fa-chevron-down user-arrow"></i>';
      topBtn.setAttribute('title', 'Tài khoản: ' + user.username);
      topBtn.onclick = toggleUserDropdown;
    }
    if (sideTitle) sideTitle.textContent = 'Chào, ' + user.username + ' ⭐';
    if (sideSub) sideSub.textContent = 'Tài khoản thành viên VIP đã sẵn sàng. Xem đơn hàng đã mua hoặc đặt gói mới.';
    
    // Nút chính chuyển sang "Xem bảng giá & Mua ngay" để không bị nút đăng xuất lấn át
    if (sideBtn) {
      sideBtn.innerHTML = '<i class="fa-solid fa-bag-shopping"></i> Mua thêm gói bản quyền';
      sideBtn.onclick = function() {
        var prodSec = document.getElementById('products');
        if (prodSec) prodSec.scrollIntoView({ behavior: 'smooth' });
      };
    }
    if (sideHistoryBtn) sideHistoryBtn.classList.remove('hidden');
    if (miniLogout) miniLogout.classList.remove('hidden');
  } else {
    closeUserDropdown();
    if (topBtn) {
      topBtn.className = 'btn btn-ghost';
      topBtn.innerHTML = 'Đăng nhập';
      topBtn.removeAttribute('title');
      topBtn.onclick = function(e) {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        openLogin();
      };
    }
    if (sideTitle) sideTitle.textContent = 'Đăng nhập tài khoản';
    if (sideSub) sideSub.textContent = 'Đăng nhập để nhận mã key tự động, tra cứu lịch sử mua hàng và nhận ưu đãi riêng.';
    if (sideBtn) {
      sideBtn.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> Đăng nhập / Đăng ký';
      sideBtn.onclick = function() { openLogin(); };
    }
    if (sideHistoryBtn) sideHistoryBtn.classList.add('hidden');
    if (miniLogout) miniLogout.classList.add('hidden');
  }
}

function switchAuthTab(tab) {
  var tabLogin = document.getElementById('tabBtnLogin') || document.getElementById('tabLogin');
  var tabRegister = document.getElementById('tabBtnRegister') || document.getElementById('tabRegister');
  var formLogin = document.getElementById('formLogin');
  var formRegister = document.getElementById('formRegister');

  if (tab === 'login') {
    if (tabLogin) tabLogin.classList.add('active');
    if (tabRegister) tabRegister.classList.remove('active');
    if (formLogin) formLogin.style.display = 'block';
    if (formRegister) formRegister.style.display = 'none';
  } else {
    if (tabLogin) tabLogin.classList.remove('active');
    if (tabRegister) tabRegister.classList.add('active');
    if (formLogin) formLogin.style.display = 'none';
    if (formRegister) formRegister.style.display = 'block';
  }
}

function openLogin(noticeText) {
  var noticeEl = document.getElementById('authNotice');
  var noticeBody = document.getElementById('authNoticeText');
  if (noticeEl) {
    if (noticeText) {
      if (noticeBody) {
        noticeBody.textContent = noticeText;
      }
      noticeEl.style.display = 'flex';
    } else {
      noticeEl.style.display = 'none';
    }
  }
  document.body.style.overflow = 'hidden';
  var m = document.getElementById('loginModal');
  if (m) { m.classList.add('open'); manageModalFocus(m); }
}

function closeLoginModal() {
  document.body.style.overflow = '';
  var m = document.getElementById('loginModal');
  if (m) m.classList.remove('open');
  if (!isLoggedIn()) {
    pendingPurchase = null;
  }
}

function handleLoginSubmit(e) {
  e.preventDefault();
  var u = document.getElementById('loginUser').value.trim();
  var p = document.getElementById('loginPass') ? document.getElementById('loginPass').value.trim() : '';
  if (!u) return;

  var btn = e.target.querySelector('button[type="submit"]');
  var oldBtn = btn ? btn.innerHTML : '';
  if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang xác thực...'; }

  fetch('/api/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'login', username: u, password: p })
  })
  .then(function(res) { return res.json(); })
  .then(function(data) {
    if (btn) { btn.disabled = false; btn.innerHTML = oldBtn; }
    if (data && data.success) {
      var userObj = data.user || { username: u };
      localStorage.setItem('daiphu_user', JSON.stringify({ username: userObj.username, phone: userObj.phone || '' }));
      if (data.token) {
        localStorage.setItem('daiphu_user_token', data.token);
      }
      updateAuthUI();
      closeLoginModal();
      toast('🎉', 'Đăng nhập thành công! Chào mừng ' + u);
      if (pendingPurchase) {
        var prod = PRODUCTS.find(function(item) { return item.id === pendingPurchase.productId; });
        if (prod && prod.plans[pendingPurchase.planIdx]) {
          var plan = prod.plans[pendingPurchase.planIdx];
          pendingPurchase = null;
          startPaymentForPlan(prod, plan);
        }
      }
    } else {
      toast('⚠️', (data && data.error) ? data.error : 'Đăng nhập không thành công!');
    }
  })
  .catch(function(err) {
    if (btn) { btn.disabled = false; btn.innerHTML = oldBtn; }
    toast('❌', 'Không thể kết nối máy chủ xác thực: ' + (err.message || 'Lỗi mạng'));
  });
}

function handleRegisterSubmit(e) {
  e.preventDefault();
  var u = document.getElementById('regUser').value.trim();
  var p = document.getElementById('regPass') ? document.getElementById('regPass').value.trim() : '';
  var phone = document.getElementById('regPhone').value.trim();
  if (!u) return;
  if (phone.replace(/[^0-9]/g, '').length < 10) {
    toast('📞', 'Số điện thoại/Zalo đăng ký phải từ 10 số trở lên!');
    return;
  }

  var btn = e.target.querySelector('button[type="submit"]');
  var oldBtn = btn ? btn.innerHTML : '';
  if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang đăng ký...'; }

  fetch('/api/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'register', username: u, password: p, phone: phone })
  })
  .then(function(res) { return res.json(); })
  .then(function(data) {
    if (btn) { btn.disabled = false; btn.innerHTML = oldBtn; }
    if (data && data.success) {
      var userObj = data.user || { username: u };
      localStorage.setItem('daiphu_user', JSON.stringify({ username: userObj.username, phone: userObj.phone || phone || '' }));
      if (data.token) {
        localStorage.setItem('daiphu_user_token', data.token);
      }
      updateAuthUI();
      closeLoginModal();
      toast('🎉', 'Đăng ký tài khoản thành công! Chào mừng ' + u);
      if (pendingPurchase) {
        var prod = PRODUCTS.find(function(item) { return item.id === pendingPurchase.productId; });
        if (prod && prod.plans[pendingPurchase.planIdx]) {
          var plan = prod.plans[pendingPurchase.planIdx];
          pendingPurchase = null;
          startPaymentForPlan(prod, plan);
        }
      }
    } else {
      toast('⚠️', (data && data.error) ? data.error : 'Tên tài khoản đã tồn tại hoặc lỗi đăng ký!');
    }
  })
  .catch(function(err) {
    if (btn) { btn.disabled = false; btn.innerHTML = oldBtn; }
    toast('❌', 'Không thể kết nối máy chủ đăng ký: ' + (err.message || 'Lỗi mạng'));
  });
}

function handleLogout() {
  localStorage.removeItem('daiphu_user');
  localStorage.removeItem('daiphu_user_token');
  updateAuthUI();
  toast('👋', 'Đã đăng xuất khỏi tài khoản.');
}

/* ═══════ RENDER PRODUCTS WITH PRICE RANGE ═══════ */
function renderProducts() {
  var grid = document.getElementById('product-grid');
  var empty = document.getElementById('product-empty');
  var countEl = document.getElementById('product-count');
  if (!grid) return;

  var filtered = PRODUCTS.filter(function(p) {
    var matchCat = (activeCategory === 'all' || 
      p.category === activeCategory || 
      (activeCategory === 'Proxy iOS' && (p.category === 'Proxy iOS' || p.category === 'NovaX' || p.category === 'Proxy & NovaX')) ||
      (activeCategory === 'SX2 & Panel' && (p.category === 'Regedit & Panel' || p.category === 'SX2 & Panel')));
    var q = searchQuery.toLowerCase().trim();
    var matchSearch = !q || p.name.toLowerCase().includes(q) || p.shortDesc.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  if (sortOrder === 'price-asc') {
    filtered.sort(function(a, b) { return a.priceMin - b.priceMin; });
  } else if (sortOrder === 'price-desc') {
    filtered.sort(function(a, b) { return b.priceMin - a.priceMin; });
  } else if (sortOrder === 'name') {
    filtered.sort(function(a, b) { return a.name.localeCompare(b.name); });
  }

  if (countEl) countEl.textContent = filtered.length + ' sản phẩm';

  if (filtered.length === 0) {
    grid.innerHTML = '';
    if (empty) empty.classList.remove('hidden');
    return;
  }
  if (empty) empty.classList.add('hidden');

  // DOM Optimization: Use DocumentFragment to batch DOM mutations and reduce layout reflows
  var fragment = document.createDocumentFragment();

  filtered.forEach(function(p) {
    var article = document.createElement('article');
    article.className = 'product product-clickable' + (p.soldOut ? ' product-soldout' : '');
    article.setAttribute('data-category', p.category);
    article.setAttribute('data-price', p.priceMin);
    article.setAttribute('data-name', p.name.toLowerCase());
    article.setAttribute('tabindex', '0');
    article.setAttribute('role', 'region');
    article.setAttribute('aria-label', p.name + ' - ' + formatVND(p.priceMin));
    article.onclick = function() { openBuyModalById(p.id); };
    article.onkeydown = function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openBuyModalById(p.id);
      }
    };

    // Thumb & Badges
    var thumbDiv = document.createElement('div');
    thumbDiv.className = 'product-thumb';

    var buyerTag = document.createElement('span');
    buyerTag.className = 'tag';
    buyerTag.innerHTML = '<i class="fa-solid fa-fire text-amber" style="color:#f59e0b;font-size:8.5px;"></i> ' + escapeHTML(p.buyers);
    thumbDiv.appendChild(buyerTag);

    if (p.soldOut) {
      var soldBadge = document.createElement('span');
      soldBadge.className = 'tag-soldout';
      soldBadge.innerHTML = '<i class="fa-solid fa-ban"></i> TẠM HẾT';
      thumbDiv.appendChild(soldBadge);
    }

    if (p.image) {
      var img = document.createElement('img');
      img.className = 'js-product-image';
      img.src = p.image;
      img.alt = p.name;
      img.loading = 'lazy';
      img.decoding = 'async';
      img.onerror = function() {
        if (!this.getAttribute('data-tried-uploads')) {
          this.setAttribute('data-tried-uploads', 'true');
          var rawName = (p.image || '').split('/').pop() || '';
          // Chỉ cho phép ký tự tên file an toàn (chữ, số, gạch ngang, gạch dưới, chấm)
          var safeName = rawName.replace(/[^a-zA-Z0-9_.-]/g, '');
          if (safeName && !safeName.startsWith('javascript:')) {
            this.src = 'assets/uploads/products/' + safeName;
            return;
          }
        }
        this.style.display = 'none';
                var fallbackPlaceholder = document.createElement('div');
        fallbackPlaceholder.className = 'thumb-no-img';
        fallbackPlaceholder.innerHTML = '<i class="fa-solid fa-gem"></i><span>' + escapeHTML(p.name) + '</span>';
        if (this.parentNode) {
          this.parentNode.appendChild(fallbackPlaceholder);
        }
      };
      thumbDiv.appendChild(img);
    } else {
      var noImg = document.createElement('div');
      noImg.className = 'thumb-no-img';
      noImg.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i><span>Chờ Cập Nhật Ảnh</span>';
      thumbDiv.appendChild(noImg);
    }

    article.appendChild(thumbDiv);

    // Meta row
    var metaDiv = document.createElement('div');
    metaDiv.className = 'product-meta';
    metaDiv.innerHTML = '<span class="meta-cat">' + escapeHTML(p.category) + '</span><span class="meta-sep">•</span><span class="meta-plat">' + escapeHTML(p.plat || 'iOS & Android') + '</span>';
    article.appendChild(metaDiv);

    // Title
    var titleH3 = document.createElement('h3');
    titleH3.textContent = p.name;
    article.appendChild(titleH3);

    // Description
    var descP = document.createElement('p');
    descP.textContent = p.shortDesc;
    article.appendChild(descP);

    // Mini plan chips
    var plansDiv = document.createElement('div');
    plansDiv.className = 'card-plans';
    p.plans.forEach(function(plan, idx) {
      var chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'card-plan-chip';
      chip.setAttribute('data-pid', p.id);
      chip.setAttribute('aria-label', plan.name + ' giá ' + formatVND(plan.price));
      chip.textContent = cleanPlanLabel(plan.name) + ' · ' + formatVND(plan.price);
      chip.onclick = function(e) {
        e.stopPropagation();
        openBuyModalById(p.id, idx);
      };
      plansDiv.appendChild(chip);
    });
    article.appendChild(plansDiv);

    // Price Block (Crafted like top tier gaming storefront, zero awkward wrapping)
    var priceBox = document.createElement('div');
    priceBox.className = 'card-pricing-block';

    var oldPriceHtml = p.oldPrice ? ' <del class="card-price-old">' + formatVND(p.oldPrice) + '</del>' : '';
    var isSinglePrice = (p.priceMin === p.priceMax);
    var tierBadgeText = p.plans.length > 1 ? (p.plans.length + ' phiên bản') : '1 phiên bản';

    var priceHtml = '<div class="card-price-header">'
      + '<div class="card-price-lead">'
        + '<span class="card-price-from">' + (isSinglePrice ? 'Giá' : 'Chỉ từ') + '</span>'
        + '<strong class="card-price-val">' + formatVND(p.priceMin) + '</strong>'
        + oldPriceHtml
      + '</div>'
      + '<span class="card-tier-badge">' + tierBadgeText + '</span>'
    + '</div>';

    if (!isSinglePrice) {
      priceHtml += '<div class="card-price-span">Khoảng giá: ' + formatVND(p.priceMin) + ' – ' + formatVND(p.priceMax) + '</div>';
    } else {
      priceHtml += '<div class="card-price-span">Đồng giá trọn gói • Kích hoạt ngay</div>';
    }

    priceBox.innerHTML = priceHtml;
    article.appendChild(priceBox);

    // CTA Button
    var cta = document.createElement('button');
    cta.type = 'button';
    cta.className = 'btn btn-buy btn-block' + (p.soldOut ? ' btn-soldout' : '');
    cta.style.marginTop = '10px';
    if (p.soldOut) {
      cta.innerHTML = '<span>🔥 Cháy Hàng (Tạm Hết)</span><i class="fa-solid fa-ban"></i>';
    } else {
      cta.innerHTML = '<span>Xem chi tiết & Mua</span><i class="fa-solid fa-arrow-right"></i>';
    }
    cta.onclick = function(e) {
      e.stopPropagation();
      openBuyModalById(p.id);
    };
    article.appendChild(cta);

    fragment.appendChild(article);
  });

  grid.innerHTML = '';
  grid.appendChild(fragment);
  setTimeout(initScrollReveal, 40);
}

/* ═══════ 14 REAL CUSTOMER FEEDBACK ═══════ */
function renderFeedback() {
  var grid = document.getElementById('fb-grid');
  if (!grid) return;
  var fragment = document.createDocumentFragment();
  for (var i = 1; i <= 14; i++) {
    (function(num) {
      var imgSrc = 'feedback-' + num + '.jpg';
      var card = document.createElement('div');
      card.className = 'fb-card';
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', 'Xem phóng to feedback khách hàng số ' + num);
      card.onclick = function() { openLB(imgSrc); };
      card.onkeydown = function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLB(imgSrc);
        }
      };
      card.innerHTML = '<div class="fb-card-thumb">'
        + '<img src="' + imgSrc + '" alt="Khách hàng feedback ' + num + '" loading="lazy" decoding="async">'
        + '</div>'
        + '<div class="fb-card-body">'
        + '<div class="fb-badge"><i class="fa-solid fa-circle-check"></i> Đã Mua & Sử Dụng Tốt</div>'
        + '<div class="fb-stars"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></div>'
        + '<div class="fb-title">Feedback Khách Hàng #' + num + '</div>'
        + '</div>';
      fragment.appendChild(card);
    })(i);
  }
  grid.innerHTML = '';
  grid.appendChild(fragment);
  setTimeout(initScrollReveal, 40);
}

/* ═══════ FILTER & SEARCH EVENTS ═══════ */
document.querySelectorAll('.filter-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    activeCategory = btn.getAttribute('data-category-filter');
    renderProducts();
  });
});

var searchInput = document.getElementById('product-search');
var searchDebounceTimer = null;
if (searchInput) {
  searchInput.addEventListener('input', function(e) {
    searchQuery = e.target.value;
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(function() {
      renderProducts();
    }, 220);
  });
}

var sortSelect = document.getElementById('product-sort');
if (sortSelect) {
  sortSelect.addEventListener('change', function(e) {
    sortOrder = e.target.value;
    renderProducts();
  });
}

var resetBtn = document.getElementById('reset-products');
if (resetBtn) {
  resetBtn.addEventListener('click', function() {
    activeCategory = 'all';
    searchQuery = '';
    sortOrder = 'default';
    if (searchInput) searchInput.value = '';
    if (sortSelect) sortSelect.value = 'default';
    document.querySelectorAll('.filter-btn').forEach(function(b) {
      b.classList.toggle('active', b.getAttribute('data-category-filter') === 'all');
    });
    renderProducts();
  });
}

/* ═══════ BADGE CLASS HELPER ═══════ */
function getBadgeClass(badge) {
  if (!badge) return '';
  var b = badge.toLowerCase();
  if (b.includes('tiết kiệm')) return 'm-badge-save';
  if (b.includes('phổ biến')) return 'm-badge-popular';
  if (b.includes('khuyên dùng')) return 'm-badge-recom';
  if (b.includes('vip')) return 'm-badge-vip';
  if (b.includes('bán chạy') || b.includes('đề xuất')) return 'm-badge-hot';
  return 'm-badge-popular';
}

/* ═══════ MODAL BUY & VERSION BLOCKS & VIETQR ═══════ */
function openBuyModalById(id, targetPlanIdx) {
  var p = PRODUCTS.find(function(item) { return item.id === id; });
  if (!p) return;
  currentProduct = p;

  // Reset to step 1
  goToStep(1);

  // Populate title & subtitle
  var titleEl = document.getElementById('mProdTitle');
  var subEl = document.getElementById('mProdSub');
  if (titleEl) titleEl.textContent = p.name;
  if (subEl) {
    var rawName = p.name.split(' (')[0];
    subEl.textContent = rawName + ' · ' + (p.plat || 'iOS & Adr') + ' · ' + p.buyers;
  }

  // Populate Range Banner
  var rangePriceEl = document.getElementById('mRangePrice');
  var rangeCountEl = document.getElementById('mRangeCount');
  var modalOldPriceHtml = p.oldPrice ? ' <span style="font-size:10px;text-decoration:line-through;color:#f87171;margin-left:6px;font-weight:normal;">' + formatVND(p.oldPrice) + '</span>' : '';
    if (rangePriceEl) rangePriceEl.innerHTML = (p.priceMin === p.priceMax) ? (formatVND(p.priceMin) + modalOldPriceHtml) : (formatVND(p.priceMin) + ' → ' + formatVND(p.priceMax));
  if (rangeCountEl) rangeCountEl.textContent = p.plans.length + ' phiên bản riêng biệt';

  // Render Version Blocks & Quick Nav Pills
  renderModalVersionBlocks(p, targetPlanIdx || 0);

  // Populate gallery & thumbnails
  var imgs = (p.images && p.images.length > 0) ? p.images : (
    p.image ? [{ src: p.image, label: p.name.split(' (')[0], title: p.shortDesc }] : []
  );

  // Set default main preview
  if (imgs.length > 0) {
    selectModalThumb(imgs[0].src, imgs[0].label || 'Tính năng', imgs[0].title || p.name, null);
  } else {
    selectModalThumb('', 'Chờ Cập Nhật', p.name, null);
  }

  // Render thumbnail list
  var thumbsHeader = document.getElementById('mThumbsHeader');
  var thumbsGrid = document.getElementById('mThumbsGrid');
  if (thumbsGrid) {
    if (imgs.length > 1) {
      if (thumbsHeader) thumbsHeader.style.display = 'flex';
      thumbsGrid.style.display = 'grid';
      var thumbsHtml = '';
      imgs.forEach(function(imgItem, i) {
        var isAct = i === 0 ? ' active' : '';
        thumbsHtml += '<button type="button" class="m-thumb-item' + isAct + '" onclick="selectModalThumb(\'' + imgItem.src + '\', \'' + (imgItem.label || '').replace(/'/g, "\\'") + '\', \'' + (imgItem.title || '').replace(/'/g, "\\'") + '\', this)" aria-label="' + (imgItem.label || 'Ảnh tính năng') + '">'
          + '<img class="m-thumb-img" src="' + imgItem.src + '" alt="' + (imgItem.label || '') + '" loading="lazy" decoding="async">'
          + '<span class="m-thumb-title">' + (imgItem.label || '') + '</span>'
        + '</button>';
      });
      thumbsGrid.innerHTML = thumbsHtml;
    } else {
      if (thumbsHeader) thumbsHeader.style.display = 'none';
      thumbsGrid.style.display = 'none';
      thumbsGrid.innerHTML = '';
    }
  }

  // Open modal
  var buyModal = document.getElementById('buyModal');
  if (buyModal) { buyModal.classList.add('open'); manageModalFocus(buyModal); }
  document.body.style.overflow = 'hidden';

  // If specific plan was requested, scroll to it smoothly inside modal
  if (typeof targetPlanIdx === 'number' && targetPlanIdx > 0) {
    setTimeout(function() {
      jumpToVersionBlock(p.id, targetPlanIdx);
    }, 180);
  }
}

/* RENDER TỪNG KHỐI PHIÊN BẢN RIÊNG BIỆT (BLOCK 1.0, BLOCK 2.0...) */
function renderModalVersionBlocks(p, activeIdx) {
  var quickNavEl = document.getElementById('mQuickNav');
  var blocksEl = document.getElementById('mVersionBlocks');
  if (!blocksEl) return;

  var quickHtml = '';
  var blocksHtml = '';

  p.plans.forEach(function(plan, idx) {
    var isTarget = idx === activeIdx;
    var pillAct = isTarget ? ' active' : '';

    // Quick nav pill
    quickHtml += '<button type="button" class="quick-nav-pill' + pillAct + '" id="qnp-' + p.id + '-' + idx + '" onclick="jumpToVersionBlock(\'' + p.id + '\', ' + idx + ')">'
      + cleanPlanLabel(plan.name) + ' · ' + formatVND(plan.price)
    + '</button>';

    // Version Block Card
    
    // Specs items (Sanitized through escapeHTML to prevent DOM XSS)
    var specsHtml = '';
    if (plan.action) {
      specsHtml += '<div class="vb-spec-row">'
        + '<div class="vb-spec-icon"><i class="fa-solid fa-bolt"></i></div>'
        + '<div class="vb-spec-content">'
          + '<div class="vb-spec-label">Tác dụng:</div>'
          + '<div class="vb-spec-text">' + escapeHTML(plan.action) + '</div>'
        + '</div>'
      + '</div>';
    }
    if (plan.fix) {
      specsHtml += '<div class="vb-spec-row">'
        + '<div class="vb-spec-icon"><i class="fa-solid fa-shield-virus"></i></div>'
        + '<div class="vb-spec-content">'
          + '<div class="vb-spec-label">Khắc phục:</div>'
          + '<div class="vb-spec-text">' + escapeHTML(plan.fix) + '</div>'
        + '</div>'
      + '</div>';
    }
    if (plan.pros) {
      specsHtml += '<div class="vb-spec-row">'
        + '<div class="vb-spec-icon"><i class="fa-solid fa-star"></i></div>'
        + '<div class="vb-spec-content">'
          + '<div class="vb-spec-label">Điểm mạnh nổi bật:</div>'
          + '<div class="vb-spec-text">' + escapeHTML(plan.pros) + '</div>'
        + '</div>'
      + '</div>';
    }
    if (plan.note) {
      specsHtml += '<div class="vb-spec-row">'
        + '<div class="vb-spec-icon"><i class="fa-solid fa-circle-info"></i></div>'
        + '<div class="vb-spec-content">'
          + '<div class="vb-spec-label">Lưu ý & Thiết bị hỗ trợ:</div>'
          + '<div class="vb-spec-text">' + escapeHTML(plan.note) + '</div>'
        + '</div>'
      + '</div>';
    }

    blocksHtml += '<div class="version-block-card" id="vb-' + p.id + '-' + idx + '">'
      + '<div class="vb-header">'
        + '<div class="vb-title-wrap">'
          + '<h3 class="vb-title">' + escapeHTML(plan.name) + '</h3>'
          + '<div class="vb-meta-row">'
            + '<span class="vb-plat-badge"><i class="fa-solid fa-microchip"></i> ' + escapeHTML(p.plat || 'iOS & Android') + '</span>'
            + (p.id === 'trollmodz' && normalizeVaultPlanKey(plan.name) ? '<span class="vb-stock-badge"><span class="stock-live-dot"></span> Còn ' + getDisplayStock(p.id, plan.name) + ' key sẵn kho</span>' : '')
          + '</div>'
        + '</div>'
        + '<div class="vb-price-box">'
          + '<div class="vb-price">' + formatVND(plan.price) + '</div>'
          + '<div class="vb-price-sub">Thanh toán 1 lần</div>'
        + '</div>'
      + '</div>'
      + '<div class="vb-specs">'
        + specsHtml
      + '</div>'
      + (p.soldOut 
          ? '<button type="button" class="btn-version-buy" style="background:#ef4444;border-color:#dc2626;cursor:not-allowed;" onclick="handleBuyVersionClick(\'' + p.id + '\', ' + idx + ')">'
              + '<i class="fa-solid fa-fire"></i> Tạm Cháy Hàng · ' + escapeHTML(cleanPlanLabel(plan.name))
            + '</button>'
          : '<button type="button" class="btn-version-buy" onclick="handleBuyVersionClick(\'' + p.id + '\', ' + idx + ')">'
              + '<i class="fa-solid fa-cart-shopping"></i> Mua Ngay ' + escapeHTML(cleanPlanLabel(plan.name)) + ' · ' + formatVND(plan.price)
            + '</button>')
    + '</div>';
  });

  if (quickNavEl) quickNavEl.innerHTML = quickHtml;
  blocksEl.innerHTML = blocksHtml;
}

function jumpToVersionBlock(pId, idx) {
  var target = document.getElementById('vb-' + pId + '-' + idx);
  if (!target) return;

  // Highlight pill
  document.querySelectorAll('.quick-nav-pill').forEach(function(pill) {
    pill.classList.remove('active');
  });
  var activePill = document.getElementById('qnp-' + pId + '-' + idx);
  if (activePill) activePill.classList.add('active');

  // Smooth scroll CHỈ bên trong cột danh sách của modal, TUYỆT ĐỐI không gọi scrollIntoView làm nhảy cả trang web
  var col = document.querySelector('.m-info-col');
  var modalEl = document.querySelector('.modal-card.checkout-modal');
  if (col && col.scrollHeight > col.clientHeight) {
    var offset = target.offsetTop - col.offsetTop - 10;
    col.scrollTo({ top: Math.max(0, offset), behavior: 'smooth' });
  } else if (modalEl && modalEl.scrollHeight > modalEl.clientHeight) {
    var offsetM = target.offsetTop - modalEl.offsetTop - 10;
    modalEl.scrollTo({ top: Math.max(0, offsetM), behavior: 'smooth' });
  }
}

/* XỬ LÝ KHI KHÁCH BẤM "MUA NGAY" Ở BẤT KỲ KHỐI PHIÊN BẢN NÀO */
function handleBuyVersionClick(pId, planIdx) {
  var p = PRODUCTS.find(function(item) { return item.id === pId; });
  if (!p || !p.plans[planIdx]) return;
  var plan = p.plans[planIdx];

  // NẾU SẢN PHẨM ĐANG CHÁY HÀNG
  if (p.soldOut) {
    toast('🔥', 'Sản phẩm này hiện đang CHÁY HÀNG! Vui lòng liên hệ Zalo Anh Phú (0588500524) để đặt trước.');
    return;
  }

  // KIỂM TRA ĐĂNG NHẬP / ĐĂNG KÝ THEO YÊU CẦU ANH PHÚ
  if (!isLoggedIn()) {
    pendingPurchase = { productId: pId, planIdx: planIdx };
    var noticeHtml = 'Vui lòng đăng nhập hoặc đăng ký tài khoản để tiếp tục mua gói ' + plan.name + ' (' + formatVND(plan.price) + ').';
    openLogin(noticeHtml);
    toast('⚠️', 'Vui lòng đăng nhập hoặc tạo tài khoản để mua hàng!');
    return;
  }

  // ĐÃ ĐĂNG NHẬP -> CHUYỂN QUA BƯỚC 2 QUÉT QR THANH TOÁN
  startPaymentForPlan(p, plan);
}

function startPaymentForPlan(p, plan) {
  if (p && p.soldOut) {
    toast('🔥', 'Sản phẩm này hiện đang CHÁY HÀNG (Tạm Hết)! Vui lòng liên hệ Zalo Admin để đặt trước.');
    return;
  }
  currentProduct = p;
  currentPlan = plan;
  window.currentPayAmountRaw = plan.price;
  window.currentOrderId = null;
  window.currentOrderMemo = null;

  var currentUser = getCurrentUser();
  var userToken = localStorage.getItem('daiphu_user_token') || '';

  // Điền thông tin vào Step 2
  var s2Prod = document.getElementById('mStep2ProdName');
  var s2Plan = document.getElementById('mStep2PlanName');
  var s2Price = document.getElementById('mStep2Price');
  var payAmt = document.getElementById('mPayAmount');
  var memoEl = document.getElementById('mOrderMemo');
  var adminCodeEl = document.getElementById('mAdminCode');

  if (s2Prod) s2Prod.textContent = p.name;
  if (s2Plan) s2Plan.textContent = plan.name;
  if (s2Price) s2Price.textContent = formatVND(plan.price);
  if (payAmt) payAmt.textContent = formatVND(plan.price);

  if (memoEl) memoEl.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang khởi tạo mã đơn...';
    var loader = document.getElementById('mQrLoader');
    var qrEl = document.getElementById('mQrCode');
    if (loader) loader.style.display = 'flex';
    if (qrEl) qrEl.style.opacity = '0';
  if (adminCodeEl) adminCodeEl.textContent = 'Đang khởi tạo...';

  switchPayMethod('bank');
  goToStep(2);

  // Cuộn lên đầu
  var col = document.querySelector('.m-info-col');
  if (col) col.scrollTo({ top: 0, behavior: 'smooth' });

  // GỌI SERVER TẠO ĐƠN HÀNG DUY NHẤT & SINH MÃ VIETQR CHUẨN
  fetch('/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-user-token': userToken
    },
    body: JSON.stringify({
      action: 'create',
      productId: p.id,
      planName: plan.name,
      user: currentUser ? currentUser.username : 'Khách vãng lai',
      phone: currentUser ? (currentUser.phone || '') : ''
    })
  })
  .then(function(r) { return r.json(); })
  .then(function(res) {
    if (!res.success || !res.order) {
      toast('❌', res.error || 'Không thể tạo đơn hàng trên máy chủ.');
      return;
    }

    var order = res.order;
    window.currentOrderId = order.id;
      window.currentOrderMemo = order.memo || order.id;
      
      if (memoEl) memoEl.textContent = window.currentOrderMemo;
      if (adminCodeEl) adminCodeEl.textContent = window.currentOrderMemo;
      
      var cardMemoEl = document.getElementById('mCardOrderMemo');
      if (cardMemoEl) cardMemoEl.textContent = window.currentOrderMemo;

    // Cập nhật ảnh VietQR chứa mã đơn duy nhất trong nội dung chuyển khoản
    var qrEl = document.getElementById('mQrCode');
    if (qrEl) {
        qrEl.src = res.qrUrl;
        qrEl.onload = function() {
            var loader = document.getElementById('mQrLoader');
            if (loader) loader.style.display = 'none';
            qrEl.style.opacity = '1';
        };
    }

    // Lưu đơn pending vào cache của khách
    saveOrder(order);

    // Bắt đầu lắng nghe trạng thái đơn từ server
    startPaymentWatcher(order.id, window.currentOrderMemo, order.price);
    toast('🛒', 'Đã khởi tạo đơn hàng: ' + order.id + '. Vui lòng chuyển khoản đúng nội dung.');
  })
  .catch(function(err) {
    console.error('Create order error:', err);
    toast('⚠️', 'Lỗi kết nối máy chủ tạo đơn.');
  });
}


/* ═══════ SERVER-SIDE PAYMENT STATUS POLLING (AN TOÀN BẢO MẬT) ═══════ */
var paymentPollTimer = null;
var isCheckingPayment = false;

function startPaymentWatcher(orderId, displayMemo, price) {
  stopPaymentWatcher();
  isCheckingPayment = false;
  var memoEl = document.getElementById('mPlsMemo');
  if (memoEl) memoEl.textContent = displayMemo;
  updateLiveStatus('waiting', 'HỆ THỐNG ĐANG TỰ ĐỘNG CHỜ TIỀN VÀO MBBANK...', 'Sau khi chuyển khoản với nội dung <b>' + displayMemo + '</b>, hệ thống SePay sẽ tự động nhận diện và hoàn tất mua hàng trong 3 giây!');

  // Exponential Backoff Polling: Tối ưu mạng và giảm tải CPU (3s -> 4s -> 6s -> 8s)
  var pollDelay = 3000;
  function scheduleNextPoll() {
    paymentPollTimer = setTimeout(function() {
      checkPaymentApi(orderId, price, false);
      pollDelay = Math.min(8000, pollDelay + 1000);
      scheduleNextPoll();
    }, pollDelay);
  }
  scheduleNextPoll();
}

function stopPaymentWatcher() {
  if (paymentPollTimer) {
    clearTimeout(paymentPollTimer);
    paymentPollTimer = null;
  }
}

// Lắng nghe khi người dùng chuyển từ App Ngân hàng (MBBank/Momo) quay lại web
document.addEventListener('visibilitychange', function() {
  if (!document.hidden && window.currentOrderId) {
    checkPaymentApi(window.currentOrderId, window.currentPayAmountRaw, false);
  }
});
window.addEventListener('focus', function() {
  if (window.currentOrderId) {
    checkPaymentApi(window.currentOrderId, window.currentPayAmountRaw, false);
  }
});

function updateLiveStatus(state, title, desc) {
  var card = document.getElementById('mPayLiveStatus');
  var icon = document.getElementById('mPlsIcon');
  var tEl = document.getElementById('mPlsTitle');
  var dEl = document.getElementById('mPlsDesc');

  if (!card) return;
  if (state === 'success') {
    card.classList.add('success');
    if (icon) icon.innerHTML = '<i class="fa-solid fa-circle-check" style="color:#34d399;"></i>';
    if (tEl) { tEl.textContent = title || 'ĐÃ XÁC NHẬN NHẬN TIỀN THÀNH CÔNG!'; tEl.style.color = '#34d399'; }
    if (dEl) dEl.innerHTML = desc || 'MBBank đã nhận được tiền. Đang kích hoạt key ngay...';
  } else {
    card.classList.remove('success');
    if (icon) icon.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i>';
    if (tEl) { tEl.textContent = title; tEl.style.color = '#ffffff'; }
    if (dEl) dEl.innerHTML = desc;
  }
}

function checkPaymentApi(orderId, price, isManual) {
  if (!orderId) return;
  if (isCheckingPayment && !isManual) return;
  isCheckingPayment = true;

  // Hỏi trực tiếp máy chủ xem đơn hàng này đã được Webhook SePay duyệt chưa
  var _ut = localStorage.getItem('daiphu_user_token');
    var _hd = {};
    if (_ut) _hd['x-user-token'] = _ut;
    fetch('/api/orders?id=' + encodeURIComponent(orderId) + '&_t=' + Date.now(), {
      headers: _hd,
      cache: 'no-store'
    })
    .then(function(res) {
      if (!res.ok) throw new Error('API status ' + res.status);
      return res.json();
    })
    .then(function(data) {
      isCheckingPayment = false;
      if (data && data.success && data.order && data.order.status === 'approved') {
        // SERVER ĐÃ DUYỆT THÀNH CÔNG!
        stopPaymentWatcher();
        updateLiveStatus('success', '✅ ĐÃ XÁC NHẬN NHẬN TIỀN THÀNH CÔNG!', 'MBBank đã ghi có +' + formatVND(data.order.price) + ' khớp mã đơn ' + orderId + '.');
        toast('🎉', 'Đã xác nhận tiền vào MBBank thành công!');
        saveOrder(data.order);
        setTimeout(function() {
          closeBuyModal();
          openPaidModal(data.order);
        }, 800);
      } else {
        if (isManual) {
          var fb = document.getElementById('checkPayFeedback');
          if (fb) {
            fb.style.display = 'block';
            fb.style.background = 'rgba(239, 68, 68, 0.12)';
            fb.style.border = '1px solid rgba(239, 68, 68, 0.45)';
            fb.style.color = '#fecaca';
            fb.innerHTML = '<div style="display:flex;align-items:flex-start;gap:10px;">'
              + '<i class="fa-solid fa-circle-exclamation" style="color:#ef4444;font-size:18px;margin-top:2px;"></i>'
              + '<div>'
                + '<b style="color:#f87171;font-size:13px;">Hệ thống chưa nhận được tiền!</b>'
                + '<div style="margin-top:4px;color:#cbd5e1;font-size:11.5px;line-height:1.5;">'
                  + '• Vui lòng mở App Ngân hàng quét mã VietQR ở trên (Nội dung chuyển khoản phải là <b>' + window.currentOrderMemo + '</b>).<br>'
                  + '• Ngân hàng có thể mất 5 - 15 giây để gửi thông báo. Bạn có thể bấm lại sau vài giây hoặc gửi ảnh bill cho <b>Anh Phú (Zalo: 0588500524)</b> để nhận file ngay!'
                + '</div>'
              + '</div>'
            + '</div>';
          }
          toast('⏳', 'Hệ thống đang chờ tiền vào. Vui lòng kiểm tra lại chuyển khoản!');
        }
      }
    })
    .catch(function(err) {
      isCheckingPayment = false;
      console.warn('Check order status error:', err);
    });
}

function manualCheckPayment() {
  var btn = document.getElementById('btnCheckPaid');
  var fb = document.getElementById('checkPayFeedback');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang đối soát với MBBank...';
  }
  if (fb) fb.style.display = 'none';

  checkPaymentApi(window.currentOrderId, window.currentPayAmountRaw, true);

  setTimeout(function() {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-rotate"></i> Kiểm tra xác nhận tiền vào MBBank ngay';
    }
  }, 2500);
}


function switchPayMethod(method) {
  var tabBank = document.getElementById('tabPayBank');
  var tabCard = document.getElementById('tabPayCard');
  var viewBank = document.getElementById('bankPayView');
  var viewCard = document.getElementById('cardPayView');

  if (method === 'card') {
    if (tabBank) tabBank.classList.remove('active');
    if (tabCard) tabCard.classList.add('active');
    if (viewBank) viewBank.style.display = 'none';
    if (viewCard) viewCard.style.display = 'block';
  } else {
    if (tabBank) tabBank.classList.add('active');
    if (tabCard) tabCard.classList.remove('active');
    if (viewBank) viewBank.style.display = 'block';
    if (viewCard) viewCard.style.display = 'none';
  }
}

function selectModalThumb(imgSrc, label, title, thumbEl) {
  var mainImg = document.getElementById('mPreviewImg');
  var emptyEl = document.getElementById('mPreviewEmpty');
  var zoomBtn = document.getElementById('mZoomBtn');
  var badgeEl = document.getElementById('mPreviewBadge');
  var titleEl = document.getElementById('mPreviewTitle');

  if (imgSrc) {
    if (mainImg) {
      mainImg.style.display = 'block';
      mainImg.style.opacity = '0.35';
      setTimeout(function() {
        mainImg.src = imgSrc;
        mainImg.style.opacity = '1';
      }, 120);
    }
    if (emptyEl) emptyEl.style.display = 'none';
    if (zoomBtn) zoomBtn.style.display = 'inline-flex';
  } else {
    if (mainImg) mainImg.style.display = 'none';
    if (emptyEl) emptyEl.style.display = 'flex';
    if (zoomBtn) zoomBtn.style.display = 'none';
  }

  if (badgeEl) badgeEl.textContent = label || (imgSrc ? 'Tính năng' : 'Chờ Cập Nhật');
  if (titleEl) titleEl.textContent = title || '';

  if (thumbEl) {
    document.querySelectorAll('.m-thumb-item').forEach(function(t) {
      t.classList.remove('active');
    });
    thumbEl.classList.add('active');
  }
}

function zoomCurrentPreview() {
  var img = document.getElementById('mPreviewImg');
  if (img && img.src && img.style.display !== 'none' && !img.src.endsWith('/')) {
    openLB(img.src);
  }
}

function goToStep(step) {
  var s1 = document.getElementById('mStep1');
  var s2 = document.getElementById('mStep2');
  if (!s1 || !s2) return;
  if (step === 1) {
    stopPaymentWatcher();
    s1.style.display = 'block';
    s2.style.display = 'none';
  } else if (step === 2) {
    s1.style.display = 'none';
      s2.style.display = 'block';
  }
}

function closeBuyModal() {
  stopPaymentWatcher();
  window.currentOrderId = null;
  window.currentOrderMemo = '';
  window.currentPayAmountRaw = 0;
  var m = document.getElementById('buyModal');
  if (m) m.classList.remove('open');
  document.body.style.overflow = '';

  // Nếu hệ thống đang trong chế độ bảo trì, kích hoạt màn hình bảo trì ngay sau khi khách đóng modal mua hàng
  if (isMaintenanceActive && cachedMaintenanceData) {
    setTimeout(function() {
      renderMaintenanceScreen(cachedMaintenanceData.maintenanceMessage, cachedMaintenanceData.maintenanceUntil);
    }, 200);
  }
}

function confirmPaid() {
  manualCheckPayment();
}

function sendOrderToPhu() {
  var memo = window.currentOrderMemo || (document.getElementById('paidConfirmCode') ? document.getElementById('paidConfirmCode').textContent.trim() : '');
  var prod = currentProduct ? currentProduct.name : 'Phần Mềm FF';
  var plan = currentPlan ? currentPlan.name : '';
  var price = currentPlan ? currentPlan.price : 0;
  var isMonthly = isLongTermOrMonthlyPlan(plan);
  var usedMap = getUsedKeysMap();
  var key = isMonthly ? '' : (usedMap[memo] || '');

  var textToCopy = isMonthly
    ? ('Chào Anh Phú, em vừa mua ' + prod + (plan ? ' (' + plan + ' - ' + formatVND(price) + ')' : '') + '. Mã đơn hàng của em là: ' + memo + '. Em mua gói tháng, anh check và gửi Key + file cài đặt cho em với ạ!')
    : buildOrderReceiptText({ id: memo, product: prod, plan: plan, price: price, licenseKey: key });

  if (navigator.clipboard) {
    navigator.clipboard.writeText(textToCopy);
  } else {
    var ta = document.createElement('textarea');
    ta.value = textToCopy;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }

  toast('📋', 'Đã sao chép thông tin đơn hàng & Đang mở Zalo Anh Phú...');

  setTimeout(function() {
    window.open('https://zalo.me/0588500524', '_blank');
  }, 350);
}


function formatVndWithoutUnit(price) {
  return Number(price || 0).toLocaleString('vi-VN');
}

function cleanTrollmodzPlanName(plan) {
  if (!plan) return '';
  return plan.replace(/^Key\s+/i, '').trim();
}

function buildOrderReceiptText(order) {
  var prod = (order && (order.productName || order.product)) || (currentProduct ? currentProduct.name : 'TrollModz');
  var plan = (order && (order.planName || order.plan)) || (currentPlan ? currentPlan.name : '');
  var price = (order && order.price) || (currentPlan ? currentPlan.price : 0);
  var memo = (order && (order.id || order.memo)) || window.currentOrderId || 'DP000000';
  var usedMap = getUsedKeysMap();
  var key = (order && order.licenseKey) || usedMap[memo] || '';

  var isTroll = (prod || '').toLowerCase().includes('trollmodz') || (order && order.productId === 'trollmodz');
  var prodDisplay = isTroll 
    ? ('Trollmodz - ' + (cleanTrollmodzPlanName(plan) || '12 Giờ'))
    : (prod + (plan ? ' - ' + plan : ''));

  var lines = [
    '🎉 MUA HÀNG THÀNH CÔNG! 🎉',
    '',
    '🎮 Game: Free Fire',
    '📦 Sản phẩm: ' + prodDisplay,
    '🔢 Số lượng: 1',
    '💸Giá : ' + formatVndWithoutUnit(price) + 'VND'
  ];

  if (key) {
    lines.push('');
    lines.push('🔑 KEY CỦA BẠN:');
    lines.push(key);
  }

  return lines.join('\n');
}

function openPaidModal(order) {
  var memo = (order && order.id) || window.currentOrderId || 'DP000000';
  window.currentOrderId = (order && order.id) || memo;
  window.currentOrderMemo = (order && order.memo) || window.currentOrderMemo;

  var prodName = (order && (order.productName || order.product)) || (currentProduct ? currentProduct.name : 'TrollModz');
  var planName = (order && (order.planName || order.plan)) || (currentPlan ? currentPlan.name : 'Gói phần mềm');
  var price = (order && order.price) || (currentPlan ? currentPlan.price : 50000);

  var isMonthly = isLongTermOrMonthlyPlan(planName);

  // Auto-dispatch real key for TrollModz if not monthly
  var dispatchedKey = isMonthly ? null : dispatchKeyForOrder(order || { id: memo, product: prodName, plan: planName, price: price });
  if (dispatchedKey && order) {
    order.licenseKey = dispatchedKey;
    saveOrder(order);
  }

  var confirmCodeEl = document.getElementById('paidConfirmCode');
  var detailCodeEl = document.getElementById('paidDetailCode');
  var detailProdEl = document.getElementById('paidDetailProd');
  var detailPlanEl = document.getElementById('paidDetailPlan');
  var detailPriceEl = document.getElementById('paidDetailPrice');
  var detailTimeEl = document.getElementById('paidDetailTime');

  var headerIcon = document.getElementById('paidHeaderIcon');
  var headerTitle = document.getElementById('paidHeaderTitle');
  var headerSub = document.getElementById('paidHeaderSub');
  var keyBox = document.getElementById('paidKeyDeliveryBox');
  var keyEl = document.getElementById('paidOrderCode');
  var keyTitleEl = keyBox ? keyBox.querySelector('.paid-key-title') : null;
  var keyCopyBtn = keyBox ? keyBox.querySelector('.paid-copy-key-btn') : null;

  if (confirmCodeEl) confirmCodeEl.textContent = memo;
  if (detailCodeEl) detailCodeEl.textContent = memo;
  if (detailProdEl) detailProdEl.textContent = prodName;
  if (detailPlanEl) detailPlanEl.textContent = planName;
  if (detailPriceEl) detailPriceEl.textContent = formatVND(price);
  if (detailTimeEl) detailTimeEl.textContent = (order && order.time) || '';

  var statusEl = document.querySelector('.paid-status');

  var tlMemo = document.getElementById('ntTimelineMemo');
  if (tlMemo) tlMemo.textContent = memo;

  var tlStep2 = document.getElementById('ntTimelineStep2');
  var tlNode2 = document.getElementById('ntTimelineNode2');
  var tlTitle2 = document.getElementById('ntTimelineTitle2');
  var tlDesc2 = document.getElementById('ntTimelineDesc2');

  var tlStep3 = document.getElementById('ntTimelineStep3');
  var tlNode3 = document.getElementById('ntTimelineNode3');

  var refText = (order && order.txId) ? order.txId : 'MBBANK';
  if (headerIcon) headerIcon.textContent = '🎉';
  if (headerTitle) headerTitle.textContent = 'ĐÃ XÁC NHẬN TIỀN VÀO MBBANK!';

  if (isMonthly) {
    // THÔNG BÁO DÀNH CHO GÓI THÁNG / VĨNH VIỄN
    if (headerSub) headerSub.innerHTML = '<span style="color:#fbbf24;font-weight:700;">Gói ' + escapeHTML(planName) + ' đã thanh toán thành công!</span> Vui lòng gửi Mã Đơn cho Anh Phú qua Zalo để nhận Key bản quyền & file cài đặt VIP.';
    if (keyBox) keyBox.style.display = 'block';
    if (keyTitleEl) keyTitleEl.innerHTML = '<i class="fa-solid fa-fingerprint" style="color:#f59e0b;"></i> MÃ ĐƠN HÀNG CỦA BẠN (GỬI ZALO ANH PHÚ ĐỂ LẤY KEY):';
    if (keyEl) {
      keyEl.textContent = memo;
      keyEl.style.letterSpacing = '2px';
      keyEl.style.color = '#38bdf8';
    }
    if (keyCopyBtn) {
      keyCopyBtn.innerHTML = '<i class="fa-solid fa-copy"></i> Sao chép Mã Đơn';
      keyCopyBtn.setAttribute('aria-label', 'Sao chép mã đơn');
    }
  } else if (dispatchedKey) {
    if (headerSub) headerSub.textContent = 'Tài khoản MBBank đã khớp tiền! Key bản quyền của bạn đã được xuất tự động bên dưới:';
    if (keyBox) keyBox.style.display = 'block';
    if (keyTitleEl) keyTitleEl.innerHTML = '<i class="fa-solid fa-key" style="color:#f59e0b;"></i> KEY BẢN QUYỀN CỦA BẠN (KÍCH HOẠT NGAY):';
    if (keyEl) {
      keyEl.textContent = dispatchedKey;
      keyEl.style.letterSpacing = '1px';
      keyEl.style.color = '#38bdf8';
    }
    if (keyCopyBtn) {
      keyCopyBtn.innerHTML = '<i class="fa-solid fa-copy"></i> Sao chép Mã Key';
      keyCopyBtn.setAttribute('aria-label', 'Sao chép mã Key');
    }
  } else {
    if (headerSub) headerSub.textContent = 'Tài khoản MBBank đã nhận đủ tiền! Nhắn tin cho Anh Phú để nhận file cài đặt & kích hoạt ngay.';
    if (keyBox) keyBox.style.display = 'block';
    if (keyTitleEl) keyTitleEl.innerHTML = '<i class="fa-solid fa-fingerprint"></i> MÃ ĐƠN HÀNG CỦA BẠN (GỬI ADMIN):';
    if (keyEl) {
      keyEl.textContent = memo;
      keyEl.style.letterSpacing = 'normal';
      keyEl.style.color = '';
    }
    if (keyCopyBtn) {
      keyCopyBtn.innerHTML = '<i class="fa-solid fa-copy"></i> Sao chép Mã Đơn';
      keyCopyBtn.setAttribute('aria-label', 'Sao chép mã đơn hàng');
    }
  }

  if (statusEl) {
    statusEl.innerHTML = '✅ <span style="color:#34d399;font-weight:800;">ĐÃ THANH TOÁN THÀNH CÔNG (MBBank #' + escapeHTML(refText) + ')</span>';
  }

  // Timeline: Step 2 Done, Step 3 Done
  if (tlStep2) { tlStep2.className = 'nt-timeline-item done'; }
  if (tlNode2) { tlNode2.innerHTML = '<i class="fa-solid fa-check"></i>'; }
  if (tlTitle2) { tlTitle2.innerHTML = '<span>Đã nhận tiền qua MBBank</span> <span class="nt-badge-presence"><span class="nt-dot-live"></span> Đã khớp</span>'; }
  if (tlDesc2) { tlDesc2.textContent = 'Ghi có +' + formatVND(price) + ' khớp mã đơn ' + memo + '.'; }

  if (tlStep3) { tlStep3.className = 'nt-timeline-item done active'; }
  if (tlNode3) { tlNode3.innerHTML = '<i class="fa-solid fa-unlock"></i>'; }

  var m = document.getElementById('paidModal');
  if (m) { m.classList.add('open'); manageModalFocus(m); }
  document.body.style.overflow = 'hidden';
}

function copyGeneratedKey(btn) {
  var keyEl = document.getElementById('paidOrderCode');
  var key = keyEl ? keyEl.textContent.trim() : '';
  if (!key) return;

  if (navigator.clipboard) {
    navigator.clipboard.writeText(key);
  } else {
    var ta = document.createElement('textarea');
    ta.value = key;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }
  var oldHtml = btn.innerHTML;
  btn.innerHTML = '<i class="fa-solid fa-check"></i> Đã sao chép!';
  setTimeout(function() { btn.innerHTML = oldHtml; }, 2000);
  toast('🔑', 'Đã sao chép mã Key bản quyền: ' + key);
}

function closePaidModal() {
  stopPaymentWatcher();
  var m = document.getElementById('paidModal');
  if (m) m.classList.remove('open');
  document.body.style.overflow = '';

  // Kích hoạt màn hình bảo trì sau khi khách đã nhận key xong và đóng cửa sổ
  if (isMaintenanceActive && cachedMaintenanceData) {
    setTimeout(function() {
      renderMaintenanceScreen(cachedMaintenanceData.maintenanceMessage, cachedMaintenanceData.maintenanceUntil);
    }, 200);
  }
}

function copyPaidSyntax() {
  var memo = window.currentOrderMemo || (document.getElementById('paidConfirmCode') ? document.getElementById('paidConfirmCode').textContent.trim() : 'DP487340');
  
  if (!navigator.clipboard) {
    var ta = document.createElement('textarea');
    ta.value = memo;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  } else {
    navigator.clipboard.writeText(memo);
  }

  var copyBtnText = document.getElementById('paidCopyText');
  if (copyBtnText) {
    var oldText = copyBtnText.textContent;
    copyBtnText.textContent = 'Đã chép!';
    setTimeout(function() {
      copyBtnText.textContent = oldText;
    }, 2000);
  }
  toast('📋', 'Đã sao chép mã đơn: ' + memo + ' (Gửi qua Zalo 0588500524 để nhận file)');
}

/* ═══════ ORDERS STORAGE & ADMIN CHECK LOGIC ═══════ */
function getOrders() {
  try {
    var raw = localStorage.getItem('daiphu_orders');
    return raw ? JSON.parse(raw) : [];
  } catch(e) {
    return [];
  }
}

function saveOrder(order) {
  try {
    var list = getOrders();
    var idx = list.findIndex(function(o) { return o.id === order.id; });
    if (idx >= 0) {
      list[idx] = order;
    } else {
      list.unshift(order);
    }
    if (list.length > 200) list = list.slice(0, 200);
    localStorage.setItem('daiphu_orders', JSON.stringify(list));
  } catch(e) {}

}


function openOrderCheckModal(presetCode) {
  var m = document.getElementById('orderCheckModal');
  if (m) { m.classList.add('open'); manageModalFocus(m); }
  document.body.style.overflow = 'hidden';

  var inp = document.getElementById('checkOrderInput');
  if (inp) {
    if (presetCode) {
      inp.value = presetCode;
      lookupOrderCode(presetCode);
    } else if (window.currentOrderMemo) {
      inp.value = window.currentOrderMemo;
      lookupOrderCode(window.currentOrderMemo);
    }
  }
  // Hiển thị danh sách đơn gần đây của khách
  renderRecentOrders();
}

function closeOrderCheckModal() {
  var m = document.getElementById('orderCheckModal');
  if (m) m.classList.remove('open');
  document.body.style.overflow = '';
}

function lookupOrderCode(manualCode) {
  var code = manualCode || (document.getElementById('checkOrderInput') ? document.getElementById('checkOrderInput').value.trim().toUpperCase() : '');
  var resultBox = document.getElementById('lookupResult');
  if (!resultBox) return;

  if (!code) {
    toast('⚠️', 'Vui lòng nhập mã đơn cần kiểm tra!');
    return;
  }

  var list = getOrders();
  var order = list.find(function(o) {
    return o.id && o.id.toUpperCase() === code;
  });

  resultBox.style.display = 'block';

  function displayOrderResult(o) {
    var statusBadge = '';
    if (o.status === 'approved') {
      statusBadge = '<span style="background:rgba(34,197,94,0.2);color:#4ade80;border:1px solid rgba(34,197,94,0.4);padding:4px 10px;border-radius:6px;font-size:11.5px;font-weight:800;">✅ ĐÃ THANH TOÁN (HOÀN THÀNH)</span>';
    } else if (o.status === 'rejected') {
      statusBadge = '<span style="background:rgba(239,68,68,0.2);color:#f87171;border:1px solid rgba(239,68,68,0.4);padding:4px 10px;border-radius:6px;font-size:11.5px;font-weight:800;">❌ CHƯA KHỚP TIỀN</span>';
    } else {
      statusBadge = '<span style="background:rgba(56,189,248,0.2);color:#38bdf8;border:1px solid rgba(56,189,248,0.4);padding:4px 10px;border-radius:6px;font-size:11.5px;font-weight:800;">⏳ ĐANG CHỜ DUYỆT</span>';
    }

    var cleanId = escapeHTML(o.id || '');
    var codeDisplayHtml = '';
    if (o.status === 'approved') {
      codeDisplayHtml = '<strong style="color:#00f0ff;font-family:monospace;font-size:15px;">Mã đơn: ' + cleanId + '</strong>';
    } else {
      // THEO YÊU CẦU ANH PHÚ: Khi chờ duyệt TUYỆT ĐỐI KHÔNG HIỂN THỊ MÃ DP... tránh gian lận
      codeDisplayHtml = '<strong style="color:#fbbf24;font-size:13px;display:inline-flex;align-items:center;gap:6px;"><i class="fa-solid fa-lock"></i> Mã đơn: <i>(Cấp sau khi duyệt thanh toán)</i></strong>';
    }

    var cleanProd = escapeHTML(o.productName || o.product || o.planName || o.plan || 'Sản phẩm');
    var cleanPlan = escapeHTML(o.planName || o.plan || 'Gói');
    var cleanUser = escapeHTML(o.user || 'Khách');
    var cleanPhone = escapeHTML(o.phone || '');
    var cleanTime = escapeHTML(o.time || '');
    var cleanTxId = (o.status === 'approved' && o.txId) ? '<div style="color:#34d399;font-weight:700;">• Giao dịch MBBank: ' + escapeHTML(o.txId) + '</div>' : '';
    var existingKey = o.licenseKey || (getUsedKeysMap()[o.id]) || '';
    if (o.status === 'approved' && !existingKey) {
      var autoKey = dispatchKeyForOrder(o);
      if (autoKey) {
        existingKey = autoKey;
        o.licenseKey = autoKey;
        saveOrder(o);
      }
    }
    var licenseKeyHtml = '';
    if (o.status === 'approved' && existingKey) {
      licenseKeyHtml = '<div style="margin-top:8px;padding:10px 12px;background:rgba(0,240,255,0.08);border:1px solid rgba(0,240,255,0.3);border-radius:8px;">'
        + '<div style="color:#38bdf8;font-size:11px;font-weight:800;margin-bottom:4px;text-transform:uppercase;"><i class="fa-solid fa-key"></i> Key bản quyền của bạn:</div>'
        + '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">'
          + '<strong style="color:#00f0ff;font-family:monospace;font-size:14px;letter-spacing:1px;">' + escapeHTML(existingKey) + '</strong>'
          + '<button type="button" class="btn" onclick="copyText(\'' + escapeHTML(existingKey) + '\', this)" style="background:var(--rd-volt,#d7ff3c);color:#0a0d14;font-size:11px;font-weight:800;padding:4px 10px;border-radius:6px;cursor:pointer;border:none;">Sao chép Key</button>'
        + '</div>'
      + '</div>';
    }

    resultBox.innerHTML = '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;border-bottom:1px solid rgba(255,255,255,0.08);padding-bottom:8px;flex-wrap:wrap;gap:8px;">'
      + codeDisplayHtml
      + statusBadge
    + '</div>'
    + '<div style="display:flex;flex-direction:column;gap:6px;font-size:12.5px;color:#cbd5e1;">'
      + '<div>🛒 <b>Sản phẩm đã chọn:</b> <span style="color:#fff;font-weight:700;">' + cleanProd + '</span> (' + cleanPlan + ')</div>'
      + '<div>💰 <b>Số tiền:</b> <span style="color:#10b981;font-weight:800;">' + formatVND(o.price || o.amount || 0) + '</span></div>'
      + '<div>👤 <b>Tài khoản mua:</b> <span style="color:#fff;">' + cleanUser + '</span>' + (cleanPhone ? ' • SĐT/Zalo: <span style="color:#f59e0b;">' + cleanPhone + '</span>' : '') + '</div>'
      + '<div>⏰ <b>Thời gian:</b> ' + cleanTime + '</div>'
      + cleanTxId
      + licenseKeyHtml
      + (o.status !== 'approved' ? '<div style="margin-top:6px;padding:8px;background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.3);border-radius:6px;color:#fbbf24;font-size:11.5px;"><i class="fa-solid fa-circle-info"></i> Nội dung chuyển khoản là <b>Tên tài khoản (Username)</b> của bạn. Sau khi MBBank xác nhận tiền vào, hệ thống sẽ tự động duyệt đơn và cấp mã đơn chính thức!</div>' : '')
    + '</div>'
    + '<div style="margin-top:12px;padding-top:10px;border-top:1px solid rgba(255,255,255,0.08);display:flex;flex-wrap:wrap;gap:8px;">'
      + '<a href="https://zalo.me/0588500524" target="_blank" rel="noopener" class="btn" style="background:#0284c7;color:#fff;font-size:12px;padding:7px 14px;border-radius:6px;text-decoration:none;display:inline-flex;align-items:center;gap:6px;font-weight:700;">'
        + '<i class="fa-solid fa-headset"></i> Cần hỗ trợ? Nhắn Zalo Anh Phú (0588500524)'
      + '</a>'
    + '</div>';
  }

  if (order) {
    displayOrderResult(order);
  } else {
    resultBox.innerHTML = '<div style="text-align:center;padding:12px;color:#94a3b8;"><i class="fa-solid fa-spinner fa-spin"></i> Đang tìm mã ' + escapeHTML(code) + ' trên hệ thống máy chủ...</div>';
    fetch('/api/orders?code=' + encodeURIComponent(code) + '&_t=' + Date.now(), { cache: 'no-store' })
      .then(function(res) { return res.json(); })
      .then(function(data) {
        if (data && data.success && data.order) {
          var found = data.order;
          var ord = {
            id: found.id,
            productName: found.product,
            planName: found.plan,
            price: found.price,
            user: found.user,
            phone: found.phone || '',
            time: found.time,
            status: found.status,
            txId: found.txId,
            licenseKey: found.licenseKey || found.key || ''
          };
          saveOrder(ord);
          displayOrderResult(ord);
        } else {
          resultBox.innerHTML = '<div style="text-align:center;padding:10px;color:#fca5a5;">'
            + '<i class="fa-solid fa-circle-xmark" style="font-size:24px;margin-bottom:6px;"></i>'
            + '<div style="font-weight:700;font-size:14px;">Không tìm thấy mã đơn: ' + escapeHTML(code) + '</div>'
            + '<p style="font-size:11.5px;color:#cbd5e1;margin-top:4px;">Vui lòng kiểm tra lại mã hoặc liên hệ Zalo <b>0588500524 (Anh Phú)</b> để đối soát trực tiếp.</p>'
          + '</div>';
        }
      })
      .catch(function(e) {
        resultBox.innerHTML = '<div style="text-align:center;padding:10px;color:#fca5a5;">Không tìm thấy mã đơn: ' + escapeHTML(code) + '</div>';
      });
  }
}

/* ── LỊCH SỬ ĐƠN HÀNG (chỉ dành cho khách check sản phẩm đã mua của chính mình) ──── */
function openMyOrderHistory() {
  var u = getCurrentUser();
  if (!u) {
    toast('🔒', 'Vui lòng đăng nhập để xem lịch sử đơn hàng!');
    openLogin();
    return;
  }
  var m = document.getElementById('orderCheckModal');
  if (m) { m.classList.add('open'); manageModalFocus(m); }
  document.body.style.overflow = 'hidden';
  var inp = document.getElementById('checkOrderInput');
  if (inp) inp.value = '';
  var resultBox = document.getElementById('lookupResult');
  if (resultBox) resultBox.style.display = 'none';
  renderRecentOrders();

  // Đồng bộ đơn hàng của chính tài khoản này từ Cloud Database qua User Token
  if (u.username) {
    var userToken = localStorage.getItem('daiphu_user_token') || '';
    fetch('/api/orders?user=' + encodeURIComponent(u.username), {
      headers: {
        'x-user-token': userToken
      }
    })
      .then(function(res) { return res.json(); })
      .then(function(data) {
        if (data && data.success && data.orders) {
          data.orders.forEach(function(found) {
            var ord = {
              id: found.id,
              productName: found.product,
              planName: found.plan,
              price: found.price,
              user: found.user,
              phone: found.phone || '',
              time: found.time,
              status: found.status,
              txId: found.txId
            };
            saveOrder(ord);
          });
          renderRecentOrders();
        }
      })
      .catch(function(e) {});
  }
}

function renderRecentOrders() {
  var container = document.getElementById('recentOrdersList');
  if (!container) return;

  var user = getCurrentUser();
  if (!user || !user.username) {
    container.innerHTML = '<div style="text-align:center;padding:24px 12px;color:#94a3b8;font-size:13px;">'
      + '<i class="fa-solid fa-user-lock" style="font-size:28px;margin-bottom:8px;display:block;color:#f59e0b;opacity:0.8;"></i>'
      + 'Vui lòng đăng nhập để xem các sản phẩm bạn đã mua.<br>'
      + '<button type="button" class="btn btn-primary" onclick="closeOrderCheckModal();openLogin();" style="margin-top:10px;font-size:12px;padding:6px 14px;">Đăng nhập ngay</button>'
      + '</div>';
    return;
  }

  var allOrders = getOrders();
  // CHỈ LỌC CÁC ĐƠN ĐÃ THANH TOÁN THÀNH CÔNG ('approved') CỦA CHÍNH TÀI KHOẢN NÀY
  var list = allOrders.filter(function(o) {
    if (!o.user) return false;
    if (o.status !== 'approved') return false; // TUYỆT ĐỐI KHÔNG HIỂN THỊ ĐƠN CHƯA THANH TOÁN
    return o.user.toLowerCase() === user.username.toLowerCase();
  });

  if (list.length === 0) {
    container.innerHTML = '<div style="text-align:center;padding:24px 12px;font-size:13px;color:#94a3b8;">'
      + '<i class="fa-solid fa-bag-shopping" style="font-size:30px;margin-bottom:8px;display:block;opacity:0.4;"></i>'
      + 'Bạn chưa có đơn hàng đã thanh toán nào trên tài khoản <b>' + escapeHTML(user.username) + '</b>.<br>'
      + '<a href="#products" onclick="closeOrderCheckModal();" style="color:#00f0ff;font-weight:700;text-decoration:none;margin-top:8px;display:inline-block;">Xem sản phẩm & mua ngay &rarr;</a>'
      + '</div>';
    return;
  }

  var html = '';
  list.forEach(function(o) {
    var statusText = '✅ Đã thanh toán';
    var statusColor = '#4ade80';
    var statusBg = 'rgba(34,197,94,0.15)';

    var cleanId = escapeHTML(o.id || '');
    var prodName = escapeHTML(o.productName || o.product || o.planName || o.plan || 'Sản phẩm');
    var planName = escapeHTML(o.planName || o.plan || '');
    var cleanPrice = formatVND(o.price || o.amount || 0);
    var cleanTime = escapeHTML(o.time || '');

    html += '<div class="recent-order-item" data-id="' + cleanId + '" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:10px 12px;display:flex;align-items:center;justify-content:space-between;gap:12px;cursor:pointer;transition:all 0.15s;">'
      + '<div style="flex:1;min-width:0;">'
        + '<div style="display:flex;align-items:center;gap:8px;margin-bottom:3px;flex-wrap:wrap;">'
          + '<strong style="color:#00f0ff;font-family:monospace;font-size:13px;">' + cleanId + '</strong>'
          + '<span style="font-size:10.5px;color:' + statusColor + ';background:' + statusBg + ';padding:2px 8px;border-radius:6px;font-weight:700;">' + statusText + '</span>'
        + '</div>'
        + '<div style="font-size:13px;color:#fff;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + prodName + (planName ? ' <span style="color:#94a3b8;font-size:11.5px;font-weight:normal;">(' + planName + ')</span>' : '') + '</div>'
        + '<div style="font-size:11.5px;color:#94a3b8;margin-top:2px;"><b style="color:#10b981;">' + cleanPrice + '</b>' + (cleanTime ? ' • ' + cleanTime : '') + '</div>'
      + '</div>'
      + '<button type="button" class="btn" style="background:rgba(0,240,255,0.15);color:#00f0ff;border:1px solid rgba(0,240,255,0.3);font-size:11.5px;font-weight:700;padding:5px 12px;border-radius:6px;cursor:pointer;white-space:nowrap;">Xem chi tiết</button>'
    + '</div>';
  });

  container.innerHTML = html;

  if (!container.dataset.eventBound) {
    container.dataset.eventBound = 'true';
    container.addEventListener('click', function(e) {
      var item = e.target.closest('.recent-order-item');
      if (item && item.getAttribute('data-id')) {
        lookupOrderCode(item.getAttribute('data-id'));
      }
    });
  }
}

function clearOrdersHistory() {
  if (confirm('Bạn có chắc muốn xóa danh sách lịch sử đơn hàng trên máy này?')) {
    var user = getCurrentUser();
    if (user && user.username) {
      var all = getOrders();
      var remaining = all.filter(function(o) {
        return !o.user || o.user.toLowerCase() !== user.username.toLowerCase();
      });
      localStorage.setItem('daiphu_orders', JSON.stringify(remaining));
    } else {
      localStorage.removeItem('daiphu_orders');
    }
    renderRecentOrders();
    var resultBox = document.getElementById('lookupResult');
    if (resultBox) resultBox.style.display = 'none';
    toast('🗑️', 'Đã xóa lịch sử đơn hàng trên máy này.');
  }
}

/* ═══════ SECURE ASYNC COPY TEXT ═══════ */
function copyText(str, btn) {
  if (!str) return;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(str).catch(function() {
      var ta = document.createElement('textarea');
      ta.value = str;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      try { document.execCommand('copy'); } catch(e) {}
      document.body.removeChild(ta);
    });
  } else {
    var ta = document.createElement('textarea');
    ta.value = str;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try { document.execCommand('copy'); } catch(e) {}
    document.body.removeChild(ta);
  }
  toast('📋', 'Đã sao chép: ' + str);
  if (btn) {
    var oldHtml = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-check"></i>';
    setTimeout(function() { btn.innerHTML = oldHtml; }, 1500);
  }
}

/* ═══════ LIGHTBOX ═══════ */
function openLB(src) {
  document.body.style.overflow = 'hidden';
  document.getElementById('lbImg').src = src;
  document.getElementById('lbModal').classList.add('open');
}
function closeLB() {
  document.body.style.overflow = '';
  document.getElementById('lbModal').classList.remove('open');
}

/* ═══════ 3D FLOATING NEON TOAST (XSS-SAFE & A11Y COMPLIANT) ═══════ */
function toast(ico, msg) {
  var c = document.getElementById('tc');
  if (!c) return;
  var t = document.createElement('div');
  t.className = 'toast-item';
  t.setAttribute('role', 'status');
  t.setAttribute('aria-live', 'polite');

  var accent = document.createElement('div');
  accent.className = 't-accent';
  t.appendChild(accent);

  var icoBox = document.createElement('div');
  icoBox.className = 't-ico-box';
  icoBox.textContent = ico || 'ℹ️';
  t.appendChild(icoBox);

  var content = document.createElement('div');
  content.className = 't-content';
  var msgDiv = document.createElement('div');
  msgDiv.className = 't-msg';
  msgDiv.textContent = msg || '';
  content.appendChild(msgDiv);
  t.appendChild(content);

  var closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 't-close-btn';
  closeBtn.setAttribute('aria-label', 'Đóng thông báo');
  closeBtn.textContent = '×';
  closeBtn.onclick = function(e) {
    e.stopPropagation();
    t.classList.add('out');
    setTimeout(function() { t.remove(); }, 200);
  };
  t.appendChild(closeBtn);

  var prog = document.createElement('div');
  prog.className = 't-progress';
  t.appendChild(prog);

  t.onclick = function() {
    t.classList.add('out');
    setTimeout(function() { t.remove(); }, 250);
  };

  c.appendChild(t);
  setTimeout(function() {
    if (t.parentNode) {
      t.classList.add('out');
      setTimeout(function() { t.remove(); }, 250);
    }
  }, 3600);
}

/* ═══════ KEYBOARD SHORTCUTS & SEARCH ═══════ */
document.addEventListener('keydown', function(e) {
  if (e.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) {
    e.preventDefault();
    var s = document.getElementById('product-search');
    if (s) s.focus();
  }
});

/* ═══════ SCROLL LISTENER ═══════ */
window.addEventListener('scroll', function() {
  var topbar = document.querySelector('.topbar');
  if (topbar) topbar.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

/* ═══════ INIT ═══════ */
updateAuthUI();
renderProducts();
renderFeedback();

/* ═══ REVEAL ANIMATION ON SCROLL (SINGLETON OBSERVER) ═══ */
var globalScrollObserver = null;
function initScrollReveal() {
  var cards = document.querySelectorAll('.product:not(.reveal-in), .section-head:not(.reveal-in), .history-wrap:not(.reveal-in), .footer:not(.reveal-in), .auth-card:not(.reveal-in)');
  if (!('IntersectionObserver' in window)) {
    cards.forEach(function(c) { c.classList.add('reveal-in'); });
    return;
  }
  if (!globalScrollObserver) {
    globalScrollObserver = new IntersectionObserver(function(entries, obs) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-in');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
  }
  cards.forEach(function(c) { globalScrollObserver.observe(c); });
}

// Trigger scroll reveal smoothly after initial render

/* ═══════ ACCESSIBILITY FOCUS TRAP HELPER ═══════ */
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeBuyModal();
    closeLoginModal();
    closePaidModal();
    closeOrderCheckModal();
    closeLB();
    return;
  }
  if (e.key === 'Tab') {
    var activeModal = document.querySelector('.modal.open, .lb-modal.open');
    if (!activeModal) return;
    var focusableEls = activeModal.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex="0"]');
    if (!focusableEls.length) return;
    var firstEl = focusableEls[0];
    var lastEl = focusableEls[focusableEls.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstEl) {
        lastEl.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastEl) {
        firstEl.focus();
        e.preventDefault();
      }
    }
  }
});

initScrollReveal();

/* ═══════════════════════════════════════════════════════════════════
   ⚡ LIVE PURCHASES TICKER NOTIFICATION CONTROLLER
   Hiển thị thông báo mua hàng theo thời gian thực tạo độ uy tín cao
   ═══════════════════════════════════════════════════════════════════ */
(function initLivePurchasesTicker() {
  var sampleBuyers = [
    { name: 'Quân (098***)', prod: 'TrollModz', plan: 'Key 12 Giờ', img: 'trollmodz.png', time: '1 phút trước' },
    { name: 'Huy Hoàng (091***)', prod: 'AimLock Forget 3.0', plan: 'Bản 3.0 VIP', img: 'assets/uploads/products/aimlock-forget.jpg', time: '2 phút trước' },
    { name: 'Khánh (035***)', prod: 'TrollModz', plan: 'Key 1 Ngày', img: 'trollmodz.png', time: '3 phút trước' },
    { name: 'Minh Đức (086***)', prod: 'AimLock Forget 2.0', plan: 'Bản 2.0', img: 'assets/uploads/products/aimlock-forget.jpg', time: '5 phút trước' },
    { name: 'Thanh Tùng (077***)', prod: 'TrollModz', plan: 'Key 12 Giờ', img: 'trollmodz.png', time: '7 phút trước' },
    { name: 'Tuấn Anh (090***)', prod: 'NovaX iOS', plan: 'Key 7 Ngày', img: 'assets/uploads/products/novax.jpg', time: '9 phút trước' },
    { name: 'Bảo Nam (093***)', prod: 'Sx2 External', plan: 'Gói 1 Ngày', img: 'assets/uploads/products/sx2-external.jpg', time: '14 phút trước' }
  ];

  var tickerEl = document.createElement('div');
  tickerEl.id = 'livePurchaseToast';
  tickerEl.className = 'live-purchase-toast';
  document.body.appendChild(tickerEl);

  var buyerIndex = 0;
  function showNextPurchase() {
    if (!tickerEl) return;
    var b = sampleBuyers[buyerIndex];
    buyerIndex = (buyerIndex + 1) % sampleBuyers.length;

    var thumbHtml = b.img
      ? '<div class="lpt-thumb"><img src="' + escapeHTML(b.img) + '" alt="' + escapeHTML(b.prod) + '" class="lpt-img" onerror="this.src=\'trollmodz.png\'"><span class="lpt-live-dot"></span></div>'
      : '<div class="lpt-icon"><i class="fa-solid fa-bolt"></i></div>';

    tickerEl.innerHTML = 
      thumbHtml +
      '<div class="lpt-body">' +
        '<div class="lpt-title"><b>' + escapeHTML(b.name) + '</b> vừa mua thành công</div>' +
        '<div class="lpt-desc">' + escapeHTML(b.prod) + ' • <span style="color:var(--rd-volt);font-weight:700;">' + escapeHTML(b.plan) + '</span> <small style="opacity:0.65;">(' + escapeHTML(b.time) + ')</small></div>' +
      '</div>';

    tickerEl.classList.add('visible');

    setTimeout(function() {
      if (tickerEl) tickerEl.classList.remove('visible');
    }, 4500);
  }

  // Khởi chạy sau 2.5 giây và lặp lại mỗi 12-15 giây
  setTimeout(function() {
    showNextPurchase();
    setInterval(function() {
      showNextPurchase();
    }, 13500);
  }, 2500);
})();
