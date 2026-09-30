const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/pros": "Gói trọn đời kinh tế nhất, dùng thoải mái không giới hạn thời gian.',/g, "pros: 'Gói trọn đời kinh tế nhất, dùng thoải mái không giới hạn thời gian.',");
fs.writeFileSync('index.html', html, 'utf8');
