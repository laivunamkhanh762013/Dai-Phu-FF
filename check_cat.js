const fs = require('fs');
let c = fs.readFileSync('api/_catalog.js', 'utf8');
const match = c.match(/Key 1 Gi.*\(Test\)/);
if (match) console.log("Found:", match[0]);
else console.log("Not found.");
