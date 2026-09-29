const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const regex = /<!-- \ud83d\ude80 GAMING SPLASH SCREEN INTRO[\s\S]*?<\/script>/;
// In case the rocket emoji is corrupted
const regexFallback = /<!-- \? GAMING SPLASH SCREEN INTRO[\s\S]*?<\/script>/;
const regexFallback2 = /<!--.*?GAMING SPLASH SCREEN INTRO[\s\S]*?<\/script>/;

const newIntro = `<!-- 🚀 GAMING SPLASH SCREEN INTRO (V3.0 CYBERPUNK) 🚀 -->
<div id="gamingIntro" class="dp-intro-overlay">
  <div class="dp-cyber-bg"></div>
  <div class="dp-particles" id="dpParticles"></div>
  
  <div class="dp-intro-center" id="dpIntroCenter">
    <div class="dp-intro-logo-box" id="dpIntroLogoBox">
      <div class="dp-ring dp-ring-1"></div>
      <div class="dp-ring dp-ring-2"></div>
      <div class="dp-ring dp-ring-3"></div>
      <img src="assets/uploads/logos/aizen-logo.png" alt="Logo Shop" class="dp-intro-logo-img" onerror="this.onerror=null;this.src='logo.png';">
    </div>
    
    <div class="dp-intro-text-box" id="dpIntroTextBox">
      <div class="dp-intro-title" data-text="SHOP ĐẠI PHÚ FF">SHOP ĐẠI PHÚ FF</div>
      <div class="dp-intro-subline">GAMING STORE • MOD & UTILITIES</div>
      <div class="dp-progress-wrap">
        <div class="dp-progress-bar"></div>
      </div>
      <div class="dp-sys-text">SYSTEM INITIALIZATION...</div>
    </div>
  </div>
</div>

<style>
/* 🌟 BACKGROUND & OVERLAY */
.dp-intro-overlay {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  background: radial-gradient(circle at center, #0a0a1a 0%, #020205 100%);
  z-index: 999999999;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  pointer-events: all;
  user-select: none;
  -webkit-user-select: none;
  animation: introBgFadeOut 0.5s cubic-bezier(0.4, 0, 0.2, 1) 2.6s forwards;
}

.dp-cyber-bg {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(0, 240, 255, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 240, 255, 0.04) 1px, transparent 1px);
  background-size: 40px 40px;
  background-position: center center;
  opacity: 0.5;
  transform: perspective(600px) rotateX(60deg) translateY(-100px) scale(3);
  animation: gridMove 4s linear infinite;
}

@keyframes gridMove {
  0% { transform: perspective(600px) rotateX(60deg) translateY(0) scale(3); }
  100% { transform: perspective(600px) rotateX(60deg) translateY(40px) scale(3); }
}

/* 🌟 PARTICLES */
.dp-particle {
  position: absolute;
  width: 2.5px;
  height: 2.5px;
  background: #00f0ff;
  border-radius: 50%;
  box-shadow: 0 0 10px #00f0ff, 0 0 20px #00f0ff;
  animation: floatUp 2s linear forwards;
}

@keyframes floatUp {
  0% { transform: translateY(0) scale(1); opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { transform: translateY(-100px) scale(0); opacity: 0; }
}

/* 🌟 CENTER CONTAINER */
.dp-intro-center {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: min(92vw, 460px);
  height: 120px;
  animation: introCenterIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* 🌟 LOGO WITH RINGS */
.dp-intro-logo-box {
  position: absolute;
  left: 0;
  width: clamp(75px, 16vw, 95px);
  height: clamp(75px, 16vw, 95px);
  border-radius: 50%;
  padding: 4px;
  background: linear-gradient(135deg, #00f0ff 0%, #facc15 100%, #ff0055 200%);
  box-shadow: 0 0 35px rgba(0, 240, 255, 0.6), 0 0 55px rgba(250, 204, 21, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  will-change: transform, opacity, left;
  animation: introLogoGlideBurst 3.0s cubic-bezier(0.25, 1, 0.35, 1) forwards;
}

.dp-intro-logo-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  background: #020409;
  display: block;
  z-index: 10;
  position: relative;
}

/* Rings */
.dp-ring {
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 2px solid transparent;
  z-index: 1;
}
.dp-ring-1 {
  border-top-color: #00f0ff;
  border-bottom-color: #00f0ff;
  animation: spin 2s linear infinite;
}
.dp-ring-2 {
  inset: -14px;
  border-left-color: #facc15;
  border-right-color: #facc15;
  animation: spinReverse 3s linear infinite;
  opacity: 0.7;
}
.dp-ring-3 {
  inset: -22px;
  border-top-color: #ff0055;
  border-bottom-color: #ff0055;
  animation: spin 4s linear infinite;
  opacity: 0.4;
}

@keyframes spin { 100% { transform: rotate(360deg); } }
@keyframes spinReverse { 100% { transform: rotate(-360deg); } }

/* 🌟 TEXT SECTION */
.dp-intro-text-box {
  position: absolute;
  left: clamp(95px, 20vw, 120px);
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  pointer-events: none;
  will-change: opacity, transform;
  animation: introTextSmoothFade 3.0s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}

/* Cyberpunk Glitch Title */
.dp-intro-title {
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Impact", sans-serif;
  font-size: clamp(22px, 5.8vw, 38px);
  font-weight: 900;
  letter-spacing: 2.5px;
  line-height: 1.15;
  text-transform: uppercase;
  color: #fff;
  white-space: nowrap;
  text-shadow: 0 0 12px rgba(0,240,255,0.9), 0 0 25px rgba(0,240,255,0.5);
  animation: glitch 1.5s infinite;
}

.dp-intro-title::before, .dp-intro-title::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
}
.dp-intro-title::before {
  color: #0ff;
  z-index: -1;
  animation: glitch-anim-1 2s infinite linear alternate-reverse;
}
.dp-intro-title::after {
  color: #f0f;
  z-index: -2;
  animation: glitch-anim-2 3s infinite linear alternate-reverse;
}

@keyframes glitch-anim-1 {
  0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); }
  20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -1px); }
  40% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 2px); }
  60% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); }
  80% { clip-path: inset(10% 0 70% 0); transform: translate(-1px, 1px); }
  100% { clip-path: inset(30% 0 50% 0); transform: translate(1px, -1px); }
}
@keyframes glitch-anim-2 {
  0% { clip-path: inset(10% 0 60% 0); transform: translate(2px, -1px); }
  20% { clip-path: inset(80% 0 5% 0); transform: translate(-2px, 1px); }
  40% { clip-path: inset(30% 0 20% 0); transform: translate(2px, -2px); }
  60% { clip-path: inset(70% 0 10% 0); transform: translate(-2px, 2px); }
  80% { clip-path: inset(40% 0 50% 0); transform: translate(1px, -1px); }
  100% { clip-path: inset(20% 0 30% 0); transform: translate(-1px, 1px); }
}

.dp-intro-subline {
  font-family: monospace, system-ui;
  font-size: clamp(10px, 2.5vw, 13px);
  font-weight: 700;
  letter-spacing: 4px;
  color: #facc15;
  margin-top: 6px;
  text-shadow: 0 0 12px rgba(250, 204, 21, 0.9);
  white-space: nowrap;
  overflow: hidden;
  border-right: 2px solid #facc15;
  animation: typing 1s steps(30, end) forwards, blink 0.75s step-end infinite;
}

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}
@keyframes blink {
  from, to { border-color: transparent }
  50% { border-color: #facc15; }
}

/* Loading Bar */
.dp-progress-wrap {
  margin-top: 14px;
  width: 100%;
  height: 5px;
  background: rgba(255,255,255,0.1);
  border-radius: 4px;
  overflow: hidden;
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.5);
  position: relative;
}
.dp-progress-bar {
  width: 0%;
  height: 100%;
  background: linear-gradient(90deg, #00f0ff, #facc15, #00f0ff);
  background-size: 200% 100%;
  border-radius: 4px;
  animation: loadProgress 1.8s cubic-bezier(0.4, 0, 0.2, 1) forwards, gradientMove 2s linear infinite;
  box-shadow: 0 0 12px #00f0ff;
}

@keyframes loadProgress {
  0% { width: 0%; }
  30% { width: 35%; }
  70% { width: 85%; }
  100% { width: 100%; }
}
@keyframes gradientMove {
  0% { background-position: 100% 0; }
  100% { background-position: -100% 0; }
}

.dp-sys-text {
  font-family: monospace;
  font-size: 10px;
  color: #00f0ff;
  margin-top: 5px;
  letter-spacing: 1.5px;
  opacity: 0.6;
  animation: sysBlink 0.5s infinite alternate;
}
@keyframes sysBlink {
  0% { opacity: 0.3; }
  100% { opacity: 0.8; }
}

/* 🌟 MAIN KEYFRAMES */
@keyframes introCenterIn {
  0%   { opacity: 0; transform: scale(0.7) translateY(20px); filter: blur(15px); }
  60%  { opacity: 1; transform: scale(1.03) translateY(-5px); filter: blur(0px); }
  100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0px); }
}

@keyframes introTextSmoothFade {
  0%   { opacity: 1; transform: translateX(0); }
  68%  { opacity: 1; transform: translateX(0); }
  78%  { opacity: 0; transform: translateX(40px) scale(0.95); filter: blur(8px); }
  100% { opacity: 0; transform: translateX(40px) scale(0.95); filter: blur(8px); }
}

/* Burst */
@keyframes introLogoGlideBurst {
  0%   { left: 0; transform: scale(0.8); opacity: 1; filter: hue-rotate(0deg); }
  60%  { left: 0; transform: scale(1.05); opacity: 1; filter: hue-rotate(90deg); }
  78%  { left: calc(50% - clamp(37px, 8vw, 47px)); transform: scale(1.15); opacity: 1; box-shadow: 0 0 90px #00f0ff, 0 0 140px #ff0055; filter: hue-rotate(180deg); }
  84%  { left: calc(50% - clamp(37px, 8vw, 47px)); transform: scale(0.85); opacity: 1; }
  92%  { left: calc(50% - clamp(37px, 8vw, 47px)); transform: scale(1.5); opacity: 1; box-shadow: 0 0 250px #fff; }
  100% { left: calc(50% - clamp(37px, 8vw, 47px)); transform: scale(55); opacity: 0; filter: brightness(4); }
}

@keyframes introBgFadeOut {
  0%   { opacity: 1; }
  100% { opacity: 0; pointer-events: none; }
}
</style>

<script>
(function() {
  var intro = document.getElementById('gamingIntro');
  if (!intro) return;
  
  intro.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  // Spawn random particles
  var pContainer = document.getElementById('dpParticles');
  if (pContainer) {
    for(var i=0; i<45; i++) {
      var p = document.createElement('div');
      p.className = 'dp-particle';
      p.style.left = Math.random() * 100 + 'vw';
      p.style.top = (Math.random() * 50 + 50) + 'vh';
      p.style.animationDelay = Math.random() * 1.5 + 's';
      p.style.animationDuration = (Math.random() * 1.5 + 1) + 's';
      var colors = ['#00f0ff', '#facc15', '#ff0055'];
      var c = colors[Math.floor(Math.random() * colors.length)];
      p.style.background = c;
      p.style.boxShadow = '0 0 15px ' + c;
      pContainer.appendChild(p);
    }
  }

  // Hide after 3.0s
  setTimeout(function() {
    document.body.style.overflow = '';
    if (intro && intro.parentNode) {
      intro.parentNode.removeChild(intro);
    }
  }, 3000);
})();
</script>`;

if (regexFallback2.test(html)) {
    let newHtml = html.replace(regexFallback2, newIntro);
    fs.writeFileSync('index.html', newHtml);
    console.log("Success with regexFallback2");
} else {
    console.log("Could not find intro block with regex");
}
