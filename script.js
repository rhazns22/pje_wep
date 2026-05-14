/* 
  박주은 Portfolio Refined Interactivity
  Stable version with Splash Intro & Compact UI
*/

document.addEventListener('DOMContentLoaded', () => {
  initSplash();
  initNavbar();
  initTyping();
  initScrollReveal();
  initProjectInteractions();
  initSkillGlow();
  initSmoothScroll();
  initBackgroundGlow();
  initCustomCursor();
  initParticles();
  initHeroMorph();
  initProcessAnimation();
});

// 00. Custom Cursor Logic
function initCustomCursor() {
  const dot = document.getElementById('cursor-dot');
  const outline = document.getElementById('cursor-outline');
  if (!dot || !outline || !window.matchMedia('(pointer: fine)').matches) return;

  window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    dot.style.left = `${posX}px`;
    dot.style.top = `${posY}px`;

    // Delay the outline slightly for a trailing effect
    outline.animate({
      left: `${posX}px`,
      top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
  });

  // Hover effect for interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .project-card, .exp-card, .skill-item');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => outline.classList.add('hover'));
    el.addEventListener('mouseleave', () => outline.classList.remove('hover'));
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

// 1. Splash Intro Logic (JU EUN PARK OS Boot Sequence)
function initSplash() {
  const splash = document.getElementById('splash-screen');
  const enterBtn = document.getElementById('enter-portfolio');
  if (!splash) return;

  // DEVELOPMENT TIP: sessionStorage.removeItem('splashPlayed'); to reset
  if (sessionStorage.getItem('splashPlayed')) {
    splash.style.display = 'none';
    document.body.style.overflow = 'auto';
    return;
  }

  // Prevent scroll during boot
  document.body.style.overflow = 'hidden';

  const statusItems = splash.querySelectorAll('.status-item');
  const readyMsg = splash.querySelector('.splash-ready');
  const btn = splash.querySelector('.splash-enter');

  // Staggered status line reveal
  statusItems.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add('active');
      
      // Show ready state after all lines loaded
      if (index === statusItems.length - 1) {
        setTimeout(() => {
          if (readyMsg) readyMsg.classList.add('visible');
          if (btn) btn.classList.add('visible');
        }, 400);
      }
    }, index * 220 + 200);
  });

  const closeSplash = () => {
    splash.style.opacity = '0';
    splash.style.visibility = 'hidden';
    document.body.style.overflow = 'auto';
    setTimeout(() => {
      splash.style.display = 'none';
      sessionStorage.setItem('splashPlayed', 'true');
    }, 600);
  };

  // Manual close
  enterBtn?.addEventListener('click', closeSplash);

  // Keyboard close (ESC)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSplash();
    }
  });

  // Fallback auto-close (max wait)
  setTimeout(() => {
    if (splash.style.display !== 'none') {
      // We don't force close if user hasn't clicked, 
      // but if something stalls, we ensure it can't block forever.
    }
  }, 5000);
}

// 2. Navbar Logic
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileMenu = document.getElementById('mobile-menu');
  const nav = document.querySelector('nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.top = '10px';
      navbar.style.background = 'rgba(10, 10, 12, 0.95)';
    } else {
      navbar.style.top = '20px';
      navbar.style.background = 'var(--glass-bg)';
    }
  });

  mobileMenu.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav-active');
    });
  });
}

// 3. Typing Animation
function initTyping() {
  const textElement = document.getElementById('typing-text');
  if (!textElement) return;
  const phrases = ['Fullstack Developer', 'Product Builder', 'UI Engineer'];
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
