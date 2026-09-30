const fs = require('fs');

// 1. Update index.html for NovaX
let html = fs.readFileSync('index.html', 'utf8');

// Change the filter text
html = html.replace(
  /<button class="filter-btn" data-category-filter="Proxy iOS">Proxy iOS<\/button>/,
  '<button class="filter-btn" data-category-filter="Proxy">Proxy & Tối Ưu</button>'
);
// Also change the category of Delta from "Proxy iOS" to "Proxy"
html = html.replace(/category: 'Proxy iOS',\s*plat: 'iPhone.iPad',/g, "category: 'Proxy',\n      plat: 'iPhone & iPad',");

// Replace the novax product completely
const novaxRegex = /id: 'proxy-ios-novax',[\s\S]*?note: 'Da.nh riA.ng cho iPhone vA. iPad.'\s*}\s*]\s*}/;
// Actually regex replacement for the whole block is risky if formatting is weird.
// Let's use eval to parse PRODUCTS, modify it, and then stringify, but wait, `var PRODUCTS = [...]` contains some JS-specific stuff? No, it's just an array of objects. But I don't want to lose formatting.
