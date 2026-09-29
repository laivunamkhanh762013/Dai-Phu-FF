const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(
    /function closeBuyModal\(\) \{\n\s*stopPaymentWatcher\(\);\n/g,
    "function closeBuyModal() {\n  stopPaymentWatcher();\n  window.currentOrderId = null;\n  window.currentOrderMemo = '';\n  window.currentPayAmountRaw = 0;\n"
);
fs.writeFileSync('index.html', html);
