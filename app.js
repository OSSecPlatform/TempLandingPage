/* ============================================
   RestingOwl — app.js
   Particle canvas + form interaction
   ============================================ */

// ─── Particle System ───────────────────────
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animFrame;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const COLORS = ['rgba(77,184,78,', 'rgba(22,35,64,', 'rgba(57,158,58,'];

  class Particle {
    constructor() { this.reset(true); }

    reset(initial = false) {
      this.x = Math.random() * canvas.width;
      this.y = initial ? Math.random() * canvas.height : canvas.height + 10;
      this.size = Math.random() * 1.8 + 0.3;
      this.speed = Math.random() * 0.4 + 0.1;
      this.alpha = Math.random() * 0.5 + 0.1;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.drift = (Math.random() - 0.5) * 0.3;
    }

    update() {
      this.y -= this.speed;
      this.x += this.drift;
      this.alpha -= 0.0008;
      if (this.y < -10 || this.alpha <= 0) this.reset();
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.fill();
    }
  }

  // Init pool
  const POOL = 90;
  for (let i = 0; i < POOL; i++) particles.push(new Particle());

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    animFrame = requestAnimationFrame(loop);
  }
  loop();
})();


// ─── NPM Command Typewriter Cycle ──────────
(function typewriterCycle() {
  const commands = [
    'npm install @restingowl/auth-guard',
    'npm install @restingowl/input-sanitizer',
    'npm install @restingowl/rate-limiter',
  ];

  const el = document.getElementById('typewriter-cmd');
  if (!el) return;

  let idx = 0;
  let charIdx = 0;
  let deleting = false;
  let pauseFrames = 0;

  function type() {
    const target = commands[idx];

    if (pauseFrames > 0) {
      pauseFrames--;
      setTimeout(type, 50);
      return;
    }

    if (!deleting) {
      el.textContent = target.slice(0, ++charIdx);
      if (charIdx === target.length) {
        deleting = true;
        pauseFrames = 35; // pause at full string
      }
      setTimeout(type, 65);
    } else {
      el.textContent = target.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        idx = (idx + 1) % commands.length;
        pauseFrames = 10;
      }
      setTimeout(type, 35);
    }
  }

  setTimeout(type, 1200);
})();


// ─── Email Signup Form ─────────────────────
(function initForm() {
  const form = document.getElementById('signup-form');
  const input = document.getElementById('email-input');
  const btn = document.getElementById('notify-btn');
  const success = document.getElementById('signup-success');

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = input.value.trim();
    if (!email) return;

    // Simulate async submission
    btn.disabled = true;
    btn.style.opacity = '0.7';
    const btnText = btn.querySelector('.btn-text');
    btnText.textContent = 'Joining...';

    setTimeout(() => {
      form.style.display = 'none';
      success.classList.add('visible');

      // Store in localStorage so refresh keeps the state
      try { localStorage.setItem('resting_owl_signed_up', email); } catch (_) { }
    }, 900);
  });

  // Restore signed-up state on page load
  try {
    const stored = localStorage.getItem('resting_owl_signed_up');
    if (stored) {
      form.style.display = 'none';
      success.classList.add('visible');
    }
  } catch (_) { }
})();


// ─── Feature Pill Entrance Stagger ─────────
(function pillStagger() {
  const pills = document.querySelectorAll('.feature-pill');
  pills.forEach((pill, i) => {
    pill.style.opacity = '0';
    pill.style.transform = 'translateY(16px)';
    pill.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    setTimeout(() => {
      pill.style.opacity = '1';
      pill.style.transform = 'translateY(0)';
    }, 700 + i * 90);
  });
})();
