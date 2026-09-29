const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Remove the badly injected headers and footers
html = html.replace('<!DOCTYPE html>\\n<html lang="vi">\\n<head>\\n  <meta charset="UTF-8">\\n  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">\\n  <title>SHOP ĐẠI PHÚ FF - Gaming Store</title>\\n', '');
html = html.replace('<!DOCTYPE html>\\n<html lang="vi">\\n<head>\\n  <meta charset="UTF-8">\\n  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">\\n  <title>SHOP ?I PHAs FF - Gaming Store</title>\\n', '');

// Wait, the corrupted string is a bit messy. Let's just remove everything up to <!doctype html>
const doctypeIndex = html.toLowerCase().indexOf('<!doctype html>');
if (doctypeIndex > 0) {
    html = html.substring(doctypeIndex);
}

// Add clean headers
html = <!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>SHOP ĐẠI PHÚ FF - Gaming Store</title>
 + html.replace(/<!doctype html>/i, '');

// Clean the bottom literal \n
html = html.replace(/\\n<\/body>\\n<\/html>$/i, '\n</body>\n</html>');

fs.writeFileSync('index.html', html);
