const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const target = "var phone = document.getElementById('regPhone').value.trim();\n    if (!u) return;\n";
const replace = "var phone = document.getElementById('regPhone').value.trim();\n    if (!u) return;\n    if (phone.replace(/[^0-9+]/g, '').length < 9) {\n      toast('📞', 'Vui lòng nhập đúng SĐT/Zalo (tối thiểu 9 số) để được hỗ trợ!');\n      return;\n    }\n";

html = html.replace(target, replace);
fs.writeFileSync('index.html', html);
