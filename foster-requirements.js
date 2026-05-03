/**
 * <foster-requirements> — Wix Studio Custom Element
 * Big Dogs Don't Cry Animal Rescue
 *
 * Usage in Wix Studio:
 *   1. Add a Custom Element to the page
 *   2. Server URL: <hosted URL of this file>
 *   3. Tag Name: foster-requirements
 */

class FosterRequirements extends HTMLElement {
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
          max-width: 1200px;
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
          margin-bottom: 15px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        }

        .page-header p {
          font-size: 1.1rem;
          max-width: 700px;
          margin: 0 auto;
          opacity: 0.95;
        }

        /* Sections */
        .requirements-section {
          background: white;
          border-radius: 12px;
          padding: 50px 40px;
          margin-bottom: 40px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .requirements-section:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 30px rgba(0,0,0,0.12);
        }

        .section-title {
          font-size: 2rem;
          color: #667eea;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 3px solid #764ba2;
          display: inline-block;
        }

        .section-intro {
          font-size: 1.1rem;
          color: #555;
          margin-bottom: 30px;
          line-height: 1.8;
        }

        /* Requirement items */
        .requirement-item {
          background: #f9f9f9;
          border-left: 4px solid #667eea;
          padding: 20px 25px;
          margin-bottom: 20px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .requirement-item:hover {
          background: #f0f4ff;
          border-left-color: #764ba2;
          transform: translateX(5px);
        }

        .requirement-item h3 {
          color: #667eea;
          font-size: 1.3rem;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
        }

        .requirement-item h3:before {
          content: "✓";
          background: #667eea;
          color: white;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
          font-weight: bold;
          font-size: 1.1rem;
          flex-shrink: 0;
        }

        .requirement-item p {
          color: #555;
          line-height: 1.7;
          margin-left: 40px;
        }

        .requirement-item ul {
          margin-left: 60px;
          margin-top: 10px;
        }

        .requirement-item li {
          color: #555;
          margin-bottom: 8px;
          line-height: 1.6;
        }

        /* Notice box */
        .notice-box {
          background: linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%);
          border-radius: 10px;
          padding: 25px 30px;
          margin: 30px 0;
          border-left: 5px solid #e17055;
          box-shadow: 0 3px 15px rgba(0,0,0,0.1);
        }

        .notice-box h3 {
          color: #d63031;
          margin-bottom: 12px;
          font-size: 1.3rem;
          display: flex;
          align-items: center;
        }

        .notice-box h3:before {
          content: "⚠";
          font-size: 1.5rem;
          margin-right: 10px;
        }

        .notice-box p {
          color: #2d3436;
          line-height: 1.8;
          font-weight: 500;
        }

        /* CTA */
        .cta-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 50px 40px;
          border-radius: 12px;
          text-align: center;
          margin-top: 50px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }

        .cta-section h2 {
          font-size: 2rem;
          margin-bottom: 20px;
        }

        .cta-section p {
          font-size: 1.1rem;
          margin-bottom: 30px;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn {
          padding: 15px 35px;
          font-size: 1.1rem;
          font-weight: 600;
          text-decoration: none;
          border-radius: 50px;
          transition: all 0.3s ease;
          display: inline-block;
          cursor: pointer;
          border: none;
        }

        .btn-primary {
          background: white;
          color: #667eea;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }

        .btn-primary:hover {
          background: #f8f8f8;
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.25);
        }

        .btn-secondary {
          background: transparent;
          color: white;
          border: 2px solid white;
        }

        .btn-secondary:hover {
          background: rgba(255,255,255,0.1);
          transform: translateY(-3px);
        }

        /* Animation entry state */
        .requirement-item.fade-in {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .requirement-item.fade-in.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Mobile */
        @media (max-width: 768px) {
          .page-header h1 { font-size: 2rem; }
          .page-header { padding: 40px 20px 30px; }
          .requirements-section { padding: 30px 20px; }
          .section-title { font-size: 1.6rem; }
          .requirement-item { padding: 15px 20px; }
          .requirement-item h3 { font-size: 1.1rem; }
          .requirement-item p { margin-left: 0; }
          .requirement-item ul { margin-left: 20px; }
          .cta-section { padding: 35px 20px; }
          .cta-buttons { flex-direction: column; align-items: stretch; }
          .btn { width: 100%; }
        }

        @media print {
          .cta-section { display: none; }
        }
      </style>

      <div class="page-header">
        <h1>Foster Requirements</h1>
        <p>Thank you for considering fostering with Big Dogs Don't Cry! Below you'll find the requirements for our foster program to help prepare you for the application process.</p>
      </div>

      <div class="container">
        <section class="requirements-section">
          <h2 class="section-title">Foster Requirements</h2>
          <p class="section-intro">
            Fostering saves lives! By opening your home temporarily to a dog in need, you're providing them with a loving environment while freeing up space for us to rescue another animal. Our foster program is the backbone of our rescue efforts.
          </p>

          <div class="requirement-item fade-in">
            <h3>Age Requirement</h3>
            <p>All foster parents must be at least 18 years of age. If you live with parents or roommates, all household members must agree to foster.</p>
          </div>

          <div class="requirement-item fade-in">
            <h3>Location</h3>
            <p>Foster homes must be located within Northwest Indiana or the greater Chicago area (within 2 hours of Merrillville, IN) to ensure accessibility for veterinary appointments and adoption events.</p>
          </div>

          <div class="requirement-item fade-in">
            <h3>Housing Requirements</h3>
            <p>All housing types are welcome! However, specific requirements include:</p>
            <ul>
              <li>If renting, you must have landlord approval for pets and provide written permission</li>
              <li>A safe, secure environment for the foster dog</li>
              <li>All household members must meet the foster dog and agree to participate</li>
              <li>Children in the household must be at least 7 years old</li>
            </ul>
          </div>

          <div class="requirement-item fade-in">
            <h3>Current Pets</h3>
            <p>If you have pets currently in your home, the following are required:</p>
            <ul>
              <li><strong>Dogs:</strong> Current on Rabies and DA2PP vaccinations, recent heartworm test, and spayed/neutered</li>
              <li><strong>Cats:</strong> Current on Rabies vaccination, spayed/neutered, and a recent wellness visit</li>
              <li>Veterinary records will be verified prior to approval</li>
              <li>We recommend consulting with your veterinarian before fostering to ensure all pets are healthy</li>
            </ul>
          </div>

          <div class="requirement-item fade-in">
            <h3>Time Commitment</h3>
            <p>Foster commitments vary based on each dog's needs. We request a minimum commitment of two weeks, though most foster periods last until adoption (typically 4-8 weeks). Fosters should be able to provide:</p>
            <ul>
              <li>Daily care, feeding, and exercise</li>
              <li>Basic training and socialization</li>
              <li>Transportation to veterinary appointments and adoption events as needed</li>
              <li>Approximately 2 hours per day for exercise, play, and interaction</li>
            </ul>
          </div>

          <div class="requirement-item fade-in">
            <h3>Responsibilities</h3>
            <p>As a foster parent, you will provide:</p>
            <ul>
              <li>A safe and loving temporary home environment</li>
              <li>Patience and understanding as the dog adjusts</li>
              <li>Regular updates including photos and behavioral observations</li>
              <li>Supervision during all meet and greets with potential adopters</li>
              <li>Availability for adoption events (typically on weekends)</li>
              <li>Administration of medications if needed (with training provided)</li>
            </ul>
          </div>

          <div class="requirement-item fade-in">
            <h3>What We Provide</h3>
            <p>Big Dogs Don't Cry covers all approved medical expenses. The following supplies can be provided on request:</p>
            <ul>
              <li>Food and treats</li>
              <li>Crate, bed, and bedding</li>
              <li>Collar, leash, and ID tag</li>
              <li>Toys and enrichment items</li>
              <li>Support from our foster coordinators and experienced foster community</li>
            </ul>
          </div>

          <div class="notice-box">
            <h3>Important Note for Fosters</h3>
            <p>Foster dogs will be listed publicly and actively promoted for adoption while in your care. If you're interested in adopting your foster dog, you must submit an adoption application and go through our standard adoption process. Foster parents do not receive priority placement but are certainly welcome to apply!</p>
          </div>
        </section>

        <div class="cta-section">
          <h2>Ready to Open Your Home?</h2>
          <p>Fostering is a rewarding way to save lives without a lifetime commitment. Every foster family makes it possible for us to rescue another dog in need. We'll support you every step of the way!</p>
          <div class="cta-buttons">
            <a href="https://www.bigdogsdontcry.com/foster-application" class="btn btn-primary">Apply to Foster</a>
            <a href="https://www.bigdogsdontcry.com/adoptable" class="btn btn-secondary">View Available Pets</a>
          </div>
        </div>
      </div>
    `;
  }

  initAnimations(shadow) {
    const items = shadow.querySelectorAll('.requirement-item.fade-in');
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

if (!customElements.get('foster-requirements')) {
  customElements.define('foster-requirements', FosterRequirements);
}
