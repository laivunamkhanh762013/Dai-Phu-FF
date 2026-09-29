const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const doctypeIndex = html.toLowerCase().indexOf('<!doctype html>');
if (doctypeIndex > 0) {
    html = html.substring(doctypeIndex);
}

const header = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>SHOP ĐẠI PHÚ FF - Gaming Store</title>
`;
html = header + html.replace(/<!doctype html>/i, '');
html = html.replace(/\\n<\/body>\\n<\/html>$/i, '\n</body>\n</html>');

fs.writeFileSync('index.html', html);
