const fs = require('fs');
let c = fs.readFileSync('api/orders.js', 'utf8');

c = c.replace(
    /const newOrder = {/,
    "const memoCode = 'NT' + Math.floor(100000 + Math.random() * 900000);\n          const newOrder = {"
);

c = c.replace(
    /id: newId,\n\s*product: prodKey,/,
    "id: newId,\n            memo: memoCode,\n            product: prodKey,"
);

// Update qrUrl generation to use memoCode instead of newId
c = c.replace(
    /const qrUrl = 'https:\/\/img\.vietqr\.io\/image\/MB-0941414448-compact2\.png\?amount=' \+ canonicalPrice \+ '&addInfo=' \+ encodeURIComponent\(newId\) \+ '&accountName=BUI%20VAN%20CAO';/,
    "const qrUrl = 'https://img.vietqr.io/image/MB-0941414448-compact2.png?amount=' + canonicalPrice + '&addInfo=' + encodeURIComponent(memoCode) + '&accountName=BUI%20VAN%20CAO';"
);

fs.writeFileSync('api/orders.js', c, 'utf8');
