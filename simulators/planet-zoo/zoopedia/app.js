/* ═══════════════════════════════════════════════════════════════
   Zoopedia — Planet Zoo · Grey Pilgrim Games
   app.js — all state, filtering, rendering, and compatibility logic
   ═══════════════════════════════════════════════════════════════ */

// ── 1. Constants ────────────────────────────────────────────────

const CONSERVATION_ORDER = ['CR', 'EW', 'EN', 'VU', 'NT', 'LC', 'DD'];
const CONSERVATION_LABELS = { CR: 'Critically Endangered', EW: 'Extinct in Wild',
  EN: 'Endangered', VU: 'Vulnerable', NT: 'Near Threatened', LC: 'Least Concern', DD: 'Data Deficient' };
const CONSERVATION_COLORS = { CR: '#e53935', EW: '#6d1e1e', EN: '#ff7043',
  VU: '#ffc107', NT: '#26a69a', LC: '#4caf50', DD: '#9e9e9e' };

const DIET_LABELS = {
  herbivore:  'Herbivore',
  carnivore:  'Carnivore',
  omnivore:   'Omnivore',
  insectivore:'Insectivore',
  piscivore:  'Piscivore',
};
const DIET_ICONS = { herbivore:'🌿', carnivore:'🥩', omnivore:'🍽️', insectivore:'🪲', piscivore:'🐟' };

const TERRAIN_LABELS = {
  'grass':'Grass', 'dirt':'Dirt', 'rock':'Rock', 'sand':'Sand',
  'snow':'Snow', 'ice':'Ice', 'mud':'Mud', 'gravel':'Gravel',
  'clay':'Clay', 'shallow-water':'Shallow Water', 'deep-water':'Deep Water', 'pebble':'Pebble',
};
const FOLIAGE_LABELS = {
  'savanna-tree':'Savanna Tree','tropical-tree':'Tropical Tree',
  'temperate-tree':'Temperate Tree','boreal-tree':'Boreal Tree',
  'desert-shrub':'Desert Shrub','shrub':'Shrub','groundcover':'Groundcover',
  'wetland-plant':'Wetland Plant','tundra-plant':'Tundra Plant',
  'aquatic-plant':'Aquatic Plant','cactus':'Cactus','bamboo':'Bamboo','moss':'Moss',
};

const STORAGE_PLATFORM  = 'pz-platform';
const STORAGE_PACKS     = 'pz-owned-packs';
const STORAGE_BANNER    = 'pz-banner-dismissed';

// ── 2. App data ──────────────────────────────────────────────────

let animals = [];   // full loaded dataset
let packs   = [];   // pack metadata

// ── 3. Two-tier state ────────────────────────────────────────────

// prefs: persisted to localStorage, gates what is visible
const prefs = {
  platform:   localStorage.getItem(STORAGE_PLATFORM) || 'any',
  ownedPacks: new Set(JSON.parse(localStorage.getItem(STORAGE_PACKS) || '[]')),
};

// state: ephemeral filter/view state (could be URL-param'd in the future)
const state = {
  mode:        'browse',   // 'browse' | 'matcher' | 'checker'
  search:      '',
  continents:  new Set(),
  biomes:      new Set(),
  conservation:new Set(),
  diet:        new Set(),
  needsWater:  'any',      // 'any' | 'yes' | 'no'
  tempMin:     null,
  tempMax:     null,
  humidMin:    null,
  humidMax:    null,
  sort:        'name',
  checkerIds:  [],          // up to 4 animal IDs
  detailId:    null,
};

function savePrefs() {
  localStorage.setItem(STORAGE_PLATFORM, prefs.platform);
  localStorage.setItem(STORAGE_PACKS, JSON.stringify([...prefs.ownedPacks]));
}

// ── 4. Data loading ──────────────────────────────────────────────

async function loadData() {
  try {
    const [animalsRes, packsRes] = await Promise.all([
      fetch('data/animals.json'),
      fetch('data/packs.json'),
    ]);
    animals = await animalsRes.json();
    packs   = await packsRes.json();
  } catch (e) {
    document.getElementById('loading-state').textContent = 'Failed to load species data. Please refresh.';
    return;
  }
  initApp();
}

// ── 5. Filter engine ────────────────────────────────────────────

function getVisibleAnimals() {
  let list = animals;

  // Platform gate (prefs)
  if (prefs.platform !== 'any') {
    list = list.filter(a => a.platforms && a.platforms.includes(prefs.platform));
  }

  // Owned packs gate (prefs)
  if (prefs.ownedPacks.size > 0) {
    list = list.filter(a => prefs.ownedPacks.has(a.pack));
  }

  return list;
}

function applyFilters(list) {
  // Text search
  if (state.search) {
    const q = state.search.toLowerCase();
    list = list.filter(a => a.name.toLowerCase().includes(q));
  }

  // Continent
  if (state.continents.size > 0) {
    list = list.filter(a =>
      a.continents && a.continents.some(c => state.continents.has(c))
    );
  }

  // Biome
  if (state.biomes.size > 0) {
    list = list.filter(a =>
      a.biomes && a.biomes.some(b => state.biomes.has(b))
    );
  }

  // Conservation
  if (state.conservation.size > 0) {
    list = list.filter(a => state.conservation.has(a.conservationStatus));
  }

  // Diet
  if (state.diet.size > 0) {
    list = list.filter(a => state.diet.has(a.diet));
  }

  // Needs water
  if (state.needsWater === 'yes') {
    list = list.filter(a => (a.waterMin || 0) > 0);
  } else if (state.needsWater === 'no') {
    list = list.filter(a => (a.waterMin || 0) === 0);
  }

  // Temperature range — show animals whose comfort range overlaps with the filter range
  if (state.tempMin !== null || state.tempMax !== null) {
    const qMin = state.tempMin !== null ? state.tempMin : -Infinity;
    const qMax = state.tempMax !== null ? state.tempMax :  Infinity;
    list = list.filter(a => {
      if (a.tempMin == null) return true; // no data — include
      return a.tempMin <= qMax && a.tempMax >= qMin;
    });
  }

  // Humidity range
  if (state.humidMin !== null || state.humidMax !== null) {
    const qMin = state.humidMin !== null ? state.humidMin : -Infinity;
    const qMax = state.humidMax !== null ? state.humidMax :  Infinity;
    list = list.filter(a => {
      if (a.humidityMin == null) return true;
      return a.humidityMin <= qMax && a.humidityMax >= qMin;
    });
  }

  // Matcher-specific constraints (land/water limits, terrain/foliage available)
  if (state._matcherLandLimit != null) {
    list = list.filter(a => a.landMin == null || a.landMin <= state._matcherLandLimit);
  }
  if (state._matcherWaterLimit != null) {
    list = list.filter(a => a.waterMin == null || a.waterMin <= state._matcherWaterLimit);
  }
  if (state._matcherTerrain) {
    list = list.filter(a =>
      !a.terrain || a.terrain.length === 0 ||
      a.terrain.some(t => state._matcherTerrain.has(t))
    );
  }
  if (state._matcherFoliage) {
    list = list.filter(a =>
      !a.foliage || a.foliage.length === 0 ||
      a.foliage.some(f => state._matcherFoliage.has(f))
    );
  }

  return list;
}

function sortAnimals(list) {
  const sorted = [...list];
  switch (state.sort) {
    case 'name':         sorted.sort((a, b) => a.name.localeCompare(b.name)); break;
    case 'name-z':       sorted.sort((a, b) => b.name.localeCompare(a.name)); break;
    case 'appeal':       sorted.sort((a, b) => (b.appeal || 0) - (a.appeal || 0)); break;
    case 'conservation': sorted.sort((a, b) =>
      CONSERVATION_ORDER.indexOf(a.conservationStatus || 'DD') -
      CONSERVATION_ORDER.indexOf(b.conservationStatus || 'DD')
    ); break;
    case 'temp-cold':    sorted.sort((a, b) => (a.tempMin ?? 999) - (b.tempMin ?? 999)); break;
    case 'temp-hot':     sorted.sort((a, b) => (b.tempMax ?? -999) - (a.tempMax ?? -999)); break;
  }
  return sorted;
}

// ── 6. Compatibility engine ──────────────────────────────────────

function runCompatibilityCheck(ids) {
  const selected = ids.map(id => animals.find(a => a.id === id)).filter(Boolean);
  if (selected.length < 2) return null;

  const t1 = tier1Physical(selected);
  const t2 = t1.pass ? tier2Overlap(selected) : null;
  const t3 = (t1.pass && t2 && t2.pass) ? tier3Synergies(selected) : null;

  return { animals: selected, t1, t2, t3 };
}

function tier1Physical(list) {
  const rows = [];
  let pass = true;

  // Predator / prey check
  for (const a of list) {
    for (const b of list) {
      if (a.id === b.id) continue;
      if (a.isPredator && b.isPrey) {
        rows.push({ icon:'❌', label:'Predator / Prey',
          value: `${a.name} would hunt ${b.name}`, cls:'t-fail' });
        pass = false;
      }
    }
  }

  // Cohabitation approval check
  if (pass) {
    const pairs = [];
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        pairs.push([list[i], list[j]]);
      }
    }

    for (const [a, b] of pairs) {
      const aHasData = (a.cohabitApproved || []).length > 0;
      const bHasData = (b.cohabitApproved || []).length > 0;

      if (!aHasData && !bHasData) {
        rows.push({ icon:'⚠️', label:'Co-habitation',
          value:`${a.name} + ${b.name}: no data — verify in-game`, cls:'t-warn' });
      } else {
        const aOk = !aHasData || (a.cohabitApproved || []).includes(b.id);
        const bOk = !bHasData || (b.cohabitApproved || []).includes(a.id);
        if (!aOk || !bOk) {
          rows.push({ icon:'❌', label:'Co-habitation',
            value:`${a.name} + ${b.name}: not approved to share a habitat`, cls:'t-fail' });
          pass = false;
        } else {
          rows.push({ icon:'✅', label:'Co-habitation',
            value:`${a.name} + ${b.name}: approved`, cls:'t-ok' });
        }
      }
    }
  }

  if (rows.length === 0) {
    rows.push({ icon:'✅', label:'Physical', value:'No predator/prey conflicts', cls:'t-ok' });
  }

  return { pass, rows };
}

function tier2Overlap(list) {
  const withData = list.filter(a => a.tempMin != null);
  const rows = [];
  let pass = true;

  if (withData.length < 2) {
    return { pass: true, rows: [{ icon:'⚠️', label:'Data', value:'Habitat data unavailable for one or more species — overlap cannot be calculated', cls:'t-warn' }] };
  }

  // Temperature
  const tMin = Math.max(...withData.map(a => a.tempMin));
  const tMax = Math.min(...withData.map(a => a.tempMax));
  if (tMin <= tMax) {
    rows.push({ icon:'✅', label:'Temperature', value:`Overlap: ${tMin}–${tMax}°C`, cls:'t-ok' });
  } else {
    rows.push({ icon:'❌', label:'Temperature', value:`No overlap (ranges: ${withData.map(a=>`${a.tempMin}–${a.tempMax}°C`).join(', ')})`, cls:'t-fail' });
    pass = false;
  }

  // Humidity
  const hMin = Math.max(...withData.map(a => a.humidityMin));
  const hMax = Math.min(...withData.map(a => a.humidityMax));
  if (hMin <= hMax) {
    rows.push({ icon:'✅', label:'Humidity', value:`Overlap: ${hMin}–${hMax}%`, cls:'t-ok' });
  } else {
    rows.push({ icon:'❌', label:'Humidity', value:`No overlap (ranges: ${withData.map(a=>`${a.humidityMin}–${a.humidityMax}%`).join(', ')})`, cls:'t-fail' });
    pass = false;
  }

  // Land / water
  const landMin = Math.max(...withData.map(a => a.landMin || 0));
  const waterMin = Math.max(...withData.map(a => a.waterMin || 0));
  if (landMin + waterMin <= 100) {
    const parts = [];
    if (landMin > 0)  parts.push(`≥${landMin}% land`);
    if (waterMin > 0) parts.push(`≥${waterMin}% water`);
    rows.push({ icon:'✅', label:'Land / Water', value: parts.length ? parts.join(', ') : 'No minimum constraints', cls:'t-ok' });
  } else {
    rows.push({ icon:'❌', label:'Land / Water', value:`Impossible: land ≥${landMin}% + water ≥${waterMin}% exceeds 100%`, cls:'t-fail' });
    pass = false;
  }

  // Terrain
  const withTerrain = withData.filter(a => (a.terrain || []).length > 0);
  if (withTerrain.length >= 2) {
    const sets = withTerrain.map(a => new Set(a.terrain));
    const overlap = [...sets[0]].filter(t => sets.every(s => s.has(t)));
    if (overlap.length > 0) {
      rows.push({ icon:'✅', label:'Terrain', value:`Common: ${overlap.map(t => TERRAIN_LABELS[t] || t).join(', ')}`, cls:'t-ok' });
    } else {
      rows.push({ icon:'❌', label:'Terrain', value:'No common terrain type', cls:'t-fail' });
      pass = false;
    }
  }

  // Foliage
  const withFoliage = withData.filter(a => (a.foliage || []).length > 0);
  if (withFoliage.length >= 2) {
    const sets = withFoliage.map(a => new Set(a.foliage));
    const overlap = [...sets[0]].filter(f => sets.every(s => s.has(f)));
    if (overlap.length > 0) {
      rows.push({ icon:'✅', label:'Foliage', value:`Common: ${overlap.map(f => FOLIAGE_LABELS[f] || f).join(', ')}`, cls:'t-ok' });
    } else {
      rows.push({ icon:'❌', label:'Foliage', value:'No common foliage type', cls:'t-fail' });
      pass = false;
    }
  }

  // Flora origin
  const origins = [...new Set(withData.map(a => a.floraOrigin).filter(Boolean))];
  if (origins.length > 1) {
    rows.push({ icon:'⚠️', label:'Flora Origin', value:`Mixed origins (${origins.join(', ')}) — off-origin flora reduces guest appeal`, cls:'t-warn' });
  } else if (origins.length === 1) {
    rows.push({ icon:'✅', label:'Flora Origin', value:`All ${origins[0]} flora — consistent theme`, cls:'t-ok' });
  }

  return { pass, rows };
}

function tier3Synergies(list) {
  const rows = [];

  // Co-habitation bonuses
  const seen = new Set();
  for (const a of list) {
    for (const bonus of (a.cohabitBonus || [])) {
      const partner = list.find(b => b.id === bonus.id);
      if (!partner) continue;
      const key = [a.id, partner.id].sort().join('|');
      if (seen.has(key)) continue;
      seen.add(key);
      const typeLabel = bonus.bonusType === 'appeal' ? '📈 Appeal bonus' : '💚 Welfare bonus';
      rows.push({ icon:'🌟', label: typeLabel, value:`${a.name} + ${partner.name}: ${bonus.notes || ''}`, cls:'t-ok' });
    }
  }

  // Shared feeders
  const feederMap = {};
  for (const a of list) {
    for (const f of (a.feederTypes || [])) {
      if (!feederMap[f]) feederMap[f] = [];
      feederMap[f].push(a.name);
    }
  }
  for (const [feeder, names] of Object.entries(feederMap)) {
    if (names.length > 1) {
      const label = feeder.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      rows.push({ icon:'🍽️', label:'Shared Feeder', value:`${label} serves: ${names.join(', ')}`, cls:'' });
    }
  }

  // Shared enrichment tags
  const tagCount = {};
  for (const a of list) {
    for (const tag of (a.sharedEnrichmentTags || [])) {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    }
  }
  const sharedTags = Object.entries(tagCount).filter(([, n]) => n >= list.length);
  if (sharedTags.length > 0) {
    const tagList = sharedTags.map(([t]) => t.replace(/-/g, ' ')).join(', ');
    rows.push({ icon:'🎯', label:'Shared Enrichment', value:`All species benefit from: ${tagList}`, cls:'' });
  }

  // Social reminders
  for (const a of list) {
    if ((a.socialMin || 0) > 1) {
      rows.push({ icon:'ℹ️', label:'Social', value:`${a.name}: needs ${a.socialMin}–${a.socialMax || '∞'} individuals`, cls:'' });
    }
  }

  if (rows.length === 0) {
    rows.push({ icon:'ℹ️', label:'Synergies', value:'No special bonuses or shared resources identified for this combination', cls:'' });
  }

  return { rows };
}

// ── 7. Render: sidebar chips and controls ────────────────────────

function renderSidebar() {
  const visible = getVisibleAnimals();

  // Collect unique values from visible animals
  const continents  = [...new Set(visible.flatMap(a => a.continents  || []))].sort();
  const biomes      = [...new Set(visible.flatMap(a => a.biomes      || []))].sort();
  const diets       = [...new Set(visible.map(a => a.diet).filter(Boolean))].sort();

  renderChips('continent-chips', continents, state.continents, v => {
    toggle(state.continents, v); renderAll();
  });

  renderChips('biome-chips', biomes, state.biomes, v => {
    toggle(state.biomes, v); renderAll();
  });

  // Conservation chips with colored dots
  renderConservationChips();

  renderChips('diet-chips', diets, state.diet, v => {
    toggle(state.diet, v); renderAll();
  }, v => DIET_ICONS[v] ? `${DIET_ICONS[v]} ${DIET_LABELS[v] || v}` : (DIET_LABELS[v] || v));

  // Pack list
  renderPackList();
}

function renderChips(containerId, values, activeSet, onClick, labelFn) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = values.map(v => {
    const label = labelFn ? labelFn(v) : v;
    const active = activeSet.has(v) ? 'active' : '';
    return `<button class="chip ${active}" data-value="${esc(v)}">${esc(label)}</button>`;
  }).join('');
  el.querySelectorAll('.chip').forEach(btn => {
    btn.addEventListener('click', () => onClick(btn.dataset.value));
  });
}

function renderConservationChips() {
  const el = document.getElementById('conservation-chips');
  if (!el) return;
  const visible = getVisibleAnimals();
  const present = new Set(visible.map(a => a.conservationStatus).filter(Boolean));
  const order = CONSERVATION_ORDER.filter(s => present.has(s));

  el.innerHTML = order.map(s => {
    const color = CONSERVATION_COLORS[s] || '#999';
    const active = state.conservation.has(s) ? 'active' : '';
    return `<button class="chip status-chip ${active}" data-value="${s}">
      <span class="chip-dot" style="background:${color}"></span>${s}
    </button>`;
  }).join('');
  el.querySelectorAll('.chip').forEach(btn => {
    btn.addEventListener('click', () => { toggle(state.conservation, btn.dataset.value); renderAll(); });
  });
}

function renderPackList() {
  const listEl = document.getElementById('pack-list');
  if (!listEl) return;

  const filterPlatform = prefs.platform;
  listEl.innerHTML = packs.map(p => {
    const compatible = filterPlatform === 'any' || (p.platforms || []).includes(filterPlatform);
    const checked = prefs.ownedPacks.has(p.id);
    const disabledClass = !compatible ? 'disabled' : '';
    return `<label class="pack-row ${disabledClass}">
      <input type="checkbox" data-pack="${p.id}" ${checked ? 'checked' : ''} ${!compatible ? 'disabled' : ''}>
      <span>${p.emoji || '📦'} ${esc(p.name)}</span>
      <span class="pack-year">${p.year}</span>
    </label>`;
  }).join('');

  listEl.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', () => {
      if (cb.checked) prefs.ownedPacks.add(cb.dataset.pack);
      else            prefs.ownedPacks.delete(cb.dataset.pack);
      savePrefs();
      renderSidebar();
      renderBrowse();
    });
  });
}

// ── 8. Render: animal grid (browse) ─────────────────────────────

function renderBrowse() {
  const grid = document.getElementById('animal-grid');
  if (!grid) return;

  const visible  = getVisibleAnimals();
  const filtered = applyFilters(visible);
  const sorted   = sortAnimals(filtered);

  // Result count
  const countEl = document.getElementById('result-count');
  if (countEl) countEl.textContent = `${sorted.length} of ${animals.length} species`;

  // Filter summary chips
  renderFilterSummary();

  // Clear loading
  const loading = document.getElementById('loading-state');
  if (loading) loading.remove();

  if (sorted.length === 0) {
    grid.innerHTML = `<div id="empty-state">
      <div class="empty-icon">🔍</div>
      <div>No species match your current filters.</div>
      <button onclick="clearFilters()">Clear filters</button>
    </div>`;
    return;
  }

  grid.innerHTML = sorted.map(renderCard).join('');

  // Wire card clicks
  grid.querySelectorAll('.animal-card').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('.pin-btn')) return;
      openDetail(card.dataset.id);
    });
  });
  grid.querySelectorAll('.pin-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      toggleChecker(btn.dataset.id);
    });
  });
}

function renderCard(animal) {
  const pinned = state.checkerIds.includes(animal.id);
  const hasData = animal.tempMin != null;
  const statusColor = CONSERVATION_COLORS[animal.conservationStatus] || '#999';
  const packName = packLabel(animal.pack);
  const dietIcon = animal.diet ? (DIET_ICONS[animal.diet] || '') : '';

  let statsHtml = '';
  if (hasData) {
    statsHtml = `<div class="card-stats">
      <span class="stat">🌡 ${animal.tempMin}–${animal.tempMax}°C</span>
      <span class="stat">💧 ${animal.humidityMin}–${animal.humidityMax}%</span>
      ${(animal.landMin || 0) > 0 ? `<span class="stat">🏠 ≥${animal.landMin}% land</span>` : ''}
      ${(animal.waterMin || 0) > 0 ? `<span class="stat">🌊 ≥${animal.waterMin}% water</span>` : ''}
    </div>`;
  } else {
    statsHtml = `<div class="no-data">Habitat data loading…</div>`;
  }

  const originStr = [
    ...(animal.continents || []),
    ...(animal.biomes || []),
  ].join(' · ') || '';

  return `<div class="animal-card ${pinned ? 'pinned' : ''}" data-id="${animal.id}">
    <div class="card-top">
      <span class="card-emoji">${animal.emoji || '🐾'}</span>
      <div class="card-title-area">
        <div class="card-name">${esc(animal.name)}</div>
        ${originStr ? `<div class="card-origin">${esc(originStr)}</div>` : ''}
      </div>
      <button class="pin-btn ${pinned ? 'pinned' : ''}" data-id="${animal.id}"
        title="${pinned ? 'Remove from Checker' : 'Add to Checker'}">${pinned ? '✓' : '+'}</button>
    </div>
    <div class="card-badges">
      <span class="pack-badge">${esc(packName)}</span>
      ${animal.diet ? `<span class="diet-label">${dietIcon} ${esc(DIET_LABELS[animal.diet] || animal.diet)}</span>` : ''}
      ${animal.type === 'exhibit' ? `<span class="exhibit-badge">Exhibit</span>` : ''}
      ${animal.conservationStatus ? `<span class="status-badge">
        <span class="s-dot" style="background:${statusColor}"></span>${animal.conservationStatus}
      </span>` : ''}
    </div>
    ${statsHtml}
  </div>`;
}

function renderFilterSummary() {
  const el = document.getElementById('filter-summary');
  if (!el) return;
  const chips = [];

  if (state.search) chips.push({ label:`"${state.search}"`, clear:() => { state.search=''; document.getElementById('search-input').value=''; } });
  state.continents.forEach(v => chips.push({ label: v, clear:() => state.continents.delete(v) }));
  state.biomes.forEach(v => chips.push({ label: v, clear:() => state.biomes.delete(v) }));
  state.conservation.forEach(v => chips.push({ label: CONSERVATION_LABELS[v] || v, clear:() => state.conservation.delete(v) }));
  state.diet.forEach(v => chips.push({ label: DIET_LABELS[v] || v, clear:() => state.diet.delete(v) }));
  if (state.needsWater === 'yes') chips.push({ label:'Needs water', clear:() => state.needsWater='any' });
  if (state.needsWater === 'no')  chips.push({ label:'No water', clear:() => state.needsWater='any' });
  if (state.tempMin !== null || state.tempMax !== null) {
    const label = `${state.tempMin ?? '?'}–${state.tempMax ?? '?'}°C`;
    chips.push({ label, clear:() => { state.tempMin=null; state.tempMax=null; document.getElementById('temp-min').value=''; document.getElementById('temp-max').value=''; } });
  }
  if (state.humidMin !== null || state.humidMax !== null) {
    const label = `${state.humidMin ?? '?'}–${state.humidMax ?? '?'}% humidity`;
    chips.push({ label, clear:() => { state.humidMin=null; state.humidMax=null; document.getElementById('humid-min').value=''; document.getElementById('humid-max').value=''; } });
  }

  el.innerHTML = chips.map((c, i) =>
    `<span class="active-chip">${esc(c.label)}<button data-idx="${i}">✕</button></span>`
  ).join('');

  el.querySelectorAll('button').forEach(btn => {
    const idx = parseInt(btn.dataset.idx);
    btn.addEventListener('click', () => { chips[idx].clear(); renderAll(); });
  });

  // Also highlight the filters toggle on mobile
  const ft = document.getElementById('filters-toggle');
  if (ft) ft.classList.toggle('has-filters', chips.length > 0);
}

// ── 9. Render: detail panel ──────────────────────────────────────

function openDetail(id) {
  state.detailId = id;
  const animal = animals.find(a => a.id === id);
  if (!animal) return;

  const inner = document.getElementById('detail-panel-inner');
  const pinned = state.checkerIds.includes(id);
  const statusColor = CONSERVATION_COLORS[animal.conservationStatus] || '#999';

  const rows = [];
  if (animal.tempMin != null) rows.push({ lbl:'Temperature', val:`${animal.tempMin}–${animal.tempMax}°C` });
  if (animal.humidityMin != null) rows.push({ lbl:'Humidity', val:`${animal.humidityMin}–${animal.humidityMax}%` });
  if (animal.landMin != null)  rows.push({ lbl:'Min Land', val:`${animal.landMin}%` });
  if (animal.waterMin != null) rows.push({ lbl:'Min Water', val:`${animal.waterMin}%` });
  if (animal.socialMin != null) rows.push({ lbl:'Group Size', val:`${animal.socialMin}–${animal.socialMax ?? '∞'}` });
  if (animal.needsShelter != null) rows.push({ lbl:'Shelter', val: animal.needsShelter ? 'Required' : 'Not required' });
  if (animal.appeal) rows.push({ lbl:'Appeal', val:'★'.repeat(animal.appeal) + '☆'.repeat(5 - animal.appeal) });

  const statGridHtml = rows.map(r => `<div class="dp-stat">
    <div class="dp-stat-lbl">${esc(r.lbl)}</div>
    <div class="dp-stat-val">${esc(r.val)}</div>
  </div>`).join('');

  const terrainHtml = (animal.terrain || []).map(t => `<span class="dtag">${esc(TERRAIN_LABELS[t] || t)}</span>`).join('');
  const foliageHtml = (animal.foliage || []).map(f => `<span class="dtag">${esc(FOLIAGE_LABELS[f] || f)}</span>`).join('');
  const enrichHtml  = (animal.enrichment || []).map(e => `<span class="dtag">${esc(e)}</span>`).join('');

  let cohabitHtml = '';
  if ((animal.cohabitApproved || []).length > 0) {
    const bonusIds = new Set((animal.cohabitBonus || []).map(b => b.id));
    cohabitHtml = animal.cohabitApproved.map(id => {
      const partner = animals.find(a => a.id === id);
      const name = partner ? partner.name : id;
      const bonusEntry = (animal.cohabitBonus || []).find(b => b.id === id);
      const bonusPill = bonusEntry
        ? `<span class="bonus-pill">${bonusEntry.bonusType === 'appeal' ? '📈 Appeal' : '💚 Welfare'}</span>`
        : '';
      return `<div class="cohabit-row">
        <span>${partner ? (partner.emoji || '🐾') : '🐾'}</span>
        <span>${esc(name)}</span>${bonusPill}
      </div>`;
    }).join('');
  } else {
    cohabitHtml = '<span style="font-size:0.78rem;color:var(--text-muted);opacity:0.6">Solo habitat only, or no co-habitation data available</span>';
  }

  inner.innerHTML = `
    <div class="dp-close-row">
      <button id="detail-close-btn">✕</button>
    </div>
    <div class="dp-hero">
      <span class="dp-emoji">${animal.emoji || '🐾'}</span>
      <div>
        <div class="dp-name">${esc(animal.name)}</div>
        <div class="dp-meta">
          ${packLabel(animal.pack)}
          ${animal.conservationStatus ? ` · <span style="color:${statusColor};font-weight:700">${animal.conservationStatus}</span>` : ''}
          ${animal.type === 'exhibit' ? ' · Exhibit animal' : ''}
        </div>
        <div class="dp-meta" style="margin-top:0.25rem">
          ${[...(animal.continents||[]), ...(animal.biomes||[])].join(' · ')}
        </div>
      </div>
    </div>

    ${rows.length > 0 ? `
    <div>
      <div class="dp-section-title">Habitat Requirements</div>
      <div class="dp-stat-grid">${statGridHtml}</div>
    </div>` : ''}

    ${terrainHtml ? `<div>
      <div class="dp-section-title">Accepted Terrain</div>
      <div class="tag-row">${terrainHtml}</div>
    </div>` : ''}

    ${foliageHtml ? `<div>
      <div class="dp-section-title">Accepted Foliage</div>
      <div class="tag-row">${foliageHtml}</div>
    </div>` : ''}

    ${enrichHtml ? `<div>
      <div class="dp-section-title">Enrichment Items</div>
      <div class="tag-row">${enrichHtml}</div>
    </div>` : ''}

    <div>
      <div class="dp-section-title">Co-habitation</div>
      <div class="cohabit-list">${cohabitHtml}</div>
    </div>

    <button id="dp-pin-btn" class="${pinned ? 'remove' : ''}">
      ${pinned ? '✓ In Checker — click to remove' : '+ Add to Compatibility Checker'}
    </button>
    ${animal.notes ? `<p style="font-size:0.75rem;color:var(--text-muted);font-style:italic">${esc(animal.notes)}</p>` : ''}
  `;

  document.getElementById('detail-close-btn').addEventListener('click', closeDetail);
  document.getElementById('dp-pin-btn').addEventListener('click', () => {
    toggleChecker(id);
    // Refresh the button label
    const btn = document.getElementById('dp-pin-btn');
    const nowPinned = state.checkerIds.includes(id);
    btn.classList.toggle('remove', nowPinned);
    btn.textContent = nowPinned ? '✓ In Checker — click to remove' : '+ Add to Compatibility Checker';
  });

  document.getElementById('detail-overlay').classList.add('open');
  document.getElementById('detail-panel').classList.add('open');
}

function closeDetail() {
  state.detailId = null;
  document.getElementById('detail-overlay').classList.remove('open');
  document.getElementById('detail-panel').classList.remove('open');
}

// ── 10. Render: checker ──────────────────────────────────────────

function renderChecker() {
  const slotsEl = document.getElementById('checker-slots');
  if (!slotsEl) return;

  // Render slots
  const slots = Array.from({ length: 4 }, (_, i) => {
    const id = state.checkerIds[i];
    const a = id ? animals.find(x => x.id === id) : null;
    if (a) {
      return `<div class="cslot filled" data-slot="${i}">
        <span class="cslot-emoji">${a.emoji || '🐾'}</span>
        <span class="cslot-name">${esc(a.name)}</span>
        <button class="cslot-remove" data-id="${a.id}">Remove</button>
      </div>`;
    }
    return `<div class="cslot" data-slot="${i}"><span class="cslot-empty">+ Pin from Browse</span></div>`;
  });
  slotsEl.innerHTML = slots.join('');
  slotsEl.querySelectorAll('.cslot-remove').forEach(btn => {
    btn.addEventListener('click', () => { removeFromChecker(btn.dataset.id); });
  });

  // Update tab count
  const countEl = document.getElementById('checker-count');
  if (countEl) countEl.textContent = state.checkerIds.length;

  // Run compatibility check
  const resultsEl = document.getElementById('checker-results');
  if (!resultsEl) return;

  if (state.checkerIds.length < 2) {
    resultsEl.innerHTML = `<div class="checker-prompt">Pin 2 or more species above to run a compatibility analysis.</div>`;
    return;
  }

  const result = runCompatibilityCheck(state.checkerIds);
  if (!result) return;

  const { t1, t2, t3 } = result;

  // Overall result
  let overallClass = 'ok', overallIcon = '✅', overallText = 'Compatible — these species can share a habitat';
  if (!t1.pass) {
    overallClass = 'fail'; overallIcon = '❌'; overallText = 'Incompatible — cannot share a habitat';
  } else if (t1.rows.some(r => r.icon === '⚠️')) {
    overallClass = 'warn'; overallIcon = '⚠️'; overallText = 'Probably compatible — verify co-habitation in-game';
  } else if (t2 && !t2.pass) {
    overallClass = 'fail'; overallIcon = '❌'; overallText = 'Incompatible — habitat requirements cannot be reconciled';
  }

  const tier2Class = !t1.pass ? 'tier-dimmed' : '';
  const tier3Class = (!t1.pass || (t2 && !t2.pass)) ? 'tier-dimmed' : '';

  resultsEl.innerHTML = `
    <div class="overall-bar ${overallClass}">
      <span class="overall-icon">${overallIcon}</span>
      <span>${overallText}</span>
    </div>

    <div class="tier-card">
      <div class="tier-label">Tier 1 — Physical Compatibility</div>
      ${t1.rows.map(renderTierRow).join('')}
    </div>

    <div class="tier-card ${tier2Class}">
      <div class="tier-label">Tier 2 — Requirement Overlap</div>
      ${t2 ? t2.rows.map(renderTierRow).join('') : '<div class="tier-row"><span class="t-icon">—</span><span class="t-name">Skipped</span><span class="t-val" style="opacity:0.5">Resolve Tier 1 issues first</span></div>'}
    </div>

    <div class="tier-card ${tier3Class}">
      <div class="tier-label">Tier 3 — Synergies &amp; Shared Resources</div>
      ${t3 ? t3.rows.map(renderTierRow).join('') : '<div class="tier-row"><span class="t-icon">—</span><span class="t-name">Skipped</span><span class="t-val" style="opacity:0.5">Resolve earlier tier issues first</span></div>'}
    </div>
  `;
}

function renderTierRow(row) {
  return `<div class="tier-row">
    <span class="t-icon">${row.icon}</span>
    <span class="t-name">${esc(row.label)}</span>
    <span class="t-val ${row.cls || ''}">${row.value}</span>
  </div>`;
}

// ── 11. Render: matcher form setup ───────────────────────────────

function renderMatcherForm() {
  renderMatcherChips('m-terrain-chips', Object.keys(TERRAIN_LABELS), TERRAIN_LABELS);
  renderMatcherChips('m-foliage-chips', Object.keys(FOLIAGE_LABELS), FOLIAGE_LABELS);
}

function renderMatcherChips(containerId, keys, labels) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = keys.map(k =>
    `<button class="mchip" data-key="${k}">${esc(labels[k] || k)}</button>`
  ).join('');
  el.querySelectorAll('.mchip').forEach(btn => {
    btn.addEventListener('click', () => btn.classList.toggle('sel'));
  });
}

// ── 12. Mode switching and view management ───────────────────────

function setMode(mode) {
  state.mode = mode;

  document.querySelectorAll('.mode-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.mode === mode);
  });

  document.getElementById('browse-view').style.display     = mode === 'browse'  ? '' : 'none';
  document.getElementById('matcher-view').classList.toggle('active', mode === 'matcher');
  document.getElementById('checker-view').classList.toggle('active', mode === 'checker');

  if (mode === 'checker') renderChecker();
  if (mode === 'browse')  renderBrowse();
}

// ── 13. Checker helpers ──────────────────────────────────────────

function toggleChecker(id) {
  const idx = state.checkerIds.indexOf(id);
  if (idx >= 0) {
    state.checkerIds.splice(idx, 1);
  } else if (state.checkerIds.length < 4) {
    state.checkerIds.push(id);
  }
  // Update count badge
  const countEl = document.getElementById('checker-count');
  if (countEl) countEl.textContent = state.checkerIds.length;

  renderBrowse();
  if (state.mode === 'checker') renderChecker();
}

function removeFromChecker(id) {
  toggleChecker(id);
}

// ── 14. Filter helpers ───────────────────────────────────────────

function toggle(set, value) {
  if (set.has(value)) set.delete(value);
  else set.add(value);
}

function clearFilters() {
  state.search      = '';
  state.continents  = new Set();
  state.biomes      = new Set();
  state.conservation= new Set();
  state.diet        = new Set();
  state.needsWater  = 'any';
  state.tempMin = state.tempMax = state.humidMin = state.humidMax = null;

  document.getElementById('search-input').value = '';
  document.getElementById('temp-min').value = '';
  document.getElementById('temp-max').value = '';
  document.getElementById('humid-min').value = '';
  document.getElementById('humid-max').value = '';
  document.querySelectorAll('.tog-btn[data-filter="water"]').forEach(b => {
    b.classList.toggle('active', b.dataset.value === 'any');
  });
  renderAll();
}

// ── 15. renderAll: re-renders sidebar + current view ────────────

function renderAll() {
  renderSidebar();
  if (state.mode === 'browse' || state.mode === 'matcher') renderBrowse();
  if (state.mode === 'checker') renderChecker();
}

// ── 16. Pack / label helpers ─────────────────────────────────────

function packLabel(packId) {
  const p = packs.find(x => x.id === packId);
  return p ? p.name : (packId || 'Unknown Pack');
}

function esc(str) {
  return String(str ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ── 17. Event wiring ─────────────────────────────────────────────

function wireEvents() {
  // Mode tabs
  document.querySelectorAll('.mode-tab').forEach(btn => {
    btn.addEventListener('click', () => setMode(btn.dataset.mode));
  });

  // Platform buttons
  document.querySelectorAll('.platform-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.platform-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      prefs.platform = btn.dataset.platform;
      savePrefs();
      renderSidebar();
      renderBrowse();
    });
  });
  // Set initial active state from saved prefs
  document.querySelectorAll('.platform-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.platform === prefs.platform);
  });

  // Pack toggle button
  document.getElementById('toggle-packs-btn').addEventListener('click', () => {
    const wrap = document.getElementById('pack-list-wrap');
    const btn  = document.getElementById('toggle-packs-btn');
    const open = wrap.classList.toggle('open');
    btn.textContent = open ? 'Hide packs ▲' : 'Show packs ▾';
  });

  // Pack select/clear all
  document.getElementById('packs-all').addEventListener('click', () => {
    packs.forEach(p => {
      if (prefs.platform === 'any' || (p.platforms || []).includes(prefs.platform)) {
        prefs.ownedPacks.add(p.id);
      }
    });
    savePrefs(); renderSidebar(); renderBrowse();
  });
  document.getElementById('packs-none').addEventListener('click', () => {
    prefs.ownedPacks.clear();
    savePrefs(); renderSidebar(); renderBrowse();
  });

  // Search
  document.getElementById('search-input').addEventListener('input', e => {
    state.search = e.target.value.trim();
    renderBrowse();
    renderFilterSummary();
  });

  // Water toggle
  document.querySelectorAll('.tog-btn[data-filter="water"]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tog-btn[data-filter="water"]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.needsWater = btn.dataset.value;
      renderAll();
    });
  });

  // Temperature inputs
  document.getElementById('temp-min').addEventListener('change', e => {
    state.tempMin = e.target.value !== '' ? parseFloat(e.target.value) : null;
    renderBrowse(); renderFilterSummary();
  });
  document.getElementById('temp-max').addEventListener('change', e => {
    state.tempMax = e.target.value !== '' ? parseFloat(e.target.value) : null;
    renderBrowse(); renderFilterSummary();
  });

  // Humidity inputs
  document.getElementById('humid-min').addEventListener('change', e => {
    state.humidMin = e.target.value !== '' ? parseFloat(e.target.value) : null;
    renderBrowse(); renderFilterSummary();
  });
  document.getElementById('humid-max').addEventListener('change', e => {
    state.humidMax = e.target.value !== '' ? parseFloat(e.target.value) : null;
    renderBrowse(); renderFilterSummary();
  });

  // Sort
  document.getElementById('sort-select').addEventListener('change', e => {
    state.sort = e.target.value;
    renderBrowse();
  });

  // Clear all filters
  document.getElementById('clear-btn').addEventListener('click', clearFilters);

  // Mobile sidebar
  document.getElementById('filters-toggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.add('open');
    document.getElementById('sidebar-overlay').classList.add('open');
  });
  document.getElementById('sidebar-overlay').addEventListener('click', () => {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebar-overlay').classList.remove('open');
  });

  // Detail panel close via overlay
  document.getElementById('detail-overlay').addEventListener('click', closeDetail);

  // Setup banner dismiss
  document.getElementById('dismiss-banner').addEventListener('click', () => {
    document.getElementById('setup-banner').style.display = 'none';
    localStorage.setItem(STORAGE_BANNER, '1');
  });

  // Matcher submit
  document.getElementById('matcher-submit').addEventListener('click', () => {
    const mTempMin  = document.getElementById('m-temp-min').value;
    const mTempMax  = document.getElementById('m-temp-max').value;
    const mHumidMin = document.getElementById('m-humid-min').value;
    const mHumidMax = document.getElementById('m-humid-max').value;
    const mLand     = document.getElementById('m-land').value;
    const mWater    = document.getElementById('m-water').value;

    // Apply to filter state
    if (mTempMin !== '') { state.tempMin = parseFloat(mTempMin); document.getElementById('temp-min').value = mTempMin; }
    if (mTempMax !== '') { state.tempMax = parseFloat(mTempMax); document.getElementById('temp-max').value = mTempMax; }
    if (mHumidMin !== '') { state.humidMin = parseFloat(mHumidMin); document.getElementById('humid-min').value = mHumidMin; }
    if (mHumidMax !== '') { state.humidMax = parseFloat(mHumidMax); document.getElementById('humid-max').value = mHumidMax; }

    // Land/water: filter animals whose requirements fit within these limits
    // (animal.landMin <= mLand and animal.waterMin <= mWater)
    // We handle this via a one-shot temp filter override below
    const landLimit  = mLand  !== '' ? parseFloat(mLand)  : null;
    const waterLimit = mWater !== '' ? parseFloat(mWater) : null;

    // Store matcher constraints in state for the filter engine to pick up
    state._matcherLandLimit  = landLimit;
    state._matcherWaterLimit = waterLimit;

    // Terrain chips: collect selected keys
    const selectedTerrain = [...document.querySelectorAll('#m-terrain-chips .mchip.sel')].map(c => c.dataset.key);
    state._matcherTerrain = selectedTerrain.length > 0 ? new Set(selectedTerrain) : null;

    const selectedFoliage = [...document.querySelectorAll('#m-foliage-chips .mchip.sel')].map(c => c.dataset.key);
    state._matcherFoliage = selectedFoliage.length > 0 ? new Set(selectedFoliage) : null;

    // Switch to browse to show results
    setMode('browse');
    renderBrowse();
  });

  // Escape key closes detail
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeDetail();
  });
}

// ── 18. Init ─────────────────────────────────────────────────────

function initApp() {
  // Show/hide setup banner
  if (!localStorage.getItem(STORAGE_BANNER)) {
    document.getElementById('setup-banner').style.display = 'flex';
  }

  // Build matcher form chips
  renderMatcherForm();

  // Build sidebar
  renderSidebar();

  // Render initial browse grid
  renderBrowse();

  // Set initial platform UI
  document.querySelectorAll('.platform-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.platform === prefs.platform);
  });
}

// Expose clearFilters globally (called from empty-state inline button)
window.clearFilters = function() {
  state._matcherLandLimit = undefined;
  state._matcherWaterLimit = undefined;
  state._matcherTerrain = null;
  state._matcherFoliage = null;
  clearFilters();
};

// ── Start ────────────────────────────────────────────────────────
wireEvents();
loadData();
