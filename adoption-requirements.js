/**
 * <adoption-requirements> — Wix Studio Custom Element
 * Big Dogs Don't Cry Animal Rescue
 *
 * Usage in Wix Studio:
 *   1. Add a Custom Element to the page
 *   2. Server URL: https://justthescript.github.io/BDDC-Pages/adoption-requirements.js
 *   3. Tag Name: adoption-requirements
 */

class AdoptionRequirements extends HTMLElement {
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
          margin-bottom: 10px;
        }

        .requirement-item p:last-child {
          margin-bottom: 0;
        }

        .requirement-item ul {
          margin-left: 60px;
          margin-top: 10px;
          margin-bottom: 10px;
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
        <h1>Adoption Requirements</h1>
        <p>Thank you for considering adopting from Big Dogs Don't Cry! Below you'll find the requirements for our adoption program to help prepare you for the application process.</p>
      </div>

      <div class="container">
        <section class="requirements-section">
          <h2 class="section-title">Adoption Requirements</h2>
          <p class="section-intro">
            Adopting a rescue dog is a lifelong commitment and one of the most rewarding experiences! We carefully review all applications to ensure the best match between our dogs and their forever families.
          </p>

          <div class="requirement-item fade-in">
            <h3>Age Requirement</h3>
            <p>All adopters must be at least 18 years of age and able to sign a legally binding adoption contract. If you live with parents, they must be contacted during the adoption process to verify approval.</p>
          </div>

          <div class="requirement-item fade-in">
            <h3>Valid Identification</h3>
            <p>You must provide a valid government-issued photo ID (driver's license or state ID).</p>
          </div>

          <div class="requirement-item fade-in">
            <h3>Housing Verification</h3>
            <p>Housing requirements to ensure a safe environment for our dogs:</p>
            <ul>
              <li><strong>Renters:</strong> Must provide written landlord approval for pets</li>
              <li><strong>Homeowners:</strong> Must verify homeowner's insurance covers dogs (we can provide recommendations for pet-friendly insurance companies)</li>
              <li>Must verify no breed-specific legislation exists in your community</li>
              <li>All household members must agree to the adoption and be present for meet and greet</li>
            </ul>
          </div>

          <div class="requirement-item fade-in">
            <h3>Current Pets</h3>
            <p>If you currently have pets, the following are required:</p>
            <ul>
              <li><strong>Dogs:</strong> Current on Rabies and DA2PP vaccinations, recent heartworm test, and spayed/neutered</li>
              <li><strong>Cats:</strong> Current on Rabies vaccination, spayed/neutered, and a recent wellness visit</li>
              <li>We will contact your veterinarian to verify vaccination history and general pet care</li>
              <li>A dog-to-dog meet and greet is required if you have another dog in your home</li>
            </ul>
          </div>

          <div class="requirement-item fade-in">
            <h3>Veterinary Reference</h3>
            <p>We require contact information for your current or most recent veterinarian. We will verify:</p>
            <ul>
              <li>Your pets are current on vaccinations</li>
              <li>Your pets receive regular veterinary care</li>
              <li>Your pets are spayed/neutered</li>
            </ul>
            <p>If you haven't had pets before, we'll discuss your plan for veterinary care during the adoption process.</p>
          </div>

          <div class="requirement-item fade-in">
            <h3>Personal References</h3>
            <p>We require 2-3 personal references who can speak to your ability to care for a pet long-term. References cannot include family members, veterinarians, or BDDC Board Members.</p>
          </div>

          <div class="requirement-item fade-in">
            <h3>Home Visit</h3>
            <p>A home visit may be required to ensure your home provides a safe environment for your new dog. Home visits may be conducted in person or virtually. During the visit, we will:</p>
            <ul>
              <li>Walk through your home and yard to check for safety concerns</li>
              <li>Discuss your lifestyle and which dogs might be the best fit</li>
              <li>Answer any questions you have about bringing your new dog home</li>
            </ul>
          </div>

          <div class="requirement-item fade-in">
            <h3>Meet and Greet</h3>
            <p>Before finalizing an adoption, a meet and greet is required:</p>
            <ul>
              <li>We recommend that all family members (including children) meet the dog</li>
              <li>If you have dogs, a dog-to-dog introduction will be arranged on neutral ground</li>
              <li>Meet and greets help ensure compatibility and set everyone up for success</li>
            </ul>
          </div>

          <div class="requirement-item fade-in">
            <h3>Adoption Contract & Fees</h3>
            <p>Upon approval, you will be required to:</p>
            <ul>
              <li>Sign our legally binding adoption contract</li>
              <li>Pay the adoption fee (varies by animal — see individual pet listings, typically between $150 and $600 based on breed, age, and medical needs)</li>
              <li>Agree to return the dog to Big Dogs Don't Cry if you can no longer care for them</li>
              <li>Keep the dog on leash when in unfenced areas</li>
              <li>Provide ongoing veterinary care, proper nutrition, and a loving home</li>
            </ul>
          </div>

          <div class="notice-box">
            <h3>Application Hold Policy</h3>
            <p><strong>Upon approval of your application, we will hold the pet for up to 48 hours for you to schedule a meet & greet or choose to adopt.</strong> This gives you time to make arrangements while ensuring our dogs don't wait too long for their forever homes. After 48 hours, if we haven't heard from you, we will begin considering other approved applications. Once multiple applications are approved, adoptions are completed on a first-come, first-served basis. We appreciate your understanding as we work to find homes for all our dogs as quickly as possible!</p>
          </div>

          <div class="requirement-item fade-in">
            <h3>What's Included</h3>
            <p>All adopted dogs from Big Dogs Don't Cry come:</p>
            <ul>
              <li>Spayed or neutered</li>
              <li>Current on age-appropriate vaccinations</li>
              <li>Microchipped for identification</li>
              <li>Tested for heartworms and on preventative</li>
              <li>Treated with flea/tick prevention</li>
              <li>With lifetime support from our rescue</li>
            </ul>
          </div>
        </section>

        <div class="cta-section">
          <h2>Ready to Find Your New Best Friend?</h2>
          <p>Adopting a rescue dog is a life-changing experience for both you and your new family member. We're here to help you every step of the way to find the perfect match for your home and lifestyle.</p>
          <div class="cta-buttons">
            <a href="https://www.bigdogsdontcry.com/adoption-application" class="btn btn-primary">Apply to Adopt</a>
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

if (!customElements.get('adoption-requirements')) {
  customElements.define('adoption-requirements', AdoptionRequirements);
}
