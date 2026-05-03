/**
 * <bddc-footer> — Wix Studio Custom Element
 * Big Dogs Don't Cry Animal Rescue site footer
 *
 * Usage in Wix Studio:
 *   1. Open the site Footer section (so it shows on every page)
 *   2. Hide / remove the existing native footer content
 *   3. Add a Custom Element to the footer
 *   4. Server URL: https://justthescript.github.io/BDDC-Pages/site-footer.js
 *   5. Tag Name: bddc-footer
 *   6. Stretch width to 100%, set height to Auto
 */

(function ensureFooterFonts() {
  if (document.querySelector('link[data-bddc-fonts]')) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap';
  link.setAttribute('data-bddc-fonts', '');
  document.head.appendChild(link);
})();

class BddcFooter extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = this.template();
  }

  template() {
    const year = new Date().getFullYear();
    return `
      <style>
        :host {
          display: block;
          width: 100%;
          --primary: #ff4f7b;
          --primary-light: #ff7da0;
          --hover: #4f8cff;
          --bg-top: #2d1820;
          --bg-bottom: #1a0e15;
          --bg-bottom-bar: #120810;
          --text: rgba(255, 255, 255, 0.95);
          --text-soft: rgba(255, 255, 255, 0.72);
          --text-faint: rgba(255, 255, 255, 0.5);
          --border-faint: rgba(255, 255, 255, 0.08);
          --transition: 220ms cubic-bezier(0.4, 0, 0.2, 1);
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        *, *::before, *::after {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        a { -webkit-tap-highlight-color: transparent; }
        ul { list-style: none; }

        /* Top accent bar */
        .accent-bar {
          height: 3px;
          background: linear-gradient(90deg, var(--primary) 0%, var(--primary-light) 50%, var(--hover) 100%);
        }

        /* Main footer area */
        .footer-main {
          background: linear-gradient(180deg, var(--bg-top) 0%, var(--bg-bottom) 100%);
          padding: 64px 24px 48px;
          color: var(--text);
          position: relative;
          overflow: hidden;
        }

        /* Subtle paw print background pattern */
        .footer-main::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80' opacity='1'><g fill='%23ffffff' opacity='0.04'><circle cx='20' cy='32' r='5'/><circle cx='32' cy='22' r='5'/><circle cx='48' cy='22' r='5'/><circle cx='60' cy='32' r='5'/><path d='M40 36c-8 0-14 7-14 13 0 4 3 7 6 7 3 0 5-1 8-1s5 1 8 1c3 0 6-3 6-7 0-6-6-13-14-13z'/></g></svg>");
          background-size: 220px 220px;
          opacity: 0.6;
          pointer-events: none;
        }

        .footer-inner {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr 1fr;
          gap: 56px;
        }

        /* Brand column */
        .brand-logo {
          height: 72px;
          margin-bottom: 18px;
          filter: brightness(0) invert(1);
          opacity: 0.95;
          display: block;
        }

        .tagline {
          font-size: 14.5px;
          line-height: 1.6;
          color: var(--text-soft);
          margin-bottom: 22px;
          max-width: 320px;
        }

        .contact {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 24px;
        }

        .contact a {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: var(--text-soft);
          text-decoration: none;
          font-size: 14px;
          font-weight: 400;
          transition: color var(--transition), transform var(--transition);
          width: fit-content;
        }

        .contact a:hover {
          color: var(--primary-light);
          transform: translateX(2px);
        }

        .contact svg {
          width: 16px;
          height: 16px;
          color: var(--primary);
          flex-shrink: 0;
        }

        /* Social icons */
        .socials {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .social-btn {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid var(--border-faint);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--text);
          transition: all var(--transition);
          text-decoration: none;
        }

        .social-btn svg {
          width: 18px;
          height: 18px;
          transition: transform var(--transition);
        }

        .social-btn:hover {
          transform: translateY(-3px);
          border-color: transparent;
          color: white;
        }

        .social-btn:hover svg {
          transform: scale(1.1);
        }

        .social-btn.instagram:hover {
          background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
          box-shadow: 0 6px 20px rgba(220, 39, 67, 0.4);
        }

        .social-btn.facebook:hover {
          background: #1877f2;
          box-shadow: 0 6px 20px rgba(24, 119, 242, 0.4);
        }

        .social-btn.tiktok:hover {
          background: #000;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5);
        }

        .social-btn.amazon:hover {
          background: #ff9900;
          box-shadow: 0 6px 20px rgba(255, 153, 0, 0.4);
        }

        /* Connect section (centered donate + socials) */
        .footer-connect {
          margin-top: 56px;
          padding-top: 40px;
          border-top: 1px solid var(--border-faint);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 18px;
        }

        .connect-label {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--text-soft);
          margin: 0;
        }

        .footer-donate {
          font-size: 15px;
          font-weight: 600;
          padding: 14px 36px;
          border-radius: 999px;
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
          color: white;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 6px 18px rgba(255, 79, 123, 0.4);
          transition: transform var(--transition), box-shadow var(--transition), background var(--transition);
          line-height: 1;
        }

        .footer-donate:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 26px rgba(255, 79, 123, 0.55);
          background: linear-gradient(135deg, var(--primary-light) 0%, var(--primary) 100%);
        }

        .footer-donate svg {
          width: 16px;
          height: 16px;
        }

        .footer-donate:hover svg {
          animation: heartbeat 0.8s ease infinite;
        }

        /* Link columns */
        .footer-col h4 {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: white;
          margin-bottom: 18px;
          position: relative;
          padding-bottom: 12px;
        }

        .footer-col h4::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 28px;
          height: 2px;
          background: var(--primary);
          border-radius: 2px;
        }

        .footer-col ul {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-col a {
          color: var(--text-soft);
          text-decoration: none;
          font-size: 14.5px;
          font-weight: 400;
          transition: color var(--transition), padding-left var(--transition);
          position: relative;
          display: inline-block;
        }

        .footer-col a::before {
          content: '→';
          position: absolute;
          left: -18px;
          opacity: 0;
          transition: opacity var(--transition), left var(--transition);
          color: var(--primary);
        }

        .footer-col a:hover {
          color: var(--primary-light);
          padding-left: 4px;
        }

        .footer-col a:hover::before {
          opacity: 1;
          left: -14px;
        }

        /* Bottom bar */
        .footer-bottom {
          background: var(--bg-bottom-bar);
          padding: 20px 24px;
          color: var(--text-faint);
        }

        .footer-bottom-inner {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          font-size: 13px;
        }

        .footer-bottom a {
          color: var(--text-soft);
          text-decoration: none;
          transition: color var(--transition);
        }

        .footer-bottom a:hover {
          color: var(--primary-light);
        }

        .designer-credit a {
          color: var(--text-soft);
          text-decoration: none;
          font-weight: 500;
          transition: color var(--transition);
        }

        .designer-credit a:hover {
          color: var(--primary-light);
        }

        .made-with {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .made-with .heart {
          width: 12px;
          height: 12px;
          color: var(--primary);
          animation: heartbeat 1.6s ease-in-out infinite;
        }

        @keyframes heartbeat {
          0%, 50%, 100% { transform: scale(1); }
          15% { transform: scale(1.25); }
          30% { transform: scale(1); }
          45% { transform: scale(1.15); }
        }

        /* Tablet */
        @media (max-width: 980px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 40px 32px;
          }

          .brand-col {
            grid-column: 1 / -1;
          }

          .tagline {
            max-width: none;
          }
        }

        /* Mobile */
        @media (max-width: 600px) {
          .footer-main {
            padding: 48px 20px 36px;
          }

          .footer-grid {
            grid-template-columns: 1fr;
            gap: 36px;
          }

          .brand-col {
            text-align: center;
          }

          .brand-logo {
            margin-left: auto;
            margin-right: auto;
            height: 64px;
          }

          .tagline {
            margin-left: auto;
            margin-right: auto;
          }

          .contact {
            align-items: center;
          }

          .socials {
            justify-content: center;
          }

          .footer-col h4 {
            text-align: center;
          }

          .footer-col h4::after {
            left: 50%;
            transform: translateX(-50%);
          }

          .footer-col ul {
            align-items: center;
          }

          .footer-bottom-inner {
            justify-content: center;
            text-align: center;
          }

          .footer-connect {
            margin-top: 36px;
            padding-top: 28px;
          }
        }
      </style>

      <footer role="contentinfo">
        <div class="accent-bar"></div>

        <div class="footer-main">
          <div class="footer-inner">
            <div class="footer-grid">
              <div class="footer-col brand-col">
                <img
                  class="brand-logo"
                  src="https://static.wixstatic.com/media/4cb683_a8d649d3589846568a30460f1d077d32~mv2.png"
                  alt="Big Dogs Don't Cry"
                />
                <p class="tagline">A foster-based rescue saving big dogs in Northwest Indiana &mdash; one tail wag at a time.</p>

                <div class="contact">
                  <a href="mailto:Bigdogsdontcryrescue@gmail.com">
                    ${this.envelopeSvg()}
                    <span>Bigdogsdontcryrescue@gmail.com</span>
                  </a>
                  <a href="tel:+12198411142">
                    ${this.phoneSvg()}
                    <span>(219) 841-1142</span>
                  </a>
                </div>
              </div>

              <div class="footer-col">
                <h4>Quick Links</h4>
                <ul>
                  <li><a href="https://www.bigdogsdontcry.com/" target="_top">Home</a></li>
                  <li><a href="https://www.bigdogsdontcry.com/adoptable" target="_top">View Pets</a></li>
                  <li><a href="https://www.bigdogsdontcry.com/donations" target="_top">Donations</a></li>
                  <li><a href="https://www.bigdogsdontcry.com/contact-us-now" target="_top">Contact Us</a></li>
                </ul>
              </div>

              <div class="footer-col">
                <h4>Applications</h4>
                <ul>
                  <li><a href="https://airtable.com/embed/appWyR26n0mjaXNwu/shrodhuFKkzL5mCjX?backgroundColor=gray" target="_blank" rel="noopener noreferrer">Adoption</a></li>
                  <li><a href="https://airtable.com/embed/apprlVtBQNP5OwGsI/shrVmvAUUQ6xCKMrf?backgroundColor=gray" target="_blank" rel="noopener noreferrer">Foster</a></li>
                  <li><a href="https://airtable.com/embed/appqKxAMX4xyWWB4j/shrklnKjkfaVYmbV0?backgroundColor=gray" target="_blank" rel="noopener noreferrer">Volunteer</a></li>
                </ul>
              </div>

              <div class="footer-col">
                <h4>Legal</h4>
                <ul>
                  <li><a href="https://www.bigdogsdontcry.com/privacy-policy" target="_top">Privacy Policy</a></li>
                  <li><a href="https://www.bigdogsdontcry.com/terms-conditions" target="_top">Terms &amp; Conditions</a></li>
                  <li><a href="https://www.bigdogsdontcry.com/accessibility-statement" target="_top">Accessibility Statement</a></li>
                </ul>
              </div>
            </div>

            <div class="footer-connect">
              <p class="connect-label">Help us save more lives</p>
              <a class="footer-donate" href="https://www.bigdogsdontcry.com/donations" target="_top">
                ${this.heartSvg()}
                <span>Donate</span>
              </a>
              <div class="socials" aria-label="Social media">
                <a class="social-btn instagram" href="https://www.instagram.com/bigdogsdontcryrescue/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Follow us on Instagram">
                  ${this.instagramSvg()}
                </a>
                <a class="social-btn facebook" href="https://www.facebook.com/p/Big-Dogs-Dont-Cry-Inc-61567183106129/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="Follow us on Facebook">
                  ${this.facebookSvg()}
                </a>
                <a class="social-btn tiktok" href="https://www.tiktok.com/@bigdogsdontcryrescue" target="_blank" rel="noopener noreferrer" aria-label="TikTok" title="Follow us on TikTok">
                  ${this.tiktokSvg()}
                </a>
                <a class="social-btn amazon" href="https://www.amazon.com/hz/wishlist/ls/5RKP49Q0QQHF?ref_=wl_share" target="_blank" rel="noopener noreferrer" aria-label="Amazon Wishlist" title="Shop our Amazon Wishlist">
                  ${this.giftSvg()}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <div class="footer-bottom-inner">
            <span>&copy; ${year} Big Dogs Don't Cry &middot; Merrillville, IN</span>
            <span class="designer-credit">Proudly designed by <a href="#" target="_blank" rel="noopener noreferrer">OmniScripts, Inc.</a></span>
            <span class="made-with">Made with ${this.heartSvg()} for big dogs</span>
          </div>
        </div>
      </footer>
    `;
  }

  envelopeSvg() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M4 6h16c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2z"/><path d="m22 8-10 6L2 8"/></svg>`;
  }

  phoneSvg() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`;
  }

  instagramSvg() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`;
  }

  facebookSvg() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.89 3.77-3.89 1.09 0 2.24.19 2.24.19v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94z"/></svg>`;
  }

  tiktokSvg() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z"/></svg>`;
  }

  giftSvg() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>`;
  }

  heartSvg() {
    return `<svg class="heart" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 21s-7-4.5-9.5-9C0.8 8.5 2.5 4 6.5 4c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3 4 0 5.7 4.5 4 8-2.5 4.5-9.5 9-9.5 9z"/></svg>`;
  }
}

if (!customElements.get('bddc-footer')) {
  customElements.define('bddc-footer', BddcFooter);
}
