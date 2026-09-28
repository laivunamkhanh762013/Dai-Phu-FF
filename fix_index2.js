const fs = require('fs');
const file = 'index.html';
let content = fs.readFileSync(file, 'utf8');

const targetIdx = content.indexOf('function formatCurrentDateTime() {');
if (targetIdx !== -1) {
    const endIdx = content.indexOf('}', targetIdx);
    if (endIdx !== -1) {
        content = content.substring(0, targetIdx) + content.substring(endIdx + 1);
    }
}

fs.writeFileSync(file, content, 'utf8');
