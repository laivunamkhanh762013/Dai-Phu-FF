const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');
const search = /<a href="https:\/\/zalo\.me\/0588500524" target="_blank" rel="noopener" class="btn btn-ghost" style="flex:1;font-size:12\.5px;padding:10px;text-decoration:none;display:flex;align-items:center;justify-content:center;gap:6px;">[\s\S]*?<i class="fa-solid fa-download"><\/i> T.i File &amp; HD[\s\S]*?<\/a>/;
const replace = 
          <a href="https://zalo.me/0588500524" target="_blank" rel="noopener" class="btn btn-ghost" style="flex:1;font-size:12.5px;padding:10px;text-decoration:none;display:flex;align-items:center;justify-content:center;gap:6px;">
            <i class="fa-solid fa-paper-plane"></i> Nhắn Tin Admin
          </a>
;
// Wait, the user specifically said "xóa nút này đi" (Delete this button). So I should just remove it.
// I'll replace the whole button block.
const searchBlock = /<div style="display:flex;gap:8px;">\s*<button type="button" class="btn btn-primary" onclick="copyGeneratedKey\(this\)" style="flex:1;font-size:12\.5px;padding:10px;">\s*<i class="fa-solid fa-copy"><\/i> Sao ch.p Ma Don\s*<\/button>\s*<a href="https:\/\/zalo\.me\/0588500524" target="_blank" rel="noopener" class="btn btn-ghost" style="flex:1;font-size:12\.5px;padding:10px;text-decoration:none;display:flex;align-items:center;justify-content:center;gap:6px;">\s*<i class="fa-solid fa-download"><\/i> T.i File &amp; HD\s*<\/a>\s*<\/div>/;

const replaceBlock = <button type="button" class="btn btn-primary" onclick="copyGeneratedKey(this)" style="width:100%;font-size:12.5px;padding:10px;">
            <i class="fa-solid fa-copy"></i> Sao chép Mã Đơn để gửi Admin
          </button>;

c = c.replace(searchBlock, replaceBlock);
fs.writeFileSync('index.html', c, 'utf8');
