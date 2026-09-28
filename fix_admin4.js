const fs = require('fs');
const file = 'admin.html';
let content = fs.readFileSync(file, 'utf8');

const regex = /fetch\('\/api\/orders'[\s\S]*?ERROR.*?<\/span>'\)\);/g;
const replace = `try {
          const resPrice = await fetch('/api/orders', {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ action: 'create', productId: 'FAKE_PROD', planName: 'FAKE_PLAN', price: 1000 })
          });
          const dataPrice = await resPrice.json();
          if (!dataPrice.success && dataPrice.error && dataPrice.error.includes('lệ')) {
            appendLog('  ↳ Server Price Enforcement: <span class="log-ok">ACTIVE (Từ chối đơn giả mạo)</span>');
          } else {
            appendLog('  ↳ Server Price Enforcement: <span class="log-error">FAILED (Cho phép tạo đơn sai giá)</span>');
          }
        } catch(e) {
          appendLog('  ↳ Server Price Enforcement: <span class="log-error">ERROR (' + escapeHTML(e.message) + ')</span>');
        }`.replace(/await/g, 'a' + 'wait');

content = content.replace(regex, replace);
fs.writeFileSync(file, content, 'utf8');
