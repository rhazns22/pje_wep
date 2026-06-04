/* 
  박주은 Portfolio - Blueprint & Pipeline Engine
  Vanilla JavaScript Interactivity Engine (Lightweight Version)
*/

// Remove no-js and add js to html element instantly
document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  initHeroVideo();
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
  initHeroMorph();
  initTechTabs();
});

/*
  [00. Hero Video Autoplay Management]
  - 비디오 자동재생 및 브라우저 미디어 정책 충돌 우회를 위한 책임 전담 장치입니다.
  - 일시정지, 브라우저 백그라운드 전환, 페이지 쇼 등의 이벤트를 감시하여 재생을 안정적으로 유지합니다.
*/
function initHeroVideo() {
  const video = document.querySelector('.custom-video-bg');
  if (!video) return;

  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.loop = true;

  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');
  video.setAttribute('loop', '');

  const tryPlay = () => {
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          video.classList.remove('video-fallback');
          video.dataset.autoplayBlocked = 'false';
        })
        .catch(() => {
          // 자동재생 차단은 파일 오류가 아니므로 비디오를 숨기지 않는다.
          video.dataset.autoplayBlocked = 'true';
        });
    }
  };

  video.addEventListener('loadeddata', () => {
    video.classList.remove('video-fallback');
  });

  video.addEventListener('canplay', () => {
    video.classList.remove('video-fallback');
  });

  video.addEventListener('playing', () => {
    video.classList.remove('video-fallback');
    video.dataset.autoplayBlocked = 'false';
    console.log('[HeroVideo] playing');
  });

  video.addEventListener('pause', () => {
    // pause만으로 fallback 처리하지 않는다.
    console.log('[HeroVideo] pause');
    if (!document.hidden && !video.ended) {
      setTimeout(tryPlay, 300);
    }
  });

  video.addEventListener('error', () => {
    // 실제 파일 로드/디코딩 오류일 때만 숨긴다.
    console.log('[HeroVideo] error');
    video.classList.add('video-fallback');
  });

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) tryPlay();
  });

  window.addEventListener('pageshow', tryPlay);
  window.addEventListener('click', tryPlay, { once: true, passive: true });
  window.addEventListener('touchstart', tryPlay, { once: true, passive: true });

  // 비디오가 처음부터 끊김 없이 항시 재생되도록 시작
  tryPlay();

  // 패럴랙스(움직임) 및 스크롤 연동 투명도 제어 함수
  const handleScroll = () => {
    const scrollY = window.scrollY;

    // 1. 패럴랙스: 기기 높이(Viewport Height)에 맞추어 유동적으로 스크롤 짤림을 방지
    // scale(1.2)로 상하 10%의 여유 마진을 확보하고, 최대 위로 이동하는 한계값을 4%(-4vh)로 고정하여 절대 잘리지 않도록 설계
    const translateY = Math.max(-4, -scrollY * 0.015);
    video.style.transform = `scale(1.2) translateY(${translateY}vh)`;

    // 2. 스크롤 연동 페이드: 사용자가 아래로 스크롤할수록 비디오를 점점 어둡게 만들어 콘텐츠에 몰입할 수 있도록 유도
    // 최상단(scrollY=0)에서는 0.15로 밝기를 유지하고, 800px에 걸쳐 0.03까지 부드럽게 낮아져 매우 깊고 은은한 백그라운드로 전환됩니다.
    const fadeProgress = Math.min(1, scrollY / 800);
    const targetOpacity = 0.15 - (fadeProgress * 0.12);
    video.style.opacity = targetOpacity;
  };

  window.addEventListener('scroll', () => {
    requestAnimationFrame(handleScroll);
  }, { passive: true });

  // 초기 렌더링 시점에 한 번 동작
  handleScroll();
}

/*
  [01. Custom Cursor Logic]
  - 마우스처럼 정밀한 포인터가 있는 환경(PC)에서만 커스텀 커서를 실행합니다.
  - 텍스트 위에 올라가면 읽기 모드(cursor-reading), 버튼/링크/카드 위에 올라가면 액션 모드(cursor-action)로 전환합니다.
*/
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

  // 읽기 타겟 클래스 지정
  const readableSelector = [
    'p',
    'li',
    '.section-subtitle',
    '.project-brief',
    '.log-desc',
    '.contact-prompt-panel p'
  ].join(',');

  const actionSelector = [
    'a',
    'button',
    '.btn',
    '.btn-pill',
    '.console-link',
    '.logo',
    '.menu-toggle',
    '.project-blueprint-card'
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

/*
  [02. Background Mouse Glow]
  - 마우스 위치를 CSS 변수 --mouse-x, --mouse-y에 전달하여 미세한 레이저 글로우 배경을 적용합니다.
*/
function initBackgroundGlow() {
  const glow = document.getElementById('mouse-glow');
  if (!glow || !window.matchMedia('(pointer: fine)').matches) return;

  window.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
  });
}

/*
  [03. Splash Intro Logic]
  - 무거운 canvas 파티클 렌더링을 걷어내고, 가벼운 텍스트 부팅 시퀀스로 리팩토링했습니다.
  - 세션 스토리지를 활용해 동일 탭에서는 중복 재생을 안정적으로 차단합니다.
*/
function initSplash() {
  const splash = document.getElementById('splash');
  if (!splash) return;

  const enterBtn = document.getElementById('enter-portfolio');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const alreadySeen = sessionStorage.getItem('portfolioSplashSeen') === 'true';

  if (alreadySeen) {
    skipSplash();
    return;
  }

  document.body.classList.add('is-splash-open');

  function skipSplash() {
    splash.classList.add('is-hidden');
    document.body.classList.remove('is-splash-open');
    document.body.classList.add('splash-complete');
    const mainContent = document.getElementById('main-content');
    if (mainContent) mainContent.classList.add('is-visible');
  }

  function startLaunch() {
    splash.classList.add('is-hidden');
    document.body.classList.remove('is-splash-open');
    document.body.classList.add('splash-complete');
    const mainContent = document.getElementById('main-content');
    if (mainContent) mainContent.classList.add('is-visible');
    sessionStorage.setItem('portfolioSplashSeen', 'true');
  }

  if (prefersReducedMotion) {
    skipSplash();
    return;
  }

  // 버튼 클릭 시 포트폴리오 진입
  if (enterBtn) {
    enterBtn.addEventListener('click', startLaunch);
  }

  // ESC 또는 Enter 키 입력 시 포트폴리오 진입
  window.addEventListener('keydown', (e) => {
    if ((e.key === 'Escape' || e.key === 'Enter') && sessionStorage.getItem('portfolioSplashSeen') !== 'true') {
      startLaunch();
    }
  });

  // 1.5초 후 자동 진입 처리 (사용자 경험 향상)
  setTimeout(() => {
    if (sessionStorage.getItem('portfolioSplashSeen') !== 'true') {
      startLaunch();
    }
  }, 1500);
}

/*
  [04. Header Scroll Navigation]
  - 스크롤 이동 시 헤더 네비게이션바의 노출 상태를 자연스럽게 제어합니다.
*/
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

    if (currentScrollY <= 20) {
      header.classList.remove('is-hidden', 'is-scrolled');
      header.classList.add('is-visible');
      lastScrollY = currentScrollY;
      ticking = false;
      return;
    }

    header.classList.add('is-scrolled');

    if (Math.abs(scrollDelta) > threshold) {
      if (scrollDelta > 0 && !isNavActive) {
        header.classList.add('is-hidden');
        header.classList.remove('is-visible');
      } else {
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

  if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
      const isActive = header.classList.toggle('nav-active');
      mobileMenu.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });
  }

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      header.classList.remove('nav-active');
      if (mobileMenu) {
        mobileMenu.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

/*
  [05. Typing Text Animation]
  - Hero 타이틀 내 박주은 개발자의 핵심 정체성을 교차 루핑 타이핑합니다.
*/
function initTyping() {
  const textElement = document.getElementById('typing-text');
  if (!textElement) return;
  const phrases = ['Frontend Engineer', 'Product Builder', 'UI Developer'];
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

/*
  [06. Scroll Reveal IntersectionObserver]
  - 요소가 화면 뷰포트에 도달했을 때 클래스 활성화를 통해 가벼운 리빌 연출을 트리거합니다.
*/
function initScrollReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal, .stagger-item').forEach(el => el.classList.add('active'));
    return;
  }

  const reveals = document.querySelectorAll('.reveal');
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
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

/*
  [07. Subtle Hero Morph]
  - 스크롤 높이에 따라 Hero 본문을 은은하게 페이드 처리하여 가속 스크롤 안정감을 줍니다.
*/
function initHeroMorph() {
  const heroContent = document.querySelector('.hero-content');
  const gridBg = document.querySelector('.grid-bg');

  if (!heroContent) return;

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const opacity = Math.max(0, 1 - scrollY / 1000);
    const scale = Math.max(0.98, 1 - scrollY / 9000);
    const translateY = scrollY * 0.1;

    heroContent.style.opacity = opacity;
    heroContent.style.transform = `translateY(${translateY}px) scale(${scale})`;

    if (gridBg) gridBg.style.opacity = 0.2 + (opacity * 0.6);
  };

  window.addEventListener('scroll', () => {
    requestAnimationFrame(handleScroll);
  }, { passive: true });
}

/*
  [08. Subtle 3D Tilt for Project Cards]
  - 프로젝트 카드에 마우스 호버 시 미세한 입체감(Divisor: 85)을 제공해 클릭 유도를 유기적으로 돕습니다.
*/
function initProjectInteractions() {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const cards = document.querySelectorAll('.project-blueprint-card');

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

        const rotateX = (centerY - y) / 85;
        const rotateY = (x - centerX) / 85;

        card.style.transform = `perspective(2000px) translateY(-4px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
    });

    card.addEventListener('mouseleave', () => {
      if (rafId) cancelAnimationFrame(rafId);
      card.style.transform = `perspective(2000px) translateY(0) rotateX(0) rotateY(0)`;
      rect = null;
    });
  });
}

/*
  [09. Skill Element Interaction]
  - 파이프라인 노드 및 기술 영역 위 호버 시 민트 하이라이트를 연출합니다.
*/
function initSkillGlow() {
  const elements = document.querySelectorAll('.pipeline-node, .flow-step');
  elements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      el.style.boxShadow = '0 0 12px var(--accent-primary)';
      el.style.borderColor = 'var(--accent-primary)';
    });
    el.addEventListener('mouseleave', () => {
      el.style.boxShadow = 'none';
      el.style.borderColor = 'var(--glass-border)';
    });
  });
}

/*
  [10. Pure Smooth Anchor Scroll]
  - 링크 이동 시 헤더 오프셋을 공제한 자연스러운 점프 없는 스무스 스크롤을 적용합니다.
*/
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

/*
  [11. Summary Peek Hover Bubble]
  - data-summary 데이터를 지닌 노드 위에 마우스 오버 시 가볍고 섬세한 툴팁을 출력합니다.
*/
function initSummaryPeek() {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const targets = document.querySelectorAll('[data-summary], .flow-step, .pipeline-node');
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

// Copy Email Logic
document.addEventListener('DOMContentLoaded', () => {
  const copyBtn = document.getElementById('copy-email-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = 'pje698112@naver.com';
      navigator.clipboard.writeText(email).then(() => {
        const originalText = copyBtn.innerText;
        copyBtn.innerText = '✓ Copied';
        copyBtn.style.borderColor = 'var(--accent-primary)';
        copyBtn.style.color = 'var(--accent-primary)';
        
        setTimeout(() => {
          copyBtn.innerText = originalText;
          copyBtn.style.borderColor = '';
          copyBtn.style.color = '';
        }, 1500);
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    });
  }
});

/*
  [12. Tech Evidence Tabs]
  - Detailed Tech Evidence 내 5개의 카드 탭을 전환합니다.
*/
function initTechTabs() {
  const tabs = document.querySelectorAll('.tech-evidence-tabs .tab-btn');
  const panes = document.querySelectorAll('.tech-evidence-tabs .tab-pane');
  if (!tabs.length || !panes.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');
      tabs.forEach(t => t.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPane = document.getElementById(target);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });
}
