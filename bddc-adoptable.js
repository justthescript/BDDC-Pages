/**
 * <bddc-adoptable> — Wix Studio Custom Element
 * Big Dogs Don't Cry Animal Rescue — Adoptable Pets Page
 *
 * Data source: Google Sheets "ADOPTABLE" tab via the gviz JSON endpoint
 * (publicly readable, CORS-enabled). No API key needed for public sheets.
 *
 * To swap in a different sheet later: change SHEET_ID and SHEET_NAME below.
 *
 * Usage in Wix Studio:
 *   1. Add a Custom Element to /adoptable
 *   2. Server URL: https://cdn.jsdelivr.net/gh/justthescript/BDDC-Pages@main/bddc-adoptable.js
 *   3. Tag Name:   bddc-adoptable
 */

(function () {
  // ── Config ──────────────────────────────────────────────────────────────
  const SHEET_ID   = '1KYAGmhyYgVpFKmpXmxEUd9kvqMnMKrz4p5TzKKG5VRU';
  const SHEET_NAME = 'ADOPTABLE';
  const APPLY_URL  = 'https://www.bigdogsdontcry.com/adoption-application';

  const DEFAULT_HERO_IMAGE =
    'https://static.wixstatic.com/media/bc59b6_604fb6f09a314f219daf30e354c81e5a~mv2.webp';
  const PAW_ICON_URL =
    'https://static.wixstatic.com/media/bc59b6_45db072b49a5427f930919d18683e36d~mv2.png';

  // Placeholder data URI — soft pink card with paw silhouette, used when img1 is empty
  const PLACEHOLDER_IMG =
    'data:image/svg+xml;utf8,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">' +
      '<rect width="400" height="400" fill="%23fff7fa"/>' +
      '<g fill="%23ffd9ec" transform="translate(200 200)">' +
      '<circle cx="-60" cy="-30" r="22"/><circle cx="-20" cy="-65" r="22"/>' +
      '<circle cx="30" cy="-65" r="22"/><circle cx="70" cy="-30" r="22"/>' +
      '<ellipse cx="5" cy="40" rx="55" ry="48"/></g></svg>'
    );

  // ── Sheet column → field mapping ────────────────────────────────────────
  // Built from the actual ADOPTABLE tab schema. Maps human-readable fields
  // to the column LABEL strings as exposed by the gviz endpoint.
  const COL = {
    id: 'ID',
    status: 'Status',
    fee: 'Adoption Fee (Amount)',
    name: 'Name',
    species: 'Species',
    breedDog: 'Breed (Dog)',
    breedCat: 'Breed (Cat)',
    breedOther: 'Breed (Small Animal)',
    color: 'Color',
    description: 'Description',
    specialNeeds: 'Special Needs',
    gender: 'Gender',
    weightValue: 'Weight (Value)',
    birthDate: 'Estimated Birth Date',
    ageString: 'Age',
    img: ['img1', 'img2', 'img3', 'img4', 'img5'],
    gwCats: 'Gw cats',
    gwDogs: 'Gw dogs',
    gwKids: 'Gw kids',
    weight30: 'Weight 30',
    weight50: 'Weight 50',
    weight50plus: 'Weight 50+',
    housetrained: 'Housetrained (Boolean)',
    altered: 'Altered (Boolean)',
    mixed: 'Mixed (Boolean)',
    needsExperienced: 'Needs Experienced Adopter'
  };

  // ── Data fetching ───────────────────────────────────────────────────────
  function gvizUrl() {
    return `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(SHEET_NAME)}`;
  }

  async function fetchPets() {
    const res = await fetch(gvizUrl(), { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch sheet');
    const text = await res.text();
    // gviz wraps the JSON in `google.visualization.Query.setResponse(...);`
    const m = text.match(/setResponse\(([\s\S]*?)\);?\s*$/);
    if (!m) throw new Error('Unexpected sheet response format');
    const data = JSON.parse(m[1]);
    return parseSheetTable(data.table);
  }

  function parseSheetTable(table) {
    const labelToIdx = {};
    table.cols.forEach((c, i) => {
      const label = c.label || c.id;
      if (label) labelToIdx[label] = i;
    });

    const colIdx = (key) => {
      const lbl = COL[key];
      return Array.isArray(lbl) ? lbl.map(l => labelToIdx[l]) : labelToIdx[lbl];
    };
    const idxs = {};
    Object.keys(COL).forEach(k => { idxs[k] = colIdx(k); });

    const cellVal = (row, idx) => {
      if (idx == null || idx < 0) return null;
      const cell = row.c[idx];
      if (!cell) return null;
      return cell.v != null ? cell.v : null;
    };
    const cellFmt = (row, idx) => {
      if (idx == null || idx < 0) return null;
      const cell = row.c[idx];
      if (!cell) return null;
      return cell.f || (cell.v != null ? String(cell.v) : null);
    };

    const pets = [];
    for (const row of table.rows) {
      const status = cellVal(row, idxs.status);
      if (!status) continue;
      // Only show ADOPTABLE pets
      if (String(status).toUpperCase() !== 'ADOPTABLE') continue;

      const name = cellVal(row, idxs.name);
      if (!name) continue;

      const images = idxs.img
        .map(i => cellVal(row, i))
        .filter(u => u && /^https?:\/\//.test(u));

      const species = String(cellVal(row, idxs.species) || '').toUpperCase();
      let breed = '';
      if (species === 'DOG')      breed = cellVal(row, idxs.breedDog) || '';
      else if (species === 'CAT') breed = cellVal(row, idxs.breedCat) || '';
      else                        breed = cellVal(row, idxs.breedOther) || '';

      // Compute age in years from birth date (gviz returns "Date(YYYY,M-1,D)")
      let ageYears = null;
      const birthRaw = cellVal(row, idxs.birthDate);
      if (typeof birthRaw === 'string') {
        const dm = birthRaw.match(/Date\((\d+),(\d+),(\d+)/);
        if (dm) {
          const dob = new Date(+dm[1], +dm[2], +dm[3]);
          ageYears = (Date.now() - dob.getTime()) / (365.25 * 24 * 3600 * 1000);
        }
      }

      pets.push({
        id: cellVal(row, idxs.id) || name,
        name,
        species,
        speciesLabel: species ? species.charAt(0) + species.slice(1).toLowerCase() : '',
        breed: titleCase(breed),
        color: titleCase(cellVal(row, idxs.color) || ''),
        description: cellVal(row, idxs.description) || '',
        specialNeeds: cellVal(row, idxs.specialNeeds) || '',
        gender: titleCase(cellVal(row, idxs.gender) || ''),
        weightLbs: cellVal(row, idxs.weightValue),
        ageString: cellVal(row, idxs.ageString) || '',
        ageYears,
        ageBucket: bucketAge(ageYears),
        fee: cellFmt(row, idxs.fee) || '',
        images: images.length ? images : [PLACEHOLDER_IMG],
        gwCats: !!cellVal(row, idxs.gwCats),
        gwDogs: !!cellVal(row, idxs.gwDogs),
        gwKids: !!cellVal(row, idxs.gwKids),
        weight30: !!cellVal(row, idxs.weight30),
        weight50: !!cellVal(row, idxs.weight50),
        weight50plus: !!cellVal(row, idxs.weight50plus),
        housetrained: !!cellVal(row, idxs.housetrained),
        altered: !!cellVal(row, idxs.altered),
        mixed: !!cellVal(row, idxs.mixed),
        needsExperienced: String(cellVal(row, idxs.needsExperienced) || '').toLowerCase() === 'yes'
      });
    }
    return pets;
  }

  function titleCase(s) {
    if (!s) return '';
    return String(s).toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
  }

  function bucketAge(years) {
    if (years == null) return null;
    if (years < 1)  return 'puppy';
    if (years < 3)  return 'young';
    if (years < 7)  return 'adult';
    return 'senior';
  }

  // ── Component ──────────────────────────────────────────────────────────
  class BDDCAdoptable extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.state = {
        pets: [],
        loading: true,
        error: null,
        filters: {
          search: '',
          species: 'all',     // all | dog | cat | other
          gender: 'all',      // all | male | female
          age: new Set(),     // {puppy, young, adult, senior}
          weight: new Set(),  // {w30, w50, w50plus}
          gwCats: false,
          gwDogs: false,
          gwKids: false,
          housetrained: false,
          altered: false,
          mixed: false
        },
        showAdvanced: false,
        modalPet: null,
        modalImageIdx: 0
      };
    }

    async connectedCallback() {
      this.renderShell();
      this.bindEvents();
      try {
        const pets = await fetchPets();
        this.state.pets = pets;
        this.state.loading = false;
        this.renderResults();
      } catch (err) {
        console.error('[bddc-adoptable] fetch error', err);
        this.state.loading = false;
        this.state.error = err.message || 'Could not load adoptable pets.';
        this.renderResults();
      }
    }

    disconnectedCallback() {
      if (this._keyHandler) document.removeEventListener('keydown', this._keyHandler);
      document.body.style.overflow = '';
    }

    // ── Initial shell (hero + filters + results placeholder) ──────────────
    renderShell() {
      const heroImage = this.getAttribute('data-hero-image') || DEFAULT_HERO_IMAGE;
      this.shadowRoot.innerHTML = `
        <style>${this.styles()}</style>

        <section class="hero" style="--hero-bg: url('${heroImage}');">
          <div class="hero-inner">
            <div class="hero-badge">💖 Meet the Pack</div>
            <h1 class="hero-title">Adoptable Pets</h1>
            <p class="hero-tagline">
              Find the wagging tail (or curious whisker) that fits your family.
            </p>
          </div>
        </section>

        <div class="page-body">
          <section class="filter-card" id="filter-card">
            ${this.filterCardHTML()}
          </section>

          <section class="results-section" id="results-section">
            ${this.skeletonHTML()}
          </section>
        </div>

        <div class="modal-overlay" id="modal-overlay" aria-hidden="true">
          <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" id="modal-content"></div>
        </div>
      `;
    }

    filterCardHTML() {
      return `
        <div class="filter-row primary">
          <div class="search-wrap">
            <span class="search-icon" aria-hidden="true">🔍</span>
            <input type="search" class="search-input" id="f-search" placeholder="Search by name…" autocomplete="off">
          </div>

          <div class="chip-group" role="radiogroup" aria-label="Species">
            <button type="button" class="chip" data-filter="species" data-value="all">All</button>
            <button type="button" class="chip" data-filter="species" data-value="dog">🐕 Dogs</button>
            <button type="button" class="chip" data-filter="species" data-value="cat">🐈 Cats</button>
            <button type="button" class="chip" data-filter="species" data-value="other">🐾 Other</button>
          </div>

          <div class="chip-group" role="radiogroup" aria-label="Gender">
            <button type="button" class="chip" data-filter="gender" data-value="all">Any gender</button>
            <button type="button" class="chip" data-filter="gender" data-value="male">♂ Male</button>
            <button type="button" class="chip" data-filter="gender" data-value="female">♀ Female</button>
          </div>

          <button type="button" class="advanced-toggle" id="advanced-toggle" aria-expanded="false">
            <span>More filters</span> <span class="adv-chevron">▾</span>
          </button>
        </div>

        <div class="advanced-panel" id="advanced-panel">
          <div class="advanced-grid">
            <div class="filter-group">
              <div class="filter-label">Age</div>
              <div class="chip-group">
                <button type="button" class="chip" data-filter="age" data-value="puppy">Puppy &lt;1y</button>
                <button type="button" class="chip" data-filter="age" data-value="young">Young 1–3y</button>
                <button type="button" class="chip" data-filter="age" data-value="adult">Adult 3–7y</button>
                <button type="button" class="chip" data-filter="age" data-value="senior">Senior 7+y</button>
              </div>
            </div>

            <div class="filter-group">
              <div class="filter-label">Weight</div>
              <div class="chip-group">
                <button type="button" class="chip" data-filter="weight" data-value="w30">≤30 lbs</button>
                <button type="button" class="chip" data-filter="weight" data-value="w50">31–50 lbs</button>
                <button type="button" class="chip" data-filter="weight" data-value="w50plus">50+ lbs</button>
              </div>
            </div>

            <div class="filter-group">
              <div class="filter-label">Good with</div>
              <div class="chip-group">
                <button type="button" class="chip" data-filter="gwCats">🐈 Cats</button>
                <button type="button" class="chip" data-filter="gwDogs">🐕 Dogs</button>
                <button type="button" class="chip" data-filter="gwKids">🧒 Kids</button>
              </div>
            </div>

            <div class="filter-group">
              <div class="filter-label">Traits</div>
              <div class="chip-group">
                <button type="button" class="chip" data-filter="housetrained">🏠 Housetrained</button>
                <button type="button" class="chip" data-filter="altered">✂️ Spayed/Neutered</button>
                <button type="button" class="chip" data-filter="mixed">🧬 Mixed Breed</button>
              </div>
            </div>
          </div>
        </div>

        <div class="filter-footer">
          <div class="result-count" id="result-count">Loading…</div>
          <button type="button" class="clear-btn" id="clear-filters">Clear filters</button>
        </div>
      `;
    }

    skeletonHTML() {
      const cells = Array.from({ length: 8 }).map(() => `
        <div class="skeleton-card">
          <div class="sk-img"></div>
          <div class="sk-line w70"></div>
          <div class="sk-line w50"></div>
          <div class="sk-line w90"></div>
        </div>
      `).join('');
      return `<div class="card-grid">${cells}</div>`;
    }

    // ── Event wiring ──────────────────────────────────────────────────────
    bindEvents() {
      const root = this.shadowRoot;

      // Search
      const searchInput = root.getElementById('f-search');
      let searchTimer = null;
      const onSearchInput = () => {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(() => {
          this.state.filters.search = searchInput.value.trim().toLowerCase();
          this.renderResults();
        }, 120);
      };
      searchInput.addEventListener('input', onSearchInput);
      searchInput.addEventListener('change', onSearchInput);

      // Chip clicks (delegated)
      root.querySelector('.filter-card').addEventListener('click', (e) => {
        const chip = e.target.closest('.chip');
        if (chip) {
          const filter = chip.dataset.filter;
          const value = chip.dataset.value;
          this.handleChip(filter, value);
          return;
        }
      });

      // Advanced toggle
      const advBtn = root.getElementById('advanced-toggle');
      const advPanel = root.getElementById('advanced-panel');
      advBtn.addEventListener('click', () => {
        this.state.showAdvanced = !this.state.showAdvanced;
        advBtn.setAttribute('aria-expanded', String(this.state.showAdvanced));
        advPanel.classList.toggle('open', this.state.showAdvanced);
      });

      // Clear filters
      root.getElementById('clear-filters').addEventListener('click', () => {
        this.state.filters = {
          search: '', species: 'all', gender: 'all',
          age: new Set(), weight: new Set(),
          gwCats: false, gwDogs: false, gwKids: false,
          housetrained: false, altered: false, mixed: false
        };
        searchInput.value = '';
        this.syncChipUI();
        this.renderResults();
      });

      // Modal close (delegated)
      const overlay = root.getElementById('modal-overlay');
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay || e.target.closest('[data-action="close-modal"]')) {
          this.closeModal();
        }
      });

      // Modal next/prev image (delegated)
      overlay.addEventListener('click', (e) => {
        const next = e.target.closest('[data-action="next-img"]');
        const prev = e.target.closest('[data-action="prev-img"]');
        const dot  = e.target.closest('[data-img-idx]');
        if (next) { this.changeModalImage(1); }
        if (prev) { this.changeModalImage(-1); }
        if (dot)  { this.setModalImage(parseInt(dot.dataset.imgIdx, 10)); }
      });

      // Card click (delegated) — open modal
      root.getElementById('results-section').addEventListener('click', (e) => {
        const card = e.target.closest('[data-pet-id]');
        if (card) {
          const id = card.dataset.petId;
          const pet = this.state.pets.find(p => p.id === id);
          if (pet) this.openModal(pet);
        }
      });

      // Escape closes modal
      this._keyHandler = (e) => {
        if (e.key === 'Escape' && this.state.modalPet) this.closeModal();
        if (this.state.modalPet) {
          if (e.key === 'ArrowRight') this.changeModalImage(1);
          if (e.key === 'ArrowLeft')  this.changeModalImage(-1);
        }
      };
      document.addEventListener('keydown', this._keyHandler);

      this.syncChipUI();
    }

    handleChip(filter, value) {
      const f = this.state.filters;
      if (filter === 'species' || filter === 'gender') {
        f[filter] = value;
      } else if (filter === 'age' || filter === 'weight') {
        if (f[filter].has(value)) f[filter].delete(value);
        else f[filter].add(value);
      } else {
        // boolean toggles: gwCats, gwDogs, gwKids, housetrained, altered, mixed
        f[filter] = !f[filter];
      }
      this.syncChipUI();
      this.renderResults();
    }

    syncChipUI() {
      const root = this.shadowRoot;
      const f = this.state.filters;
      root.querySelectorAll('.chip').forEach(chip => {
        const filter = chip.dataset.filter;
        const value = chip.dataset.value;
        let active = false;
        if (filter === 'species' || filter === 'gender') {
          active = f[filter] === value;
        } else if (filter === 'age' || filter === 'weight') {
          active = f[filter].has(value);
        } else {
          active = !!f[filter];
        }
        chip.classList.toggle('active', active);
      });
    }

    // ── Filtering & results render ─────────────────────────────────────────
    matchesFilters(pet) {
      const f = this.state.filters;

      if (f.search) {
        const s = f.search;
        const blob = (pet.name + ' ' + pet.breed + ' ' + pet.color + ' ' + pet.speciesLabel).toLowerCase();
        if (!blob.includes(s)) return false;
      }

      if (f.species !== 'all') {
        const sp = pet.species.toLowerCase();
        if (f.species === 'dog' && sp !== 'dog') return false;
        if (f.species === 'cat' && sp !== 'cat') return false;
        if (f.species === 'other' && (sp === 'dog' || sp === 'cat')) return false;
      }

      if (f.gender !== 'all') {
        const g = pet.gender.toLowerCase();
        if (f.gender === 'male' && g !== 'male') return false;
        if (f.gender === 'female' && g !== 'female') return false;
      }

      if (f.age.size > 0 && !f.age.has(pet.ageBucket)) return false;

      if (f.weight.size > 0) {
        const wMatch =
          (f.weight.has('w30')      && pet.weight30) ||
          (f.weight.has('w50')      && pet.weight50) ||
          (f.weight.has('w50plus')  && pet.weight50plus);
        if (!wMatch) return false;
      }

      if (f.gwCats && !pet.gwCats) return false;
      if (f.gwDogs && !pet.gwDogs) return false;
      if (f.gwKids && !pet.gwKids) return false;
      if (f.housetrained && !pet.housetrained) return false;
      if (f.altered && !pet.altered) return false;
      if (f.mixed && !pet.mixed) return false;

      return true;
    }

    renderResults() {
      const section = this.shadowRoot.getElementById('results-section');
      const countEl = this.shadowRoot.getElementById('result-count');

      if (this.state.loading) {
        section.innerHTML = this.skeletonHTML();
        if (countEl) countEl.textContent = 'Loading…';
        return;
      }

      if (this.state.error) {
        section.innerHTML = `
          <div class="state-card error">
            <div class="state-icon">😞</div>
            <h3>Couldn't load adoptable pets</h3>
            <p>Please refresh the page to try again. If this keeps happening, reach out at
              <a href="mailto:bigdogsdontcryrescue@gmail.com">bigdogsdontcryrescue@gmail.com</a>.</p>
          </div>
        `;
        if (countEl) countEl.textContent = '';
        return;
      }

      const matched = this.state.pets.filter(p => this.matchesFilters(p));
      const total = this.state.pets.length;

      // Sort: dogs first, then cats, then alpha by name
      matched.sort((a, b) => {
        const order = (s) => s === 'DOG' ? 0 : s === 'CAT' ? 1 : 2;
        const oa = order(a.species), ob = order(b.species);
        if (oa !== ob) return oa - ob;
        return a.name.localeCompare(b.name);
      });

      if (countEl) {
        countEl.innerHTML = matched.length === total
          ? `<strong>${total}</strong> ${total === 1 ? 'pet' : 'pets'} ready for adoption`
          : `Showing <strong>${matched.length}</strong> of <strong>${total}</strong> pets`;
      }

      if (matched.length === 0) {
        section.innerHTML = `
          <div class="state-card empty">
            <div class="state-icon">🐾</div>
            <h3>No matches with these filters</h3>
            <p>Try clearing a filter or two — the perfect pup or kitty might be just outside your search.</p>
            <button type="button" class="state-btn" onclick="this.getRootNode().host.shadowRoot.getElementById('clear-filters').click()">
              Clear all filters
            </button>
          </div>
        `;
        return;
      }

      section.innerHTML = `<div class="card-grid">${matched.map(p => this.petCardHTML(p)).join('')}</div>`;
    }

    petCardHTML(p) {
      const trait = (cond, label, icon) =>
        `<span class="trait-pill ${cond ? 'on' : 'off'}" title="${label}: ${cond ? 'Yes' : 'No'}">${icon}</span>`;

      const breedLine = p.breed ? p.breed.split(',').slice(0, 2).map(b => b.trim()).join(' · ') : p.speciesLabel;
      const ageDisplay = p.ageString || (p.ageBucket ? p.ageBucket.charAt(0).toUpperCase() + p.ageBucket.slice(1) : '');
      const weightDisplay = p.weightLbs ? `${Math.round(p.weightLbs)} lbs` : '';

      return `
        <article class="card" data-pet-id="${escapeAttr(p.id)}" tabindex="0" role="button" aria-label="View details for ${escapeAttr(p.name)}">
          <div class="card-img-wrap">
            <img class="card-img" src="${escapeAttr(p.images[0])}" alt="${escapeAttr(p.name)}" loading="lazy" onerror="this.src='${PLACEHOLDER_IMG}'">
            <div class="card-species-badge">${p.species === 'DOG' ? '🐕' : p.species === 'CAT' ? '🐈' : '🐾'} ${escapeHtml(p.speciesLabel)}</div>
            ${p.needsExperienced ? '<div class="card-flag">⚠️ Experienced adopter</div>' : ''}
          </div>
          <div class="card-body">
            <h3 class="card-name">${escapeHtml(p.name)}</h3>
            <p class="card-meta">
              ${escapeHtml(breedLine)}
              ${p.gender ? ` · ${escapeHtml(p.gender)}` : ''}
              ${ageDisplay ? ` · ${escapeHtml(ageDisplay)}` : ''}
              ${weightDisplay ? ` · ${escapeHtml(weightDisplay)}` : ''}
            </p>
            <div class="trait-row">
              ${trait(p.gwCats, 'Good with cats', '🐈')}
              ${trait(p.gwDogs, 'Good with dogs', '🐕')}
              ${trait(p.gwKids, 'Good with kids', '🧒')}
              ${trait(p.housetrained, 'Housetrained', '🏠')}
              ${trait(p.altered, 'Spayed/neutered', '✂️')}
            </div>
            <div class="card-cta">Meet ${escapeHtml(p.name)} <span class="arrow">→</span></div>
          </div>
        </article>
      `;
    }

    // ── Modal ──────────────────────────────────────────────────────────────
    openModal(pet) {
      this.state.modalPet = pet;
      this.state.modalImageIdx = 0;
      const overlay = this.shadowRoot.getElementById('modal-overlay');
      const content = this.shadowRoot.getElementById('modal-content');
      content.innerHTML = this.modalContentHTML(pet);
      overlay.classList.add('active');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    closeModal() {
      const overlay = this.shadowRoot.getElementById('modal-overlay');
      overlay.classList.remove('active');
      overlay.setAttribute('aria-hidden', 'true');
      this.state.modalPet = null;
      document.body.style.overflow = '';
    }

    setModalImage(idx) {
      const p = this.state.modalPet;
      if (!p) return;
      this.state.modalImageIdx = Math.max(0, Math.min(idx, p.images.length - 1));
      this.refreshModalImage();
    }

    changeModalImage(delta) {
      const p = this.state.modalPet;
      if (!p) return;
      const n = p.images.length;
      this.state.modalImageIdx = (this.state.modalImageIdx + delta + n) % n;
      this.refreshModalImage();
    }

    refreshModalImage() {
      const p = this.state.modalPet;
      const root = this.shadowRoot;
      const idx = this.state.modalImageIdx;
      const img = root.querySelector('.modal-main-img');
      if (img) img.src = p.images[idx];
      root.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('on', i === idx));
      const counter = root.querySelector('.image-counter');
      if (counter) counter.textContent = `${idx + 1} / ${p.images.length}`;
    }

    modalContentHTML(p) {
      const yes = (b) => b ? '<span class="yes">✓ Yes</span>' : '<span class="no">— No</span>';
      const breedLine = p.breed ? titleCase(p.breed) : p.speciesLabel;
      const ageDisplay = p.ageString || '';
      const weightDisplay = p.weightLbs ? `${Math.round(p.weightLbs)} lbs` : 'Not listed';

      const galleryControls = p.images.length > 1 ? `
        <button type="button" class="gallery-arrow gallery-prev" data-action="prev-img" aria-label="Previous photo">‹</button>
        <button type="button" class="gallery-arrow gallery-next" data-action="next-img" aria-label="Next photo">›</button>
        <div class="gallery-dots">
          ${p.images.map((_, i) => `<button type="button" class="dot ${i === 0 ? 'on' : ''}" data-img-idx="${i}" aria-label="Photo ${i+1}"></button>`).join('')}
        </div>
        <div class="image-counter">1 / ${p.images.length}</div>
      ` : '';

      const description = p.description
        ? p.description.split(/\n+/).map(line => `<p>${escapeHtml(line)}</p>`).join('')
        : '<p><em>No description provided yet — but they\'re still wonderful, we promise.</em></p>';

      const specialNeeds = p.specialNeeds && p.specialNeeds.toLowerCase() !== 'none'
        ? `<div class="special-needs">
             <strong>Special Needs:</strong> ${escapeHtml(p.specialNeeds)}
           </div>`
        : '';

      const experiencedFlag = p.needsExperienced
        ? `<div class="experienced-flag">⚠️ Best suited for an experienced adopter</div>`
        : '';

      return `
        <button type="button" class="modal-close" data-action="close-modal" aria-label="Close">×</button>
        <div class="modal-grid">
          <div class="modal-gallery">
            <div class="gallery-stage">
              <img class="modal-main-img" src="${escapeAttr(p.images[0])}" alt="${escapeAttr(p.name)}" onerror="this.src='${PLACEHOLDER_IMG}'">
              ${galleryControls}
            </div>
          </div>
          <div class="modal-info">
            <h2 class="modal-name" id="modal-title">${escapeHtml(p.name)}</h2>
            <p class="modal-meta">${escapeHtml(breedLine)}${p.color ? ' · ' + escapeHtml(p.color) : ''}</p>
            ${experiencedFlag}

            <div class="modal-attrs">
              <div class="attr"><span class="attr-label">Species</span><span class="attr-value">${escapeHtml(p.speciesLabel)}</span></div>
              <div class="attr"><span class="attr-label">Gender</span><span class="attr-value">${escapeHtml(p.gender || '—')}</span></div>
              <div class="attr"><span class="attr-label">Age</span><span class="attr-value">${escapeHtml(ageDisplay || '—')}</span></div>
              <div class="attr"><span class="attr-label">Weight</span><span class="attr-value">${escapeHtml(weightDisplay)}</span></div>
              <div class="attr"><span class="attr-label">Adoption Fee</span><span class="attr-value">${escapeHtml(p.fee || '—')}</span></div>
              <div class="attr"><span class="attr-label">Mixed Breed</span><span class="attr-value">${yes(p.mixed)}</span></div>
            </div>

            <div class="modal-section">
              <h4>About ${escapeHtml(p.name)}</h4>
              <div class="modal-description">${description}</div>
              ${specialNeeds}
            </div>

            <div class="modal-section">
              <h4>Compatibility & Care</h4>
              <div class="compat-grid">
                <div class="compat"><span>🐈 Good with cats</span>${yes(p.gwCats)}</div>
                <div class="compat"><span>🐕 Good with dogs</span>${yes(p.gwDogs)}</div>
                <div class="compat"><span>🧒 Good with kids</span>${yes(p.gwKids)}</div>
                <div class="compat"><span>🏠 Housetrained</span>${yes(p.housetrained)}</div>
                <div class="compat"><span>✂️ Spayed/neutered</span>${yes(p.altered)}</div>
              </div>
            </div>

            <div class="modal-actions">
              <a class="btn btn-primary" href="${APPLY_URL}" target="_top">
                Apply to Adopt ${escapeHtml(p.name)} <span class="arrow">→</span>
              </a>
              <button type="button" class="btn btn-secondary" data-action="close-modal">Keep browsing</button>
            </div>
          </div>
        </div>
      `;
    }

    // ── Styles (compact, BDDC house style) ────────────────────────────────
    styles() {
      return `
        :host {
          --pink: #F5367C;
          --pink-deep: #c2255c;
          --pink-soft: #ffd9ec;
          --pink-bg: #fff7fa;
          --pink-light: #ffe9f1;
          --gold: #f5b800;
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
          font-size: clamp(36px, 5.5vw, 60px);
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
          max-width: 1280px;
          margin: 0 auto;
          padding: 28px 20px 56px;
        }

        /* Filter card */
        .filter-card {
          background: #fff;
          border: 2px solid var(--pink-soft);
          border-radius: 18px;
          padding: 22px 24px;
          margin-bottom: 28px;
          box-shadow: var(--shadow-sm);
          position: sticky;
          top: 12px;
          z-index: 10;
        }
        .filter-row.primary {
          display: grid;
          grid-template-columns: minmax(220px, 1.2fr) auto auto auto;
          gap: 14px;
          align-items: center;
        }
        .search-wrap {
          position: relative;
        }
        .search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 16px;
          opacity: 0.5;
        }
        .search-input {
          width: 100%;
          padding: 12px 14px 12px 40px;
          border: 2px solid var(--pink-soft);
          border-radius: 999px;
          font-size: 15px;
          font-family: inherit;
          color: var(--ink);
          background: var(--pink-bg);
          transition: border-color .2s ease, background .2s ease, box-shadow .2s ease;
        }
        .search-input:focus {
          outline: none;
          border-color: var(--pink);
          background: #fff;
          box-shadow: 0 0 0 4px rgba(245,54,124,0.10);
        }
        .chip-group {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        .chip {
          padding: 8px 14px;
          background: #fff;
          border: 2px solid var(--pink-soft);
          border-radius: 999px;
          font-size: 13.5px;
          font-weight: 600;
          color: var(--ink);
          cursor: pointer;
          font-family: inherit;
          transition: background .15s ease, border-color .15s ease, color .15s ease, transform .1s ease;
          white-space: nowrap;
        }
        .chip:hover {
          border-color: var(--pink);
          color: var(--pink-deep);
          transform: translateY(-1px);
        }
        .chip.active {
          background: var(--pink);
          border-color: var(--pink);
          color: #fff;
          box-shadow: 0 4px 10px rgba(245,54,124,0.25);
        }
        .advanced-toggle {
          padding: 9px 16px;
          background: var(--pink-bg);
          border: 2px solid var(--pink-soft);
          border-radius: 999px;
          font-size: 13.5px;
          font-weight: 700;
          color: var(--pink-deep);
          cursor: pointer;
          font-family: inherit;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: background .15s ease;
          white-space: nowrap;
        }
        .advanced-toggle:hover { background: var(--pink-light); }
        .advanced-toggle .adv-chevron { transition: transform .25s ease; }
        .advanced-toggle[aria-expanded="true"] .adv-chevron { transform: rotate(180deg); }

        .advanced-panel {
          max-height: 0;
          overflow: hidden;
          transition: max-height .3s ease;
        }
        .advanced-panel.open {
          max-height: 600px;
          padding-top: 18px;
        }
        .advanced-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 18px 24px;
        }
        .filter-group { min-width: 0; }
        .filter-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--pink);
          margin-bottom: 8px;
        }
        .filter-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 14px;
          padding-top: 14px;
          border-top: 1px dashed var(--pink-soft);
          gap: 12px;
          flex-wrap: wrap;
        }
        .result-count {
          font-size: 14px;
          color: var(--muted);
        }
        .result-count strong { color: var(--pink-deep); font-size: 1.05em; }
        .clear-btn {
          padding: 7px 14px;
          background: transparent;
          border: 1px solid var(--pink-soft);
          border-radius: 999px;
          font-size: 13px;
          font-weight: 600;
          color: var(--muted);
          cursor: pointer;
          font-family: inherit;
          transition: color .15s ease, border-color .15s ease;
        }
        .clear-btn:hover { color: var(--pink-deep); border-color: var(--pink); }

        /* Card grid */
        .card-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 22px;
        }
        @media (max-width: 1100px) { .card-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 820px)  { .card-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px)  { .card-grid { grid-template-columns: 1fr; } }

        .card {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          border: 2px solid var(--pink-soft);
          cursor: pointer;
          transition: transform .2s ease, box-shadow .25s ease, border-color .25s ease;
          display: flex;
          flex-direction: column;
        }
        .card:hover, .card:focus-visible {
          transform: translateY(-6px);
          box-shadow: var(--shadow-md);
          border-color: var(--pink);
          outline: none;
        }
        .card-img-wrap {
          position: relative;
          aspect-ratio: 4 / 5;
          overflow: hidden;
          background: var(--pink-bg);
        }
        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform .35s ease;
        }
        .card:hover .card-img { transform: scale(1.04); }
        .card-species-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          padding: 5px 12px;
          background: rgba(255,255,255,0.95);
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          color: var(--pink-deep);
          box-shadow: 0 2px 8px rgba(0,0,0,0.10);
        }
        .card-flag {
          position: absolute;
          bottom: 10px;
          left: 10px;
          right: 10px;
          padding: 6px 10px;
          background: rgba(255, 167, 38, 0.95);
          border-radius: 8px;
          font-size: 11.5px;
          font-weight: 700;
          color: #fff;
          text-align: center;
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
        }
        .card-body {
          padding: 16px 18px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .card-name {
          margin: 0 0 4px;
          color: var(--pink-deep);
          font-size: 22px;
          font-weight: 700;
          line-height: 1.15;
        }
        .card-meta {
          margin: 0 0 12px;
          font-size: 13px;
          color: var(--muted);
          line-height: 1.4;
        }
        .trait-row {
          display: flex;
          gap: 6px;
          margin-bottom: 14px;
        }
        .trait-pill {
          width: 28px;
          height: 28px;
          display: grid;
          place-items: center;
          font-size: 14px;
          border-radius: 50%;
          background: var(--pink-bg);
          border: 1px solid var(--pink-soft);
          transition: opacity .2s ease, background .2s ease;
        }
        .trait-pill.off { opacity: 0.25; filter: grayscale(0.8); }
        .trait-pill.on  { background: var(--pink-light); }
        .card-cta {
          margin-top: auto;
          font-size: 14px;
          font-weight: 700;
          color: var(--pink-deep);
          letter-spacing: .3px;
        }
        .card:hover .card-cta { color: var(--pink); }
        .arrow { display: inline-block; transition: transform .15s ease; }
        .card:hover .arrow { transform: translateX(4px); }

        /* Skeleton */
        .skeleton-card {
          background: #fff;
          border-radius: 16px;
          padding: 16px;
          border: 2px solid var(--pink-soft);
        }
        .sk-img {
          aspect-ratio: 4 / 5;
          background: var(--pink-bg);
          border-radius: 10px;
          margin-bottom: 14px;
          animation: pulse-skel 1.4s ease-in-out infinite;
        }
        .sk-line {
          height: 12px;
          background: var(--pink-bg);
          border-radius: 4px;
          margin-bottom: 8px;
          animation: pulse-skel 1.4s ease-in-out infinite;
        }
        .sk-line.w70 { width: 70%; }
        .sk-line.w50 { width: 50%; }
        .sk-line.w90 { width: 90%; }
        @keyframes pulse-skel {
          0%, 100% { opacity: 0.6; }
          50%      { opacity: 1; }
        }

        /* State cards */
        .state-card {
          padding: 56px 28px;
          text-align: center;
          background: var(--pink-bg);
          border: 2px dashed var(--pink-soft);
          border-radius: 18px;
        }
        .state-icon {
          font-size: 56px;
          margin-bottom: 14px;
        }
        .state-card h3 {
          margin: 0 0 10px;
          color: var(--pink-deep);
          font-size: 22px;
        }
        .state-card p {
          margin: 0 auto 18px;
          max-width: 480px;
          color: var(--muted);
          line-height: 1.55;
        }
        .state-btn {
          padding: 10px 22px;
          background: var(--pink);
          border: 0;
          border-radius: 999px;
          color: #fff;
          font-weight: 700;
          cursor: pointer;
          font-family: inherit;
        }
        .state-btn:hover { background: var(--pink-deep); }

        /* Modal */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(20, 10, 25, 0.6);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          opacity: 0;
          visibility: hidden;
          transition: opacity .3s ease, visibility .3s ease;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          overflow-y: auto;
        }
        .modal-overlay.active {
          opacity: 1;
          visibility: visible;
        }
        .modal {
          background: #fff;
          border-radius: 22px;
          width: 100%;
          max-width: 920px;
          max-height: calc(100vh - 40px);
          box-shadow: 0 24px 60px rgba(0,0,0,0.35);
          transform: translateY(20px) scale(0.98);
          transition: transform .3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .modal-overlay.active .modal { transform: translateY(0) scale(1); }
        .modal-close {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255,255,255,0.92);
          border: 0;
          cursor: pointer;
          font-size: 24px;
          line-height: 1;
          color: var(--pink-deep);
          z-index: 10;
          display: grid;
          place-items: center;
          box-shadow: 0 2px 10px rgba(0,0,0,0.15);
          transition: background .15s ease, color .15s ease, transform .15s ease;
        }
        .modal-close:hover {
          background: var(--pink);
          color: #fff;
          transform: rotate(90deg);
        }
        .modal-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          overflow: auto;
          flex: 1;
          min-height: 0;
        }

        /* Modal gallery */
        .modal-gallery { background: var(--pink-bg); position: relative; min-height: 320px; }
        .gallery-stage {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 360px;
          display: grid;
          place-items: center;
        }
        .modal-main-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .gallery-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: rgba(255,255,255,0.92);
          border: 0;
          font-size: 28px;
          line-height: 1;
          color: var(--pink-deep);
          cursor: pointer;
          font-family: inherit;
          font-weight: 700;
          display: grid;
          place-items: center;
          box-shadow: 0 2px 10px rgba(0,0,0,0.20);
          transition: background .15s ease, color .15s ease;
        }
        .gallery-arrow:hover { background: var(--pink); color: #fff; }
        .gallery-prev { left: 14px; }
        .gallery-next { right: 14px; }
        .gallery-dots {
          position: absolute;
          bottom: 14px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          gap: 6px;
        }
        .dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: rgba(255,255,255,0.55);
          border: 0;
          cursor: pointer;
          padding: 0;
          transition: background .15s ease, transform .15s ease;
        }
        .dot.on { background: var(--pink); transform: scale(1.3); }
        .image-counter {
          position: absolute;
          top: 14px;
          right: 14px;
          padding: 4px 10px;
          background: rgba(0,0,0,0.55);
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
          color: #fff;
          letter-spacing: .3px;
        }

        /* Modal info */
        .modal-info {
          padding: 28px 32px 32px;
          overflow-y: auto;
        }
        .modal-name {
          margin: 0 0 4px;
          color: var(--pink-deep);
          font-size: clamp(28px, 3.5vw, 38px);
          font-weight: 700;
          line-height: 1.1;
        }
        .modal-meta {
          margin: 0 0 16px;
          color: var(--muted);
          font-size: 15px;
          font-style: italic;
        }
        .experienced-flag {
          padding: 10px 14px;
          background: #fff4e0;
          border-left: 4px solid #ffa726;
          border-radius: 6px;
          margin-bottom: 18px;
          font-size: 13.5px;
          font-weight: 600;
          color: #b65500;
        }
        .modal-attrs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px 18px;
          margin-bottom: 22px;
          padding: 16px;
          background: var(--pink-bg);
          border-radius: 12px;
        }
        .attr {
          display: flex;
          justify-content: space-between;
          gap: 8px;
          font-size: 14px;
          line-height: 1.4;
        }
        .attr-label {
          color: var(--muted);
          font-weight: 600;
        }
        .attr-value {
          color: var(--ink);
          font-weight: 700;
          text-align: right;
        }
        .modal-section {
          margin-bottom: 22px;
        }
        .modal-section h4 {
          margin: 0 0 10px;
          color: var(--pink-deep);
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        .modal-description p {
          margin: 0 0 10px;
          font-size: 15px;
          line-height: 1.65;
          color: var(--ink);
        }
        .modal-description p:last-child { margin-bottom: 0; }
        .special-needs {
          margin-top: 14px;
          padding: 12px 14px;
          background: #fff4e0;
          border-left: 4px solid #ffa726;
          border-radius: 6px;
          font-size: 14px;
          line-height: 1.5;
        }
        .special-needs strong { color: #b65500; }
        .compat-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px 18px;
        }
        .compat {
          display: flex;
          justify-content: space-between;
          gap: 8px;
          font-size: 14px;
          padding: 6px 0;
          border-bottom: 1px dashed var(--pink-soft);
        }
        .compat:last-child { border-bottom: 0; }
        .yes { color: var(--green); font-weight: 700; }
        .no  { color: var(--muted); font-weight: 600; }
        .modal-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 8px;
        }
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
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
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(245,54,124,0.40);
        }
        .btn-secondary {
          background: transparent;
          color: var(--pink-deep);
          border: 2px solid var(--pink-soft);
        }
        .btn-secondary:hover {
          background: var(--pink-bg);
          border-color: var(--pink);
        }

        @media (max-width: 820px) {
          .filter-row.primary {
            grid-template-columns: 1fr;
          }
          .filter-card { position: static; }
          .modal-grid { grid-template-columns: 1fr; }
          .modal-gallery { aspect-ratio: 4 / 3; min-height: 280px; }
          .gallery-stage { min-height: 280px; }
        }
        @media (max-width: 480px) {
          .modal-info { padding: 22px 20px 24px; }
          .modal-attrs, .compat-grid { grid-template-columns: 1fr; }
          .modal-actions .btn { width: 100%; justify-content: center; }
        }
      `;
    }
  }

  // ── Helpers ─────────────────────────────────────────────────────────────
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

  if (!customElements.get('bddc-adoptable')) {
    customElements.define('bddc-adoptable', BDDCAdoptable);
  }
})();
