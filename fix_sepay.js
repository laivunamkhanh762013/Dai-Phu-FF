const fs = require('fs');

// 1. Fix admin.html autoScanPendingOrders
let admin = fs.readFileSync('admin.html', 'utf8');
admin = admin.replace(/if \(price > 0 && amountIn < price\) return false;/g, "if (price > 0 && amountIn !== price) return false;");

// 2. Fix api/check-payment.js
let checkPayment = fs.readFileSync('api/check-payment.js', 'utf8');
checkPayment = checkPayment.replace(/const hasValidAmount = \(minAmount > 0\) \? \(amountIn >= minAmount\) : \(amountIn >= 10000\);/g, "const hasValidAmount = (minAmount > 0) ? (amountIn === minAmount) : (amountIn >= 10000);");

fs.writeFileSync('admin.html', admin);
fs.writeFileSync('api/check-payment.js', checkPayment);
