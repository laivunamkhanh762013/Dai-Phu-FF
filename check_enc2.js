const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');
const match = c.match(/Ch.n s.n ph.m ph. h.p v.i nhu c.u c.a b.n/);
if (match) console.log("Found:", match[0]);
else console.log("Not found.");
