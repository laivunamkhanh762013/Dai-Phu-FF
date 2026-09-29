const fs = require('fs');
let c = fs.readFileSync('api/orders.js', 'utf8');

c = c.replace(/const memoCode = 'NT' \+ Math\.random\(\)\.toString\(36\)\.substring\(2, 8\)\.toUpperCase\(\);/g, "const memoCode = 'CK' + Math.random().toString(36).substring(2, 8).toUpperCase();");

c = c.replace(/!queryId\.startsWith\('NT'\)/g, "!queryId.startsWith('CK')");

fs.writeFileSync('api/orders.js', c, 'utf8');
