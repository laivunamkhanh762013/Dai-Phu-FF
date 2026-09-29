const fs = require('fs');
let checkPayment = fs.readFileSync('api/check-payment.js', 'utf8');

checkPayment = checkPayment.replace(
    /\[cleanMemo, cleanOrderId, cleanUser\]\.forEach\(k =>/g,
    "[cleanMemo, cleanOrderId].forEach(k =>"
);

fs.writeFileSync('api/check-payment.js', checkPayment);
