const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(
    /fetch\('\/api\/orders\?id=' \+ encodeURIComponent\(orderId\)\)/g,
    "var _ut = localStorage.getItem('daiphu_user_token');\n    var _hd = {};\n    if (_ut) _hd['x-user-token'] = _ut;\n    fetch('/api/orders?id=' + encodeURIComponent(orderId), {\n      headers: _hd\n    })"
);

fs.writeFileSync('index.html', html);
