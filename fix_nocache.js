const fs = require('fs');

// 1. In api/orders.js, add strict no-cache headers
let apiOrders = fs.readFileSync('api/orders.js', 'utf8');

const targetHeader = "res.setHeader('Access-Control-Allow-Origin', '*');";
const replacementHeader = `res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');`;

apiOrders = apiOrders.replace(targetHeader, replacementHeader);
fs.writeFileSync('api/orders.js', apiOrders, 'utf8');

// 2. In index.html, update fetch in checkPaymentApi to add cache buster and cache: 'no-store'
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(
  /fetch\('\/api\/orders\?id=' \+ encodeURIComponent\(orderId\), \{\s*headers: _hd\s*\}\)/g,
  `fetch('/api/orders?id=' + encodeURIComponent(orderId) + '&_t=' + Date.now(), {
      headers: _hd,
      cache: 'no-store'
    })`
);

fs.writeFileSync('index.html', html, 'utf8');
console.log('No-cache headers and cache buster applied successfully!');
