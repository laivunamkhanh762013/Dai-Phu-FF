const fs = require('fs');
let html = fs.readFileSync('admin.html', 'utf8');

// 1. Auto-match SePay -> Exact amount + Exact order ID
html = html.replace(
    /if \(amountIn >= o\.price && \(\s*content\.includes\(cleanMemo\)\s*\|\|\s*content\.includes\(cleanOId\)\s*\|\|\s*content\.includes\(cleanUName\)\s*\)\) \{/g,
    "if (amountIn === o.price && (content.includes(cleanMemo) || content.includes(cleanOId))) {"
);
html = html.replace(
    /if \(amountIn >= price && \(\s*content\.includes\(memo\)\s*\|\|\s*content\.includes\(code\)\s*\)\) \{/g,
    "if (amountIn === price && (content.includes(memo) || content.includes(code))) {"
);

// 2. STRIX Scanner claims
html = html.replace(/HỆ THỐNG ĐÃ ĐƯỢC BẢO VỆ TOÀN DIỆN 100%/g, "AUDIT HOÀN TẤT. Một số kiểm tra bảo mật phía client/server đã PASS.");
html = html.replace(/\[STRIX\] CHECK HOÀN TẤT/g, "[STRIX] AUDIT HOÀN TẤT");

fs.writeFileSync('admin.html', html);
