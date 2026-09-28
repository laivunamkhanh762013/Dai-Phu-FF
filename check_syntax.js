const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/g);
if (scriptMatch) {
    scriptMatch.forEach((script, idx) => {
        const jsCode = script.replace(/<\/?script>/g, '');
        try {
            new Function(jsCode);
            console.log(Script  is valid.);
        } catch(e) {
            console.error(Script  SYNTAX ERROR:, e.message);
            
            // Give context around error if possible.
            // new Function doesn't give line numbers easily, but we know it failed.
        }
    });
}
