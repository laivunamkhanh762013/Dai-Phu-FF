const fs = require('fs');
let css = fs.readFileSync('assets/theme.css', 'utf8');

css = css.replace(/\.storefront \.tag, \.m-badge-save, \.m-badge-popular \{\s*position: relative;\s*overflow: hidden;\s*\}/, 
`.storefront .tag, .m-badge-save, .m-badge-popular {
  overflow: hidden;
}
.m-badge-save, .m-badge-popular {
  position: relative;
}`);

fs.writeFileSync('assets/theme.css', css, 'utf8');
