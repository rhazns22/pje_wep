/**
 * WebsitePreviewModal - Vanilla JS Component
 * 
 * Props:
 * @param {Object} props
 * @param {string|null} props.url
 * @param {string} [props.title="앱 소개 홈페이지 미리보기"]
 * @param {Function} props.onClose
 */
class WebsitePreviewModal {
  constructor(props) {
    this.url = props.url;
    this.title = props.title || "앱 소개 홈페이지 미리보기";
    this.onClose = props.onClose;
    this.modalEl = null;
    this.savedScrollY = 0;
    this.escHandler = null;

    if (this.url) {
      this.render();
    }
  }

  render() {
    this.destroy();

    const overlay = document.createElement('div');
    overlay.id = 'website-preview-modal';
    overlay.className = 'preview-modal-overlay';
    
    overlay.innerHTML = `
      <div class="preview-modal-container">
        <div class="preview-modal-header">
          <div class="preview-modal-header-left">
            <span class="preview-modal-title">${this.title}</span>
          </div>
          <div class="preview-modal-header-right">
            <a href="${this.url}" target="_blank" rel="noopener" class="preview-modal-action-btn">
              새 탭에서 열기
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 4px; display: inline-block; vertical-align: middle;">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
            <button class="preview-modal-close-btn" type="button">닫기</button>
          </div>
        </div>
        <div class="preview-modal-body">
          <iframe src="${this.url}" title="${this.title}" class="preview-modal-iframe" frameborder="0"></iframe>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    this.modalEl = overlay;

    // Lock page background scrolling
    this.savedScrollY = window.scrollY;
    document.body.classList.add('modal-open');
    if (window.lenis) window.lenis.stop();

    // Trigger visual fade-in
    requestAnimationFrame(() => {
      overlay.classList.add('active');
    });

    this.bindEvents();
  }

  bindEvents() {
    const closeBtn = this.modalEl.querySelector('.preview-modal-close-btn');
    
    // Close button click
    closeBtn.addEventListener('click', () => this.close());

    // Click outside container to close
    this.modalEl.addEventListener('click', (e) => {
      if (e.target === this.modalEl) {
        this.close();
      }
    });

    // ESC keypress listener
    this.escHandler = (e) => {
      if (e.key === 'Escape') {
        this.close();
      }
    };
    window.addEventListener('keydown', this.escHandler);
  }

  close() {
    if (!this.modalEl) return;

    this.modalEl.classList.remove('active');
    document.body.classList.remove('modal-open');
    
    if (window.lenis) {
      window.lenis.start();
      window.lenis.scrollTo(this.savedScrollY, { immediate: true });
    } else {
      window.scrollTo(0, this.savedScrollY);
    }

    // Delay destruction to allow CSS transition to finish
    setTimeout(() => {
      this.destroy();
      if (this.onClose) this.onClose();
    }, 280);
  }

  destroy() {
    const existing = document.getElementById('website-preview-modal');
    if (existing) {
      existing.remove();
    }
    if (this.escHandler) {
      window.removeEventListener('keydown', this.escHandler);
      this.escHandler = null;
    }
  }
}
