const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/pros": "([^"]+)',/g, "pros: '$1',");
fs.writeFileSync('index.html', html, 'utf8');
