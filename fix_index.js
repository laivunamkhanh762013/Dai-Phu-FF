const fs = require('fs');
const file = 'index.html';
let content = fs.readFileSync(file, 'utf8');

const regex = /function formatCurrentDateTime\(\) \{[\s\S]*?return y \+ '-' \+ pad\(m\) \+ '-' \+ pad\(d\) \+ ' ' \+ pad\(H\) \+ ':' \+ pad\(M\);\n\}/g;
content = content.replace(regex, '');

fs.writeFileSync(file, content, 'utf8');
