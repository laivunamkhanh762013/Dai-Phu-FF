const fs = require('fs');
let c = fs.readFileSync('api/check-payment.js', 'utf8');

// Fix the database matching logic
c = c.replace(
    /\(cleanMemo && \(cleanToken\(o\.id\) === cleanMemo \|\| cleanToken\(o\.user\) === cleanMemo\)\)/,
    "(cleanMemo && (cleanToken(o.id) === cleanMemo || cleanToken(o.memo) === cleanMemo || cleanToken(o.user) === cleanMemo))"
);

// Fix the encoding issues in the error messages
c = c.replace(/MA. ..i soA.t khA'ng h.p l.. Vui lA.ng s.- d.ng mA. ..n hA.ng ho.c tA.n tA.i kho.n \(t..i thi.u 3 kA. t.\)\./g, "Mã đối soát không hợp lệ. Vui lòng sử dụng mã đơn hàng hoặc tên tài khoản (tối thiểu 3 ký tự).");
c = c.replace(/..A. xA.c nh.-n nh.-n ..  ti..n t. MBBank!/g, "Đã xác nhận nhận đủ tiền từ MBBank!");
c = c.replace(/Ch.a th.y giao d.<ch ti..n vA.o kh.>p mA. /g, "Chưa thấy giao dịch tiền vào khớp mã ");
c = c.replace(/ trA.n MBBank\./g, " trên MBBank.");

fs.writeFileSync('api/check-payment.js', c, 'utf8');
