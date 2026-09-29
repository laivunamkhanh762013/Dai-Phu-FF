const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const linkToAdd = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">\n';

html = html.replace('<!-- VipGoNoPro Core Styles -->', linkToAdd + '<!-- VipGoNoPro Core Styles -->');
fs.writeFileSync('index.html', html);
