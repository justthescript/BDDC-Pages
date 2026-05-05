/**
 * <bddc-pet-friendly-plate> — Wix Studio Custom Element
 * Big Dogs Don't Cry Animal Rescue — Partner Page: Indiana Pet Friendly License Plate
 *
 * Civic-action partnership: Indiana drivers who switch to the Pet Friendly Plate
 * fund Spay-Neuter Services of Indiana (SNSI), which provides free spay/neuter
 * surgery certificates to ~250 Indiana rescues — including BDDC.
 *
 * Usage in Wix Studio:
 *   1. Add a Custom Element to /pet-friendly-plate
 *   2. Server URL: https://cdn.jsdelivr.net/gh/justthescript/BDDC-Pages@main/bddc-pet-friendly-plate.js
 *   3. Tag Name:   bddc-pet-friendly-plate
 *   4. (Optional)  data-hero-image
 */

(function () {
  const DEFAULT_HERO_IMAGE =
    'https://static.wixstatic.com/media/bc59b6_604fb6f09a314f219daf30e354c81e5a~mv2.webp';

  const PAW_ICON_URL =
    'https://static.wixstatic.com/media/bc59b6_45db072b49a5427f930919d18683e36d~mv2.png';

  // Tracked link — UTM identifies BDDC as the referring partner
  const PLATE_URL = 'https://www.PetFriendlyPlate.org?utm_source=BigDogsDontCryRescue&utm_medium=website&utm_campaign=petplate';

  const PLATE_IMAGE  = 'https://static.wixstatic.com/media/4cb683_f4d779afc94b482289ae0199258dde5d~mv2.png';
  const HAPPY_DOG    = 'https://static.wixstatic.com/media/4cb683_089c111da79a4803b1cadf2106ed8af5~mv2.jpg';
  const PLATE_LOGO   = 'https://static.wixstatic.com/media/4cb683_505a9a9490d1435da03af28dd4dd4602~mv2.png';
  const BMV_IMAGE    = 'https://petfriendlyservices.org/wp-content/uploads/2025/01/chooose-a-plate.png.webp';

  const STATS = [
    { number: '250+', label: 'Indiana rescues supported' },
    { number: '50,000+', label: 'Surgeries funded' },
    { number: '$25', label: 'From every plate to spay/neuter' },
    { number: '100%', label: 'Of funds stay in Indiana' }
  ];

  const FUNNEL_STEPS = [
    {
      num: 1,
      label: 'You switch your plate',
      body: 'Pay $40 once (a $15 one-time plate fee plus $25 for the first year), then just $25 each renewal.'
    },
    {
      num: 2,
      label: 'Funds reach SNSI',
      body: 'Spay-Neuter Services of Indiana receives $25 from your annual fee — 100% of it goes to programs.'
    },
    {
      num: 3,
      label: 'Rescues get certificates',
      body: 'SNSI hands out free spay/neuter surgery certificates to ~250 Indiana rescues — including BDDC.'
    },
    {
      num: 4,
      label: 'Dogs get fixed',
      body: 'Our adoptable dogs go to forever homes already spayed or neutered. Overpopulation drops. Lives are saved.'
    }
  ];

  const SWITCH_STEPS = [
    'Login or create your account on <a href="https://mybmv.bmv.in.gov/bmv/mybmv/default.aspx" target="_blank" rel="noopener noreferrer">myBMV.com</a> (or click "Renew your license plates without creating an account").',
    'Click <strong>"Renew License Plates"</strong>.',
    'Scroll down to the license plate / vehicle you want to switch, and click <strong>"Change My Plate"</strong>.',
    'Under <em>"What category of plate are you looking for?"</em> select <strong>"Special Organizations"</strong>.',
    'Under <em>"Now, what specific plate would you like to order?"</em> select <strong>"Pet-Friendly"</strong>.',
    'Click <strong>"Click Here to Add to Cart"</strong>.',
    'Proceed to checkout. That\'s it — your next plate will be a Pet Friendly Plate.'
  ];

  const FAQ = [
    {
      q: 'How much does the Pet Friendly Plate cost?',
      a: 'The Pet Friendly Plate is $40 your first year — that\'s a $15 one-time plate fee plus a $25 annual emblem fee. After that, just $25 every renewal. The $25 portion goes directly to Spay-Neuter Services of Indiana to fund free spay/neuter surgeries.'
    },
    {
      q: 'When can I switch to a Pet Friendly Plate?',
      a: 'Anytime, as long as your registration is in good standing. The BMV will prorate the fee based on how much time is left on your current registration — so you don\'t have to wait until renewal to make the switch.'
    },
    {
      q: 'How do I renew my Pet Friendly Plate?',
      a: 'Three ways: <strong>(1) Online</strong> at <a href="https://mybmv.bmv.in.gov/bmv/mybmv/default.aspx" target="_blank" rel="noopener noreferrer">myBMV.com</a> — log in, click "Renew License Plates," scroll to your vehicle, click "Add to Cart," and check out. <strong>(2) In person</strong> at any local BMV branch — just request the Pet Friendly plate. <strong>(3) By phone</strong> — call 1-888-692-6841 and use the phone access code on your renewal notice.'
    },
    {
      q: 'What does Pet Friendly Services do with the funding?',
      a: 'They provide financial assistance to animal shelters, rescues, and limited-income pet owners so they can spay or neuter their pets. The programs are targeted and strategic — they go after the root causes of pet overpopulation rather than the symptoms.'
    },
    {
      q: 'How much of the funding goes to fixing pets?',
      a: '<strong>100%.</strong> Pet Friendly Services uses every dollar from the plate for programs and services. None of it goes to overhead or management costs.'
    },
    {
      q: 'Where does Pet Friendly Services help?',
      a: 'All 92 Indiana counties. 100% of the funding stays in Indiana — including the certificates that come to BDDC.'
    }
  ];

  class BDDCPetFriendlyPlate extends HTMLElement {
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
        <style>${this.styles()}</style>

        <!-- HERO -->
        <section class="hero" style="--hero-bg: url('${heroImage}');">
          <div class="hero-inner">
            <div class="hero-badge">🤝 Partner Spotlight</div>
            <h1 class="hero-title">Pet Friendly License Plate</h1>
            <p class="hero-tagline">Make a difference with every mile you drive.</p>
          </div>
        </section>

        <div class="page-body">

          <!-- PLATE SHOWCASE -->
          <section class="plate-showcase reveal">
            <div class="plate-image-wrap">
              <img class="plate-image" src="${PLATE_IMAGE}" alt="Indiana Pet Friendly License Plate" loading="lazy">
            </div>
            <div class="plate-text">
              <div class="section-overline">Indiana Specialty Plate</div>
              <h2 class="plate-headline">A License Plate That Saves Lives</h2>
              <p class="plate-body">
                Indiana's Pet Friendly License Plate is more than a specialty plate — it's a lifeline.
                Every annual renewal sends <strong>$25</strong> directly to Spay-Neuter Services of
                Indiana (SNSI), which funds free spay and neuter surgeries for nearly 250 Indiana
                rescues — Big Dogs Don't Cry included.
              </p>
              <a class="plate-cta" href="${PLATE_URL}" target="_blank" rel="noopener noreferrer">
                Learn more about the plate <span class="arrow">→</span>
              </a>
            </div>
          </section>

          <!-- WHY WE PARTNER -->
          <aside class="partnership-card reveal">
            <div class="partnership-mark">
              <span class="bddc-mark">BDDC</span>
              <span class="partnership-x" aria-hidden="true">×</span>
              <span class="partner-mark">Pet Friendly Plate</span>
            </div>
            <h2 class="partnership-title">Why We Partner With Them</h2>
            <p class="partnership-body">
              Big Dogs Don't Cry depends on the Pet Friendly Plate. SNSI provides us with
              <strong style="display:inline">free spay/neuter surgery certificates</strong> for our
              adoptable dogs — and that funding comes directly from Indiana drivers who chose this
              plate. Switching costs you nothing extra in the long run (it's the same $25/year you'd
              already pay), but for us, it's a real check toward the next foster's vet bill.
              <strong>One plate. Real surgeries. Real lives saved.</strong>
            </p>
          </aside>

          <!-- STATS -->
          <section class="stats-section reveal">
            <div class="stats-grid">
              ${STATS.map(s => `
                <div class="stat">
                  <div class="stat-number">${s.number}</div>
                  <div class="stat-label">${s.label}</div>
                </div>
              `).join('')}
            </div>
          </section>

          <!-- HOW YOUR PLATE HELPS -->
          <section class="funnel-section reveal">
            <div class="paw-watermark" aria-hidden="true"></div>
            <div class="section-head">
              <div class="section-overline">The Flow of Funds</div>
              <h2 class="section-title">How Your Plate Helps</h2>
              <p class="section-lead">
                From your renewal payment to a wagging, just-spayed tail.
              </p>
            </div>
            <div class="funnel-grid">
              ${FUNNEL_STEPS.map(s => `
                <div class="funnel-step">
                  <div class="funnel-num">${s.num}</div>
                  <h4 class="funnel-label">${s.label}</h4>
                  <p class="funnel-body">${s.body}</p>
                </div>
              `).join('')}
            </div>
          </section>

          <!-- HOW TO SWITCH -->
          <section class="switch-section reveal">
            <div class="section-head">
              <div class="section-overline">Five Minutes Online</div>
              <h2 class="section-title">How to Switch Your Plate</h2>
              <p class="section-lead">
                You can switch anytime — the BMV will prorate the fee.
              </p>
            </div>
            <div class="switch-grid">
              <ol class="switch-steps">
                ${SWITCH_STEPS.map((step, i) => `
                  <li class="switch-step">
                    <span class="switch-num">${i + 1}</span>
                    <span class="switch-text">${step}</span>
                  </li>
                `).join('')}
              </ol>
              <div class="switch-image-wrap" aria-hidden="true">
                <img class="switch-image" src="${BMV_IMAGE}" alt="BMV Choose a Plate screenshot" loading="lazy">
                <p class="switch-image-caption">
                  The BMV's "Choose a Plate" screen during the switch flow.
                </p>
              </div>
            </div>
            <div class="switch-alt">
              <strong>Prefer in-person or phone?</strong>
              You can switch at any local BMV branch — just request the Pet Friendly plate.
              Or call <a href="tel:+18886926841">1-888-692-6841</a> if you have a phone access
              code from a renewal notice.
            </div>
          </section>

          <!-- FAQ -->
          <section class="faq-section reveal">
            <div class="section-head">
              <div class="section-overline">Common Questions</div>
              <h2 class="section-title">Frequently Asked Questions</h2>
            </div>
            <div class="faq-list">
              ${FAQ.map((item, i) => `
                <details class="faq-item" ${i === 0 ? 'open' : ''}>
                  <summary class="faq-summary">
                    <span class="faq-q">${item.q}</span>
                    <span class="faq-chevron" aria-hidden="true">▾</span>
                  </summary>
                  <div class="faq-answer">${item.a}</div>
                </details>
              `).join('')}
            </div>
          </section>

          <!-- CTA -->
          <section class="closing-card reveal">
            <h2 class="closing-title">
              <span aria-hidden="true">🐾</span>
              Drive With Purpose
            </h2>
            <p class="closing-body">
              Every Indiana driver who switches to the Pet Friendly Plate funds another spay/neuter
              surgery — and helps a rescue dog reach their forever home, healthy and ready. It costs
              you the same $25/year you'd already pay at renewal. But for the dogs, it changes everything.
            </p>
            <div class="closing-actions">
              <a class="btn btn-primary" href="${PLATE_URL}" target="_blank" rel="noopener noreferrer">
                Get Your Plate <span class="arrow">→</span>
              </a>
              <a class="btn btn-secondary" href="https://mybmv.bmv.in.gov/bmv/mybmv/default.aspx" target="_blank" rel="noopener noreferrer">
                Go to myBMV.com
              </a>
            </div>
            <p class="affiliate-note">
              💛 <strong>About this partnership:</strong> BDDC doesn't receive a cash commission from
              the Pet Friendly Plate program. We receive something better — free spay/neuter surgery
              certificates for our adoptable dogs. Every Indiana driver who switches helps fund the
              vet care that gets our pups ready for their forever homes.
            </p>
          </section>

        </div>
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

    styles() {
      return `
        :host {
          --pink: #F5367C;
          --pink-deep: #c2255c;
          --pink-soft: #ffd9ec;
          --pink-bg: #fff7fa;
          --pink-light: #ffe9f1;
          --blue: #4a90e2;
          --blue-deep: #357abd;
          --blue-soft: #d4e5f7;
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
            linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 100%),
            var(--hero-bg);
          background-size: cover;
          background-position: center;
          background-color: #fdf8ec;
          display: grid;
          place-items: center;
          padding: 48px 24px;
        }
        .hero-inner { text-align: center; max-width: 840px; }
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
          font-size: clamp(36px, 5.5vw, 64px);
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

        /* ───── PLATE SHOWCASE ───── */
        .plate-showcase {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 44px;
          align-items: center;
          margin-bottom: 40px;
          padding: clamp(24px, 3vw, 36px);
          background:
            radial-gradient(circle at top right, rgba(74,144,226,0.10) 0%, transparent 60%),
            linear-gradient(135deg, var(--pink-bg) 0%, #fff 100%);
          border-radius: 22px;
          border: 2px solid var(--pink-soft);
        }
        .plate-image-wrap {
          padding: 14px;
          background: #fff;
          border-radius: 14px;
          box-shadow: var(--shadow-md);
        }
        .plate-image {
          display: block;
          width: 100%;
          height: auto;
          border-radius: 8px;
        }
        .section-overline {
          color: var(--pink);
          font-size: clamp(13px, 1.1vw, 15px);
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .plate-headline {
          margin: 0 0 18px;
          color: var(--pink-deep);
          font-size: clamp(26px, 3.4vw, 38px);
          font-weight: 700;
          line-height: 1.15;
        }
        .plate-body {
          margin: 0 0 20px;
          font-size: clamp(15px, 1.3vw, 17px);
          line-height: 1.7;
          color: var(--ink);
        }
        .plate-body strong { color: var(--pink-deep); }
        .plate-cta {
          font-weight: 700;
          text-decoration: none;
          color: var(--pink-deep);
          font-size: clamp(14px, 1.2vw, 16px);
        }
        .plate-cta:hover { color: var(--pink); }
        .plate-cta .arrow {
          display: inline-block;
          transition: transform .2s ease;
        }
        .plate-cta:hover .arrow { transform: translateX(4px); }

        /* ───── PARTNERSHIP CARD ───── */
        .partnership-card {
          background:
            radial-gradient(circle at top right, rgba(255,215,0,0.12) 0%, transparent 60%),
            linear-gradient(135deg, var(--pink-bg) 0%, var(--pink-light) 100%);
          border: 2px solid var(--pink-soft);
          border-radius: 18px;
          padding: clamp(28px, 3.5vw, 40px);
          margin-bottom: 40px;
          text-align: center;
        }
        .partnership-mark {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 14px;
          font-weight: 700;
          font-size: clamp(15px, 1.3vw, 17px);
          letter-spacing: 2px;
          color: var(--pink-deep);
          text-transform: uppercase;
        }
        .bddc-mark, .partner-mark {
          padding: 6px 14px;
          background: #fff;
          border-radius: 999px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        .bddc-mark { background: var(--pink); color: #fff; }
        .partnership-x {
          font-size: 1.6em;
          color: var(--pink);
          opacity: 0.7;
          font-weight: 400;
          letter-spacing: 0;
        }
        .partnership-title {
          margin: 0 0 14px;
          color: var(--pink-deep);
          font-size: clamp(24px, 3vw, 32px);
          font-weight: 700;
          line-height: 1.2;
        }
        .partnership-body {
          margin: 0 auto;
          max-width: 760px;
          font-size: clamp(16px, 1.35vw, 18px);
          line-height: 1.65;
          color: var(--ink);
        }
        .partnership-body strong:last-child {
          display: block;
          margin-top: 12px;
          color: var(--pink-deep);
        }

        /* ───── STATS ───── */
        .stats-section { margin-bottom: 48px; }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }
        .stat {
          background: #fff;
          border-radius: 16px;
          padding: 28px 16px;
          text-align: center;
          box-shadow: var(--shadow-sm);
          border: 2px solid var(--pink-soft);
          transition: transform .15s ease, box-shadow .25s ease, border-color .25s ease;
        }
        .stat:hover {
          transform: translateY(-4px);
          border-color: var(--pink);
          box-shadow: var(--shadow-md);
        }
        .stat-number {
          font-size: clamp(32px, 4vw, 48px);
          font-weight: 800;
          line-height: 1;
          background: linear-gradient(135deg, var(--pink) 0%, var(--pink-deep) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 8px;
        }
        .stat-label {
          font-size: clamp(13px, 1.05vw, 14px);
          font-weight: 600;
          color: var(--ink);
          line-height: 1.35;
        }

        /* ───── SECTION HEAD ───── */
        .section-head {
          text-align: center;
          margin-bottom: 32px;
          position: relative;
          z-index: 1;
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

        /* ───── FUNNEL ───── */
        .funnel-section {
          position: relative;
          background: #fff;
          padding: clamp(32px, 4vw, 48px);
          border-radius: 20px;
          box-shadow: var(--shadow-sm);
          margin-bottom: 48px;
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
        .funnel-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          position: relative;
          z-index: 1;
        }
        .funnel-step {
          background: var(--pink-bg);
          border-radius: 14px;
          padding: 28px 20px;
          text-align: center;
          border: 2px solid var(--pink-soft);
          transition: transform .15s ease, border-color .25s ease;
        }
        .funnel-step:hover {
          transform: translateY(-4px);
          border-color: var(--pink);
        }
        .funnel-num {
          width: 52px;
          height: 52px;
          margin: 0 auto 14px;
          background: linear-gradient(135deg, var(--pink) 0%, var(--pink-deep) 100%);
          color: #fff;
          font-size: 20px;
          font-weight: 700;
          border-radius: 50%;
          display: grid;
          place-items: center;
          box-shadow: 0 6px 16px rgba(245,54,124,0.30);
        }
        .funnel-label {
          margin: 0 0 10px;
          color: var(--pink-deep);
          font-size: clamp(16px, 1.5vw, 19px);
          font-weight: 700;
          line-height: 1.25;
        }
        .funnel-body {
          margin: 0;
          font-size: clamp(13px, 1.1vw, 15px);
          line-height: 1.55;
          color: var(--ink);
        }

        /* ───── HOW TO SWITCH ───── */
        .switch-section {
          background: #fff;
          padding: clamp(32px, 4vw, 48px);
          border-radius: 20px;
          box-shadow: var(--shadow-sm);
          margin-bottom: 48px;
        }
        .switch-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 36px;
          align-items: start;
        }
        .switch-steps {
          list-style: none;
          padding: 0;
          margin: 0;
          counter-reset: step;
        }
        .switch-step {
          display: grid;
          grid-template-columns: 44px 1fr;
          gap: 16px;
          align-items: start;
          padding: 14px 0;
          border-bottom: 1px solid var(--pink-soft);
        }
        .switch-step:last-child { border-bottom: 0; }
        .switch-num {
          width: 36px;
          height: 36px;
          background: var(--pink);
          color: #fff;
          font-weight: 700;
          font-size: 15px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          box-shadow: 0 3px 8px rgba(245,54,124,0.25);
        }
        .switch-text {
          font-size: clamp(14px, 1.2vw, 16px);
          line-height: 1.6;
          color: var(--ink);
          padding-top: 6px;
        }
        .switch-text strong { color: var(--pink-deep); }
        .switch-text em { color: var(--muted); }
        .switch-image-wrap {
          background: linear-gradient(135deg, var(--pink-bg) 0%, var(--pink-light) 100%);
          padding: 14px;
          border-radius: 14px;
          border: 1px solid var(--pink-soft);
          position: sticky;
          top: 20px;
        }
        .switch-image {
          display: block;
          width: 100%;
          height: auto;
          border-radius: 10px;
          box-shadow: var(--shadow-sm);
        }
        .switch-image-caption {
          margin: 12px 4px 0;
          font-size: 13px;
          font-style: italic;
          color: var(--muted);
          text-align: center;
          line-height: 1.4;
        }
        .switch-alt {
          margin-top: 28px;
          padding: 18px 22px;
          background: var(--pink-bg);
          border-left: 4px solid var(--pink);
          border-radius: 8px;
          font-size: clamp(14px, 1.2vw, 16px);
          line-height: 1.6;
          color: var(--ink);
        }
        .switch-alt strong {
          color: var(--pink-deep);
          margin-right: 6px;
        }
        .switch-alt a { font-weight: 700; }

        /* ───── FAQ ───── */
        .faq-section {
          background: #fff;
          padding: clamp(32px, 4vw, 48px);
          border-radius: 20px;
          box-shadow: var(--shadow-sm);
          margin-bottom: 48px;
        }
        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-width: 880px;
          margin: 0 auto;
        }
        .faq-item {
          background: var(--pink-bg);
          border-radius: 14px;
          border: 2px solid var(--pink-soft);
          overflow: hidden;
          transition: border-color .2s ease;
        }
        .faq-item[open] { border-color: var(--pink); }
        .faq-summary {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 18px 22px;
          cursor: pointer;
          list-style: none;
          font-weight: 700;
          color: var(--pink-deep);
          font-size: clamp(15px, 1.4vw, 18px);
          transition: background .2s ease;
        }
        .faq-summary::-webkit-details-marker { display: none; }
        .faq-summary:hover { background: rgba(245,54,124,0.04); }
        .faq-q { flex: 1; line-height: 1.35; }
        .faq-chevron {
          color: var(--pink);
          font-size: 18px;
          transition: transform .25s ease;
          flex-shrink: 0;
        }
        .faq-item[open] .faq-chevron { transform: rotate(180deg); }
        .faq-answer {
          padding: 4px 22px 22px;
          font-size: clamp(14px, 1.2vw, 16px);
          line-height: 1.65;
          color: var(--ink);
        }
        .faq-answer strong { color: var(--pink-deep); }
        .faq-answer a { font-weight: 700; }

        /* ───── CLOSING CTA ───── */
        .closing-card {
          background: linear-gradient(135deg, var(--pink) 0%, var(--pink-deep) 100%);
          color: #fff;
          border-radius: 22px;
          padding: clamp(40px, 5vw, 60px) clamp(24px, 4vw, 48px);
          box-shadow: var(--shadow-lg);
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .closing-card::before,
        .closing-card::after {
          content: "🐾";
          position: absolute;
          font-size: 120px;
          opacity: 0.10;
          top: 50%;
          transform: translateY(-50%) rotate(-12deg);
          pointer-events: none;
        }
        .closing-card::before { left: 4%; }
        .closing-card::after  { right: 4%; transform: translateY(-50%) rotate(12deg); }
        .closing-title {
          margin: 0 0 16px;
          font-size: clamp(28px, 3.6vw, 40px);
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
          margin-bottom: 28px;
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
        .affiliate-note {
          margin: 0 auto;
          max-width: 760px;
          font-size: clamp(13px, 1.1vw, 14px);
          line-height: 1.55;
          opacity: 0.88;
          position: relative;
          z-index: 1;
          padding: 14px 20px;
          background: rgba(255,255,255,0.1);
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.2);
          text-align: left;
        }
        .affiliate-note strong { color: #fff; }

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
        }

        /* ───── RESPONSIVE ───── */
        @media (max-width: 1000px) {
          .plate-showcase { grid-template-columns: 1fr; gap: 28px; text-align: center; }
          .plate-image-wrap { max-width: 480px; margin: 0 auto; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .funnel-grid { grid-template-columns: repeat(2, 1fr); }
          .switch-grid { grid-template-columns: 1fr; gap: 28px; }
          .switch-image-wrap { position: static; max-width: 540px; margin: 0 auto; }
        }

        @media (max-width: 600px) {
          .hero { min-height: 260px; padding: 36px 18px; }
          .partnership-mark { font-size: 12px; gap: 10px; flex-wrap: wrap; justify-content: center; }
          .closing-actions { flex-direction: column; align-items: stretch; }
          .btn { text-align: center; }
        }

        @media (max-width: 420px) {
          .stats-grid { grid-template-columns: 1fr; }
          .funnel-grid { grid-template-columns: 1fr; }
          .page-body { padding: 24px 14px 40px; }
        }
      `;
    }
  }

  if (!customElements.get('bddc-pet-friendly-plate')) {
    customElements.define('bddc-pet-friendly-plate', BDDCPetFriendlyPlate);
  }
})();
