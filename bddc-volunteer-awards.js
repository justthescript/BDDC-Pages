/**
 * <bddc-volunteer-awards> — Wix Studio Custom Element
 * Big Dogs Don't Cry Animal Rescue — Annual Volunteer Awards
 *
 * Usage in Wix Studio:
 *   1. Add a Custom Element to the page
 *   2. Server URL: https://cdn.jsdelivr.net/gh/justthescript/BDDC-Pages@main/bddc-volunteer-awards.js
 *   3. Tag Name: bddc-volunteer-awards
 *   4. Optional attributes:
 *        data-year             : Award year (defaults to "2025")
 *        data-volunteer-link   : URL for the "become a volunteer" CTA
 *
 *  Recipients live in the TOP_HONORS and AWARDS arrays at the top of the file.
 *  Edit those each year — no other changes needed.
 */

(function () {
  // ────────────────────────────────────────────────────────────────────────
  // Award data
  // ────────────────────────────────────────────────────────────────────────

  // The headliners — rendered as larger ribbon cards at the top.
  const TOP_HONORS = [
    {
      icon: '🏆',
      title: 'Volunteer of the Year',
      description: 'Honoring dedication, time, and passion vital to our success.',
      recipient: 'Cori Sabotnik',
      recipientIcon: '👑'
    },
    {
      icon: '🏠',
      title: 'Foster of the Year',
      description: 'Recognizing a foster family who opened their hearts and homes for second chances.',
      recipient: 'Stacey Brown & Keith Pollack',
      recipientIcon: '👨‍👩‍👧'
    },
    {
      icon: '💛',
      title: 'Heart of Gold Award',
      description: 'Honoring extraordinary compassion for our toughest rescue cases.',
      recipient: 'Charlene Czarnecki',
      recipientIcon: '🥇'
    }
  ];

  // The full recognition list — rendered in a two-column grid.
  const AWARDS = [
    {
      icon: '💕',
      title: 'Rescue Success Story of the Year',
      description: 'Celebrating an adopted animal and their family — the reason we do what we do.',
      recipient: 'Cece & Cynthia Underwood',
      recipientIcon: '🐕'
    },
    {
      icon: '🌱',
      title: 'Newcomer Award',
      description: 'For jumping in with love and commitment to our screening team.',
      recipient: 'Erica Corradino',
      recipientIcon: '✨'
    },
    {
      icon: '🚐',
      title: 'Transporter of the Year',
      description: 'Honoring the life-saving miles driven to bring animals to safety.',
      recipient: 'Amy Regan',
      recipientIcon: '🛣️'
    },
    {
      icon: '🎨',
      title: 'Most Creative Fundraiser',
      description: 'For unique and memorable ways of raising funds to save our dogs — Paint Your Pet.',
      recipient: 'Jessica Gnemi',
      recipientIcon: '🖌️'
    },
    {
      icon: '🦸',
      title: 'Behind the Scenes Hero',
      description: 'For quietly working to keep our mission moving every day.',
      recipient: 'Nate & Anita Weaver',
      recipientIcon: '🛠️'
    },
    {
      icon: '⭐',
      title: 'Social Media Star',
      description: 'For likes, shares, and comments that spread the word and touch hearts.',
      recipient: 'Cathi Ann Santucci',
      recipientIcon: '#️⃣'
    },
    {
      icon: '📢',
      title: 'Advocate Award',
      description: 'For passionately sharing our mission and giving animals a stronger voice.',
      recipient: 'Selena Burke',
      recipientIcon: '🎤'
    },
    {
      icon: '🐾',
      title: 'Paw-sitive Impact Award',
      description: 'For making the biggest difference in the lives of community animals this year.',
      recipient: 'Ana Smith',
      recipientIcon: '💝'
    },
    {
      icon: '😇',
      title: 'Guardian Angel Award',
      description: 'For outstanding generosity and unwavering support of our mission.',
      recipient: 'Thomas Korocy',
      recipientIcon: '🕊️'
    },
    {
      icon: '🏡',
      title: 'Foster Fail of the Year',
      description: "Celebrating a foster who couldn't let go and made their pup family forever.",
      recipient: 'Connie Leal',
      recipientIcon: '❤️'
    },
    {
      icon: '🤝',
      title: 'Business Partner of the Year',
      description: 'For lifting up our rescue through partnership and support.',
      recipient: 'Merrillville Animal Hospital & Dr. Alicia Gustafson',
      recipientIcon: '💼'
    }
  ];

  class BDDCVolunteerAwards extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
      this.render();
      this.observeReveal();
    }

    render() {
      const year = this.getAttribute('data-year') || '2025';
      const volunteerLink =
        this.getAttribute('data-volunteer-link') || 'https://www.bigdogsdontcry.com/volunteer';

      this.shadowRoot.innerHTML = `
        <style>${this.styles()}</style>

        <!-- HERO -->
        <section class="hero">
          <div class="confetti" aria-hidden="true">
            ${this.confettiDots(24)}
          </div>
          <div class="hero-inner">
            <div class="hero-badge">🎉 Annual Recognition</div>
            <div class="hero-trophy" aria-hidden="true">🏆</div>
            <h1 class="hero-title">Celebrating Our ${year} Volunteers</h1>
            <p class="hero-tagline">Honoring the heroes who made it all possible.</p>
          </div>
        </section>

        <div class="page-body">

          <!-- INTRO -->
          <section class="intro reveal">
            <p>
              Behind every dog rescued, every transport completed, every adoption finalized —
              there's a volunteer giving their time and heart. These awards celebrate the people
              who made ${year} unforgettable for Big Dogs Don't Cry. Thank you, all of you.
            </p>
          </section>

          <!-- TOP HONORS -->
          <section class="section reveal">
            <h2 class="section-title">
              <span aria-hidden="true">🏆</span> Top Honors
            </h2>
            <p class="section-lead">The marquee awards of the night.</p>
            <div class="top-grid">
              ${TOP_HONORS.map((a, i) => this.renderTopHonor(a, i)).join('')}
            </div>
          </section>

          <!-- RECOGNITION AWARDS -->
          <section class="section reveal">
            <h2 class="section-title">
              <span aria-hidden="true">✨</span> Recognition Awards
            </h2>
            <p class="section-lead">Celebrating the many ways our volunteers showed up this year.</p>
            <div class="awards-grid">
              ${AWARDS.map(a => this.renderAward(a)).join('')}
            </div>
          </section>

          <!-- THANK YOU FOOTER -->
          <section class="thanks reveal">
            <div class="thanks-paws" aria-hidden="true">🐾</div>
            <h2 class="thanks-title">Thank You</h2>
            <p class="thanks-body">
              To every volunteer, foster, donor, transporter, and supporter — you are the rescue.
              Every wagging tail, every soft landing, every second chance happens because of you.
            </p>
            <a class="cta" href="${volunteerLink}" target="_blank" rel="noopener">
              Want to join the pack? <span class="arrow">→</span>
            </a>
          </section>

        </div>
      `;
    }

    renderTopHonor(a, idx) {
      return `
        <article class="top-honor reveal" style="--delay: ${idx * 100}ms">
          <div class="ribbon">TOP HONOR</div>
          <div class="top-icon" aria-hidden="true">${a.icon}</div>
          <h3 class="top-title">${a.title}</h3>
          <p class="top-desc">${a.description}</p>
          <div class="top-recipient">
            <span class="recip-icon" aria-hidden="true">${a.recipientIcon}</span>
            <span class="recip-name">${a.recipient}</span>
          </div>
        </article>
      `;
    }

    renderAward(a) {
      return `
        <article class="award reveal">
          <div class="award-icon" aria-hidden="true">${a.icon}</div>
          <div class="award-body">
            <h3 class="award-title">${a.title}</h3>
            <p class="award-desc">${a.description}</p>
            <div class="award-recipient">
              <span class="recip-icon" aria-hidden="true">${a.recipientIcon}</span>
              <span class="recip-name">${a.recipient}</span>
            </div>
          </div>
        </article>
      `;
    }

    confettiDots(count) {
      let html = '';
      for (let i = 0; i < count; i++) {
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const size = 6 + Math.random() * 10;
        const delay = Math.random() * 4;
        const colors = ['#fff', '#ffd700', '#ffb6c1', '#ff8fc1'];
        const color = colors[i % colors.length];
        html += `<span class="dot" style="left:${left}%; top:${top}%; width:${size}px; height:${size}px; background:${color}; animation-delay:${delay}s;"></span>`;
      }
      return html;
    }

    observeReveal() {
      // Scroll-triggered fade-in for the .reveal elements.
      // Falls back gracefully if IntersectionObserver isn't available.
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
          --gold: #f5b800;
          --gold-light: #ffd770;
          --purple: #845ef7;
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
          padding: 64px 24px 72px;
          background:
            radial-gradient(circle at 20% 20%, rgba(255,255,255,0.18) 0%, transparent 60%),
            radial-gradient(circle at 80% 80%, rgba(255,255,255,0.15) 0%, transparent 60%),
            linear-gradient(135deg, #FF1493 0%, #F5367C 50%, #ff7eb3 100%);
          overflow: hidden;
          text-align: center;
          color: #fff;
        }
        .confetti {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .confetti .dot {
          position: absolute;
          border-radius: 50%;
          opacity: 0;
          animation: floatDot 6s ease-in-out infinite;
        }
        @keyframes floatDot {
          0%, 100% { opacity: 0; transform: translateY(0); }
          50%      { opacity: 0.85; transform: translateY(-12px); }
        }
        .hero-inner {
          position: relative;
          z-index: 1;
          max-width: 800px;
          margin: 0 auto;
        }
        .hero-badge {
          display: inline-block;
          padding: 8px 18px;
          background: rgba(255,255,255,0.22);
          border: 1px solid rgba(255,255,255,0.4);
          border-radius: 999px;
          font-weight: 600;
          font-size: clamp(13px, 1.2vw, 15px);
          letter-spacing: .5px;
          margin-bottom: 18px;
          backdrop-filter: blur(4px);
        }
        .hero-trophy {
          font-size: clamp(64px, 9vw, 96px);
          line-height: 1;
          animation: float 3s ease-in-out infinite;
          filter: drop-shadow(0 6px 18px rgba(0,0,0,0.25));
          margin-bottom: 14px;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-12px); }
        }
        .hero-title {
          margin: 0 0 14px;
          font-family: "Playfair Display", "Raleway", serif;
          font-size: clamp(32px, 5.5vw, 56px);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: 1px;
          text-shadow: 0 3px 12px rgba(0,0,0,0.25);
        }
        .hero-tagline {
          margin: 0;
          font-size: clamp(16px, 1.9vw, 22px);
          font-weight: 400;
          opacity: 0.95;
          letter-spacing: .3px;
        }

        /* ───── PAGE BODY ───── */
        .page-body {
          max-width: 1180px;
          margin: 0 auto;
          padding: 40px 20px 56px;
        }

        /* ───── INTRO ───── */
        .intro {
          max-width: 820px;
          margin: 8px auto 36px;
          text-align: center;
          padding: 0 12px;
        }
        .intro p {
          margin: 0;
          font-size: clamp(16px, 1.4vw, 19px);
          line-height: 1.65;
          color: var(--ink);
          font-weight: 500;
        }

        /* ───── SECTIONS ───── */
        .section { margin-bottom: 48px; }
        .section-title {
          margin: 0 0 8px;
          color: var(--pink-deep);
          font-family: "Playfair Display", "Raleway", serif;
          font-size: clamp(28px, 3.6vw, 42px);
          font-weight: 700;
          line-height: 1.15;
          text-align: center;
          letter-spacing: .5px;
        }
        .section-lead {
          margin: 0 auto 28px;
          text-align: center;
          color: var(--muted);
          font-size: clamp(15px, 1.2vw, 17px);
          font-style: italic;
          max-width: 640px;
        }

        /* ───── TOP HONORS ───── */
        .top-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          align-items: stretch;
        }
        .top-honor {
          position: relative;
          background:
            radial-gradient(ellipse at top, rgba(255,255,255,1) 0%, var(--pink-bg) 100%);
          border-radius: 18px;
          padding: 56px 26px 32px;
          text-align: center;
          box-shadow: var(--shadow-md);
          border: 2px solid var(--pink-soft);
          overflow: hidden;
          transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
        }
        .top-honor:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-lg);
          border-color: var(--pink);
        }
        .top-honor::after {
          content: "";
          position: absolute;
          inset: -50%;
          background: radial-gradient(circle, rgba(255,215,0,0.08) 0%, transparent 60%);
          pointer-events: none;
        }
        .ribbon {
          position: absolute;
          top: 16px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, var(--gold) 0%, var(--pink) 100%);
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          padding: 6px 18px;
          border-radius: 999px;
          box-shadow: 0 4px 10px rgba(245,54,124,0.35);
          z-index: 2;
        }
        .top-icon {
          font-size: 64px;
          line-height: 1;
          margin: 8px 0 18px;
          filter: drop-shadow(0 6px 14px rgba(245,54,124,0.25));
          animation: bounceIn .6s cubic-bezier(.34,1.56,.64,1);
        }
        @keyframes bounceIn {
          0%   { transform: scale(0.4); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .top-title {
          margin: 0 0 12px;
          color: var(--pink-deep);
          font-family: "Playfair Display", "Raleway", serif;
          font-size: clamp(22px, 2.2vw, 28px);
          font-weight: 700;
          line-height: 1.25;
        }
        .top-desc {
          margin: 0 0 20px;
          color: var(--ink);
          font-size: clamp(14px, 1.15vw, 16px);
          line-height: 1.55;
          opacity: 0.85;
        }
        .top-recipient {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 22px;
          background: linear-gradient(135deg, var(--pink) 0%, var(--pink-deep) 100%);
          color: #fff;
          border-radius: 999px;
          font-weight: 700;
          font-size: clamp(14px, 1.2vw, 16px);
          box-shadow: 0 6px 16px rgba(245,54,124,0.35);
          position: relative;
          z-index: 1;
        }
        .top-recipient .recip-icon { font-size: 1.15em; }

        /* ───── RECOGNITION AWARDS ───── */
        .awards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        .award {
          background: #fff;
          border-radius: 14px;
          padding: 24px 26px;
          display: grid;
          grid-template-columns: 64px 1fr;
          gap: 20px;
          align-items: start;
          box-shadow: var(--shadow-sm);
          border: 2px solid transparent;
          position: relative;
          overflow: hidden;
          transition: transform .2s ease, box-shadow .25s ease, border-color .25s ease;
        }
        .award::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 5px;
          height: 100%;
          background: linear-gradient(to bottom, var(--pink), var(--pink-soft));
          transition: width .35s ease, opacity .35s ease;
        }
        .award:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
          border-color: var(--pink-soft);
        }
        .award:hover::before {
          width: 100%;
          opacity: 0.06;
        }
        .award-icon {
          width: 56px;
          height: 56px;
          display: grid;
          place-items: center;
          background: linear-gradient(135deg, var(--pink-light) 0%, var(--pink-soft) 100%);
          border-radius: 14px;
          font-size: 28px;
          flex-shrink: 0;
          box-shadow: inset 0 -2px 6px rgba(245,54,124,0.10);
          transition: transform .25s ease;
        }
        .award:hover .award-icon {
          transform: rotate(-6deg) scale(1.06);
        }
        .award-body { min-width: 0; position: relative; z-index: 1; }
        .award-title {
          margin: 0 0 8px;
          color: var(--pink-deep);
          font-family: "Playfair Display", "Raleway", serif;
          font-size: clamp(18px, 1.6vw, 22px);
          font-weight: 700;
          line-height: 1.25;
        }
        .award-desc {
          margin: 0 0 14px;
          color: var(--muted);
          font-size: clamp(14px, 1.1vw, 15px);
          line-height: 1.55;
        }
        .award-recipient {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: linear-gradient(135deg, var(--pink-bg) 0%, var(--pink-light) 100%);
          color: var(--pink-deep);
          border-radius: 999px;
          font-weight: 700;
          font-size: clamp(13px, 1.1vw, 15px);
          border: 1px solid var(--pink-soft);
        }
        .award-recipient .recip-icon { font-size: 1.05em; }

        /* ───── THANKS FOOTER ───── */
        .thanks {
          margin-top: 32px;
          padding: 56px 32px 64px;
          text-align: center;
          background: linear-gradient(135deg, #FF1493 0%, #F5367C 50%, #ff7eb3 100%);
          color: #fff;
          border-radius: 22px;
          position: relative;
          overflow: hidden;
          box-shadow: var(--shadow-lg);
        }
        .thanks::before,
        .thanks::after {
          content: "🐾";
          position: absolute;
          font-size: 120px;
          opacity: 0.10;
          top: 50%;
          transform: translateY(-50%) rotate(-12deg);
          pointer-events: none;
        }
        .thanks::before { left: 4%; }
        .thanks::after  { right: 4%; transform: translateY(-50%) rotate(12deg); }
        .thanks-paws {
          font-size: 44px;
          margin-bottom: 8px;
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.18); }
        }
        .thanks-title {
          margin: 0 0 14px;
          font-family: "Playfair Display", "Raleway", serif;
          font-size: clamp(32px, 4.5vw, 48px);
          font-weight: 700;
          letter-spacing: 1px;
          text-shadow: 0 3px 10px rgba(0,0,0,0.2);
        }
        .thanks-body {
          margin: 0 auto 26px;
          max-width: 680px;
          font-size: clamp(16px, 1.4vw, 18px);
          line-height: 1.6;
          opacity: 0.95;
          position: relative;
          z-index: 1;
        }
        .cta {
          display: inline-block;
          padding: 14px 30px;
          background: #fff;
          color: var(--pink-deep);
          text-decoration: none;
          border-radius: 999px;
          font-weight: 700;
          font-size: clamp(15px, 1.3vw, 17px);
          box-shadow: 0 8px 22px rgba(0,0,0,0.18);
          transition: transform .15s ease, box-shadow .25s ease;
          position: relative;
          z-index: 1;
        }
        .cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.25);
        }
        .arrow {
          display: inline-block;
          transition: transform .2s ease;
        }
        .cta:hover .arrow { transform: translateX(4px); }

        /* ───── REVEAL ANIMATION ───── */
        .reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity .6s ease, transform .6s ease;
          transition-delay: var(--delay, 0ms);
        }
        .reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal {
            opacity: 1;
            transform: none;
            transition: none;
          }
          .hero-trophy,
          .top-icon,
          .thanks-paws,
          .confetti .dot {
            animation: none;
          }
        }

        /* ───── RESPONSIVE ───── */
        @media (max-width: 980px) {
          .top-grid { grid-template-columns: 1fr; max-width: 520px; margin: 0 auto; }
          .awards-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 560px) {
          .hero { padding: 48px 18px 56px; }
          .page-body { padding: 32px 14px 40px; }
          .award {
            grid-template-columns: 1fr;
            text-align: center;
            padding: 22px 20px;
          }
          .award-icon { margin: 0 auto; }
          .award-recipient { width: auto; }
          .top-honor { padding: 52px 20px 28px; }
          .top-icon { font-size: 56px; }
          .thanks { padding: 44px 22px 50px; }
          .thanks::before, .thanks::after { font-size: 80px; }
        }
      `;
    }
  }

  if (!customElements.get('bddc-volunteer-awards')) {
    customElements.define('bddc-volunteer-awards', BDDCVolunteerAwards);
  }
})();
