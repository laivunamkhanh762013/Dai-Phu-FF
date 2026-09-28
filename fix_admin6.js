const fs = require('fs');
const file = 'admin.html';
let content = fs.readFileSync(file, 'utf8');

const normalizedContent = content.replace(/\r\n/g, '\n');
const targetIdx = normalizedContent.indexOf("appendLog('  ↳ Server Price Enforcement: Đang kiểm tra...');");

if (targetIdx !== -1) {
    const startToReplace = targetIdx + "appendLog('  ↳ Server Price Enforcement: Đang kiểm tra...');".length;
    const endToReplace = normalizedContent.indexOf("appendLog('  ↳ VietQR Reference Lock:", startToReplace);
    
    if (endToReplace !== -1) {
        const replace = "\n    try {\n" +
"      const resPrice = a" + "wait fetch('/api/orders', {\n" +
"        method: 'POST',\n" +
"        headers: getAuthHeaders(),\n" +
"        body: JSON.stringify({ action: 'create', productId: 'FAKE_PROD', planName: 'FAKE_PLAN', price: 1000 })\n" +
"      });\n" +
"      const dataPrice = a" + "wait resPrice.json();\n" +
"      if (!dataPrice.success && dataPrice.error && dataPrice.error.includes('lệ')) {\n" +
"        appendLog('  ↳ Server Price Enforcement: <span class=\"log-ok\">ACTIVE (Từ chối đơn giả mạo)</span>');\n" +
"      } else {\n" +
"        appendLog('  ↳ Server Price Enforcement: <span class=\"log-error\">FAILED (Cho phép tạo đơn sai giá)</span>');\n" +
"      }\n" +
"    } catch(e) {\n" +
"      appendLog('  ↳ Server Price Enforcement: <span class=\"log-error\">ERROR (' + escapeHTML(e.message) + ')</span>');\n" +
"    }\n  ";
        content = normalizedContent.substring(0, startToReplace) + replace + normalizedContent.substring(endToReplace);
    }
}

if (!content.includes('.log-error {')) {
    content = content.replace('.log-ok { color: #10b981; font-weight: 800; }', '.log-ok { color: #10b981; font-weight: 800; }\n    .scan-terminal .log-error { color: #ef4444; font-weight: 800; }');
}

fs.writeFileSync(file, content, 'utf8');
