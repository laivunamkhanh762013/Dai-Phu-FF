const fs = require('fs');
const lines = fs.readFileSync('index.html', 'utf8').split('\n');

lines[3740] = '      var priceDisplay = (p.priceMin === p.priceMax) ? (formatVND(p.priceMin) + oldPriceHtml) : (formatVND(p.priceMin) + \' <span class="card-price-arrow">→</span> \' + formatVND(p.priceMax));';

lines[3862] = '    if (rangePriceEl) rangePriceEl.innerHTML = (p.priceMin === p.priceMax) ? (formatVND(p.priceMin) + modalOldPriceHtml) : (formatVND(p.priceMin) + \' → \' + formatVND(p.priceMax));';

fs.writeFileSync('index.html', lines.join('\n'), 'utf8');
console.log('Fixed lines 3741 and 3863 successfully!');
