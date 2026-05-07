/**
 * <bddc-reimbursement> — Wix Studio Custom Element
 * Big Dogs Don't Cry Animal Rescue — Reimbursement Form
 *
 * For team members and fosters submitting receipts for approved expenses.
 * Submits to the same GAS endpoint as the member-area forms with type='reimbursement'.
 *
 * Usage in Wix Studio:
 *   1. Add a Custom Element to /reimbursement
 *   2. Server URL: https://cdn.jsdelivr.net/gh/justthescript/BDDC-Pages@main/bddc-reimbursement.js
 *   3. Tag Name:   bddc-reimbursement
 */

(function () {
  const GAS_ENDPOINT = 'https://script.google.com/macros/s/REPLACE_WITH_YOUR_DEPLOYED_GAS_URL/exec';

  const DEFAULT_HERO_IMAGE =
    'https://static.wixstatic.com/media/bc59b6_604fb6f09a314f219daf30e354c81e5a~mv2.webp';
  const PAW_ICON_URL =
    'https://static.wixstatic.com/media/bc59b6_45db072b49a5427f930919d18683e36d~mv2.png';

  // BDDC team members who can authorize expenses
  // (Edit this list as the team changes)
  const AUTHORIZERS = [
    { value: '', label: 'Select…' },
    { value: 'Krystal Zamora', label: 'Krystal Zamora (President)' },
    { value: 'Amanda McKenzie', label: 'Amanda McKenzie (VP / Treasurer)' },
    { value: 'Patricia Perez', label: 'Patricia Perez (Executive Admin)' },
    { value: 'Jenny Burton', label: 'Jenny Burton (Medical Records)' },
    { value: 'Michele Lyczak', label: 'Michele Lyczak (Foster Co-Director)' },
    { value: 'Tiffani Johnson', label: 'Tiffani Johnson (Volunteer Mgmt)' },
    { value: 'Kelsey Mathis', label: 'Kelsey Mathis (Fundraising Co-Director)' },
    { value: 'Amber Hamilton', label: 'Amber Hamilton (Post-Adoption Chair)' },
    { value: 'Other', label: 'Other (specify in notes)' },
    { value: 'No prior authorization', label: 'No prior authorization' }
  ];

  const EXPENSE_CATEGORIES = [
    { value: '', label: 'Select category…' },
    { value: 'Veterinary', label: '🏥 Veterinary care' },
    { value: 'Medication', label: '💊 Medication' },
    { value: 'Food & Treats', label: '🍖 Food & treats' },
    { value: 'Supplies', label: '🛍️ Supplies (crate, leash, bedding)' },
    { value: 'Grooming', label: '✂️ Grooming' },
    { value: 'Transport', label: '🚗 Transport / mileage' },
    { value: 'Training', label: '🎓 Training' },
    { value: 'Event', label: '🎪 Event expenses' },
    { value: 'Office', label: '📎 Office / admin' },
    { value: 'Other', label: 'Other' }
  ];

  const PAYMENT_METHODS = [
    { value: '', label: 'Select…' },
    { value: 'Zelle', label: '⚡ Zelle' },
    { value: 'Venmo', label: '💸 Venmo' },
    { value: 'PayPal', label: '💳 PayPal' },
    { value: 'Check by mail', label: '✉️ Check by mail' },
    { value: 'Direct deposit', label: '🏦 Direct deposit (BDDC will follow up for details)' }
  ];

  class BDDCReimbursement extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
      this.render();
      this.bindEvents();
      this.observeReveal();
    }

    render() {
      const heroImage = this.getAttribute('data-hero-image') || DEFAULT_HERO_IMAGE;
      const userEmail = this.getAttribute('data-user-email') || '';
      const userName = this.getAttribute('data-user-name') || '';
      this._userEmail = userEmail;
      this._userName = userName;

      this.shadowRoot.innerHTML = `
        <style>${this.styles()}</style>

        <section class="hero" style="--hero-bg: url('${heroImage}');">
          <div class="hero-inner">
            <div class="hero-badge">💰 Reimbursement</div>
            <h1 class="hero-title">Reimbursement Form</h1>
            <p class="hero-tagline">Submit receipts for approved expenses.</p>
          </div>
        </section>

        <div class="page-body">
          <section class="intro reveal">
            <p>
              Spent your own money on something for the rescue? Submit it here. Reimbursements
              typically process within <strong>5–10 business days</strong> after approval.
            </p>
          </section>

          <section class="info-callout reveal">
            <div class="callout-icon" aria-hidden="true">📋</div>
            <div class="callout-content">
              <strong>Before you submit:</strong>
              <ul>
                <li>Have a clear photo of your receipt ready (one image per submission)</li>
                <li>Know who authorized the expense (or if it was an emergency)</li>
                <li>Have your preferred payment method info ready</li>
              </ul>
            </div>
          </section>

          <section class="form-card reveal">
            <div class="paw-watermark" aria-hidden="true"></div>
            <form id="reimb-form" novalidate>

              <h3 class="form-section-title">Your Information</h3>

              <div class="form-grid">
                <div class="form-row">
                  <label for="f-name">Your Name <span class="req">*</span></label>
                  <input type="text" id="f-name" name="submitterName" required value="${escapeAttr(userName)}">
                </div>
                <div class="form-row">
                  <label for="f-email">Your Email <span class="req">*</span></label>
                  <input type="email" id="f-email" name="submitterEmail" required value="${escapeAttr(userEmail)}">
                </div>
                <div class="form-row">
                  <label for="f-phone">Phone (optional)</label>
                  <input type="tel" id="f-phone" name="submitterPhone">
                </div>
                <div class="form-row">
                  <label for="f-role">Your role at BDDC</label>
                  <select id="f-role" name="submitterRole">
                    <option value="">Select…</option>
                    <option value="Foster">Foster</option>
                    <option value="Volunteer">Volunteer</option>
                    <option value="Board Member">Board Member</option>
                    <option value="Director">Director</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <h3 class="form-section-title">Expense Details</h3>

              <div class="form-grid">
                <div class="form-row">
                  <label for="f-amount">Amount <span class="req">*</span></label>
                  <div class="input-with-prefix">
                    <span class="input-prefix">$</span>
                    <input type="number" id="f-amount" name="amount" required step="0.01" min="0" placeholder="0.00">
                  </div>
                </div>
                <div class="form-row">
                  <label for="f-date">Date of expense <span class="req">*</span></label>
                  <input type="date" id="f-date" name="expenseDate" required>
                </div>
                <div class="form-row span-2">
                  <label for="f-category">Category <span class="req">*</span></label>
                  <select id="f-category" name="category" required>
                    ${EXPENSE_CATEGORIES.map(o => `<option value="${escapeAttr(o.value)}">${escapeHtml(o.label)}</option>`).join('')}
                  </select>
                </div>
                <div class="form-row span-2">
                  <label for="f-vendor">Vendor / Where purchased</label>
                  <input type="text" id="f-vendor" name="vendor" placeholder="e.g., Petco, Banfield, Amazon">
                </div>
                <div class="form-row span-2">
                  <label for="f-pet">Related pet (if applicable)</label>
                  <input type="text" id="f-pet" name="relatedPet" placeholder="e.g., Giana, Bianca">
                </div>
                <div class="form-row span-2">
                  <label for="f-description">What was purchased <span class="req">*</span></label>
                  <textarea id="f-description" name="description" rows="3" required placeholder="Brief description — what, why, and any context we should know"></textarea>
                </div>
              </div>

              <h3 class="form-section-title">Authorization</h3>

              <div class="form-grid">
                <div class="form-row span-2">
                  <label for="f-authorizer">Who authorized this expense? <span class="req">*</span></label>
                  <select id="f-authorizer" name="authorizer" required>
                    ${AUTHORIZERS.map(o => `<option value="${escapeAttr(o.value)}">${escapeHtml(o.label)}</option>`).join('')}
                  </select>
                  <p class="field-hint">If this was an emergency without time for prior approval, choose "No prior authorization" and explain in notes below.</p>
                </div>
                <div class="form-row span-2">
                  <label for="f-notes">Notes (optional)</label>
                  <textarea id="f-notes" name="notes" rows="3" placeholder="Anything else we should know — special circumstances, pre-approved budget, etc."></textarea>
                </div>
              </div>

              <h3 class="form-section-title">Receipt</h3>

              <div class="form-row span-2">
                <label for="f-receipt">Photo of receipt <span class="req">*</span></label>
                <input type="file" id="f-receipt" name="receipt" accept="image/*,application/pdf" required>
                <p class="field-hint">JPG, PNG, or PDF. Max 8MB. Make sure the total and date are clearly visible.</p>
              </div>

              <h3 class="form-section-title">Payment Preference</h3>

              <div class="form-grid">
                <div class="form-row">
                  <label for="f-method">How would you like to be paid? <span class="req">*</span></label>
                  <select id="f-method" name="paymentMethod" required>
                    ${PAYMENT_METHODS.map(o => `<option value="${escapeAttr(o.value)}">${escapeHtml(o.label)}</option>`).join('')}
                  </select>
                </div>
                <div class="form-row">
                  <label for="f-handle">Account / Handle</label>
                  <input type="text" id="f-handle" name="paymentHandle" placeholder="Email, phone, or @username">
                  <p class="field-hint">For Zelle/Venmo/PayPal. We'll follow up if direct deposit.</p>
                </div>
              </div>

              <div class="form-row">
                <label class="checkbox-label">
                  <input type="checkbox" id="f-attest" name="attestation" required>
                  <span>I confirm that this expense was for Big Dogs Don't Cry rescue work and that the receipt and amount above are accurate.</span>
                </label>
              </div>

              <div class="form-row">
                <button type="submit" class="btn btn-primary submit-btn">
                  💰 Submit Reimbursement Request
                </button>
              </div>

              <div class="form-status" aria-live="polite"></div>

            </form>
          </section>

          <section class="footer-note reveal">
            <p>
              <strong>Questions about a reimbursement?</strong>
              Email <a href="mailto:bigdogsdontcryrescue@gmail.com">bigdogsdontcryrescue@gmail.com</a>
              or reach out to the Treasurer.
            </p>
          </section>
        </div>
      `;
    }

    bindEvents() {
      const form = this.shadowRoot.getElementById('reimb-form');
      form.addEventListener('submit', (e) => this.handleSubmit(e, form));
    }

    async handleSubmit(e, form) {
      e.preventDefault();
      const statusEl = form.querySelector('.form-status');
      const submitBtn = form.querySelector('.submit-btn');

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      submitBtn.disabled = true;
      const originalLabel = submitBtn.textContent;
      submitBtn.textContent = 'Submitting…';
      statusEl.className = 'form-status sending';
      statusEl.textContent = 'Submitting your reimbursement request…';

      try {
        const fields = {};
        const fileFields = [];
        for (const el of form.elements) {
          if (!el.name) continue;
          if (el.type === 'checkbox') {
            fields[el.name] = el.checked ? 'Yes' : 'No';
          } else if (el.type === 'file') {
            fileFields.push({ name: el.name, files: el.files });
          } else if (el.value) {
            fields[el.name] = el.value;
          }
        }

        const filesData = [];
        for (const ff of fileFields) {
          for (const file of ff.files) {
            if (file.size > 8 * 1024 * 1024) {
              throw new Error(`File "${file.name}" is over 8MB. Please resize and try again.`);
            }
            const base64 = await fileToBase64(file);
            filesData.push({
              fieldName: ff.name,
              filename: file.name,
              mimeType: file.type,
              base64
            });
          }
        }

        const payload = {
          type: 'reimbursement',
          memberType: 'employee',
          submittedAt: new Date().toISOString(),
          userEmail: this._userEmail,
          userName: this._userName,
          fields,
          files: filesData
        };

        const res = await fetch(GAS_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload)
        });

        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        const result = await res.json().catch(() => ({}));
        if (result.error) throw new Error(result.error);

        statusEl.className = 'form-status success';
        statusEl.innerHTML = `<strong>✓ Reimbursement submitted!</strong> The Treasurer will review and process within 5–10 business days. You'll get an email confirmation shortly.`;
        form.reset();
        submitBtn.textContent = 'Submitted ✓';
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = originalLabel;
        }, 4000);
      } catch (err) {
        console.error('[bddc-reimbursement] submit error', err);
        statusEl.className = 'form-status error';
        statusEl.innerHTML = `<strong>⚠️ Couldn't submit right now.</strong> ${escapeHtml(err.message || 'Please try again or email us at bigdogsdontcryrescue@gmail.com.')}`;
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      }
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
          --warning: #ffa726;
          --warning-deep: #b65500;
          --warning-bg: #fff4e0;
          --green: #2a9d8f;
          --ink: #2a2a2a;
          --muted: #555;
          --shadow-sm: 0 4px 12px rgba(0,0,0,0.08);
          --shadow-md: 0 8px 22px rgba(245,54,124,0.20);
          display: block;
          width: 100%;
          font-family: "Raleway", "Quicksand", "Segoe UI", system-ui, -apple-system, Arial, sans-serif;
          color: var(--ink);
          box-sizing: border-box;
        }
        * { box-sizing: border-box; }
        a { color: var(--pink-deep); }

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

        .page-body {
          max-width: 920px;
          margin: 0 auto;
          padding: 32px 20px 56px;
        }

        .intro {
          max-width: 720px;
          margin: 0 auto 24px;
          text-align: center;
        }
        .intro p {
          margin: 0;
          font-size: clamp(15px, 1.3vw, 17px);
          line-height: 1.65;
          color: var(--ink);
        }
        .intro strong { color: var(--pink-deep); }

        .info-callout {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 18px;
          padding: 20px 24px;
          background: var(--pink-bg);
          border-left: 4px solid var(--pink);
          border-radius: 10px;
          margin-bottom: 28px;
        }
        .callout-icon {
          font-size: 32px;
          line-height: 1;
        }
        .callout-content strong {
          display: block;
          margin-bottom: 8px;
          color: var(--pink-deep);
        }
        .callout-content ul {
          margin: 0;
          padding-left: 18px;
        }
        .callout-content li {
          margin: 4px 0;
          font-size: 14px;
          color: var(--ink);
          line-height: 1.55;
        }

        .form-card {
          position: relative;
          background: #fff;
          border: 2px solid var(--pink-soft);
          border-radius: 18px;
          padding: clamp(24px, 3vw, 36px);
          box-shadow: var(--shadow-sm);
          overflow: hidden;
          margin-bottom: 24px;
        }
        .paw-watermark {
          position: absolute;
          top: -30px;
          right: -30px;
          width: 180px;
          height: 180px;
          background-image: url('${PAW_ICON_URL}');
          background-repeat: no-repeat;
          background-size: contain;
          opacity: 0.05;
          pointer-events: none;
          transform: rotate(-12deg);
        }

        .form-section-title {
          margin: 24px 0 14px;
          color: var(--pink);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding-bottom: 8px;
          border-bottom: 2px solid var(--pink-soft);
          position: relative;
          z-index: 1;
        }
        .form-section-title:first-child { margin-top: 0; }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px 18px;
          position: relative;
          z-index: 1;
        }
        .form-row {
          display: flex;
          flex-direction: column;
          gap: 6px;
          position: relative;
          z-index: 1;
        }
        .form-row.span-2 { grid-column: span 2; }
        .form-row label {
          font-size: 14px;
          font-weight: 700;
          color: var(--ink);
        }
        .req { color: var(--pink); margin-left: 2px; }
        .form-row input[type="text"],
        .form-row input[type="email"],
        .form-row input[type="tel"],
        .form-row input[type="number"],
        .form-row input[type="date"],
        .form-row select,
        .form-row textarea {
          padding: 11px 14px;
          border: 2px solid var(--pink-soft);
          border-radius: 10px;
          font-size: 15px;
          font-family: inherit;
          background: var(--pink-bg);
          color: var(--ink);
          transition: border-color .2s ease, background .2s ease, box-shadow .2s ease;
        }
        .form-row textarea {
          resize: vertical;
          min-height: 70px;
        }
        .form-row input:focus,
        .form-row select:focus,
        .form-row textarea:focus {
          outline: none;
          border-color: var(--pink);
          background: #fff;
          box-shadow: 0 0 0 4px rgba(245,54,124,0.10);
        }
        .form-row input[type="file"] {
          padding: 10px 14px;
          border: 2px dashed var(--pink-soft);
          border-radius: 10px;
          background: var(--pink-bg);
          font-size: 14px;
          font-family: inherit;
          cursor: pointer;
        }
        .form-row input[type="file"]:hover {
          border-color: var(--pink);
        }
        .input-with-prefix {
          position: relative;
          display: flex;
          align-items: stretch;
        }
        .input-prefix {
          padding: 11px 12px;
          background: var(--pink-soft);
          border: 2px solid var(--pink-soft);
          border-right: 0;
          border-radius: 10px 0 0 10px;
          color: var(--pink-deep);
          font-weight: 700;
          font-size: 16px;
        }
        .input-with-prefix input {
          flex: 1;
          border-radius: 0 10px 10px 0 !important;
          border-left: 0 !important;
        }
        .field-hint {
          margin: 4px 0 0;
          font-size: 12.5px;
          color: var(--muted);
          font-style: italic;
        }
        .checkbox-label {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 14px 16px;
          background: var(--pink-bg);
          border: 2px solid var(--pink-soft);
          border-radius: 10px;
          cursor: pointer;
          transition: background .15s ease, border-color .15s ease;
        }
        .checkbox-label:hover {
          background: #fff;
          border-color: var(--pink);
        }
        .checkbox-label input[type="checkbox"] {
          margin-top: 2px;
          width: 18px;
          height: 18px;
          accent-color: var(--pink);
          flex-shrink: 0;
        }
        .checkbox-label span {
          font-size: 14px;
          line-height: 1.5;
          font-weight: 500;
          color: var(--ink);
        }

        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 32px;
          border-radius: 999px;
          text-decoration: none;
          font-weight: 700;
          font-size: 15px;
          font-family: inherit;
          cursor: pointer;
          border: 0;
          transition: transform .12s ease, box-shadow .2s ease;
        }
        .btn-primary {
          background: linear-gradient(135deg, var(--pink) 0%, var(--pink-deep) 100%);
          color: #fff;
          box-shadow: 0 6px 18px rgba(245,54,124,0.30);
        }
        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(245,54,124,0.40);
        }
        .btn-primary:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .form-status {
          margin: 12px 0 0;
          font-size: 14px;
          line-height: 1.5;
          padding: 0;
          border-radius: 10px;
          transition: padding .2s ease;
        }
        .form-status.sending,
        .form-status.success,
        .form-status.error {
          padding: 14px 16px;
        }
        .form-status.sending {
          background: var(--pink-bg);
          color: var(--pink-deep);
          border-left: 4px solid var(--pink);
        }
        .form-status.success {
          background: #e7f5ee;
          color: #1f5c4d;
          border-left: 4px solid var(--green);
        }
        .form-status.error {
          background: var(--warning-bg);
          color: var(--warning-deep);
          border-left: 4px solid var(--warning);
        }

        .footer-note {
          text-align: center;
          padding: 24px 20px 8px;
        }
        .footer-note p {
          margin: 0;
          font-size: 14.5px;
          color: var(--muted);
          line-height: 1.55;
        }
        .footer-note a {
          font-weight: 700;
          text-decoration: none;
        }

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

        @media (max-width: 600px) {
          .form-grid { grid-template-columns: 1fr; }
          .form-row.span-2 { grid-column: span 1; }
          .info-callout {
            grid-template-columns: 1fr;
            text-align: center;
          }
        }
        @media (max-width: 480px) {
          .hero { min-height: 240px; padding: 36px 18px; }
          .page-body { padding: 24px 14px 40px; }
          .form-card { padding: 22px 18px; }
        }
      `;
    }
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function escapeAttr(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/"/g, '&quot;')
      .replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        const base64 = result.split(',')[1] || result;
        resolve(base64);
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  }

  if (!customElements.get('bddc-reimbursement')) {
    customElements.define('bddc-reimbursement', BDDCReimbursement);
  }
})();
