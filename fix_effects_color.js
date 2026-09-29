const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Remove old cardRiseIn animation
html = html.replace(/@keyframes cardRiseIn \{[\s\S]*?\}\n\s*\.product\.reveal-in \{[\s\S]*?\}\n/g, "");
fs.writeFileSync('index.html', html);

let theme = fs.readFileSync('assets/theme.css', 'utf8');
// Remove the CSS I added earlier
const splitPoint = theme.indexOf('/* =========================================');
if (splitPoint !== -1) {
    theme = theme.substring(0, splitPoint).trim();
}

// Add the refined CSS with Magenta/Orange colors
const newCss = 
/* =========================================
   🔥 LANDING PAGE EFFECTS (ADDED BY CLAUDE)
   ========================================= */

/* 1. HERO BANNER (Animated Gradient Text & Glow Background) */
.store-hero {
  position: relative;
  overflow: hidden;
}
.store-hero::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  /* CHANGED: Neon Pink/Magenta to Gold/Orange gradient glow */
  background: radial-gradient(circle at center, rgba(255, 0, 127, 0.15) 0%, transparent 60%);
  animation: heroRotatePulse 12s linear infinite;
  pointer-events: none;
  z-index: 0;
}
.store-hero > * {
  position: relative;
  z-index: 1;
}
@keyframes heroRotatePulse {
  0% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.1); }
  100% { transform: rotate(360deg) scale(1); }
}

.hero-copy h1 {
  background: linear-gradient(90deg, #ffffff, #ff007f, #ffaa00, #ffffff);
  background-size: 300% auto;
  color: transparent !important;
  -webkit-background-clip: text !important;
  background-clip: text !important;
  animation: heroTextShine 4s linear infinite;
}
@keyframes heroTextShine {
  to { background-position: 300% center; }
}

/* 2. SCROLL REVEAL (Slide up & fade in) */
.storefront .product:not(.reveal-in) {
  opacity: 0;
  transform: translateY(30px);
}
.storefront .product.reveal-in {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.5s ease-out, transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease, border-color 0.3s ease;
}

/* 3. PRODUCT HOVER (Scale up & Neon glow) */
.storefront .product.reveal-in:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 12px 24px rgba(255, 0, 127, 0.25);
  border-color: rgba(255, 0, 127, 0.6);
}
;

fs.writeFileSync('assets/theme.css', theme + '\n\n' + newCss);
