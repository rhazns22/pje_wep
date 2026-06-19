/**
 * CopyEmailButton Component (Vanilla State-Driven Class)
 */
class CopyEmailButton {
  constructor(containerSelector, email) {
    this.container = document.querySelector(containerSelector);
    this.email = email;
    if (!this.container) return;

    // Component State
    this.state = {
      copied: false,
      feedbackText: '',
      particles: [],
      isBursting: false,
      showBubble: false
    };

    this.bubbleTimeout1 = null;
    this.bubbleTimeout2 = null;

    this.init();
  }

  setState(nextState) {
    this.state = { ...this.state, ...nextState };
    this.render();
  }

  init() {
    this.renderHTML();
    this.bindEvents();
    this.render();
  }

  renderHTML() {
    // Generate inner elements dynamically
    this.container.innerHTML = `
      <button class="copy-glass-btn" id="copy-btn-comp" aria-label="이메일 주소 복사">
        <span class="btn-content-wrap">
          <span class="btn-text-default">이메일 복사</span>
          <span class="btn-text-success">
            <svg class="check-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>복사 완료</span>
          </span>
        </span>
      </button>
      <div id="copy-aria-status-comp" class="sr-only" aria-live="polite"></div>
      <div class="copy-feedback-bubble" id="copy-bubble-comp"></div>
      <div class="particles-container" id="particles-container-comp" style="position: absolute; inset: 0; pointer-events: none; overflow: visible; z-index: 99;"></div>
    `;

    this.button = this.container.querySelector('#copy-btn-comp');
    this.bubble = this.container.querySelector('#copy-bubble-comp');
    this.ariaStatus = this.container.querySelector('#copy-aria-status-comp');
    this.particlesContainer = this.container.querySelector('#particles-container-comp');
  }

  bindEvents() {
    this.button.addEventListener('click', () => this.handleCopy());
  }

  handleCopy() {
    navigator.clipboard.writeText(this.email)
      .then(() => {
        // Success state and launch particles
        const nextParticles = this.generateParticles();

        this.setState({
          copied: true,
          feedbackText: '혹시, 저와 좋은 인연이 시작되는 건가요?',
          particles: nextParticles,
          isBursting: true,
          showBubble: true
        });

        // 1.6s transition
        clearTimeout(this.bubbleTimeout1);
        this.bubbleTimeout1 = setTimeout(() => {
          this.setState({
            feedbackText: '이메일이 복사되었습니다.',
            isBursting: false
          });
        }, 1600);

        // 3.0s dismiss bubble
        clearTimeout(this.bubbleTimeout2);
        this.bubbleTimeout2 = setTimeout(() => {
          this.setState({
            showBubble: false,
            copied: false
          });
        }, 3000);
      })
      .catch(() => {
        // Failure state
        this.setState({
          copied: false,
          feedbackText: '복사에 실패했습니다. 이메일을 직접 확인해주세요.',
          showBubble: true
        });

        clearTimeout(this.bubbleTimeout2);
        this.bubbleTimeout2 = setTimeout(() => {
          this.setState({ showBubble: false });
        }, 3000);
      });
  }

  generateParticles() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return [];

    const particleCount = Math.floor(Math.random() * 9) + 12; // 12~20
    const colors = ['#12B886', '#191f28', '#ccd2d8'];
    const newParticles = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.random() * 120 + 210) * (Math.PI / 180); // Upward angle (210 to 330 deg)
      const distance = Math.random() * 45 + 20; // 20px ~ 65px
      const scale = Math.random() * 0.6 + 0.6; // 0.6 ~ 1.2
      const opacity = Math.random() * 0.4 + 0.6; // 0.6 ~ 1.0
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      const color = colors[Math.floor(Math.random() * colors.length)];

      newParticles.push({
        id: Math.random().toString(36).substr(2, 9),
        color,
        tx,
        ty,
        scale,
        opacity
      });
    }
    return newParticles;
  }

  render() {
    // 1. Update button class for rolling animation
    if (this.state.copied) {
      this.button.classList.add('copied');
    } else {
      this.button.classList.remove('copied');
    }

    // 2. Update feedback bubble text and visibility
    this.bubble.textContent = this.state.feedbackText;
    if (this.state.showBubble) {
      this.bubble.classList.add('show');
    } else {
      this.bubble.classList.remove('show');
    }

    // 3. Accessibility announcement
    if (this.ariaStatus) {
      this.ariaStatus.textContent = this.state.feedbackText;
    }

    // 4. Update particles inside the container
    this.particlesContainer.innerHTML = '';
    if (this.state.isBursting && this.state.particles.length > 0) {
      this.state.particles.forEach(p => {
        const span = document.createElement('span');
        span.className = 'copy-particle';
        span.style.backgroundColor = p.color;
        span.style.left = '50%';
        span.style.top = '50%';
        span.style.opacity = p.opacity;
        span.style.setProperty('--tx', `${p.tx}px`);
        span.style.setProperty('--ty', `${p.ty}px`);
        span.style.setProperty('--scale', p.scale);
        span.style.setProperty('--opacity', p.opacity);
        
        // Random slight animation delay for realistic burst feeling
        const delay = Math.random() * 60;
        span.style.animationDelay = `${delay}ms`;

        this.particlesContainer.appendChild(span);
      });
    }
  }
}
