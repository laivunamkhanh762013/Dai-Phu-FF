const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Fix Intro Lag
// Replace left animation with transform animation in introLogoGlideBurst
// Also remove filter: drop-shadow from dp-intro-title

html = html.replace(
    /left: calc\(50% - clamp\(34px, 7\.5vw, 43px\)\);/g, 
    "" // We'll put it in the translateX
);

const oldKeyframes = `@keyframes introLogoGlideBurst {
    0%   { left: 0; transform: scale(0.95); opacity: 1; }
    55%  { left: 0; transform: scale(1.02); opacity: 1; }
    75%  {   transform: scale(1);    opacity: 1; }
    84%  {   transform: scale(1.2);  opacity: 1; }
    100% {   transform: scale(36);   opacity: 0; }
  }`;

// Actually let's just use regex to replace the entire keyframes block
html = html.replace(/@keyframes introLogoGlideBurst \{[\s\S]*?\}/, `@keyframes introLogoGlideBurst {
    0%   { transform: translateX(0) scale(0.95); opacity: 1; }
    55%  { transform: translateX(0) scale(1.02); opacity: 1; }
    75%  { transform: translateX(calc(min(46vw, 220px) - clamp(34px, 7.5vw, 43px))) scale(1); opacity: 1; }
    84%  { transform: translateX(calc(min(46vw, 220px) - clamp(34px, 7.5vw, 43px))) scale(1.2); opacity: 1; }
    100% { transform: translateX(calc(min(46vw, 220px) - clamp(34px, 7.5vw, 43px))) scale(36); opacity: 0; }
  }`);

// Remove drop-shadow from title
html = html.replace(/filter: drop-shadow\(0 4px 15px rgba\(0, 0, 0, 0\.9\)\);/, '');

// Remove will-change: transform, opacity, left; -> will-change: transform, opacity;
html = html.replace(/will-change: transform, opacity, left;/g, 'will-change: transform, opacity;');

// 2. Add Scroll Reveal to more elements
// Find initScrollReveal and change querySelectorAll
html = html.replace(/const cards = document\.querySelectorAll\('\.product:not\(\.reveal-in\)'\);/, `const cards = document.querySelectorAll('.product:not(.reveal-in), .section-head:not(.reveal-in), .history-wrap:not(.reveal-in), .footer:not(.reveal-in), .auth-card:not(.reveal-in)');`);

fs.writeFileSync('index.html', html);

// 3. Add CSS for new reveal-in targets
let theme = fs.readFileSync('assets/theme.css', 'utf8');
const moreRevealCss = `
.storefront .section-head:not(.reveal-in),
.storefront .history-wrap:not(.reveal-in),
.storefront .footer:not(.reveal-in),
.storefront .auth-card:not(.reveal-in) {
  opacity: 0;
  transform: translateY(20px);
}
.storefront .section-head.reveal-in,
.storefront .history-wrap.reveal-in,
.storefront .footer.reveal-in,
.storefront .auth-card.reveal-in {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.6s ease-out, transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
}
`;
if (!theme.includes('.section-head:not(.reveal-in)')) {
    fs.writeFileSync('assets/theme.css', theme + '\n' + moreRevealCss);
}

