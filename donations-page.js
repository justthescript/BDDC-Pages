/**
 * <donations-page> — Wix Studio Custom Element
 * Big Dogs Don't Cry Animal Rescue donations page
 *
 * Usage in Wix Studio:
 *   1. Add a Custom Element to the page
 *   2. Server URL: https://justthescript.github.io/BDDC-Pages/donations-page.js
 *   3. Tag Name: donations-page
 */

class DonationsPage extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = this.template();
    this.initInteractions(shadow);
  }

  disconnectedCallback() {
    if (this._keyHandler) document.removeEventListener('keydown', this._keyHandler);
    document.body.style.overflow = '';
  }

  template() {
    return `
      <style>
        :host {
          display: block;
          width: 100%;
          font-family: 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
        }

        *, *::before, *::after {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        button { font-family: inherit; }

        .container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 20px;
        }

        /* Page header */
        .page-header {
          text-align: center;
          padding: 60px 20px 40px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          margin-bottom: 50px;
        }

        .page-header h1 {
          font-size: 2.6rem;
          font-weight: 700;
          margin-bottom: 14px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        }

        .page-header p {
          font-size: 1.15rem;
          max-width: 720px;
          margin: 0 auto;
          opacity: 0.95;
        }

        /* Hero "Together We Can Save Lives" message */
        .hero-message {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 50px;
          align-items: center;
          padding: 50px 50px;
          background: linear-gradient(135deg, #fff5f8 0%, #f5f0ff 100%);
          border-radius: 20px;
          margin-bottom: 50px;
          box-shadow: 0 4px 20px rgba(102, 126, 234, 0.08);
        }

        .hero-label {
          font-size: 1.55rem;
          font-weight: 600;
          color: #4f8cff;
          line-height: 1.3;
        }

        .hero-text {
          font-size: 1.3rem;
          color: #ff4f7b;
          font-weight: 500;
          line-height: 1.6;
        }

        /* Section title */
        .section-title {
          text-align: center;
          font-size: 2rem;
          color: #667eea;
          margin-bottom: 14px;
        }

        .section-subtitle {
          text-align: center;
          color: #666;
          font-size: 1.05rem;
          margin-bottom: 36px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        /* Donation grid */
        .donation-section {
          margin-bottom: 60px;
        }

        .donation-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
          max-width: 800px;
          margin: 0 auto;
        }

        .donation-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          text-decoration: none;
          color: white;
          padding: 32px 24px;
          border-radius: 16px;
          text-align: center;
          font-weight: 600;
          font-size: 1.05rem;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 4px 14px rgba(0,0,0,0.08);
          border: none;
          font-family: inherit;
          width: 100%;
          min-height: 160px;
        }

        .donation-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.18);
        }

        .donation-card.zeffy { background: #6bc8c4; }
        .donation-card.givebutter { background: #ff6a00; }
        .donation-card.paypal { background: #0070ba; }
        .donation-card.zelle { background: #6a1b9a; }

        .donation-card img {
          height: 50px;
          width: auto;
          max-width: 160px;
          object-fit: contain;
          background: rgba(255, 255, 255, 0.95);
          padding: 8px 14px;
          border-radius: 8px;
        }

        .donation-card .card-label {
          font-size: 1rem;
          letter-spacing: 0.02em;
        }

        /* Trust badge */
        .trust-badge {
          text-align: center;
          padding: 40px 30px;
          background: linear-gradient(135deg, #ffffff 0%, #fff5f7 100%);
          border: 3px solid #ff4f7b;
          border-radius: 20px;
          margin-bottom: 50px;
          box-shadow: 0 8px 20px rgba(255, 79, 123, 0.12);
        }

        .trust-badge h3 {
          color: #ff4f7b;
          font-size: 1.4rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          margin-bottom: 6px;
        }

        .badge-subtitle {
          color: #888;
          font-size: 0.85rem;
          font-style: italic;
          margin-bottom: 24px;
        }

        .badge-logos {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 28px;
          margin-bottom: 22px;
          flex-wrap: wrap;
        }

        .badge-logo {
          max-width: 100px;
          height: auto;
          filter: drop-shadow(0 4px 6px rgba(0,0,0,0.12));
          transition: transform 0.3s ease;
        }

        .badge-logo:hover {
          transform: scale(1.05);
        }

        .badge-divider {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }

        .badge-divider .bar {
          width: 56px;
          height: 3px;
          background: linear-gradient(to right, #ff4f7b, #ff7da0);
          border-radius: 2px;
        }

        .badge-divider svg {
          width: 22px;
          height: 22px;
          color: #ff4f7b;
        }

        .badge-message {
          background: rgba(255, 255, 255, 0.7);
          padding: 18px 22px;
          border-radius: 12px;
          border-left: 4px solid #ff4f7b;
          margin-bottom: 14px;
        }

        .badge-message p {
          color: #444;
          font-size: 0.98rem;
          line-height: 1.7;
        }

        .badge-message strong {
          color: #ff4f7b;
        }

        .badge-footer {
          color: #999;
          font-size: 0.78rem;
        }

        /* Adoption payments */
        .adoption-payments {
          text-align: center;
          padding: 48px 36px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 16px;
          margin-bottom: 60px;
          box-shadow: 0 8px 24px rgba(102, 126, 234, 0.25);
        }

        .adoption-payments h2 {
          font-size: 1.9rem;
          margin-bottom: 12px;
        }

        .adoption-payments .ap-subhead {
          font-size: 1.05rem;
          max-width: 620px;
          margin: 0 auto 28px;
          opacity: 0.95;
        }

        .payments-button {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: white;
          color: #667eea;
          padding: 14px 36px;
          border-radius: 999px;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.05rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 4px 14px rgba(0,0,0,0.15);
        }

        .payments-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 24px rgba(0,0,0,0.2);
        }

        .payments-button svg {
          width: 18px;
          height: 18px;
        }

        /* Accordion sections */
        .info-section {
          margin-bottom: 50px;
        }

        .info-section .section-title {
          margin-bottom: 28px;
        }

        .accordion-item {
          background: white;
          border: 1px solid #eee;
          border-radius: 12px;
          margin-bottom: 14px;
          overflow: hidden;
          transition: box-shadow 0.3s ease, border-color 0.3s ease;
        }

        .accordion-item:hover {
          border-color: #d8dffe;
          box-shadow: 0 4px 14px rgba(102, 126, 234, 0.08);
        }

        .accordion-item.open {
          border-color: #667eea;
          box-shadow: 0 4px 16px rgba(102, 126, 234, 0.12);
        }

        .accordion-trigger {
          width: 100%;
          background: white;
          border: none;
          padding: 22px 28px;
          font-size: 1.2rem;
          font-weight: 600;
          color: #333;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          text-align: left;
          transition: color 0.3s ease, background 0.3s ease;
        }

        .accordion-trigger:hover {
          color: #667eea;
          background: #fafbff;
        }

        .accordion-item.open .accordion-trigger {
          color: #667eea;
        }

        .accordion-icon {
          width: 22px;
          height: 22px;
          color: currentColor;
          transition: transform 0.3s ease;
          flex-shrink: 0;
        }

        .accordion-item.open .accordion-icon {
          transform: rotate(180deg);
        }

        .accordion-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .accordion-item.open .accordion-content {
          max-height: 800px;
        }

        .accordion-inner {
          padding: 0 28px 24px;
          color: #555;
          line-height: 1.85;
          font-size: 1.05rem;
        }

        /* Thank you */
        .thank-you {
          text-align: center;
          padding: 50px 30px 40px;
          color: #4f8cff;
          font-size: 1.4rem;
          font-weight: 500;
          max-width: 800px;
          margin: 0 auto;
        }

        .thank-you-heart {
          display: inline-block;
          width: 24px;
          height: 24px;
          color: #ff4f7b;
          margin-left: 4px;
          vertical-align: middle;
          animation: pulse 1.6s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        /* Zelle modal */
        .zelle-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(20, 10, 25, 0.55);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .zelle-modal-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        .zelle-modal {
          background: white;
          border-radius: 20px;
          padding: 36px 36px 32px;
          max-width: 480px;
          width: 100%;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          transform: translateY(20px) scale(0.96);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .zelle-modal-overlay.active .zelle-modal {
          transform: translateY(0) scale(1);
        }

        .zelle-modal h3 {
          color: #6a1b9a;
          font-size: 1.6rem;
          margin-bottom: 14px;
        }

        .zelle-modal p {
          color: #4B4E6D;
          font-size: 1rem;
          line-height: 1.65;
          margin-bottom: 16px;
        }

        .zelle-info {
          background: #f8f3fc;
          border-left: 4px solid #6a1b9a;
          padding: 18px 20px;
          border-radius: 8px;
          margin-bottom: 18px;
        }

        .zelle-info div {
          color: #4B4E6D;
          font-size: 1rem;
          margin-bottom: 6px;
          word-break: break-word;
        }

        .zelle-info div:last-child {
          margin-bottom: 0;
        }

        .zelle-info strong {
          color: #6a1b9a;
          font-weight: 600;
        }

        .zelle-action {
          display: block;
          width: 100%;
          margin-top: 14px;
          padding: 14px;
          background: linear-gradient(135deg, #6a1b9a 0%, #8e3bc7 100%);
          color: white;
          border: none;
          border-radius: 999px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .zelle-action:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(106, 27, 154, 0.3);
        }

        .zelle-close {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #f0f0f0;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
          transition: background 0.2s ease, transform 0.2s ease, color 0.2s ease;
        }

        .zelle-close:hover {
          background: #6a1b9a;
          color: white;
          transform: rotate(90deg);
        }

        .zelle-close svg {
          width: 16px;
          height: 16px;
        }

        /* Mobile */
        @media (max-width: 768px) {
          .page-header {
            padding: 40px 20px 30px;
          }

          .page-header h1 {
            font-size: 2rem;
          }

          .page-header p {
            font-size: 1rem;
          }

          .hero-message {
            grid-template-columns: 1fr;
            gap: 18px;
            padding: 32px 24px;
          }

          .hero-label {
            font-size: 1.3rem;
          }

          .hero-text {
            font-size: 1.1rem;
          }

          .section-title {
            font-size: 1.6rem;
          }

          .donation-grid {
            grid-template-columns: 1fr;
            gap: 14px;
          }

          .trust-badge {
            padding: 30px 22px;
          }

          .badge-logos {
            gap: 18px;
          }

          .adoption-payments {
            padding: 36px 24px;
          }

          .adoption-payments h2 {
            font-size: 1.5rem;
          }

          .accordion-trigger {
            padding: 18px 22px;
            font-size: 1.05rem;
          }

          .accordion-inner {
            padding: 0 22px 20px;
            font-size: 1rem;
          }

          .thank-you {
            font-size: 1.15rem;
            padding: 36px 20px 30px;
          }

          .zelle-modal {
            padding: 28px 24px 24px;
          }

          .zelle-modal h3 {
            font-size: 1.35rem;
          }
        }
      </style>

      <div class="page-header">
        <h1>Support Big Dogs Don't Cry</h1>
        <p>Your donations help provide food, shelter, and medical care to rescue pets in need. Choose your preferred donation method below.</p>
      </div>

      <div class="container">

        <!-- Hero Message -->
        <section class="hero-message">
          <div class="hero-label">Together, We<br/>Can Save Lives</div>
          <p class="hero-text">Without the generosity and support of people like you, our mission at Big Dogs Don't Cry would not be possible. Every donation, no matter how big or small, plays a vital role in providing care and comfort to our furry friends in need. We are deeply grateful for your support and proud to have you as part of our community dedicated to this important cause.</p>
        </section>

        <!-- Donation Methods -->
        <section class="donation-section">
          <h2 class="section-title">Choose Your Donation Method</h2>
          <p class="section-subtitle">All four options are secure. Pick whichever works best for you.</p>

          <div class="donation-grid">
            <a class="donation-card zeffy" href="https://www.zeffy.com/en-US/donation-form/2f17d5d5-c7ac-4fd8-ba7e-bbe0431285cc" target="_blank" rel="noopener noreferrer">
              <img src="https://static.wixstatic.com/media/4cb683_0a80684d407e4b80a9382fde9472b7e4~mv2.png" alt="Zeffy" />
              <span class="card-label">Donate via Zeffy</span>
            </a>

            <a class="donation-card givebutter" href="https://givebutter.com/ahIg1d" target="_blank" rel="noopener noreferrer">
              <img src="https://static.wixstatic.com/media/4cb683_06cd9e85932e4337aec3938de45e906d~mv2.png" alt="GiveButter" />
              <span class="card-label">Donate via GiveButter</span>
            </a>

            <a class="donation-card paypal" href="https://www.paypal.com/donate/?business=bigdogsdontcryrescue@gmail.com&currency_code=USD&item_name=Support+Big+Dogs+Don%27t+Cry+Animal+Rescue" target="_blank" rel="noopener noreferrer">
              <img src="https://static.wixstatic.com/media/4cb683_7c1b76f35cd54d1884b720d910769dc0~mv2.png" alt="PayPal" />
              <span class="card-label">Donate via PayPal</span>
            </a>

            <button type="button" class="donation-card zelle" data-action="open-zelle">
              <img src="https://static.wixstatic.com/media/4cb683_d1e09d9f79924fe4abf7cbc5cd6abdd6~mv2.png" alt="Zelle" />
              <span class="card-label">Donate via Zelle</span>
            </button>
          </div>
        </section>

        <!-- Trust Badge -->
        <section class="trust-badge">
          <h3>Verified &amp; Trusted Partner</h3>
          <p class="badge-subtitle">Building trust through transparency</p>

          <div class="badge-logos">
            <img class="badge-logo" src="https://static.wixstatic.com/media/4cb683_a8d649d3589846568a30460f1d077d32~mv2.png" alt="Big Dogs Don't Cry" />
            <div class="badge-divider">
              <span class="bar"></span>
              ${this.heartSvg()}
              <span class="bar"></span>
            </div>
            <a href="https://www.givingforce.com/checkmark/e26f3e61-db7e-11f0-ad56-0adc344e9197" target="_blank" rel="noopener noreferrer" title="Verified by GivingForce">
              <img class="badge-logo" src="https://www.givingforce.com/checkmark-img/e26f3e61-db7e-11f0-ad56-0adc344e9197.png" alt="Approved by GivingForce" />
            </a>
          </div>

          <div class="badge-message">
            <p>Your generous donation goes directly to saving lives. We're proud to be <strong>certified by GivingForce</strong> for transparency and accountability, ensuring every dollar makes a difference in the lives of dogs who need us most.</p>
          </div>

          <p class="badge-footer">✓ 100% Verified Nonprofit &middot; Committed to Transparency</p>
        </section>

        <!-- Adoption Payments -->
        <section class="adoption-payments">
          <h2>Adoption &amp; Foster Fees</h2>
          <p class="ap-subhead">Paying an adoption fee, foster reimbursement, or another rescue-related fee? Use our secure payments page below.</p>
          <a class="payments-button" href="https://www.bigdogsdontcry.com/payments" target="_top">
            ${this.cardSvg()}
            <span>Make a Payment</span>
          </a>
        </section>

        <!-- Info Accordions -->
        <section class="info-section">
          <h2 class="section-title">Learn More About Us</h2>

          <div class="accordion-item">
            <button type="button" class="accordion-trigger" aria-expanded="false">
              <span>What we do</span>
              ${this.chevronSvg()}
            </button>
            <div class="accordion-content">
              <div class="accordion-inner">
                <p>Welcome to Big Dogs Don't Cry, where our love for animals drives everything we do. We are a nonprofit organization committed to rescuing and rehabilitating dogs that have faced hardships. Our services include medical care, foster placements, and community education to promote awareness of responsible pet ownership. By offering these services in a safe environment, we aim to provide each dog with the love and compassion they deserve, ensuring they find a loving family who will cherish them.</p>
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <button type="button" class="accordion-trigger" aria-expanded="false">
              <span>How we do it</span>
              ${this.chevronSvg()}
            </button>
            <div class="accordion-content">
              <div class="accordion-inner">
                <p>At Big Dogs Don't Cry, we believe that saving lives is a community effort. Thanks to the unwavering support of our donors, volunteers, and fosters, we have successfully rescued countless animals in need. Every monetary donation, every hour of volunteered time, and every adoption fee contributed helps us provide shelter, care, and love to pets that require a second chance. Together with our incredible community, we give these sweet souls the hopeful futures they deserve. Join us in making a meaningful difference, one tail wag at a time!</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Thank You -->
        <div class="thank-you">
          Thank you for your generosity! Every donation makes a difference in the lives of rescue pets.
          <span class="thank-you-heart">${this.heartSvg()}</span>
        </div>

      </div>

      <!-- Zelle Modal -->
      <div class="zelle-modal-overlay" aria-hidden="true">
        <div class="zelle-modal" role="dialog" aria-labelledby="zelle-title" aria-modal="true">
          <button type="button" class="zelle-close" aria-label="Close" data-action="close-zelle">
            ${this.closeSvg()}
          </button>
          <h3 id="zelle-title">Send with Zelle</h3>
          <p>To send with Zelle, open your banking app and add the recipient using the info below:</p>
          <div class="zelle-info">
            <div><strong>Business Name:</strong> Big Dogs Don't Cry Inc</div>
            <div><strong>Email:</strong> bigdogsdontcryrescue@gmail.com</div>
          </div>
          <p>Then create your payment within your bank's Zelle interface.</p>
          <button type="button" class="zelle-action" data-action="close-zelle">Got it</button>
        </div>
      </div>
    `;
  }

  heartSvg() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 21s-7-4.5-9.5-9C0.8 8.5 2.5 4 6.5 4c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3 4 0 5.7 4.5 4 8-2.5 4.5-9.5 9-9.5 9z"/></svg>`;
  }

  cardSvg() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>`;
  }

  chevronSvg() {
    return `<svg class="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>`;
  }

  closeSvg() {
    return `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M3 3L13 13M13 3L3 13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
  }

  initInteractions(shadow) {
    const overlay = shadow.querySelector('.zelle-modal-overlay');

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

    // Action delegation
    shadow.addEventListener('click', (e) => {
      const target = e.target.closest('[data-action]');
      if (!target) return;
      const action = target.dataset.action;
      if (action === 'open-zelle') openZelle();
      if (action === 'close-zelle') closeZelle();
    });

    // Close on overlay click (not modal click)
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeZelle();
    });

    // Escape key closes modal
    this._keyHandler = (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('active')) closeZelle();
    };
    document.addEventListener('keydown', this._keyHandler);

    // Accordion toggles
    shadow.querySelectorAll('.accordion-trigger').forEach(trigger => {
      trigger.addEventListener('click', () => {
        const item = trigger.closest('.accordion-item');
        const isOpen = item.classList.toggle('open');
        trigger.setAttribute('aria-expanded', String(isOpen));
      });
    });
  }
}

if (!customElements.get('donations-page')) {
  customElements.define('donations-page', DonationsPage);
}
