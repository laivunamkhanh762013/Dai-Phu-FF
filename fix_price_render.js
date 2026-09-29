const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Fix 1: Product Card Price Range
html = html.replace(
  /var priceRangeHtml = '<div class="card-price-range">'\s*\n\s*\+ '<div class="card-price-val">' \+ formatVND\(p\.priceMin\) \+ ' <span class="card-price-arrow">.<\/span> ' \+ formatVND\(p\.priceMax\) \+ '<\/div>'/g,
  `var priceDisplay = (p.priceMin === p.priceMax) ? formatVND(p.priceMin) : formatVND(p.priceMin) + ' <span class="card-price-arrow">→</span> ' + formatVND(p.priceMax);
      var priceRangeHtml = '<div class="card-price-range">'
      + '<div class="card-price-val">' + priceDisplay + '</div>'`
);

// Fix 2: Modal Range Price
html = html.replace(
  /if \(rangePriceEl\) rangePriceEl\.textContent = formatVND\(p\.priceMin\) \+ ' . ' \+ formatVND\(p\.priceMax\);/g,
  `if (rangePriceEl) rangePriceEl.innerHTML = (p.priceMin === p.priceMax) ? formatVND(p.priceMin) + ' <span style="font-size:10px;text-decoration:line-through;color:#f87171;margin-left:6px;font-weight:normal;">350.000đ</span>' : formatVND(p.priceMin) + ' → ' + formatVND(p.priceMax);`
);

// Actually, we can make the product card also show the old price if priceMin === priceMax (just for Forget Lix, but let's do it generically if oldPrice exists, or hardcode it since it's the only one).
// The user says: 150.000đ → 150.000đ --- Đang giảm giá 350K -> 150K (...%)
// It means they want the old price struck through.

fs.writeFileSync('index.html', html, 'utf8');
