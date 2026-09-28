const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

const s1 = /window\.currentOrderId = order\.id;[\s\S]*?if \(cardMemoEl\) cardMemoEl\.textContent = order\.id;/;
const r1 = "window.currentOrderId = order.id;\n" +
"      window.currentOrderMemo = order.memo || order.id;\n" +
"      \n" +
"      if (memoEl) memoEl.textContent = window.currentOrderMemo;\n" +
"      if (adminCodeEl) adminCodeEl.textContent = window.currentOrderMemo;\n" +
"      \n" +
"      var cardMemoEl = document.getElementById('mCardOrderMemo');\n" +
"      if (cardMemoEl) cardMemoEl.textContent = window.currentOrderMemo;";
c = c.replace(s1, r1);

const s2 = "startPaymentWatcher(order.id, order.price);";
const r2 = "startPaymentWatcher(window.currentOrderMemo, order.price);";
c = c.replace(s2, r2);

const s3 = /toast\('([^']+)', 'Da kh.i t.o don h.ng: ' \+ order\.id \+ '\. Vui l.ng chuy.n kho.n d.ng n.i dung\.'\);/;
const r3 = "toast('✅', 'Đã khởi tạo đơn hàng thành công! Vui lòng chuyển khoản đúng nội dung.');";
c = c.replace(s3, r3);

const s4 = /s1\.style\.display = 'none';\s*s2\.style\.display = 'block';\s*startPaymentWatcher\(window\.currentOrderMemo, window\.currentPayAmountRaw\);/;
const r4 = "s1.style.display = 'none';\n      s2.style.display = 'block';";
c = c.replace(s4, r4);

const s5 = /if \(adminCodeEl\) adminCodeEl\.textContent = 'Dang kh.i t.o\.\.\.';/;
const r5 = "if (adminCodeEl) adminCodeEl.textContent = 'Đang khởi tạo...';\n    updateLiveStatus('waiting', 'ĐANG KHỞI TẠO ĐƠN HÀNG...', 'Vui lòng chờ trong giây lát để hệ thống sinh mã chuyển khoản an toàn cho bạn...');";
c = c.replace(s5, r5);

fs.writeFileSync('index.html', c, 'utf8');
