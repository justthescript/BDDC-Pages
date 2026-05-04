/**
 * <bddc-adoption-info> — Wix Studio Custom Element
 * Big Dogs Don't Cry Animal Rescue — What's Included with Adoption
 *
 * Usage in Wix Studio:
 *   1. Add a Custom Element to the page
 *   2. Server URL: https://cdn.jsdelivr.net/gh/justthescript/BDDC-Pages@main/bddc-adoption-info.js
 *   3. Tag Name: bddc-adoption-info
 *   4. (Optional) data-hero-image : URL for hero background image
 */

(function () {
  const DEFAULT_HERO_IMAGE =
    'https://static.wixstatic.com/media/bc59b6_604fb6f09a314f219daf30e354c81e5a~mv2.webp';

  const PAW_ICON_URL =
    'https://static.wixstatic.com/media/bc59b6_45db072b49a5427f930919d18683e36d~mv2.png';

  // Medical care included items
  const MEDICAL_ITEMS = [
    {
      icon: '✨',
      title: 'Spay / Neuter Surgery',
      body: `Your pet will be spayed or neutered before adoption whenever possible. If the procedure hasn't been completed yet (due to age, weight, or health reasons), we've got you covered — we'll coordinate the surgery at our assigned veterinary clinic at no cost to you. This important procedure helps prevent unwanted litters and can improve your pet's health and behavior.`
    },
    {
      icon: '💉',
      title: 'Core Vaccinations',
      body: `Every pet receives their essential core vaccines to protect them from serious diseases, including:`,
      list: [
        '<strong>Rabies</strong> — Required by law and protects against this fatal disease',
        '<strong>DHPP (Distemper, Hepatitis, Parvovirus, Parainfluenza)</strong> — Shields against common canine diseases',
        '<strong>Leptospirosis</strong> — Protection against bacterial infection'
      ],
      footnote: `Note: Non-core vaccines (Bordetella, Canine Influenza, Lyme) are not included but may be recommended by your veterinarian based on your pet's lifestyle.`
    },
    {
      icon: '🏥',
      title: 'Complete Medical Evaluation & Treatment',
      body: `Each pet receives a thorough medical evaluation, and any existing conditions are treated while in our care. We're committed to transparency — if your new friend has ongoing medical needs, we'll discuss this with you upfront. In some cases, treatment may extend beyond adoption on a case-by-case basis. Always check with your BDDC representative to confirm if ongoing care will be provided.`
    },
    {
      icon: '🔍',
      title: 'Microchipping for Life',
      body: `Your pet will be microchipped and registered, giving you peace of mind that if they ever get lost, they can be returned home safely. This tiny chip is your pet's permanent ID and could make all the difference in a reunion.`
    },
    {
      icon: '🐛',
      title: 'Parasite Prevention & Treatment',
      body: `We treat all pets for common internal parasites (worms) and external parasites (fleas, ticks) as needed while they're in our care. Your pet will start their new life free from these pesky critters. Please note that ongoing monthly preventatives after adoption are your responsibility unless otherwise stated in writing.`
    },
    {
      icon: '📋',
      title: 'Medical Records',
      body: `You'll receive all available medical records at the time of adoption or shortly after. These can be shared with your veterinarian to ensure continuity of care and help your vet understand your pet's complete health history.`
    },
    {
      icon: '🎭',
      title: 'Behavior Assessment & Foster Insights',
      body: `Many of our dogs live in foster homes, not kennels — which means we really get to know their personalities, quirks, and preferences. While we can't guarantee behavior (every pet is unique!), we'll share everything we've observed about their personality, energy level, and any behavioral considerations. We'll also let you know how they've done with children, other dogs, or cats when this information is available.`
    }
  ];

  const PROCESS_STEPS = [
    'Application',
    'Reference Check',
    'Vet Records Review',
    'Home Visit',
    'Approval!',
    'Meet & Greet',
    'Adoption Day! 🎉'
  ];

  const NOT_INCLUDED = [
    'Routine wellness care (annual exams, booster vaccines)',
    'Monthly heartworm and flea/tick prevention',
    'Grooming, nail trims, and dental care',
    'Food and treats',
    'Emergency veterinary care or new medical conditions that arise after adoption (unless specifically agreed upon in advance)'
  ];

  class BDDCAdoptionInfo extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
      this.render();
    }

    render() {
      const heroImage = this.getAttribute('data-hero-image') || DEFAULT_HERO_IMAGE;

      this.shadowRoot.innerHTML = `
        <style>${this.styles()}</style>

        <!-- HERO -->
        <section class="hero" style="--hero-bg: url('${heroImage}');">
          <div class="hero-inner">
            <h1 class="hero-title">🏠 What's Included with Your BDDC Adoption? 🐾</h1>
            <p class="hero-tagline">From Foster to Forever — We've Got You Covered!</p>
          </div>
        </section>

        <div class="page-body">

          <!-- INTRO -->
          <section class="intro-card">
            <h2 class="intro-title">
              <span class="heart-pulse" aria-hidden="true">❤️</span>
              Your New Best Friend Comes Ready to Love!
            </h2>
            <p class="intro-body">
              When you adopt from Big Dogs Don't Cry, you're not just getting a furry companion —
              you're getting peace of mind. Every adoption includes comprehensive medical care,
              preventive treatments, and ongoing support to help your new family member thrive.
              We believe every pet deserves the best start in their forever home, and we're here
              to make that happen.
            </p>
          </section>

          <!-- MEDICAL CARE -->
          <section class="section">
            <h2 class="section-title">
              <img class="section-paw" src="${PAW_ICON_URL}" alt="" aria-hidden="true">
              Medical Care Included with Every Adoption
            </h2>
            <div class="items-list">
              ${MEDICAL_ITEMS.map(item => this.renderItem(item)).join('')}
            </div>
          </section>

          <!-- DID YOU KNOW -->
          <aside class="callout callout-note">
            <h3>💡 Did You Know?</h3>
            <p>
              Your adoption fee helps offset a portion of the medical care and daily expenses for your pet,
              but it rarely covers the full cost of everything we've invested in their care.
              Every adoption helps us save another life.
            </p>
          </aside>

          <!-- NOT INCLUDED -->
          <section class="section">
            <h2 class="section-title">
              <img class="section-paw" src="${PAW_ICON_URL}" alt="" aria-hidden="true">
              What's Not Included After Adoption
            </h2>
            <div class="not-included">
              <h4>After you take your new friend home, you'll be responsible for:</h4>
              <ul>
                ${NOT_INCLUDED.map(t => `<li>${t}</li>`).join('')}
              </ul>
            </div>
          </section>

          <!-- ADOPTION PROCESS -->
          <section class="section">
            <h2 class="section-title">
              <img class="section-paw" src="${PAW_ICON_URL}" alt="" aria-hidden="true">
              The Adoption Process: Your Journey to Forever
            </h2>
            <p class="section-lead">
              We want to make sure every match is perfect. Here's how our adoption process works:
            </p>
            <div class="process-steps">
              ${PROCESS_STEPS.map((label, i) => `
                <div class="step">
                  <div class="step-number">${i + 1}</div>
                  <p>${label}</p>
                </div>
              `).join('')}
            </div>

            <aside class="callout callout-important">
              <h3>⏰ Important Timeline Information</h3>
              <p>
                <strong>Once approved, you have 48 hours to schedule a meet and greet and make your adoption decision.</strong>
                After 48 hours, we'll begin considering other applications. If your chosen pet is still available
                after this window, you can still adopt. Your approved application stays active, which means if
                another pet catches your eye later, the process will be much quicker.
              </p>
            </aside>

            <aside class="callout callout-note">
              <h3>🤔 Good to Know</h3>
              <p>
                <strong>Approval doesn't equal guarantee.</strong> Even with an approved application, the final
                decision considers many factors including the pet's temperament, your living situation, medical
                needs, and family dynamics. Our volunteers are dedicated to making the best match for both you
                and the animal. We conduct home visits (virtual or in-person) to ensure we're setting everyone
                up for success.
              </p>
            </aside>
          </section>

          <!-- RESPONSIBILITIES -->
          <section class="section">
            <h2 class="section-title">
              <img class="section-paw" src="${PAW_ICON_URL}" alt="" aria-hidden="true">
              Your Responsibilities as an Adopter
            </h2>
            <p class="section-lead">When you adopt from Big Dogs Don't Cry, you're making a commitment to:</p>
            <div class="items-list">
              <article class="item">
                <div class="item-body">
                  <p><strong>Provide love and care for life.</strong> This includes routine veterinary care,
                  proper nutrition, safe and comfortable housing, and humane treatment.</p>
                </div>
              </article>
              <article class="item">
                <div class="item-body">
                  <p><strong>Keep us in the loop.</strong> If circumstances change and you can't keep your pet,
                  please contact us immediately — we'll help facilitate a safe return. You may not rehome your
                  pet without rescue approval. We care about them forever.</p>
                </div>
              </article>
            </div>
          </section>

          <!-- CLOSING CTA -->
          <section class="closing-card">
            <h2 class="closing-title">
              <span class="heart-pulse" aria-hidden="true">💖</span>
              Ready to Change a Life?
            </h2>
            <p class="closing-body">
              Every adoption saves two lives — the one you adopt and the one that takes their place in our rescue.
              Thank you for choosing to adopt and for giving a deserving pet their second chance at love and happiness.
              We're here to support you every step of the way.
            </p>
            <div class="closing-actions">
              <a class="btn btn-primary" href="https://www.bigdogsdontcry.com/adoptable" target="_blank" rel="noopener">
                Meet Our Adoptables <span class="arrow">→</span>
              </a>
              <a class="btn btn-secondary" href="https://www.bigdogsdontcry.com/adoption-application" target="_blank" rel="noopener">
                Start an Application
              </a>
            </div>
          </section>

        </div>
      `;
    }

    renderItem(item) {
      const list = item.list
        ? `<ul class="item-list">${item.list.map(li => `<li>${li}</li>`).join('')}</ul>`
        : '';
      const footnote = item.footnote
        ? `<p class="item-footnote"><em>${item.footnote}</em></p>`
        : '';
      return `
        <article class="item">
          <div class="item-icon" aria-hidden="true">${item.icon}</div>
          <div class="item-body">
            <h3 class="item-title">${item.title}</h3>
            <p>${item.body}</p>
            ${list}
            ${footnote}
          </div>
        </article>
      `;
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
          --note-bg: #fff8e1;
          --note-border: #f5cf52;
          --note-ink: #8a6d1c;
          --important-bg: #ffebf0;
          --important-border: #ffa3bc;
          --important-ink: #b3134d;
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
        .hero-inner {
          text-align: center;
          max-width: 900px;
        }
        .hero-title {
          margin: 0 0 12px;
          font-size: clamp(28px, 5vw, 52px);
          font-weight: 700;
          color: var(--pink);
          text-shadow: 0 2px 14px rgba(255,255,255,0.7);
          line-height: 1.1;
        }
        .hero-tagline {
          margin: 0;
          font-size: clamp(16px, 2vw, 22px);
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

        /* ───── INTRO CARD ───── */
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
          color: var(--ink);
          font-weight: 500;
        }

        /* ───── SECTIONS ───── */
        .section {
          background: #fff;
          padding: clamp(24px, 3.5vw, 36px);
          border-radius: 14px;
          box-shadow: var(--shadow-sm);
          margin-bottom: 28px;
        }
        .section-title {
          margin: 0 0 22px;
          color: var(--pink-deep);
          font-size: clamp(22px, 2.8vw, 32px);
          font-weight: 700;
          line-height: 1.2;
          padding-bottom: 14px;
          border-bottom: 3px solid var(--pink-soft);
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .section-paw {
          width: 36px;
          height: 36px;
          object-fit: contain;
          flex-shrink: 0;
        }
        .section-lead {
          margin: 0 0 22px;
          font-size: clamp(15px, 1.3vw, 17px);
          color: var(--muted);
          line-height: 1.55;
        }

        /* ───── ITEMS ───── */
        .items-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .item {
          background: var(--pink-bg);
          border-left: 4px solid var(--pink);
          border-radius: 10px;
          padding: clamp(18px, 2.5vw, 24px);
          display: grid;
          grid-template-columns: 56px 1fr;
          gap: 18px;
          align-items: start;
          transition: transform .15s ease, box-shadow .2s ease;
        }
        .item:hover {
          transform: translateX(4px);
          box-shadow: 0 6px 16px rgba(245,54,124,0.15);
        }
        .item-icon {
          width: 48px;
          height: 48px;
          display: grid;
          place-items: center;
          font-size: 28px;
          background: #fff;
          border-radius: 50%;
          box-shadow: 0 2px 6px rgba(0,0,0,0.08);
          flex-shrink: 0;
        }
        .item-body {
          min-width: 0;
        }
        .item-body p {
          margin: 0 0 10px;
          font-size: clamp(15px, 1.25vw, 17px);
          line-height: 1.6;
          color: var(--ink);
        }
        .item-body p:last-child { margin-bottom: 0; }
        .item-title {
          margin: 0 0 10px;
          color: var(--pink-deep);
          font-size: clamp(18px, 1.7vw, 22px);
          font-weight: 700;
          line-height: 1.25;
        }
        .item-list {
          margin: 12px 0 0;
          padding-left: 24px;
          font-size: clamp(15px, 1.25vw, 17px);
          line-height: 1.7;
        }
        .item-list li { margin-bottom: 6px; }
        .item-footnote {
          margin-top: 12px !important;
          font-size: 0.92em;
          color: var(--muted);
        }

        /* ───── CALLOUTS ───── */
        .callout {
          border-radius: 12px;
          padding: clamp(18px, 2.5vw, 24px);
          margin: 24px 0;
          border: 2px solid;
        }
        .callout h3 {
          margin: 0 0 10px;
          font-size: clamp(17px, 1.6vw, 20px);
          font-weight: 700;
        }
        .callout p {
          margin: 0;
          font-size: clamp(15px, 1.25vw, 16px);
          line-height: 1.6;
          color: var(--ink);
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

        /* ───── NOT INCLUDED ───── */
        .not-included {
          background: #f5f5f7;
          padding: clamp(18px, 2.5vw, 24px);
          border-radius: 10px;
          border-left: 4px solid #999;
        }
        .not-included h4 {
          margin: 0 0 12px;
          color: #555;
          font-size: clamp(16px, 1.4vw, 18px);
          font-weight: 700;
        }
        .not-included ul {
          margin: 0;
          padding-left: 24px;
          color: var(--ink);
        }
        .not-included li {
          margin-bottom: 8px;
          font-size: clamp(15px, 1.25vw, 17px);
          line-height: 1.55;
        }
        .not-included li:last-child { margin-bottom: 0; }

        /* ───── PROCESS STEPS ───── */
        .process-steps {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 12px;
          margin: 24px 0 28px;
        }
        .step {
          background: linear-gradient(135deg, var(--pink-bg) 0%, #ffe9f1 100%);
          padding: 18px 10px;
          border-radius: 12px;
          text-align: center;
          border: 2px solid var(--pink);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          transition: transform .15s ease;
        }
        .step:hover { transform: translateY(-3px); }
        .step-number {
          background: var(--pink);
          color: #fff;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          font-weight: 700;
          font-size: 16px;
          box-shadow: 0 3px 8px rgba(245,54,124,0.3);
        }
        .step p {
          margin: 0;
          font-size: clamp(12px, 1.05vw, 14px);
          color: var(--ink);
          font-weight: 600;
          line-height: 1.25;
        }

        /* ───── CLOSING CARD ───── */
        .closing-card {
          background: linear-gradient(135deg, var(--pink-bg) 0%, #ffe9f1 100%);
          border-left: 6px solid var(--pink);
          border-radius: 14px;
          padding: clamp(28px, 4vw, 44px);
          box-shadow: var(--shadow-md);
          margin-top: 8px;
          text-align: center;
        }
        .closing-title {
          margin: 0 0 16px;
          color: var(--pink-deep);
          font-size: clamp(24px, 3vw, 36px);
          font-weight: 700;
          line-height: 1.2;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .closing-body {
          margin: 0 0 24px;
          font-size: clamp(16px, 1.4vw, 18px);
          line-height: 1.65;
          color: var(--ink);
          font-weight: 500;
          max-width: 760px;
          margin-left: auto;
          margin-right: auto;
        }
        .closing-actions {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 14px;
        }
        .btn {
          display: inline-block;
          padding: 14px 28px;
          border-radius: 999px;
          text-decoration: none;
          font-weight: 700;
          font-size: clamp(15px, 1.3vw, 17px);
          transition: transform .12s ease, box-shadow .2s ease, background .2s ease;
        }
        .btn-primary {
          background: var(--pink);
          color: #fff;
          box-shadow: 0 6px 18px rgba(245,54,124,0.35);
        }
        .btn-primary:hover {
          background: var(--pink-deep);
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(245,54,124,0.45);
        }
        .btn-secondary {
          background: #fff;
          color: var(--pink-deep);
          border: 2px solid var(--pink-soft);
        }
        .btn-secondary:hover {
          background: var(--pink-soft);
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
          25% { transform: scale(1.15); }
          50% { transform: scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .heart-pulse { animation: none; }
        }

        /* ───── RESPONSIVE ───── */
        @media (max-width: 900px) {
          .process-steps {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        @media (max-width: 640px) {
          .process-steps {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
          .item {
            grid-template-columns: 1fr;
            gap: 12px;
            text-align: center;
          }
          .item-icon { margin: 0 auto; }
          .item-body { text-align: left; }
          .item:hover { transform: none; }
          .closing-actions { flex-direction: column; align-items: stretch; }
          .btn { text-align: center; }
        }

        @media (max-width: 480px) {
          .hero { min-height: 240px; padding: 32px 18px; }
          .page-body { padding: 24px 14px 40px; }
          .section { padding: 22px 18px; }
          .intro-card { padding: 22px 18px; }
        }
      `;
    }
  }

  if (!customElements.get('bddc-adoption-info')) {
    customElements.define('bddc-adoption-info', BDDCAdoptionInfo);
  }
})();
