/* 
  박주은 Portfolio Advanced Interactivity
*/

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initTyping();
  initScrollReveal();
  initMagneticButtons();
  initEnhancedCursor();
  initScrollProgress();
  initParallax();
  initToast();
  initModal();
  initLazyLoading();
});

// 1. Navbar Logic
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileMenu = document.getElementById('mobile-menu');
  const nav = document.querySelector('nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.top = '10px';
      navbar.style.background = 'rgba(10, 10, 12, 0.9)';
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

// 2. Typing Animation
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

// 3. Scroll Reveal Animation
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);
  reveals.forEach(reveal => observer.observe(reveal));
}

// 4. Enhanced Custom Cursor
function initEnhancedCursor() {
  const dot = document.getElementById('cursor-dot');
  const outline = document.getElementById('cursor-outline');
  if (!dot || !outline) return;

  if (window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      const posX = e.clientX;
      const posY = e.clientY;

      dot.style.left = `${posX}px`;
      dot.style.top = `${posY}px`;

      outline.animate({
        left: `${posX}px`,
        top: `${posY}px`
      }, { duration: 500, fill: "forwards" });
    });

    document.querySelectorAll('a, button, .contact-item, .project-card').forEach(el => {
      el.addEventListener('mouseenter', () => outline.classList.add('hover'));
      el.addEventListener('mouseleave', () => outline.classList.remove('hover'));
    });
  } else {
    dot.style.display = 'none';
    outline.style.display = 'none';
  }
}

// 5. Scroll Progress Bar
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (windowScroll / height) * 100;
    if (progressBar) progressBar.style.width = scrolled + "%";
  });
}

// 6. Parallax Effect
function initParallax() {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    // Hero Parallax
    const heroContent = document.querySelector('.hero-container');
    if (heroContent) {
      heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
      heroContent.style.opacity = 1 - (scrolled / 700);
    }
    
    // Blob Parallax
    const blob = document.querySelector('.blob-bg');
    if (blob) {
      blob.style.transform = `translateY(${scrolled * 0.15}px)`;
    }
  });
}

// 7. Toast Notifications
function showToast(message) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

function initToast() {
  document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('준비 중인 서비스입니다.');
    });
  });
  
  const emailLink = document.querySelector('a[href^="mailto:"]');
  if (emailLink) {
    emailLink.addEventListener('click', (e) => {
      showToast('pje698112@naver.com');
    });
  }
}

// 8. Modal System
function initModal() {
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  const closeBtn = document.querySelector('.modal-close');
  const overlay = document.querySelector('.modal-overlay');

  function openModal(content) {
    modalBody.innerHTML = content;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  // Example: Attach modal to project cards
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') return;
      const title = card.querySelector('h3').textContent;
      const summary = card.querySelector('.summary').textContent;
      const caseStudy = card.querySelector('.case-study').innerHTML;
      
      const content = `
        <h2 style="font-size: 2.5rem; margin-bottom: 10px;">${title}</h2>
        <p style="color: var(--accent-secondary); margin-bottom: 20px;">${summary}</p>
        <div style="margin-top: 30px;">${caseStudy}</div>
      `;
      openModal(content);
    });
  });
}

// 10. Magnetic Buttons (PC Only)
function initMagneticButtons() {
  if (window.matchMedia('(pointer: fine)').matches) {
    const magnets = document.querySelectorAll('.magnetic');
    magnets.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = `translate(0px, 0px)`;
      });
    });
  }
}

// 9. Lazy Loading
function initLazyLoading() {
  const images = document.querySelectorAll('img');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        // If we had data-src, we would swap it here
        // img.src = img.dataset.src;
        img.classList.add('fade-in');
        observer.unobserve(img);
      }
    });
  });
  images.forEach(img => imageObserver.observe(img));
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});
