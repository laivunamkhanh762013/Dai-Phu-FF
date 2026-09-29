const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Update Product Card Price Display to include struck-through old price
html = html.replace(
  /var priceDisplay = \(p\.priceMin === p\.priceMax\) \? formatVND\(p\.priceMin\) : formatVND\(p\.priceMin\) \+ ' <span class="card-price-arrow">.<\/span> ' \+ formatVND\(p\.priceMax\);/g,
  `var priceDisplay = (p.priceMin === p.priceMax) ? formatVND(p.priceMin) + ' <span class="old-price" style="font-size:10px;text-decoration:line-through;color:#f87171;margin-left:5px;font-weight:normal;">350.000đ</span>' : formatVND(p.priceMin) + ' <span class="card-price-arrow">→</span> ' + formatVND(p.priceMax);`
);

fs.writeFileSync('index.html', html, 'utf8');
