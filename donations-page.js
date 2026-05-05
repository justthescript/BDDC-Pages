/**
 * <bddc-donations> — Wix Studio Custom Element
 * Big Dogs Don't Cry Animal Rescue — Donations Page
 *
 * Usage in Wix Studio:
 *   1. Add a Custom Element to /donations
 *   2. Server URL: https://cdn.jsdelivr.net/gh/justthescript/BDDC-Pages@main/bddc-donations.js
 *   3. Tag Name:   bddc-donations
 *   4. (Optional)  data-hero-image
 */

(function () {
  const DEFAULT_HERO_IMAGE =
    'https://static.wixstatic.com/media/bc59b6_604fb6f09a314f219daf30e354c81e5a~mv2.webp';

  const PAW_ICON_URL =
    'https://static.wixstatic.com/media/bc59b6_45db072b49a5427f930919d18683e36d~mv2.png';

  // Donation method config — keeps platform brand colors for instant recognition
  const METHODS = [
    {
      id: 'zeffy',
      name: 'Zeffy',
      tagline: 'No fees taken from your gift',
      description: '100% of your donation reaches BDDC. Zeffy is free for nonprofits.',
      logo: 'https://static.wixstatic.com/media/4cb683_0a80684d407e4b80a9382fde9472b7e4~mv2.png',
      url: 'https://www.zeffy.com/en-US/donation-form/2f17d5d5-c7ac-4fd8-ba7e-bbe0431285cc',
      brandColor: '#6bc8c4',
      type: 'link'
    },
    {
      id: 'givebutter',
      name: 'GiveButter',
      tagline: 'Fundraising favorite',
      description: 'Easy giving, recurring donations, and team campaigns.',
      logo: 'https://static.wixstatic.com/media/4cb683_06cd9e85932e4337aec3938de45e906d~mv2.png',
      url: 'https://givebutter.com/ahIg1d',
      brandColor: '#ff6a00',
      type: 'link'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      tagline: 'Familiar & secure',
      description: 'Donate from your PayPal balance, card, or bank account.',
      logo: 'https://static.wixstatic.com/media/4cb683_7c1b76f35cd54d1884b720d910769dc0~mv2.png',
      url: 'https://www.paypal.com/donate/?business=bigdogsdontcryrescue@gmail.com&currency_code=USD&item_name=Support+Big+Dogs+Don%27t+Cry+Animal+Rescue',
      brandColor: '#0070ba',
      type: 'link'
    },
    {
      id: 'zelle',
      name: 'Zelle',
      tagline: 'Direct from your bank',
      description: 'Send through your banking app — no fees, no middleman.',
      logo: 'https://static.wixstatic.com/media/4cb683_d1e09d9f79924fe4abf7cbc5cd6abdd6~mv2.png',
      brandColor: '#6a1b9a',
      type: 'modal'
    }
  ];

  const ACCORDIONS = [
    {
      q: 'What we do',
      a: `Big Dogs Don't Cry is a nonprofit committed to rescuing and rehabilitating dogs that have faced hardship. We provide medical care, foster placements, and community education to promote responsible pet ownership. Every dog who comes through our doors gets the patience, care, and love it takes to find a family who will cherish them.`
    },
    {
      q: 'How we do it',
      a: `Saving lives is a community effort. Every monetary donation, every hour of volunteered time, and every adoption fee directly supports the dogs in our care. Our donors, fosters, and volunteers are the rescue — together we give these sweet souls the futures they deserve. Join us in making a difference, one tail wag at a time.`
    }
  ];

  class BDDCDonations extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
      this.render();
      this.observeReveal();
      this.initInteractions();
    }

    disconnectedCallback() {
      if (this._keyHandler) document.removeEventListener('keydown', this._keyHandler);
      document.body.style.overflow = '';
    }

    render() {
      const heroImage = this.getAttribute('data-hero-image') || DEFAULT_HERO_IMAGE;

      this.shadowRoot.innerHTML = `
        <style>${this.styles()}</style>

        <!-- HERO -->
        <section class="hero" style="--hero-bg: url('${heroImage}');">
          <div class="hero-inner">
            <div class="hero-badge">💖 Support Our Mission</div>
            <h1 class="hero-title">Donate</h1>
            <p class="hero-tagline">
              Every dollar funds food, shelter, and second chances.
            </p>
          </div>
        </section>

        <div class="page-body">

          <!-- TOGETHER WE CAN SAVE LIVES -->
          <section class="welcome-card reveal">
            <div class="welcome-mark">
              <span class="welcome-headline">Together,<br>We Can Save Lives</span>
            </div>
            <p class="welcome-body">
              Without the generosity of people like you, our mission at Big Dogs Don't Cry wouldn't be
              possible. Every donation — no matter the size — plays a vital role in providing care
              and comfort to our furry friends in need.
              <strong>Thank you for being part of this community.</strong>
            </p>
          </section>

          <!-- DONATION METHODS -->
          <section class="methods-section reveal">
            <div class="paw-watermark" aria-hidden="true"></div>
            <div class="section-head">
              <div class="section-overline">Choose Your Method</div>
              <h2 class="section-title">Four Ways to Give</h2>
              <p class="section-lead">
                All four are secure. Pick whichever works best for you — every option puts your gift
                directly to work for the dogs.
              </p>
            </div>
            <div class="methods-grid">
              ${METHODS.map(m => this.renderMethod(m)).join('')}
            </div>
          </section>

          <!-- TRUST BADGE -->
          <section class="trust-card reveal">
            <div class="trust-overline">Verified Nonprofit</div>
            <h2 class="trust-title">Trusted &amp; Transparent</h2>
            <p class="trust-sub">Building trust through transparency.</p>

            <div class="trust-logos">
              <img class="trust-logo" src="https://static.wixstatic.com/media/4cb683_a8d649d3589846568a30460f1d077d32~mv2.png" alt="Big Dogs Don't Cry" />
              <div class="trust-divider" aria-hidden="true">
                <span class="divider-bar"></span>
                <span class="divider-heart">${this.heartSvg()}</span>
                <span class="divider-bar"></span>
              </div>
              <a class="trust-logo-link" href="https://www.givingforce.com/checkmark/e26f3e61-db7e-11f0-ad56-0adc344e9197" target="_blank" rel="noopener noreferrer" title="Verified by GivingForce">
                <img class="trust-logo" src="https://www.givingforce.com/checkmark-img/e26f3e61-db7e-11f0-ad56-0adc344e9197.png" alt="Approved by GivingForce" />
              </a>
            </div>

            <div class="trust-message">
              Your donation goes directly to saving lives. We're proud to be
              <strong>certified by GivingForce</strong> for transparency and accountability —
              ensuring every dollar makes a difference for the dogs who need us most.
            </div>

            <p class="trust-footer">✓ 100% Verified Nonprofit · Committed to Transparency</p>
          </section>

          <!-- ADOPTION & FOSTER FEES -->
          <section class="payments-card reveal">
            <h2 class="payments-title">
              <span aria-hidden="true">💳</span>
              Adoption &amp; Foster Fees
            </h2>
            <p class="payments-body">
              Paying an adoption fee, foster reimbursement, or another rescue-related fee?
              Use our secure payments page below.
            </p>
            <a class="btn btn-primary" href="https://www.bigdogsdontcry.com/payments" target="_top">
              ${this.cardSvg()} Make a Payment <span class="arrow">→</span>
            </a>
          </section>

          <!-- LEARN MORE / ACCORDIONS -->
          <section class="accordions-section reveal">
            <div class="section-head">
              <div class="section-overline">Get to Know Us</div>
              <h2 class="section-title">Learn More About BDDC</h2>
            </div>
            <div class="accordion-list">
              ${ACCORDIONS.map((item, i) => `
                <details class="accordion-item" ${i === 0 ? 'open' : ''}>
                  <summary class="accordion-summary">
                    <span class="accordion-q">${item.q}</span>
                    <span class="accordion-chevron" aria-hidden="true">▾</span>
                  </summary>
                  <div class="accordion-answer">${item.a}</div>
                </details>
              `).join('')}
            </div>
          </section>

          <!-- THANK YOU -->
          <section class="thank-you reveal">
            <p>
              Thank you for your generosity!
              Every donation makes a difference in the lives of rescue pets.
              <span class="heart-pulse" aria-hidden="true">💖</span>
            </p>
          </section>

        </div>

        <!-- ZELLE MODAL -->
        <div class="zelle-overlay" aria-hidden="true">
          <div class="zelle-modal" role="dialog" aria-labelledby="zelle-title" aria-modal="true">
            <button type="button" class="zelle-close" aria-label="Close" data-action="close-zelle">
              ${this.closeSvg()}
            </button>
            <div class="zelle-icon" aria-hidden="true">💜</div>
            <h3 id="zelle-title">Send with Zelle</h3>
            <p>To send with Zelle, open your banking app and add the recipient using the info below:</p>
            <div class="zelle-info">
              <div class="zelle-row">
                <span class="zelle-label">Business Name</span>
                <span class="zelle-value">Big Dogs Don't Cry Inc</span>
              </div>
              <div class="zelle-row">
                <span class="zelle-label">Email</span>
                <span class="zelle-value">bigdogsdontcryrescue@gmail.com</span>
              </div>
            </div>
            <p class="zelle-note">Then create your payment within your bank's Zelle interface.</p>
            <button type="button" class="zelle-action" data-action="close-zelle">Got it</button>
          </div>
        </div>
      `;
    }

    renderMethod(m) {
      const inner = `
        <div class="method-logo-tile" style="--brand: ${m.brandColor};">
          <img class="method-logo" src="${m.logo}" alt="${m.name}" loading="lazy">
        </div>
        <div class="method-content">
          <h3 class="method-name">${m.name}</h3>
          <p class="method-tagline">${m.tagline}</p>
          <p class="method-description">${m.description}</p>
          <div class="method-cta">
            Donate via ${m.name} <span class="arrow">→</span>
          </div>
        </div>
      `;

      if (m.type === 'modal') {
        return `
          <button type="button" class="method-card" data-action="open-zelle" style="--brand: ${m.brandColor};">
            ${inner}
          </button>
        `;
      }

      return `
        <a class="method-card" href="${m.url}" target="_blank" rel="noopener noreferrer" style="--brand: ${m.brandColor};">
          ${inner}
        </a>
      `;
    }

    heartSvg() {
      return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 21s-7-4.5-9.5-9C0.8 8.5 2.5 4 6.5 4c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3 4 0 5.7 4.5 4 8-2.5 4.5-9.5 9-9.5 9z"/></svg>`;
    }

    cardSvg() {
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="width:18px;height:18px;vertical-align:-3px;"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>`;
    }

    closeSvg() {
      return `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M3 3L13 13M13 3L3 13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
    }

    observeReveal() {
      if (!('IntersectionObserver' in window)) {
        this.shadowRoot.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
        return;
      }
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
      this.shadowRoot.querySelectorAll('.reveal').forEach(el => io.observe(el));
    }

    initInteractions() {
      const overlay = this.shadowRoot.querySelector('.zelle-overlay');

      const openZelle = () => {
        overlay.classList.add('active');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      };

      const closeZelle = () => {
        overlay.classList.remove('active');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      };

      this.shadowRoot.addEventListener('click', (e) => {
        const target = e.target.closest('[data-action]');
        if (!target) return;
        const action = target.dataset.action;
        if (action === 'open-zelle') openZelle();
        if (action === 'close-zelle') closeZelle();
      });

      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeZelle();
      });

      this._keyHandler = (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) closeZelle();
      };
      document.addEventListener('keydown', this._keyHandler);
    }

    styles() {
      return `
        :host {
          --pink: #F5367C;
          --pink-deep: #c2255c;
          --pink-soft: #ffd9ec;
          --pink-bg: #fff7fa;
          --pink-light: #ffe9f1;
          --gold: #f5b800;
          --ink: #2a2a2a;
          --muted: #555;
          --shadow-sm: 0 4px 12px rgba(0,0,0,0.08);
          --shadow-md: 0 8px 22px rgba(245,54,124,0.20);
          --shadow-lg: 0 16px 40px rgba(245,54,124,0.28);
          display: block;
          width: 100%;
          font-family: "Raleway", "Quicksand", "Segoe UI", system-ui, -apple-system, Arial, sans-serif;
          color: var(--ink);
          box-sizing: border-box;
        }
        * { box-sizing: border-box; }
        a { color: var(--pink-deep); }

        /* ───── HERO ───── */
        .hero {
          position: relative;
          width: 100%;
          min-height: 320px;
          background-image:
            linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.25) 100%),
            var(--hero-bg);
          background-size: cover;
          background-position: center;
          background-color: #fdf8ec;
          display: grid;
          place-items: center;
          padding: 48px 24px;
        }
        .hero-inner { text-align: center; max-width: 800px; }
        .hero-badge {
          display: inline-block;
          padding: 8px 20px;
          background: rgba(255,255,255,0.92);
          border: 1px solid var(--pink-soft);
          border-radius: 999px;
          font-weight: 700;
          font-size: clamp(13px, 1.2vw, 15px);
          letter-spacing: 1px;
          margin-bottom: 18px;
          color: var(--pink-deep);
          box-shadow: 0 4px 14px rgba(245,54,124,0.20);
          text-transform: uppercase;
        }
        .hero-title {
          margin: 0 0 12px;
          font-size: clamp(40px, 6.5vw, 72px);
          font-weight: 700;
          color: var(--pink);
          text-shadow: 0 2px 14px rgba(255,255,255,0.7);
          line-height: 1.05;
          letter-spacing: -0.5px;
        }
        .hero-tagline {
          margin: 0;
          font-size: clamp(17px, 2vw, 22px);
          font-weight: 600;
          color: #3b3b5c;
          font-style: italic;
          text-shadow: 0 1px 8px rgba(255,255,255,0.7);
        }

        /* ───── PAGE BODY ───── */
        .page-body {
          max-width: 1200px;
          margin: 0 auto;
          padding: 36px 20px 60px;
        }

        /* ───── WELCOME CARD ───── */
        .welcome-card {
          background:
            radial-gradient(circle at top right, rgba(255,215,0,0.10) 0%, transparent 60%),
            linear-gradient(135deg, var(--pink-bg) 0%, var(--pink-light) 100%);
          border: 2px solid var(--pink-soft);
          border-radius: 18px;
          padding: clamp(32px, 4vw, 48px);
          margin-bottom: 48px;
          display: grid;
          grid-template-columns: minmax(220px, 1fr) 2fr;
          gap: 36px;
          align-items: center;
        }
        .welcome-mark {
          text-align: left;
        }
        .welcome-headline {
          display: block;
          color: var(--pink-deep);
          font-size: clamp(28px, 3.6vw, 40px);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.3px;
        }
        .welcome-body {
          margin: 0;
          font-size: clamp(16px, 1.4vw, 18px);
          line-height: 1.7;
          color: var(--ink);
          font-weight: 500;
        }
        .welcome-body strong {
          display: block;
          margin-top: 12px;
          color: var(--pink-deep);
        }

        /* ───── METHODS SECTION ───── */
        .methods-section {
          position: relative;
          margin-bottom: 48px;
          background: #fff;
          padding: clamp(32px, 4vw, 48px);
          border-radius: 20px;
          box-shadow: var(--shadow-sm);
          overflow: hidden;
        }
        .paw-watermark {
          position: absolute;
          top: -40px;
          right: -40px;
          width: 220px;
          height: 220px;
          background-image: url('${PAW_ICON_URL}');
          background-repeat: no-repeat;
          background-size: contain;
          opacity: 0.05;
          pointer-events: none;
          transform: rotate(-12deg);
        }
        .section-head {
          text-align: center;
          margin-bottom: 32px;
          position: relative;
          z-index: 1;
        }
        .section-overline {
          color: var(--pink);
          font-size: clamp(13px, 1.1vw, 15px);
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .section-title {
          margin: 0 auto 10px;
          color: var(--pink-deep);
          font-size: clamp(28px, 3.6vw, 40px);
          font-weight: 700;
          line-height: 1.15;
        }
        .section-lead {
          margin: 0 auto;
          max-width: 680px;
          font-size: clamp(15px, 1.3vw, 17px);
          color: var(--muted);
          line-height: 1.6;
          font-style: italic;
        }
        .methods-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          position: relative;
          z-index: 1;
        }
        .method-card {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          border: 2px solid var(--pink-soft);
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
          transition: transform .2s ease, box-shadow .25s ease, border-color .25s ease;
          position: relative;
          font-family: inherit;
          width: 100%;
          padding: 0;
          cursor: pointer;
          text-align: left;
        }
        .method-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-md);
          border-color: var(--pink);
        }
        .method-card::after {
          content: "";
          position: absolute;
          top: 14px;
          right: 14px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--brand);
          box-shadow: 0 0 0 4px rgba(245,54,124,0.10);
        }
        .method-logo-tile {
          background: var(--brand);
          padding: 22px;
          display: grid;
          place-items: center;
          aspect-ratio: 16 / 6;
          position: relative;
          overflow: hidden;
        }
        .method-logo-tile::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 100%);
        }
        .method-logo {
          max-height: 56px;
          max-width: 80%;
          width: auto;
          height: auto;
          object-fit: contain;
          background: rgba(255, 255, 255, 0.96);
          padding: 8px 16px;
          border-radius: 8px;
          position: relative;
          z-index: 1;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        .method-content {
          padding: 22px 24px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .method-name {
          margin: 0 0 6px;
          color: var(--pink-deep);
          font-size: clamp(18px, 1.7vw, 22px);
          font-weight: 700;
          line-height: 1.2;
        }
        .method-tagline {
          margin: 0 0 12px;
          font-size: clamp(13px, 1.1vw, 15px);
          color: var(--pink);
          font-weight: 600;
          font-style: italic;
        }
        .method-description {
          margin: 0 0 18px;
          font-size: clamp(14px, 1.2vw, 16px);
          line-height: 1.55;
          color: var(--ink);
          flex: 1;
        }
        .method-cta {
          font-weight: 700;
          color: var(--pink-deep);
          font-size: clamp(14px, 1.2vw, 16px);
          letter-spacing: .3px;
        }
        .method-card:hover .method-cta { color: var(--pink); }
        .method-cta .arrow {
          display: inline-block;
          transition: transform .2s ease;
        }
        .method-card:hover .method-cta .arrow { transform: translateX(4px); }

        /* ───── TRUST CARD ───── */
        .trust-card {
          background:
            radial-gradient(circle at top left, rgba(245,184,0,0.08) 0%, transparent 60%),
            #fff;
          border: 2px solid var(--pink-soft);
          border-radius: 20px;
          padding: clamp(32px, 4vw, 48px);
          margin-bottom: 48px;
          text-align: center;
          box-shadow: var(--shadow-sm);
        }
        .trust-overline {
          color: var(--pink);
          font-size: clamp(13px, 1.1vw, 15px);
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .trust-title {
          margin: 0 0 10px;
          color: var(--pink-deep);
          font-size: clamp(26px, 3.2vw, 36px);
          font-weight: 700;
          line-height: 1.15;
        }
        .trust-sub {
          margin: 0 0 26px;
          color: var(--muted);
          font-size: clamp(14px, 1.2vw, 16px);
          font-style: italic;
        }
        .trust-logos {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 32px;
          margin-bottom: 26px;
          flex-wrap: wrap;
        }
        .trust-logo {
          max-width: 110px;
          max-height: 90px;
          width: auto;
          height: auto;
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.10));
          transition: transform .3s ease;
        }
        .trust-logo:hover { transform: scale(1.06); }
        .trust-logo-link { display: inline-block; }
        .trust-divider {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }
        .divider-bar {
          width: 56px;
          height: 3px;
          background: linear-gradient(90deg, var(--pink) 0%, var(--pink-light) 100%);
          border-radius: 2px;
        }
        .divider-heart {
          color: var(--pink);
          width: 22px;
          height: 22px;
        }
        .divider-heart svg { width: 22px; height: 22px; }
        .trust-message {
          background: var(--pink-bg);
          padding: 20px 24px;
          border-radius: 12px;
          border-left: 4px solid var(--pink);
          margin: 0 auto 14px;
          max-width: 720px;
          font-size: clamp(14px, 1.2vw, 16px);
          line-height: 1.65;
          color: var(--ink);
          text-align: left;
        }
        .trust-message strong { color: var(--pink-deep); }
        .trust-footer {
          margin: 0;
          color: var(--muted);
          font-size: clamp(12px, 1vw, 13px);
          letter-spacing: .3px;
        }

        /* ───── PAYMENTS CARD ───── */
        .payments-card {
          background: linear-gradient(135deg, var(--pink) 0%, var(--pink-deep) 100%);
          color: #fff;
          border-radius: 22px;
          padding: clamp(36px, 4.5vw, 52px) clamp(24px, 4vw, 48px);
          box-shadow: var(--shadow-lg);
          text-align: center;
          margin-bottom: 48px;
          position: relative;
          overflow: hidden;
        }
        .payments-card::before,
        .payments-card::after {
          content: "🐾";
          position: absolute;
          font-size: 110px;
          opacity: 0.08;
          top: 50%;
          transform: translateY(-50%) rotate(-12deg);
          pointer-events: none;
        }
        .payments-card::before { left: 4%; }
        .payments-card::after  { right: 4%; transform: translateY(-50%) rotate(12deg); }
        .payments-title {
          margin: 0 0 12px;
          font-size: clamp(26px, 3.4vw, 36px);
          font-weight: 700;
          line-height: 1.2;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          text-shadow: 0 2px 10px rgba(0,0,0,0.2);
          position: relative;
          z-index: 1;
        }
        .payments-body {
          margin: 0 auto 24px;
          max-width: 640px;
          font-size: clamp(15px, 1.3vw, 17px);
          line-height: 1.65;
          opacity: 0.95;
          position: relative;
          z-index: 1;
        }
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 30px;
          border-radius: 999px;
          text-decoration: none;
          font-weight: 700;
          font-size: clamp(15px, 1.3vw, 17px);
          transition: transform .12s ease, box-shadow .2s ease, background .2s ease;
          position: relative;
          z-index: 1;
        }
        .btn-primary {
          background: #fff;
          color: var(--pink-deep);
          box-shadow: 0 6px 18px rgba(0,0,0,0.18);
        }
        .btn-primary:hover {
          background: #ffeaf2;
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(0,0,0,0.25);
        }
        .arrow { display: inline-block; transition: transform .15s ease; }
        .btn:hover .arrow { transform: translateX(4px); }

        /* ───── ACCORDIONS ───── */
        .accordions-section {
          margin-bottom: 48px;
        }
        .accordion-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-width: 880px;
          margin: 0 auto;
        }
        .accordion-item {
          background: #fff;
          border-radius: 14px;
          border: 2px solid var(--pink-soft);
          overflow: hidden;
          transition: border-color .2s ease, box-shadow .25s ease;
        }
        .accordion-item:hover {
          box-shadow: var(--shadow-sm);
        }
        .accordion-item[open] {
          border-color: var(--pink);
          box-shadow: var(--shadow-sm);
        }
        .accordion-summary {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 18px 24px;
          cursor: pointer;
          list-style: none;
          font-weight: 700;
          color: var(--pink-deep);
          font-size: clamp(16px, 1.5vw, 19px);
          transition: background .2s ease;
        }
        .accordion-summary::-webkit-details-marker { display: none; }
        .accordion-summary:hover { background: var(--pink-bg); }
        .accordion-q { flex: 1; }
        .accordion-chevron {
          color: var(--pink);
          font-size: 18px;
          transition: transform .25s ease;
          flex-shrink: 0;
        }
        .accordion-item[open] .accordion-chevron { transform: rotate(180deg); }
        .accordion-answer {
          padding: 4px 24px 22px;
          font-size: clamp(14px, 1.2vw, 16px);
          line-height: 1.7;
          color: var(--ink);
        }

        /* ───── THANK YOU ───── */
        .thank-you {
          text-align: center;
          padding: 32px 20px 8px;
        }
        .thank-you p {
          margin: 0;
          font-size: clamp(17px, 1.6vw, 20px);
          font-weight: 600;
          color: var(--pink-deep);
          line-height: 1.55;
          max-width: 720px;
          margin: 0 auto;
        }
        .heart-pulse {
          display: inline-block;
          animation: heartbeat 1.6s ease-in-out infinite;
          margin-left: 4px;
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          25%      { transform: scale(1.18); }
          50%      { transform: scale(1); }
        }

        /* ───── ZELLE MODAL ───── */
        .zelle-overlay {
          position: fixed;
          inset: 0;
          background: rgba(20, 10, 25, 0.55);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          opacity: 0;
          visibility: hidden;
          transition: opacity .3s ease, visibility .3s ease;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .zelle-overlay.active {
          opacity: 1;
          visibility: visible;
        }
        .zelle-modal {
          background: #fff;
          border-radius: 22px;
          padding: 40px 32px 32px;
          max-width: 480px;
          width: 100%;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          transform: translateY(20px) scale(0.96);
          transition: transform .3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          text-align: center;
          border: 2px solid var(--pink-soft);
        }
        .zelle-overlay.active .zelle-modal {
          transform: translateY(0) scale(1);
        }
        .zelle-icon {
          font-size: 48px;
          margin-bottom: 12px;
          line-height: 1;
        }
        .zelle-modal h3 {
          margin: 0 0 14px;
          color: var(--pink-deep);
          font-size: clamp(22px, 2.4vw, 26px);
          font-weight: 700;
        }
        .zelle-modal p {
          margin: 0 0 16px;
          color: var(--ink);
          font-size: clamp(14px, 1.2vw, 16px);
          line-height: 1.65;
        }
        .zelle-info {
          background: var(--pink-bg);
          border-left: 4px solid var(--pink);
          padding: 18px 20px;
          border-radius: 10px;
          margin: 0 0 18px;
          text-align: left;
          display: grid;
          gap: 12px;
        }
        .zelle-row {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .zelle-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--pink);
        }
        .zelle-value {
          font-size: clamp(14px, 1.2vw, 16px);
          font-weight: 600;
          color: var(--ink);
          word-break: break-word;
        }
        .zelle-note {
          margin: 0 0 18px;
          font-size: clamp(13px, 1.1vw, 14px) !important;
          color: var(--muted) !important;
          font-style: italic;
        }
        .zelle-action {
          display: block;
          width: 100%;
          padding: 14px 24px;
          background: linear-gradient(135deg, var(--pink) 0%, var(--pink-deep) 100%);
          color: #fff;
          border: none;
          border-radius: 999px;
          cursor: pointer;
          font-size: clamp(14px, 1.2vw, 16px);
          font-weight: 700;
          font-family: inherit;
          transition: transform .15s ease, box-shadow .25s ease;
          box-shadow: var(--shadow-md);
        }
        .zelle-action:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }
        .zelle-close {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--pink-bg);
          border: 0;
          cursor: pointer;
          display: grid;
          place-items: center;
          color: var(--pink-deep);
          transition: background .2s ease, transform .2s ease, color .2s ease;
        }
        .zelle-close:hover {
          background: var(--pink);
          color: #fff;
          transform: rotate(90deg);
        }
        .zelle-close svg { width: 14px; height: 14px; }

        /* ───── REVEAL ───── */
        .reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity .6s ease, transform .6s ease;
        }
        .reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal { opacity: 1; transform: none; transition: none; }
          .heart-pulse { animation: none; }
        }

        /* ───── RESPONSIVE ───── */
        @media (max-width: 980px) {
          .welcome-card {
            grid-template-columns: 1fr;
            gap: 18px;
            text-align: center;
          }
          .welcome-mark { text-align: center; }
          .methods-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 600px) {
          .hero { min-height: 260px; padding: 36px 18px; }
          .trust-logos { gap: 18px; }
          .trust-divider { flex-direction: row; }
          .divider-bar { width: 40px; }
          .zelle-modal { padding: 32px 22px 24px; }
        }

        @media (max-width: 420px) {
          .page-body { padding: 24px 14px 40px; }
          .method-logo-tile { aspect-ratio: 16 / 7; padding: 18px; }
          .method-logo { max-height: 48px; }
        }
      `;
    }
  }

  if (!customElements.get('bddc-donations')) {
    customElements.define('bddc-donations', BDDCDonations);
  }
})();
