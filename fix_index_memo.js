const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

// 1. In fetch('/api/orders').then(...), use order.memo and don't show order.id
c = c.replace(
    /window\.currentOrderId = order\.id;\n\s*window\.currentOrderMemo = order\.id;\n\n\s*if \(memoEl\) memoEl\.textContent = order\.id;\n\s*if \(adminCodeEl\) adminCodeEl\.textContent = order\.id;\n\n\s*var cardMemoEl = document\.getElementById\('mCardOrderMemo'\);\n\s*if \(cardMemoEl\) cardMemoEl\.textContent = order\.id;/g,
    window.currentOrderId = order.id;
      window.currentOrderMemo = order.memo || order.id;
      
      if (memoEl) memoEl.textContent = window.currentOrderMemo;
      if (adminCodeEl) adminCodeEl.textContent = window.currentOrderMemo;
      
      var cardMemoEl = document.getElementById('mCardOrderMemo');
      if (cardMemoEl) cardMemoEl.textContent = window.currentOrderMemo;
);

// Fix the startPaymentWatcher invocation in fetch() to pass memo
c = c.replace(
    /startPaymentWatcher\(order\.id, order\.price\);/g,
    startPaymentWatcher(window.currentOrderMemo, order.price);
);

// Fix toast message in fetch() to not show order ID
c = c.replace(
    /toast\('.{1,3}', 'Da kh.i t.o don h.ng: ' \+ order\.id \+ '\. Vui l.ng chuy.n kho.n d.ng n.i dung\.'\);/g,
    	oast('💳', 'Đã khởi tạo đơn hàng thành công! Vui lòng chuyển khoản đúng nội dung.');
);

// 2. Remove startPaymentWatcher from goToStep(2)
c = c.replace(
    /s1\.style\.display = 'none';\n\s*s2\.style\.display = 'block';\n\s*startPaymentWatcher\(window\.currentOrderMemo, window\.currentPayAmountRaw\);/g,
    s1.style.display = 'none';
      s2.style.display = 'block';
);

// Also we should ensure that the initial updateLiveStatus before fetch finishes shows something generic, not null.
// It is handled by the static HTML which says "..." and we don't call startPaymentWatcher with null anymore.
// But we should explicitly update it in openBuyModal to say "Đang khởi tạo mã đơn..."
c = c.replace(
    /if \(adminCodeEl\) adminCodeEl\.textContent = 'Dang kh.i t.o\.\.\.';/g,
    if (adminCodeEl) adminCodeEl.textContent = 'Đang khởi tạo...';
    updateLiveStatus('waiting', 'ĐANG KHỞI TẠO ĐƠN HÀNG...', 'Vui lòng chờ trong giây lát để hệ thống sinh mã chuyển khoản an toàn cho bạn...');
);

fs.writeFileSync('index.html', c, 'utf8');
