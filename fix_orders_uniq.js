const fs = require('fs');
let c = fs.readFileSync('api/orders.js', 'utf8');

const s1 = /const memoCode = 'DP' \+ Math\.floor\(10000 \+ Math\.random\(\) \* 90000\);/;
const r1 = "let memoCode = '';\n          for (let i = 0; i < 50; i++) {\n            memoCode = 'DP' + Math.floor(10000 + Math.random() * 90000);\n            if (!existingOrders.some(o => o.memo === memoCode && o.status === 'pending')) break;\n          }";
c = c.replace(s1, r1);

// Wait, existingOrders is fetched AFTER memoCode is generated!
// Let's check where getGist is called!
