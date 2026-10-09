// BẢNG GIÁ SẢN PHẨM CHUẨN TRÊN MÁY CHỦ (SERVER CANONICAL CATALOG)
// Ngăn chặn tuyệt đối hành vi giả mạo giá tiền (Price Tampering) và Prototype Pollution

function deepFreeze(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  Object.freeze(obj);
  for (const key of Object.keys(obj)) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      deepFreeze(obj[key]);
    }
  }
  return obj;
}

const RAW_CATALOG = {
  "proxy-adr-ob55": {
    "name": "Proxy Adr OB55 (Android)",
    "soldOut": false,
    "plans": {
      "Key 1 Ngày (1 Days)": 25000,
      "Key 7 Ngày (7 Days)": 70000,
      "Key 30 Ngày (30 Days)": 150000,
      "Key Vĩnh Viễn (Lifetime)": 500000
    }
  },

  "slot-nhom-file-tien": {
    "name": "Slot Nhóm File Tiền VIP",
    "soldOut": false,
    "plans": {
      "1 Slot Vào Nhóm (Vĩnh Viễn)": 20000
    }
  },

  "innova-cheat": {
    "name": "InNova Cheat (Adr • iOS)",
    "soldOut": false,
    "plans": {
      "Gói 1 Ngày": 25000,
      "Gói 7 Ngày": 70000,
      "Gói 30 Ngày": 150000
    }
  },
  "uratr-cheat-vip": {
    "name": "Uratr Cheat VIP 🇻🇳 (iOS • Android)",
    "soldOut": false,
    "plans": {
      "Độ Nhạy Thấp (iPhone & Android Thấp)": 99000,
      "Độ Nhạy Cao (iPhone & Android Cao)": 99000
    }
  },
  "trollmodz": {
    "name": "TrollModz (Adr • iOS • PC)",
    "soldOut": false,
    "plans": {
      "Key 1 Giờ (Test)": 10000,
      "Key 12 Giờ": 15000,
      "Key 1 Ngày": 25000,
      "Key 7 Ngày (1 Tuần)": 100000,
      "Key 15 Ngày": 150000,
      "Key 30 Ngày (1 Tháng)": 200000
    }
  },
  "sx2-dinhvi": {
    "name": "Sx2 Team External No root v1.0",
    "soldOut": false,
    "plans": {
      "Gói 1 Ngày": 30000,
      "Gói 7 Ngày (1 Tuần)": 80000,
      "Gói 30 Ngày (1 Tháng)": 200000,
      "Gói Vĩnh Viễn": 400000
    }
  },
  "proxy-ios-novax": {
    "name": "NovaX (iOS)",
    "soldOut": false,
    "plans": {
      "Key 1 Ngày": 20000,
      "Key 7 Ngày": 50000,
      "Key 30 Ngày": 100000,
      "Key Vĩnh Viễn": 200000
    }
  },
  "novax-android": {
    "name": "NovaX (Android)",
    "soldOut": false,
    "plans": {
      "Key 1 Ngày": 20000,
      "Key 7 Ngày": 50000,
      "Key 30 Ngày": 100000,
      "Key Vĩnh Viễn": 200000
    }
  },
  "proxy-ios-delta": {
    "name": "Proxy Aim iOS - Delta",
    "soldOut": false,
    "plans": {
      "Key 1 Ngày": 20000,
      "Key 1 Tuần (7 Ngày)": 50000,
      "Key 1 Tháng (30 Ngày)": 100000
    }
  },
  "migul-lite": {
    "name": "Menu Migul Lite (iOS)",
    "soldOut": false,
    "plans": {
      "Key 1 Ngày": 50000,
      "Key 7 Ngày (1 Tuần)": 150000,
      "Key 30 Ngày (1 Tháng)": 350000
    }
  },
  "migul-pro": {
    "name": "Menu Migul Pro (iOS)",
    "soldOut": false,
    "plans": {
      "Key 1 Giờ (Test)": 10000,
      "Key 1 Ngày": 70000,
      "Key 7 Ngày (1 Tuần)": 215000,
      "Key 30 Ngày (1 Tháng)": 450000
    }
  }
};

deepFreeze(RAW_CATALOG);

// Pre-computed Maps for Absolute O(1) Lookups
const ID_MAP = new Map();
const NAME_MAP = new Map();
const PRODUCT_TO_ID_MAP = new Map();
const PRECOMPUTED_PLANS = new Map();

for (const [id, item] of Object.entries(RAW_CATALOG)) {
  const normId = id.normalize('NFC').toLowerCase().trim();
  ID_MAP.set(normId, item);
  PRODUCT_TO_ID_MAP.set(item, normId);

  if (item.name) {
    const normName = item.name.normalize('NFC').toLowerCase().trim();
    NAME_MAP.set(normName, item);
  }

  // Pre-compute normalized plans
  const planMap = new Map();
  if (item.plans) {
    for (const [pName, price] of Object.entries(item.plans)) {
      if (typeof price === 'number' && Number.isFinite(price) && price >= 0) {
        planMap.set(pName.normalize('NFC').toLowerCase().trim(), price);
      }
    }
  }
  PRECOMPUTED_PLANS.set(normId, planMap);
}

const DANGEROUS_KEYS = new Set(['__proto__', 'constructor', 'prototype']);
const MAX_INPUT_LENGTH = 150;

function getProductInfo(productKey) {
  if (typeof productKey !== 'string') return null;
  if (productKey.length > MAX_INPUT_LENGTH) return null;

  const normalizedKey = productKey.normalize('NFC').trim().toLowerCase();
  if (DANGEROUS_KEYS.has(normalizedKey)) return null;

  return ID_MAP.get(normalizedKey) || NAME_MAP.get(normalizedKey) || null;
}

function getCanonicalPrice(productKey, planName) {
  if (typeof productKey !== 'string' || typeof planName !== 'string') return null;
  if (productKey.length > MAX_INPUT_LENGTH || planName.length > MAX_INPUT_LENGTH) return null;

  const normalizedKey = productKey.normalize('NFC').trim().toLowerCase();
  if (DANGEROUS_KEYS.has(normalizedKey)) return null;

  // Tra cứu thuần O(1) theo ID hoặc Name
  const product = ID_MAP.get(normalizedKey) || NAME_MAP.get(normalizedKey);
  if (!product || product.soldOut) return null;

  // Lấy ID từ Reverse Map thuần O(1)
  const productId = PRODUCT_TO_ID_MAP.get(product);
  if (!productId) return null;

  const planMap = PRECOMPUTED_PLANS.get(productId);
  if (!planMap) return null;

  const normalizedPlan = planName.normalize('NFC').trim().toLowerCase();
  const price = planMap.get(normalizedPlan);

  if (typeof price === 'number' && Number.isFinite(price) && price >= 0) {
    return price;
  }

  return null;
}

module.exports = {
  CATALOG: RAW_CATALOG,
  getProductInfo,
  getCanonicalPrice
};
