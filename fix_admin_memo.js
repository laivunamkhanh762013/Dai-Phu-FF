const fs = require('fs');
let c = fs.readFileSync('admin.html', 'utf8');

c = c.replace(
    /const cleanId = escapeHTML\(o\.id\);/,
    "const cleanId = escapeHTML(o.id);\n      const cleanMemo = escapeHTML(o.memo || o.id);"
);

c = c.replace(
    /<td><div style="font-family:monospace;font-weight:800;color:#00f0ff;background:rgba\(0,240,255,0\.1\);display:inline-block;padding:2px 8px;border-radius:4px;border:1px solid rgba\(0,240,255,0\.2\);">'\s*\+\s*cleanId\s*\+\s*'<\/div><\/td>/,
    "<td><div style=\"font-family:monospace;font-weight:800;color:#00f0ff;background:rgba(0,240,255,0.1);display:inline-block;padding:2px 8px;border-radius:4px;border:1px solid rgba(0,240,255,0.2);\">' + cleanId + '</div><div style=\"font-size:10px;color:#94a3b8;margin-top:2px;\">Mã Code: ' + cleanMemo + '</div></td>"
);

fs.writeFileSync('admin.html', c, 'utf8');
