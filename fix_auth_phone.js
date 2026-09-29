const fs = require('fs');
let auth = fs.readFileSync('api/auth.js', 'utf8');
auth = auth.replace(
    /if \(action === 'register'\) {\s*if \(existing\) {/g,
    "if (action === 'register') {\n          if (!phone || phone.replace(/[^0-9+]/g, '').length < 9) {\n            return res.status(400).json({ success: false, error: 'Bắt buộc nhập đúng Số điện thoại/Zalo để nhận hỗ trợ (tối thiểu 9 số)!' });\n          }\n          if (existing) {"
);
fs.writeFileSync('api/auth.js', auth);
