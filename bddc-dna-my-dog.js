/**
 * <bddc-dna-my-dog> — Wix Studio Custom Element
 * Big Dogs Don't Cry Animal Rescue — Partner Page: DNA My Dog
 *
 * Frames DNA My Dog as a partner / recommended vendor — not as a BDDC product.
 * All purchase links use BDDC's affiliate code (?affiliate=250) so purchases
 * generate a small commission that supports the rescue.
 *
 * Usage in Wix Studio:
 *   1. Add a Custom Element to /dna-my-dog
 *   2. Server URL: https://cdn.jsdelivr.net/gh/justthescript/BDDC-Pages@main/bddc-dna-my-dog.js
 *   3. Tag Name:   bddc-dna-my-dog
 *   4. (Optional)  data-hero-image
 */

(function () {
  const DEFAULT_HERO_IMAGE =
    'https://static.wixstatic.com/media/bc59b6_604fb6f09a314f219daf30e354c81e5a~mv2.webp';

  const PAW_ICON_URL =
    'https://static.wixstatic.com/media/bc59b6_45db072b49a5427f930919d18683e36d~mv2.png';

  const SHOP_URL = 'https://dnamydog.com/tests/?affiliate=250';
  const LEARN_URL = 'https://dnamydog.com/science/breeds-we-test/?affiliate=250';

  const REPORT_IMAGE =
    'https://static.wixstatic.com/media/4cb683_9eccae277d2f4cbf918864dd3a3ee685~mv2.png';

  const STATS = [
    { icon: '🏆', text: 'Leading canine genetics' },
    { icon: '⏱️', text: 'Results in ~3 weeks' },
    { icon: '🧬', text: 'Largest breed reference' },
    { icon: '👩‍⚕️', text: 'Veterinary-recommended' },
    { icon: '⭐', text: 'Over 10,000 5-star reviews' }
  ];

  const STEPS = [
    {
      num: 1,
      label: 'Fetch',
      body: 'Order your test kit and register it online — it ships straight to your door.'
    },
    {
      num: 2,
      label: 'Sit & Swab',
      body: "Take a quick cheek swab from your pup. It's painless and takes seconds."
    },
    {
      num: 3,
      label: 'Wait',
      body: 'Mail it back, and your detailed results land in your inbox in about three weeks.'
    }
  ];

  const TESTS = [
    {
      name: 'Essential Breed ID Test',
      tagline: 'The starter — discover your mix.',
      description: `Identify your dog's breed makeup from a database of 350+ breeds using the latest CNV technology.`,
      image: 'https://static.wixstatic.com/media/4cb683_f4cfac96cb7c472ba967afffec86eeab~mv2.png',
      link: 'https://dnamydog.com/tests/essential-breed-id-test/?affiliate=250',
      accent: 'pink'
    },
    {
      name: 'Premium Breed ID Test',
      tagline: 'Deeper science, deeper insight.',
      description: 'The most comprehensive breed analysis DNA My Dog offers — perfect for the curious dog parent who wants the full picture.',
      image: 'https://static.wixstatic.com/media/4cb683_042451e9492a48f6a89e4954611946d9~mv2.png',
      link: 'https://dnamydog.com/tests/premium-breed-id-test/?affiliate=250',
      accent: 'purple'
    },
    {
      name: 'Canine Allergy Test',
      tagline: 'Find what your pup reacts to.',
      description: 'Tests sensitivity to over 100 common allergens using the gold-standard ELISA method, so you can pinpoint and remove triggers.',
      image: 'https://static.wixstatic.com/media/4cb683_d53c49646d7b40d5a8f89d9b12fb2919~mv2.png',
      link: 'https://dnamydog.com/tests/canine-allergy-test/?affiliate=250',
      accent: 'blue'
    },
    {
      name: 'Deceased Dog DNA Test',
      tagline: 'Closure and answers, even after goodbye.',
      description: `The world's only test of its kind — giving closure and breed answers to those who've lost a beloved pup.`,
      image: 'https://static.wixstatic.com/media/4cb683_c7d1a4d56a924385b5ea5c20212380e7~mv2.png',
      link: 'https://dnamydog.com/tests/deceased-dog-dna-test/?affiliate=250',
      accent: 'gold'
    }
  ];

  const SCIENCE_SECTIONS = [
    {
      icon: '🧬',
      title: 'How Breed ID Works',
      body: `DNA My Dog has invested in the latest genetic science to offer the highest possible accuracy in their Breed ID Test. The test compares the genetics of over 350 breeds — essentially every known breed — to make sure you're getting an accurate breed representation of your dog, right down to the smallest percentage.`,
      details: [
        `They use a method called <strong>Copy Number Variation (CNVs)</strong> for their analysis. Differences in the content and organization of DNA — known as structural variation — have recently emerged as a major source of genetic and phenotypic diversity.`,
        `The correlating number of CNVs and their ability to measure genetic diversity, phenotype variation, and even disease susceptibility are some of the most novel discoveries in the canine genome to date.`,
        `These patterns of canine structural variation explain a lot: the short legs of the Basset Hound and Corgi, the inability of the Basenji to bark, the 6+ variations of the Dachshund, even the leopard pattern of the Catahoula Leopard Dog — all examples of the diversity CNV analysis can reveal.`,
        `Research has shown that CNVs encompass more nucleotides per genome than the older SNP-based approach traditionally used in genetic science. The Essential and Premium Breed ID Tests use this latest technology to connect the dots for a deeper bond with your pup.`
      ]
    },
    {
      icon: '🔬',
      title: 'How Allergy Testing Works',
      body: `DNA My Dog's Canine Allergy Test uses biochemistry — not genetics — to find what your dog actually reacts to. The thinking is simple: if you can recognize and remove the allergens causing your pet to react, you'll see symptoms decline. In many cases they disappear entirely.`,
      details: [
        `The test uses the glycoproteins found in your dog's sample to detect and measure their sensitivities to over <strong>100 common allergens</strong>.`,
        `Your sample is extracted and analyzed using the <strong>enzyme-linked immunosorbent assay (ELISA)</strong> method — considered the gold standard of immunosorbent assays. ELISA is highly sensitive and used to detect and quantify substances including proteins, glycoproteins, hormones, and other measurements of allergy sensitivity.`,
        `The technology is similar to human allergy testing, but their efforts are focused on the pet population — meaning the panel of allergens tested is one designed specifically for dogs.`
      ]
    },
    {
      icon: '🧪',
      title: 'Testing, Biochemistry & Research',
      body: `DNA My Dog runs three labs working in concert: a DNA testing lab, a biochemistry lab, and a research lab.`,
      details: [
        `The <strong>DNA testing lab</strong> uses microarrays and proprietary bioinformatics programs to deliver timely and accurate breed identification and age results.`,
        `The <strong>biochemistry lab</strong> handles the Canine Allergy Test, using the latest enzyme-linked immunoassays to provide actionable results designed to help your dog.`,
        `The <strong>research lab</strong> is where new testing protocols are designed and implemented. Innovations like the Deceased Dog DNA Test and the patent-pending Canine Genetic Age Test were developed there — and more are in the pipeline.`
      ]
    }
  ];

  class BDDCDnaMyDog extends HTMLElement {
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
            <h1 class="hero-title">DNA My Dog</h1>
            <p class="hero-tagline">
              Discover your dog's story — and support BDDC at the same time.
            </p>
          </div>
        </section>

        <div class="page-body">

          <!-- WHY WE PARTNER -->
          <aside class="partnership-card reveal">
            <div class="partnership-mark">
              <span class="bddc-mark">BDDC</span>
              <span class="partnership-x" aria-hidden="true">×</span>
              <span class="partner-mark">DNA My Dog</span>
            </div>
            <h2 class="partnership-title">Why We Partner With Them</h2>
            <p class="partnership-body">
              Big Dogs Don't Cry has chosen DNA My Dog as a recommended partner because their work
              aligns with ours: helping people understand the dogs they love. Their tests reveal breed
              backgrounds, identify allergens, and give answers families need — and when you order
              through this page, a portion of your purchase comes back to BDDC to fund the next rescue.
              <strong>One purchase. Two missions supported.</strong>
            </p>
          </aside>

          <!-- ABOUT THEM -->
          <section class="about-section reveal">
            <div class="section-overline">In Their Words</div>
            <h2 class="about-title">
              <span class="title-emoji" aria-hidden="true">🧬</span>
              About DNA My Dog
            </h2>
            <p class="about-headline">
              Driven by Purpose. Powered by Love. <span class="heart-pulse" aria-hidden="true">💖</span>
            </p>
            <div class="about-body">
              <p>
                Since 2008, DNA My Dog has been on a heartfelt mission to help pet parents build deeper,
                more meaningful bonds with their dogs. Founded by a passionate animal rescuer with a
                Master's in Veterinary Science and a specialty in Veterinary Forensics, the company began
                with a simple yet powerful idea: uncovering a rescue dog's breed background can help pet
                owners better understand, care for, and connect with their furry companions. 🐾
              </p>
              <p>
                Originally developed as a resource for shelters and rescue organizations, DNA My Dog
                quickly became a trusted tool for dog lovers around the world. As one of the first
                consumer-focused canine DNA testing companies, they've played a leading role in reshaping
                how we understand and care for our dogs.
              </p>
              <p>
                Every product is backed by science, driven by compassion, and designed to give you greater
                insight into your dog's health, heritage, and happiness. At DNA My Dog, it's not just about
                testing — it's about strengthening the lifelong bond between people and their pets.
              </p>
            </div>
          </section>

          <!-- STATS -->
          <section class="stats-section reveal">
            <div class="stats-grid">
              ${STATS.map(s => `
                <div class="stat">
                  <div class="stat-icon" aria-hidden="true">${s.icon}</div>
                  <div class="stat-text">${s.text}</div>
                </div>
              `).join('')}
            </div>
          </section>

          <!-- HOW IT WORKS - 3 STEPS -->
          <section class="steps-section reveal">
            <div class="paw-watermark" aria-hidden="true"></div>
            <div class="section-head">
              <div class="section-overline">Simple as 1, 2, 3</div>
              <h2 class="section-title">How It Works</h2>
              <p class="section-lead">
                From order to results — three steps and about three weeks.
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

          <!-- AVAILABLE TESTS -->
          <section class="tests-section reveal">
            <div class="section-head">
              <div class="section-overline">Their Lineup</div>
              <h2 class="section-title">Available Tests</h2>
              <p class="section-lead">
                Click any kit to order from DNA My Dog. Purchases through these links support
                Big Dogs Don't Cry — at no extra cost to you. 💛
              </p>
            </div>
            <div class="tests-grid">
              ${TESTS.map(t => this.renderTest(t)).join('')}
            </div>
          </section>

          <!-- DETAILED REPORTS -->
          <section class="reports-section reveal">
            <div class="reports-grid">
              <div class="reports-text">
                <div class="section-overline">What You Get</div>
                <h2 class="reports-title">Detailed, Beautiful Reports</h2>
                <p class="reports-body">
                  Every result comes back as a vet-ready breed breakdown — visualized clearly, with
                  percentages right down to the smallest contributing breed. Perfect for keeping in
                  your dog's medical file, sharing with your vet, or just bragging about your pup's
                  unique heritage.
                </p>
                <a class="reports-link" href="${LEARN_URL}" target="_blank" rel="noopener noreferrer">
                  See an example report <span class="arrow">→</span>
                </a>
              </div>
              <div class="reports-image-wrap" aria-hidden="true">
                <img class="reports-image" src="${REPORT_IMAGE}" alt="Example DNA My Dog breed breakdown report" loading="lazy">
              </div>
            </div>
          </section>

          <!-- THE SCIENCE -->
          <section class="science-section reveal">
            <div class="section-head">
              <div class="section-overline">Behind the Curtain</div>
              <h2 class="section-title">The Science</h2>
              <p class="section-lead">
                Curious how it actually works? Here's what's happening in their labs.
              </p>
            </div>
            <div class="science-list">
              ${SCIENCE_SECTIONS.map((s, i) => `
                <details class="science-item" ${i === 0 ? 'open' : ''}>
                  <summary class="science-summary">
                    <span class="science-icon" aria-hidden="true">${s.icon}</span>
                    <span class="science-title">${s.title}</span>
                    <span class="science-chevron" aria-hidden="true">▾</span>
                  </summary>
                  <div class="science-content">
                    <p class="science-lead">${s.body}</p>
                    ${s.details.map(d => `<p>${d}</p>`).join('')}
                  </div>
                </details>
              `).join('')}
            </div>
          </section>

          <!-- CTA -->
          <section class="closing-card reveal">
            <h2 class="closing-title">
              <span aria-hidden="true">🐾</span>
              Ready to Discover Your Dog's Story?
            </h2>
            <p class="closing-body">
              Order through these links and a portion of your purchase comes straight back to
              Big Dogs Don't Cry — funding the next rescue, the next foster, the next happy ending.
            </p>
            <div class="closing-actions">
              <a class="btn btn-primary" href="${SHOP_URL}" target="_blank" rel="noopener noreferrer">
                Shop DNA My Dog <span class="arrow">→</span>
              </a>
              <a class="btn btn-secondary" href="${LEARN_URL}" target="_blank" rel="noopener noreferrer">
                Learn More
              </a>
            </div>
            <p class="affiliate-note">
              💛 <strong>Affiliate Disclosure:</strong> Big Dogs Don't Cry receives a small commission
              from purchases made through links on this page. There's no extra cost to you, and we only
              partner with companies we genuinely believe in.
            </p>
          </section>

        </div>
      `;
    }

    renderTest(t) {
      return `
        <a class="test-card test-accent-${t.accent}" href="${t.link}" target="_blank" rel="noopener noreferrer">
          <div class="test-image-wrap">
            <img class="test-image" src="${t.image}" alt="${t.name}" loading="lazy">
          </div>
          <div class="test-content">
            <h3 class="test-name">${t.name}</h3>
            <p class="test-tagline">${t.tagline}</p>
            <p class="test-description">${t.description}</p>
            <div class="test-cta">
              Order Now <span class="arrow">→</span>
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
          --purple: #845ef7;
          --purple-deep: #7048e8;
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

        /* ───── ABOUT SECTION ───── */
        .about-section {
          max-width: 900px;
          margin: 0 auto 48px;
          text-align: center;
        }
        .section-overline {
          color: var(--pink);
          font-size: clamp(13px, 1.1vw, 15px);
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .about-title {
          margin: 0 0 14px;
          color: var(--pink);
          font-size: clamp(32px, 4.2vw, 48px);
          font-weight: 700;
          line-height: 1.1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
        }
        .title-emoji { font-size: 0.85em; }
        .about-headline {
          margin: 0 0 24px;
          font-size: clamp(20px, 2.4vw, 28px);
          font-weight: 700;
          color: var(--ink);
          line-height: 1.3;
        }
        .about-body p {
          margin: 0 0 18px;
          font-size: clamp(16px, 1.35vw, 18px);
          line-height: 1.7;
          color: var(--ink);
          text-align: left;
        }
        .about-body p:last-child { margin-bottom: 0; }

        /* ───── STATS ───── */
        .stats-section { margin: 0 0 48px; }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 16px;
        }
        .stat {
          background: #fff;
          border-radius: 14px;
          padding: 22px 14px;
          text-align: center;
          box-shadow: var(--shadow-sm);
          border: 2px solid var(--pink-soft);
          transition: transform .15s ease, box-shadow .25s ease;
        }
        .stat:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
        }
        .stat-icon {
          font-size: 36px;
          margin-bottom: 8px;
          line-height: 1;
        }
        .stat-text {
          font-size: clamp(13px, 1.05vw, 14px);
          font-weight: 600;
          color: var(--pink-deep);
          line-height: 1.35;
        }

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
          max-width: 640px;
          font-size: clamp(15px, 1.3vw, 17px);
          color: var(--muted);
          line-height: 1.6;
          font-style: italic;
        }
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          position: relative;
          z-index: 1;
        }
        .step {
          background: var(--pink-bg);
          border-radius: 14px;
          padding: 28px 22px;
          text-align: center;
          border: 2px solid var(--pink-soft);
          transition: transform .15s ease, border-color .25s ease;
        }
        .step:hover {
          transform: translateY(-4px);
          border-color: var(--pink);
        }
        .step-num {
          width: 56px;
          height: 56px;
          margin: 0 auto 14px;
          background: linear-gradient(135deg, var(--pink) 0%, var(--pink-deep) 100%);
          color: #fff;
          font-size: 22px;
          font-weight: 700;
          border-radius: 50%;
          display: grid;
          place-items: center;
          box-shadow: 0 6px 16px rgba(245,54,124,0.30);
        }
        .step-label {
          margin: 0 0 10px;
          color: var(--pink-deep);
          font-size: clamp(20px, 2vw, 24px);
          font-weight: 700;
        }
        .step-body {
          margin: 0;
          font-size: clamp(14px, 1.2vw, 16px);
          line-height: 1.55;
          color: var(--ink);
        }

        /* ───── TESTS ───── */
        .tests-section { margin-bottom: 48px; }
        .tests-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 22px;
        }
        .test-card {
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
        .test-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-md);
          border-color: var(--pink);
        }
        .test-card::after {
          content: "";
          position: absolute;
          top: 14px;
          right: 14px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--accent, var(--pink));
          box-shadow: 0 0 0 4px rgba(245,54,124,0.10);
        }
        .test-accent-pink   { --accent: #ff8fc1; }
        .test-accent-purple { --accent: var(--purple); }
        .test-accent-blue   { --accent: var(--blue-soft); }
        .test-accent-gold   { --accent: var(--gold); }
        .test-image-wrap {
          background: linear-gradient(135deg, var(--pink-bg) 0%, var(--pink-light) 100%);
          padding: 22px;
          display: grid;
          place-items: center;
          aspect-ratio: 16 / 9;
        }
        .test-image {
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          object-fit: contain;
          display: block;
          transition: transform .25s ease;
        }
        .test-card:hover .test-image {
          transform: scale(1.04);
        }
        .test-content {
          padding: 22px 24px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .test-name {
          margin: 0 0 6px;
          color: var(--pink-deep);
          font-size: clamp(18px, 1.7vw, 22px);
          font-weight: 700;
          line-height: 1.2;
        }
        .test-tagline {
          margin: 0 0 12px;
          font-size: clamp(13px, 1.1vw, 15px);
          color: var(--pink);
          font-weight: 600;
          font-style: italic;
        }
        .test-description {
          margin: 0 0 18px;
          font-size: clamp(14px, 1.2vw, 16px);
          line-height: 1.55;
          color: var(--ink);
          flex: 1;
        }
        .test-cta {
          font-weight: 700;
          color: var(--pink-deep);
          font-size: clamp(14px, 1.2vw, 16px);
          letter-spacing: .3px;
        }
        .test-card:hover .test-cta { color: var(--pink); }
        .test-cta .arrow {
          display: inline-block;
          transition: transform .2s ease;
        }
        .test-card:hover .test-cta .arrow { transform: translateX(4px); }

        /* ───── DETAILED REPORTS ───── */
        .reports-section {
          background:
            radial-gradient(circle at bottom left, rgba(132,94,247,0.06) 0%, transparent 60%),
            #fff;
          border-radius: 20px;
          padding: clamp(32px, 4vw, 48px);
          box-shadow: var(--shadow-sm);
          margin-bottom: 48px;
        }
        .reports-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
        }
        .reports-title {
          margin: 0 0 16px;
          color: var(--pink-deep);
          font-size: clamp(26px, 3.2vw, 36px);
          font-weight: 700;
          line-height: 1.15;
        }
        .reports-body {
          margin: 0 0 18px;
          font-size: clamp(15px, 1.3vw, 17px);
          line-height: 1.65;
          color: var(--ink);
        }
        .reports-link {
          font-weight: 700;
          text-decoration: none;
          color: var(--pink-deep);
          font-size: clamp(14px, 1.2vw, 16px);
        }
        .reports-link:hover { color: var(--pink); }
        .reports-link .arrow {
          display: inline-block;
          transition: transform .2s ease;
        }
        .reports-link:hover .arrow { transform: translateX(4px); }
        .reports-image-wrap {
          padding: 12px;
        }
        .reports-image {
          display: block;
          width: 100%;
          height: auto;
          border-radius: 12px;
          box-shadow: var(--shadow-md);
          border: 1px solid var(--pink-soft);
        }

        /* ───── SCIENCE ───── */
        .science-section {
          background: #fff;
          border-radius: 20px;
          padding: clamp(32px, 4vw, 48px);
          box-shadow: var(--shadow-sm);
          margin-bottom: 48px;
          position: relative;
          overflow: hidden;
        }
        .science-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
          max-width: 880px;
          margin: 0 auto;
        }
        .science-item {
          background: var(--pink-bg);
          border-radius: 14px;
          border: 2px solid var(--pink-soft);
          overflow: hidden;
          transition: border-color .2s ease;
        }
        .science-item[open] {
          border-color: var(--pink);
        }
        .science-summary {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 18px 22px;
          cursor: pointer;
          list-style: none;
          font-weight: 700;
          color: var(--pink-deep);
          font-size: clamp(16px, 1.5vw, 19px);
          transition: background .2s ease;
        }
        .science-summary::-webkit-details-marker { display: none; }
        .science-summary:hover { background: rgba(245,54,124,0.04); }
        .science-icon {
          font-size: 24px;
          line-height: 1;
        }
        .science-title { flex: 1; }
        .science-chevron {
          color: var(--pink);
          font-size: 18px;
          transition: transform .25s ease;
        }
        .science-item[open] .science-chevron {
          transform: rotate(180deg);
        }
        .science-content {
          padding: 4px 22px 22px;
          background: #fff;
          margin: 0 8px 8px;
          border-radius: 10px;
        }
        .science-content p {
          margin: 14px 0 0;
          font-size: clamp(14px, 1.2vw, 16px);
          line-height: 1.65;
          color: var(--ink);
        }
        .science-content p:first-child { margin-top: 18px; }
        .science-lead {
          color: var(--ink) !important;
          font-weight: 500;
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
          .test-card:hover .test-image { transform: none; }
        }

        /* ───── RESPONSIVE ───── */
        @media (max-width: 1000px) {
          .stats-grid { grid-template-columns: repeat(3, 1fr); }
          .steps-grid { grid-template-columns: 1fr; }
          .tests-grid { grid-template-columns: 1fr; }
          .reports-grid { grid-template-columns: 1fr; gap: 28px; text-align: center; }
        }

        @media (max-width: 600px) {
          .hero { min-height: 260px; padding: 36px 18px; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .partnership-mark { font-size: 12px; gap: 10px; flex-wrap: wrap; justify-content: center; }
          .closing-actions { flex-direction: column; align-items: stretch; }
          .btn { text-align: center; }
        }

        @media (max-width: 420px) {
          .stats-grid { grid-template-columns: 1fr; }
          .page-body { padding: 24px 14px 40px; }
        }
      `;
    }
  }

  if (!customElements.get('bddc-dna-my-dog')) {
    customElements.define('bddc-dna-my-dog', BDDCDnaMyDog);
  }
})();
