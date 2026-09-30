const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Replace the m-qr-box HTML
html = html.replace(/<div class="m-qr-box">[\s\S]*?<\/div>\s*<\/div>/,
`<div class="m-qr-box" style="position: relative; min-height: 220px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
              <div id="mQrLoader" style="display: none; flex-direction: column; align-items: center; justify-content: center; position: absolute; inset: 0; background: #ffffff; z-index: 5; border-radius: 14px;">
                <i class="fa-solid fa-circle-notch fa-spin" style="font-size: 34px; color: #3b82f6; margin-bottom: 12px;"></i>
                <span style="color: #1e293b; font-size: 14px; font-weight: 700;">Đang tải mã QR...</span>
                <span style="color: #64748b; font-size: 11px; margin-top: 4px;">Vui lòng đợi trong giây lát</span>
              </div>
              <img id="mQrCode" src="" alt="VietQR MBBank" style="position: relative; z-index: 2; transition: opacity 0.3s ease;">
              <div class="m-qr-hint" style="position: relative; z-index: 2; margin-top: 6px;">Mở App ngân hàng bất kỳ (MBBank, Vietcombank, Momo...) quét để thanh toán tự động</div>
            </div>`);

// 2. Update the JS logic where we previously changed qrHint and qrEl.style.opacity
// The previous logic was:
// var qrHint = document.querySelector('.m-qr-hint');
// var qrEl = document.getElementById('mQrCode');
// if (qrHint) qrHint.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang tải mã QR...';
// if (qrEl) qrEl.style.opacity = '0.1';

// We replace that block:
html = html.replace(/var qrHint = document\.querySelector\('\.m-qr-hint'\);\s*var qrEl = document\.getElementById\('mQrCode'\);\s*if \(qrHint\) qrHint\.innerHTML = .*?;\s*if \(qrEl\) qrEl\.style\.opacity = '0\.1';/,
`var loader = document.getElementById('mQrLoader');
    var qrEl = document.getElementById('mQrCode');
    if (loader) loader.style.display = 'flex';
    if (qrEl) qrEl.style.opacity = '0';`);

// 3. Update the onload logic
// The previous logic was:
// qrEl.onload = function() {
//     qrEl.style.opacity = '1';
//     var qrHint = document.querySelector('.m-qr-hint');
//     if (qrHint) qrHint.innerHTML = 'Mở App ngân hàng bất kỳ (MBBank, Vietcombank, Momo...) quét để thanh toán tự động';
// };

html = html.replace(/qrEl\.onload = function\(\) \{\s*qrEl\.style\.opacity = '1';\s*var qrHint = document\.querySelector\('\.m-qr-hint'\);\s*if \(qrHint\) qrHint\.innerHTML = .*?;\s*\};/,
`qrEl.onload = function() {
            var loader = document.getElementById('mQrLoader');
            if (loader) loader.style.display = 'none';
            qrEl.style.opacity = '1';
        };`);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Done');
