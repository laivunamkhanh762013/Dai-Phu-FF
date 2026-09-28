const fs = require('fs');
const file = 'admin.html';
let content = fs.readFileSync(file, 'utf8');

// Fix Strix Test 5
const search =     appendLog('  ↳ Server Price Enforcement: Đang kiểm tra...');
      fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
        body: JSON.stringify({ action: 'create', product: 'FAKE_PROD', plan: 'FAKE_PLAN' })
      }).then(r => r.json()).then(res => {
        if (!res.success && res.error && res.error.includes('không hợp lệ')) {
          appendLog('  ↳ Server Price Enforcement: <span class="log-ok">ACTIVE (Từ chối đơn giả mạo)</span>');
        } else {
          appendLog('  ↳ Server Price Enforcement: <span class="log-error">FAILED (Cho phép tạo đơn sai giá)</span>');
        }
      }).catch(e => appendLog('  ↳ Server Price Enforcement: <span class="log-error">ERROR</span>'));;

const replace =     appendLog('  ↳ Server Price Enforcement: Đang kiểm tra...');
    try {
      const resPrice = await fetch('/api/orders', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ action: 'create', productId: 'FAKE_PROD', planName: 'FAKE_PLAN', price: 1000 })
      });
      const dataPrice = await resPrice.json();
      if (!dataPrice.success && dataPrice.error && dataPrice.error.includes('không hợp lệ')) {
        appendLog('  ↳ Server Price Enforcement: <span class="log-ok">ACTIVE (Từ chối đơn giả mạo)</span>');
      } else {
        appendLog('  ↳ Server Price Enforcement: <span class="log-error">FAILED (Cho phép tạo đơn sai giá)</span>');
      }
    } catch(e) {
      appendLog('  ↳ Server Price Enforcement: <span class="log-error">ERROR (' + escapeHTML(e.message) + ')</span>');
    };

// Check if search exists
if (content.includes(search)) {
    content = content.replace(search, replace);
} else {
    // try removing spaces
    const search2 = "Server Price Enforcement";
    const startIndex = content.indexOf(search2);
    if (startIndex > -1) {
        // Just a fallback...
    }
}

// Add CSS for .log-error if not exists
if (!content.includes('.log-error {')) {
    content = content.replace('.log-ok { color: #10b981; font-weight: 800; }', '.log-ok { color: #10b981; font-weight: 800; }\n    .scan-terminal .log-error { color: #ef4444; font-weight: 800; }');
}

fs.writeFileSync(file, content, 'utf8');
console.log("Done");
