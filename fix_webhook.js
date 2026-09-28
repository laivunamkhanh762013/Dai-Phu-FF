const fs = require('fs');
let c = fs.readFileSync('api/sepay-webhook.js', 'utf8');

c = c.replace(
    /const oId = cleanToken\(o\.id \|\| ''\);\s*const uName = cleanToken\(o\.user \|\| ''\);\s*\/\/ CH? kh?p ch?nh x?c theo ma don DP\.\.\. \(kh?ng d?ng username d? tr?nh b? hijack\)\s*const matchId = oId && oId\.length >= 6 && cleanContent\.includes\(oId\);\s*return matchId;/m,
    const oId = cleanToken(o.id || '');
        const oMemo = cleanToken(o.memo || '');
        const matchId = oId && oId.length >= 6 && cleanContent.includes(oId);
        const matchMemo = oMemo && oMemo.length >= 6 && cleanContent.includes(oMemo);
        return matchId || matchMemo;
);

// Fallback regex if encoding broke it
c = c.replace(
    /const oId = cleanToken\(o\.id \|\| ''\);[\s\S]*?return matchId;/,
    const oId = cleanToken(o.id || '');\n        const oMemo = cleanToken(o.memo || '');\n        const matchId = oId && oId.length >= 6 && cleanContent.includes(oId);\n        const matchMemo = oMemo && oMemo.length >= 6 && cleanContent.includes(oMemo);\n        return matchId || matchMemo;
);

fs.writeFileSync('api/sepay-webhook.js', c, 'utf8');
