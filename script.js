/* 박주은 Portfolio — script.js */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initReveal();
  initSmoothScroll();
  initCopyEmail();
  initNotionModals();
  initTechFilter();
  initScrollEffects();
});

/* ── MOBILE NAV TOGGLE ── */
function initNav() {
  // Floating glassmorphism pill is styling-only, no toggle state needed
}

/* ── SCROLL REVEAL (FADE-UP) ── */
function initReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal, .reveal-parent, .reveal-section').forEach(el => el.classList.add('on'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { 
        e.target.classList.add('on'); 
        io.unobserve(e.target); 
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal, .reveal-parent, .reveal-section').forEach(el => io.observe(el));
}

/* ── SCROLL INTERACTION & PARALLAX EFFECT ── */
function initScrollEffects() {
  // Trigger Hero entrance immediately
  const hero = document.getElementById('hero');
  if (hero) {
    setTimeout(() => {
      hero.classList.add('active');
    }, 80);
  }

  const navPill = document.querySelector('.nav-pill');
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const mint = document.querySelector('.hero-blur-mint');
  const gray = document.querySelector('.hero-blur-gray');
  const heroTitle = document.querySelector('.hero-main-title');
  const heroBadge = document.querySelector('.hero-badge');
  const heroTags = document.querySelector('.hero-footer-tags');
  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Set active state on load
  const initialScrollY = window.pageYOffset;
  if (navPill && initialScrollY > 40) navPill.classList.add('scrolled');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Header glass style transition
    if (navPill) {
      if (scrollY > 40) {
        navPill.classList.add('scrolled');
      } else {
        navPill.classList.remove('scrolled');
      }
    }

    // ScrollSpy active link mapping
    let currentId = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 140;
      const height = sec.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }

    // Parallax background blurs and Hero texts
    if (!isReduced) {
      if (mint) mint.style.transform = `translateY(${scrollY * 0.05}px)`;
      if (gray) gray.style.transform = `translateY(${scrollY * -0.03}px)`;

      if (scrollY < 500) {
        if (heroTitle) {
          heroTitle.style.transform = `translateY(${scrollY * 0.12}px)`;
          heroTitle.style.opacity = `${1 - (scrollY * 0.0016)}`;
        }
        if (heroBadge) {
          heroBadge.style.transform = `translateY(${scrollY * 0.08}px)`;
          heroBadge.style.opacity = `${1 - (scrollY * 0.0016)}`;
        }
        if (heroTags) {
          heroTags.style.transform = `translateY(${scrollY * 0.15}px)`;
          heroTags.style.opacity = `${1 - (scrollY * 0.002)}`;
        }
      }
    }
  });
}

/* ── SMOOTH SCROLL FOR LINKS (Lenis Integrated) ── */
let lenis;
function initSmoothScroll() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', function(e) {
        const id = this.getAttribute('href');
        if (id === '#') return;
        e.preventDefault();
        const el = document.querySelector(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.pageYOffset - 70;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
    return;
  }

  // Initialize Lenis Smooth Scroll
  lenis = new Lenis({
    duration: 1.1,
    easing: (t) => 1 - Math.pow(1 - t, 3), // cubic ease out
    smoothWheel: true,
    wheelMultiplier: 0.85,
    lerp: 0.1,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Hash link smooth scrolling mapping via Lenis
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const id = this.getAttribute('href');
      if (id === '#') return;
      e.preventDefault();
      const el = document.querySelector(id);
      if (el) {
        lenis.scrollTo(el, {
          offset: -70,
          duration: 1.2,
          easing: (t) => 1 - Math.pow(1 - t, 3.5)
        });
      }
    });
  });
}

/* ── EMAIL COPY WITH FEEDBACK ── */
function initCopyEmail() {
  const btn = document.getElementById('copy-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    navigator.clipboard.writeText('pje698112@naver.com').then(() => {
      const orig = btn.textContent;
      btn.textContent = '✓ 복사됨';
      btn.style.cssText = 'background:var(--ac-s);color:var(--ac);border-color:var(--ac);';
      setTimeout(() => { 
        btn.textContent = orig; 
        btn.style.cssText = ''; 
      }, 2000);
    }).catch(() => {});
  });
}

/* ── NOTION PAGE STYLE MODAL CONTROLLER ── */
function initNotionModals() {
  const modal = document.getElementById('notion-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const modalButtons = document.querySelectorAll('.open-modal-btn');
  const contentTarget = document.getElementById('modal-content-target');

  if (!modal || !closeBtn || !contentTarget) return;

  // Render HTML based on Project Data
  function generateNotionModalHtml(project) {
    const coverBg = project.coverColor.startsWith('linear-gradient')
      ? `background: ${project.coverColor};`
      : `background-color: ${project.coverColor};`;

    let iconContainerHtml = '';
    if (project.icon) {
      if (project.icon.startsWith('http') || project.icon.endsWith('.png') || project.icon.endsWith('.jpg') || project.icon.endsWith('.svg')) {
        // Image Icon - remove white bg, padding, and shadow. Make it full size (80x80) and apply border-radius.
        iconContainerHtml = `
          <div class="notion-emoji" style="border-radius: 20px; overflow: hidden; background: transparent; padding: 0; box-shadow: none; border: none; width: 80px; height: 80px;">
            <img src="${project.icon}" alt="${project.title}" style="width: 100%; height: 100%; display: block; object-fit: cover; border-radius: 20px;">
          </div>
        `;
      } else {
        // Emoji Text Icon
        iconContainerHtml = `
          <div class="notion-emoji" style="background: transparent; padding: 0; box-shadow: none; border: none; font-size: 4.8rem;">
            ${project.icon}
          </div>
        `;
      }
    }

    let metadataRows = '';
    if (project.period) {
      metadataRows += `<div class="meta-row"><span class="meta-label">Period</span><span class="meta-val">${project.period}</span></div>`;
    }
    if (project.status) {
      metadataRows += `<div class="meta-row"><span class="meta-label">Status</span><span class="meta-val">${project.status}</span></div>`;
    }
    if (project.role && project.role.length > 0) {
      const rolePills = project.role.map(r => `<span class="meta-tag-pill">${r}</span>`).join('');
      metadataRows += `<div class="meta-row"><span class="meta-label">Role</span><span class="meta-val">${rolePills}</span></div>`;
    }
    if (project.stack && project.stack.length > 0) {
      const stackPills = project.stack.map(s => `<span class="meta-tag-pill">${s}</span>`).join('');
      metadataRows += `<div class="meta-row"><span class="meta-label">Stack</span><span class="meta-val">${stackPills}</span></div>`;
    }
    if (project.focus) {
      const focusPills = project.focus.split(',').map(f => `<span class="meta-tag-pill">${f.trim()}</span>`).join('');
      metadataRows += `<div class="meta-row"><span class="meta-label">Focus</span><span class="meta-val">${focusPills}</span></div>`;
    }

    let sectionsHtml = '';
    if (project.sections && project.sections.length > 0) {
      project.sections.forEach(sec => {
        let contentHtml = '';
        if (sec.type === 'paragraph') {
          contentHtml = `<p>${sec.content}</p>`;
        } else if (sec.type === 'list' && Array.isArray(sec.content)) {
          contentHtml = `<ul class="notion-bullet">${sec.content.map(li => `<li>${li}</li>`).join('')}</ul>`;
        } else if (sec.type === 'callout') {
          contentHtml = `
            <div class="notion-callout-block">
              <div class="callout-emoji">🔄</div>
              <div class="callout-text" style="font-weight: 500; letter-spacing: -0.01em;">
                ${sec.content}
              </div>
            </div>`;
        } else if (sec.type === 'table' && Array.isArray(sec.content)) {
          contentHtml = `<table class="notion-table">
            ${sec.content.map(row => `<tr><td>${row.label}</td><td>${row.value}</td></tr>`).join('')}
          </table>`;
        }

        sectionsHtml += `
          <div class="notion-block">
            <h2># ${sec.heading}</h2>
            ${contentHtml}
          </div>
        `;
      });
    }

    let linksHtml = '';
    if (project.links && project.links.length > 0) {
      linksHtml += `
        <div class="notion-block">
          <h2># Links</h2>
          <div style="margin-top: 8px;">
            ${project.links.map(link => `<a href="${link.url}" target="_blank" rel="noopener" class="notion-link-pill">${link.label} ↗</a>`).join(' ')}
          </div>
        </div>
      `;
    }

    return `
      <div class="notion-modal-content">
        <div class="notion-header-bg" style="${coverBg}"></div>
        <div class="notion-body">
          ${iconContainerHtml}
          <h1 class="notion-title" style="margin-top: 12px;">${project.title}</h1>
          ${project.subtitle ? `<p class="notion-subtitle">${project.subtitle}</p>` : ''}
          
          <div class="notion-metadata">
            ${metadataRows}
          </div>

          <div class="notion-page-divider"></div>

          ${sectionsHtml}
          ${linksHtml}
        </div>
      </div>
    `;
  }

  // Open Modal
  modalButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // If user clicked inside a links container, do not trigger modal
      if (e.target.closest('a') && !e.target.classList.contains('open-modal-btn')) {
        return;
      }
      
      const projectKey = btn.getAttribute('data-project');
      if (!projectKey) return;

      // Find project details in projectsData array
      const project = projectsData.find(p => p.id === projectKey);
      if (!project) return;

      // Inject generated dynamic HTML
      contentTarget.innerHTML = generateNotionModalHtml(project);

      // Open overlay & set overflow
      modal.classList.add('active');
      document.body.classList.add('modal-open');
      if (lenis) lenis.stop(); // Stop background scroll
      
      // Reset scroll position inside modal wrap
      const scrollWrap = modal.querySelector('.notion-modal-scroll-wrap');
      if (scrollWrap) {
        scrollWrap.scrollTop = 0;
      }
    });
  });

  // Close Modal Function
  const closeModal = () => {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
    if (lenis) lenis.start(); // Resume background scroll
    setTimeout(() => {
      contentTarget.innerHTML = ''; // Clean up RAM
    }, 300);
  };

  closeBtn.addEventListener('click', closeModal);

  // Close when clicking overlay (outside container)
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ── TECH STACK FILTER ── */
function initTechFilter() {
  const buttons = document.querySelectorAll('.tech-filter-btn');
  const items = document.querySelectorAll('.tech-item');

  if (buttons.length === 0 || items.length === 0) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // 1. Toggle active button style
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // 2. Elastic out-fade first
      const filterValue = btn.getAttribute('data-filter');

      items.forEach(item => {
        item.style.transition = 'opacity 0.2s cubic-bezier(0.22, 1, 0.36, 1), transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)';
        item.style.opacity = '0';
        item.style.transform = 'scale(0.92)';
      });

      // 3. Render and pop-in new category
      setTimeout(() => {
        items.forEach(item => {
          const itemCategory = item.getAttribute('data-category');
          if (filterValue === 'all' || itemCategory === filterValue) {
            item.classList.remove('hide');
            item.classList.remove('show-pop');
            
            // Force browser reflow
            void item.offsetWidth;
            item.classList.add('show-pop');
          } else {
            item.classList.add('hide');
            item.classList.remove('show-pop');
          }
        });
        
        // Clean inline override to preserve hover animations
        setTimeout(() => {
          items.forEach(item => {
            item.style.transition = '';
            item.style.opacity = '';
            item.style.transform = '';
          });
        }, 300);
      }, 150);
    });
  });
}

