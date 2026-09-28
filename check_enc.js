const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');
console.log(c.substring(0, 500));
