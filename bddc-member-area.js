/**
 * <bddc-member-area> — Wix Studio Custom Element
 * Big Dogs Don't Cry Animal Rescue — Members Area Pages
 *
 * One file, four member-type pages. Choose with data-type.
 *
 * Usage in Wix Studio:
 *   1. Add a Custom Element to each member-area page
 *   2. Server URL: https://cdn.jsdelivr.net/gh/justthescript/BDDC-Pages@main/bddc-member-area.js
 *   3. Tag Name:   bddc-member-area
 *   4. Set data-type="foster" | "adopter" | "employee" | "applicant"
 *   5. Optional: have Velo pass the logged-in member email via:
 *        $w('#customelement1').setAttribute('data-user-email', currentUser.loginEmail)
 *      so forms pre-fill. Without it, users type their email manually.
 *
 * Form submissions POST to the GAS web app at GAS_ENDPOINT below.
 * After deploying MemberForms.gs as a web app, paste the URL there.
 */

(function () {
  // ────────────────────────────────────────────────────────────────────────
  // Configuration
  // ────────────────────────────────────────────────────────────────────────
  const GAS_ENDPOINT = 'https://script.google.com/macros/s/REPLACE_WITH_YOUR_DEPLOYED_GAS_URL/exec';

  const DEFAULT_HERO_IMAGE =
    'https://static.wixstatic.com/media/bc59b6_604fb6f09a314f219daf30e354c81e5a~mv2.webp';

  const PAW_ICON_URL =
    'https://static.wixstatic.com/media/bc59b6_45db072b49a5427f930919d18683e36d~mv2.png';

  // Foster Coordinator contact
  const FOSTER_COORDINATOR = {
    name: 'Michele Lyczak (Co-Director of Foster Program)',
    email: 'bigdogsdontcryrescue@gmail.com',
    phone: '219-841-1142'
  };

  // ────────────────────────────────────────────────────────────────────────
  // Per-page configuration
  // ────────────────────────────────────────────────────────────────────────
  const PAGES = {

    // ════════════════════════════════════════════════════════════════════
    // FOSTER
    // ════════════════════════════════════════════════════════════════════
    foster: {
      badge: '🐾 Foster Hub',
      title: 'Foster Members Area',
      tagline: 'Resources, support, and forms — all in one place.',
      intro: `Thank you for opening your home. Whatever you need — a refill, a quick question, or just to share a great story — start here.`,
      coordinator: true,
      sections: [
        {
          kind: 'links',
          title: 'Foster Resources',
          icon: '📚',
          description: 'Quick reference for common fostering questions.',
          items: [
            { title: 'Foster Requirements', body: 'Refresh on what we ask of foster families.', href: 'https://www.bigdogsdontcry.com/foster-requirements', external: false },
            { title: 'Adoption Information', body: 'What\'s included when your foster is adopted.', href: 'https://www.bigdogsdontcry.com/adoption-information', external: false },
            { title: 'Adoptable Pets', body: 'See who\'s currently up for adoption.', href: 'https://www.bigdogsdontcry.com/adoptable', external: false },
            { title: 'Reimbursement Form', body: 'Submit receipts for approved expenses.', href: 'https://www.bigdogsdontcry.com/reimbursement', external: false }
          ]
        },
        {
          kind: 'form',
          title: 'Submit Foster Photos',
          icon: '📸',
          description: 'Share photos of your foster — for adoption listings, social media, or just to make us smile.',
          formType: 'foster-photos',
          fields: [
            { name: 'fosterName', label: 'Pet\'s Name', type: 'text', required: true },
            { name: 'caption', label: 'Caption / Notes (optional)', type: 'textarea', rows: 3 },
            { name: 'photos', label: 'Photos (up to 8)', type: 'file', accept: 'image/*', multiple: true, max: 8 },
            { name: 'permission', label: 'Big Dogs Don\'t Cry has permission to use these photos for adoption listings, social media, and promotional purposes.', type: 'checkbox', required: true }
          ],
          submitLabel: '📸 Submit Photos',
          successMessage: 'Photos received! Thanks for sharing — we\'ll add them to the rotation.'
        },
        {
          kind: 'form',
          title: 'Report a Medical Concern',
          icon: '🏥',
          description: 'Notice something off with your foster? Tell us right away — we\'ll coordinate vet care if needed.',
          formType: 'medical-concern',
          urgent: true,
          fields: [
            { name: 'fosterName', label: 'Pet\'s Name', type: 'text', required: true },
            { name: 'urgency', label: 'How urgent?', type: 'select', required: true, options: [
              { value: '', label: 'Select urgency…' },
              { value: 'emergency', label: '🚨 Emergency — needs vet now' },
              { value: 'urgent', label: '⚠️ Urgent — within 24 hours' },
              { value: 'monitoring', label: '👀 Monitoring — keeping an eye on it' },
              { value: 'routine', label: '📋 Routine question' }
            ]},
            { name: 'symptoms', label: 'What are you seeing?', type: 'textarea', rows: 5, required: true, placeholder: 'Describe symptoms, when they started, eating/drinking habits, etc.' },
            { name: 'phoneCallback', label: 'Best phone number for callback', type: 'tel' }
          ],
          submitLabel: '🏥 Report Concern',
          urgentNote: '🚨 If this is a true emergency (severe bleeding, collapse, choking, suspected poisoning), call the foster coordinator at <strong>219-841-1142</strong> first, then submit this form for the record.',
          successMessage: 'Concern logged. A coordinator will reach out shortly. For emergencies, call 219-841-1142.'
        },
        {
          kind: 'form',
          title: 'Update Foster Information',
          icon: '✏️',
          description: 'Behavior notes, training progress, weight changes, anything we should know.',
          formType: 'foster-update',
          fields: [
            { name: 'fosterName', label: 'Pet\'s Name', type: 'text', required: true },
            { name: 'updateType', label: 'What kind of update?', type: 'select', required: true, options: [
              { value: '', label: 'Select…' },
              { value: 'behavior', label: 'Behavior / temperament notes' },
              { value: 'training', label: 'Training progress' },
              { value: 'weight', label: 'Weight change' },
              { value: 'good-with', label: 'Good with cats/dogs/kids update' },
              { value: 'other', label: 'Other' }
            ]},
            { name: 'details', label: 'Details', type: 'textarea', rows: 5, required: true, placeholder: 'What changed? Anything specific to add to the adoption listing?' }
          ],
          submitLabel: '✏️ Submit Update',
          successMessage: 'Update received. Thanks for keeping us in the loop.'
        },
        {
          kind: 'form',
          title: 'Request Medication Refill or Vet Appointment',
          icon: '💊',
          description: 'Running low on meds, or your foster needs to be seen?',
          formType: 'med-refill-vet',
          fields: [
            { name: 'fosterName', label: 'Pet\'s Name', type: 'text', required: true },
            { name: 'requestType', label: 'What do you need?', type: 'select', required: true, options: [
              { value: '', label: 'Select…' },
              { value: 'med-refill', label: '💊 Medication refill' },
              { value: 'vet-appt', label: '🏥 Vet appointment' },
              { value: 'both', label: 'Both' }
            ]},
            { name: 'medication', label: 'Medication name & dose (if applicable)', type: 'text' },
            { name: 'reason', label: 'Reason or symptoms', type: 'textarea', rows: 4, required: true },
            { name: 'preferredTimes', label: 'Preferred days/times for an appointment', type: 'text', placeholder: 'e.g., weekday mornings, Tuesday after 3pm' }
          ],
          submitLabel: '💊 Submit Request',
          successMessage: 'Request received. A coordinator will follow up to schedule.'
        },
        {
          kind: 'form',
          title: 'General Question',
          icon: '💬',
          description: 'Any other question — we read every one.',
          formType: 'foster-question',
          fields: [
            { name: 'subject', label: 'Subject', type: 'text', required: true },
            { name: 'message', label: 'Your question', type: 'textarea', rows: 5, required: true }
          ],
          submitLabel: '💬 Send',
          successMessage: 'Got it. We\'ll get back to you soon.'
        },
        {
          kind: 'form',
          title: 'Share a Success Story',
          icon: '⭐',
          description: 'Tell us about the impact your foster had on you, or the impact you had on them. We love these.',
          formType: 'success-story',
          fields: [
            { name: 'fosterName', label: 'Pet\'s Name', type: 'text', required: true },
            { name: 'story', label: 'Your story', type: 'textarea', rows: 8, required: true, placeholder: 'How did fostering this pet change your life or theirs? What moments stood out?' },
            { name: 'photos', label: 'Photos to include (optional)', type: 'file', accept: 'image/*', multiple: true, max: 5 },
            { name: 'sharePermission', label: '✓ I give Big Dogs Don\'t Cry permission to share this story (and any photos) publicly on social media, the website, and in promotional materials.', type: 'checkbox', required: true }
          ],
          submitLabel: '⭐ Share Story',
          successMessage: 'Thank you — stories like yours are what keep this rescue going.'
        }
      ]
    },

    // ════════════════════════════════════════════════════════════════════
    // ADOPTER
    // ════════════════════════════════════════════════════════════════════
    adopter: {
      badge: '🏠 Adopter Hub',
      title: 'Adopter Members Area',
      tagline: 'Post-adoption support, records, and resources.',
      intro: `Welcome to the BDDC family! Use the forms below to request records, ask questions, or get support whenever you need it.`,
      coordinator: false,
      sections: [
        {
          kind: 'form',
          title: 'Medical Records Request',
          icon: '📋',
          description: 'Need a copy of your pet\'s vaccine, spay/neuter, or vet records?',
          formType: 'medical-records-request',
          fields: [
            { name: 'petName', label: 'Pet\'s Name', type: 'text', required: true },
            { name: 'adoptionDate', label: 'Approximate adoption date', type: 'text', placeholder: 'e.g., March 2025' },
            { name: 'recordsNeeded', label: 'Which records do you need?', type: 'select', required: true, options: [
              { value: '', label: 'Select…' },
              { value: 'vaccinations', label: 'Vaccination records' },
              { value: 'spay-neuter', label: 'Spay/neuter records' },
              { value: 'full-medical', label: 'Full medical history' },
              { value: 'rabies-cert', label: 'Rabies certificate' },
              { value: 'other', label: 'Other (specify below)' }
            ]},
            { name: 'reason', label: 'Reason / additional details (optional)', type: 'textarea', rows: 3, placeholder: 'e.g., for a vet visit, boarding, traveling, etc.' },
            { name: 'preferredFormat', label: 'How would you like to receive them?', type: 'select', options: [
              { value: 'email', label: 'Email (PDF)' },
              { value: 'pickup', label: 'I\'ll pick up paper copies' }
            ]}
          ],
          submitLabel: '📋 Request Records',
          successMessage: 'Request received. We\'ll have your records to you within a few business days.'
        },
        {
          kind: 'form',
          title: 'Request Adoption Contract Copy',
          icon: '📄',
          description: 'Need a copy of the adoption contract you signed? We\'ll email you a PDF.',
          formType: 'contract-request',
          fields: [
            { name: 'petName', label: 'Pet\'s Name', type: 'text', required: true },
            { name: 'adoptionDate', label: 'Approximate adoption date', type: 'text', placeholder: 'e.g., March 2025' },
            { name: 'reason', label: 'Reason for the request (optional)', type: 'textarea', rows: 3 }
          ],
          submitLabel: '📄 Request Contract',
          successMessage: 'Request received. We\'ll send your contract copy by email shortly.'
        },
        {
          kind: 'form',
          title: 'Ask a Question',
          icon: '💬',
          description: 'Anything about training, health, food, behavior — ask away.',
          formType: 'adopter-question',
          fields: [
            { name: 'petName', label: 'Pet\'s Name', type: 'text' },
            { name: 'subject', label: 'Subject', type: 'text', required: true },
            { name: 'message', label: 'Your question', type: 'textarea', rows: 6, required: true }
          ],
          submitLabel: '💬 Send Question',
          successMessage: 'Question received. We\'ll get back to you soon.'
        },
        {
          kind: 'form',
          title: 'Request Support',
          icon: '🆘',
          description: 'Struggling with a behavior issue, medical question, or anything else? We don\'t leave our adopters on their own. Reach out — we\'re here.',
          formType: 'adopter-support',
          fields: [
            { name: 'petName', label: 'Pet\'s Name', type: 'text', required: true },
            { name: 'urgency', label: 'How urgent?', type: 'select', required: true, options: [
              { value: '', label: 'Select…' },
              { value: 'crisis', label: '🚨 Crisis — considering rehoming/return' },
              { value: 'urgent', label: '⚠️ Urgent — significant problem' },
              { value: 'concerning', label: '😟 Concerning — could use guidance' },
              { value: 'general', label: '💭 General — want some advice' }
            ]},
            { name: 'description', label: 'What\'s going on?', type: 'textarea', rows: 6, required: true, placeholder: 'Tell us as much as you\'re comfortable sharing. The more we know, the better we can help.' },
            { name: 'phoneCallback', label: 'Phone number for callback (optional)', type: 'tel' }
          ],
          submitLabel: '🆘 Request Support',
          urgentNote: '💛 We are deeply committed to keeping our adoptions successful. If you\'re considering returning your pet, please reach out — we\'d much rather help you work through it than say goodbye.',
          successMessage: 'Support request received. A team member will reach out within 1 business day.'
        }
      ]
    },

    // ════════════════════════════════════════════════════════════════════
    // EMPLOYEE
    // ════════════════════════════════════════════════════════════════════
    employee: {
      badge: '🐾 BDDC Team',
      title: 'Employee Quick Links',
      tagline: 'Tools and shortcuts for the team.',
      intro: `Bookmark this page. Everything you reach for daily, in one place.`,
      coordinator: false,
      sections: [
        {
          kind: 'links',
          title: 'Adoption & Foster',
          icon: '🏠',
          items: [
            { title: 'Adoption Payment', body: 'Process an adoption fee payment.', href: 'https://www.bigdogsdontcry.com/payment2', external: false },
            { title: 'Adoption Requirements', body: 'Reference the requirements page.', href: 'https://www.bigdogsdontcry.com/adoption-requirements', external: false },
            { title: 'Foster Requirements', body: 'Reference the requirements page.', href: 'https://www.bigdogsdontcry.com/foster-requirements', external: false }
          ]
        },
        {
          kind: 'links',
          title: 'Forms & Tools',
          icon: '📋',
          items: [
            { title: 'Reimbursement Form', body: 'Submit a receipt for reimbursement.', href: 'https://www.bigdogsdontcry.com/reimbursement', external: false },
            { title: 'Update Featured Pet', body: 'Change the featured pet on the homepage.', href: 'https://www.bigdogsdontcry.com/update-featured-pet', external: false },
            { title: 'Contract Creation', body: 'Open Eversign to create or send a contract.', href: 'https://bigdogsdontcry.eversign.com/login', external: true }
          ]
        },
        {
          kind: 'links',
          title: 'External Tools',
          icon: '🔗',
          items: [
            { title: 'Pawlytics', body: 'Pet records, applications, adoptions.', href: 'https://app.pawlytics.com/', external: true },
            { title: 'HelpScout', body: 'Customer support inbox.', href: 'https://secure.helpscout.net/', external: true },
            { title: 'Eversign', body: 'Document signing.', href: 'https://bigdogsdontcry.eversign.com/login', external: true }
          ]
        }
      ]
    },

    // ════════════════════════════════════════════════════════════════════
    // APPLICANT
    // ════════════════════════════════════════════════════════════════════
    applicant: {
      badge: '✨ Applicant Hub',
      title: 'Applicant Members Area',
      tagline: 'Track your applications and reach out.',
      intro: `Thanks for applying with BDDC! Use this page to check on your application status, ask follow-up questions, or update your information.`,
      coordinator: false,
      sections: [
        {
          kind: 'links',
          title: 'Useful Pages',
          icon: '📚',
          items: [
            { title: 'Adoption Requirements', body: 'Refresh on what we look for in adopters.', href: 'https://www.bigdogsdontcry.com/adoption-requirements', external: false },
            { title: 'Foster Requirements', body: 'Foster program requirements and benefits.', href: 'https://www.bigdogsdontcry.com/foster-requirements', external: false },
            { title: 'What\'s Included: Adoption', body: 'Everything that comes with your adoption.', href: 'https://www.bigdogsdontcry.com/adoption-information', external: false },
            { title: 'Browse Adoptable Pets', body: 'See who\'s currently looking for a home.', href: 'https://www.bigdogsdontcry.com/adoptable', external: false }
          ]
        },
        {
          kind: 'form',
          title: 'Application Status Check',
          icon: '🔍',
          description: 'Wondering where your application stands?',
          formType: 'applicant-status',
          fields: [
            { name: 'applicationType', label: 'Which application?', type: 'select', required: true, options: [
              { value: '', label: 'Select…' },
              { value: 'adoption', label: 'Adoption' },
              { value: 'foster', label: 'Foster' },
              { value: 'volunteer', label: 'Volunteer' }
            ]},
            { name: 'petInterested', label: 'Pet you applied for (if applicable)', type: 'text' },
            { name: 'submittedDate', label: 'Approximate submission date', type: 'text', placeholder: 'e.g., last Tuesday' },
            { name: 'message', label: 'Anything else we should know?', type: 'textarea', rows: 4 }
          ],
          submitLabel: '🔍 Check Status',
          successMessage: 'We\'ll check on your application and get back to you within 1 business day.'
        },
        {
          kind: 'form',
          title: 'Update My Application',
          icon: '✏️',
          description: 'Need to add new info, change details, or correct something on your submitted application?',
          formType: 'applicant-update',
          fields: [
            { name: 'applicationType', label: 'Which application?', type: 'select', required: true, options: [
              { value: '', label: 'Select…' },
              { value: 'adoption', label: 'Adoption' },
              { value: 'foster', label: 'Foster' },
              { value: 'volunteer', label: 'Volunteer' }
            ]},
            { name: 'updateType', label: 'What\'s changing?', type: 'select', required: true, options: [
              { value: '', label: 'Select…' },
              { value: 'address', label: 'Address / housing' },
              { value: 'household', label: 'Household members or other pets' },
              { value: 'phone-email', label: 'Phone or email' },
              { value: 'reference', label: 'Reference info' },
              { value: 'other', label: 'Other' }
            ]},
            { name: 'details', label: 'Details', type: 'textarea', rows: 5, required: true }
          ],
          submitLabel: '✏️ Submit Update',
          successMessage: 'Update received. We\'ll attach it to your application.'
        },
        {
          kind: 'form',
          title: 'Ask a Question',
          icon: '💬',
          description: 'Have a question about the process or what to expect?',
          formType: 'applicant-question',
          fields: [
            { name: 'subject', label: 'Subject', type: 'text', required: true },
            { name: 'message', label: 'Your question', type: 'textarea', rows: 5, required: true }
          ],
          submitLabel: '💬 Send',
          successMessage: 'Got it. We\'ll get back to you soon.'
        }
      ]
    }
  };

  // ────────────────────────────────────────────────────────────────────────
  // Component
  // ────────────────────────────────────────────────────────────────────────
  class BDDCMemberArea extends HTMLElement {
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
      const type = (this.getAttribute('data-type') || 'foster').toLowerCase();
      const config = PAGES[type];
      const heroImage = this.getAttribute('data-hero-image') || DEFAULT_HERO_IMAGE;
      const userEmail = this.getAttribute('data-user-email') || '';
      const userName = this.getAttribute('data-user-name') || '';

      if (!config) {
        this.shadowRoot.innerHTML = `<div style="padding:40px;text-align:center;font-family:system-ui;">
          <h2>Configuration error</h2>
          <p>Unknown member type: <code>${type}</code></p>
          <p>Set <code>data-type</code> to: ${Object.keys(PAGES).join(', ')}</p>
        </div>`;
        return;
      }

      this._userEmail = userEmail;
      this._userName = userName;
      this._memberType = type;

      this.shadowRoot.innerHTML = `
        <style>${this.styles()}</style>

        <section class="hero" style="--hero-bg: url('${heroImage}');">
          <div class="hero-inner">
            <div class="hero-badge">${config.badge}</div>
            <h1 class="hero-title">${config.title}</h1>
            <p class="hero-tagline">${config.tagline}</p>
          </div>
        </section>

        <div class="page-body">
          <section class="intro reveal">
            <p>${config.intro}</p>
            ${userName ? `<p class="user-greeting">Logged in as <strong>${escapeHtml(userName)}</strong>${userEmail ? ` (${escapeHtml(userEmail)})` : ''}</p>` : ''}
          </section>

          ${config.coordinator ? this.coordinatorCardHTML() : ''}

          <div class="sections-stack">
            ${config.sections.map(s => this.sectionHTML(s)).join('')}
          </div>

          <section class="footer-note reveal">
            <p>
              <strong>Need to reach us directly?</strong>
              Email <a href="mailto:bigdogsdontcryrescue@gmail.com">bigdogsdontcryrescue@gmail.com</a>
              or call <a href="tel:+12198411142">219-841-1142</a>.
            </p>
          </section>
        </div>
      `;
    }

    coordinatorCardHTML() {
      return `
        <section class="coordinator-card reveal">
          <div class="coord-icon" aria-hidden="true">🤝</div>
          <div class="coord-content">
            <div class="coord-overline">Your Foster Coordinator</div>
            <h3 class="coord-name">${escapeHtml(FOSTER_COORDINATOR.name)}</h3>
            <div class="coord-contact">
              <a class="coord-link" href="mailto:${escapeHtml(FOSTER_COORDINATOR.email)}">
                ✉️ ${escapeHtml(FOSTER_COORDINATOR.email)}
              </a>
              <a class="coord-link" href="tel:+1${FOSTER_COORDINATOR.phone.replace(/[^0-9]/g, '')}">
                📞 ${escapeHtml(FOSTER_COORDINATOR.phone)}
              </a>
            </div>
            <p class="coord-note">For emergencies (severe symptoms, injuries, behavioral crises), call directly. For everything else, the forms below are the fastest way to reach us.</p>
          </div>
        </section>
      `;
    }

    sectionHTML(section) {
      if (section.kind === 'links') return this.linksSectionHTML(section);
      if (section.kind === 'form')  return this.formSectionHTML(section);
      return '';
    }

    linksSectionHTML(s) {
      return `
        <section class="info-card reveal">
          <div class="paw-watermark" aria-hidden="true"></div>
          <div class="card-header">
            <span class="card-icon" aria-hidden="true">${s.icon}</span>
            <div>
              <h2 class="card-title">${s.title}</h2>
              ${s.description ? `<p class="card-description">${s.description}</p>` : ''}
            </div>
          </div>
          <div class="links-grid">
            ${s.items.map(item => `
              <a class="link-card" href="${escapeAttr(item.href)}" ${item.external ? 'target="_blank" rel="noopener noreferrer"' : 'target="_top"'}>
                <div class="link-card-content">
                  <h3>${escapeHtml(item.title)}</h3>
                  <p>${escapeHtml(item.body)}</p>
                </div>
                <span class="link-arrow" aria-hidden="true">${item.external ? '↗' : '→'}</span>
              </a>
            `).join('')}
          </div>
        </section>
      `;
    }

    formSectionHTML(s) {
      return `
        <section class="info-card reveal" data-form-section="${escapeAttr(s.formType)}">
          <div class="paw-watermark" aria-hidden="true"></div>
          <div class="card-header">
            <span class="card-icon" aria-hidden="true">${s.icon}</span>
            <div>
              <h2 class="card-title">${s.title}</h2>
              ${s.description ? `<p class="card-description">${s.description}</p>` : ''}
            </div>
          </div>

          ${s.urgentNote ? `<div class="urgent-note">${s.urgentNote}</div>` : ''}

          <form class="member-form" data-form-type="${escapeAttr(s.formType)}" data-success-message="${escapeAttr(s.successMessage)}" novalidate>
            ${s.fields.map(f => this.fieldHTML(f, s.formType)).join('')}
            <div class="form-row">
              <button type="submit" class="btn btn-primary submit-btn">
                ${s.submitLabel}
              </button>
            </div>
            <div class="form-status" aria-live="polite"></div>
          </form>
        </section>
      `;
    }

    fieldHTML(f, formType) {
      const id = `f-${formType}-${f.name}`;
      const required = f.required ? 'required' : '';
      const requiredMark = f.required ? '<span class="req">*</span>' : '';

      if (f.type === 'textarea') {
        return `
          <div class="form-row">
            <label for="${id}">${f.label} ${requiredMark}</label>
            <textarea id="${id}" name="${escapeAttr(f.name)}" rows="${f.rows || 4}" ${required} placeholder="${escapeAttr(f.placeholder || '')}"></textarea>
          </div>
        `;
      }

      if (f.type === 'select') {
        return `
          <div class="form-row">
            <label for="${id}">${f.label} ${requiredMark}</label>
            <select id="${id}" name="${escapeAttr(f.name)}" ${required}>
              ${f.options.map(o => `<option value="${escapeAttr(o.value)}">${escapeHtml(o.label)}</option>`).join('')}
            </select>
          </div>
        `;
      }

      if (f.type === 'file') {
        return `
          <div class="form-row">
            <label for="${id}">${f.label} ${requiredMark}</label>
            <input type="file" id="${id}" name="${escapeAttr(f.name)}" ${f.accept ? `accept="${escapeAttr(f.accept)}"` : ''} ${f.multiple ? 'multiple' : ''} ${required} data-max="${f.max || 1}">
            <p class="field-hint">${f.multiple ? `Up to ${f.max || 8} files. Each file under 8MB.` : 'Max 8MB.'}</p>
          </div>
        `;
      }

      if (f.type === 'checkbox') {
        return `
          <div class="form-row checkbox-row">
            <label class="checkbox-label">
              <input type="checkbox" id="${id}" name="${escapeAttr(f.name)}" ${required}>
              <span>${f.label}</span>
            </label>
          </div>
        `;
      }

      // text, tel, email, etc.
      return `
        <div class="form-row">
          <label for="${id}">${f.label} ${requiredMark}</label>
          <input type="${f.type}" id="${id}" name="${escapeAttr(f.name)}" ${required} placeholder="${escapeAttr(f.placeholder || '')}">
        </div>
      `;
    }

    bindEvents() {
      this.shadowRoot.querySelectorAll('.member-form').forEach(form => {
        form.addEventListener('submit', (e) => this.handleFormSubmit(e, form));
      });
    }

    async handleFormSubmit(e, form) {
      e.preventDefault();

      const formType = form.dataset.formType;
      const successMessage = form.dataset.successMessage;
      const statusEl = form.querySelector('.form-status');
      const submitBtn = form.querySelector('.submit-btn');

      // Validate native required fields
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
      statusEl.className = 'form-status sending';
      statusEl.textContent = 'Submitting your request…';

      try {
        const fields = {};
        const fileFields = [];

        // Collect form values
        for (const el of form.elements) {
          if (!el.name) continue;
          if (el.type === 'checkbox') {
            fields[el.name] = el.checked ? 'Yes' : 'No';
          } else if (el.type === 'file') {
            // We'll handle files separately
            fileFields.push({ name: el.name, files: el.files });
          } else if (el.value) {
            fields[el.name] = el.value;
          }
        }

        // Encode files as base64
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

        // Build payload
        const payload = {
          type: formType,
          memberType: this._memberType,
          submittedAt: new Date().toISOString(),
          userEmail: this._userEmail,
          userName: this._userName,
          fields,
          files: filesData
        };

        // POST to GAS — text/plain to avoid CORS preflight
        const res = await fetch(GAS_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload)
        });

        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        const result = await res.json().catch(() => ({}));
        if (result.error) throw new Error(result.error);

        // Success
        statusEl.className = 'form-status success';
        statusEl.innerHTML = `<strong>✓ ${escapeHtml(successMessage)}</strong>`;
        form.reset();
        submitBtn.textContent = 'Sent ✓';
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = form.querySelector('.submit-btn').dataset.originalLabel || submitBtn.dataset.originalLabel || submitBtn.textContent;
        }, 3000);
      } catch (err) {
        console.error('[bddc-member-area] submit error', err);
        statusEl.className = 'form-status error';
        statusEl.innerHTML = `<strong>⚠️ Couldn't send right now.</strong> ${escapeHtml(err.message || 'Please try again or email us at bigdogsdontcryrescue@gmail.com.')}`;
        submitBtn.disabled = false;
        submitBtn.textContent = form.querySelector('button[type="submit"]').textContent.replace(/Sending…|Sent ✓/, '').trim();
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
          --shadow-lg: 0 16px 40px rgba(245,54,124,0.28);
          display: block;
          width: 100%;
          font-family: "Raleway", "Quicksand", "Segoe UI", system-ui, -apple-system, Arial, sans-serif;
          color: var(--ink);
          box-sizing: border-box;
        }
        * { box-sizing: border-box; }
        a { color: var(--pink-deep); }

        /* Hero */
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
          max-width: 1100px;
          margin: 0 auto;
          padding: 32px 20px 56px;
        }

        .intro {
          max-width: 820px;
          margin: 0 auto 28px;
          text-align: center;
        }
        .intro p {
          margin: 0 0 8px;
          font-size: clamp(16px, 1.4vw, 18px);
          line-height: 1.65;
          color: var(--ink);
          font-weight: 500;
        }
        .user-greeting {
          font-size: 14px !important;
          color: var(--muted) !important;
          font-style: italic;
        }
        .user-greeting strong { color: var(--pink-deep); }

        /* Coordinator card */
        .coordinator-card {
          background: linear-gradient(135deg, var(--pink-bg) 0%, var(--pink-light) 100%);
          border: 2px solid var(--pink-soft);
          border-radius: 18px;
          padding: clamp(22px, 3vw, 32px);
          margin-bottom: 32px;
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 22px;
          align-items: start;
        }
        .coord-icon {
          font-size: 56px;
          line-height: 1;
          flex-shrink: 0;
        }
        .coord-overline {
          color: var(--pink);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        .coord-name {
          margin: 0 0 14px;
          color: var(--pink-deep);
          font-size: clamp(20px, 2vw, 24px);
          font-weight: 700;
          line-height: 1.2;
        }
        .coord-contact {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 14px;
        }
        .coord-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          background: #fff;
          border: 1px solid var(--pink-soft);
          border-radius: 999px;
          font-size: 14px;
          font-weight: 600;
          color: var(--pink-deep);
          text-decoration: none;
          transition: background .15s ease, border-color .15s ease;
        }
        .coord-link:hover {
          background: var(--pink);
          color: #fff;
          border-color: var(--pink);
        }
        .coord-note {
          margin: 0;
          font-size: 14px;
          line-height: 1.55;
          color: var(--muted);
        }

        /* Section card */
        .sections-stack {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .info-card {
          position: relative;
          background: #fff;
          border: 2px solid var(--pink-soft);
          border-radius: 18px;
          padding: clamp(24px, 3vw, 36px);
          box-shadow: var(--shadow-sm);
          overflow: hidden;
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
        .card-header {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 22px;
          position: relative;
          z-index: 1;
        }
        .card-icon {
          font-size: 36px;
          line-height: 1;
          flex-shrink: 0;
          padding: 10px 14px;
          background: var(--pink-bg);
          border-radius: 14px;
          border: 1px solid var(--pink-soft);
        }
        .card-title {
          margin: 0 0 6px;
          color: var(--pink-deep);
          font-size: clamp(20px, 2.2vw, 26px);
          font-weight: 700;
          line-height: 1.2;
        }
        .card-description {
          margin: 0;
          color: var(--muted);
          font-size: clamp(14px, 1.2vw, 16px);
          line-height: 1.55;
        }

        /* Links grid */
        .links-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 14px;
          position: relative;
          z-index: 1;
        }
        .link-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          padding: 18px 20px;
          background: var(--pink-bg);
          border: 2px solid transparent;
          border-radius: 12px;
          text-decoration: none;
          color: var(--ink);
          transition: border-color .2s ease, transform .15s ease, background .2s ease;
        }
        .link-card:hover {
          border-color: var(--pink);
          background: #fff;
          transform: translateX(2px);
        }
        .link-card h3 {
          margin: 0 0 4px;
          color: var(--pink-deep);
          font-size: 16px;
          font-weight: 700;
        }
        .link-card p {
          margin: 0;
          color: var(--muted);
          font-size: 13.5px;
          line-height: 1.4;
        }
        .link-arrow {
          font-size: 22px;
          color: var(--pink);
          font-weight: 700;
          flex-shrink: 0;
          transition: transform .15s ease;
        }
        .link-card:hover .link-arrow { transform: translateX(4px); }

        /* Forms */
        .urgent-note {
          padding: 14px 18px;
          background: var(--warning-bg);
          border-left: 4px solid var(--warning);
          border-radius: 8px;
          margin-bottom: 20px;
          font-size: 14px;
          line-height: 1.55;
          color: var(--warning-deep);
        }
        .urgent-note strong { color: var(--warning-deep); }
        .member-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
          position: relative;
          z-index: 1;
        }
        .form-row {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .form-row label {
          font-size: 14px;
          font-weight: 700;
          color: var(--ink);
        }
        .req {
          color: var(--pink);
          margin-left: 2px;
        }
        .form-row input[type="text"],
        .form-row input[type="tel"],
        .form-row input[type="email"],
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
          min-height: 80px;
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
        .field-hint {
          margin: 4px 0 0;
          font-size: 12.5px;
          color: var(--muted);
          font-style: italic;
        }
        .checkbox-row { gap: 0; }
        .checkbox-label {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 12px 14px;
          background: var(--pink-bg);
          border: 1px solid var(--pink-soft);
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
          padding: 13px 28px;
          border-radius: 999px;
          text-decoration: none;
          font-weight: 700;
          font-size: 15px;
          font-family: inherit;
          cursor: pointer;
          border: 0;
          transition: transform .12s ease, box-shadow .2s ease, background .2s ease;
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
        .submit-btn {
          align-self: flex-start;
        }

        .form-status {
          margin: 0;
          font-size: 14px;
          line-height: 1.5;
          padding: 0;
          border-radius: 10px;
          transition: padding .2s ease;
        }
        .form-status.sending,
        .form-status.success,
        .form-status.error {
          padding: 12px 16px;
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

        /* Footer note */
        .footer-note {
          text-align: center;
          padding: 32px 20px 8px;
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
        .footer-note a:hover { text-decoration: underline; }

        /* Reveal */
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

        /* Responsive */
        @media (max-width: 720px) {
          .coordinator-card {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 14px;
          }
          .coord-contact { justify-content: center; }
          .card-header { flex-direction: column; align-items: stretch; gap: 12px; }
          .card-icon { align-self: flex-start; }
        }
        @media (max-width: 480px) {
          .hero { min-height: 240px; padding: 36px 18px; }
          .page-body { padding: 24px 14px 40px; }
          .info-card { padding: 22px 18px; }
        }
      `;
    }
  }

  // Helpers
  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
  function escapeAttr(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        // strip "data:...;base64," prefix
        const base64 = result.split(',')[1] || result;
        resolve(base64);
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  }

  if (!customElements.get('bddc-member-area')) {
    customElements.define('bddc-member-area', BDDCMemberArea);
  }
})();
