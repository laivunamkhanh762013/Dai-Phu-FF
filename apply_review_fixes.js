const fs = require('fs');

// 1. FIX index.html: handleLoginSubmit phone bug & dynamic oldPrice
let html = fs.readFileSync('index.html', 'utf8');

// Fix 1: phone reference error in handleLoginSubmit
html = html.replace(
  "phone: userObj.phone || phone || ''",
  "phone: userObj.phone || ''"
);

// Fix 2: add oldPrice to forget-lix
html = html.replace(
  "priceMin: 150000,\n      priceMax: 150000,\n      image: 'assets/uploads/products/forget-lix.jpg',",
  "priceMin: 150000,\n      priceMax: 150000,\n      oldPrice: 350000,\n      image: 'assets/uploads/products/forget-lix.jpg',"
);

// Fix 3: dynamic oldPrice in renderProducts()
html = html.replace(
  /var priceDisplay = \(p\.priceMin === p\.priceMax\)[^;]+;/,
  `var oldPriceHtml = p.oldPrice ? ' <span class="old-price" style="font-size:10px;text-decoration:line-through;color:#f87171;margin-left:5px;font-weight:normal;">' + formatVND(p.oldPrice) + '</span>' : '';
      var priceDisplay = (p.priceMin === p.priceMax) ? (formatVND(p.priceMin) + oldPriceHtml) : formatVND(p.priceMin) + ' <span class="card-price-arrow">→</span> ' + formatVND(p.priceMax);`
);

// Fix 4: dynamic oldPrice in openBuyModalById()
html = html.replace(
  /if \(rangePriceEl\) rangePriceEl\.innerHTML = \(p\.priceMin === p\.priceMax\)[^;]+;/,
  `var modalOldPriceHtml = p.oldPrice ? ' <span style="font-size:10px;text-decoration:line-through;color:#f87171;margin-left:6px;font-weight:normal;">' + formatVND(p.oldPrice) + '</span>' : '';
    if (rangePriceEl) rangePriceEl.innerHTML = (p.priceMin === p.priceMax) ? (formatVND(p.priceMin) + modalOldPriceHtml) : formatVND(p.priceMin) + ' → ' + formatVND(p.priceMax);`
);

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html updated successfully');

// 2. FIX admin.html: amountIn !== price -> amountIn < price
let adminHtml = fs.readFileSync('admin.html', 'utf8');
adminHtml = adminHtml.replace(
  "if (price > 0 && amountIn !== price) return false;",
  "if (price > 0 && amountIn < price) return false;"
);
fs.writeFileSync('admin.html', adminHtml, 'utf8');
console.log('admin.html updated successfully');
