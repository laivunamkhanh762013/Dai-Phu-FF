const fs = require('fs');
let c = fs.readFileSync('api/orders.js', 'utf8');
const search = /const memoCode = 'DP' \+ Math\.floor\(10000 \+ Math\.random\(\) \* 90000\);\s*const newOrder = {[\s\S]*?txId: ''\s*};\s*const { orders } = await getGist\(\);\s*const existingOrders = orders \|\| \[\];/;
const replace = "const { orders } = await getGist();\n" +
"          const existingOrders = orders || [];\n" +
"          let memoCode = '';\n" +
"          for (let i = 0; i < 50; i++) {\n" +
"            memoCode = 'DP' + Math.floor(10000 + Math.random() * 90000);\n" +
"            if (!existingOrders.some(o => o.memo === memoCode && o.status === 'pending')) break;\n" +
"          }\n" +
"          const newOrder = {\n" +
"            id: newId,\n" +
"            memo: memoCode,\n" +
"            product: prodKey,\n" +
"            plan: planName,\n" +
"            price: canonicalPrice,\n" +
"            user: username,\n" +
"            phone: phone,\n" +
"            time: new Date().toLocaleString('vi-VN'),\n" +
"            status: 'pending',\n" +
"            txId: ''\n" +
"          };";
c = c.replace(search, replace);
fs.writeFileSync('api/orders.js', c, 'utf8');
