/* 
  Park Ju-eun Portfolio: Signature Brand Logic
  Focus: Subtle, Professional, Content-First Interactions
*/

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initSignatureVisual();
  initSmoothScroll();
});

// 1. Navbar: Smart Transparency & Glassmorphism
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileMenu = document.getElementById('mobile-menu');
  const nav = document.querySelector('nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  });

  mobileMenu?.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    mobileMenu.classList.toggle('toggle-active');
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav-active');
      mobileMenu?.classList.remove('toggle-active');
    });
  });
}

// 2. Scroll Reveal: Staggered Fade-In
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  reveals.forEach(el => observer.observe(el));
}

// 3. Signature Visual: Subtle Eye Interaction
function initSignatureVisual() {
  const visual = document.querySelector('.visual-wrapper');
  if (!visual) return;

  window.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = visual.getBoundingClientRect();
    
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const moveX = (clientX - centerX) / 25;
    const moveY = (clientY - centerY) / 25;

    visual.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
}

// 4. Smooth Scroll for Anchor Links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetHash = this.getAttribute('href');
      if (targetHash === '#') return;
      const target = document.querySelector(targetHash);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
}
