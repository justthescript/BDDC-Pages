/**
 * <terms-conditions> — Wix Studio Custom Element
 * Big Dogs Don't Cry Animal Rescue
 *
 * Usage in Wix Studio:
 *   1. Add a Custom Element to the page
 *   2. Server URL: https://justthescript.github.io/BDDC-Pages/terms-conditions.js
 *   3. Tag Name: terms-conditions
 *
 * To update the "Last Updated" date, edit the LAST_UPDATED constant below.
 */

const LAST_UPDATED = 'May 3, 2026';

class TermsConditions extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = this.template();
    this.initAnimations(shadow);
  }

  template() {
    return `
      <style>
        :host {
          display: block;
          width: 100%;
          font-family: 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
        }

        *, *::before, *::after {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 20px;
        }

        /* Header */
        .page-header {
          text-align: center;
          padding: 60px 20px 40px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          margin-bottom: 50px;
        }

        .page-header h1 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 12px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        }

        .page-header .subtitle {
          font-size: 1.05rem;
          opacity: 0.92;
          max-width: 700px;
          margin: 0 auto 18px;
        }

        .page-header .last-updated {
          display: inline-block;
          padding: 6px 16px;
          background: rgba(255, 255, 255, 0.18);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 999px;
          font-size: 0.9rem;
          font-weight: 500;
          backdrop-filter: blur(4px);
        }

        .page-header .last-updated strong {
          font-weight: 600;
        }

        /* Document section */
        .terms-section {
          background: white;
          border-radius: 12px;
          padding: 50px 50px;
          margin-bottom: 40px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }

        .document-intro {
          font-size: 1.15rem;
          color: #555;
          line-height: 1.8;
          padding-bottom: 30px;
          margin-bottom: 30px;
          border-bottom: 1px solid #eee;
        }

        /* Term items */
        .term-item {
          margin-bottom: 36px;
          padding-left: 0;
        }

        .term-item:last-of-type {
          margin-bottom: 0;
        }

        .term-item h2 {
          color: #667eea;
          font-size: 1.45rem;
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          gap: 14px;
          line-height: 1.3;
        }

        .term-item h2 .num {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1rem;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(102, 126, 234, 0.35);
        }

        .term-content {
          padding-left: 50px;
        }

        .term-content p {
          color: #4a4a4a;
          font-size: 1.05rem;
          line-height: 1.75;
          margin-bottom: 12px;
        }

        .term-content p:last-child {
          margin-bottom: 0;
        }

        .term-content ul {
          margin-top: 12px;
          margin-bottom: 12px;
          list-style: none;
          padding-left: 0;
        }

        .term-content li {
          color: #4a4a4a;
          font-size: 1.05rem;
          line-height: 1.7;
          padding-left: 24px;
          margin-bottom: 10px;
          position: relative;
        }

        .term-content li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 11px;
          width: 8px;
          height: 8px;
          background: #667eea;
          border-radius: 50%;
        }

        .term-content a {
          color: #667eea;
          text-decoration: none;
          font-weight: 500;
          border-bottom: 1px solid rgba(102, 126, 234, 0.3);
          transition: border-color 0.2s ease, color 0.2s ease;
        }

        .term-content a:hover {
          color: #764ba2;
          border-bottom-color: #764ba2;
        }

        /* Fade-in animation */
        .term-item.fade-in {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .term-item.fade-in.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Contact card */
        .contact-card {
          margin-top: 40px;
          padding: 32px 36px;
          background: linear-gradient(135deg, #f0f4ff 0%, #faf5ff 100%);
          border-radius: 12px;
          border-left: 4px solid #667eea;
        }

        .contact-card h3 {
          color: #667eea;
          font-size: 1.35rem;
          margin-bottom: 8px;
        }

        .contact-card p {
          color: #555;
          font-size: 1.05rem;
          margin-bottom: 18px;
        }

        .contact-methods {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .contact-method {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 22px;
          background: white;
          border-radius: 999px;
          color: #667eea;
          text-decoration: none;
          font-weight: 500;
          font-size: 1rem;
          border: 1px solid rgba(102, 126, 234, 0.2);
          transition: transform 0.2s ease, box-shadow 0.2s ease, color 0.2s ease;
        }

        .contact-method:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(102, 126, 234, 0.2);
          color: #764ba2;
        }

        .contact-method svg {
          width: 16px;
          height: 16px;
        }

        /* Mobile */
        @media (max-width: 768px) {
          .page-header { padding: 40px 20px 30px; }
          .page-header h1 { font-size: 2rem; }
          .page-header .subtitle { font-size: 1rem; }

          .terms-section { padding: 30px 24px; }

          .document-intro { font-size: 1.05rem; }

          .term-item h2 { font-size: 1.2rem; }
          .term-item h2 .num { width: 30px; height: 30px; font-size: 0.9rem; }

          .term-content { padding-left: 0; }
          .term-content p, .term-content li { font-size: 1rem; }

          .contact-card { padding: 24px 20px; }
          .contact-methods { flex-direction: column; }
          .contact-method { justify-content: center; width: 100%; }
        }

        @media print {
          .page-header { background: none; color: #333; }
          .page-header .last-updated { background: none; border: 1px solid #999; }
          .term-item { page-break-inside: avoid; }
        }
      </style>

      <div class="page-header">
        <h1>Terms &amp; Conditions</h1>
        <p class="subtitle">Please review the terms below carefully — they govern your use of our website and services.</p>
        <div class="last-updated">Last Updated: <strong>${LAST_UPDATED}</strong></div>
      </div>

      <div class="container">
        <section class="terms-section">
          <p class="document-intro">
            Welcome to Big Dogs Don't Cry. By accessing or using <strong>bigdogsdontcry.com</strong>, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please discontinue use of the website.
          </p>

          <div class="term-item fade-in">
            <h2><span class="num">1</span> Website Purpose</h2>
            <div class="term-content">
              <p>The purpose of this website is to provide information about Big Dogs Don't Cry, promote our animal rescue efforts, and facilitate donations, adoptions, and volunteer sign-ups. All content is provided for informational purposes only and should not be considered professional, medical, or legal advice.</p>
            </div>
          </div>

          <div class="term-item fade-in">
            <h2><span class="num">2</span> Donations</h2>
            <div class="term-content">
              <p>By donating through our website, you agree that:</p>
              <ul>
                <li>All donations are voluntary and non-refundable.</li>
                <li>Donations are used to support our animal rescue operations, including food, medical care, and shelter for animals in need.</li>
                <li>Third-party platforms such as Zeffy and GiveButter may process your donations. Please review their respective terms and conditions for any payment-related issues.</li>
              </ul>
            </div>
          </div>

          <div class="term-item fade-in">
            <h2><span class="num">3</span> Use of Website</h2>
            <div class="term-content">
              <p>You agree to use this website only for lawful purposes. You must not:</p>
              <ul>
                <li>Attempt to harm, disrupt, or exploit the site or its users.</li>
                <li>Use our content (text, images, or videos) without prior written permission.</li>
                <li>Post or share harmful, defamatory, or inappropriate content on any interactive features.</li>
                <li>Use automated systems (bots, scrapers, etc.) to access the site without authorization.</li>
              </ul>
            </div>
          </div>

          <div class="term-item fade-in">
            <h2><span class="num">4</span> Intellectual Property</h2>
            <div class="term-content">
              <p>All content on this website — including logos, branding, text, photographs, and videos — is the property of Big Dogs Don't Cry unless otherwise noted. Unauthorized reproduction, distribution, or modification of any of this material is prohibited without prior written consent.</p>
            </div>
          </div>

          <div class="term-item fade-in">
            <h2><span class="num">5</span> Third-Party Links</h2>
            <div class="term-content">
              <p>Our website may include links to third-party websites such as payment processors, social media platforms, and partner organizations. We do not control or endorse these websites and are not responsible for their content, privacy practices, or security. Use them at your own risk.</p>
            </div>
          </div>

          <div class="term-item fade-in">
            <h2><span class="num">6</span> Liability Disclaimer</h2>
            <div class="term-content">
              <p>Big Dogs Don't Cry strives to provide accurate and up-to-date information, but we make no warranties or guarantees regarding the completeness, accuracy, or reliability of the content on this website. We are not liable for any losses or damages — direct, indirect, incidental, or consequential — resulting from your use of this website or your reliance on its information.</p>
            </div>
          </div>

          <div class="term-item fade-in">
            <h2><span class="num">7</span> Modifications to Terms</h2>
            <div class="term-content">
              <p>We reserve the right to update or modify these Terms and Conditions at any time, without prior notice. Changes are effective immediately upon being posted to this page. We encourage you to review this page periodically to stay informed of any updates. Your continued use of the website after changes are posted constitutes your acceptance of the revised terms.</p>
            </div>
          </div>

          <div class="term-item fade-in">
            <h2><span class="num">8</span> Governing Law</h2>
            <div class="term-content">
              <p>These Terms and Conditions are governed by and construed in accordance with the laws of the United States and the State of Indiana, without regard to its conflict of law provisions. Any disputes arising from your use of this website will be resolved in accordance with applicable laws.</p>
            </div>
          </div>

          <div class="term-item fade-in">
            <h2><span class="num">9</span> Contact Us</h2>
            <div class="term-content">
              <p>If you have any questions or concerns about these Terms and Conditions, please reach out using the contact information below.</p>
            </div>
          </div>

          <div class="contact-card">
            <h3>Questions or Concerns?</h3>
            <p>We're happy to clarify anything about these terms. Reach out to us directly:</p>
            <div class="contact-methods">
              <a class="contact-method" href="mailto:bigdogsdontcryrescue@gmail.com">
                ${this.envelopeSvg()}
                <span>bigdogsdontcryrescue@gmail.com</span>
              </a>
              <a class="contact-method" href="tel:+12196147558">
                ${this.phoneSvg()}
                <span>(219) 614-7558</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    `;
  }

  envelopeSvg() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M4 6h16c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2z"/><path d="m22 8-10 6L2 8"/></svg>`;
  }

  phoneSvg() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`;
  }

  initAnimations(shadow) {
    const items = shadow.querySelectorAll('.term-item.fade-in');
    if (!('IntersectionObserver' in window)) {
      items.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    items.forEach(item => observer.observe(item));
  }
}

if (!customElements.get('terms-conditions')) {
  customElements.define('terms-conditions', TermsConditions);
}
