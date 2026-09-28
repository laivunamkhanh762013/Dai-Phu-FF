const fs = require('fs');
let c = fs.readFileSync('api/sepay-webhook.js', 'utf8');

c = c.replace(
    /const oId = cleanToken\(o\.id \|\| ''\);[\s\S]*?return matchId;/m,
    "const oId = cleanToken(o.id || '');\n        const oMemo = cleanToken(o.memo || '');\n        const matchId = oId && oId.length >= 6 && cleanContent.includes(oId);\n        const matchMemo = oMemo && oMemo.length >= 6 && cleanContent.includes(oMemo);\n        return matchId || matchMemo;"
);

fs.writeFileSync('api/sepay-webhook.js', c, 'utf8');
