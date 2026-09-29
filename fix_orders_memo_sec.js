const fs = require('fs');
let c = fs.readFileSync('api/orders.js', 'utf8');

// replace: const memoCode = 'NT' + Math.floor(100000 + Math.random() * 900000);
c = c.replace(
    /const memoCode = 'NT' \+ Math\.floor\(100000 \+ Math\.random\(\) \* 900000\);/g,
    "const memoCode = 'NT' + Math.random().toString(36).substring(2, 8).toUpperCase();"
);

fs.writeFileSync('api/orders.js', c, 'utf8');
