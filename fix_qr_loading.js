const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Change "500+ Người mua" to "50+ Người mua"
html = html.replace(/500\+ Người mua/, '50+ Người mua');

// 2. Add QR loading text logic
// In startPaymentForPlan(p, plan):
// find `if (memoEl) memoEl.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang khởi tạo mã đơn...';`
const startPaymentSearch = `if (memoEl) memoEl.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> ?ang khYi to mA \`n...';`;
// Let's use regex to find this safely considering encoding issues, or just use English/Unicode ranges.
html = html.replace(/if \(memoEl\) memoEl\.innerHTML = '.*?Đang khởi tạo mã đơn.*?';/g,
    `if (memoEl) memoEl.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang khởi tạo mã đơn...';
    var qrHint = document.querySelector('.m-qr-hint');
    var qrEl = document.getElementById('mQrCode');
    if (qrHint) qrHint.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang tải mã QR...';
    if (qrEl) qrEl.style.opacity = '0.1';`
);

// If the regex failed due to encoding in my script search above, let's do a fallback:
if (!html.includes('Đang tải mã QR...')) {
    // try matching just 'fa-spin' in that area
    html = html.replace(/if \(memoEl\) memoEl\.innerHTML = '<i class="fa-solid fa-spinner fa-spin"><\/i> [^']+';/g,
        `if (memoEl) memoEl.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang khởi tạo mã đơn...';
    var qrHint = document.querySelector('.m-qr-hint');
    var qrEl = document.getElementById('mQrCode');
    if (qrHint) qrHint.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang tải mã QR...';
    if (qrEl) qrEl.style.opacity = '0.1';`
    );
}

// Now find where it succeeds: `if (qrEl) qrEl.src = res.qrUrl;`
html = html.replace(/if \(qrEl\) qrEl\.src = res\.qrUrl;/g,
    `if (qrEl) {
        qrEl.src = res.qrUrl;
        qrEl.onload = function() {
            qrEl.style.opacity = '1';
            var qrHint = document.querySelector('.m-qr-hint');
            if (qrHint) qrHint.innerHTML = 'Mở App ngân hàng bất kỳ (MBBank, Vietcombank, Momo...) quét để thanh toán tự động';
        };
    }`
);

fs.writeFileSync('index.html', html, 'utf8');
