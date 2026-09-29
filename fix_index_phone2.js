const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/var phone = document\.getElementById\('regPhone'\)\.value\.trim\(\);\s*if \(\!u\) return;/m, "var phone = document.getElementById('regPhone').value.trim();\n    if (!u) return;\n    if (phone.replace(/[^0-9+]/g, '').length < 9) {\n      toast('📞', 'Vui lòng nhập đúng SĐT/Zalo (tối thiểu 9 số) để được hỗ trợ!');\n      return;\n    }");
fs.writeFileSync('index.html', html);
