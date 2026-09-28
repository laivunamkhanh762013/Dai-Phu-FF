const fs = require('fs');
let c = fs.readFileSync('admin.html', 'utf8');
c = c.replace(
    /'<td><span class="order-code-badge">' \+ cleanId \+ '<\/span>' \+ txInfo \+ '<\/td>' \+/,
    "'<td><span class=\"order-code-badge\">' + cleanId + '</span><div style=\"font-size:10px;color:#f87171;margin-top:4px;\">ND: ' + cleanMemo + '</div>' + txInfo + '</td>' +"
);
fs.writeFileSync('admin.html', c, 'utf8');
