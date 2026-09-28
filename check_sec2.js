const fs = require('fs');
let c = fs.readFileSync('api/_security.js', 'utf8');
const match = c.match(/function parseBody[\s\S]{0,500}/);
if (match) console.log(match[0]);
