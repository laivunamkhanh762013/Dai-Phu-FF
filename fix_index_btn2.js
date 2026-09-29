const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

const s1 = /<div style="display:flex;gap:8px;">[\s\S]*?<button type="button" class="btn btn-primary" onclick="copyGeneratedKey\(this\)"[\s\S]*?<\/a>\s*<\/div>/;
const r1 = '<button type="button" class="btn btn-primary" onclick="copyGeneratedKey(this)" style="width:100%;font-size:12.5px;padding:10px;display:flex;align-items:center;justify-content:center;gap:8px;">\n          <i class="fa-solid fa-copy"></i> Sao chép Mã Đơn\n        </button>';

c = c.replace(s1, r1);
fs.writeFileSync('index.html', c, 'utf8');
