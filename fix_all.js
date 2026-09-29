const fs = require('fs');

// 1. Fix api/check-payment.js
let cp = fs.readFileSync('api/check-payment.js', 'utf8');
cp = cp.replace(/\.replace\(\/d\/g, 'd'\)\s*\.replace\(\/D\/g, 'D'\)/g, ".replace(/đ/g, 'd').replace(/Đ/g, 'D')");
if (!cp.includes("const { verifyAdminToken } = require('./_security');")) {
    cp = cp.replace("const { getGist, updateGist } = require('./db');", "const { getGist, updateGist } = require('./db');\nconst { verifyAdminToken } = require('./_security');");
    cp = cp.replace("if (req.method === 'OPTIONS') {\n    return res.status(200).end();\n  }", "if (req.method === 'OPTIONS') {\n    return res.status(200).end();\n  }\n\n  if (!verifyAdminToken(req)) {\n    return res.status(401).json({ paid: false, error: 'Unauthorized: Chỉ admin mới được dùng tính năng này.' });\n  }");
}
fs.writeFileSync('api/check-payment.js', cp);

// 2. Fix api/sepay-webhook.js
let sw = fs.readFileSync('api/sepay-webhook.js', 'utf8');
sw = sw.replace(/\.replace\(\/d\/g, 'd'\)\s*\.replace\(\/D\/g, 'D'\)/g, ".replace(/đ/g, 'd').replace(/Đ/g, 'D')");
fs.writeFileSync('api/sepay-webhook.js', sw);

// 3. Fix api/db.js
let db = fs.readFileSync('api/db.js', 'utf8');
db = db.replace(/const kParts = \[.*?\];\nconst GITHUB_TOKEN = process\.env\.GITHUB_TOKEN \|\| kParts\.join\(''\);/, "const GITHUB_TOKEN = process.env.GITHUB_TOKEN;");
fs.writeFileSync('api/db.js', db);

// 4. Fix index.html
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/window\.currentOrderMemoFull \|\| /g, "");
html = html.replace(/window\.currentOrderId = memo;\s*window\.currentOrderMemo = memo;/g, "window.currentOrderId = (order && order.id) || memo;\n  window.currentOrderMemo = (order && order.memo) || window.currentOrderMemo;");
fs.writeFileSync('index.html', html);

// 5. Fix api/orders.js
let orders = fs.readFileSync('api/orders.js', 'utf8');
// Fix planName duplicate declaration
orders = orders.replace(/const planName = sanitizeText\(body\.plan, 40\) \|\| '1 th.ng';/, "const reqPlanName = sanitizeText(body.plan, 40) || '1 tháng';");
orders = orders.replace(/getCanonicalPrice\(productName, planName\);/, "getCanonicalPrice(productName, reqPlanName);");
orders = orders.replace(/plan: planName,/g, "plan: (typeof reqPlanName !== 'undefined' ? reqPlanName : planName),");
fs.writeFileSync('api/orders.js', orders);
