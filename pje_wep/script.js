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

// 1. Splash Intro Logic
function initSplash() {
  const splash = document.getElementById('splash-screen');
  const skipBtn = document.getElementById('skip-splash');
  if (!splash) return;

  // sessionStorage logic - Uncomment to enable in production
  // if (sessionStorage.getItem('splashPlayed')) {
  //   splash.style.display = 'none';
  //   return;
  // }

  const closeSplash = () => {
    splash.style.opacity = '0';
    splash.style.transform = 'translateY(-8px)';
    setTimeout(() => {
      splash.style.display = 'none';
      // sessionStorage.setItem('splashPlayed', 'true');
    }, 800);
  };

  // Auto close after 2.3s
  const autoCloseTimeout = setTimeout(closeSplash, 2300);

  // Manual close
  skipBtn?.addEventListener('click', () => {
    clearTimeout(autoCloseTimeout);
    closeSplash();
  });

  // ESC key close
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      clearTimeout(autoCloseTimeout);
      closeSplash();
    }
  });
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
  const reveals = document.querySelectorAll('.reveal');
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Reveal only once
      }
    });
  }, observerOptions);

  reveals.forEach(reveal => observer.observe(reveal));
}

// 5. Project Card Interactions (Tilt & Hover) - Optimized for Performance
function initProjectInteractions() {
  if (!window.matchMedia('(pointer: fine)').matches) return;
  
  const cards = document.querySelectorAll('.project-card.compact');
  
  cards.forEach(card => {
    let rect;
    let rafId;
    
    card.addEventListener('mouseenter', () => {
      rect = card.getBoundingClientRect();
      card.classList.add('tilting');
    });
    
    card.addEventListener('mousemove', (e) => {
      if (!rect) return;
      if (rafId) cancelAnimationFrame(rafId);
      
      rafId = requestAnimationFrame(() => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (centerY - y) / 30; // Further softened
        const rotateY = (x - centerX) / 30;
        
        card.style.transform = `perspective(1000px) translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
    });
    
    card.addEventListener('mouseleave', () => {
      if (rafId) cancelAnimationFrame(rafId);
      card.classList.remove('tilting');
      card.style.transform = `perspective(1000px) translateY(0) rotateX(0) rotateY(0)`;
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
