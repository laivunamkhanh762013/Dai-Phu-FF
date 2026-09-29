const fs = require('fs');

function fixFile(path) {
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(
    /new Date\(\)\.toLocaleString\('vi-VN'\)/g,
    "new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })"
  );
  fs.writeFileSync(path, content, 'utf8');
}

fixFile('api/orders.js');
fixFile('api/auth.js');
console.log('Fixed timezones');
