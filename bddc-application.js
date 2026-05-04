/**
 * <bddc-application> — Wix Studio Custom Element
 * Big Dogs Don't Cry Animal Rescue — Application Pages
 *
 * One element, three application types. Choose which by setting data-type.
 *
 * Usage in Wix Studio:
 *   1. Add a Custom Element to the page
 *   2. Server URL: https://cdn.jsdelivr.net/gh/justthescript/BDDC-Pages@main/bddc-application.js
 *   3. Tag Name:   bddc-application
 *   4. Set attribute  data-type="adoption"   (or "foster" or "volunteer")
 *   5. Optional       data-form-height="2400"   (override iframe height in px)
 *   6. Optional       data-hero-image
 *
 * Layout:
 *   - Hero
 *   - "Before You Begin" prep checklist
 *   - Form + sticky tips sidebar (stacks to accordion on mobile)
 *   - "What Happens Next" timeline
 *   - Contact footer
 *
 * EDITING TIPS / CHECKLIST / TIMELINE:
 *   The APPLICATIONS object below is the source of truth for every page.
 *   Edit titles, taglines, tip sections, and steps in one place.
 */

(function () {
  const DEFAULT_HERO_IMAGE =
    'https://static.wixstatic.com/media/bc59b6_604fb6f09a314f219daf30e354c81e5a~mv2.webp';

  const PAW_ICON_URL =
    'https://static.wixstatic.com/media/bc59b6_45db072b49a5427f930919d18683e36d~mv2.png';

  // ────────────────────────────────────────────────────────────────────────
  // Per-application config
  // ────────────────────────────────────────────────────────────────────────
  const APPLICATIONS = {

    // ════════════════════════════════════════════════════════════════════
    // ADOPTION
    // ════════════════════════════════════════════════════════════════════
    adoption: {
      badge: '🐾 Adoption Program',
      title: 'Adoption Application',
      tagline: "Let's find your perfect match.",
      intro: `This application helps us learn about you, your home, and what you're looking for in a dog. Take your time — honesty matters more than speed, and there are no wrong answers. Most people finish in 15–20 minutes.`,
      embedUrl: 'https://airtable.com/embed/appWyR26n0mjaXNwu/shrodhuFKkzL5mCjX?backgroundColor=gray',
      formHeight: 2400,
      prepChecklist: [
        { icon: '🪪', text: 'Government-issued photo ID (driver\'s license or state ID)' },
        { icon: '🏠', text: 'Landlord written approval (if renting) or homeowner insurance info' },
        { icon: '🏥', text: "Current vet contact info (name, clinic, phone)" },
        { icon: '🤝', text: '2–3 personal references — not family or BDDC board members' },
        { icon: '🐾', text: 'Vaccination records for any current pets' },
        { icon: '📅', text: 'About 15–20 minutes of uninterrupted time' }
      ],
      tipSections: [
        {
          heading: 'Personal Information',
          tips: [
            'Use the email address you check most — that\'s how we\'ll reach you about next steps.',
            'Both decision-makers in the household should know this application is being submitted.',
            'A daytime phone number is helpful for quick reference calls.'
          ]
        },
        {
          heading: 'Housing',
          tips: [
            'If you rent, we\'ll need written landlord approval before adoption — get that started early so it doesn\'t hold things up.',
            'Be honest about your living situation. We\'re here to match, not judge — a small apartment is perfect for the right dog.',
            'Mention any HOA, breed, or weight restrictions in your community so we can match accordingly.'
          ]
        },
        {
          heading: 'Current Pets',
          tips: [
            'We\'ll call your vet to verify vaccinations and care, so have their contact info ready.',
            'All current pets need to be current on Rabies and spayed/neutered.',
            'If you\'ve had pets in the past but don\'t currently, mention them — it\'s helpful context.'
          ]
        },
        {
          heading: 'References',
          tips: [
            'Pick people who genuinely know you well, not just acquaintances.',
            'Give your references a heads-up that we may call so they\'re not caught off guard.',
            'Family members, your vet, and BDDC board members can\'t be references.'
          ]
        },
        {
          heading: 'About Your Match',
          tips: [
            'It\'s okay to apply for multiple dogs — note your top choice and any flexibility.',
            'List the qualities that matter most (energy level, size, age, kids/cats compatibility) so we can suggest alternatives if needed.',
            'Be realistic about your lifestyle — a couch potato dog isn\'t a fit for an ultramarathoner, and vice versa.'
          ]
        },
        {
          heading: 'Final Tips',
          tips: [
            'Honesty is always the right answer. We want to set you and your dog up for success.',
            'If you\'re unsure about anything, say so in the comments — we\'d rather discuss than guess.',
            'Approval doesn\'t equal guarantee. The final match still considers temperament and family fit.'
          ]
        }
      ],
      timeline: [
        { num: 1, title: 'You submit', body: 'Your application lands in our queue.' },
        { num: 2, title: 'We review', body: 'Usually within 48 hours.' },
        { num: 3, title: 'References', body: 'We call your references and your vet.' },
        { num: 4, title: 'Approval', body: 'You get an email with next steps.' },
        { num: 5, title: 'Meet & greet', body: 'Schedule a meeting with your potential match.' },
        { num: 6, title: 'Adoption day! 🎉', body: 'Bring your new family member home.' }
      ]
    },

    // ════════════════════════════════════════════════════════════════════
    // FOSTER
    // ════════════════════════════════════════════════════════════════════
    foster: {
      badge: '🐾 Foster Program',
      title: 'Foster Application',
      tagline: 'Open your home, save a life.',
      intro: `Fostering saves lives. By opening your home temporarily, you give a dog a soft place to land while we find them their forever family. This application takes about 10–15 minutes — we want to get to know you and your home so we can match you with the right pup.`,
      embedUrl: 'https://airtable.com/embed/apprlVtBQNP5OwGsI/shrVmvAUUQ6xCKMrf?backgroundColor=gray',
      formHeight: 2200,
      prepChecklist: [
        { icon: '🏠', text: 'Landlord written permission (if renting)' },
        { icon: '🐾', text: 'Vet records for any current pets' },
        { icon: '👨‍👩‍👧', text: 'All household members on board with fostering' },
        { icon: '📸', text: 'Optional: photos of your home and yard' },
        { icon: '📍', text: 'You live within 2 hours of Merrillville, IN' },
        { icon: '📅', text: 'About 10–15 minutes' }
      ],
      tipSections: [
        {
          heading: 'About You',
          tips: [
            'Use the email you check daily — fostering communication moves fast.',
            'A reliable phone number helps with transport and intake coordination.',
            'Tell us a bit about why you want to foster — we love hearing your story.'
          ]
        },
        {
          heading: 'Your Home',
          tips: [
            'All housing types welcome — apartments, houses, families, singles, retired folks.',
            'If renting: written landlord approval is required, no exceptions.',
            'A yard is helpful but not required for every dog. We match by needs.',
            'Children in the household must be at least 7 years old for safety.'
          ]
        },
        {
          heading: 'Current Pets',
          tips: [
            'Dogs need: current Rabies and DA2PP, recent heartworm test, spayed/neutered.',
            'Cats need: current Rabies, spayed/neutered, recent wellness visit.',
            'We\'ll verify with your vet before approval — have their contact ready.',
            'Be upfront about any pet that\'s reactive or has special needs.'
          ]
        },
        {
          heading: 'What You Can Offer',
          tips: [
            'Be realistic about time available — even short fosters help.',
            'Note if you can foster medical cases, puppies, seniors, or specific sizes.',
            'Two-week minimum commitment, but most fosters last 4–8 weeks until adoption.',
            'Approximately 2 hours/day for exercise, play, and care.'
          ]
        },
        {
          heading: 'Logistics',
          tips: [
            'We provide all approved medical care. Food, crate, leash, bed available on request.',
            'You\'ll bring fosters to vet appointments and adoption events (typically weekends).',
            'Foster coordinators check in regularly — you\'re never alone in this.',
            'You\'re welcome to apply to adopt your foster, but you\'ll go through the standard process.'
          ]
        }
      ],
      timeline: [
        { num: 1, title: 'You submit', body: 'Application arrives in our queue.' },
        { num: 2, title: 'We review', body: 'Usually within 48 hours.' },
        { num: 3, title: 'Home check', body: 'Quick virtual or in-person walk-through.' },
        { num: 4, title: 'Match', body: 'We pair you with a dog who fits your situation.' },
        { num: 5, title: 'Pickup day! 🐾', body: 'Welcome home, foster.' }
      ]
    },

    // ════════════════════════════════════════════════════════════════════
    // VOLUNTEER
    // ════════════════════════════════════════════════════════════════════
    volunteer: {
      badge: '🐾 Volunteer Program',
      title: 'Volunteer Application',
      tagline: 'Every hour, every paw matters.',
      intro: `Volunteers are the rescue. Whether you have an hour a week or a few days a month, there's a way to plug in. This application takes about 5 minutes — tell us what you're interested in and how much time you can give.`,
      embedUrl: 'https://airtable.com/embed/appqKxAMX4xyWWB4j/shrklnKjkfaVYmbV0?backgroundColor=gray',
      formHeight: 1500,
      prepChecklist: [
        { icon: '💭', text: 'Some idea of what roles interest you' },
        { icon: '📅', text: 'A rough sense of your availability' },
        { icon: '🚗', text: 'If transport interests you: vehicle details' },
        { icon: '📱', text: 'Email and phone you check regularly' },
        { icon: '⏱️', text: 'About 5 minutes — this is the easy one!' }
      ],
      tipSections: [
        {
          heading: 'About You',
          tips: [
            'Use the email you check most — opportunities can come up quickly.',
            'A phone number for last-minute coordination (transports, event help, etc.).',
            'Tell us a bit about what brought you to volunteering with rescue.'
          ]
        },
        {
          heading: 'What Interests You',
          tips: [
            'List multiple roles — variety helps us schedule you in.',
            '"I\'ll try anything" is a totally valid answer.',
            'Skills are bonuses: photography, social media, dog training, vet experience, design — all welcome.',
            'Not sure what fits? Read our Ways to Volunteer page for ideas.'
          ]
        },
        {
          heading: 'Your Availability',
          tips: [
            'Be honest about how much time you actually have. Even 1 hour/month helps.',
            'Note recurring conflicts (work schedule, school, parenting).',
            'Weekend availability is especially valuable for adoption events.'
          ]
        },
        {
          heading: 'Experience',
          tips: [
            'No experience needed — we train as we go.',
            'Mention pets you\'ve had or any related experience you bring.',
            'If you\'re nervous around big dogs, that\'s fine — we have plenty of non-dog roles too.'
          ]
        },
        {
          heading: 'Logistics',
          tips: [
            'Most roles are flexible — we work around your life, not the other way around.',
            'You\'ll be added to volunteer comms (email + text) for opportunities.',
            'Some events may require a quick background check; we\'ll let you know if applicable.'
          ]
        }
      ],
      timeline: [
        { num: 1, title: 'You submit', body: 'We\'re excited!' },
        { num: 2, title: 'Welcome email', body: 'Within a few days.' },
        { num: 3, title: 'Onboarding', body: 'Quick chat to learn about you and your interests.' },
        { num: 4, title: 'First opportunity', body: 'We match your interests with what\'s needed.' },
        { num: 5, title: 'Welcome to the pack! 🐾', body: 'You\'re officially part of BDDC.' }
      ]
    }
  };

  // ────────────────────────────────────────────────────────────────────────
  class BDDCApplication extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
      this.render();
      this.observeReveal();
    }

    render() {
      const type = (this.getAttribute('data-type') || 'adoption').toLowerCase();
      const config = APPLICATIONS[type];
      const heroImage = this.getAttribute('data-hero-image') || DEFAULT_HERO_IMAGE;

      if (!config) {
        this.shadowRoot.innerHTML = `
          <div style="padding: 40px; text-align: center; font-family: system-ui;">
            <h2>Configuration error</h2>
            <p>Unknown application type: <code>${type}</code></p>
            <p>Set <code>data-type</code> to one of: ${Object.keys(APPLICATIONS).join(', ')}</p>
          </div>
        `;
        return;
      }

      const formHeight = parseInt(this.getAttribute('data-form-height'), 10) || config.formHeight;

      this.shadowRoot.innerHTML = `
        <style>${this.styles(formHeight)}</style>

        <!-- HERO -->
        <section class="hero" style="--hero-bg: url('${heroImage}');">
          <div class="hero-inner">
            <div class="hero-badge">${config.badge}</div>
            <h1 class="hero-title">${config.title}</h1>
            <p class="hero-tagline">${config.tagline}</p>
          </div>
        </section>

        <div class="page-body">

          <!-- INTRO -->
          <section class="intro reveal">
            <p>${config.intro}</p>
          </section>

          <!-- BEFORE YOU BEGIN -->
          <section class="prep-card reveal">
            <div class="prep-header">
              <div class="prep-icon" aria-hidden="true">📋</div>
              <h2 class="prep-title">Before You Begin</h2>
              <p class="prep-sub">Have these handy before you start so you don't have to leave the form mid-fill.</p>
            </div>
            <ul class="prep-list">
              ${config.prepChecklist.map(item => `
                <li class="prep-item">
                  <span class="prep-item-icon" aria-hidden="true">${item.icon}</span>
                  <span class="prep-item-text">${item.text}</span>
                </li>
              `).join('')}
            </ul>
          </section>

          <!-- FORM + TIPS -->
          <section class="form-section reveal">
            <div class="form-tips-grid">
              <div class="form-column">
                <div class="form-header">
                  <img class="form-paw" src="${PAW_ICON_URL}" alt="" aria-hidden="true">
                  <h2 class="form-title">Application</h2>
                </div>
                <div class="form-wrap">
                  <iframe
                    class="application-embed"
                    src="${config.embedUrl}"
                    frameborder="0"
                    onmousewheel=""
                    loading="lazy"
                    title="${config.title}"
                  ></iframe>
                </div>
                <p class="form-fallback">
                  Form not loading?
                  <a href="${config.embedUrl.replace('/embed/', '/')}" target="_blank" rel="noopener">
                    Open the application in a new tab →
                  </a>
                </p>
              </div>

              <aside class="tips-column">
                <div class="tips-card">
                  <div class="tips-header">
                    <span class="tips-icon" aria-hidden="true">💡</span>
                    <h3 class="tips-title">Tips for Filling This Out</h3>
                  </div>
                  ${config.tipSections.map(section => `
                    <details class="tip-section" open>
                      <summary class="tip-section-heading">${section.heading}</summary>
                      <ul class="tip-list">
                        ${section.tips.map(tip => `<li>${tip}</li>`).join('')}
                      </ul>
                    </details>
                  `).join('')}
                </div>
              </aside>
            </div>
          </section>

          <!-- WHAT HAPPENS NEXT -->
          <section class="timeline-section reveal">
            <div class="paw-watermark" aria-hidden="true"></div>
            <div class="section-head">
              <div class="section-overline">After You Submit</div>
              <h2 class="section-title">What Happens Next</h2>
            </div>
            <ol class="timeline">
              ${config.timeline.map(step => `
                <li class="timeline-step">
                  <div class="timeline-num">${step.num}</div>
                  <div class="timeline-content">
                    <h4 class="timeline-title">${step.title}</h4>
                    <p class="timeline-body">${step.body}</p>
                  </div>
                </li>
              `).join('')}
            </ol>
          </section>

          <!-- QUESTIONS FOOTER -->
          <section class="questions reveal">
            <p>
              <strong>Questions about the application?</strong>
              We're happy to help — reach out at
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
          max-width: 1280px;
          margin: 0 auto;
          padding: 36px 20px 56px;
        }

        /* ───── INTRO ───── */
        .intro {
          max-width: 880px;
          margin: 0 auto 28px;
          text-align: center;
        }
        .intro p {
          margin: 0;
          font-size: clamp(16px, 1.4vw, 18px);
          line-height: 1.65;
          color: var(--ink);
          font-weight: 500;
        }

        /* ───── PREP CHECKLIST ───── */
        .prep-card {
          background:
            radial-gradient(circle at top right, rgba(255,215,0,0.10) 0%, transparent 60%),
            linear-gradient(135deg, var(--pink-bg) 0%, var(--pink-light) 100%);
          border: 2px solid var(--pink-soft);
          border-radius: 18px;
          padding: clamp(28px, 3.5vw, 40px);
          margin-bottom: 36px;
          position: relative;
          overflow: hidden;
        }
        .prep-card::before {
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
        .prep-header {
          text-align: center;
          margin-bottom: 22px;
          position: relative;
          z-index: 1;
        }
        .prep-icon {
          font-size: 48px;
          margin-bottom: 6px;
          filter: drop-shadow(0 4px 10px rgba(245,54,124,0.18));
        }
        .prep-title {
          margin: 0 0 8px;
          color: var(--pink-deep);
          font-size: clamp(24px, 3vw, 32px);
          font-weight: 700;
          line-height: 1.2;
        }
        .prep-sub {
          margin: 0 auto;
          max-width: 720px;
          font-size: clamp(15px, 1.3vw, 17px);
          line-height: 1.55;
          color: var(--ink);
        }
        .prep-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          position: relative;
          z-index: 1;
        }
        .prep-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 18px;
          background: rgba(255,255,255,0.85);
          border-radius: 10px;
          border: 1px solid var(--pink-soft);
        }
        .prep-item-icon {
          font-size: 24px;
          flex-shrink: 0;
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          background: #fff;
          border-radius: 50%;
          box-shadow: 0 2px 6px rgba(0,0,0,0.06);
        }
        .prep-item-text {
          font-size: clamp(14px, 1.2vw, 16px);
          font-weight: 500;
          line-height: 1.4;
        }

        /* ───── FORM + TIPS GRID ───── */
        .form-section { margin-bottom: 36px; }
        .form-tips-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.55fr) minmax(280px, 1fr);
          gap: 28px;
          align-items: start;
        }

        /* Form column */
        .form-column { min-width: 0; }
        .form-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 14px;
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
        .application-embed {
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

        /* Tips sidebar */
        .tips-column {
          position: sticky;
          top: 20px;
          align-self: start;
          max-height: calc(100vh - 40px);
          overflow-y: auto;
        }
        .tips-card {
          background: #fff;
          border-radius: 14px;
          padding: 22px 22px 12px;
          box-shadow: var(--shadow-sm);
          border: 2px solid var(--pink-soft);
        }
        .tips-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
          padding-bottom: 12px;
          border-bottom: 2px solid var(--pink-soft);
        }
        .tips-icon {
          font-size: 24px;
          line-height: 1;
        }
        .tips-title {
          margin: 0;
          color: var(--pink-deep);
          font-size: clamp(17px, 1.6vw, 20px);
          font-weight: 700;
        }
        .tip-section {
          margin-bottom: 16px;
          border: 0;
        }
        .tip-section[open] { padding-bottom: 4px; }
        .tip-section-heading {
          color: var(--pink);
          font-size: clamp(14px, 1.2vw, 16px);
          font-weight: 700;
          letter-spacing: .3px;
          margin: 0 0 10px;
          cursor: pointer;
          list-style: none;
          padding: 4px 0;
          position: relative;
        }
        .tip-section-heading::-webkit-details-marker { display: none; }
        .tip-section-heading::before {
          content: "🐾 ";
          font-size: 0.85em;
          margin-right: 4px;
        }
        .tip-list {
          list-style: none;
          padding: 0;
          margin: 0 0 4px;
        }
        .tip-list li {
          position: relative;
          padding: 7px 0 7px 22px;
          font-size: clamp(13.5px, 1.05vw, 14.5px);
          line-height: 1.55;
          color: var(--ink);
          border-bottom: 1px solid #fdebf2;
        }
        .tip-list li:last-child { border-bottom: 0; }
        .tip-list li::before {
          content: "•";
          position: absolute;
          left: 8px;
          top: 6px;
          color: var(--pink);
          font-weight: 700;
          font-size: 1.2em;
        }

        /* ───── TIMELINE ───── */
        .timeline-section {
          position: relative;
          background: #fff;
          padding: clamp(32px, 4vw, 48px);
          border-radius: 18px;
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
        .section-head {
          text-align: center;
          margin-bottom: 32px;
          position: relative;
          z-index: 1;
        }
        .section-overline {
          color: var(--pink);
          font-size: clamp(13px, 1.1vw, 15px);
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .section-title {
          margin: 0;
          color: var(--pink-deep);
          font-size: clamp(26px, 3.2vw, 36px);
          font-weight: 700;
          line-height: 1.15;
        }
        .timeline {
          list-style: none;
          padding: 0;
          margin: 0 auto;
          max-width: 720px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          position: relative;
          z-index: 1;
        }
        .timeline-step {
          display: grid;
          grid-template-columns: 56px 1fr;
          gap: 18px;
          align-items: start;
          padding: 16px 18px;
          background: var(--pink-bg);
          border-radius: 12px;
          border-left: 4px solid var(--pink);
          transition: transform .15s ease, box-shadow .25s ease;
        }
        .timeline-step:hover {
          transform: translateX(4px);
          box-shadow: 0 6px 16px rgba(245,54,124,0.12);
        }
        .timeline-num {
          width: 44px;
          height: 44px;
          display: grid;
          place-items: center;
          background: linear-gradient(135deg, var(--pink) 0%, var(--pink-deep) 100%);
          color: #fff;
          font-size: 18px;
          font-weight: 700;
          border-radius: 50%;
          box-shadow: 0 3px 10px rgba(245,54,124,0.30);
        }
        .timeline-title {
          margin: 0 0 4px;
          color: var(--pink-deep);
          font-size: clamp(16px, 1.4vw, 18px);
          font-weight: 700;
          line-height: 1.25;
        }
        .timeline-body {
          margin: 0;
          font-size: clamp(14px, 1.15vw, 15px);
          line-height: 1.5;
          color: var(--muted);
        }

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
        }

        /* ───── RESPONSIVE ───── */

        /* Below ~1080px the sticky sidebar gets too cramped — stack tips above form */
        @media (max-width: 1080px) {
          .form-tips-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .tips-column {
            position: static;
            max-height: none;
            order: -1; /* tips above form on mobile */
          }
          .tip-section {
            border-bottom: 1px solid var(--pink-soft);
            padding-bottom: 10px;
          }
          .tip-section:last-of-type { border-bottom: 0; }
          /* On smaller screens, collapse all tip sections by default */
          .tip-section[open] .tip-section-heading::after { content: " ▾"; }
          .tip-section:not([open]) .tip-section-heading::after { content: " ▸"; }
          .tip-section:not([open]) { padding-bottom: 0; }
        }

        @media (max-width: 720px) {
          .prep-list { grid-template-columns: 1fr; }
          .timeline-step { grid-template-columns: 1fr; gap: 8px; text-align: center; }
          .timeline-num { margin: 0 auto; }
          .timeline-step:hover { transform: none; }
          .application-embed { height: ${Math.round(formHeight * 0.92)}px; }
        }

        @media (max-width: 480px) {
          .hero { min-height: 260px; padding: 36px 18px; }
          .page-body { padding: 24px 14px 36px; }
          .prep-card, .timeline-section { padding: 22px 18px; }
          .form-wrap { border-radius: 10px; }
        }
      `;
    }
  }

  if (!customElements.get('bddc-application')) {
    customElements.define('bddc-application', BDDCApplication);
  }
})();
