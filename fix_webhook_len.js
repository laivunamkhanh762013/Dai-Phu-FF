const fs = require('fs');
let c = fs.readFileSync('api/sepay-webhook.js', 'utf8');
c = c.replace(/oId && oId\.length >= 6/g, "oId && oId.length >= 4");
c = c.replace(/oMemo && oMemo\.length >= 6/g, "oMemo && oMemo.length >= 4");
fs.writeFileSync('api/sepay-webhook.js', c, 'utf8');
