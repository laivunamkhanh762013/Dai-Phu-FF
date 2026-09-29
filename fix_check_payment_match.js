const fs = require('fs');
let checkPayment = fs.readFileSync('api/check-payment.js', 'utf8');

checkPayment = checkPayment.replace(
    /const hasMatch = \(cleanMemo && content\.includes\(cleanMemo\)\) \|\| \(cleanOrderId && content\.includes\(cleanOrderId\)\) \|\| \(cleanUser && cleanUser !== 'KHACHVANGLAI' && content\.includes\(cleanUser\)\);/g,
    "const hasMatch = (cleanMemo && content.includes(cleanMemo)) || (cleanOrderId && content.includes(cleanOrderId));"
);

fs.writeFileSync('api/check-payment.js', checkPayment);
