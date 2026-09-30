const fs = require('fs');

// 1. Fix backend api/orders.js
let apiJs = fs.readFileSync('api/orders.js', 'utf8');

// Add CATALOG to require
apiJs = apiJs.replace(
  /const \{ getCanonicalPrice \} = require\('\.\/_catalog'\);/,
  "const { CATALOG, getCanonicalPrice } = require('./_catalog');"
);

// In the 'create' action:
apiJs = apiJs.replace(
  /const prodKey = sanitizeText\(body\.productId \|\| body\.product, 60\);/,
  `const prodKey = sanitizeText(body.productId || body.product, 60);
          let realProductName = prodKey;
          if (CATALOG && CATALOG[prodKey] && CATALOG[prodKey].name) {
            realProductName = CATALOG[prodKey].name;
          }`
);

// Replace the assignment to newOrder
apiJs = apiJs.replace(
  /product: prodKey,\n\s*plan: planName,/,
  `product: realProductName,\n              plan: planName,`
);

// Also for updates (if any):
apiJs = apiJs.replace(
  /const productName = sanitizeText\(body\.product, 60\) \|\| 'AimLock FF';/,
  `let productName = sanitizeText(body.product, 60) || 'AimLock FF';
        if (CATALOG && CATALOG[productName] && CATALOG[productName].name) {
          productName = CATALOG[productName].name;
        }`
);

fs.writeFileSync('api/orders.js', apiJs, 'utf8');

// 2. Fix frontend error message in index.html
let html = fs.readFileSync('index.html', 'utf8');
// Replace `Hệ thống chưa nhận được tiền cho đơn: ' + orderId + '</b>'` -> `Hệ thống chưa nhận được tiền!'`
// Replace `Nội dung chuyển khoản phải là <b>' + orderId + '</b>` -> `Nội dung chuyển khoản phải là <b>' + displayMemo + '</b>`

html = html.replace(/<b style="color:#f87171;font-size:13px;">Hệ thống chưa nhận được tiền cho đơn: ' \+ orderId \+ '<\/b>/g,
    '<b style="color:#f87171;font-size:13px;">Hệ thống chưa nhận được tiền!</b>');

html = html.replace(/Nội dung chuyển khoản phải là <b>' \+ orderId \+ '<\/b>/g,
    `Nội dung chuyển khoản phải là <b>' + displayMemo + '</b>`);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixes applied successfully!');
