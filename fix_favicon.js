const fs = require('fs');

function addFavicon(filePath) {
    let html = fs.readFileSync(filePath, 'utf8');
    if (!html.includes('<link rel="icon"')) {
        html = html.replace('</title>', '</title>\n  <link rel="icon" href="assets/uploads/logos/aizen-logo.png" type="image/png">');
        fs.writeFileSync(filePath, html);
    }
}

addFavicon('index.html');
addFavicon('admin.html');
