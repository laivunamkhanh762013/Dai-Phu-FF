const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The bug is `displayMemo` is used inside checkPaymentApi but is not defined.
html = html.replace(/displayMemo \+ '<\/b>\)\.<br>'/g, "window.currentOrderMemo + '</b>).<br>'");

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed reference error');
