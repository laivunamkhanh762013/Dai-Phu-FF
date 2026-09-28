const fs = require('fs');
let c = fs.readFileSync('api/orders.js', 'utf8');

c = c.replace(
    /if \(userParam \|\| \(queryId && !queryId\.startsWith\('DP'\)\)\) {/,
    "if (userParam || (queryId && !queryId.startsWith('DP') && !queryId.startsWith('NT'))) {"
);

c = c.replace(
    /const found = all\.find\(o => o\.id && o\.id\.toUpperCase\(\) === queryId\);/,
    "const found = all.find(o => (o.id && o.id.toUpperCase() === queryId) || (o.memo && o.memo.toUpperCase() === queryId));"
);

fs.writeFileSync('api/orders.js', c, 'utf8');
