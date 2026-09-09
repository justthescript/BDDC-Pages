/**
 * <bddc-anniversary> — Wix Studio Custom Element
 * Big Dogs Don't Cry Animal Rescue — 2nd Year Anniversary Celebration
 *
 * Usage in Wix Studio:
 *   1. Add a Custom Element to a new page (e.g. /2nd-year-anniversary)
 *   2. Server URL: https://cdn.jsdelivr.net/gh/justthescript/BDDC-Pages@main/bddc-anniversary.js
 *   3. Tag Name:   bddc-anniversary
 *
 *  Sponsorship tiers and donation ideas live in the arrays below — edit
 *  there when details change (price, ticket counts, perks, "left" counts).
 */

(function () {
  const TICKET_URL = 'https://www.zeffy.com/en-US/ticketing/2nd-year-anniversary-celebration-2';

  const EVENT = {
    date: 'Sunday, October 4th, 2026',
    doors: '12:30 PM',
    venue: 'Local 150 Operating Engineers Building',
    address: '2193 W. 84th Place, Merrillville, Indiana 46410'
  };

  // ────────────────────────────────────────────────────────────────────────
  // Celebrate. Connect. Make an Impact.
  // ────────────────────────────────────────────────────────────────────────
  const HIGHLIGHTS = [
    { icon: '🏆', title: 'Awards', desc: 'Honoring our outstanding fosters and volunteers.' },
    { icon: '🎁', title: 'Raffles', desc: 'Exciting prizes and chances to win!' },
    { icon: '🔨', title: 'Silent Auction', desc: 'Bid on amazing items and experiences.' },
    { icon: '💕', title: 'Inspiring Stories', desc: "Heartwarming stories from the dogs and people we've touched." },
    { icon: '🐾', title: 'Help Save More Lives', desc: 'Proceeds support our mission and help us continue rescuing big dogs in need.' }
  ];

  // ────────────────────────────────────────────────────────────────────────
  // Sponsorship tiers — edit price, ticket count, "left" badge, and perks here
  // ────────────────────────────────────────────────────────────────────────
  const SPONSORSHIPS = [
    {
      tier: 'Top Dog Sponsor',
      price: '$3,000',
      tickets: 8,
      badge: '1 Left!',
      featured: true,
      perks: [
        'Featured as presenting sponsor (event name: "Presented by [Your Business]")',
        'Prominent logo placement on all event materials, signage, and our website',
        'Social media spotlight (multiple posts)',
        'Full-page ad in the event program',
        'VIP table with 8 tickets to the event',
        'Recognition from the stage during the event',
        'Ability to have a table with promotional materials at event if you wish'
      ]
    },
    {
      tier: 'Pack Leader Sponsor',
      price: '$1,000',
      tickets: 5,
      perks: [
        'Logo placement on event materials and website',
        'Half-page ad in the program',
        'Social media mention',
        '5 event tickets',
        'Ability to have a table with promotional materials at event if you wish'
      ]
    },
    {
      tier: 'Tail Wagger Sponsor',
      price: '$500',
      tickets: 2,
      perks: [
        'Logo listed on our website and event signage',
        'Quarter-page ad in the program',
        '2 event tickets',
        'Social media shoutout'
      ]
    },
    {
      tier: 'Paw Pal Sponsor',
      price: '$250',
      tickets: 2,
      perks: [
        'Name listed in program and on website',
        '2 event tickets',
        'Social media thank-you'
      ]
    }
  ];

  // ────────────────────────────────────────────────────────────────────────
  // Silent raffle / auction donation ideas
  // ────────────────────────────────────────────────────────────────────────
  const DONATION_CATEGORIES = [
    {
      icon: '🎁',
      title: 'Gift Cards',
      items: ['Restaurants', 'Grocery Stores', 'Gas Stations', 'Retail Stores', 'Online Stores', 'Home Improvement', 'Pet Supply Stores']
    },
    {
      icon: '🛎️',
      title: 'Services',
      items: ['Home Services', 'Auto Detailing', 'Landscaping', 'Pet Grooming', 'Training Sessions', 'Photography', 'Spa & Wellness', 'Professional Services']
    },
    {
      icon: '🛍️',
      title: 'Items',
      items: ['Electronics', 'Tools', 'Home Décor', 'Outdoor Gear', 'Appliances', 'Jewelry', 'Sporting Goods', 'Pet Supplies']
    },
    {
      icon: '🧺',
      title: 'Baskets',
      items: ["Wine & Cheese", "Coffee Lover's", 'Pamper Yourself', 'BBQ & Grilling', 'Movie Night', "Pet Lover's", 'Game Night', 'Seasonal/Holiday']
    },
    {
      icon: '🎟️',
      title: 'Experiences',
      items: ['Event Tickets', 'Hotel Stays', 'Weekend Getaways', 'Adventure Activities', 'Golf Packages', 'Dining Experiences', 'Concerts/Shows']
    }
  ];

  class BDDCAnniversary extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
      this.render();
      this.observeReveal();
    }

    render() {
      this.shadowRoot.innerHTML = `
        <style>${this.styles()}</style>

        <!-- HERO -->
        <section class="hero">
          <div class="hero-paw hero-paw--1" aria-hidden="true">🐾</div>
          <div class="hero-paw hero-paw--2" aria-hidden="true">🐾</div>
          <div class="hero-inner">
            <div class="hero-script">Join Us! ♥</div>
            <h1 class="hero-title">2nd Year Anniversary<br><span>Celebration</span></h1>
            <p class="hero-tagline">
              We're celebrating TWO incredible years of rescuing, rehabilitating, and rehoming over
              <strong>500 big dogs</strong> in nearly two years — many overlooked because of their size,
              age, or medical needs.
            </p>
            <p class="hero-sub">Come celebrate the lives saved and the community that made it all possible!</p>

            <div class="hero-cta-group">
              <a class="btn btn-light" href="${TICKET_URL}" target="_blank" rel="noopener noreferrer">
                🎟️ Get Tickets
              </a>
              <a class="btn btn-outline-light" href="${TICKET_URL}" target="_blank" rel="noopener noreferrer">
                🤝 Become a Sponsor
              </a>
            </div>
          </div>
        </section>

        <!-- EVENT DETAILS BAR -->
        <section class="details-bar reveal">
          <div class="details-inner">
            <div class="detail">
              <span class="detail-icon" aria-hidden="true">📅</span>
              <div>
                <div class="detail-label">Date</div>
                <div class="detail-value">${EVENT.date}</div>
              </div>
            </div>
            <div class="detail">
              <span class="detail-icon" aria-hidden="true">🕐</span>
              <div>
                <div class="detail-label">Doors Open</div>
                <div class="detail-value">${EVENT.doors}</div>
              </div>
            </div>
            <div class="detail">
              <span class="detail-icon" aria-hidden="true">📍</span>
              <div>
                <div class="detail-label">Location</div>
                <div class="detail-value">${EVENT.venue}<br>${EVENT.address}</div>
              </div>
            </div>
          </div>
        </section>

        <div class="page-body">

          <!-- CELEBRATE. CONNECT. MAKE AN IMPACT. -->
          <section class="banner-ribbon reveal">Celebrate. Connect. Make an Impact.</section>
          <section class="highlights-grid reveal">
            ${HIGHLIGHTS.map(h => `
              <div class="highlight-card">
                <div class="highlight-icon" aria-hidden="true">${h.icon}</div>
                <h3 class="highlight-title">${h.title}</h3>
                <p class="highlight-desc">${h.desc}</p>
              </div>
            `).join('')}
          </section>

          <!-- SPONSORSHIP OPPORTUNITIES -->
          <section class="sponsors-section reveal">
            <div class="section-head">
              <div class="section-overline">Partner With Us</div>
              <h2 class="section-title">Sponsorship Opportunities</h2>
              <p class="section-lead">
                Your support helps us save more lives and build brighter futures.
              </p>
            </div>
            <div class="sponsors-grid">
              ${SPONSORSHIPS.map(s => this.sponsorCard(s)).join('')}
            </div>
          </section>

          <!-- CAN'T SPONSOR -->
          <section class="donate-section reveal">
            <div class="section-head">
              <div class="section-overline">Every Gift Helps</div>
              <h2 class="section-title">Can't Sponsor? You Can Still Make an Impact!</h2>
              <p class="section-lead">
                We are gratefully accepting donations of goods, services, and gift cards for our
                silent raffle and auction.
              </p>
            </div>
            <div class="donate-grid">
              ${DONATION_CATEGORIES.map(c => `
                <div class="donate-card">
                  <div class="donate-icon" aria-hidden="true">${c.icon}</div>
                  <h3 class="donate-title">${c.title}</h3>
                  <ul class="donate-items">
                    ${c.items.map(i => `<li>${i}</li>`).join('')}
                  </ul>
                </div>
              `).join('')}
            </div>

            <div class="donate-callout">
              <div class="donate-callout-icon" aria-hidden="true">💌</div>
              <div>
                <div class="donate-callout-title">Donating goods, services, or gift cards?</div>
                <div class="donate-callout-body">
                  Email us at
                  <a href="mailto:Bigdogsdontcryrescue@gmail.com">Bigdogsdontcryrescue@gmail.com</a>
                  to coordinate — every donation helps us save more big dogs!
                </div>
              </div>
            </div>
          </section>

          <!-- FINAL CTA -->
          <section class="final-cta reveal">
            <h2 class="final-cta-title">Be Part of the Story.<br>Be the Second Chance.</h2>
            <p class="final-cta-body">
              Together, we can keep giving them the second chance they deserve.
            </p>
            <a class="btn btn-light btn-lg" href="${TICKET_URL}" target="_blank" rel="noopener noreferrer">
              🎟️ Purchase Tickets or Sponsorship <span class="arrow">→</span>
            </a>
          </section>

        </div>
      `;
    }

    sponsorCard(s) {
      return `
        <article class="sponsor-card${s.featured ? ' featured' : ''}">
          ${s.badge ? `<div class="sponsor-badge">${s.badge}</div>` : ''}
          <h3 class="sponsor-tier">${s.tier}</h3>
          <div class="sponsor-price">${s.price}</div>
          <div class="sponsor-tickets">Group ticket · includes ${s.tickets} ticket${s.tickets === 1 ? '' : 's'}</div>
          <ul class="sponsor-perks">
            ${s.perks.map(p => `<li>${p}</li>`).join('')}
          </ul>
          <a class="btn ${s.featured ? 'btn-light' : 'btn-primary'} sponsor-cta" href="${TICKET_URL}" target="_blank" rel="noopener noreferrer">
            Become a Sponsor
          </a>
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
      }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
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
          --ink: #2a2a2a;
          --ink-dark: #1a1a1a;
          --muted: #666;
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
          overflow: hidden;
          background: linear-gradient(135deg, var(--pink) 0%, var(--pink-deep) 100%);
          padding: clamp(56px, 8vw, 96px) 24px clamp(48px, 6vw, 72px);
          text-align: center;
        }
        .hero-paw {
          position: absolute;
          font-size: clamp(90px, 14vw, 180px);
          opacity: 0.10;
          pointer-events: none;
        }
        .hero-paw--1 { top: -20px; left: -30px; transform: rotate(-18deg); }
        .hero-paw--2 { bottom: -30px; right: -20px; transform: rotate(14deg); }
        .hero-inner { position: relative; z-index: 1; max-width: 760px; margin: 0 auto; }
        .hero-script {
          font-family: Georgia, "Times New Roman", serif;
          font-style: italic;
          color: #fff;
          font-size: clamp(20px, 2.4vw, 28px);
          margin-bottom: 8px;
          opacity: 0.95;
        }
        .hero-title {
          margin: 0 0 20px;
          color: #fff;
          font-size: clamp(34px, 5.5vw, 58px);
          font-weight: 800;
          line-height: 1.12;
          letter-spacing: -0.5px;
          text-shadow: 0 3px 16px rgba(0,0,0,0.18);
        }
        .hero-title span { color: #fff; opacity: 0.92; }
        .hero-tagline {
          margin: 0 0 10px;
          color: #fff;
          font-size: clamp(16px, 1.6vw, 19px);
          line-height: 1.65;
          opacity: 0.96;
        }
        .hero-tagline strong { font-weight: 800; }
        .hero-sub {
          margin: 0 0 30px;
          color: #fff;
          font-size: clamp(15px, 1.3vw, 17px);
          font-style: italic;
          opacity: 0.92;
        }
        .hero-cta-group {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
        }

        /* ───── BUTTONS ───── */
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 30px;
          border-radius: 999px;
          text-decoration: none;
          font-weight: 700;
          font-size: clamp(15px, 1.3vw, 17px);
          transition: transform .15s ease, box-shadow .2s ease, background .2s ease, color .2s ease;
          border: 2px solid transparent;
          cursor: pointer;
          font-family: inherit;
        }
        .btn-light {
          background: #fff;
          color: var(--pink-deep);
          box-shadow: 0 6px 18px rgba(0,0,0,0.18);
        }
        .btn-light:hover {
          background: #ffeaf2;
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(0,0,0,0.25);
        }
        .btn-outline-light {
          background: transparent;
          color: #fff;
          border-color: rgba(255,255,255,0.8);
        }
        .btn-outline-light:hover {
          background: rgba(255,255,255,0.15);
          transform: translateY(-2px);
        }
        .btn-primary {
          background: linear-gradient(135deg, var(--pink) 0%, var(--pink-deep) 100%);
          color: #fff;
          box-shadow: var(--shadow-md);
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }
        .btn-lg { padding: 16px 36px; font-size: clamp(16px, 1.5vw, 19px); }
        .arrow { display: inline-block; transition: transform .15s ease; }
        .btn:hover .arrow { transform: translateX(4px); }

        /* ───── EVENT DETAILS BAR ───── */
        .details-bar {
          background: var(--ink-dark);
          padding: 28px 20px;
        }
        .details-inner {
          max-width: 1000px;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 28px 48px;
        }
        .detail {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          color: #fff;
          text-align: left;
        }
        .detail-icon { font-size: 26px; line-height: 1; margin-top: 2px; }
        .detail-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--pink-soft);
          margin-bottom: 4px;
        }
        .detail-value {
          font-size: clamp(15px, 1.3vw, 17px);
          font-weight: 600;
          line-height: 1.4;
        }

        /* ───── PAGE BODY ───── */
        .page-body {
          max-width: 1200px;
          margin: 0 auto;
          padding: 48px 20px 64px;
        }

        .section-head {
          text-align: center;
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

        /* ───── RIBBON ───── */
        .banner-ribbon {
          text-align: center;
          font-family: Georgia, "Times New Roman", serif;
          font-style: italic;
          font-weight: 700;
          color: var(--pink-deep);
          font-size: clamp(22px, 2.6vw, 30px);
          margin: 0 0 32px;
        }

        /* ───── HIGHLIGHTS ───── */
        .highlights-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 18px;
          margin-bottom: 56px;
        }
        .highlight-card {
          background: #fff;
          border: 2px solid var(--pink-soft);
          border-radius: 16px;
          padding: 22px 16px;
          text-align: center;
          transition: transform .2s ease, box-shadow .25s ease, border-color .25s ease;
        }
        .highlight-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-sm);
          border-color: var(--pink);
        }
        .highlight-icon { font-size: 34px; margin-bottom: 10px; line-height: 1; }
        .highlight-title {
          margin: 0 0 6px;
          color: var(--pink-deep);
          font-size: 16px;
          font-weight: 700;
        }
        .highlight-desc {
          margin: 0;
          font-size: 13px;
          line-height: 1.5;
          color: var(--muted);
        }

        /* ───── SPONSORS ───── */
        .sponsors-section { margin-bottom: 56px; }
        .sponsors-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          align-items: stretch;
        }
        .sponsor-card {
          position: relative;
          background: #fff;
          border: 2px solid var(--pink-soft);
          border-radius: 18px;
          padding: 28px 22px 24px;
          display: flex;
          flex-direction: column;
          transition: transform .2s ease, box-shadow .25s ease, border-color .25s ease;
        }
        .sponsor-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-md);
          border-color: var(--pink);
        }
        .sponsor-card.featured {
          background: linear-gradient(160deg, var(--pink) 0%, var(--pink-deep) 100%);
          border-color: transparent;
          color: #fff;
          box-shadow: var(--shadow-lg);
        }
        .sponsor-badge {
          position: absolute;
          top: -14px;
          left: 20px;
          background: var(--ink-dark);
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: .5px;
          padding: 7px 14px;
          border-radius: 999px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.25);
        }
        .sponsor-tier {
          margin: 6px 0 4px;
          font-size: clamp(17px, 1.6vw, 19px);
          font-weight: 700;
          color: var(--pink-deep);
        }
        .sponsor-card.featured .sponsor-tier { color: #fff; }
        .sponsor-price {
          font-size: clamp(30px, 3vw, 38px);
          font-weight: 800;
          color: var(--ink);
          margin-bottom: 2px;
        }
        .sponsor-card.featured .sponsor-price { color: #fff; }
        .sponsor-tickets {
          font-size: 12.5px;
          font-weight: 600;
          color: var(--muted);
          margin-bottom: 18px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--pink-soft);
        }
        .sponsor-card.featured .sponsor-tickets {
          color: rgba(255,255,255,0.85);
          border-bottom-color: rgba(255,255,255,0.25);
        }
        .sponsor-perks {
          list-style: none;
          margin: 0 0 22px;
          padding: 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .sponsor-perks li {
          font-size: 13.5px;
          line-height: 1.5;
          padding-left: 20px;
          position: relative;
        }
        .sponsor-perks li::before {
          content: '🐾';
          position: absolute;
          left: 0;
          top: 0;
          font-size: 11px;
        }
        .sponsor-cta { justify-content: center; width: 100%; }

        /* ───── DONATE SECTION ───── */
        .donate-section { margin-bottom: 8px; }
        .donate-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 18px;
          margin-bottom: 32px;
        }
        .donate-card {
          background: var(--pink-bg);
          border: 2px solid var(--pink-soft);
          border-radius: 16px;
          padding: 22px 18px;
          transition: transform .2s ease, box-shadow .25s ease, border-color .25s ease;
        }
        .donate-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-sm);
          border-color: var(--pink);
        }
        .donate-icon { font-size: 28px; margin-bottom: 8px; }
        .donate-title {
          margin: 0 0 12px;
          color: var(--pink-deep);
          font-size: 15.5px;
          font-weight: 700;
        }
        .donate-items {
          margin: 0;
          padding: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .donate-items li {
          font-size: 12.5px;
          line-height: 1.4;
          color: var(--ink);
          padding-left: 14px;
          position: relative;
        }
        .donate-items li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.55em;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--pink);
        }
        .donate-callout {
          display: flex;
          align-items: flex-start;
          gap: 18px;
          background: #fff;
          border: 2px dashed var(--pink-soft);
          border-radius: 16px;
          padding: 24px;
        }
        .donate-callout-icon { font-size: 30px; flex-shrink: 0; }
        .donate-callout-title {
          font-weight: 700;
          color: var(--pink-deep);
          margin-bottom: 4px;
          font-size: 15.5px;
        }
        .donate-callout-body {
          font-size: 14.5px;
          line-height: 1.6;
          color: var(--ink);
        }
        .donate-callout-body a { font-weight: 700; }

        /* ───── FINAL CTA ───── */
        .final-cta {
          margin-top: 56px;
          background: linear-gradient(135deg, var(--pink) 0%, var(--pink-deep) 100%);
          color: #fff;
          border-radius: 22px;
          padding: clamp(40px, 5vw, 60px) clamp(24px, 4vw, 48px);
          text-align: center;
          box-shadow: var(--shadow-lg);
          position: relative;
          overflow: hidden;
        }
        .final-cta::before, .final-cta::after {
          content: "🐾";
          position: absolute;
          font-size: 120px;
          opacity: 0.08;
          top: 50%;
          transform: translateY(-50%) rotate(-12deg);
          pointer-events: none;
        }
        .final-cta::before { left: 2%; }
        .final-cta::after { right: 2%; transform: translateY(-50%) rotate(12deg); }
        .final-cta-title {
          position: relative;
          z-index: 1;
          margin: 0 0 12px;
          font-size: clamp(26px, 3.4vw, 38px);
          font-weight: 800;
          line-height: 1.25;
          text-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }
        .final-cta-body {
          position: relative;
          z-index: 1;
          margin: 0 0 26px;
          font-size: clamp(15px, 1.3vw, 17px);
          opacity: 0.95;
        }
        .final-cta .btn { position: relative; z-index: 1; }

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
        @media (max-width: 1100px) {
          .highlights-grid { grid-template-columns: repeat(3, 1fr); }
          .sponsors-grid { grid-template-columns: repeat(2, 1fr); }
          .donate-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 700px) {
          .highlights-grid { grid-template-columns: repeat(2, 1fr); }
          .sponsors-grid { grid-template-columns: 1fr; }
          .donate-grid { grid-template-columns: repeat(2, 1fr); }
          .details-inner { flex-direction: column; align-items: center; text-align: center; }
          .detail { text-align: left; }
          .donate-callout { flex-direction: column; text-align: center; align-items: center; }
        }
        @media (max-width: 460px) {
          .highlights-grid { grid-template-columns: 1fr; }
          .donate-grid { grid-template-columns: 1fr; }
          .page-body { padding: 36px 16px 48px; }
          .hero-cta-group { flex-direction: column; align-items: stretch; }
          .hero-cta-group .btn { justify-content: center; }
        }
      `;
    }
  }

  if (!customElements.get('bddc-anniversary')) {
    customElements.define('bddc-anniversary', BDDCAnniversary);
  }
})();
