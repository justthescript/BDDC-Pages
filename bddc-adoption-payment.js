/**
 * <bddc-adoption-payment> — Wix Studio Custom Element
 * Big Dogs Don't Cry Animal Rescue — Adoption Fee Payment Page
 *
 * Embeds the Zeffy donation form for adoption fees. The most important UX
 * element on this page is the prominent callout telling adopters to set
 * Zeffy's optional contribution to 0% — Zeffy defaults to ~11% (~$54.95 on
 * a $500 fee), which is real money out of an adopter's pocket if they don't
 * spot the dropdown.
 *
 * Usage in Wix Studio:
 *   1. Add a Custom Element to /adoption-payment (or wherever appropriate)
 *   2. Server URL: https://cdn.jsdelivr.net/gh/justthescript/BDDC-Pages@main/bddc-adoption-payment.js
 *   3. Tag Name:   bddc-adoption-payment
 *   4. Optional:   data-form-height="1600"   (override iframe height in px)
 *   5. Optional:   data-hero-image
 */

(function () {
  const DEFAULT_HERO_IMAGE =
    'https://static.wixstatic.com/media/bc59b6_604fb6f09a314f219daf30e354c81e5a~mv2.webp';

  const PAW_ICON_URL =
    'https://static.wixstatic.com/media/bc59b6_45db072b49a5427f930919d18683e36d~mv2.png';

  const ZEFFY_URL = 'https://www.zeffy.com/en-US/donation-form/adoptions-5';

  class BDDCAdoptionPayment extends HTMLElement {
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
      const formHeight = parseInt(this.getAttribute('data-form-height'), 10) || 1600;

      this.shadowRoot.innerHTML = `
        <style>${this.styles(formHeight)}</style>

        <!-- HERO -->
        <section class="hero" style="--hero-bg: url('${heroImage}');">
          <div class="hero-inner">
            <div class="hero-badge">💖 Welcome Home</div>
            <h1 class="hero-title">Adoption Payment</h1>
            <p class="hero-tagline">
              The last step before your new family member comes home.
            </p>
          </div>
        </section>

        <div class="page-body">

          <!-- INTRO -->
          <section class="intro reveal">
            <p class="intro-body">
              Thank you for choosing to rescue! Your adoption fee covers the medical care, vaccinations,
              spay/neuter surgery, and everything else we put into preparing your dog for their new
              home. Every dollar goes right back into helping the next pup.
            </p>
          </section>

          <!-- ⚠️ CONTRIBUTION CALLOUT -->
          <section class="callout reveal" role="note" aria-label="Important note about Zeffy contribution">
            <div class="callout-icon" aria-hidden="true">⚠️</div>
            <div class="callout-content">
              <h2 class="callout-title">Important: Set Contribution to 0%</h2>
              <p class="callout-body">
                Zeffy is a free fundraising platform — they don't charge BDDC any fees. Instead, they
                ask adopters and donors for an <strong>optional contribution</strong> that helps keep
                Zeffy free for nonprofits.
              </p>
              <p class="callout-body">
                The contribution dropdown <strong>defaults to around 11%</strong> (about $55 on a $500
                adoption fee). If you'd rather not pay extra, look for the
                <span class="callout-highlight">"Help keep Zeffy free…"</span> dropdown right above the
                Total. <strong>Click it and select <span class="callout-highlight">"Other → 0%"</span></strong>
                before you submit.
              </p>
              <div class="callout-steps">
                <div class="callout-step">
                  <span class="callout-step-num">1</span>
                  <span class="callout-step-text">Fill out the adoption fee amount and your info</span>
                </div>
                <div class="callout-step">
                  <span class="callout-step-num">2</span>
                  <span class="callout-step-text">Find the <em>"Help keep Zeffy free…"</em> dropdown</span>
                </div>
                <div class="callout-step">
                  <span class="callout-step-num">3</span>
                  <span class="callout-step-text">Set it to <strong>0%</strong> (or another amount, if you choose)</span>
                </div>
                <div class="callout-step">
                  <span class="callout-step-num">4</span>
                  <span class="callout-step-text">Submit your payment</span>
                </div>
              </div>
              <p class="callout-note">
                💛 Of course, if you'd like to leave Zeffy a tip — they really are free for us, and the
                tips help keep their platform running. Either choice is fine; we just want you to know
                you have the option.
              </p>
            </div>
          </section>

          <!-- FORM EMBED -->
          <section class="form-section reveal">
            <div class="form-header">
              <img class="form-paw" src="${PAW_ICON_URL}" alt="" aria-hidden="true">
              <h2 class="form-title">Adoption Fee Payment</h2>
            </div>
            <div class="form-wrap">
              <iframe
                class="zeffy-embed"
                src="${ZEFFY_URL}"
                title="BDDC Adoption Fee Payment"
                allow="payment *"
                allowpaymentrequest
                loading="lazy"
              ></iframe>
            </div>
            <p class="form-fallback">
              Form not loading?
              <a href="${ZEFFY_URL}" target="_blank" rel="noopener noreferrer">
                Open the payment page in a new tab →
              </a>
            </p>
          </section>

          <!-- QUESTIONS FOOTER -->
          <section class="questions reveal">
            <p>
              <strong>Questions about your payment?</strong>
              Reach out at
              <a href="mailto:bigdogsdontcryrescue@gmail.com">bigdogsdontcryrescue@gmail.com</a>
              or call <a href="tel:+12198411142">219-841-1142</a>.
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

    styles(formHeight) {
      return `
        :host {
          --pink: #F5367C;
          --pink-deep: #c2255c;
          --pink-soft: #ffd9ec;
          --pink-bg: #fff7fa;
          --pink-light: #ffe9f1;
          --warning: #ffa726;
          --warning-deep: #e68a00;
          --warning-bg: #fff4e0;
          --ink: #2a2a2a;
          --muted: #555;
          --shadow-sm: 0 4px 12px rgba(0,0,0,0.08);
          --shadow-md: 0 8px 22px rgba(245,54,124,0.20);
          --shadow-warning: 0 8px 24px rgba(255,167,38,0.25);
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
          min-height: 280px;
          background-image:
            linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.25) 100%),
            var(--hero-bg);
          background-size: cover;
          background-position: center;
          background-color: #fdf8ec;
          display: grid;
          place-items: center;
          padding: 44px 24px;
        }
        .hero-inner { text-align: center; max-width: 800px; }
        .hero-badge {
          display: inline-block;
          padding: 8px 18px;
          background: rgba(255,255,255,0.92);
          border: 1px solid var(--pink-soft);
          border-radius: 999px;
          font-weight: 700;
          font-size: clamp(13px, 1.2vw, 15px);
          letter-spacing: .5px;
          margin-bottom: 18px;
          color: var(--pink-deep);
          box-shadow: 0 4px 14px rgba(245,54,124,0.20);
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
          max-width: 1080px;
          margin: 0 auto;
          padding: 32px 20px 56px;
        }

        /* ───── INTRO ───── */
        .intro {
          max-width: 820px;
          margin: 0 auto 28px;
          text-align: center;
        }
        .intro-body {
          margin: 0;
          font-size: clamp(16px, 1.4vw, 18px);
          line-height: 1.65;
          color: var(--ink);
          font-weight: 500;
        }

        /* ───── CALLOUT (the most important part of this page) ───── */
        .callout {
          background: linear-gradient(135deg, #fff8eb 0%, var(--warning-bg) 100%);
          border: 3px solid var(--warning);
          border-radius: 18px;
          padding: clamp(24px, 3vw, 36px);
          margin-bottom: 36px;
          box-shadow: var(--shadow-warning);
          display: grid;
          grid-template-columns: 64px 1fr;
          gap: 22px;
          position: relative;
          overflow: hidden;
        }
        .callout::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          background: linear-gradient(90deg,
            var(--warning) 0%,
            #ffcc66 30%,
            var(--warning) 60%,
            #ffcc66 100%);
          background-size: 40px 100%;
          animation: stripe-shift 3s linear infinite;
        }
        @keyframes stripe-shift {
          to { background-position: 40px 0; }
        }
        .callout-icon {
          font-size: 56px;
          line-height: 1;
          padding-top: 4px;
          filter: drop-shadow(0 4px 10px rgba(255,167,38,0.35));
          animation: gentle-pulse 2.5s ease-in-out infinite;
        }
        @keyframes gentle-pulse {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.08); }
        }
        .callout-content { min-width: 0; }
        .callout-title {
          margin: 0 0 12px;
          color: var(--warning-deep);
          font-size: clamp(22px, 2.6vw, 28px);
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -0.3px;
        }
        .callout-body {
          margin: 0 0 14px;
          font-size: clamp(15px, 1.3vw, 17px);
          line-height: 1.65;
          color: var(--ink);
        }
        .callout-body strong { color: var(--warning-deep); }
        .callout-highlight {
          background: var(--warning);
          color: #fff;
          padding: 2px 8px;
          border-radius: 4px;
          font-weight: 700;
          font-size: 0.95em;
          white-space: nowrap;
        }
        .callout-steps {
          margin: 18px 0 14px;
          padding: 18px 22px;
          background: rgba(255,255,255,0.7);
          border-radius: 12px;
          border-left: 4px solid var(--warning);
          display: grid;
          gap: 10px;
        }
        .callout-step {
          display: grid;
          grid-template-columns: 32px 1fr;
          gap: 12px;
          align-items: center;
        }
        .callout-step-num {
          width: 28px;
          height: 28px;
          display: grid;
          place-items: center;
          background: var(--warning-deep);
          color: #fff;
          font-weight: 700;
          font-size: 14px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .callout-step-text {
          font-size: clamp(14px, 1.2vw, 16px);
          line-height: 1.45;
          color: var(--ink);
        }
        .callout-step-text em {
          font-style: italic;
          color: var(--warning-deep);
        }
        .callout-note {
          margin: 14px 0 0;
          padding: 12px 16px;
          background: rgba(245,54,124,0.06);
          border-radius: 8px;
          font-size: clamp(13px, 1.1vw, 15px);
          line-height: 1.55;
          color: var(--muted);
          font-style: italic;
        }

        /* ───── FORM ───── */
        .form-section { margin-bottom: 32px; }
        .form-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        .form-paw {
          width: 32px;
          height: 32px;
          object-fit: contain;
        }
        .form-title {
          margin: 0;
          color: var(--pink-deep);
          font-size: clamp(22px, 2.4vw, 28px);
          font-weight: 700;
        }
        .form-wrap {
          background: #fff;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: var(--shadow-md);
          border: 2px solid var(--pink-soft);
        }
        .zeffy-embed {
          background: transparent;
          border: 0;
          width: 100%;
          height: ${formHeight}px;
          display: block;
        }
        .form-fallback {
          margin: 12px 0 0;
          text-align: center;
          font-size: 0.92em;
          color: var(--muted);
        }
        .form-fallback a {
          font-weight: 700;
          text-decoration: none;
        }
        .form-fallback a:hover { text-decoration: underline; }

        /* ───── QUESTIONS FOOTER ───── */
        .questions {
          text-align: center;
          padding: 24px 20px 8px;
        }
        .questions p {
          margin: 0;
          font-size: clamp(15px, 1.3vw, 17px);
          color: var(--muted);
          line-height: 1.55;
        }
        .questions strong { color: var(--ink); }
        .questions a {
          font-weight: 700;
          text-decoration: none;
        }
        .questions a:hover { text-decoration: underline; }

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
          .callout-icon { animation: none; }
          .callout::before { animation: none; }
        }

        /* ───── RESPONSIVE ───── */
        @media (max-width: 720px) {
          .callout {
            grid-template-columns: 1fr;
            gap: 14px;
            text-align: center;
          }
          .callout-icon {
            font-size: 48px;
            margin: 0 auto;
          }
          .callout-steps {
            text-align: left;
          }
          .zeffy-embed { height: ${Math.round(formHeight * 0.95)}px; }
        }

        @media (max-width: 480px) {
          .hero { min-height: 220px; padding: 32px 18px; }
          .page-body { padding: 24px 14px 36px; }
          .callout { padding: 20px 18px; }
          .callout-steps { padding: 14px 16px; }
        }
      `;
    }
  }

  if (!customElements.get('bddc-adoption-payment')) {
    customElements.define('bddc-adoption-payment', BDDCAdoptionPayment);
  }
})();
