/**
 * <bddc-who-we-are-top> + <bddc-who-we-are-bottom>
 * Wix Studio Custom Elements — Big Dogs Don't Cry / Who We Are
 *
 * This file defines TWO custom elements designed to sit above and below your
 * native Wix CMS team repeater (StaffPetsforStaffpage), so the team data stays
 * the source of truth in Wix while the rest of the page gets the BDDC styling.
 *
 * Page assembly in Wix Studio:
 *   1. <bddc-who-we-are-top>
 *        Hero · Welcome · Our Story · Pull-quote · What We Believe ·
 *        "Meet the Team" section header (intro for the repeater below)
 *   2. Native Wix CMS repeater bound to StaffPetsforStaffpage
 *        (style it however you want — the team header above prepares the eye)
 *   3. <bddc-who-we-are-bottom>
 *        Closing CTA
 *
 * For each element:
 *   Server URL: https://cdn.jsdelivr.net/gh/justthescript/BDDC-Pages@main/bddc-who-we-are.js
 *   Tag Name:   bddc-who-we-are-top   (or bddc-who-we-are-bottom)
 *
 * Same Server URL for both — one file defines both elements.
 */

(function () {
  const DEFAULT_HERO_IMAGE =
    'https://static.wixstatic.com/media/bc59b6_604fb6f09a314f219daf30e354c81e5a~mv2.webp';

  const PAW_ICON_URL =
    'https://static.wixstatic.com/media/bc59b6_45db072b49a5427f930919d18683e36d~mv2.png';

  const COLLAGE_IMAGE =
    'https://static.wixstatic.com/media/4cb683_4f3efa1ac2f34bf784222dbf7e3c31d4~mv2.png';

  const VALUES = [
    {
      icon: '💖',
      title: 'Every Dog Deserves a Second Chance',
      body: `No matter their size, breed, age, or past — every dog who comes through our doors gets the patience, medical care, and unconditional love it takes to get them ready for a forever home.`
    },
    {
      icon: '🏠',
      title: 'Foster Homes Save More Lives',
      body: `We're a foster-based rescue because dogs heal faster on a couch than in a kennel. Every foster family who opens their door makes room for us to say "yes" to one more pup who needs us.`
    },
    {
      icon: '🐕',
      title: 'Big Dogs Deserve Big Love',
      body: `The dogs who get overlooked in shelters — the bully breeds, the seniors, the misunderstood "too much" dogs — are exactly who we built this rescue to fight for. They are the gentlest souls we know.`
    },
    {
      icon: '🤝',
      title: 'Community Is Everything',
      body: `Our volunteers, fosters, transporters, donors, partners, and adopters are the rescue. Every wagging tail you see in our photos is the work of hundreds of hands and hearts pulling in the same direction.`
    }
  ];

  // ────────────────────────────────────────────────────────────────────────
  // TOP element — everything above the native team repeater
  // ────────────────────────────────────────────────────────────────────────
  class BDDCWhoWeAreTop extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
      this.render();
      observeReveal(this.shadowRoot);
    }

    render() {
      const heroImage = this.getAttribute('data-hero-image') || DEFAULT_HERO_IMAGE;

      this.shadowRoot.innerHTML = `
        <style>${SHARED_STYLES}</style>

        <!-- HERO -->
        <section class="hero" style="--hero-bg: url('${heroImage}');">
          <div class="hero-inner">
            <div class="hero-badge">🐾 Foster-Based Rescue · Merrillville, IN</div>
            <h1 class="hero-title">We Are Big Dogs Don't Cry</h1>
            <p class="hero-tagline">
              Welcome to Big Dogs Don't Cry, where our hearts beat for big, lovable dogs.
            </p>
          </div>
        </section>

        <div class="page-body">

          <!-- WELCOME -->
          <section class="intro reveal">
            <p class="intro-body">
              We are a foster-based animal rescue focused on giving large breed dogs a second chance
              at life by finding them devoted homes. Our team of passionate volunteers works around the
              clock to ensure that every dog we take in receives exceptional care, socialization, and
              love. If you're interested in fostering or adopting, you can help us make a real impact
              on the future of these amazing companions.
              <strong>Join us in our mission to give every big dog the loving home they deserve.</strong>
            </p>
          </section>

          <!-- OUR STORY -->
          <section class="story-section reveal">
            <div class="story-text">
              <div class="story-overline">Our Story</div>
              <h2 class="story-title">
                How We Began:<br>
                <span class="story-title-accent">A Journey of Love</span>
              </h2>
              <div class="story-body">
                <p>
                  Big Dogs Don't Cry emerged from a deep-rooted love for our four-legged friends and a
                  vision to create a better world for them. It all began when I rescued an abandoned
                  Pit-bull from the streets. With no animal control in our area and being at risk for
                  euthanasia; it ignited my passion for a large breed dog rescue. I realized that these
                  dogs often struggle to find loving homes due to their size, and I couldn't stand by
                  and let them suffer. Thus, Big Dogs Don't Cry was founded with a mission to provide
                  safe housing, veterinary care, and dedicated support, ensuring these gentle giants
                  could finally find happiness in forever homes. We also are deeply committed to helping
                  dogs and animals of all sizes. Join us in making a difference, one dog at a time.
                </p>
                <p class="story-signature">— Krystal Zamora</p>
              </div>
            </div>
            <div class="story-image-wrap" aria-hidden="true">
              <img class="story-image" src="${COLLAGE_IMAGE}" alt="Polaroid collage of Big Dogs Don't Cry rescue dogs" loading="lazy">
              <div class="story-image-deco"></div>
            </div>
          </section>

          <!-- PULL QUOTE -->
          <section class="pullquote reveal">
            <div class="pullquote-mark" aria-hidden="true">"</div>
            <p class="pullquote-text">
              We are committed to saving and rehoming abandoned and at-risk animals — one paw at a time.
            </p>
          </section>

          <!-- WHAT WE BELIEVE -->
          <section class="section reveal">
            <div class="paw-watermark" aria-hidden="true"></div>
            <div class="section-head">
              <div class="section-overline">What Drives Us</div>
              <h2 class="section-title">
                <img class="section-paw" src="${PAW_ICON_URL}" alt="" aria-hidden="true">
                What We Believe
              </h2>
              <p class="section-lead">
                Four ideas that guide every rescue, every transport, every match.
              </p>
            </div>
            <div class="values-grid">
              ${VALUES.map(v => this.renderValue(v)).join('')}
            </div>
          </section>

          <!-- TEAM SECTION HEADER (the Wix repeater goes BELOW this element) -->
          <section class="team-intro reveal">
            <div class="section-overline">Our Team</div>
            <h2 class="team-intro-title">Meet the Hearts Behind Big Dogs Don't Cry</h2>
            <p class="team-intro-lead">
              The volunteers, board members, and quiet heroes who keep the rescue running.
            </p>
            <div class="team-intro-divider" aria-hidden="true">
              <span class="divider-line"></span>
              <span class="divider-paw">🐾</span>
              <span class="divider-line"></span>
            </div>
          </section>

        </div>
      `;
    }

    renderValue(v) {
      return `
        <article class="value">
          <div class="value-icon" aria-hidden="true">${v.icon}</div>
          <h3 class="value-title">${v.title}</h3>
          <p class="value-body">${v.body}</p>
        </article>
      `;
    }
  }

  // ────────────────────────────────────────────────────────────────────────
  // BOTTOM element — everything below the native team repeater
  // ────────────────────────────────────────────────────────────────────────
  class BDDCWhoWeAreBottom extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
      this.render();
      observeReveal(this.shadowRoot);
    }

    render() {
      this.shadowRoot.innerHTML = `
        <style>${SHARED_STYLES}</style>

        <div class="page-body page-body-bottom">
          <section class="closing-card reveal">
            <h2 class="closing-title">
              <span class="heart-pulse" aria-hidden="true">💖</span>
              Be Part of Our Story
            </h2>
            <p class="closing-body">
              Whether you adopt, foster, volunteer, or simply share our pups with someone who might be
              their forever family — there's a place for you in this rescue. We can't do it without you.
            </p>
            <div class="closing-actions">
              <a class="btn btn-primary" href="https://www.bigdogsdontcry.com/adoptable" target="_top">
                Meet Our Adoptables <span class="arrow">→</span>
              </a>
              <a class="btn btn-secondary" href="https://www.bigdogsdontcry.com/volunteer" target="_top">
                Become a Volunteer
              </a>
            </div>
          </section>
        </div>
      `;
    }
  }

  // ────────────────────────────────────────────────────────────────────────
  // Shared scroll-reveal helper
  // ────────────────────────────────────────────────────────────────────────
  function observeReveal(root) {
    if (!('IntersectionObserver' in window)) {
      root.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
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
    root.querySelectorAll('.reveal').forEach(el => io.observe(el));
  }

  // ────────────────────────────────────────────────────────────────────────
  // Shared styles
  // ────────────────────────────────────────────────────────────────────────
  const SHARED_STYLES = `
    :host {
      --pink: #F5367C;
      --pink-deep: #c2255c;
      --pink-soft: #ffd9ec;
      --pink-bg: #fff7fa;
      --pink-light: #ffe9f1;
      --purple: #845ef7;
      --blue-soft: #8da7f0;
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

    /* ───── HERO ───── */
    .hero {
      position: relative;
      width: 100%;
      min-height: 380px;
      background-image:
        linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.25) 100%),
        var(--hero-bg);
      background-size: cover;
      background-position: center;
      background-color: #fdf8ec;
      display: grid;
      place-items: center;
      padding: 56px 24px;
    }
    .hero-inner { text-align: center; max-width: 900px; }
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
      margin: 0 0 14px;
      font-size: clamp(36px, 6vw, 64px);
      font-weight: 700;
      color: var(--pink);
      text-shadow: 0 2px 14px rgba(255,255,255,0.7);
      line-height: 1.05;
    }
    .hero-tagline {
      margin: 0;
      font-size: clamp(17px, 2.1vw, 22px);
      font-weight: 600;
      color: #3b3b5c;
      font-style: italic;
      text-shadow: 0 1px 8px rgba(255,255,255,0.7);
    }

    /* ───── PAGE BODY ───── */
    .page-body {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px 0;
    }
    .page-body-bottom {
      padding: 24px 20px 56px;
    }

    /* ───── INTRO ───── */
    .intro {
      max-width: 920px;
      margin: 8px auto 56px;
      text-align: center;
    }
    .intro-body {
      margin: 0;
      font-size: clamp(17px, 1.5vw, 21px);
      line-height: 1.7;
      color: var(--ink);
      font-weight: 500;
    }
    .intro-body strong {
      color: var(--pink-deep);
      display: block;
      margin-top: 14px;
    }

    /* ───── STORY ───── */
    .story-section {
      display: grid;
      grid-template-columns: 1.05fr 1fr;
      gap: 56px;
      align-items: center;
      margin: 0 auto 56px;
      max-width: 1200px;
    }
    .story-overline {
      color: var(--pink);
      font-size: clamp(13px, 1.1vw, 15px);
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 14px;
    }
    .story-title {
      margin: 0 0 24px;
      color: var(--pink);
      font-size: clamp(34px, 4.6vw, 56px);
      font-weight: 700;
      line-height: 1.05;
    }
    .story-title-accent { color: var(--pink-deep); }
    .story-body p {
      margin: 0 0 18px;
      font-size: clamp(16px, 1.35vw, 19px);
      line-height: 1.7;
      color: var(--ink);
      font-weight: 500;
    }
    .story-signature {
      font-style: italic;
      color: var(--pink-deep);
      font-weight: 600;
      margin-top: 8px !important;
    }
    .story-image-wrap {
      position: relative;
      padding: 16px;
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
      background: linear-gradient(135deg, var(--pink-soft) 0%, var(--pink-light) 100%);
      border-radius: 22px;
      transform: rotate(2.5deg);
      z-index: 1;
    }

    /* ───── PULL QUOTE ───── */
    .pullquote {
      position: relative;
      max-width: 920px;
      margin: 0 auto 56px;
      padding: 36px 40px;
      text-align: center;
      background: linear-gradient(135deg, var(--pink-bg) 0%, var(--pink-light) 100%);
      border-radius: 20px;
      border: 2px solid var(--pink-soft);
    }
    .pullquote-mark {
      position: absolute;
      top: -10px;
      left: 24px;
      font-size: 90px;
      line-height: 1;
      font-family: Georgia, "Times New Roman", serif;
      color: var(--pink);
      opacity: 0.45;
      font-weight: 700;
    }
    .pullquote-text {
      margin: 0;
      font-size: clamp(18px, 2vw, 26px);
      font-weight: 600;
      font-style: italic;
      color: var(--pink-deep);
      line-height: 1.45;
      position: relative;
      z-index: 1;
    }

    /* ───── SECTION HEAD ───── */
    .section {
      position: relative;
      background: #fff;
      padding: clamp(36px, 4vw, 56px);
      border-radius: 20px;
      box-shadow: var(--shadow-sm);
      margin-bottom: 48px;
      overflow: hidden;
    }
    .paw-watermark {
      position: absolute;
      top: -40px;
      right: -40px;
      width: 240px;
      height: 240px;
      background-image: url('${PAW_ICON_URL}');
      background-repeat: no-repeat;
      background-size: contain;
      opacity: 0.05;
      pointer-events: none;
      transform: rotate(-12deg);
    }
    .section-head {
      text-align: center;
      margin-bottom: 36px;
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
      margin: 0 auto 12px;
      color: var(--pink-deep);
      font-size: clamp(28px, 3.6vw, 44px);
      font-weight: 700;
      line-height: 1.15;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 14px;
      flex-wrap: wrap;
    }
    .section-paw {
      width: 40px;
      height: 40px;
      object-fit: contain;
      flex-shrink: 0;
    }
    .section-lead {
      margin: 0 auto;
      max-width: 640px;
      font-size: clamp(15px, 1.3vw, 17px);
      color: var(--muted);
      line-height: 1.6;
      font-style: italic;
    }

    /* ───── VALUES ───── */
    .values-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 22px;
      position: relative;
      z-index: 1;
    }
    .value {
      background: linear-gradient(135deg, var(--pink-bg) 0%, #fff 100%);
      border-radius: 16px;
      padding: 28px 26px;
      border: 2px solid var(--pink-soft);
      text-align: center;
      transition: transform .2s ease, box-shadow .25s ease, border-color .25s ease;
    }
    .value:hover {
      transform: translateY(-4px);
      border-color: var(--pink);
      box-shadow: var(--shadow-md);
    }
    .value-icon {
      font-size: 48px;
      line-height: 1;
      margin-bottom: 16px;
      filter: drop-shadow(0 4px 10px rgba(245,54,124,0.18));
    }
    .value-title {
      margin: 0 0 12px;
      color: var(--pink-deep);
      font-size: clamp(18px, 1.7vw, 22px);
      font-weight: 700;
      line-height: 1.25;
    }
    .value-body {
      margin: 0;
      font-size: clamp(15px, 1.25vw, 17px);
      line-height: 1.6;
      color: var(--ink);
    }

    /* ───── TEAM INTRO (header above the Wix repeater) ───── */
    .team-intro {
      max-width: 900px;
      margin: 8px auto 0;
      padding: 0 16px;
      text-align: center;
    }
    .team-intro-title {
      margin: 0 0 12px;
      color: var(--pink-deep);
      font-size: clamp(28px, 3.6vw, 44px);
      font-weight: 700;
      line-height: 1.15;
    }
    .team-intro-lead {
      margin: 0 auto 22px;
      max-width: 640px;
      font-size: clamp(15px, 1.3vw, 17px);
      color: var(--muted);
      line-height: 1.6;
      font-style: italic;
    }
    .team-intro-divider {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      max-width: 480px;
      margin: 0 auto 4px;
    }
    .divider-line {
      flex: 1;
      height: 2px;
      background: linear-gradient(90deg, transparent 0%, var(--pink-soft) 50%, transparent 100%);
    }
    .divider-paw {
      font-size: 22px;
      filter: drop-shadow(0 2px 4px rgba(245,54,124,0.2));
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
      .story-image { transform: none; }
    }

    /* ───── RESPONSIVE ───── */
    @media (max-width: 980px) {
      .story-section {
        grid-template-columns: 1fr;
        gap: 32px;
        text-align: center;
      }
      .story-image { max-width: 540px; margin: 0 auto; }
      .values-grid { grid-template-columns: 1fr; }
    }

    @media (max-width: 720px) {
      .pullquote { padding: 32px 22px; }
      .pullquote-mark { font-size: 70px; left: 14px; top: -6px; }
      .closing-actions { flex-direction: column; align-items: stretch; }
      .btn { text-align: center; }
    }

    @media (max-width: 480px) {
      .hero { min-height: 320px; padding: 40px 18px; }
      .page-body { padding: 28px 14px 0; }
      .page-body-bottom { padding: 14px 14px 36px; }
      .section { padding: 28px 20px; }
    }
  `;

  if (!customElements.get('bddc-who-we-are-top')) {
    customElements.define('bddc-who-we-are-top', BDDCWhoWeAreTop);
  }
  if (!customElements.get('bddc-who-we-are-bottom')) {
    customElements.define('bddc-who-we-are-bottom', BDDCWhoWeAreBottom);
  }
})();
