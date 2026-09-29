const fs = require('fs');
let c = fs.readFileSync('api/_security.js', 'utf8');

c = c.replace(
    /function generateSecureOrderId\(\) {\s*const num = crypto\.randomInt\(100000, 999999\);\s*return 'DP' \+ num;\s*}/g,
    "function generateSecureOrderId() {\n  const num = require('crypto').randomInt(1000, 9999);\n  return 'DPVN' + num;\n}"
);

fs.writeFileSync('api/_security.js', c, 'utf8');
