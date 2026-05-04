/**
 * <adoption-requirements> — Wix Studio Custom Element
 * Big Dogs Don't Cry Animal Rescue — Adoption Requirements
 *
 * Usage in Wix Studio:
 *   1. Add a Custom Element to the page
 *   2. Server URL: https://cdn.jsdelivr.net/gh/justthescript/BDDC-Pages@main/adoption-requirements.js
 *   3. Tag Name: adoption-requirements
 *   4. Optional attribute: data-hero-image
 */

(function () {
  const DEFAULT_HERO_IMAGE =
    'https://static.wixstatic.com/media/bc59b6_604fb6f09a314f219daf30e354c81e5a~mv2.webp';

  const PAW_ICON_URL =
    'https://static.wixstatic.com/media/bc59b6_45db072b49a5427f930919d18683e36d~mv2.png';

  // Adoption requirements
  const REQUIREMENTS = [
    {
      icon: '📅',
      title: 'Age Requirement',
      body: 'All adopters must be at least 18 years of age and able to sign a legally binding adoption contract. If you live with parents, they must be contacted during the adoption process to verify approval.'
    },
    {
      icon: '🪪',
      title: 'Valid Identification',
      body: `You must provide a valid government-issued photo ID (driver's license or state ID).`
    },
    {
      icon: '🏠',
      title: 'Housing Verification',
      body: 'Housing requirements to ensure a safe environment for our dogs:',
      list: [
        '<strong>Renters:</strong> Must provide written landlord approval for pets',
        `<strong>Homeowners:</strong> Must verify homeowner's insurance covers dogs (we can recommend pet-friendly insurance companies)`,
        'Must verify no breed-specific legislation exists in your community',
        'All household members must agree to the adoption and be present for meet and greet'
      ]
    },
    {
      icon: '🐾',
      title: 'Current Pets',
      body: 'If you currently have pets, the following are required:',
      list: [
        '<strong>Dogs:</strong> Current on Rabies and DA2PP vaccinations, recent heartworm test, and spayed/neutered',
        '<strong>Cats:</strong> Current on Rabies vaccination, spayed/neutered, and a recent wellness visit',
        'We will contact your veterinarian to verify vaccination history and general pet care',
        'A dog-to-dog meet and greet is required if you have another dog in your home'
      ]
    },
    {
      icon: '🏥',
      title: 'Veterinary Reference',
      body: 'We require contact information for your current or most recent veterinarian. We will verify:',
      list: [
        'Your pets are current on vaccinations',
        'Your pets receive regular veterinary care',
        'Your pets are spayed/neutered'
      ],
      footnote: `If you haven't had pets before, we'll discuss your plan for veterinary care during the adoption process.`
    },
    {
      icon: '🤝',
      title: 'Personal References',
      body: 'We require 2–3 personal references who can speak to your ability to care for a pet long-term. References cannot include family members, veterinarians, or BDDC Board Members.'
    },
    {
      icon: '🚪',
      title: 'Home Visit',
      body: 'A home visit may be required to ensure your home provides a safe environment for your new dog. Visits may be conducted in person or virtually. During the visit, we will:',
      list: [
        'Walk through your home and yard to check for safety concerns',
        'Discuss your lifestyle and which dogs might be the best fit',
        'Answer any questions you have about bringing your new dog home'
      ]
    },
    {
      icon: '👋',
      title: 'Meet and Greet',
      body: 'Before finalizing an adoption, a meet and greet is required:',
      list: [
        'We recommend that all family members (including children) meet the dog',
        'If you have dogs, a dog-to-dog introduction will be arranged on neutral ground',
        'Meet and greets help ensure compatibility and set everyone up for success'
      ]
    },
    {
      icon: '📝',
      title: 'Adoption Contract & Fees',
      body: 'Upon approval, you will be required to:',
      list: [
        'Sign our legally binding adoption contract',
        'Pay the adoption fee (varies by animal — typically $150 to $600 based on breed, age, and medical needs)',
        'Agree to return the dog to Big Dogs Don\u2019t Cry if you can no longer care for them',
        'Keep the dog on leash when in unfenced areas',
        'Provide ongoing veterinary care, proper nutrition, and a loving home'
      ]
    }
  ];

  // What every adoption includes
  const INCLUDED = [
    { icon: '✂️', text: 'Spayed or neutered' },
    { icon: '💉', text: 'Current on age-appropriate vaccinations' },
    { icon: '📡', text: 'Microchipped for identification' },
    { icon: '🩺', text: 'Tested for heartworms and on preventative' },
    { icon: '🛡️', text: 'Treated with flea/tick prevention' },
    { icon: '❤️', text: 'Lifetime support from our rescue' }
  ];

  class AdoptionRequirements extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
      this.render();
      this.observeReveal();
    }

    render() {
      const heroImage = this.getAttribute('data-hero-image') || DEFAULT_HERO_IMAGE;

      this.shadowRoot.innerHTML = `
        <style>${SHARED_STYLES}</style>

        <!-- HERO -->
        <section class="hero" style="--hero-bg: url('${heroImage}');">
          <div class="hero-inner">
            <div class="hero-badge">🐾 Adoption Program</div>
            <h1 class="hero-title">Adoption Requirements</h1>
            <p class="hero-tagline">A loving home is the greatest gift you can give.</p>
          </div>
        </section>

        <div class="page-body">

          <!-- INTRO -->
          <section class="intro-card reveal">
            <h2 class="intro-title">
              <span class="heart-pulse" aria-hidden="true">❤️</span>
              A Lifelong Match
            </h2>
            <p class="intro-body">
              Thank you for considering adopting from Big Dogs Don't Cry. Adopting a rescue dog is a
              lifelong commitment and one of the most rewarding experiences. We carefully review every
              application to ensure the best match between our dogs and their forever families. Below
              you'll find everything you need to know to prepare for the application process.
            </p>
          </section>

          <!-- REQUIREMENTS -->
          <section class="section reveal">
            <div class="paw-watermark" aria-hidden="true"></div>
            <h2 class="section-title">
              <img class="section-paw" src="${PAW_ICON_URL}" alt="" aria-hidden="true">
              What We Look For
            </h2>
            <p class="section-lead">
              Each requirement helps us match the right dog to the right home. The full process usually
              takes a few days from application to adoption day.
            </p>
            <div class="items-list">
              ${REQUIREMENTS.map((r, i) => this.renderRequirement(r, i + 1)).join('')}
            </div>
          </section>

          <!-- HOLD POLICY NOTICE -->
          <aside class="callout callout-important reveal">
            <h3>⏰ Application Hold Policy</h3>
            <p>
              <strong>Upon approval of your application, we will hold the pet for up to 48 hours</strong>
              for you to schedule a meet &amp; greet or choose to adopt. This gives you time to make
              arrangements while ensuring our dogs don't wait too long for their forever homes. After
              48 hours, if we haven't heard from you, we'll begin considering other approved applications.
              Once multiple applications are approved, adoptions are completed on a first-come, first-served
              basis. We appreciate your understanding as we work to find homes for all our dogs as quickly
              as possible.
            </p>
          </aside>

          <!-- WHAT'S INCLUDED -->
          <section class="benefits-card reveal">
            <div class="benefits-header">
              <div class="benefits-icon" aria-hidden="true">🎁</div>
              <h2 class="benefits-title">What's Included with Every Adoption</h2>
              <p class="benefits-sub">
                When you adopt from Big Dogs Don't Cry, your new family member comes home ready to thrive.
                Every adoption includes:
              </p>
            </div>
            <ul class="benefits-list">
              ${INCLUDED.map(b => `
                <li class="benefit">
                  <span class="benefit-icon" aria-hidden="true">${b.icon}</span>
                  <span class="benefit-text">${b.text}</span>
                </li>
              `).join('')}
            </ul>
          </section>

          <!-- CLOSING CTA -->
          <section class="closing-card reveal">
            <h2 class="closing-title">
              <span class="heart-pulse" aria-hidden="true">💖</span>
              Ready to Find Your New Best Friend?
            </h2>
            <p class="closing-body">
              Adopting a rescue dog is a life-changing experience for both you and your new family member.
              We're here to help every step of the way to find the perfect match for your home and lifestyle.
            </p>
            <div class="closing-actions">
              <a class="btn btn-primary" href="https://www.bigdogsdontcry.com/adoption-application" target="_blank" rel="noopener">
                Apply to Adopt <span class="arrow">→</span>
              </a>
              <a class="btn btn-secondary" href="https://www.bigdogsdontcry.com/adoptable" target="_blank" rel="noopener">
                View Available Pets
              </a>
            </div>
          </section>

        </div>
      `;
    }

    renderRequirement(r, num) {
      const list = r.list
        ? `<ul class="item-list">${r.list.map(li => `<li>${li}</li>`).join('')}</ul>`
        : '';
      const footnote = r.footnote
        ? `<p class="item-footnote"><em>${r.footnote}</em></p>`
        : '';
      return `
        <article class="item">
          <div class="item-num">${String(num).padStart(2, '0')}</div>
          <div class="item-icon" aria-hidden="true">${r.icon}</div>
          <div class="item-body">
            <h3 class="item-title">${r.title}</h3>
            <p class="item-desc">${r.body}</p>
            ${list}
            ${footnote}
          </div>
        </article>
      `;
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
  }

  // ────────────────────────────────────────────────────────────────────────
  // Shared styles — identical to foster-requirements so the two pages match
  // ────────────────────────────────────────────────────────────────────────
  const SHARED_STYLES = `
    :host {
      --pink: #F5367C;
      --pink-deep: #c2255c;
      --pink-soft: #ffd9ec;
      --pink-bg: #fff7fa;
      --pink-light: #ffe9f1;
      --purple: #845ef7;
      --ink: #2a2a2a;
      --muted: #555;
      --note-bg: #fff8e1;
      --note-border: #f5cf52;
      --note-ink: #8a6d1c;
      --important-bg: #ffebf0;
      --important-border: #ffa3bc;
      --important-ink: #b3134d;
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
      padding: 8px 18px;
      background: rgba(255,255,255,0.85);
      border: 1px solid var(--pink-soft);
      border-radius: 999px;
      font-weight: 600;
      font-size: clamp(13px, 1.2vw, 15px);
      letter-spacing: .5px;
      margin-bottom: 18px;
      color: var(--pink-deep);
      box-shadow: 0 4px 14px rgba(245,54,124,0.15);
    }
    .hero-title {
      margin: 0 0 12px;
      font-size: clamp(34px, 5.5vw, 60px);
      font-weight: 700;
      color: var(--pink);
      text-shadow: 0 2px 14px rgba(255,255,255,0.7);
      line-height: 1.05;
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
      max-width: 1100px;
      margin: 0 auto;
      padding: 36px 20px 56px;
    }

    /* ───── INTRO ───── */
    .intro-card {
      background: #fff;
      border-left: 6px solid var(--pink);
      border-radius: 14px;
      padding: clamp(24px, 3.5vw, 36px);
      box-shadow: var(--shadow-sm);
      margin-bottom: 32px;
    }
    .intro-title {
      margin: 0 0 14px;
      color: var(--pink-deep);
      font-size: clamp(22px, 2.6vw, 30px);
      font-weight: 700;
      line-height: 1.2;
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    .intro-body {
      margin: 0;
      font-size: clamp(16px, 1.4vw, 18px);
      line-height: 1.65;
      font-weight: 500;
    }

    /* ───── SECTION ───── */
    .section {
      position: relative;
      background: #fff;
      padding: clamp(28px, 3.5vw, 40px);
      border-radius: 16px;
      box-shadow: var(--shadow-sm);
      margin-bottom: 28px;
      overflow: hidden;
    }
    .paw-watermark {
      position: absolute;
      top: -30px;
      right: -30px;
      width: 200px;
      height: 200px;
      background-image: url('${PAW_ICON_URL}');
      background-repeat: no-repeat;
      background-size: contain;
      opacity: 0.05;
      pointer-events: none;
      transform: rotate(-12deg);
    }
    .section-title {
      margin: 0 0 8px;
      color: var(--pink-deep);
      font-size: clamp(24px, 3vw, 34px);
      font-weight: 700;
      line-height: 1.2;
      display: flex;
      align-items: center;
      gap: 14px;
      flex-wrap: wrap;
      position: relative;
      z-index: 1;
    }
    .section-paw {
      width: 38px;
      height: 38px;
      object-fit: contain;
      flex-shrink: 0;
    }
    .section-lead {
      margin: 0 0 24px;
      font-size: clamp(15px, 1.3vw, 17px);
      color: var(--muted);
      line-height: 1.6;
      position: relative;
      z-index: 1;
    }

    /* ───── ITEMS ───── */
    .items-list {
      display: flex;
      flex-direction: column;
      gap: 18px;
      position: relative;
      z-index: 1;
    }
    .item {
      position: relative;
      background: var(--pink-bg);
      border-radius: 12px;
      padding: 22px 24px 22px 28px;
      display: grid;
      grid-template-columns: 56px 1fr;
      gap: 20px;
      align-items: start;
      transition: transform .2s ease, box-shadow .25s ease;
      overflow: hidden;
    }
    .item::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 5px;
      height: 100%;
      background: linear-gradient(to bottom, var(--pink) 0%, var(--pink-soft) 100%);
      transition: width .35s ease, opacity .35s ease;
    }
    .item:hover {
      transform: translateX(4px);
      box-shadow: 0 8px 20px rgba(245,54,124,0.15);
    }
    .item:hover::before {
      width: 100%;
      opacity: 0.08;
    }
    .item-num {
      position: absolute;
      top: 12px;
      right: 14px;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 1.5px;
      color: var(--pink);
      opacity: 0.55;
      font-variant-numeric: tabular-nums;
    }
    .item-icon {
      width: 56px;
      height: 56px;
      display: grid;
      place-items: center;
      font-size: 30px;
      background: #fff;
      border-radius: 50%;
      box-shadow: 0 3px 10px rgba(245,54,124,0.15);
      position: relative;
      z-index: 1;
    }
    .item-body {
      min-width: 0;
      position: relative;
      z-index: 1;
    }
    .item-title {
      margin: 0 0 10px;
      color: var(--pink-deep);
      font-size: clamp(18px, 1.7vw, 22px);
      font-weight: 700;
      line-height: 1.25;
    }
    .item-desc {
      margin: 0;
      font-size: clamp(15px, 1.25vw, 17px);
      line-height: 1.6;
    }
    .item-list {
      margin: 12px 0 0;
      padding-left: 22px;
      font-size: clamp(15px, 1.2vw, 16px);
      line-height: 1.65;
    }
    .item-list li { margin-bottom: 6px; }
    .item-list li:last-child { margin-bottom: 0; }
    .item-footnote {
      margin: 12px 0 0;
      font-size: 0.92em;
      color: var(--muted);
    }

    /* ───── CALLOUT ───── */
    .callout {
      border-radius: 12px;
      padding: clamp(20px, 2.5vw, 26px);
      margin: 28px 0;
      border: 2px solid;
    }
    .callout h3 {
      margin: 0 0 10px;
      font-size: clamp(17px, 1.6vw, 20px);
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .callout p {
      margin: 0;
      font-size: clamp(15px, 1.25vw, 16px);
      line-height: 1.6;
    }
    .callout-note {
      background: var(--note-bg);
      border-color: var(--note-border);
    }
    .callout-note h3 { color: var(--note-ink); }
    .callout-important {
      background: var(--important-bg);
      border-color: var(--important-border);
    }
    .callout-important h3 { color: var(--important-ink); }

    /* ───── BENEFITS ───── */
    .benefits-card {
      background:
        radial-gradient(circle at top right, rgba(255,215,0,0.10) 0%, transparent 60%),
        linear-gradient(135deg, var(--pink-bg) 0%, var(--pink-light) 100%);
      border: 2px solid var(--pink-soft);
      border-radius: 18px;
      padding: clamp(28px, 3.5vw, 40px);
      margin-bottom: 28px;
      position: relative;
      overflow: hidden;
      box-shadow: var(--shadow-sm);
    }
    .benefits-card::before {
      content: "";
      position: absolute;
      bottom: -40px;
      left: -40px;
      width: 220px;
      height: 220px;
      background-image: url('${PAW_ICON_URL}');
      background-size: contain;
      background-repeat: no-repeat;
      opacity: 0.06;
      transform: rotate(18deg);
      pointer-events: none;
    }
    .benefits-header {
      text-align: center;
      margin-bottom: 22px;
      position: relative;
      z-index: 1;
    }
    .benefits-icon {
      font-size: 56px;
      margin-bottom: 6px;
      filter: drop-shadow(0 4px 12px rgba(245,54,124,0.2));
    }
    .benefits-title {
      margin: 0 0 10px;
      color: var(--pink-deep);
      font-size: clamp(24px, 3vw, 34px);
      font-weight: 700;
      line-height: 1.2;
    }
    .benefits-sub {
      margin: 0 auto;
      max-width: 720px;
      font-size: clamp(15px, 1.3vw, 17px);
      line-height: 1.6;
      color: var(--ink);
    }
    .benefits-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 14px;
      position: relative;
      z-index: 1;
    }
    .benefit {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 14px 18px;
      background: rgba(255,255,255,0.85);
      border-radius: 10px;
      border: 1px solid var(--pink-soft);
      transition: transform .15s ease, box-shadow .25s ease;
    }
    .benefit:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(245,54,124,0.15);
    }
    .benefit-icon {
      font-size: 26px;
      flex-shrink: 0;
      width: 42px;
      height: 42px;
      display: grid;
      place-items: center;
      background: #fff;
      border-radius: 50%;
      box-shadow: 0 2px 6px rgba(0,0,0,0.06);
    }
    .benefit-text {
      font-size: clamp(14px, 1.2vw, 16px);
      font-weight: 500;
      line-height: 1.45;
    }

    /* ───── CLOSING CTA ───── */
    .closing-card {
      background: linear-gradient(135deg, var(--pink) 0%, var(--pink-deep) 100%);
      color: #fff;
      border-radius: 18px;
      padding: clamp(36px, 5vw, 56px) clamp(24px, 4vw, 44px);
      box-shadow: var(--shadow-lg);
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    .closing-card::before,
    .closing-card::after {
      content: "🐾";
      position: absolute;
      font-size: 110px;
      opacity: 0.10;
      top: 50%;
      transform: translateY(-50%) rotate(-12deg);
      pointer-events: none;
    }
    .closing-card::before { left: 4%; }
    .closing-card::after  { right: 4%; transform: translateY(-50%) rotate(12deg); }
    .closing-title {
      margin: 0 0 16px;
      font-size: clamp(26px, 3.5vw, 38px);
      font-weight: 700;
      line-height: 1.2;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      flex-wrap: wrap;
      text-shadow: 0 2px 10px rgba(0,0,0,0.2);
    }
    .closing-body {
      margin: 0 auto 26px;
      max-width: 720px;
      font-size: clamp(16px, 1.4vw, 18px);
      line-height: 1.65;
      opacity: 0.95;
      position: relative;
      z-index: 1;
    }
    .closing-actions {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 14px;
      position: relative;
      z-index: 1;
    }
    .btn {
      display: inline-block;
      padding: 14px 30px;
      border-radius: 999px;
      text-decoration: none;
      font-weight: 700;
      font-size: clamp(15px, 1.3vw, 17px);
      transition: transform .12s ease, box-shadow .2s ease, background .2s ease;
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
    .btn-secondary {
      background: transparent;
      color: #fff;
      border: 2px solid rgba(255,255,255,0.85);
    }
    .btn-secondary:hover {
      background: rgba(255,255,255,0.15);
      transform: translateY(-2px);
    }
    .arrow { display: inline-block; transition: transform .15s ease; }
    .btn:hover .arrow { transform: translateX(4px); }

    /* ───── HEART ANIMATION ───── */
    .heart-pulse {
      display: inline-block;
      animation: heartbeat 1.6s ease-in-out infinite;
    }
    @keyframes heartbeat {
      0%, 100% { transform: scale(1); }
      25%      { transform: scale(1.15); }
      50%      { transform: scale(1); }
    }

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
    @media (max-width: 760px) {
      .benefits-list { grid-template-columns: 1fr; }
      .item {
        grid-template-columns: 1fr;
        text-align: center;
        padding: 24px 20px;
      }
      .item-icon { margin: 0 auto; }
      .item-body { text-align: left; }
      .item:hover { transform: none; }
      .item-num { position: static; margin-bottom: 6px; display: block; text-align: center; }
      .closing-actions { flex-direction: column; align-items: stretch; }
      .btn { text-align: center; }
    }

    @media (max-width: 480px) {
      .hero { min-height: 240px; padding: 32px 18px; }
      .page-body { padding: 24px 14px 40px; }
      .section, .benefits-card { padding: 22px 18px; }
      .intro-card { padding: 22px 18px; }
      .paw-watermark { width: 140px; height: 140px; }
    }

    @media print {
      .closing-card, .hero { display: none; }
      .item { break-inside: avoid; }
    }
  `;

  if (!customElements.get('adoption-requirements')) {
    customElements.define('adoption-requirements', AdoptionRequirements);
  }
})();
