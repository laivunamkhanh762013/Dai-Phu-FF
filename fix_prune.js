const fs = require('fs');

let ordersJs = fs.readFileSync('api/orders.js', 'utf8');

// Add createdAt to newOrder
ordersJs = ordersJs.replace(
  /time: new Date\(\)\.toLocaleString\('vi-VN'\),/g,
  `time: new Date().toLocaleString('vi-VN'),
              createdAt: Date.now(),`
);

fs.writeFileSync('api/orders.js', ordersJs, 'utf8');

let dbJs = fs.readFileSync('api/db.js', 'utf8');

const parseViTimeFn = `
function parseViTime(str) {
  if (!str) return 0;
  const m = str.match(/(\\d{1,2}):(\\d{1,2}):(\\d{1,2})[^\\d]+(\\d{1,2})\\/(\\d{1,2})\\/(\\d{4})/);
  if (m) return new Date(m[6], m[5]-1, m[4], m[1], m[2], m[3]).getTime();
  return 0;
}
`;

const pruneLogic = `
          // AUTO PRUNE PENDING ORDERS OLDER THAN 1 HOUR
          const now = Date.now();
          let isPruned = false;
          orders = orders.filter(o => {
            if (o.status === 'pending') {
              const ts = o.createdAt || parseViTime(o.time);
              if (ts > 0 && now - ts > 3600000) {
                isPruned = true;
                return false;
              }
            }
            return true;
          });
          
          if (isPruned) {
            updateGist({ orders }).catch(err => console.error('Prune error', err));
          }
`;

dbJs = parseViTimeFn + '\n' + dbJs;
dbJs = dbJs.replace(
  /const users = JSON\.parse\(json\.files && json\.files\['users\.json'\] \? json\.files\['users\.json'\]\.content : '\[\]'\);/,
  `const users = JSON.parse(json.files && json.files['users.json'] ? json.files['users.json'].content : '[]');` + '\n' + pruneLogic
);

dbJs = dbJs.replace(
  /let orders = /g,
  `orders = `
);
// wait, orders was declared as `const orders =`
dbJs = dbJs.replace(
  /const orders = JSON\.parse/g,
  `let orders = JSON.parse`
);

fs.writeFileSync('api/db.js', dbJs, 'utf8');
console.log('Done');
