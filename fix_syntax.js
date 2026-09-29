const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The file currently has:
// @keyframes introLogoGlideBurst {
//     0%   { transform: translateX(0) scale(0.95); opacity: 1; }
// ...
//     100% { transform: translateX(...) scale(36); opacity: 0; }
//   }
//   55%  { left: 0; transform: scale(1.02); opacity: 1; }
//   75%  {  transform: scale(1);    opacity: 1; }
//   84%  {  transform: scale(1.2);  opacity: 1; }
//   100% {  transform: scale(36);   opacity: 0; }
// }

// Let's just find everything from `@keyframes introLogoGlideBurst {` down to the next `@keyframes` or `/*` and replace it correctly.

html = html.replace(/@keyframes introLogoGlideBurst \{[\s\S]*?\/\* N/g, `@keyframes introLogoGlideBurst {
    0%   { transform: translateX(0) scale(0.95); opacity: 1; }
    55%  { transform: translateX(0) scale(1.02); opacity: 1; }
    75%  { transform: translateX(calc(min(46vw, 220px) - clamp(34px, 7.5vw, 43px))) scale(1); opacity: 1; }
    84%  { transform: translateX(calc(min(46vw, 220px) - clamp(34px, 7.5vw, 43px))) scale(1.2); opacity: 1; }
    100% { transform: translateX(calc(min(46vw, 220px) - clamp(34px, 7.5vw, 43px))) scale(36); opacity: 0; }
  }

  /* N`);

fs.writeFileSync('index.html', html);
