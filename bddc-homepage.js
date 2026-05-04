/**
 * <bddc-homepage> — Wix Studio Custom Element
 * Big Dogs Don't Cry Animal Rescue — Homepage
 *
 * Usage in Wix Studio:
 *   1. Add a Custom Element to the page
 *   2. Server URL: https://justthescript.github.io/BDDC-Pages/bddc-homepage.js
 *      (or jsDelivr: https://cdn.jsdelivr.net/gh/justthescript/BDDC-Pages@main/bddc-homepage.js)
 *   3. Tag Name: bddc-homepage
 *   4. (Optional attributes — set on the element via Wix's "Set Attributes" panel)
 *        data-hero-image    : URL to hero background image (paw + hand)
 *        data-stats-endpoint: URL returning JSON { petsToDate, adopted, monthlyAvg }
 *        data-pets-to-date  : Manual override for "Pets to date" count
 *        data-adopted       : Manual override for "Adopted Pets" count
 *        data-monthly-avg   : Manual override for "Average X Pets Rescued Monthly"
 *
 *   The featured pet always pulls live from the existing Apps Script endpoint.
 */

(function () {
  const FEATURED_PET_ENDPOINT =
    'https://script.google.com/macros/s/AKfycbzqJFFR6B_iO1-vr9mpPXyqPcEDGymExCykFN6MkSLxbEsyES9_bL4eDpUmD0pGu-c3VA/exec';

  // Fallback stats if no endpoint or attributes are provided.
  const DEFAULT_PETS_TO_DATE = 405;
  const DEFAULT_ADOPTED = 367;
  const DEFAULT_MONTHLY_AVG = 25;

  // Default hero image (the paw + hand image from the current Wix homepage).
  // If your image URL differs, set data-hero-image on the element.
  const DEFAULT_HERO_IMAGE =
    'https://static.wixstatic.com/media/bc59b6_604fb6f09a314f219daf30e354c81e5a~mv2.webp';

  // Paw print icon used in the Rescue/Rehabilitate/Rehome pillar cards.
  const PAW_ICON_URL =
    'https://static.wixstatic.com/media/bc59b6_45db072b49a5427f930919d18683e36d~mv2.png';

  class BDDCHomepage extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
      this.render();
      this.loadFeaturedPet();
      this.loadStats();
    }

    // ────────────────────────────────────────────────────────────────────
    // Render
    // ────────────────────────────────────────────────────────────────────
    render() {
      const heroImage = this.getAttribute('data-hero-image') || DEFAULT_HERO_IMAGE;

      this.shadowRoot.innerHTML = `
        <style>${this.styles()}</style>

        <!-- HERO -->
        <section class="hero" style="--hero-bg: url('${heroImage}');">
          <div class="hero-inner">
            <h1 class="hero-title">From Foster to Forever</h1>
          </div>
          <div class="hero-cta">
            <a class="cta-mission" href="#mission">Our Mission</a>
            <a class="cta-cause" href="https://www.bigdogsdontcry.com/get-involved" target="_blank" rel="noopener">Join Our Cause</a>
          </div>
        </section>

        <!-- WELCOME -->
        <section id="mission" class="welcome">
          <h2 class="welcome-headline">
            Committed to Saving and Rehoming Abandoned and at Risk for euthanasia Animals!
          </h2>
          <h3 class="welcome-sub">Welcome to Big Dogs Don't Cry!</h3>
          <p class="welcome-body">
            We are a compassionate foster-based pet rescue organization located in Merrillville, Indiana,
            committed to saving large dog breeds while also extending our resources and kindness to all pets in need.
            Our heartfelt initiative is supported by our wonderful local community, allowing us to provide a
            nurturing environment filled with love and hope. Together, we can change the lives of these animals
            one paw at a time. Discover how you can contribute to our mission and help bring joy to deserving pets.
          </p>
          <a class="learn-more" href="https://www.bigdogsdontcry.com/who-we-are" target="_blank" rel="noopener">
            Learn More <span class="arrow">→</span>
          </a>
        </section>

        <!-- THREE PILLARS -->
        <section class="pillars">
          ${this.pillarCard('Rescue', 'We believe rescuing pets not only saves their lives but also transforms them into loving companions. Every pet we rescue has a unique story and potential for joy, and by adopting from us, you\u2019re giving them a second chance at life. Together, we can build a brighter future for these loving animals. Join us in our mission to make a difference!')}
          ${this.pillarCard('Rehabilitate', 'Rehabilitation at Big Dogs Don\u2019t Cry signifies a beacon of hope for pets in dire circumstances. It involves not only physical healing but also emotional support to help them regain their confidence. Through tailored strategies and compassionate care, we aim to reintegrate these furry friends back into loving homes. Experience the profound impact of our rehabilitation programs and how together we can change lives.')}
          ${this.pillarCard('Rehome', 'At Big Dogs Don\u2019t Cry, we are dedicated to finding loving homes for pets in need. Every animal matters, and our mission is to ensure that no pup faces the heartbreaking fate of euthanization. If you\u2019re looking to adopt, please explore our rehoming options and help us save lives. Together, we can make a difference!')}
        </section>

        <!-- FEATURED PET -->
        <section class="featured-section">
          <h2 class="section-title">Meet Our Adoptable Pet of the Week</h2>
          <div id="featured-pet" class="featured-wrap">
            <div class="featured-loading">Loading featured pet…</div>
          </div>
        </section>

        <!-- STATS -->
        <section class="stats-section">
          <h2 class="section-title">See the Lives We've Touched</h2>
          <div class="stats-grid">
            <div class="stat stat-blue">
              <div class="stat-label">Rescued</div>
              <div class="stat-number" id="stat-rescued">${DEFAULT_PETS_TO_DATE}</div>
              <div class="stat-tag">Pets to date</div>
            </div>
            <div class="stat stat-pink-soft">
              <div class="stat-label">Saving Lives:</div>
              <div class="stat-number" id="stat-adopted">${DEFAULT_ADOPTED}</div>
              <div class="stat-tag">Adopted Pets</div>
            </div>
            <div class="stat stat-pink">
              <div class="stat-label-only">
                Average <span id="stat-monthly">${DEFAULT_MONTHLY_AVG}</span> Pets Rescued Monthly
              </div>
            </div>
          </div>
        </section>

        <!-- MAKE A DIFFERENCE -->
        <section class="diff-section">
          <h2 class="section-title">Make a Difference Today</h2>
          <div class="diff-grid">
            <div class="diff-col">
              <h3 class="diff-title">Donate</h3>
              <p class="diff-body">
                Your generous donations to Big Dogs Don't Cry make a significant impact in the lives of pets in need.
                Every dollar you contribute helps us provide essential care, food, and medical treatment for our rescued dogs.
                Together, we can create a brighter future for these loving animals. Thank you for your support!
              </p>
              <a class="diff-link" href="https://www.bigdogsdontcry.com/donations" target="_blank" rel="noopener">
                Donate <span class="arrow">→</span>
              </a>
            </div>
            <div class="diff-col">
              <h3 class="diff-title">Volunteer Opportunities</h3>
              <p class="diff-body">
                Want to make a meaningful impact in the lives of pets and their future? Volunteering with Big Dogs Don't Cry
                provides a rewarding opportunity to help our rescue animals thrive. From engaging with rescues at the shelter
                to organizing community education events, every contribution counts! Get involved and help us create a brighter
                future for those who can't speak for themselves.
              </p>
              <a class="diff-link" href="https://www.bigdogsdontcry.com/volunteer" target="_blank" rel="noopener">
                Volunteer <span class="arrow">→</span>
              </a>
            </div>
            <div class="diff-col">
              <h3 class="diff-title">Adopt</h3>
              <p class="diff-body">
                When you adopt a pet from Big Dogs Don't Cry, you are giving an innocent dog a second chance at life.
                Each successful adoption opens the door for us to rescue another needy dog, allowing us to save more lives.
                Together, we can create a brighter future for these loving companions. Make a choice that saves lives—adopt today!
              </p>
              <a class="diff-link" href="https://www.bigdogsdontcry.com/adoptable" target="_blank" rel="noopener">
                Adopt <span class="arrow">→</span>
              </a>
            </div>
          </div>
        </section>

        <!-- CONTACT -->
        <section class="contact-section">
          <div class="contact-inner">
            <div class="contact-header">
              <div class="contact-overline">Get in Touch</div>
              <h2 class="contact-title">We're Here to Help</h2>
            </div>
            <div class="contact-rows">
              <div class="contact-row">
                <div class="contact-label">
                  <span class="paw paw-blue">${this.pawSVG()}</span>
                  <span>Write Us</span>
                </div>
                <a class="contact-value" href="mailto:bigdogsdontcryrescue@gmail.com">
                  BIGDOGSDONTCRYRESCUE@GMAIL.COM
                </a>
              </div>
              <div class="contact-row">
                <div class="contact-label">
                  <span class="paw paw-pink">${this.pawSVG()}</span>
                  <span>Call Us</span>
                </div>
                <a class="contact-value" href="tel:+12198411142">219-841-1142</a>
              </div>
            </div>
          </div>
        </section>
      `;
    }

    pillarCard(title, body) {
      return `
        <article class="pillar">
          <div class="pillar-icon">
            <img src="${PAW_ICON_URL}" alt="" aria-hidden="true">
          </div>
          <h3 class="pillar-title">${title}</h3>
          <p class="pillar-body">${body}</p>
        </article>
      `;
    }

    pawSVG() {
      // Decorative SVG paw used in the contact section (so it can be color-tinted).
      return `
        <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <ellipse cx="20" cy="20" rx="6" ry="8"/>
          <ellipse cx="44" cy="20" rx="6" ry="8"/>
          <ellipse cx="10" cy="34" rx="5" ry="7"/>
          <ellipse cx="54" cy="34" rx="5" ry="7"/>
          <path d="M32 28 C 22 28, 16 38, 18 46 C 20 54, 28 56, 32 56 C 36 56, 44 54, 46 46 C 48 38, 42 28, 32 28 Z"/>
        </svg>
      `;
    }

    // ────────────────────────────────────────────────────────────────────
    // Featured pet
    // ────────────────────────────────────────────────────────────────────
    async loadFeaturedPet() {
      const host = this.shadowRoot.getElementById('featured-pet');
      try {
        const res = await fetch(FEATURED_PET_ENDPOINT, { cache: 'no-store' });
        const p = await res.json();

        if (!p || !p.id) {
          host.innerHTML = '<p class="featured-empty">No featured pet yet.</p>';
          return;
        }

        const safeDesc = p.description
          ? String(p.description).replace(/</g, '&lt;').replace(/\n/g, '<br>')
          : '';

        const img = (p.images && p.images.length)
          ? `<img src="${p.images[0]}" alt="${p.name}" class="pet-photo">`
          : '';

        const fee = (p.adoptionFee != null)
          ? `<div class="pet-fee">💲 ${p.adoptionFee}${p.adoptionFeeCurrency ? ' ' + p.adoptionFeeCurrency : ''}</div>`
          : '';

        const meta = [p.status, p.species, p.age, p.breed].filter(Boolean).join(' · ');
        const viewUrl = `https://www.bigdogsdontcry.com/adoptable-1/${encodeURIComponent(p.id)}`;
        const applyUrl = 'https://www.bigdogsdontcry.com/adoption-application';

        host.innerHTML = `
          <article class="featured-card">
            <div class="photo-wrap">${img}</div>
            <div class="pet-info">
              <h3>🐾 Meet ${p.name}!</h3>
              <div class="pet-meta">${meta}</div>
              ${fee}
              ${safeDesc ? `<p class="pet-desc">${safeDesc}</p>` : ''}
              <div class="pet-actions">
                <a class="btn btn-primary" href="${viewUrl}" target="_blank" rel="noopener">View Me!</a>
                <a class="btn btn-secondary" href="${applyUrl}" target="_blank" rel="noopener">❤️ Apply for me!</a>
              </div>
            </div>
          </article>
        `;
      } catch (err) {
        console.error('Featured pet fetch failed', err);
        host.innerHTML = '<p class="featured-empty">Error loading featured pet.</p>';
      }
    }

    // ────────────────────────────────────────────────────────────────────
    // Stats
    // ────────────────────────────────────────────────────────────────────
    async loadStats() {
      // Priority order:
      // 1) data-stats-endpoint (live JSON)
      // 2) data-pets-to-date / data-adopted / data-monthly-avg (manual override)
      // 3) Hardcoded defaults already rendered

      const endpoint = this.getAttribute('data-stats-endpoint');

      // Manual attribute overrides (apply regardless of endpoint)
      const ptd = this.getAttribute('data-pets-to-date');
      const adp = this.getAttribute('data-adopted');
      const mAvg = this.getAttribute('data-monthly-avg');
      if (ptd) this.setStat('stat-rescued', ptd);
      if (adp) this.setStat('stat-adopted', adp);
      if (mAvg) this.setStat('stat-monthly', mAvg);

      if (!endpoint) return;

      try {
        const res = await fetch(endpoint, { cache: 'no-store' });
        const data = await res.json();
        if (data.petsToDate != null) this.setStat('stat-rescued', data.petsToDate);
        if (data.adopted != null) this.setStat('stat-adopted', data.adopted);
        if (data.monthlyAvg != null) this.setStat('stat-monthly', data.monthlyAvg);
      } catch (err) {
        console.warn('Stats endpoint failed, using defaults/overrides:', err);
      }
    }

    setStat(id, value) {
      const el = this.shadowRoot.getElementById(id);
      if (el) el.textContent = String(value);
    }

    // ────────────────────────────────────────────────────────────────────
    // Styles
    // ────────────────────────────────────────────────────────────────────
    styles() {
      return `
        :host {
          --pink: #F5367C;
          --pink-deep: #c2255c;
          --pink-soft: #ffd9ec;
          --pink-bg: #fff7fa;
          --purple: #845ef7;
          --purple-deep: #7048e8;
          --blue-soft: #8da7f0;
          --ink: #2a2a2a;
          --muted: #555;
          --shadow-sm: 0 4px 12px rgba(0,0,0,0.08);
          --shadow-md: 0 6px 18px rgba(245,54,124,0.18);
          --shadow-lg: 0 10px 26px rgba(245,54,124,0.22);
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
          min-height: 360px;
          background-image: var(--hero-bg);
          background-size: cover;
          background-position: center;
          background-color: #fdf8ec;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          justify-content: center;
        }
        .hero-inner {
          flex: 1;
          display: grid;
          place-items: center;
          padding: 40px 20px 24px;
        }
        .hero-title {
          margin: 0;
          font-size: clamp(36px, 6vw, 64px);
          font-weight: 700;
          color: var(--pink);
          text-align: center;
          text-shadow: 0 2px 14px rgba(255,255,255,0.7);
        }
        .hero-cta {
          display: grid;
          grid-template-columns: 1fr 1fr;
          width: 100%;
        }
        .cta-mission, .cta-cause {
          padding: 18px 16px;
          text-align: center;
          font-weight: 700;
          font-size: 1.05em;
          text-decoration: none;
          color: #fff;
          transition: filter .15s ease;
        }
        .cta-mission { background: var(--blue-soft); }
        .cta-cause   { background: var(--pink); }
        .cta-mission:hover, .cta-cause:hover { filter: brightness(0.95); }

        /* ───── WELCOME ───── */
        .welcome {
          padding: 48px 24px 16px;
          max-width: 1100px;
          margin: 0 auto;
          text-align: center;
        }
        .welcome-headline {
          margin: 0 0 24px;
          color: var(--pink);
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 700;
          line-height: 1.15;
        }
        .welcome-sub {
          margin: 24px 0 14px;
          font-size: clamp(20px, 2.6vw, 28px);
          color: #3b3b5c;
          font-weight: 600;
        }
        .welcome-body {
          margin: 0 auto;
          max-width: 980px;
          font-weight: 600;
          color: var(--ink);
          line-height: 1.6;
          font-size: clamp(16px, 1.4vw, 19px);
        }
        .learn-more {
          display: inline-block;
          margin-top: 18px;
          color: #7a7a93;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.05em;
        }
        .learn-more:hover { color: var(--pink); }
        .arrow { display: inline-block; transition: transform .15s ease; }
        .learn-more:hover .arrow,
        .diff-link:hover .arrow { transform: translateX(4px); }

        /* ───── PILLARS ───── */
        .pillars {
          max-width: 1200px;
          margin: 24px auto 8px;
          padding: 16px 24px;
          display: grid;
          gap: 22px;
        }
        .pillar {
          display: grid;
          grid-template-columns: auto minmax(180px, 1.1fr) 2fr;
          align-items: center;
          gap: 28px 36px;
          padding: 32px 40px;
          border: 2px solid #b8c4f0;
          border-radius: 16px;
          background: #fff;
        }
        .pillar-icon {
          display: grid;
          place-items: center;
          width: 80px;
          height: 80px;
        }
        .pillar-icon img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }
        .pillar-icon svg {
          width: 56px;
          height: 56px;
          fill: #2a2a2a;
        }
        .pillar-title {
          margin: 0;
          color: var(--pink);
          font-size: clamp(32px, 3.8vw, 48px);
          font-weight: 700;
          letter-spacing: .3px;
          line-height: 1.05;
        }
        .pillar-body {
          margin: 0;
          font-weight: 600;
          line-height: 1.6;
          color: var(--ink);
          font-size: clamp(16px, 1.3vw, 19px);
        }

        /* ───── SECTION TITLES ───── */
        .section-title {
          text-align: center;
          color: var(--pink);
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 700;
          margin: 48px 16px 20px;
        }

        /* ───── FEATURED PET ───── */
        .featured-section { padding: 0 16px; }
        .featured-wrap {
          display: flex;
          justify-content: center;
          padding: 8px 0 16px;
        }
        .featured-loading,
        .featured-empty {
          color: var(--muted);
          font-style: italic;
          padding: 24px;
        }
        .featured-card {
          display: flex;
          align-items: stretch;
          gap: 28px;
          padding: 28px;
          border: 2px solid #f3d8e2;
          border-radius: 18px;
          background: var(--pink-bg);
          max-width: 1080px;
          width: 100%;
          box-shadow: 0 6px 16px rgba(0,0,0,0.08);
          overflow: hidden;
        }
        .photo-wrap {
          display: grid;
          place-items: center;
          width: 320px;
          padding: 4px;
          flex-shrink: 0;
        }
        .pet-photo {
          width: 300px;
          height: 300px;
          object-fit: cover;
          border-radius: 16px;
          border: 4px solid #ffb6c1;
          display: block;
          max-width: 100%;
        }
        .pet-info { flex: 1; min-width: 0; }
        .pet-info h3 {
          margin: 0 0 8px;
          font-size: 1.8em;
          color: var(--pink-deep);
        }
        .pet-meta {
          font-size: 1.05em;
          color: #666;
          margin-bottom: 10px;
        }
        .pet-fee {
          font-weight: 700;
          color: #2b8a3e;
          margin-bottom: 12px;
          font-size: 1.1em;
        }
        .pet-desc {
          margin: 0 0 16px;
          font-size: 1.02em;
          line-height: 1.6;
          color: #333;
          overflow-wrap: anywhere;
        }
        .pet-actions {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 20px;
          margin-top: 10px;
        }
        .btn {
          display: inline-block;
          padding: 12px 22px;
          border-radius: 999px;
          text-decoration: none;
          font-weight: 700;
          font-size: 1.05em;
          transition: transform .06s ease, box-shadow .2s ease, background .2s ease;
          box-shadow: 0 2px 6px rgba(0,0,0,0.08);
        }
        .btn:active { transform: translateY(1px); }
        .btn-primary { background: var(--purple); color: #fff; }
        .btn-primary:hover { background: var(--purple-deep); }
        .btn-secondary {
          background: #ffe3ec;
          color: var(--pink-deep);
          border: 1px solid #ffc9de;
        }
        .btn-secondary:hover { background: #ffd6e6; }

        /* ───── STATS ───── */
        .stats-section { padding: 0 0 24px; }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          width: 100%;
        }
        .stat {
          padding: 80px 24px;
          display: grid;
          place-items: center;
          text-align: center;
          color: #fff;
          min-height: 240px;
        }
        .stat-blue       { background: #8da7f0; }
        .stat-pink-soft  { background: #ffd6e8; color: var(--ink); }
        .stat-pink       { background: var(--pink); }
        .stat-label {
          font-size: clamp(18px, 1.7vw, 24px);
          font-weight: 700;
          margin-bottom: 12px;
          letter-spacing: .3px;
        }
        .stat-number {
          font-size: clamp(56px, 7vw, 88px);
          font-weight: 800;
          color: #ee2a4f;
          text-shadow:
            -2px -2px 0 #1a1a1a,
            2px -2px 0 #1a1a1a,
            -2px 2px 0 #1a1a1a,
            2px 2px 0 #1a1a1a;
          letter-spacing: 1px;
          line-height: 1;
          margin: 8px 0;
        }
        .stat-tag {
          font-size: clamp(18px, 1.7vw, 24px);
          font-weight: 700;
          margin-top: 10px;
          letter-spacing: .3px;
        }
        .stat-label-only {
          font-size: clamp(22px, 2.4vw, 32px);
          font-weight: 700;
          line-height: 1.3;
          letter-spacing: .3px;
        }
        .stat-label-only #stat-monthly {
          color: #ee2a4f;
          text-shadow:
            -1.5px -1.5px 0 #1a1a1a,
            1.5px -1.5px 0 #1a1a1a,
            -1.5px 1.5px 0 #1a1a1a,
            1.5px 1.5px 0 #1a1a1a;
          font-size: 1.4em;
          padding: 0 4px;
        }

        /* ───── MAKE A DIFFERENCE ───── */
        .diff-section { padding: 8px 24px 32px; }
        .diff-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .diff-col {
          text-align: center;
          padding: 16px 8px;
        }
        .diff-title {
          margin: 0 0 16px;
          font-weight: 600;
          font-size: clamp(24px, 2.6vw, 32px);
          color: #3b3b5c;
        }
        .diff-body {
          color: var(--pink);
          line-height: 1.6;
          font-weight: 500;
          font-size: clamp(15px, 1.2vw, 17px);
          margin: 0 0 20px;
        }
        .diff-link {
          color: #4a4a66;
          font-weight: 600;
          text-decoration: none;
          font-size: 1.05em;
        }
        .diff-link:hover { color: var(--pink); }

        /* ───── CONTACT ───── */
        .contact-section {
          padding: 32px 24px 60px;
          background: #fff;
        }
        .contact-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          align-items: start;
        }
        .contact-overline {
          color: #f792b6;
          font-weight: 600;
          font-size: 1.1em;
          margin-bottom: 6px;
        }
        .contact-title {
          margin: 0;
          color: var(--pink);
          font-size: clamp(28px, 4vw, 40px);
          font-weight: 700;
        }
        .contact-rows {
          display: grid;
          gap: 28px;
        }
        .contact-row {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          align-items: center;
          gap: 16px;
        }
        .contact-label {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 1.15em;
          color: #4a4a66;
        }
        .paw {
          width: 32px;
          height: 32px;
          display: grid;
          place-items: center;
        }
        .paw svg { width: 100%; height: 100%; }
        .paw-blue svg { fill: #8da7f0; }
        .paw-pink svg { fill: var(--pink); }
        .contact-value {
          color: var(--pink);
          font-weight: 700;
          font-size: clamp(16px, 2vw, 22px);
          text-decoration: none;
          word-break: break-all;
        }
        .contact-value:hover { text-decoration: underline; }

        /* ───── RESPONSIVE ───── */
        @media (max-width: 900px) {
          .pillar {
            grid-template-columns: 1fr;
            gap: 14px;
            text-align: center;
            padding: 28px 24px;
          }
          .pillar-icon {
            margin: 0 auto;
          }
          .pillar-title {
            font-size: clamp(28px, 7vw, 36px);
          }
          .pillar-body {
            font-size: 16px;
          }
          .stat { padding: 56px 20px; min-height: 200px; }
          .stat-label, .stat-tag { font-size: 18px; }
          .stat-number { font-size: 64px; }
          .stat-label-only { font-size: 22px; }
          .stats-grid { grid-template-columns: 1fr; }
          .diff-grid { grid-template-columns: 1fr; gap: 24px; }
          .diff-body { font-size: 16px; }
          .contact-inner { grid-template-columns: 1fr; }
          .contact-row { grid-template-columns: 1fr; gap: 6px; }
          .featured-card {
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 20px;
            gap: 18px;
          }
          .photo-wrap { width: 100%; }
          .pet-photo { width: 100%; height: auto; max-width: 420px; }
          .pet-actions { justify-content: center; gap: 16px; }
          .welcome-body { font-size: 16px; }
        }

        @media (max-width: 520px) {
          .hero { min-height: 280px; }
          .hero-cta { grid-template-columns: 1fr; }
          .welcome { padding: 32px 18px 8px; }
          .pillars { padding: 12px 18px; }
          .pillar-icon { width: 64px; height: 64px; }
        }
      `;
    }
  }

  if (!customElements.get('bddc-homepage')) {
    customElements.define('bddc-homepage', BDDCHomepage);
  }
})();
