const fs = require('fs');
let admin = fs.readFileSync('admin.html', 'utf8');

admin = admin.replace(
    /const matchUser = cleanUName && cleanUName\.length >= 3 && cleanUName !== 'KHACHVANGLAI' && content\.includes\(cleanUName\);\n\s*return matchMemo \|\| matchId \|\| matchUser;/g,
    "return matchMemo || matchId;"
);

fs.writeFileSync('admin.html', admin);
