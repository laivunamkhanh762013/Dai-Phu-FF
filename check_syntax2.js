const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/g);
if (scriptMatch) {
    scriptMatch.forEach((script, idx) => {
        const jsCode = script.replace(/<\/?script>/g, '');
        try {
            new Function(jsCode);
            console.log('Script ' + idx + ' is valid.');
        } catch(e) {
            console.error('Script ' + idx + ' SYNTAX ERROR:', e.message);
        }
    });
}
