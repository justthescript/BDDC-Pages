/**
 * <bddc-staff> — Wix Studio Custom Element
 * Big Dogs Don't Cry Animal Rescue — Staff/Team Cards
 *
 * Designed to drop into an existing page (no hero, no extra chrome).
 * Just renders the team grid.
 *
 * Usage in Wix Studio:
 *   1. Add a Custom Element to wherever the team should appear
 *   2. Server URL: https://cdn.jsdelivr.net/gh/justthescript/BDDC-Pages@main/bddc-staff.js
 *   3. Tag Name:   bddc-staff
 *
 * Editing the team:
 *   The MEMBERS array below is the source of truth. Add/remove/reorder here,
 *   push, cache-bust. Each entry needs name, photo URL, and role.
 *   Roles can be either:
 *     - A single string ("Post Adoption Chair")
 *     - An array of strings, each rendered on its own line
 *       (good for board members with multiple titles)
 */

(function () {
  // ────────────────────────────────────────────────────────────────────────
  // Team — edit here when membership changes
  // ────────────────────────────────────────────────────────────────────────
  const MEMBERS = [
    {
      name: 'Krystal Zamora',
      photo: 'https://static.wixstatic.com/media/bc59b6_c445443d384b4beb876a94038e6e6b01~mv2.jpeg',
      titles: [
        'Board Member · President',
        'Director of Adoption Program',
        'Co-Director of Foster Program',
        'Director of Social Media'
      ]
    },
    {
      name: 'Amanda McKenzie',
      photo: 'https://static.wixstatic.com/media/4cb683_14bd63d297744f9f95a082f1eeb1aa29~mv2.jpg',
      titles: [
        'Board Member · Vice President',
        'Treasurer',
        'Co-Director of Fundraising'
      ]
    },
    {
      name: 'Patricia Perez',
      photo: 'https://static.wixstatic.com/media/4cb683_d9acdf31e09a4c96a6e23ca540026130~mv2.jpg',
      titles: [
        'Board Member',
        'Executive Administrative Coordinator'
      ]
    },
    {
      name: 'Jenny Burton',
      photo: 'https://static.wixstatic.com/media/4cb683_7a4daa76836f45cea610ac74a48e1b9a~mv2.jpeg',
      titles: [
        'Board Member',
        'Director of Medical Records',
        'Vet Liaison'
      ]
    },
    {
      name: 'Michele Lyczak',
      photo: 'https://static.wixstatic.com/media/4cb683_32ff7acb38fe4fe9939dfcd46f2f5901~mv2.jpg',
      titles: [
        'Board Member',
        'Co-Director of Foster Program'
      ]
    },
    {
      name: 'Tiffani Johnson',
      photo: 'https://static.wixstatic.com/media/bc59b6_d5232d2c37f14d528916d6fc4f953bbd~mv2.jpg',
      titles: [
        'Board Member',
        'Co-Director of Foster Program',
        'Co-Director of Adoption Program'
      ]
    },
    {
      name: 'Kelsey Mathis',
      photo: 'https://static.wixstatic.com/media/bc59b6_0b5ead8432f1499c867aa1f5161f777e~mv2.jpg',
      titles: [
        'Board Member',
        'Co-Director of Fundraising'
      ]
    },
    {
      name: 'Amber Hamilton',
      photo: 'https://static.wixstatic.com/media/bc59b6_692f56ebbc1046a8a0673790d9b3f07a~mv2.jpg',
      titles: [
        'Board Member',
        'Post-Adoption Chair'
      ]
    },
    {
      name: 'Nate Weaver',
      photo: 'https://static.wixstatic.com/media/4cb683_d394298be6474319bd7d6b6bebfc2696~mv2.jpg',
      titles: [
        'Board Member',
        'Director of Technology & Web Applications'
      ]
    }
  ];

  class BDDCStaff extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
      this.render();
      this.observeReveal();
    }

    render() {
      this.shadowRoot.innerHTML = `
        <style>${this.styles()}</style>
        <div class="staff-grid">
          ${MEMBERS.map((m, i) => this.cardHTML(m, i)).join('')}
        </div>
      `;
    }

    cardHTML(m, idx) {
      const titles = Array.isArray(m.titles) ? m.titles : [m.titles];
      const initials = m.name
        .split(/\s+/)
        .filter(Boolean)
        .map(s => s[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

      const photoBlock = m.photo
        ? `<img class="member-photo" src="${escapeAttr(m.photo)}" alt="${escapeAttr(m.name)}" loading="lazy" onerror="this.parentElement.classList.add('no-photo'); this.remove();">`
        : '';

      return `
        <article class="member-card reveal" style="--idx: ${idx};">
          <div class="member-photo-wrap${m.photo ? '' : ' no-photo'}" data-initials="${escapeAttr(initials)}">
            ${photoBlock}
            <div class="member-name-bar">
              <span class="member-name">${escapeHtml(m.name)}</span>
            </div>
          </div>
          <div class="member-titles">
            ${titles.map(t => `<div class="member-title">${escapeHtml(t)}</div>`).join('')}
          </div>
        </article>
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
          --ink: #2a2a2a;
          --muted: #555;
          --shadow-sm: 0 4px 12px rgba(0,0,0,0.08);
          --shadow-md: 0 12px 30px rgba(245,54,124,0.18);
          display: block;
          width: 100%;
          font-family: "Raleway", "Quicksand", "Segoe UI", system-ui, -apple-system, Arial, sans-serif;
          color: var(--ink);
          box-sizing: border-box;
        }
        * { box-sizing: border-box; }

        .staff-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 8px;
        }

        .member-card {
          background: #fff;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          border: 2px solid var(--pink-soft);
          display: flex;
          flex-direction: column;
          transition: transform .25s ease, box-shadow .3s ease, border-color .3s ease;
        }
        .member-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-md);
          border-color: var(--pink);
        }

        /* Photo area — keeps faces visible (object-position: top), name lives in a gradient bar at the bottom */
        .member-photo-wrap {
          position: relative;
          aspect-ratio: 1 / 1;
          background: linear-gradient(135deg, var(--pink-bg) 0%, var(--pink-light) 100%);
          overflow: hidden;
        }
        .member-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 25%;
          display: block;
          transition: transform .35s ease;
        }
        .member-card:hover .member-photo {
          transform: scale(1.05);
        }

        /* Initials fallback when no photo */
        .member-photo-wrap.no-photo::before {
          content: attr(data-initials);
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          font-family: "Playfair Display", Georgia, serif;
          font-size: clamp(48px, 6vw, 72px);
          font-weight: 700;
          color: var(--pink-deep);
          background: linear-gradient(135deg, var(--pink-soft) 0%, var(--pink-light) 100%);
          letter-spacing: 2px;
        }

        /* Name bar — bottom-anchored, soft gradient ensures readability over any photo */
        .member-name-bar {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 38px 18px 14px;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0) 0%,
            rgba(0,0,0,0.55) 60%,
            rgba(0,0,0,0.78) 100%
          );
          color: #fff;
          pointer-events: none;
        }
        .member-name {
          display: block;
          font-size: clamp(18px, 1.7vw, 22px);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.2px;
          text-shadow: 0 2px 8px rgba(0,0,0,0.6);
        }

        /* Titles below the photo — each on its own line, all readable */
        .member-titles {
          padding: 16px 20px 22px;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .member-title {
          font-size: 13.5px;
          line-height: 1.45;
          color: var(--ink);
          padding-left: 14px;
          position: relative;
          font-weight: 500;
        }
        .member-title::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.6em;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--pink);
          opacity: 0.55;
        }
        /* First title (typically "Board Member · Role") gets emphasis */
        .member-title:first-child {
          color: var(--pink-deep);
          font-weight: 700;
          font-size: 14px;
        }
        .member-title:first-child::before {
          opacity: 1;
          background: var(--pink);
        }

        /* Reveal animation, staggered */
        .reveal {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity .55s ease, transform .55s ease;
          transition-delay: calc(var(--idx, 0) * 60ms);
        }
        .reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal { opacity: 1; transform: none; transition: none; }
          .member-card:hover .member-photo { transform: none; }
        }

        /* Responsive */
        @media (max-width: 1100px) { .staff-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 800px)  { .staff-grid { grid-template-columns: repeat(2, 1fr); gap: 18px; } }
        @media (max-width: 460px)  {
          .staff-grid { grid-template-columns: 1fr; gap: 16px; }
          .member-photo-wrap { aspect-ratio: 4 / 3; }
          .member-photo { object-position: center 20%; }
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

  if (!customElements.get('bddc-staff')) {
    customElements.define('bddc-staff', BDDCStaff);
  }
})();
