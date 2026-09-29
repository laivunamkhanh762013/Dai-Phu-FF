const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(
    /function closeBuyModal\(\) \{[\s\S]*?stopPaymentWatcher\(\);/,
    "function closeBuyModal() {\n  stopPaymentWatcher();\n  window.currentOrderId = null;\n  window.currentOrderMemo = '';\n  window.currentPayAmountRaw = 0;"
);

// Fix 2: Rename paidGeneratedKey to paidOrderCode
html = html.replace(/id="paidGeneratedKey"/g, 'id="paidOrderCode"');
html = html.replace(/document\.getElementById\('paidGeneratedKey'\)/g, "document.getElementById('paidOrderCode')");
html = html.replace(/Mã Key/g, "Mã Đơn");
html = html.replace(/Mã key/g, "Mã đơn");

// Fix 3: Save phone to localStorage in login/register
html = html.replace(
    /localStorage\.setItem\('daiphu_user', JSON\.stringify\(\{ username: userObj\.username \}\)\);/g,
    "localStorage.setItem('daiphu_user', JSON.stringify({ username: userObj.username, phone: userObj.phone || phone || '' }));"
);

// Fix 5: lookupOrderCode only matches ID
html = html.replace(
    /return \(o\.id && o\.id\.toUpperCase\(\) === code\) \|\| \(o\.user && o\.user\.toUpperCase\(\) === code\);/g,
    "return o.id && o.id.toUpperCase() === code;"
);

// Fix 7: Monkey patch renderProducts
html = html.replace(/const _origRenderProducts = renderProducts;\n\s*renderProducts = function\(\) \{\n\s*_origRenderProducts\(\);\n\s*setTimeout\(initScrollReveal, 30\);\n\s*\};\n/g, "");
// Add initScrollReveal inside renderProducts
html = html.replace(/grid\.innerHTML = html;\n\s*\}/g, "grid.innerHTML = html;\n  setTimeout(initScrollReveal, 30);\n}");

// Fix 9: HTML Structure
if (!html.includes('<!DOCTYPE html>')) {
    let top = '<!DOCTYPE html>\\n<html lang="vi">\\n<head>\\n  <meta charset="UTF-8">\\n  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">\\n  <title>SHOP ĐẠI PHÚ FF - Gaming Store</title>\\n';
    html = top + html;
}
if (!html.includes('</body>')) {
    html = html + '\\n</body>\\n</html>';
}

fs.writeFileSync('index.html', html);
