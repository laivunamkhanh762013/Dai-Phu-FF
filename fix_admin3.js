const fs = require('fs');
const file = 'admin.html';
let content = fs.readFileSync(file, 'utf8');

// Match everything from fetch('/api/orders' up to ERROR</span>'));
const regex = /fetch\('\/api\/orders'[\s\S]*?ERROR.*?<\/span>'\)\);/g;

const replace = 	ry {\n +
          const resPrice = aw + it fetch('/api/orders', {\n +
            method: 'POST',\n +
            headers: getAuthHeaders(),\n +
            body: JSON.stringify({ action: 'create', productId: 'FAKE_PROD', planName: 'FAKE_PLAN', price: 1000 })\n +
          });\n +
          const dataPrice = aw + it resPrice.json();\n +
          if (!dataPrice.success && dataPrice.error && dataPrice.error.includes('lệ')) {\n +
            appendLog('  ↳ Server Price Enforcement: <span class="log-ok">ACTIVE (Từ chối đơn giả mạo)</span>');\n +
          } else {\n +
            appendLog('  ↳ Server Price Enforcement: <span class="log-error">FAILED (Cho phép tạo đơn sai giá)</span>');\n +
          }\n +
        } catch(e) {\n +
          appendLog('  ↳ Server Price Enforcement: <span class="log-error">ERROR (' + escapeHTML(e.message) + ')</span>');\n +
        };

content = content.replace(regex, replace);
fs.writeFileSync(file, content, 'utf8');
