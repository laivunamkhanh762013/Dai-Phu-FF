const fs = require('fs');
let content = fs.readFileSync('api/db.js', 'utf8');

// Fix getGist
content = content.replace(
    /let body = '';\s*res\.on\('data', chunk => body \+= chunk\);\s*res\.on\('end', \(\) => {/g,
    const chunks = [];\n      res.on('data', chunk => chunks.push(chunk));\n      res.on('end', () => {\n        let body = Buffer.concat(chunks).toString('utf8');
);

fs.writeFileSync('api/db.js', content, 'utf8');
