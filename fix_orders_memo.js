const fs = require('fs');
let c = fs.readFileSync('api/orders.js', 'utf8');

c = c.replace(
    /const memoCode = 'CK' \+ Math\.random\(\)\.toString\(36\)\.substring\(2, 8\)\.toUpperCase\(\);/,
    "const memoCode = 'DP' + Math.floor(10000 + Math.random() * 90000);"
);

c = c.replace(
    /!queryId\.startsWith\('DP'\) && !queryId\.startsWith\('CK'\)/,
    "!queryId.startsWith('DP')"
);

fs.writeFileSync('api/orders.js', c, 'utf8');
