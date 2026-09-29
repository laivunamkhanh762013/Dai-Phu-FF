const fs = require('fs');
let orders = fs.readFileSync('api/orders.js', 'utf8');

// The problematic lines:
// const updatePlanName = sanitizeText(body.plan, 40) || '1 thng';
// const canonicalPrice = getCanonicalPrice(productName, planName);
// let finalPrice = ...
// const orderItem = { ... plan: planName, ... }

orders = orders.replace(/const canonicalPrice = getCanonicalPrice\(productName, planName\);/g, "const canonicalPrice = getCanonicalPrice(productName, updatePlanName);");
orders = orders.replace(/plan: planName,/g, function(match, offset, string) {
    // Only replace the second occurrence (the one near updatePlanName)
    if (offset > string.indexOf("const updatePlanName")) {
        return "plan: updatePlanName,";
    }
    return match;
});

fs.writeFileSync('api/orders.js', orders);
