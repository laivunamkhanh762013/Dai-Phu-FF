const fs = require('fs');
let orders = fs.readFileSync('api/orders.js', 'utf8');

orders = orders.replace(/plan: \(typeof reqPlanName !== 'undefined' \? reqPlanName : planName\),/g, "plan: planName,");
orders = orders.replace(/const reqPlanName = sanitizeText\(body\.plan, 40\) \|\| '1 thng';/g, "const planName = sanitizeText(body.plan, 40) || '1 tháng';");
orders = orders.replace(/getCanonicalPrice\(productName, reqPlanName\);/g, "getCanonicalPrice(productName, planName);");

// Let's just fix the double declaration by doing it properly
// The block is:
// if (body._action === 'create' || body.action === 'create') { ... const planName = ... }
// then later outside:
// const planName = ... 
// This is actually FINE in JS! Block scope means they don't conflict. The "code smell" was just that it's the same name. 
// I'll rename the second one to updatePlanName to be safe.

orders = orders.replace(/const reqPlanName = /g, "const updatePlanName = ");
orders = orders.replace(/getCanonicalPrice\(productName, reqPlanName\)/g, "getCanonicalPrice(productName, updatePlanName)");
orders = orders.replace(/plan: reqPlanName/g, "plan: updatePlanName");

fs.writeFileSync('api/orders.js', orders);
