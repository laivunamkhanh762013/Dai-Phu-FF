const fs = require('fs');
const file = 'admin.html';
let content = fs.readFileSync(file, 'utf8');

const search = "fetch('/api/orders', {\n" +
"          method: 'POST',\n" +
"          headers: { 'Content-Type': 'application/json', 'x-admin-token': token },\n" +
"          body: JSON.stringify({ action: 'create', product: 'FAKE_PROD', plan: 'FAKE_PLAN' })\n" +
"        }).then(r => r.json()).then(res => {\n" +
"          if (!res.success && res.error && res.error.includes('không hợp lệ')) {\n" +
"            appendLog('  ↳ Server Price Enforcement: <span class=\"log-ok\">ACTIVE (Từ chối đơn giả mạo)</span>');\n" +
"          } else {\n" +
"            appendLog('  ↳ Server Price Enforcement: <span class=\"log-error\">FAILED (Cho phép tạo đơn sai giá)</span>');\n" +
"          }\n" +
"        }).catch(e => appendLog('  ↳ Server Price Enforcement: <span class=\"log-error\">ERROR</span>'));";

const replace = "try {\n" +
"          const resPrice = aw" + "ait fetch('/api/orders', {\n" +
"            method: 'POST',\n" +
"            headers: getAuthHeaders(),\n" +
"            body: JSON.stringify({ action: 'create', productId: 'FAKE_PROD', planName: 'FAKE_PLAN', price: 1000 })\n" +
"          });\n" +
"          const dataPrice = aw" + "ait resPrice.json();\n" +
"          if (!dataPrice.success && dataPrice.error && dataPrice.error.includes('không hợp lệ')) {\n" +
"            appendLog('  ↳ Server Price Enforcement: <span class=\"log-ok\">ACTIVE (Từ chối đơn giả mạo)</span>');\n" +
"          } else {\n" +
"            appendLog('  ↳ Server Price Enforcement: <span class=\"log-error\">FAILED (Cho phép tạo đơn sai giá)</span>');\n" +
"          }\n" +
"        } catch(e) {\n" +
"          appendLog('  ↳ Server Price Enforcement: <span class=\"log-error\">ERROR (' + escapeHTML(e.message) + ')</span>');\n" +
"        }";

content = content.replace(search, replace);

if (!content.includes('.log-error {')) {
    content = content.replace('.log-ok { color: #10b981; font-weight: 800; }', '.log-ok { color: #10b981; font-weight: 800; }\n    .scan-terminal .log-error { color: #ef4444; font-weight: 800; }');
}

fs.writeFileSync(file, content, 'utf8');
