const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');
c = c.replace(
    /if \(memoEl\) memoEl\.textContent = orderId;\s*updateLiveStatus\('waiting', 'H\? TH\?NG DANG T\? D\?NG CH\? TI\?N VAO MBBANK\.\.\.', 'Sau khi chuy\?n kho\?n v\?i n\?i dung \\r?\\n<b>' \+ orderId \+ '<\/b>, h\? th\?ng SePay s\? t\? d\?ng nh\?n di\?n v hon t\?t mua hng trong 3 giy!'\);/m,
    "if (memoEl) memoEl.textContent = displayMemo;\n    updateLiveStatus('waiting', 'HỆ THỐNG ĐANG TỰ ĐỘNG CHỜ TIỀN VÀO MBBANK...', 'Sau khi chuyển khoản với nội dung <b>' + displayMemo + '</b>, hệ thống SePay sẽ tự động nhận diện và hoàn tất mua hàng trong 3 giây!');"
);
fs.writeFileSync('index.html', c, 'utf8');
