const fs = require('fs');
let c = fs.readFileSync('admin.html', 'utf8');

c = c.replace(
    /const memoToCheck = \(order && order\.user && order\.user !== [^)]+\) \? order\.user : orderId;/,
    "const memoToCheck = (order && order.memo) ? order.memo : (order && order.user && order.user !== 'Khách vãng lai') ? order.user : orderId;"
);

fs.writeFileSync('admin.html', c, 'utf8');
