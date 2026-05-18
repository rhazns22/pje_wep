/* 
  박주은 Portfolio Refined Interactivity
  Stable version with Splash Intro & Compact UI
*/

document.addEventListener('DOMContentLoaded', () => {
  initSplash();
  initHeaderScroll();
  initTyping();
  initScrollReveal();
  initProjectInteractions();
  initSkillGlow();
  initSmoothScroll();
  initBackgroundGlow();
  initCustomCursor();
  initSummaryPeek();
  initParticles();
  initHeroMorph();
  initProcessAnimation();
});

// 00. Custom Cursor Logic & Reading Lens
function initCustomCursor() {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const dot = document.getElementById('cursor-dot');
  const outline = document.getElementById('cursor-outline');
  if (!dot || !outline) return;

  document.body.classList.add('has-custom-cursor');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let outlineX = mouseX;
  let outlineY = mouseY;
  let rafId = null;

  const readableSelector = [
    'p',
    'li',
    '.section-subtitle',
    '.about-card p',
    '.direction-item p',
    '.project-heading p',
    '.project-notes li',
    '.skill-description',
    '.quality-item p',
    '.step p',
    '.exp-desc',
    '.award-info .desc',
    '.contact-command p',
    '.arch-description'
  ].join(',');

  const actionSelector = [
    'a',
    'button',
    '.btn',
    '.btn-pill',
    '.command-link',
    '.nav-links a',
    '.logo',
    '.menu-toggle'
  ].join(',');

  const readableTargets = document.querySelectorAll(readableSelector);
  readableTargets.forEach((target) => {
    if (target.closest(actionSelector)) return;
    target.classList.add('is-reading-target');

    target.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-reading');
    });

    target.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-reading');
    });
  });

  const actionTargets = document.querySelectorAll(actionSelector);
  actionTargets.forEach((target) => {
    target.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-action');
      document.body.classList.remove('cursor-reading');
    });

    target.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-action');
    });
  });

  window.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;

    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

    if (!rafId) {
      rafId = requestAnimationFrame(updateCursor);
    }
  }, { passive: true });

  function updateCursor() {
    outlineX += (mouseX - outlineX) * 0.18;
    outlineY += (mouseY - outlineY) * 0.18;

    outline.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0) translate(-50%, -50%)`;

    rafId = requestAnimationFrame(updateCursor);
  }

  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    outline.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '0.9';
    outline.style.opacity = '0.9';
  });
}

// 0. Background Glow Follow
function initBackgroundGlow() {
  const glow = document.getElementById('mouse-glow');
  if (!glow || !window.matchMedia('(pointer: fine)').matches) return;

  window.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    
    document.documentElement.style.setProperty('--mouse-x', `${x}px`);
    document.documentElement.style.setProperty('--mouse-y', `${y}px`);
  });
}

// 1. Splash Intro Logic (Portfolio System Wake-up - Soft Cinematic Sequence)
function initSplash() {
  const splash = document.getElementById('splash');
  if (!splash) return;

  const canvas = document.getElementById('splashCoreCanvas');
  const ctx = canvas.getContext('2d');
  const brand = splash.querySelector('.splash-brand');
  const system = splash.querySelector('.splash-system');
  const compiling = splash.querySelector('.splash-compiling');
  const statusItems = splash.querySelectorAll('.splash-status-list li');
  const readyMsg = splash.querySelector('.splash-ready');
  const enterBtn = document.getElementById('enter-portfolio');

  let width, height, centerX, centerY;
  let particles = [];
  let isLaunching = false;
  let launchStartTime = 0;
  let launchProgress = 0;
  let rafId = null;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const alreadySeen = sessionStorage.getItem('portfolioSplashSeen') === 'true';

  if (alreadySeen) {
    splash.classList.add('is-hidden');
    document.body.classList.remove('is-splash-open');
    document.body.classList.add('splash-complete');
    const mainContent = document.getElementById('main-content');
    if (mainContent) mainContent.classList.add('is-visible');
    return;
  }

  document.body.classList.add('is-splash-open');

  const fragmentTexts = [
    'interface.mount()', 'projects.connect()', 'data.flow()',
    'deploy.target = "vercel"', 'system.status = 200', 'module.init()',
    'api.integrate()', 'route.ready()', 'component.awake()'
  ];

  function lerp(start, end, t) {
    return start * (1 - t) + end * t;
  }

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function resize() {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    centerX = width / 2;
    centerY = height / 2;
  }

  function createParticles() {
    particles = [];
    let count;
    if (width > 1024) count = 85; // Desktop
    else if (width > 768) count = 55; // Tablet
    else count = 28; // Mobile

    for (let i = 0; i < count; i++) {
      const isFragment = i % 4 === 0;
      const angle = Math.random() * Math.PI * 2;
      const orbitRadius = 120 + Math.random() * (Math.min(width, height) * 0.3);
      
      const x = centerX + Math.cos(angle) * orbitRadius;
      const y = centerY + Math.sin(angle) * orbitRadius;

      particles.push({
        text: isFragment ? fragmentTexts[Math.floor(Math.random() * fragmentTexts.length)] : '',
        type: isFragment ? 'fragment' : 'spark',
        x: x,
        y: y,
        startX: x,
        startY: y,
        curveOffsetX: (Math.random() - 0.5) * 160,
        curveOffsetY: (Math.random() - 0.5) * 160,
        size: isFragment ? 10 : 1.5,
        alpha: 0.12 + Math.random() * 0.22,
        orbitOffset: Math.random() * Math.PI * 2,
        driftSpeed: 0.0002 + Math.random() * 0.0004
      });
    }
  }

  function draw(time) {
    ctx.clearRect(0, 0, width, height);

    if (isLaunching && launchStartTime === 0) launchStartTime = time;
    if (isLaunching) {
      launchProgress = Math.min(1, (time - launchStartTime) / 1000);
    }

    const eased = easeInOutCubic(launchProgress);

    // Draw Central Soft Core
    const corePulse = Math.sin(time / 800) * 3;
    const coreRadius = isLaunching 
      ? 80 + eased * 100
      : 80 + corePulse;
    const coreAlpha = isLaunching 
      ? 0.18 + eased * 0.27
      : 0.15;

    if (launchProgress < 1) {
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreRadius);
      gradient.addColorStop(0, `rgba(74, 222, 128, ${coreAlpha})`);
      gradient.addColorStop(0.4, `rgba(96, 165, 250, ${coreAlpha * 0.3})`);
      gradient.addColorStop(1, 'rgba(2, 6, 23, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    particles.forEach(p => {
      if (isLaunching) {
        // Curved movement toward center
        const curveX = Math.sin(launchProgress * Math.PI) * p.curveOffsetX;
        const curveY = Math.sin(launchProgress * Math.PI) * p.curveOffsetY;

        p.x = lerp(p.startX, centerX, eased) + curveX;
        p.y = lerp(p.startY, centerY, eased) + curveY;

        const currentAlpha = Math.max(0, p.alpha * (1 - eased * 1.2));
        
        // Soft Trails
        const trailLen = Math.min(width > 768 ? 160 : 80, 20 + eased * 140);
        const dx = centerX - p.x;
        const dy = centerY - p.y;
        const angle = Math.atan2(dy, dx);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(angle);
        ctx.globalAlpha = currentAlpha * 0.45;
        ctx.fillStyle = `rgba(148, 255, 210, 0.25)`;
        ctx.fillRect(0, -0.5, trailLen, 1);
        
        // Object
        ctx.globalAlpha = currentAlpha;
        ctx.fillStyle = '#4ade80';
        if (p.type === 'spark') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.font = `${p.size}px ui-monospace, monospace`;
          ctx.fillText(p.text, 0, 0);
        }
        ctx.restore();
      } else {
        // Idle Drift
        const idleAngle = p.orbitOffset + time * p.driftSpeed;
        const driftX = Math.cos(idleAngle) * 15;
        const driftY = Math.sin(idleAngle * 0.8) * 15;
        
        const currentX = p.startX + driftX;
        const currentY = p.startY + driftY;

        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = '#4ade80';
        if (p.type === 'spark') {
          ctx.beginPath();
          ctx.arc(currentX, currentY, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.font = `${p.size}px ui-monospace, monospace`;
          ctx.fillText(p.text, currentX, currentY);
        }
        // Update current for start point of launch
        p.x = currentX;
        p.y = currentY;
      }
    });

    if (launchProgress < 1) {
      rafId = requestAnimationFrame(draw);
    } else if (isLaunching) {
      closeSplashFinal();
    }
  }

  function startLaunch() {
    if (isLaunching) return;
    if (prefersReducedMotion) {
      closeSplashFinal();
      return;
    }
    isLaunching = true;
    launchStartTime = 0;
    // Capture positions at the moment of launch
    particles.forEach(p => {
      p.startX = p.x;
      p.startY = p.y;
    });
    splash.classList.add('is-launching');
  }

  function closeSplashFinal() {
    cancelAnimationFrame(rafId);
    splash.classList.add('is-revealing');
    
    setTimeout(() => {
      splash.classList.add('is-hidden');
      document.body.classList.remove('is-splash-open');
      document.body.classList.add('splash-complete');
      sessionStorage.setItem('portfolioSplashSeen', 'true');
      
      const mainContent = document.getElementById('main-content');
      if (mainContent) mainContent.classList.add('is-visible');
    }, 400); // Wait for is-revealing transition
  }

  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });
  resize();
  createParticles();
  rafId = requestAnimationFrame(draw);

  // Timeline Sequence (Softer & Smoother)
  setTimeout(() => {
    brand.classList.add('is-visible');
    system.classList.add('is-visible');
  }, 200);
  
  setTimeout(() => {
    compiling.classList.add('is-visible');
    statusItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('is-visible');
      }, index * 250); // Slower reveal (0.25s per item)
    });
  }, 450);

  setTimeout(() => {
    readyMsg.classList.add('is-visible');
    enterBtn.classList.add('is-visible');
  }, 1700);

  setTimeout(() => {
    startLaunch(); // Auto-launch at 1.95s (approx)
  }, 1950);

  // Triggers
  enterBtn.addEventListener('click', startLaunch);
  window.addEventListener('keydown', (e) => {
    if ((e.key === 'Escape' || e.key === 'Enter') && !alreadySeen && !isLaunching) {
      startLaunch();
    }
  });
}

// 2. Header Scroll & Mobile Navigation
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!header) return;

  let lastScrollY = window.scrollY;
  let ticking = false;
  const threshold = 8;

  function updateHeader() {
    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - lastScrollY;
    const isNavActive = header.classList.contains('nav-active');

    // 1. Position Top Handling
    if (currentScrollY <= 20) {
      header.classList.remove('is-hidden', 'is-scrolled');
      header.classList.add('is-visible');
      lastScrollY = currentScrollY;
      ticking = false;
      return;
    }

    // 2. Scrolled State
    header.classList.add('is-scrolled');

    // 3. Direction Handling with Threshold
    if (Math.abs(scrollDelta) > threshold) {
      if (scrollDelta > 0 && !isNavActive) {
        // Scrolling Down & Menu Closed
        header.classList.add('is-hidden');
        header.classList.remove('is-visible');
      } else {
        // Scrolling Up or Menu Open
        header.classList.remove('is-hidden');
        header.classList.add('is-visible');
      }
      lastScrollY = currentScrollY;
    }

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });

  // Mobile Menu Toggle
  if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
      header.classList.toggle('nav-active');
    });
  }

  // Close menu on link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      header.classList.remove('nav-active');
    });
  });
}

// 3. Typing Animation
function initTyping() {
  const textElement = document.getElementById('typing-text');
  if (!textElement) return;
  const phrases = ['Frontend Engineer', 'Product Builder', 'UI Engineer'];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
      textElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      textElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500;
    }
    setTimeout(type, typingSpeed);
  }
  type();
}

// 4. Scroll Reveal (IntersectionObserver)
function initScrollReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal, .stagger-item').forEach(el => el.classList.add('active'));
    return;
  }

  const reveals = document.querySelectorAll('.reveal');
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // If it's a stagger container, the items will animate via CSS
        if (entry.target.classList.contains('stagger-container')) {
          entry.target.querySelectorAll('.stagger-item').forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.08}s`;
            item.classList.add('active');
          });
        }
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  reveals.forEach(reveal => observer.observe(reveal));
}

// 4-1. Hero Scroll Morph
function initHeroMorph() {
  const heroContent = document.querySelector('.hero-content');
  const heroCanvas = document.getElementById('hero-particles');
  const gridBg = document.querySelector('.grid-bg');
  
  if (!heroContent) return;

  const handleScroll = () => {
    const scrollY = window.scrollY;
    // QA: Even smoother fade
    const opacity = Math.max(0, 1 - scrollY / 1100);
    const scale = Math.max(0.97, 1 - scrollY / 8000);
    const translateY = scrollY * 0.12;

    heroContent.style.opacity = opacity;
    heroContent.style.transform = `translateY(${translateY}px) scale(${scale})`;
    
    if (heroCanvas) heroCanvas.style.opacity = opacity * 0.5;
    if (gridBg) gridBg.style.opacity = 0.2 + (opacity * 0.8);
  };

  window.addEventListener('scroll', () => {
    requestAnimationFrame(handleScroll);
  });
}

// 4-2. Build Pipeline Animation
function initProcessAnimation() {
  const processSection = document.querySelector('.reveal-process');
  if (!processSection) return;

  const steps = processSection.querySelectorAll('.step');

  const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // When a step enters, ensure previous steps are also active (for scroll down)
        const currentIdx = Array.from(steps).indexOf(entry.target);
        steps.forEach((s, i) => {
          if (i < currentIdx) s.classList.add('active');
        });
      }
    });
  }, observerOptions);

  steps.forEach(step => observer.observe(step));
}

// 5. Project Card Interactions (Ultra-Subtle Tilt)
function initProjectInteractions() {
  if (!window.matchMedia('(pointer: fine)').matches) return;
  
  const cards = document.querySelectorAll('.project-card.compact');
  
  cards.forEach(card => {
    let rect;
    let rafId;
    
    card.addEventListener('mouseenter', () => {
      rect = card.getBoundingClientRect();
    });
    
    card.addEventListener('mousemove', (e) => {
      if (!rect) return;
      if (rafId) cancelAnimationFrame(rafId);
      
      rafId = requestAnimationFrame(() => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // QA: Extremely subtle tilt (divisor increased to 80)
        const rotateX = (centerY - y) / 80; 
        const rotateY = (x - centerX) / 80;
        
        card.style.transform = `perspective(2000px) translateY(-5px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
    });
    
    card.addEventListener('mouseleave', () => {
      if (rafId) cancelAnimationFrame(rafId);
      card.style.transform = `perspective(2000px) translateY(0) rotateX(0) rotateY(0)`;
      rect = null;
    });
  });
}

// 6. Skill Glow Interaction
function initSkillGlow() {
  const skills = document.querySelectorAll('.skill-item, .card-tech span');
  skills.forEach(skill => {
    skill.addEventListener('mouseenter', () => {
      skill.style.boxShadow = '0 0 15px var(--accent-primary)';
      skill.style.borderColor = 'var(--accent-primary)';
    });
    skill.addEventListener('mouseleave', () => {
      skill.style.boxShadow = 'none';
      skill.style.borderColor = 'var(--glass-border)';
    });
  });
}

// 7. Smooth Scroll
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// 08. Particle Background Interaction
function initParticles() {
  const canvas = document.getElementById('hero-particles');
  if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ctx = canvas.getContext('2d');
  let particlesArray = [];
  let mouse = { x: null, y: null, radius: 100 };

  // Responsive particle count
  const getParticleCount = () => {
    const width = window.innerWidth;
    if (width < 480) return 25;
    if (width < 768) return 50;
    return 80;
  };

  // Adjust canvas size for resolution
  function handleResize() {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    init();
  }

  class Particle {
    constructor(x, y) {
      this.baseX = x;
      this.baseY = y;
      this.x = x;
      this.y = y;
      this.size = Math.random() * 2 + 1;
      this.density = (Math.random() * 20) + 1;
      this.color = Math.random() > 0.5 ? '#4ade80' : '#60a5fa'; // Mint or Blue
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }

    update() {
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      let forceDirectionX = dx / distance;
      let forceDirectionY = dy / distance;
      let maxDistance = mouse.radius;
      let force = (maxDistance - distance) / maxDistance;
      let directionX = forceDirectionX * force * this.density;
      let directionY = forceDirectionY * force * this.density;

      if (distance < mouse.radius) {
        this.x -= directionX;
        this.y -= directionY;
      } else {
        if (this.x !== this.baseX) {
          let dx = this.x - this.baseX;
          this.x -= dx / 15;
        }
        if (this.y !== this.baseY) {
          let dy = this.y - this.baseY;
          this.y -= dy / 15;
        }
      }
    }
  }

  function init() {
    particlesArray = [];
    const count = getParticleCount();
    const rect = canvas.getBoundingClientRect();
    for (let i = 0; i < count; i++) {
      let x = Math.random() * rect.width;
      let y = Math.random() * rect.height;
      particlesArray.push(new Particle(x, y));
    }
  }

  function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
        let dx = particlesArray[a].x - particlesArray[b].x;
        let dy = particlesArray[a].y - particlesArray[b].y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          opacityValue = 1 - (distance / 100);
          ctx.strokeStyle = `rgba(148, 163, 184, ${opacityValue * 0.2})`; // soft blue/slate
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].draw();
      particlesArray[i].update();
    }
    connect();
    requestAnimationFrame(animate);
  }

  window.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    // Only react if mouse is within hero section
    if (event.clientY <= rect.bottom) {
      mouse.x = event.clientX;
      mouse.y = event.clientY - rect.top;
    } else {
      mouse.x = undefined;
      mouse.y = undefined;
    }
  });

  // Mobile touch handling - minimalist reaction
  window.addEventListener('touchstart', (event) => {
    const rect = canvas.getBoundingClientRect();
    if (event.touches[0].clientY <= rect.bottom) {
      mouse.x = event.touches[0].clientX;
      mouse.y = event.touches[0].clientY - rect.top;
    }
  });

  window.addEventListener('resize', handleResize);

  handleResize();
  animate();
}

// 09. Summary Peek Logic
function initSummaryPeek() {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const targets = document.querySelectorAll('[data-summary]');
  if (!targets.length) return;

  const bubble = document.createElement('div');
  bubble.className = 'summary-bubble';
  document.body.appendChild(bubble);

  let activeTarget = null;
  let mouseX = 0;
  let mouseY = 0;

  function updatePosition() {
    const offset = 18;
    const bubbleRect = bubble.getBoundingClientRect();

    let x = mouseX + offset;
    let y = mouseY + offset;

    // Check boundary overflows
    if (x + bubbleRect.width > window.innerWidth - 12) {
      x = mouseX - bubbleRect.width - offset;
    }

    if (y + bubbleRect.height > window.innerHeight - 12) {
      y = mouseY - bubbleRect.height - offset;
    }

    bubble.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  function showBubble(target) {
    const summary = target.getAttribute('data-summary');
    if (!summary) return;

    activeTarget = target;
    bubble.textContent = summary;
    bubble.classList.add('is-visible');
    updatePosition();
  }

  function hideBubble() {
    activeTarget = null;
    bubble.classList.remove('is-visible');
  }

  targets.forEach((target) => {
    target.classList.add('summary-peek');

    if (!target.hasAttribute('tabindex')) {
      target.setAttribute('tabindex', '0');
    }

    target.addEventListener('mouseenter', (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      showBubble(target);
    });

    target.addEventListener('mousemove', (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      if (activeTarget) updatePosition();
    });

    target.addEventListener('mouseleave', hideBubble);

    target.addEventListener('focus', () => {
      const rect = target.getBoundingClientRect();
      mouseX = rect.left + rect.width / 2;
      mouseY = rect.top + 12;
      showBubble(target);
    });

    target.addEventListener('blur', hideBubble);
  });
}
