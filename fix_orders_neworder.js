const fs = require('fs');
let c = fs.readFileSync('api/orders.js', 'utf8');

const search = /const memoCode = 'DP' \+ Math\.floor\(10000 \+ Math\.random\(\) \* 90000\);\s*const newOrder = {\s*id: newId,\s*memo: memoCode,\s*product: prodKey,\s*plan: planName,\s*price: canonicalPrice,\s*user: username,\s*phone: phone,\s*time: new Date\(\)\.toLocaleString\('vi-VN'\),\s*status: 'pending',\s*txId: ''\s*};\s*const { orders } = await getGist\(\);\s*const existingOrders = orders \|\| \[\];/;

const replace = const { orders } = await getGist();
          const existingOrders = orders || [];
          let memoCode = '';
          for (let i = 0; i < 50; i++) {
            memoCode = 'DP' + Math.floor(10000 + Math.random() * 90000);
            if (!existingOrders.some(o => o.memo === memoCode && o.status === 'pending')) break;
          }

          const newOrder = {
            id: newId,
            memo: memoCode,
            product: prodKey,
            plan: planName,
            price: canonicalPrice,
            user: username,
            phone: phone,
            time: new Date().toLocaleString('vi-VN'),
            status: 'pending',
            txId: ''
          };;

c = c.replace(search, replace);
fs.writeFileSync('api/orders.js', c, 'utf8');
