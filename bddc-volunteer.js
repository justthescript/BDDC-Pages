/**
 * <bddc-volunteer> — Wix Studio Custom Element
 * Big Dogs Don't Cry Animal Rescue — Volunteer Page
 *
 * Usage in Wix Studio:
 *   1. Add a Custom Element to the /volunteer page
 *   2. Server URL: https://cdn.jsdelivr.net/gh/justthescript/BDDC-Pages@main/bddc-volunteer.js
 *      (cache-bust with ?v=2 etc on edits)
 *   3. Tag Name: bddc-volunteer
 *   4. (Optional) data-hero-image  : URL for hero background image
 */

(function () {
  const APPLICATION_URL =
    'https://airtable.com/embed/appqKxAMX4xyWWB4j/shrklnKjkfaVYmbV0?backgroundColor=gray';

  const DEFAULT_HERO_IMAGE =
    'https://static.wixstatic.com/media/bc59b6_604fb6f09a314f219daf30e354c81e5a~mv2.webp';

  const PAW_ICON_URL =
    'https://static.wixstatic.com/media/bc59b6_45db072b49a5427f930919d18683e36d~mv2.png';

  // Volunteer roles. Edit titles/descriptions/icons here — order = display order.
  const ROLES = [
    {
      icon: '🚐',
      title: 'Long Haul Transport',
      body: 'Help save lives by driving dogs from high-kill shelters in other states to safety with our fosters and adopters. Most legs are 2–4 hours and we coordinate the route end-to-end.'
    },
    {
      icon: '🚗',
      title: 'Short Haul Transport',
      body: 'Local pickups and drop-offs between fosters, boarding, and adoption events. Perfect for anyone with a flexible schedule who wants to help in shorter bursts.'
    },
    {
      icon: '🏥',
      title: 'Vet Transport',
      body: 'Drive our dogs to and from veterinary appointments. Critical for medical cases, recovery checkups, and routine care — every ride keeps a pup on the path to adoption.'
    },
    {
      icon: '🎉',
      title: 'Event Staff',
      body: 'Lend a hand at adoption events, community outreach, and fundraisers. Help with setup, greet visitors, and facilitate meet-and-greets between dogs and potential adopters.'
    },
    {
      icon: '💝',
      title: 'Fundraising',
      body: 'Help us keep the lights on and the dogs fed. Plan events, run social campaigns, reach out to sponsors, or help organize merch and raffle sales.'
    },
    {
      icon: '🦮',
      title: 'Dog Walking',
      body: 'Visit dogs in our care and provide essential exercise and socialization. Especially valuable for our long-term residents waiting for their forever homes.'
    },
    {
      icon: '🏠',
      title: 'Short Term Foster',
      body: 'Open your home for a few days or weeks while we find a long-term foster or adopter. Great for first-time fosters who want to try it without a long commitment.'
    },
    {
      icon: '🌳',
      title: 'Dog Day Trips',
      body: 'Take a rescue dog out for an afternoon adventure — a hike, a coffee shop visit, a beach trip. Helps us learn their personality and gives them a much-needed break.'
    },
    {
      icon: '📸',
      title: 'Photography',
      body: 'Capture the personality of our adoptable dogs. Great photos dramatically increase adoption rates — your skill behind the camera literally saves lives.'
    }
  ];

  class BDDCVolunteer extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
      this.render();
      this.bindHeroScroll();
    }

    render() {
      const heroImage = this.getAttribute('data-hero-image') || DEFAULT_HERO_IMAGE;

      this.shadowRoot.innerHTML = `
        <style>${this.styles()}</style>

        <!-- HERO -->
        <section class="hero" style="--hero-bg: url('${heroImage}');">
          <div class="hero-inner">
            <h1 class="hero-title">Volunteer With Us</h1>
            <p class="hero-tagline">Be the reason a dog gets a second chance.</p>
            <a class="cta-apply" href="#apply" data-scroll-target="apply">
              Apply Now <span class="arrow">→</span>
            </a>
          </div>
        </section>

        <!-- INTRO -->
        <section class="intro">
          <h2 class="section-title">Make Tails Wag</h2>
          <p class="intro-body">
            Big Dogs Don't Cry is a foster-based rescue powered almost entirely by volunteers.
            Whether you have an hour a week or a few days a month, every bit of help directly
            translates into more dogs saved, treated, fostered, and rehomed. There's a way for
            everyone to pitch in — find what fits your life below.
          </p>
        </section>

        <!-- WAYS TO HELP -->
        <section class="roles-section">
          <h2 class="section-title">How You Can Help</h2>
          <div class="roles-grid">
            ${ROLES.map(r => this.roleCard(r)).join('')}
          </div>
        </section>

        <!-- APPLICATION -->
        <section id="apply" class="apply-section">
          <div class="apply-header">
            <div class="apply-icon">
              <img src="${PAW_ICON_URL}" alt="" aria-hidden="true">
            </div>
            <h2 class="apply-title">Ready to Help?</h2>
            <p class="apply-sub">
              Fill out the form below and our volunteer coordinator will be in touch.
              Tell us what you're interested in and how much time you can give — every hour matters.
            </p>
          </div>
          <div class="airtable-wrap">
            <iframe
              class="airtable-embed"
              src="${APPLICATION_URL}"
              frameborder="0"
              onmousewheel=""
              loading="lazy"
              title="BDDC Volunteer Application"
            ></iframe>
          </div>
          <p class="apply-fallback">
            Form not loading?
            <a href="${APPLICATION_URL.replace('/embed/', '/')}" target="_blank" rel="noopener">
              Open the application in a new tab →
            </a>
          </p>
        </section>
      `;
    }

    roleCard(role) {
      return `
        <article class="role-card">
          <div class="role-icon" aria-hidden="true">${role.icon}</div>
          <h3 class="role-title">${role.title}</h3>
          <p class="role-body">${role.body}</p>
        </article>
      `;
    }

    bindHeroScroll() {
      const btn = this.shadowRoot.querySelector('[data-scroll-target]');
      if (!btn) return;
      btn.addEventListener('click', (e) => {
        const target = this.shadowRoot.getElementById(btn.dataset.scrollTarget);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

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
          min-height: 420px;
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
        .hero-inner {
          text-align: center;
          max-width: 800px;
        }
        .hero-title {
          margin: 0 0 14px;
          font-size: clamp(40px, 7vw, 72px);
          font-weight: 700;
          color: var(--pink);
          text-shadow: 0 2px 14px rgba(255,255,255,0.7);
          line-height: 1.05;
        }
        .hero-tagline {
          margin: 0 0 28px;
          font-size: clamp(18px, 2.2vw, 24px);
          font-weight: 600;
          color: #3b3b5c;
          text-shadow: 0 1px 8px rgba(255,255,255,0.7);
        }
        .cta-apply {
          display: inline-block;
          padding: 16px 36px;
          background: var(--pink);
          color: #fff;
          text-decoration: none;
          border-radius: 999px;
          font-weight: 700;
          font-size: clamp(16px, 1.6vw, 20px);
          box-shadow: 0 6px 18px rgba(245,54,124,0.35);
          transition: transform .12s ease, box-shadow .2s ease, background .2s ease;
        }
        .cta-apply:hover {
          background: var(--pink-deep);
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(245,54,124,0.45);
        }
        .arrow {
          display: inline-block;
          transition: transform .15s ease;
        }
        .cta-apply:hover .arrow { transform: translateX(4px); }

        /* ───── SECTION TITLES ───── */
        .section-title {
          text-align: center;
          color: var(--pink);
          font-size: clamp(30px, 4vw, 46px);
          font-weight: 700;
          margin: 0 16px 20px;
          line-height: 1.1;
        }

        /* ───── INTRO ───── */
        .intro {
          max-width: 900px;
          margin: 0 auto;
          padding: 56px 24px 24px;
          text-align: center;
        }
        .intro-body {
          margin: 0;
          font-size: clamp(16px, 1.4vw, 19px);
          line-height: 1.65;
          color: var(--ink);
          font-weight: 600;
        }

        /* ───── ROLES GRID ───── */
        .roles-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 48px 24px 64px;
        }
        .roles-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 12px;
        }
        .role-card {
          background: #fff;
          border: 2px solid #b8c4f0;
          border-radius: 16px;
          padding: 28px 26px;
          text-align: center;
          transition: transform .15s ease, box-shadow .2s ease, border-color .2s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .role-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
          border-color: var(--pink);
        }
        .role-icon {
          font-size: 48px;
          line-height: 1;
          width: 80px;
          height: 80px;
          display: grid;
          place-items: center;
          background: var(--pink-bg);
          border-radius: 50%;
        }
        .role-title {
          margin: 4px 0 4px;
          color: var(--pink);
          font-size: clamp(20px, 1.8vw, 24px);
          font-weight: 700;
          line-height: 1.2;
        }
        .role-body {
          margin: 0;
          font-size: clamp(15px, 1.15vw, 17px);
          line-height: 1.6;
          color: var(--ink);
          font-weight: 500;
        }

        /* ───── APPLY ───── */
        .apply-section {
          background: var(--pink-bg);
          padding: 64px 24px;
        }
        .apply-header {
          max-width: 800px;
          margin: 0 auto 32px;
          text-align: center;
        }
        .apply-icon {
          width: 64px;
          height: 64px;
          margin: 0 auto 12px;
        }
        .apply-icon img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        .apply-title {
          margin: 0 0 14px;
          color: var(--pink);
          font-size: clamp(30px, 4vw, 44px);
          font-weight: 700;
        }
        .apply-sub {
          margin: 0;
          font-size: clamp(16px, 1.3vw, 18px);
          line-height: 1.6;
          color: var(--ink);
          font-weight: 500;
        }
        .airtable-wrap {
          max-width: 1000px;
          margin: 0 auto;
          background: #fff;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: var(--shadow-md);
        }
        .airtable-embed {
          background: transparent;
          border: 0;
          width: 100%;
          height: 900px;
          display: block;
        }
        .apply-fallback {
          max-width: 800px;
          margin: 16px auto 0;
          text-align: center;
          font-size: 0.95em;
          color: var(--muted);
        }
        .apply-fallback a {
          color: var(--pink);
          font-weight: 700;
          text-decoration: none;
        }
        .apply-fallback a:hover { text-decoration: underline; }

        /* ───── RESPONSIVE ───── */
        @media (max-width: 900px) {
          .roles-grid { grid-template-columns: repeat(2, 1fr); gap: 18px; }
          .role-card { padding: 24px 20px; }
          .role-title { font-size: 20px; }
          .role-body { font-size: 15px; }
          .intro-body { font-size: 16px; }
          .apply-sub { font-size: 16px; }
          .airtable-embed { height: 800px; }
        }

        @media (max-width: 560px) {
          .hero { min-height: 340px; padding: 40px 20px; }
          .roles-grid { grid-template-columns: 1fr; }
          .roles-section { padding: 36px 20px 48px; }
          .intro { padding: 40px 20px 16px; }
          .apply-section { padding: 48px 18px; }
          .airtable-embed { height: 760px; }
          .role-icon { width: 72px; height: 72px; font-size: 40px; }
        }
      `;
    }
  }

  if (!customElements.get('bddc-volunteer')) {
    customElements.define('bddc-volunteer', BDDCVolunteer);
  }
})();
