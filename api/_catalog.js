// BẢNG GIÁ SẢN PHẨM CHUẨN TRÊN MÁY CHỦ (SERVER CANONICAL CATALOG)
// Ngăn chặn tuyệt đối hành vi giả mạo giá tiền (Price Tampering) từ phía trình duyệt

const CATALOG = {
  "forget-lix": {
    "name": "Forget Lix 3.5 (iOS)",
    "plans": {
      "Forget Lix 3.5 (Giảm từ 350k)": 150000
    }
  },
  "aimlock-forget": {
    "name": "AimLock Forget (Adr · iOS)",
    "plans": {
      "AimLock Forget 1.0": 50000,
      "AimLock Forget 2.0": 200000,
      "AimLock Forget 3.0": 500000
    }
  },
  "forget-hex": {
    "name": "Forget Hex (V1 - V5)",
    "plans": {
      "Forget Hex V1": 49000,
      "Forget Hex V2": 99000,
      "Forget Hex V3": 199000,
      "Forget Hex V4": 399000,
      "Forget Hex V5": 799000
    }
  },
  "trollmodz": {
    "name": "TrollModz (Adr · iOS · PC)",
    "plans": {
      "Key 1 Giờ (Test)": 10000,
      "Key 1 Ngày": 25000,
      "Key 7 Ngày (1 Tuần)": 100000,
      "Key 15 Ngày": 150000,
      "Key 30 Ngày (1 Tháng)": 250000
    }
  },
  "sx2-dinhvi": {
    "name": "Sx2 Team External No root v1.0",
    "plans": {
      "Gói 1 Ngày": 30000,
      "Gói 7 Ngày (1 Tuần)": 80000,
      "Gói 30 Ngày (1 Tháng)": 200000,
      "Gói Vĩnh Viễn": 400000
    }
  },
  "proxy-ios-novax": {
    "soldOut": true,
    "name": "NovaX (Android & iOS)",
    "plans": {
      "Key 1 Ngày": 20000,
      "Key 7 Ngày": 50000,
      "Key 30 Ngày": 100000,
      "Key Vĩnh Viễn": 200000
    }
  },
  "proxy-ios-delta": {
    "name": "Proxy Aim iOS - Delta",
    "plans": {
      "Key 1 Ngày": 20000,
      "Key 1 Tuần (7 Ngày)": 50000,
      "Key 1 Tháng (30 Ngày)": 100000
    }
  },
  "migul-lite": {
    "name": "Menu Migul Lite (iOS)",
    "plans": {
      "Key 1 Ngày": 50000,
      "Key 7 Ngày (1 Tuần)": 150000,
      "Key 30 Ngày (1 Tháng)": 350000
    }
  },
  "migul-pro": {
    "name": "Menu Migul Pro (iOS)",
    "plans": {
      "Key 1 Giờ (Test)": 10000,
      "Key 1 Ngày": 70000,
      "Key 7 Ngày (1 Tuần)": 215000,
      "Key 30 Ngày (1 Tháng)": 450000
    }
  }
};

function getCanonicalPrice(productKey, planName) {
  if (!productKey || !planName) return null;
  // Tìm theo product ID
  let prod = CATALOG[productKey];
  if (!prod) {
    // Tìm theo tên sản phẩm
    const pKey = Object.keys(CATALOG).find(k => CATALOG[k].name.toLowerCase() === String(productKey).toLowerCase());
    if (pKey) prod = CATALOG[pKey];
  }
  if (!prod || !prod.plans) return null;

  // Tìm theo tên plan
  const cleanPlan = String(planName).trim().toLowerCase();
  for (const [pName, price] of Object.entries(prod.plans)) {
    if (pName.toLowerCase() === cleanPlan || cleanPlan.includes(pName.toLowerCase())) {
      return price;
    }
  }
  return null;
}

module.exports = {
  CATALOG,
  getCanonicalPrice
};
