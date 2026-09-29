const fs = require('fs');
let c = fs.readFileSync('admin.html', 'utf8');

c = c.replace(
    /const cleanOId = cleanToken\(o\.id \|\| ''\);\s*const cleanUName = cleanToken\(o\.user \|\| ''\);/g,
    "const cleanOId = cleanToken(o.id || '');\n          const cleanMemo = cleanToken(o.memo || '');\n          const cleanUName = cleanToken(o.user || '');"
);

c = c.replace(
    /const matchId = cleanOId && cleanOId\.length >= 4 && content\.includes\(cleanOId\);\s*const matchUser = cleanUName && cleanUName\.length >= 3 && cleanUName !== 'KHACHVANGLAI' && content\.includes\(cleanUName\);\s*return matchId \|\| matchUser;/g,
    "const matchMemo = cleanMemo && cleanMemo.length >= 4 && content.includes(cleanMemo);\n            const matchId = cleanOId && cleanOId.length >= 4 && content.includes(cleanOId);\n            const matchUser = cleanUName && cleanUName.length >= 3 && cleanUName !== 'KHACHVANGLAI' && content.includes(cleanUName);\n            return matchMemo || matchId || matchUser;"
);

c = c.replace(
    /const memoToCheck = \(order && order\.user && order\.user !== 'Kh.ch vang lai'\) \? order\.user : orderId;/g,
    "const memoToCheck = order && order.memo ? order.memo : (order && order.user && order.user !== 'Khách vãng lai') ? order.user : orderId;"
);

fs.writeFileSync('admin.html', c, 'utf8');
