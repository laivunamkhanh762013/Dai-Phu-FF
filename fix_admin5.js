const fs = require('fs');
const file = 'admin.html';
let content = fs.readFileSync(file, 'utf8');

const search =       fetch('/api/orders', {
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

const replace =     try {
      const resPrice = a + wait fetch('/api/orders', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ action: 'create', productId: 'FAKE_PROD', planName: 'FAKE_PLAN', price: 1000 })
      });
      const dataPrice = a + wait resPrice.json();
      if (!dataPrice.success && dataPrice.error && dataPrice.error.includes('lệ')) {
        appendLog('  ↳ Server Price Enforcement: <span class="log-ok">ACTIVE (Từ chối đơn giả mạo)</span>');
      } else {
        appendLog('  ↳ Server Price Enforcement: <span class="log-error">FAILED (Cho phép tạo đơn sai giá)</span>');
      }
    } catch(e) {
      appendLog('  ↳ Server Price Enforcement: <span class="log-error">ERROR (' + escapeHTML(e.message) + ')</span>');
    };

// Since string matching might fail due to carriage returns, let's normalize everything
const normalizedContent = content.replace(/\r\n/g, '\n');
const normalizedSearch = search.replace(/\r\n/g, '\n');

if (normalizedContent.includes(normalizedSearch)) {
    content = normalizedContent.replace(normalizedSearch, replace);
} else {
    console.log("Could not find string exact match. Trying to construct an exact regex...");
    
    // Instead of a giant regex, let's just find the index of "Server Price Enforcement: Đang kiểm tra..."
    const targetIdx = normalizedContent.indexOf("appendLog('  ↳ Server Price Enforcement: Đang kiểm tra...');");
    if (targetIdx !== -1) {
        const startToReplace = targetIdx + "appendLog('  ↳ Server Price Enforcement: Đang kiểm tra...');".length;
        const endToReplace = normalizedContent.indexOf("appendLog('  ↳ VietQR Reference Lock:", startToReplace);
        
        if (endToReplace !== -1) {
            content = normalizedContent.substring(0, startToReplace) + "\n" + replace + "\n  " + normalizedContent.substring(endToReplace);
            console.log("Replaced using index bounds!");
        }
    }
}

if (!content.includes('.log-error {')) {
    content = content.replace('.log-ok { color: #10b981; font-weight: 800; }', '.log-ok { color: #10b981; font-weight: 800; }\n    .scan-terminal .log-error { color: #ef4444; font-weight: 800; }');
}

fs.writeFileSync(file, content, 'utf8');
