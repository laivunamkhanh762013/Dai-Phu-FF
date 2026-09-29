const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Fix 6: Remove dead code
html = html.replace(/function stripVietnamese\(str\) \{[\s\S]*?return str;\n\s*\}/g, "");
html = html.replace(/function getBadgeClass\(status\) \{[\s\S]*?return 'bg-gray';\n\s*\}/g, "");
html = html.replace(/function confirmPaid\(\) \{[\s\S]*?\}\n/g, "");
html = html.replace(/function openOrderCheckModal\(\) \{[\s\S]*?\}\n/g, "");

fs.writeFileSync('index.html', html);
