const fs = require('fs');

const cssToAdd = `
/* =========================================
   🔥 LANDING PAGE EFFECTS (ADDED BY CLAUDE)
   ========================================= */

/* 1. PRODUCT HOVER (Scale up & Neon glow) */
.storefront .product {
  transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease, border-color 0.3s ease !important;
}
.storefront .product:hover {
  transform: translateY(-5px) scale(1.02) !important;
  box-shadow: 0 12px 24px rgba(0, 240, 255, 0.15) !important;
  border-color: rgba(0, 240, 255, 0.4) !important;
}

/* 2. SCROLL REVEAL (Slide up & fade in) */
.storefront .product:not(.reveal-in) {
  opacity: 0 !important;
  transform: translateY(30px) !important;
}
.storefront .product.reveal-in {
  opacity: 1 !important;
  transform: translateY(0) !important;
  transition: opacity 0.6s ease-out, transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease, border-color 0.3s ease !important;
}
.storefront .product.reveal-in:hover {
  transform: translateY(-5px) scale(1.02) !important;
}

/* 3. HERO BANNER (Animated Gradient Text & Glow Background) */
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
  background: radial-gradient(circle at center, rgba(0,240,255,0.06) 0%, transparent 60%);
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
  background: linear-gradient(90deg, #ffffff, #00f0ff, #ffffff);
  background-size: 200% auto;
  color: transparent !important;
  -webkit-background-clip: text !important;
  background-clip: text !important;
  animation: heroTextShine 4s linear infinite;
}
@keyframes heroTextShine {
  to { background-position: 200% center; }
}
`;

let theme = fs.readFileSync('assets/theme.css', 'utf8');
if (!theme.includes('LANDING PAGE EFFECTS')) {
    fs.writeFileSync('assets/theme.css', theme + '\n' + cssToAdd);
}
