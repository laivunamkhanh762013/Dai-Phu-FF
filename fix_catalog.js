const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');
const scriptRegex = /const PRODUCTS = (\[[\s\S]*?\]);\n/;
const match = html.match(scriptRegex);
if (!match) {
    console.error('Could not find PRODUCTS array in index.html');
    process.exit(1);
}

let productsStr = match[1];
// Eval is not safe generally, but since we are reading our own file...
let PRODUCTS;
try {
    eval('PRODUCTS = ' + productsStr + ';');
} catch (e) {
    console.error('Failed to parse PRODUCTS array', e);
    process.exit(1);
}

let catalogObj = {};
PRODUCTS.forEach(p => {
    let plansObj = {};
    p.plans.forEach(plan => {
        plansObj[plan.name] = plan.price;
    });
    catalogObj[p.id] = {
        name: p.name,
        plans: plansObj
    };
});

let catalogFileContent = // BẢNG GIÁ SẢN PHẨM CHUẨN TRÊN MÁY CHỦ (SERVER CANONICAL CATALOG)
// Ngăn chặn tuyệt đối hành vi giả mạo giá tiền (Price Tampering) từ phía trình duyệt

const CATALOG = ;

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
;

fs.writeFileSync('api/_catalog.js', catalogFileContent, 'utf8');
console.log('Successfully synced api/_catalog.js from index.html');
