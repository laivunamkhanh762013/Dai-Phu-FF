const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

c = c.replace(/memoEl\.textContent = orderId/g, "memoEl.textContent = displayMemo");
c = c.replace(/n.i dung <b>' \+ orderId \+ '<\/b>/g, "nội dung <b>' + displayMemo + '</b>");

fs.writeFileSync('index.html', c, 'utf8');
