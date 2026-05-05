/**
 * <bddc-down-south-doggies> — Wix Studio Custom Element
 * Big Dogs Don't Cry Animal Rescue — Partner Page: Down South Doggies
 *
 * Frames Down South Doggies as a recommended partner. The discount code
 * "BDDC" at checkout sends 30% of the order back to BDDC.
 *
 * Usage in Wix Studio:
 *   1. Add a Custom Element to /down-south-doggies
 *   2. Server URL: https://cdn.jsdelivr.net/gh/justthescript/BDDC-Pages@main/bddc-down-south-doggies.js
 *   3. Tag Name:   bddc-down-south-doggies
 *   4. (Optional)  data-hero-image
 */

(function () {
  const DEFAULT_HERO_IMAGE =
    'https://static.wixstatic.com/media/bc59b6_604fb6f09a314f219daf30e354c81e5a~mv2.webp';

  const PAW_ICON_URL =
    'https://static.wixstatic.com/media/bc59b6_45db072b49a5427f930919d18683e36d~mv2.png';

  // Shop links — all point to /shop with affiliate tracking parameter
  const SHOP_URL = 'https://www.downsouthdoggies.com/shop?affiliate=BDDC';

  // Lifestyle image used in the story section
  const STORY_IMAGE =
    'https://static.wixstatic.com/media/f08912_a66dba093666401c84cb0141d2ca6c81~mv2.jpg';

  const TREATS = [
    {
      name: 'Peanut Butter & Blueberry Biscuits',
      tagline: 'Fruity, nutty, antioxidant-packed.',
      description: 'A wholesome combo your dog will go nuts for — literally. Rich peanut butter meets sweet wild blueberry.',
      image: 'https://static.wixstatic.com/media/f08912_3f371b61828e4a1097d0fab2579c35b3~mv2.jpg',
      accent: 'pink'
    },
    {
      name: 'Peanut Butter & Cheese Biscuits',
      tagline: 'A savory twist on a classic.',
      description: 'For the dog who lights up at the cheese drawer. Creamy peanut butter and a savory finish.',
      image: 'https://static.wixstatic.com/media/f08912_e03ffde105e74dadb4f085c0abb562f8~mv2.jpg',
      accent: 'gold'
    },
    {
      name: 'Carob Biscuits',
      tagline: 'All the indulgence, none of the worry.',
      description: 'Carob is the dog-safe alternative to chocolate — rich, naturally sweet, and 100% vet-approved.',
      image: 'https://static.wixstatic.com/media/f08912_69857f1b42424e969f3d653e8f6a2854~mv2.jpg',
      accent: 'purple'
    },
    {
      name: 'Pumpkin & Honey Butter Biscuits',
      tagline: 'Sweet, seasonal, gentle on tummies.',
      description: "Pumpkin's good for digestion and honey adds a touch of sweetness — a fan favorite for sensitive stomachs.",
      image: 'https://static.wixstatic.com/media/f08912_62345ea9c28d42c4bf3c425766ec9d60~mv2.jpg',
      accent: 'blue'
    }
  ];

  const STEPS = [
    {
      num: 1,
      label: 'Shop',
      body: 'Pick out your dog\'s new favorite treats at downsouthdoggies.com.'
    },
    {
      num: 2,
      label: 'Apply the code',
      body: 'Enter <strong>BDDC</strong> at checkout — that\'s what triggers the donation.'
    },
    {
      num: 3,
      label: 'Enjoy',
      body: 'Treats arrive at your door. Reward happy zoomies at home.'
    },
    {
      num: 4,
      label: 'Give back',
      body: '30% of your purchase comes straight back to Big Dogs Don\'t Cry.'
    }
  ];

  const IMPACT = [
    { icon: '💉', text: 'Emergency and routine veterinary care' },
    { icon: '🍽️', text: 'Nutritious meals and safe shelter' },
    { icon: '🚐', text: 'Transport to foster and adoptive homes' },
    { icon: '🐕', text: 'Behavior support so dogs shine for adopters' }
  ];

  const VERSES = [
    {
      text: 'With God all things are possible.',
      attribution: 'Matthew 19:26'
    },
    {
      text: 'Aspire to live a quiet life, to mind your own business, and to work with your hands…',
      attribution: '1 Thessalonians 4:11'
    }
  ];

  class BDDCDownSouthDoggies extends HTMLElement {
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
            <h1 class="hero-title">Down South Doggies</h1>
            <p class="hero-tagline">Treats that give back. Paws, biscuits, and second chances.</p>
          </div>
        </section>

        <div class="page-body">

          <!-- 30% DONATION BANNER -->
          <section class="donation-banner reveal">
            <div class="donation-content">
              <div class="donation-headline">
                <span class="donation-percent">30%</span>
                <span class="donation-text">
                  of every order with code <strong>BDDC</strong>
                  goes straight back to Big Dogs Don't Cry.
                </span>
              </div>
              <div class="donation-code-box" aria-label="Discount code">
                <div class="donation-code-label">Use Code at Checkout</div>
                <div class="donation-code">BDDC</div>
              </div>
              <a class="donation-cta" href="${SHOP_URL}" target="_blank" rel="noopener noreferrer">
                🛒 Shop Now <span class="arrow">→</span>
              </a>
            </div>
          </section>

          <!-- WHY WE PARTNER -->
          <aside class="partnership-card reveal">
            <div class="partnership-mark">
              <span class="bddc-mark">BDDC</span>
              <span class="partnership-x" aria-hidden="true">×</span>
              <span class="partner-mark">Down South Doggies</span>
            </div>
            <h2 class="partnership-title">Why We Partner With Them</h2>
            <p class="partnership-body">
              Cody and Katie at Down South Doggies bake all-natural, small-batch dog treats from
              their kitchen in Whiting, Indiana — and they generously share 30% of every BDDC-coded
              order with the rescue. It's a rare partnership: real treats your dog will love, made by
              real people, that funnel real dollars back to saving real lives.
              <strong>One bag of biscuits. Three happy tails.</strong>
            </p>
          </aside>

          <!-- STORY -->
          <section class="story-section reveal">
            <div class="story-grid">
              <div class="story-text">
                <div class="section-overline">Their Story</div>
                <h2 class="story-title">A Family Business, Born From a Red Paw</h2>
                <div class="story-body">
                  <p>
                    Down South Doggies was founded in 2021 by Cody and Katie Sylwestrowicz in Whiting,
                    Indiana — a family business in the truest sense. When their daughter Oakley was born,
                    they knew they wanted to build something they could all work on together.
                  </p>
                  <p>
                    Their love of dogs came first, though. In 2020, their four-year-old German Shepherd
                    <strong>Jefe</strong> developed an angry red patch on his paw — a food allergy traced
                    to the processed treats he was eating. A simple change in diet cleared it up completely.
                  </p>
                  <p>
                    A year later, while Cody and Katie were out of town, their other German Shepherd
                    <strong>Skout</strong> was given processed treats by a well-meaning loved one. When
                    they got home, his paws were red and inflamed — the same telltale signs they'd seen
                    in Jefe. That was the moment they decided enough was enough.
                  </p>
                  <p>
                    They started baking fresh, all-natural treats in their own kitchen, and within weeks
                    Skout's allergies cleared up too. That was the seed of Down South Doggies.
                  </p>
                  <p>
                    Cody and Katie launched their market presence in late summer of 2021 and have been
                    growing ever since — now also supplying local Northwest Indiana businesses with their
                    handmade treats. It's a labor of love and proof that the best ideas often come from
                    the smallest moments — like noticing a red paw.
                  </p>
                </div>
              </div>
              <div class="story-image-wrap" aria-hidden="true">
                <img class="story-image" src="${STORY_IMAGE}" alt="Down South Doggies treats and dogs" loading="lazy">
                <div class="story-image-deco"></div>
              </div>
            </div>

            <!-- VERSES -->
            <div class="verses-card">
              <p class="verses-intro">
                Faith and family ground everything Cody and Katie do. Two verses they keep close:
              </p>
              <div class="verses-grid">
                ${VERSES.map(v => `
                  <blockquote class="verse">
                    <p class="verse-text">"${v.text}"</p>
                    <footer class="verse-attribution">— ${v.attribution}</footer>
                  </blockquote>
                `).join('')}
              </div>
            </div>
          </section>

          <!-- TREATS -->
          <section class="treats-section reveal">
            <div class="section-head">
              <div class="section-overline">The Lineup</div>
              <h2 class="section-title">Their Treats</h2>
              <p class="section-lead">
                Click any biscuit to shop at Down South Doggies. Don't forget code
                <strong>BDDC</strong> at checkout to send 30% to BDDC. 💛
              </p>
            </div>
            <div class="treats-grid">
              ${TREATS.map(t => this.renderTreat(t)).join('')}
            </div>
          </section>

          <!-- HOW IT WORKS -->
          <section class="steps-section reveal">
            <div class="paw-watermark" aria-hidden="true"></div>
            <div class="section-head">
              <div class="section-overline">Easy as 1-2-3-4</div>
              <h2 class="section-title">How It Works</h2>
              <p class="section-lead">
                Four simple steps from craving to cause.
              </p>
            </div>
            <div class="steps-grid">
              ${STEPS.map(s => `
                <div class="step">
                  <div class="step-num">${s.num}</div>
                  <h4 class="step-label">${s.label}</h4>
                  <p class="step-body">${s.body}</p>
                </div>
              `).join('')}
            </div>
          </section>

          <!-- IMPACT -->
          <section class="impact-section reveal">
            <div class="section-head">
              <div class="section-overline">Where 30% Goes</div>
              <h2 class="section-title">Your Impact</h2>
              <p class="section-lead">
                Every BDDC-coded purchase translates into real care for real dogs.
              </p>
            </div>
            <ul class="impact-list">
              ${IMPACT.map(item => `
                <li class="impact-item">
                  <span class="impact-icon" aria-hidden="true">${item.icon}</span>
                  <span class="impact-text">${item.text}</span>
                </li>
              `).join('')}
            </ul>
          </section>

          <!-- CTA -->
          <section class="closing-card reveal">
            <h2 class="closing-title">
              <span aria-hidden="true">🐾</span>
              Ready to Help With Every Treat?
            </h2>
            <p class="closing-body">
              Shop Down South Doggies, drop in code <strong>BDDC</strong> at checkout, and 30% of
              your order funds the next rescue. Treats, tail wags, and second chances — all in one bag.
            </p>
            <div class="closing-actions">
              <a class="btn btn-primary" href="${SHOP_URL}" target="_blank" rel="noopener noreferrer">
                Shop Down South Doggies <span class="arrow">→</span>
              </a>
              <div class="closing-code">
                <span class="closing-code-label">Use Code:</span>
                <span class="closing-code-value">BDDC</span>
              </div>
            </div>
            <p class="affiliate-note">
              💛 <strong>Partnership Disclosure:</strong> Big Dogs Don't Cry receives 30% of qualifying
              purchases made with code BDDC at Down South Doggies. We only partner with companies we
              genuinely love — Cody and Katie's treats are the real deal.
            </p>
          </section>

        </div>
      `;
    }

    renderTreat(t) {
      return `
        <a class="treat-card treat-accent-${t.accent}" href="${SHOP_URL}" target="_blank" rel="noopener noreferrer">
          <div class="treat-image-wrap">
            <img class="treat-image" src="${t.image}" alt="${t.name}" loading="lazy">
          </div>
          <div class="treat-content">
            <h3 class="treat-name">${t.name}</h3>
            <p class="treat-tagline">${t.tagline}</p>
            <p class="treat-description">${t.description}</p>
            <div class="treat-cta">
              Order with code BDDC <span class="arrow">→</span>
            </div>
          </div>
        </a>
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
          --honey: #f2994a;
          --honey-deep: #d97e29;
          --honey-light: #ffe9d3;
          --teal: #2a9d8f;
          --purple: #845ef7;
          --blue-soft: #8da7f0;
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

        /* ───── 30% DONATION BANNER ───── */
        .donation-banner {
          background:
            radial-gradient(circle at top right, rgba(242,153,74,0.20) 0%, transparent 60%),
            radial-gradient(circle at bottom left, rgba(245,54,124,0.15) 0%, transparent 55%),
            linear-gradient(135deg, #fff8ed 0%, var(--pink-bg) 100%);
          border: 2px solid var(--pink-soft);
          border-radius: 22px;
          padding: clamp(28px, 3.5vw, 44px);
          margin-bottom: 40px;
          box-shadow: var(--shadow-md);
          position: relative;
          overflow: hidden;
        }
        .donation-banner::before {
          content: "🍪";
          position: absolute;
          top: -20px;
          right: -10px;
          font-size: 140px;
          opacity: 0.07;
          transform: rotate(15deg);
          pointer-events: none;
        }
        .donation-content {
          display: grid;
          grid-template-columns: 1fr auto auto;
          gap: 28px;
          align-items: center;
          position: relative;
          z-index: 1;
        }
        .donation-headline {
          display: flex;
          align-items: center;
          gap: 18px;
          flex-wrap: wrap;
        }
        .donation-percent {
          font-size: clamp(48px, 7vw, 84px);
          font-weight: 800;
          line-height: 1;
          background: linear-gradient(135deg, var(--pink) 0%, var(--honey) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          flex-shrink: 0;
        }
        .donation-text {
          font-size: clamp(15px, 1.4vw, 18px);
          line-height: 1.5;
          color: var(--ink);
          font-weight: 500;
          max-width: 360px;
        }
        .donation-text strong {
          color: var(--pink-deep);
          background: var(--pink-soft);
          padding: 2px 8px;
          border-radius: 4px;
          font-family: "Courier New", monospace;
        }
        .donation-code-box {
          background: #fff;
          border: 3px dashed var(--honey);
          border-radius: 14px;
          padding: 14px 22px;
          text-align: center;
          box-shadow: 0 4px 14px rgba(242,153,74,0.20);
          flex-shrink: 0;
        }
        .donation-code-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--honey-deep);
          margin-bottom: 4px;
        }
        .donation-code {
          font-family: "Courier New", monospace;
          font-size: clamp(28px, 3.4vw, 38px);
          font-weight: 800;
          color: var(--pink-deep);
          letter-spacing: 3px;
          line-height: 1;
        }
        .donation-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          background: linear-gradient(135deg, var(--pink) 0%, var(--pink-deep) 100%);
          color: #fff;
          text-decoration: none;
          border-radius: 999px;
          font-weight: 700;
          font-size: clamp(15px, 1.3vw, 17px);
          box-shadow: 0 8px 22px rgba(245,54,124,0.35);
          transition: transform .12s ease, box-shadow .2s ease;
          flex-shrink: 0;
        }
        .donation-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(245,54,124,0.45);
        }

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
          position: relative;
          overflow: hidden;
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
          max-width: 720px;
          font-size: clamp(16px, 1.35vw, 18px);
          line-height: 1.65;
          color: var(--ink);
        }
        .partnership-body strong {
          display: block;
          margin-top: 12px;
          color: var(--pink-deep);
        }

        /* ───── STORY ───── */
        .story-section { margin-bottom: 48px; }
        .story-grid {
          display: grid;
          grid-template-columns: 1fr 0.8fr;
          gap: 48px;
          align-items: center;
          margin-bottom: 32px;
        }
        .section-overline {
          color: var(--pink);
          font-size: clamp(13px, 1.1vw, 15px);
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .story-title {
          margin: 0 0 22px;
          color: var(--pink);
          font-size: clamp(28px, 3.8vw, 44px);
          font-weight: 700;
          line-height: 1.1;
        }
        .story-body p {
          margin: 0 0 16px;
          font-size: clamp(15px, 1.25vw, 17px);
          line-height: 1.7;
          color: var(--ink);
          font-weight: 500;
        }
        .story-body p:last-child { margin-bottom: 0; }
        .story-body strong { color: var(--pink-deep); }
        .story-image-wrap {
          position: relative;
          padding: 14px;
        }
        .story-image {
          display: block;
          width: 100%;
          height: auto;
          border-radius: 18px;
          box-shadow: var(--shadow-lg);
          position: relative;
          z-index: 2;
          transform: rotate(-1deg);
          transition: transform .4s ease;
        }
        .story-image:hover { transform: rotate(0deg) scale(1.01); }
        .story-image-deco {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, var(--honey-light) 0%, var(--pink-soft) 100%);
          border-radius: 22px;
          transform: rotate(2.5deg);
          z-index: 1;
        }

        /* ───── VERSES ───── */
        .verses-card {
          background: #fff;
          border-radius: 16px;
          padding: clamp(24px, 3vw, 32px);
          box-shadow: var(--shadow-sm);
          border: 2px solid var(--pink-soft);
          text-align: center;
        }
        .verses-intro {
          margin: 0 0 22px;
          font-size: clamp(14px, 1.2vw, 16px);
          color: var(--muted);
          font-style: italic;
        }
        .verses-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        .verse {
          margin: 0;
          padding: 18px 22px;
          background: linear-gradient(135deg, var(--pink-bg) 0%, #fff 100%);
          border-left: 4px solid var(--pink);
          border-radius: 8px;
          text-align: left;
        }
        .verse-text {
          margin: 0 0 8px;
          font-size: clamp(15px, 1.3vw, 17px);
          font-style: italic;
          line-height: 1.55;
          color: var(--ink);
          font-family: Georgia, "Times New Roman", serif;
        }
        .verse-attribution {
          font-size: clamp(13px, 1.1vw, 14px);
          font-weight: 700;
          color: var(--pink-deep);
          letter-spacing: .5px;
        }

        /* ───── TREATS ───── */
        .treats-section { margin-bottom: 48px; }
        .section-head {
          text-align: center;
          margin-bottom: 32px;
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
        }
        .section-lead strong {
          color: var(--pink-deep);
          background: var(--pink-soft);
          padding: 1px 6px;
          border-radius: 4px;
          font-family: "Courier New", monospace;
        }
        .treats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 22px;
        }
        .treat-card {
          background: #fff;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          border: 2px solid var(--pink-soft);
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
          transition: transform .2s ease, box-shadow .25s ease, border-color .25s ease;
          position: relative;
        }
        .treat-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-md);
          border-color: var(--pink);
        }
        .treat-card::after {
          content: "";
          position: absolute;
          top: 14px;
          right: 14px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--accent, var(--pink));
          box-shadow: 0 0 0 4px rgba(245,54,124,0.10);
          z-index: 2;
        }
        .treat-accent-pink   { --accent: var(--pink); }
        .treat-accent-gold   { --accent: var(--gold); }
        .treat-accent-purple { --accent: var(--purple); }
        .treat-accent-blue   { --accent: var(--blue-soft); }
        .treat-image-wrap {
          background: linear-gradient(135deg, var(--pink-bg) 0%, var(--pink-light) 100%);
          padding: 20px;
          display: grid;
          place-items: center;
          aspect-ratio: 4 / 3;
          overflow: hidden;
        }
        .treat-image {
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          object-fit: contain;
          display: block;
          border-radius: 8px;
          transition: transform .25s ease;
        }
        .treat-card:hover .treat-image {
          transform: scale(1.04);
        }
        .treat-content {
          padding: 22px 24px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .treat-name {
          margin: 0 0 6px;
          color: var(--pink-deep);
          font-size: clamp(18px, 1.7vw, 22px);
          font-weight: 700;
          line-height: 1.2;
        }
        .treat-tagline {
          margin: 0 0 12px;
          font-size: clamp(13px, 1.1vw, 15px);
          color: var(--pink);
          font-weight: 600;
          font-style: italic;
        }
        .treat-description {
          margin: 0 0 18px;
          font-size: clamp(14px, 1.2vw, 16px);
          line-height: 1.55;
          color: var(--ink);
          flex: 1;
        }
        .treat-cta {
          font-weight: 700;
          color: var(--pink-deep);
          font-size: clamp(13px, 1.1vw, 15px);
          letter-spacing: .3px;
        }
        .treat-card:hover .treat-cta { color: var(--pink); }
        .treat-cta .arrow {
          display: inline-block;
          transition: transform .2s ease;
        }
        .treat-card:hover .treat-cta .arrow { transform: translateX(4px); }

        /* ───── STEPS ───── */
        .steps-section {
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
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          position: relative;
          z-index: 1;
        }
        .step {
          background: var(--pink-bg);
          border-radius: 14px;
          padding: 26px 18px;
          text-align: center;
          border: 2px solid var(--pink-soft);
          transition: transform .15s ease, border-color .25s ease;
        }
        .step:hover {
          transform: translateY(-4px);
          border-color: var(--pink);
        }
        .step-num {
          width: 48px;
          height: 48px;
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
        .step-label {
          margin: 0 0 8px;
          color: var(--pink-deep);
          font-size: clamp(17px, 1.6vw, 20px);
          font-weight: 700;
        }
        .step-body {
          margin: 0;
          font-size: clamp(13px, 1.1vw, 15px);
          line-height: 1.55;
          color: var(--ink);
        }

        /* ───── IMPACT ───── */
        .impact-section {
          background:
            radial-gradient(circle at top right, rgba(242,153,74,0.10) 0%, transparent 60%),
            #fff;
          border-radius: 20px;
          padding: clamp(32px, 4vw, 48px);
          box-shadow: var(--shadow-sm);
          margin-bottom: 48px;
        }
        .impact-list {
          list-style: none;
          padding: 0;
          margin: 0 auto;
          max-width: 880px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .impact-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px 22px;
          background: var(--pink-bg);
          border-radius: 12px;
          border-left: 4px solid var(--pink);
          transition: transform .15s ease, box-shadow .25s ease;
        }
        .impact-item:hover {
          transform: translateX(4px);
          box-shadow: var(--shadow-sm);
        }
        .impact-icon {
          font-size: 28px;
          flex-shrink: 0;
          width: 48px;
          height: 48px;
          display: grid;
          place-items: center;
          background: #fff;
          border-radius: 50%;
          box-shadow: 0 2px 6px rgba(0,0,0,0.06);
        }
        .impact-text {
          font-size: clamp(15px, 1.25vw, 17px);
          font-weight: 600;
          line-height: 1.4;
          color: var(--ink);
        }

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
        .closing-body strong {
          background: rgba(255,255,255,0.2);
          padding: 2px 8px;
          border-radius: 4px;
          font-family: "Courier New", monospace;
        }
        .closing-actions {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 18px;
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
        .closing-code {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 18px 10px 22px;
          background: rgba(255,255,255,0.12);
          border: 2px dashed rgba(255,255,255,0.7);
          border-radius: 10px;
          color: #fff;
        }
        .closing-code-label {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: .5px;
          opacity: 0.9;
        }
        .closing-code-value {
          font-family: "Courier New", monospace;
          font-size: clamp(20px, 2vw, 24px);
          font-weight: 800;
          letter-spacing: 2px;
        }
        .arrow { display: inline-block; transition: transform .15s ease; }
        .btn:hover .arrow { transform: translateX(4px); }
        .affiliate-note {
          margin: 0 auto;
          max-width: 720px;
          font-size: clamp(13px, 1.1vw, 14px);
          line-height: 1.55;
          opacity: 0.85;
          position: relative;
          z-index: 1;
          padding: 14px 20px;
          background: rgba(255,255,255,0.1);
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.2);
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
          .story-image, .treat-card:hover .treat-image { transform: none; }
        }

        /* ───── RESPONSIVE ───── */
        @media (max-width: 1000px) {
          .donation-content {
            grid-template-columns: 1fr;
            gap: 20px;
            text-align: center;
          }
          .donation-headline {
            justify-content: center;
            flex-direction: column;
            text-align: center;
          }
          .donation-text { max-width: none; }
          .story-grid { grid-template-columns: 1fr; gap: 28px; }
          .story-image { max-width: 540px; margin: 0 auto; display: block; }
          .verses-grid { grid-template-columns: 1fr; }
          .treats-grid { grid-template-columns: 1fr; }
          .steps-grid { grid-template-columns: repeat(2, 1fr); }
          .impact-list { grid-template-columns: 1fr; }
        }

        @media (max-width: 600px) {
          .hero { min-height: 260px; padding: 36px 18px; }
          .donation-banner { padding: 24px 20px; }
          .partnership-mark { font-size: 12px; gap: 10px; flex-wrap: wrap; justify-content: center; }
          .closing-actions { flex-direction: column; align-items: stretch; }
          .btn { text-align: center; }
          .closing-code { justify-content: center; }
        }

        @media (max-width: 420px) {
          .steps-grid { grid-template-columns: 1fr; }
          .page-body { padding: 24px 14px 40px; }
        }
      `;
    }
  }

  if (!customElements.get('bddc-down-south-doggies')) {
    customElements.define('bddc-down-south-doggies', BDDCDownSouthDoggies);
  }
})();
