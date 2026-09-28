const fs = require('fs');

// --- 1. Fix Syntax Error in index.html ---
let indexHtml = fs.readFileSync('index.html', 'utf8');
const syntaxErrorRegex = /;\s*return pad\(now\.getHours\(\)\)[\s\S]*?\}\s*(?=\/\* ═══════ ORDERS STORAGE)/;
indexHtml = indexHtml.replace(syntaxErrorRegex, '');

// --- 2. Add Animations CSS to index.html ---
const indexCss = 
/* ═══ HIỆU ỨNG MỚI ═══ */
@keyframes cardRiseIn {
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: translateY(0); }
}
.product.reveal-in {
  animation: cardRiseIn .45s cubic-bezier(.16,1,.3,1) both;
}

@keyframes qrPulseGlow {
  0%, 100% { box-shadow: 0 0 0 rgba(0,240,255,0); }
  50% { box-shadow: 0 0 22px rgba(0,240,255,0.35); }
}
.m-qr-box { animation: qrPulseGlow 2.4s ease-in-out infinite; }

.btn-version-buy:active { transform: scale(.97); }

@keyframes checkPop {
  0% { transform: scale(0.6); opacity: 0; }
  60% { transform: scale(1.08); opacity: 1; }
  100% { transform: scale(1); }
}
.paid-header-icon { animation: checkPop .5s cubic-bezier(.34,1.56,.64,1) both; }

.nt-timeline-node { transition: background .3s ease, border-color .3s ease, box-shadow .3s ease; }
</style>;
if (!indexHtml.includes('@keyframes cardRiseIn')) {
    indexHtml = indexHtml.replace('</style>', indexCss);
}

// --- 3. Add Animations JS to index.html ---
const indexJs = 
/* ═══ REVEAL ANIMATION ON SCROLL ═══ */
function initScrollReveal() {
  const cards = document.querySelectorAll('.product:not(.reveal-in)');
  if (!('IntersectionObserver' in window)) {
    cards.forEach(function(c) { c.classList.add('reveal-in'); });
    return;
  }
  const io = new IntersectionObserver(function(entries, obs) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-in');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  cards.forEach(function(c) { io.observe(c); });
}

const _origRenderProducts = renderProducts;
renderProducts = function() {
  _origRenderProducts();
  setTimeout(initScrollReveal, 30);
};
initScrollReveal();
</script>;
if (!indexHtml.includes('initScrollReveal()')) {
    indexHtml = indexHtml.replace('</script>', indexJs);
}

fs.writeFileSync('index.html', indexHtml, 'utf8');

// --- 4. Add Animations CSS to admin.html ---
let adminHtml = fs.readFileSync('admin.html', 'utf8');
const adminCss = 
/* ═══ HIỆU ỨNG MỚI ═══ */
@keyframes rowFadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
#ordersTableBody tr {
  animation: rowFadeIn .35s ease both;
}
#ordersTableBody tr:nth-child(1) { animation-delay: .02s; }
#ordersTableBody tr:nth-child(2) { animation-delay: .05s; }
#ordersTableBody tr:nth-child(3) { animation-delay: .08s; }
#ordersTableBody tr:nth-child(4) { animation-delay: .11s; }
#ordersTableBody tr:nth-child(5) { animation-delay: .14s; }
#ordersTableBody tr:nth-child(n+6) { animation-delay: .16s; }

.stat-data strong, .rev-period-card strong {
  transition: color .2s ease;
}
.stat-card, .rev-period-card {
  animation: rowFadeIn .4s ease both;
}

.btn-scan i { transition: transform .5s ease; }
.btn-scan:active i { transform: rotate(180deg); }

.login-card { animation: rowFadeIn .5s ease both; }
</style>;
if (!adminHtml.includes('@keyframes rowFadeIn')) {
    adminHtml = adminHtml.replace('</style>', adminCss);
}

// --- 5. Add Animations JS to admin.html ---
const adminJs = 
function animateNumber(el, endValue, isCurrency) {
  if (!el) return;
  const startValue = parseInt(el.dataset.rawVal || '0', 10) || 0;
  const duration = 500;
  const startTime = performance.now();
  function step(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(startValue + (endValue - startValue) * eased);
    el.textContent = isCurrency ? formatVND(current) : current;
    if (progress < 1) requestAnimationFrame(step);
    else {
      el.textContent = isCurrency ? formatVND(endValue) : endValue;
      el.dataset.rawVal = endValue;
    }
  }
  requestAnimationFrame(step);
}
</script>;
if (!adminHtml.includes('function animateNumber')) {
    adminHtml = adminHtml.replace('</script>', adminJs);
}

// Apply animateNumber in updateStats
adminHtml = adminHtml.replace(/document\.getElementById\('statTotalOrders'\)\.textContent\s*=\s*orders\.length;/, 
    "animateNumber(document.getElementById('statTotalOrders'), orders.length, false);");
adminHtml = adminHtml.replace(/document\.getElementById\('statTotalRevenue'\)\.textContent\s*=\s*formatVND\(totalRev\);/, 
    "animateNumber(document.getElementById('statTotalRevenue'), totalRev, true);");
adminHtml = adminHtml.replace(/document\.getElementById\('statPendingOrders'\)\.textContent\s*=\s*pendingCount;/, 
    "animateNumber(document.getElementById('statPendingOrders'), pendingCount, false);");
adminHtml = adminHtml.replace(/document\.getElementById\('statApprovedOrders'\)\.textContent\s*=\s*approvedCount;/, 
    "animateNumber(document.getElementById('statApprovedOrders'), approvedCount, false);");
    
adminHtml = adminHtml.replace(/document\.getElementById\('revToday'\)\.textContent\s*=\s*formatVND\(t\);/,
    "animateNumber(document.getElementById('revToday'), t, true);");
adminHtml = adminHtml.replace(/document\.getElementById\('revMonth'\)\.textContent\s*=\s*formatVND\(m\);/,
    "animateNumber(document.getElementById('revMonth'), m, true);");
adminHtml = adminHtml.replace(/document\.getElementById\('revYear'\)\.textContent\s*=\s*formatVND\(y\);/,
    "animateNumber(document.getElementById('revYear'), y, true);");
adminHtml = adminHtml.replace(/document\.getElementById\('revYesterday'\)\.textContent\s*=\s*formatVND\(yt\);/,
    "animateNumber(document.getElementById('revYesterday'), yt, true);");
adminHtml = adminHtml.replace(/document\.getElementById\('revLastMonth'\)\.textContent\s*=\s*formatVND\(ym\);/,
    "animateNumber(document.getElementById('revLastMonth'), ym, true);");
adminHtml = adminHtml.replace(/document\.getElementById\('revLastYear'\)\.textContent\s*=\s*formatVND\(yy\);/,
    "animateNumber(document.getElementById('revLastYear'), yy, true);");

fs.writeFileSync('admin.html', adminHtml, 'utf8');

console.log("SUCCESS");
