const fs = require('fs');
let c = fs.readFileSync('api/orders.js', 'utf8');

c = c.replace(
    /id: newId,(\s*)product: prodKey,/g,
    "id: newId,$1memo: memoCode,$1product: prodKey,"
);

fs.writeFileSync('api/orders.js', c, 'utf8');
