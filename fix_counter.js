const fs = require('fs');
let appJs = fs.readFileSync('assets/app.js', 'utf8');
appJs = appJs.replace(/duration=650/g, 'duration=200');
fs.writeFileSync('assets/app.js', appJs, 'utf8');
