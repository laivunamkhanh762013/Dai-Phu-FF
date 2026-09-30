const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace("priceMax: 150000,      oldPrice: 350000,      image:", "priceMax: 150000,\n      oldPrice: 350000,\n      image:");
fs.writeFileSync('index.html', html, 'utf8');
console.log('Formatted forget-lix lines nicely');
