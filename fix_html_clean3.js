const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Find the first <link rel="preconnect"
const linkIndex = html.indexOf('<link rel="preconnect"');

if (linkIndex !== -1) {
    const cleanHeader = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>SHOP ĐẠI PHÚ FF - Gaming Store</title>

`;
    html = cleanHeader + html.substring(linkIndex);
    fs.writeFileSync('index.html', html);
}
