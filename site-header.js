/**
 * <bddc-header> — Wix Studio Custom Element
 * Big Dogs Don't Cry Animal Rescue site header
 *
 * Usage in Wix Studio:
 *   1. Open the site Header section (so it shows on every page)
 *   2. Hide / remove the existing native header content
 *   3. Add a Custom Element to the header
 *   4. Server URL: https://justthescript.github.io/BDDC-Pages/site-header.js
 *   5. Tag Name: bddc-header
 *   6. Stretch width to 100%, set height to Auto
 */

(function ensurePoppins() {
  if (document.querySelector('link[data-bddc-fonts]')) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap';
  link.setAttribute('data-bddc-fonts', '');
  document.head.appendChild(link);
})();

class BddcHeader extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = this.template();
    this.initInteractions(shadow);
  }

  disconnectedCallback() {
    if (this._scrollHandler) window.removeEventListener('scroll', this._scrollHandler);
    if (this._resizeHandler) window.removeEventListener('resize', this._resizeHandler);
    document.body.style.overflow = '';
  }

  template() {
    return `
      <style>
        :host {
          display: block;
          width: 100%;
          --primary: #ff4f7b;
          --primary-dark: #e63d68;
          --primary-light: #ff6b92;
          --hover: #4f8cff;
          --text: #2d2d2d;
          --text-muted: #888;
          --bg: #ffffff;
          --bg-soft: #fff4f7;
          --border: #f1d3dc;
          --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06);
          --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04);
          --shadow-lg: 0 10px 30px rgba(0, 0, 0, 0.12), 0 4px 10px rgba(0, 0, 0, 0.06);
          --shadow-pink: 0 4px 14px rgba(255, 79, 123, 0.35);
          --shadow-pink-hover: 0 6px 20px rgba(255, 79, 123, 0.45);
          --transition: 220ms cubic-bezier(0.4, 0, 0.2, 1);
          --radius: 12px;
          --radius-pill: 999px;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        *, *::before, *::after {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        button { font-family: inherit; }
        a { -webkit-tap-highlight-color: transparent; }

        /* Top accent bar */
        .accent-bar {
          height: 3px;
          background: linear-gradient(90deg, var(--primary) 0%, var(--primary-light) 50%, var(--hover) 100%);
        }

        /* Header */
        .header {
          background: var(--bg);
          box-shadow: var(--shadow-sm);
          transition: box-shadow var(--transition), backdrop-filter var(--transition);
          position: relative;
          z-index: 100;
        }

        .header.scrolled {
          box-shadow: var(--shadow-md);
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: saturate(180%) blur(10px);
          -webkit-backdrop-filter: saturate(180%) blur(10px);
        }

        .nav {
          max-width: 1400px;
          margin: 0 auto;
          padding: 12px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          transition: padding var(--transition);
        }

        .header.scrolled .nav {
          padding: 8px 24px;
        }

        /* Logo */
        .logo {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          height: 76px;
          transition: height var(--transition);
        }

        .header.scrolled .logo {
          height: 64px;
        }

        .logo a {
          display: block;
          height: 100%;
          transition: transform var(--transition);
        }

        .logo a:hover {
          transform: scale(1.04);
        }

        .logo img {
          height: 100%;
          width: auto;
          max-width: 300px;
          object-fit: contain;
          display: block;
        }

        /* Desktop Nav */
        .nav-menu {
          display: flex;
          list-style: none;
          gap: 4px;
          align-items: center;
          flex: 1;
          justify-content: center;
        }

        .nav-link, .dropdown-trigger {
          font-size: 14.5px;
          font-weight: 500;
          color: var(--text);
          background: transparent;
          border: 0;
          padding: 10px 16px;
          cursor: pointer;
          text-decoration: none;
          border-radius: var(--radius);
          transition: color var(--transition), background var(--transition), transform var(--transition);
          white-space: nowrap;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          position: relative;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 50%;
          width: 0;
          height: 2px;
          background: var(--primary);
          border-radius: 2px;
          transition: width var(--transition), left var(--transition);
        }

        .nav-link:hover::after,
        .nav-link:focus-visible::after {
          width: calc(100% - 32px);
          left: 16px;
        }

        .nav-link:hover, .dropdown-trigger:hover,
        .nav-link:focus-visible, .dropdown-trigger:focus-visible {
          color: var(--primary);
          background: var(--bg-soft);
          outline: none;
        }

        .chevron {
          width: 12px;
          height: 12px;
          transition: transform var(--transition);
        }

        .dropdown:hover .chevron,
        .dropdown:focus-within .chevron {
          transform: rotate(180deg);
          color: var(--primary);
        }

        /* Dropdowns */
        .dropdown {
          position: relative;
        }

        .dropdown-menu {
          position: absolute;
          top: calc(100% + 4px);
          left: 50%;
          transform: translateX(-50%) translateY(-8px);
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 16px;
          box-shadow: var(--shadow-lg);
          min-width: 220px;
          padding: 12px;
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transition: opacity var(--transition), visibility var(--transition), transform var(--transition);
          z-index: 200;
        }

        .dropdown:hover .dropdown-menu,
        .dropdown:focus-within .dropdown-menu {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          transform: translateX(-50%) translateY(0);
        }

        /* Mega dropdown for Applications (two columns) */
        .dropdown-menu.mega {
          min-width: 440px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .dropdown-section-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-muted);
          padding: 6px 12px 8px;
          border-bottom: 1px solid var(--border);
          margin-bottom: 4px;
        }

        .dropdown-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          color: var(--text);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          border-radius: 8px;
          transition: background var(--transition), color var(--transition), transform var(--transition);
        }

        .dropdown-link::before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--border);
          transition: background var(--transition), transform var(--transition);
          flex-shrink: 0;
        }

        .dropdown-link:hover {
          background: var(--bg-soft);
          color: var(--primary);
          transform: translateX(2px);
        }

        .dropdown-link:hover::before {
          background: var(--primary);
          transform: scale(1.4);
        }

        /* CTA Buttons */
        .cta-group {
          display: flex;
          gap: 10px;
          align-items: center;
          flex-shrink: 0;
        }

        .btn {
          font-size: 14px;
          font-weight: 600;
          font-family: inherit;
          padding: 10px 20px;
          border-radius: var(--radius-pill);
          cursor: pointer;
          text-decoration: none;
          transition: all var(--transition);
          white-space: nowrap;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 0;
          line-height: 1;
        }

        .btn-outline {
          color: var(--primary);
          background: transparent;
          border: 2px solid var(--primary);
          padding: 8px 18px;
        }

        .btn-outline:hover {
          background: var(--primary);
          color: white;
          transform: translateY(-2px);
          box-shadow: var(--shadow-pink);
        }

        .btn-primary {
          color: white;
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
          box-shadow: var(--shadow-pink);
        }

        .btn-primary:hover {
          background: linear-gradient(135deg, var(--primary-light) 0%, var(--primary) 100%);
          transform: translateY(-2px);
          box-shadow: var(--shadow-pink-hover);
        }

        .btn-primary .heart {
          width: 14px;
          height: 14px;
          transition: transform var(--transition);
        }

        .btn-primary:hover .heart {
          animation: heartbeat 0.8s ease infinite;
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.2); }
          50% { transform: scale(1); }
          75% { transform: scale(1.15); }
        }

        /* Mobile bits */
        .mobile-actions {
          display: none;
          align-items: center;
          gap: 10px;
        }

        .hamburger {
          width: 44px;
          height: 44px;
          background: transparent;
          border: 0;
          cursor: pointer;
          padding: 0;
          position: relative;
          flex-shrink: 0;
          border-radius: 10px;
          transition: background var(--transition);
        }

        .hamburger:hover {
          background: var(--bg-soft);
        }

        .hamburger span {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 24px;
          height: 2.5px;
          background: var(--primary);
          border-radius: 3px;
          transform: translate(-50%, -50%);
          transition: all var(--transition);
        }

        .hamburger span:nth-child(1) { transform: translate(-50%, calc(-50% - 7px)); }
        .hamburger span:nth-child(3) { transform: translate(-50%, calc(-50% + 7px)); }

        .hamburger.active span:nth-child(1) {
          transform: translate(-50%, -50%) rotate(45deg);
        }
        .hamburger.active span:nth-child(2) {
          opacity: 0;
          transform: translate(-50%, -50%) scaleX(0);
        }
        .hamburger.active span:nth-child(3) {
          transform: translate(-50%, -50%) rotate(-45deg);
        }

        /* Mobile Overlay */
        .mobile-overlay {
          position: fixed;
          inset: 0;
          background: rgba(20, 10, 20, 0.5);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          opacity: 0;
          visibility: hidden;
          transition: opacity var(--transition), visibility var(--transition);
          z-index: 9998;
        }

        .mobile-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        .mobile-panel {
          position: fixed;
          top: 0;
          right: 0;
          width: 88%;
          max-width: 360px;
          height: 100vh;
          height: 100dvh;
          background: var(--bg);
          box-shadow: -10px 0 40px rgba(0, 0, 0, 0.15);
          transform: translateX(100%);
          transition: transform 320ms cubic-bezier(0.4, 0, 0.2, 1);
          overflow-y: auto;
          z-index: 9999;
          display: flex;
          flex-direction: column;
        }

        .mobile-overlay.active .mobile-panel {
          transform: translateX(0);
        }

        .mobile-header {
          padding: 18px 20px;
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
        }

        .mobile-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 600;
          font-size: 16px;
        }

        .mobile-title .paw {
          width: 22px;
          height: 22px;
        }

        .mobile-close {
          background: rgba(255, 255, 255, 0.2);
          border: 0;
          color: white;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background var(--transition), transform var(--transition);
        }

        .mobile-close:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: rotate(90deg);
        }

        .mobile-close svg { width: 16px; height: 16px; }

        .mobile-list {
          list-style: none;
          padding: 12px 0;
          flex: 1;
        }

        .mobile-section-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
          padding: 16px 24px 6px;
        }

        .mobile-link, .mobile-toggle {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 14px 24px;
          color: var(--text);
          text-decoration: none;
          font-size: 15.5px;
          font-weight: 500;
          background: transparent;
          border: 0;
          cursor: pointer;
          text-align: left;
          font-family: inherit;
          transition: background var(--transition), color var(--transition), padding var(--transition);
        }

        .mobile-link:hover, .mobile-toggle:hover,
        .mobile-link:active, .mobile-toggle:active {
          background: var(--bg-soft);
          color: var(--primary);
          padding-left: 28px;
        }

        .mobile-toggle .chevron {
          width: 14px;
          height: 14px;
          color: var(--text-muted);
          transition: transform var(--transition);
        }

        .mobile-item.open .mobile-toggle .chevron {
          transform: rotate(180deg);
          color: var(--primary);
        }

        .mobile-item.open .mobile-toggle {
          color: var(--primary);
          background: var(--bg-soft);
        }

        .mobile-submenu {
          max-height: 0;
          overflow: hidden;
          transition: max-height 320ms cubic-bezier(0.4, 0, 0.2, 1);
          background: #fafafa;
        }

        .mobile-item.open .mobile-submenu {
          max-height: 600px;
        }

        .mobile-sub-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
          padding: 12px 24px 4px 32px;
        }

        .mobile-sublink {
          display: block;
          padding: 11px 24px 11px 32px;
          color: var(--text);
          text-decoration: none;
          font-size: 14.5px;
          font-weight: 400;
          transition: background var(--transition), color var(--transition), padding-left var(--transition);
        }

        .mobile-sublink:hover, .mobile-sublink:active {
          background: var(--bg-soft);
          color: var(--primary);
          padding-left: 40px;
        }

        .mobile-footer {
          padding: 16px 20px 24px;
          border-top: 1px solid var(--border);
          display: flex;
          gap: 10px;
          flex-shrink: 0;
        }

        .mobile-footer .btn {
          flex: 1;
          justify-content: center;
        }

        /* Mobile breakpoints */
        @media (max-width: 1200px) {
          .nav-menu { gap: 0; }
          .nav-link, .dropdown-trigger { padding: 9px 10px; font-size: 13.5px; }
          .btn { padding: 9px 16px; font-size: 13px; }
          .btn-outline { padding: 7px 14px; }
        }

        @media (max-width: 920px) {
          .nav-menu, .cta-group { display: none; }
          .mobile-actions { display: flex; }
        }

        @media (max-width: 480px) {
          .nav { padding: 10px 14px; gap: 10px; }
          .logo { height: 64px; }
          .header.scrolled .logo { height: 56px; }
          .logo img { max-width: 210px; }
          .mobile-actions .donate-mobile {
            padding: 8px 14px;
            font-size: 12.5px;
          }
        }

        @media (max-width: 360px) {
          .logo img { max-width: 170px; }
          .mobile-actions .donate-mobile {
            padding: 7px 12px;
            font-size: 11.5px;
          }
        }
      </style>

      <header class="header" role="banner">
        <div class="accent-bar"></div>
        <nav class="nav" aria-label="Main navigation">
          <div class="logo">
            <a href="https://www.bigdogsdontcry.com/" target="_top" aria-label="Big Dogs Don't Cry — Home">
              <img src="https://static.wixstatic.com/media/4cb683_a8d649d3589846568a30460f1d077d32~mv2.png" alt="Big Dogs Don't Cry" />
            </a>
          </div>

          <ul class="nav-menu" role="menubar">
            <li role="none">
              <a class="nav-link" href="https://www.bigdogsdontcry.com/" target="_top" role="menuitem">Home</a>
            </li>

            <li class="dropdown" role="none">
              <button class="dropdown-trigger" type="button" aria-haspopup="true" aria-expanded="false" role="menuitem">
                Applications
                ${this.chevronSvg()}
              </button>
              <div class="dropdown-menu" role="menu">
                <a class="dropdown-link" href="https://airtable.com/embed/appWyR26n0mjaXNwu/shrodhuFKkzL5mCjX?backgroundColor=gray" target="_blank" rel="noopener noreferrer">Adoption Application</a>
                <a class="dropdown-link" href="https://airtable.com/embed/apprlVtBQNP5OwGsI/shrVmvAUUQ6xCKMrf?backgroundColor=gray" target="_blank" rel="noopener noreferrer">Foster Application</a>
                <a class="dropdown-link" href="https://airtable.com/embed/appqKxAMX4xyWWB4j/shrklnKjkfaVYmbV0?backgroundColor=gray" target="_blank" rel="noopener noreferrer">Volunteer Application</a>
              </div>
            </li>

            <li role="none">
              <a class="nav-link" href="https://www.bigdogsdontcry.com/adoptable" target="_top" role="menuitem">View Pets</a>
            </li>

            <li role="none">
              <a class="nav-link" href="https://www.bigdogsdontcry.com/events" target="_top" role="menuitem">Events</a>
            </li>

            <li class="dropdown" role="none">
              <button class="dropdown-trigger" type="button" aria-haspopup="true" aria-expanded="false" role="menuitem">
                FAQs
                ${this.chevronSvg()}
              </button>
              <div class="dropdown-menu" role="menu">
                <a class="dropdown-link" href="https://www.bigdogsdontcry.com/adoption-requirements" target="_top">Adoption Requirements</a>
                <a class="dropdown-link" href="https://www.bigdogsdontcry.com/foster-requirements" target="_top">Foster Requirements</a>
              </div>
            </li>

            <li class="dropdown" role="none">
              <button class="dropdown-trigger" type="button" aria-haspopup="true" aria-expanded="false" role="menuitem">
                About Us
                ${this.chevronSvg()}
              </button>
              <div class="dropdown-menu" role="menu">
                <a class="dropdown-link" href="https://www.bigdogsdontcry.com/who-we-are" target="_top">Who We Are</a>
                <a class="dropdown-link" href="https://www.bigdogsdontcry.com/volunteers" target="_top">Volunteers</a>
                <a class="dropdown-link" href="https://www.bigdogsdontcry.com/contact-us-now" target="_top">Contact Us</a>
              </div>
            </li>

            <li class="dropdown" role="none">
              <button class="dropdown-trigger" type="button" aria-haspopup="true" aria-expanded="false" role="menuitem">
                Partners
                ${this.chevronSvg()}
              </button>
              <div class="dropdown-menu" role="menu">
                <a class="dropdown-link" href="https://www.bigdogsdontcry.com/dna-my-dog" target="_top">DNA My Dog</a>
                <a class="dropdown-link" href="https://www.bigdogsdontcry.com/down-south-doggies" target="_top">Down South Doggies</a>
                <a class="dropdown-link" href="https://www.bigdogsdontcry.com/pet-friendly-plate" target="_top">Pet Friendly Plate</a>
              </div>
            </li>
          </ul>

          <div class="cta-group">
            <a class="btn btn-outline" href="https://airtable.com/embed/appWyR26n0mjaXNwu/shrodhuFKkzL5mCjX?backgroundColor=gray" target="_blank" rel="noopener noreferrer">Apply Now</a>
            <a class="btn btn-primary" href="https://www.bigdogsdontcry.com/donations" target="_top">
              ${this.heartSvg()} Donate
            </a>
          </div>

          <div class="mobile-actions">
            <a class="btn btn-primary donate-mobile" href="https://www.bigdogsdontcry.com/donations" target="_top">
              ${this.heartSvg()} Donate
            </a>
            <button class="hamburger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-overlay">
              <span></span><span></span><span></span>
            </button>
          </div>
        </nav>
      </header>

      <div class="mobile-overlay" id="mobile-overlay" aria-hidden="true">
        <aside class="mobile-panel" role="dialog" aria-label="Mobile navigation">
          <div class="mobile-header">
            <div class="mobile-title">
              ${this.pawSvg()}
              <span>Menu</span>
            </div>
            <button class="mobile-close" type="button" aria-label="Close menu">
              ${this.closeSvg()}
            </button>
          </div>

          <ul class="mobile-list">
            <li class="mobile-item">
              <a class="mobile-link" href="https://www.bigdogsdontcry.com/" target="_top">Home</a>
            </li>

            <li class="mobile-item">
              <button class="mobile-toggle" type="button" aria-expanded="false">
                Applications
                ${this.chevronSvg()}
              </button>
              <div class="mobile-submenu">
                <a class="mobile-sublink" href="https://airtable.com/embed/appWyR26n0mjaXNwu/shrodhuFKkzL5mCjX?backgroundColor=gray" target="_blank" rel="noopener noreferrer">Adoption Application</a>
                <a class="mobile-sublink" href="https://airtable.com/embed/apprlVtBQNP5OwGsI/shrVmvAUUQ6xCKMrf?backgroundColor=gray" target="_blank" rel="noopener noreferrer">Foster Application</a>
                <a class="mobile-sublink" href="https://airtable.com/embed/appqKxAMX4xyWWB4j/shrklnKjkfaVYmbV0?backgroundColor=gray" target="_blank" rel="noopener noreferrer">Volunteer Application</a>
              </div>
            </li>

            <li class="mobile-item">
              <a class="mobile-link" href="https://www.bigdogsdontcry.com/adoptable" target="_top">View Pets</a>
            </li>

            <li class="mobile-item">
              <a class="mobile-link" href="https://www.bigdogsdontcry.com/events" target="_top">Events</a>
            </li>

            <li class="mobile-item">
              <button class="mobile-toggle" type="button" aria-expanded="false">
                FAQs
                ${this.chevronSvg()}
              </button>
              <div class="mobile-submenu">
                <a class="mobile-sublink" href="https://www.bigdogsdontcry.com/adoption-requirements" target="_top">Adoption Requirements</a>
                <a class="mobile-sublink" href="https://www.bigdogsdontcry.com/foster-requirements" target="_top">Foster Requirements</a>
              </div>
            </li>

            <li class="mobile-item">
              <button class="mobile-toggle" type="button" aria-expanded="false">
                About Us
                ${this.chevronSvg()}
              </button>
              <div class="mobile-submenu">
                <a class="mobile-sublink" href="https://www.bigdogsdontcry.com/who-we-are" target="_top">Who We Are</a>
                <a class="mobile-sublink" href="https://www.bigdogsdontcry.com/volunteers" target="_top">Volunteers</a>
                <a class="mobile-sublink" href="https://www.bigdogsdontcry.com/contact-us-now" target="_top">Contact Us</a>
              </div>
            </li>

            <li class="mobile-item">
              <button class="mobile-toggle" type="button" aria-expanded="false">
                Partners
                ${this.chevronSvg()}
              </button>
              <div class="mobile-submenu">
                <a class="mobile-sublink" href="https://www.bigdogsdontcry.com/dna-my-dog" target="_top">DNA My Dog</a>
                <a class="mobile-sublink" href="https://www.bigdogsdontcry.com/down-south-doggies" target="_top">Down South Doggies</a>
                <a class="mobile-sublink" href="https://www.bigdogsdontcry.com/pet-friendly-plate" target="_top">Pet Friendly Plate</a>
              </div>
            </li>
          </ul>

          <div class="mobile-footer">
            <a class="btn btn-outline" href="https://airtable.com/embed/appWyR26n0mjaXNwu/shrodhuFKkzL5mCjX?backgroundColor=gray" target="_blank" rel="noopener noreferrer">Apply Now</a>
            <a class="btn btn-primary" href="https://www.bigdogsdontcry.com/donations" target="_top">
              ${this.heartSvg()} Donate
            </a>
          </div>
        </aside>
      </div>
    `;
  }

  chevronSvg() {
    return `<svg class="chevron" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  }

  heartSvg() {
    return `<svg class="heart" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 21s-7-4.5-9.5-9C0.8 8.5 2.5 4 6.5 4c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3 4 0 5.7 4.5 4 8-2.5 4.5-9.5 9-9.5 9z"/></svg>`;
  }

  pawSvg() {
    return `<svg class="paw" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="5" cy="9" r="2"/><circle cx="9.5" cy="5.5" r="2"/><circle cx="14.5" cy="5.5" r="2"/><circle cx="19" cy="9" r="2"/><path d="M12 11c-3.5 0-6 3-6 5.5 0 1.5 1 3 2.5 3 1.2 0 2-0.5 3.5-0.5s2.3 0.5 3.5 0.5c1.5 0 2.5-1.5 2.5-3 0-2.5-2.5-5.5-6-5.5z"/></svg>`;
  }

  closeSvg() {
    return `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M3 3L13 13M13 3L3 13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
  }

  initInteractions(shadow) {
    const header = shadow.querySelector('.header');
    const hamburger = shadow.querySelector('.hamburger');
    const overlay = shadow.querySelector('.mobile-overlay');
    const closeBtn = shadow.querySelector('.mobile-close');

    const openMobile = () => {
      hamburger.classList.add('active');
      overlay.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
      hamburger.setAttribute('aria-label', 'Close menu');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    const closeMobile = () => {
      hamburger.classList.remove('active');
      overlay.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Open menu');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      // Collapse all open submenus
      shadow.querySelectorAll('.mobile-item.open').forEach(item => {
        item.classList.remove('open');
        const t = item.querySelector('.mobile-toggle');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    };

    hamburger.addEventListener('click', () => {
      hamburger.classList.contains('active') ? closeMobile() : openMobile();
    });

    closeBtn.addEventListener('click', closeMobile);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeMobile();
    });

    // Mobile submenu toggles
    shadow.querySelectorAll('.mobile-toggle').forEach(toggle => {
      toggle.addEventListener('click', () => {
        const item = toggle.closest('.mobile-item');
        const isOpen = item.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(isOpen));
      });
    });

    // Close on link click
    shadow.querySelectorAll('.mobile-link, .mobile-sublink').forEach(link => {
      link.addEventListener('click', closeMobile);
    });

    // Escape key closes mobile menu
    this._keyHandler = (e) => {
      if (e.key === 'Escape' && hamburger.classList.contains('active')) closeMobile();
    };
    document.addEventListener('keydown', this._keyHandler);

    // Scroll-aware compaction
    this._scrollHandler = () => {
      if (window.scrollY > 24) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    window.addEventListener('scroll', this._scrollHandler, { passive: true });
    this._scrollHandler();

    // Auto-close mobile menu on resize to desktop
    this._resizeHandler = () => {
      if (window.innerWidth > 920 && hamburger.classList.contains('active')) {
        closeMobile();
      }
    };
    window.addEventListener('resize', this._resizeHandler);

    // Keyboard support: Enter/Space on dropdown trigger focuses first link
    shadow.querySelectorAll('.dropdown-trigger').forEach(trigger => {
      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const firstLink = trigger.parentElement.querySelector('.dropdown-link');
          if (firstLink) firstLink.focus();
        }
      });
    });
  }
}

if (!customElements.get('bddc-header')) {
  customElements.define('bddc-header', BddcHeader);
}
