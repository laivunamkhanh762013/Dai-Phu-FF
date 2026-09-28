const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');

// Remove the wrongly injected code first
const wrongJs = /* ═══ REVEAL ANIMATION ON SCROLL ═══ */
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
indexHtml = indexHtml.replace(wrongJs, '</script>');

// Now append it to the very last </script> tag
const lastScriptIdx = indexHtml.lastIndexOf('</script>');
if (lastScriptIdx !== -1) {
    indexHtml = indexHtml.substring(0, lastScriptIdx) + "\n" + wrongJs + indexHtml.substring(lastScriptIdx + '</script>'.length);
}

fs.writeFileSync('index.html', indexHtml, 'utf8');
