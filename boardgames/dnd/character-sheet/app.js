'use strict';

// ── Constants ────────────────────────────────────────────────────────────────

const ABILITIES = ['str','dex','con','int','wis','cha'];

const SKILLS = [
  { name:'Acrobatics',      ability:'dex' },
  { name:'Animal Handling', ability:'wis' },
  { name:'Arcana',          ability:'int' },
  { name:'Athletics',       ability:'str' },
  { name:'Deception',       ability:'cha' },
  { name:'History',         ability:'int' },
  { name:'Insight',         ability:'wis' },
  { name:'Intimidation',    ability:'cha' },
  { name:'Investigation',   ability:'int' },
  { name:'Medicine',        ability:'wis' },
  { name:'Nature',          ability:'int' },
  { name:'Perception',      ability:'wis' },
  { name:'Performance',     ability:'cha' },
  { name:'Persuasion',      ability:'cha' },
  { name:'Religion',        ability:'int' },
  { name:'Sleight of Hand', ability:'dex' },
  { name:'Stealth',         ability:'dex' },
  { name:'Survival',        ability:'wis' },
];

const CONDITIONS = [
  'Blinded','Charmed','Deafened','Exhaustion','Frightened',
  'Grappled','Incapacitated','Invisible','Paralyzed','Petrified',
  'Poisoned','Prone','Restrained','Stunned','Unconscious',
];

// Spell slots by full-caster level (index = casterLevel - 1, value = [L1..L9])
const FULL_SLOTS = [
  [2,0,0,0,0,0,0,0,0],
  [3,0,0,0,0,0,0,0,0],
  [4,2,0,0,0,0,0,0,0],
  [4,3,0,0,0,0,0,0,0],
  [4,3,2,0,0,0,0,0,0],
  [4,3,3,0,0,0,0,0,0],
  [4,3,3,1,0,0,0,0,0],
  [4,3,3,2,0,0,0,0,0],
  [4,3,3,3,1,0,0,0,0],
  [4,3,3,3,2,0,0,0,0],
  [4,3,3,3,2,1,0,0,0],
  [4,3,3,3,2,1,0,0,0],
  [4,3,3,3,2,1,1,0,0],
  [4,3,3,3,2,1,1,0,0],
  [4,3,3,3,2,1,1,1,0],
  [4,3,3,3,2,1,1,1,0],
  [4,3,3,3,2,1,1,1,1],
  [4,3,3,3,3,1,1,1,1],
  [4,3,3,3,3,2,1,1,1],
  [4,3,3,3,3,2,2,1,1],
];

// Half-caster slot table (paladin/ranger) — casterLevel = floor(classLevel/2)
// Uses same table as full caster once caster level is computed

// Warlock pact magic: [slots, level]
const WARLOCK_PACT = [
  [1,1],[2,1],[2,2],[2,2],[2,3],[2,3],[2,4],[2,4],
  [2,5],[2,5],[3,5],[3,5],[3,5],[3,5],[3,5],[3,5],
  [4,5],[4,5],[4,5],[4,5],
];

const CLASS_DATA = {
  barbarian:  { hitDie: 12, casterType: 'none',   spellAbility: null,  resources: [{ name:'Rage', perLevel: [2,2,3,3,3,4,4,4,4,4,4,4,5,5,5,5,6,6,6,'∞'], resetOn:'long rest' }] },
  bard:       { hitDie: 8,  casterType: 'full',   spellAbility: 'cha', resources: [{ name:'Bardic Inspiration', perLevel: [2,2,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4], resetOn:'short or long rest' }] },
  cleric:     { hitDie: 8,  casterType: 'full',   spellAbility: 'wis', resources: [{ name:'Channel Divinity', perLevel: [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], resetOn:'short or long rest' }] },
  druid:      { hitDie: 8,  casterType: 'full',   spellAbility: 'wis', resources: [] },
  fighter:    { hitDie: 10, casterType: 'none',   spellAbility: null,  resources: [{ name:'Second Wind', perLevel: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], resetOn:'short or long rest' }, { name:'Action Surge', perLevel: [0,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2], resetOn:'short or long rest' }] },
  monk:       { hitDie: 8,  casterType: 'none',   spellAbility: 'wis', resources: [{ name:'Ki Points', perLevel: [0,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20], resetOn:'short or long rest' }] },
  paladin:    { hitDie: 10, casterType: 'half',   spellAbility: 'cha', resources: [{ name:'Lay on Hands (HP)', perLevel: [5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100], resetOn:'long rest' }, { name:'Channel Divinity', perLevel: [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], resetOn:'short or long rest' }] },
  ranger:     { hitDie: 10, casterType: 'half',   spellAbility: 'wis', resources: [] },
  rogue:      { hitDie: 8,  casterType: 'none',   spellAbility: null,  resources: [] },
  sorcerer:   { hitDie: 6,  casterType: 'full',   spellAbility: 'cha', resources: [{ name:'Sorcery Points', perLevel: [0,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20], resetOn:'long rest' }] },
  warlock:    { hitDie: 8,  casterType: 'pact',   spellAbility: 'cha', resources: [] },
  wizard:     { hitDie: 6,  casterType: 'full',   spellAbility: 'int', resources: [{ name:'Arcane Recovery (levels)', perLevel: [1,1,2,2,3,3,4,4,5,5,5,5,5,5,5,5,5,5,5,5], resetOn:'long rest' }] },
};

const ARMOR_AC = {
  'none':       { base: 10, addDex: true,  maxDex: 99 },
  'padded':     { base: 11, addDex: true,  maxDex: 99 },
  'leather':    { base: 11, addDex: true,  maxDex: 99 },
  'studded':    { base: 12, addDex: true,  maxDex: 99 },
  'hide':       { base: 12, addDex: true,  maxDex: 2  },
  'chain-shirt':{ base: 13, addDex: true,  maxDex: 2  },
  'scale':      { base: 14, addDex: true,  maxDex: 2  },
  'breastplate':{ base: 14, addDex: true,  maxDex: 2  },
  'half-plate': { base: 15, addDex: true,  maxDex: 2  },
  'ring':       { base: 14, addDex: false, maxDex: 0  },
  'chain':      { base: 16, addDex: false, maxDex: 0  },
  'splint':     { base: 17, addDex: false, maxDex: 0  },
  'plate':      { base: 18, addDex: false, maxDex: 0  },
};

// ── State ────────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'gpg:dnd-characters';
const ACTIVE_KEY  = 'gpg:dnd-active';

let characters = {};   // { id: characterData }
let activeId   = null;
let spellsData = [];
let suppressSave = false;

// ── Calculations ─────────────────────────────────────────────────────────────

function abilityMod(score) {
  return Math.floor(((score || 10) - 10) / 2);
}

function profBonus(totalLevel) {
  return Math.ceil(totalLevel / 4) + 1;
}

function fmtBonus(n) {
  return (n >= 0 ? '+' : '') + n;
}

function totalLevel(char) {
  return (char.classes || []).reduce((s, c) => s + (parseInt(c.level) || 0), 0);
}

function getProf(char) {
  return profBonus(totalLevel(char) || 1);
}

function abilityScore(char, ab) {
  const base = parseInt(char.abilities?.[ab]) || 10;
  const bonus = getBgBonus(char, ab);
  return base + bonus;
}

function getBgBonus(char, ab) {
  let total = 0;
  const bonuses = [
    { ability: char.bgBonus1Ability, val: parseInt(char.bgBonus1Val) || 0 },
    { ability: char.bgBonus2Ability, val: parseInt(char.bgBonus2Val) || 0 },
    { ability: char.bgBonus3Ability, val: 1 },
  ];
  for (const b of bonuses) {
    if (b.ability === ab) total += b.val;
  }
  return total;
}

function skillBonus(char, skillName) {
  const skill = SKILLS.find(s => s.name === skillName);
  if (!skill) return 0;
  const mod = abilityMod(abilityScore(char, skill.ability));
  const prof = getProf(char);
  const profLevel = (char.skillProficiencies || []).find(sp => sp.name === skillName)?.level || 'none';
  if (profLevel === 'expertise') return mod + prof * 2;
  if (profLevel === 'proficient') return mod + prof;
  if (char.jackOfAllTrades) return mod + Math.floor(prof / 2);
  return mod;
}

function savingThrow(char, ab) {
  const mod = abilityMod(abilityScore(char, ab));
  const proficient = (char.saveProficiencies || []).includes(ab);
  return mod + (proficient ? getProf(char) : 0);
}

function passivePerception(char) {
  return 10 + skillBonus(char, 'Perception');
}

function calcAC(char) {
  if (char.acMode === 'manual') return parseInt(char.acManual) || 10;
  const armorType = char.armorType || 'none';
  const armor = ARMOR_AC[armorType] || ARMOR_AC['none'];
  const dexMod = abilityMod(abilityScore(char, 'dex'));
  const effectiveDex = armor.addDex ? Math.min(dexMod, armor.maxDex) : 0;
  const shield = parseInt(char.shield) || 0;
  const bonus = parseInt(char.acBonus) || 0;
  return armor.base + effectiveDex + shield + bonus;
}

function calcSpellSlots(char) {
  // Returns { 1: max, 2: max, ... } from class composition
  // Also handles Warlock Pact Magic separately
  let fullLevels = 0;
  let halfLevels = 0;
  let thirdLevels = 0;
  let warlockLevel = 0;
  const pactSlots = { count: 0, level: 0 };

  for (const cls of (char.classes || [])) {
    const lvl = parseInt(cls.level) || 0;
    const data = CLASS_DATA[cls.name?.toLowerCase()];
    if (!data) continue;
    const ct = data.casterType;
    if (ct === 'full') fullLevels += lvl;
    else if (ct === 'half') halfLevels += Math.floor(lvl / 2);
    else if (ct === 'third') thirdLevels += Math.floor(lvl / 3);
    else if (ct === 'pact') warlockLevel = lvl;
  }

  const casterLevel = fullLevels + halfLevels + thirdLevels;
  const slots = {};

  if (casterLevel > 0) {
    const row = FULL_SLOTS[Math.min(casterLevel, 20) - 1] || [];
    row.forEach((n, i) => { if (n > 0) slots[i + 1] = n; });
  }

  // Warlock adds separate Pact Magic entry
  if (warlockLevel > 0) {
    const pact = WARLOCK_PACT[Math.min(warlockLevel, 20) - 1];
    pactSlots.count = pact[0];
    pactSlots.level = pact[1];
  }

  return { slots, pactSlots };
}

function primarySpellAbility(char) {
  for (const cls of (char.classes || [])) {
    const data = CLASS_DATA[cls.name?.toLowerCase()];
    if (data?.spellAbility) return data.spellAbility;
  }
  return null;
}

function spellDC(char) {
  const ab = primarySpellAbility(char);
  if (!ab) return null;
  return 8 + getProf(char) + abilityMod(abilityScore(char, ab));
}

function spellAttack(char) {
  const ab = primarySpellAbility(char);
  if (!ab) return null;
  return getProf(char) + abilityMod(abilityScore(char, ab));
}

function calcHPMax(char) {
  if (char.hpMaxOverride) return parseInt(char.hpMaxOverride);
  let total = 0;
  const conMod = abilityMod(abilityScore(char, 'con'));
  for (const cls of (char.classes || [])) {
    const lvl = parseInt(cls.level) || 0;
    const data = CLASS_DATA[cls.name?.toLowerCase()];
    if (!data || lvl === 0) continue;
    const die = data.hitDie;
    // Level 1: max die; subsequent: average (die/2 + 0.5, rounded up = floor(die/2)+1)
    total += die + conMod;                         // level 1
    total += (lvl - 1) * (Math.floor(die / 2) + 1 + conMod);  // levels 2+
  }
  return total > 0 ? total : null;
}

function hitDiceString(char) {
  return (char.classes || [])
    .filter(c => parseInt(c.level) > 0 && CLASS_DATA[c.name?.toLowerCase()])
    .map(c => `${c.level}d${CLASS_DATA[c.name.toLowerCase()].hitDie}`)
    .join(' + ') || '—';
}

// ── Character CRUD ────────────────────────────────────────────────────────────

function blankCharacter() {
  return {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2),
    name: 'New Character',
    pronouns: '',
    race: '',
    background: '',
    alignment: '',
    xp: 0,
    inspiration: 0,
    classes: [{ name: 'fighter', subclass: '', level: 1 }],
    bgBonus1Ability: '', bgBonus1Val: 0,
    bgBonus2Ability: '', bgBonus2Val: 0,
    bgBonus3Ability: '',
    appearance: '',
    abilities: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
    saveProficiencies: [],
    skillProficiencies: SKILLS.map(s => ({ name: s.name, level: 'none' })),
    jackOfAllTrades: false,
    languages: '',
    tools: '',
    hpCurrent: null,
    hpMaxOverride: null,
    hpTemp: 0,
    hdUsed: 0,
    acMode: 'auto',
    acManual: 10,
    armorType: 'none',
    shield: 0,
    acBonus: 0,
    speed: 30,
    conditions: [],
    deathSaves: { successes: 0, failures: 0 },
    concentration: '',
    attacks: [],
    spells: [],
    spellSlotsUsed: {},  // { level: used }
    pactSlotsUsed: 0,
    currency: { cp: 0, sp: 0, ep: 0, gp: 0, pp: 0 },
    items: [],
    resources: {},  // { name: used }
    classFeatures: '',
    backgroundFeature: '',
    feats: '',
    backstory: '',
    personality: '',
    ideals: '',
    bonds: '',
    flaws: '',
    allies: '',
    notes: '',
  };
}

function saveAll() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(characters));
  localStorage.setItem(ACTIVE_KEY, activeId || '');
}

function loadAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    characters = raw ? JSON.parse(raw) : {};
  } catch { characters = {}; }
  activeId = localStorage.getItem(ACTIVE_KEY) || null;
  if (activeId && !characters[activeId]) activeId = null;
}

function getActive() {
  return activeId ? characters[activeId] : null;
}

// ── Rendering ─────────────────────────────────────────────────────────────────

function renderCharacterPicker() {
  const sel = document.getElementById('char-select');
  sel.innerHTML = '<option value="">— No character —</option>';
  Object.values(characters)
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.id;
      opt.textContent = c.name || 'Unnamed';
      opt.selected = c.id === activeId;
      sel.appendChild(opt);
    });
}

function renderSheet() {
  const char = getActive();
  const empty = document.getElementById('empty-state');
  const tabs = document.querySelectorAll('.tab-panel');

  if (!char) {
    empty.style.display = 'block';
    tabs.forEach(t => t.style.display = 'none');
    renderSummaryCard(null);
    return;
  }

  empty.style.display = 'none';
  tabs.forEach(t => { t.style.display = ''; }); // let CSS handle visibility
  // Activate current tab panel
  const activeTab = document.querySelector('.tab-btn.active')?.dataset.tab || 'identity';
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  const activePanel = document.getElementById('tab-' + activeTab);
  if (activePanel) activePanel.classList.add('active');

  suppressSave = true;

  // Identity
  setVal('f-name', char.name);
  setVal('f-pronouns', char.pronouns);
  setVal('f-race', char.race);
  setVal('f-background', char.background);
  setVal('f-alignment', char.alignment);
  setVal('f-xp', char.xp ?? '');
  setVal('f-inspiration', char.inspiration ?? 0);
  setVal('f-bg-bonus1-ability', char.bgBonus1Ability || '');
  setVal('f-bg-bonus1-val', char.bgBonus1Val ?? 0);
  setVal('f-bg-bonus2-ability', char.bgBonus2Ability || '');
  setVal('f-bg-bonus2-val', char.bgBonus2Val ?? 0);
  setVal('f-bg-bonus3-ability', char.bgBonus3Ability || '');
  setVal('f-appearance', char.appearance);
  renderClassesList(char);

  // Abilities
  ABILITIES.forEach(ab => {
    const el = document.getElementById('ab-' + ab);
    if (el) el.value = char.abilities?.[ab] ?? 10;
  });
  updateAbilityDerivedUI(char);

  // Skills
  const joat = document.getElementById('jack-of-all-trades');
  if (joat) joat.checked = !!char.jackOfAllTrades;
  renderSkillsList(char);
  setVal('f-languages', char.languages);
  setVal('f-tools', char.tools);

  // Combat
  setVal('f-hp-max-override', char.hpMaxOverride ?? '');
  setVal('f-ac-mode', char.acMode || 'auto');
  setVal('f-armor-type', char.armorType || 'none');
  setVal('f-shield', char.shield ?? 0);
  setVal('f-ac-bonus', char.acBonus ?? 0);
  setVal('f-speed', char.speed ?? 30);
  setVal('f-concentration', char.concentration || '');
  updateCombatDerivedUI(char);
  renderDeathSaves(char);
  renderConditions(char);
  renderAttacks(char);

  // Spells
  renderSpellsTab(char);

  // Equipment
  setVal('f-cp', char.currency?.cp ?? 0);
  setVal('f-sp', char.currency?.sp ?? 0);
  setVal('f-ep', char.currency?.ep ?? 0);
  setVal('f-gp', char.currency?.gp ?? 0);
  setVal('f-pp', char.currency?.pp ?? 0);
  renderItems(char);
  updateCarrying(char);

  // Features
  renderResources(char);
  setVal('f-class-features', char.classFeatures);
  setVal('f-background-feature', char.backgroundFeature);
  setVal('f-feats', char.feats);

  // Notes
  setVal('f-backstory', char.backstory);
  setVal('f-personality', char.personality);
  setVal('f-ideals', char.ideals);
  setVal('f-bonds', char.bonds);
  setVal('f-flaws', char.flaws);
  setVal('f-allies', char.allies);
  setVal('f-notes', char.notes);

  renderSummaryCard(char);

  suppressSave = false;
}

function setVal(id, val) {
  const el = document.getElementById(id);
  if (!el) return;
  if (el.tagName === 'SELECT' || el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
    el.value = val ?? '';
  }
}

function updateAbilityDerivedUI(char) {
  const prof = getProf(char);
  document.getElementById('d-prof').textContent = fmtBonus(prof);

  ABILITIES.forEach(ab => {
    const score = abilityScore(char, ab);
    const mod = abilityMod(score);
    const modEl = document.getElementById('mod-' + ab);
    if (modEl) modEl.textContent = fmtBonus(mod);

    const saveEl = document.getElementById('save-' + ab);
    if (saveEl) saveEl.textContent = fmtBonus(savingThrow(char, ab));

    const sbEl = document.getElementById('sb-' + ab);
    if (sbEl) sbEl.textContent = fmtBonus(savingThrow(char, ab));

    const cbEl = document.querySelector(`.save-prof-cb[data-ability="${ab}"]`);
    if (cbEl) cbEl.checked = (char.saveProficiencies || []).includes(ab);
  });

  document.getElementById('d-passive').textContent = passivePerception(char);
  document.getElementById('d-initiative').textContent = fmtBonus(abilityMod(abilityScore(char, 'dex')));
}

function updateCombatDerivedUI(char) {
  const hpMax = calcHPMax(char);
  document.getElementById('hp-max-display').textContent = hpMax ?? '—';
  if (char.hpCurrent === null || char.hpCurrent === undefined) {
    char.hpCurrent = hpMax || 0;
  }
  document.getElementById('current-hp-display').textContent = char.hpCurrent ?? '—';

  const acMode = char.acMode || 'auto';
  const manualInput = document.getElementById('f-ac-manual');
  const armorSel = document.getElementById('f-armor-type');
  const shieldSel = document.getElementById('f-shield');
  if (manualInput) manualInput.style.display = acMode === 'manual' ? '' : 'none';
  if (armorSel) armorSel.disabled = acMode === 'manual';
  if (shieldSel) shieldSel.disabled = acMode === 'manual';
  document.getElementById('d-ac').textContent = calcAC(char);
  document.getElementById('d-hit-dice').textContent = hitDiceString(char);
  renderHitDicePips(char);

  // Spell stats
  const ab = primarySpellAbility(char);
  const dc = spellDC(char);
  const atk = spellAttack(char);
  document.getElementById('d-spell-ability').textContent = ab ? ab.toUpperCase() : '—';
  document.getElementById('d-spell-dc').textContent = dc !== null ? dc : '—';
  document.getElementById('d-spell-attack').textContent = atk !== null ? fmtBonus(atk) : '—';
}

function renderHitDicePips(char) {
  const wrap = document.getElementById('hd-pips-wrap');
  if (!wrap) return;
  const total = totalLevel(char);
  const used = parseInt(char.hdUsed) || 0;
  wrap.innerHTML = '';
  for (let i = 0; i < total; i++) {
    const pip = document.createElement('span');
    pip.className = 'slot-pip' + (i < used ? ' used' : '');
    wrap.appendChild(pip);
  }
}

function renderClassesList(char) {
  const wrap = document.getElementById('classes-list');
  if (!wrap) return;
  wrap.innerHTML = '';
  (char.classes || []).forEach((cls, idx) => {
    const row = document.createElement('div');
    row.className = 'field-grid cols-4';
    row.style.marginBottom = '0.5rem';
    row.innerHTML = `
      <div class="field"><label>Class</label>
        <select class="cls-name" data-idx="${idx}">
          <option value="">—</option>
          ${Object.keys(CLASS_DATA).map(c => `<option value="${c}" ${cls.name===c?'selected':''}>${c.charAt(0).toUpperCase()+c.slice(1)}</option>`).join('')}
        </select>
      </div>
      <div class="field"><label>Subclass</label>
        <input class="cls-subclass" type="text" data-idx="${idx}" placeholder="Subclass" value="${cls.subclass||''}">
      </div>
      <div class="field"><label>Level</label>
        <input class="cls-level" type="number" data-idx="${idx}" min="1" max="20" value="${cls.level||1}">
      </div>
      <div class="field"><label>&nbsp;</label>
        <button class="bar-btn danger cls-del" data-idx="${idx}" style="margin-top:0;">Remove</button>
      </div>
    `;
    wrap.appendChild(row);
  });
}

function renderSkillsList(char) {
  const wrap = document.getElementById('skills-list');
  if (!wrap) return;
  wrap.innerHTML = '';
  SKILLS.forEach(skill => {
    const sp = (char.skillProficiencies || []).find(s => s.name === skill.name);
    const level = sp?.level || 'none';
    const bonus = skillBonus(char, skill.name);
    const row = document.createElement('div');
    row.className = 'skill-row';
    row.innerHTML = `
      <select class="skill-prof-sel" data-skill="${skill.name}" title="Proficiency level">
        <option value="none" ${level==='none'?'selected':''}>—</option>
        <option value="proficient" ${level==='proficient'?'selected':''}>Prof</option>
        <option value="expertise" ${level==='expertise'?'selected':''}>Exp</option>
      </select>
      <span class="skill-bonus">${fmtBonus(bonus)}</span>
      <span class="skill-name">${skill.name}</span>
      <span class="skill-ability">(${skill.ability.toUpperCase()})</span>
    `;
    wrap.appendChild(row);
  });
}

function renderDeathSaves(char) {
  const ds = char.deathSaves || { successes: 0, failures: 0 };
  document.querySelectorAll('#death-success-pips .ds-pip').forEach((pip, i) => {
    pip.classList.toggle('filled', i < ds.successes);
  });
  document.querySelectorAll('#death-fail-pips .ds-pip').forEach((pip, i) => {
    pip.classList.toggle('filled', i < ds.failures);
  });
}

function renderConditions(char) {
  const grid = document.getElementById('conditions-grid');
  if (!grid) return;
  grid.innerHTML = '';
  const active = char.conditions || [];
  CONDITIONS.forEach(cond => {
    const label = document.createElement('label');
    label.className = 'condition-item' + (active.includes(cond) ? ' active' : '');
    label.innerHTML = `<input type="checkbox" class="condition-cb" data-cond="${cond}" ${active.includes(cond)?'checked':''}> ${cond}`;
    grid.appendChild(label);
  });
}

function renderAttacks(char) {
  const tbody = document.getElementById('attacks-body');
  if (!tbody) return;
  tbody.innerHTML = '';
  (char.attacks || []).forEach((atk, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="text" class="atk-name" data-idx="${idx}" value="${esc(atk.name||'')}"></td>
      <td><input type="text" class="atk-bonus" data-idx="${idx}" style="width:60px" value="${esc(atk.bonus||'')}"></td>
      <td><input type="text" class="atk-damage" data-idx="${idx}" value="${esc(atk.damage||'')}"></td>
      <td><input type="text" class="atk-range" data-idx="${idx}" style="width:70px" value="${esc(atk.range||'')}"></td>
      <td><input type="text" class="atk-notes" data-idx="${idx}" value="${esc(atk.notes||'')}"></td>
      <td><button class="del-btn atk-del" data-idx="${idx}">✕</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function renderSpellsTab(char) {
  const { slots, pactSlots } = calcSpellSlots(char);

  // Spell stats
  const ab = primarySpellAbility(char);
  const dc = spellDC(char);
  const atk = spellAttack(char);
  document.getElementById('d-spell-ability').textContent = ab ? ab.toUpperCase() : '—';
  document.getElementById('d-spell-dc').textContent = dc !== null ? dc : '—';
  document.getElementById('d-spell-attack').textContent = atk !== null ? fmtBonus(atk) : '—';

  // Slot tracking
  const slotsWrap = document.getElementById('spell-slots-track');
  slotsWrap.innerHTML = '';
  const used = char.spellSlotsUsed || {};

  const renderSlotSection = (label, max, usedCount, key, isPact) => {
    const div = document.createElement('div');
    div.className = 'spell-level-section';
    div.innerHTML = `<div class="spell-level-header">
      <span class="spell-level-label">${label}</span>
      <div class="slot-track" id="slot-track-${key}"></div>
      <span class="spell-level-slots">${usedCount}/${max} used</span>
    </div>`;
    const track = div.querySelector('.slot-track');
    for (let i = 0; i < max; i++) {
      const pip = document.createElement('span');
      pip.className = 'slot-pip' + (i < usedCount ? ' used' : '');
      pip.dataset.slotKey = key;
      pip.dataset.slotIdx = i;
      pip.dataset.isPact = isPact ? '1' : '';
      track.appendChild(pip);
    }
    slotsWrap.appendChild(div);
  };

  for (let lvl = 1; lvl <= 9; lvl++) {
    if (!slots[lvl]) continue;
    const max = slots[lvl];
    const usedCount = used[lvl] || 0;
    renderSlotSection(`Level ${lvl}`, max, usedCount, lvl, false);
  }
  if (pactSlots.count > 0) {
    const usedCount = char.pactSlotsUsed || 0;
    renderSlotSection(`Pact (L${pactSlots.level})`, pactSlots.count, usedCount, 'pact', true);
  }

  // Spells list
  const listWrap = document.getElementById('char-spells-list');
  listWrap.innerHTML = '';

  const spells = char.spells || [];
  const byLevel = {};
  spells.forEach(sp => {
    const lv = sp.level ?? 0;
    if (!byLevel[lv]) byLevel[lv] = [];
    byLevel[lv].push(sp);
  });

  const levelLabels = { 0: 'Cantrips', 1: '1st Level', 2: '2nd Level', 3: '3rd Level', 4: '4th Level', 5: '5th Level', 6: '6th Level', 7: '7th Level', 8: '8th Level', 9: '9th Level' };

  [0,1,2,3,4,5,6,7,8,9].forEach(lv => {
    const group = byLevel[lv];
    if (!group || group.length === 0) return;

    const section = document.createElement('div');
    section.className = 'spell-level-section';
    section.innerHTML = `<div class="spell-level-header"><span class="spell-level-label">${levelLabels[lv]}</span></div>`;

    group.forEach(sp => {
      const item = document.createElement('div');
      item.className = 'char-spell-item';
      const concBadge = sp.concentration ? `<span class="conc-badge">C</span>` : '';
      const ritBadge = sp.ritual ? `<span class="rit-badge">R</span>` : '';
      const prepLabel = lv === 0 ? 'Known' : 'Prepared';
      item.innerHTML = `
        ${lv > 0 ? `<input type="checkbox" class="spell-prepared-cb" data-spid="${sp.id}" ${sp.prepared?'checked':''} title="${prepLabel}">` : '<span style="width:14px;display:inline-block;"></span>'}
        <div class="spell-item-body">
          <div class="spell-item-name" data-spid="${sp.id}">${esc(sp.name)} ${concBadge}${ritBadge}</div>
          <div class="spell-item-meta">${sp.school || ''} · ${sp.castingTime || ''} · ${sp.range || ''} · ${sp.duration || ''}</div>
          <div class="spell-item-desc" id="spdesc-${sp.id}">${esc(sp.desc || '')}</div>
        </div>
        <button class="del-btn sp-del" data-spid="${sp.id}">✕</button>
      `;
      section.appendChild(item);
    });

    listWrap.appendChild(section);
  });

  if (spells.length === 0) {
    listWrap.innerHTML = '<div style="color:var(--text-muted);font-size:0.82rem;padding:0.5rem 0;">No spells added yet. Use the search above to add spells from the SRD database, or click "+ Custom Spell" to add manually.</div>';
  }
}

function renderItems(char) {
  const tbody = document.getElementById('items-body');
  if (!tbody) return;
  tbody.innerHTML = '';
  (char.items || []).forEach((item, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="text" class="item-name" data-idx="${idx}" value="${esc(item.name||'')}"></td>
      <td><input type="number" class="item-qty" data-idx="${idx}" style="width:45px" value="${item.qty||1}" min="0"></td>
      <td><input type="number" class="item-wt" data-idx="${idx}" style="width:55px" value="${item.wt||0}" min="0" step="0.1"></td>
      <td><input type="text" class="item-notes" data-idx="${idx}" value="${esc(item.notes||'')}"></td>
      <td><button class="del-btn item-del" data-idx="${idx}">✕</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function updateCarrying(char) {
  const strScore = abilityScore(char, 'str');
  const cap = strScore * 15;
  const cur = (char.items || []).reduce((s, i) => s + ((parseFloat(i.wt) || 0) * (parseInt(i.qty) || 1)), 0);
  const capEl = document.getElementById('d-carry-cap');
  const curEl = document.getElementById('d-carry-cur');
  if (capEl) capEl.textContent = cap;
  if (curEl) curEl.textContent = Math.round(cur * 10) / 10;
}

function renderResources(char) {
  const wrap = document.getElementById('resources-list');
  if (!wrap) return;
  wrap.innerHTML = '';

  const resourceDefs = [];
  for (const cls of (char.classes || [])) {
    const data = CLASS_DATA[cls.name?.toLowerCase()];
    if (!data) continue;
    const lvl = Math.min(Math.max(parseInt(cls.level) || 1, 1), 20);
    for (const res of (data.resources || [])) {
      const maxVal = Array.isArray(res.perLevel) ? res.perLevel[lvl - 1] : res.perLevel;
      if (!maxVal || maxVal === 0) continue;
      resourceDefs.push({ name: res.name, max: maxVal, resetOn: res.resetOn });
    }
  }

  if (resourceDefs.length === 0) {
    wrap.innerHTML = '<div style="color:var(--text-muted);font-size:0.82rem;">No class resources for current class selection.</div>';
    return;
  }

  resourceDefs.forEach(res => {
    const used = parseInt((char.resources || {})[res.name]) || 0;
    const max = typeof res.max === 'string' ? 999 : parseInt(res.max) || 1;
    const block = document.createElement('div');
    block.className = 'resource-block';
    const maxLabel = res.max === '∞' ? '∞' : max;
    block.innerHTML = `
      <div class="resource-name">${esc(res.name)} <span style="font-weight:400;">(${maxLabel - used}/${maxLabel})</span></div>
      <div class="resource-pips" data-res="${esc(res.name)}"></div>
      <div class="resource-reset">Resets: ${res.resetOn}</div>
    `;
    const pipsWrap = block.querySelector('.resource-pips');
    if (res.max !== '∞') {
      for (let i = 0; i < max; i++) {
        const pip = document.createElement('span');
        pip.className = 'res-pip' + (i < used ? ' filled' : '');
        pip.dataset.resName = res.name;
        pip.dataset.resIdx = i;
        pipsWrap.appendChild(pip);
      }
    } else {
      pipsWrap.textContent = '(Unlimited uses)';
    }
    wrap.appendChild(block);
  });
}

function renderSummaryCard(char) {
  if (!char) {
    document.getElementById('sum-name').textContent = '—';
    document.getElementById('sum-subtitle').textContent = 'No character loaded';
    ['sum-hp','sum-hp-max','sum-ac','sum-init','sum-speed','sum-prof','sum-passive','sum-spell-dc','sum-spell-atk'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = '—';
    });
    const tempWrap = document.getElementById('sum-hp-temp-wrap');
    if (tempWrap) tempWrap.style.display = 'none';
    ABILITIES.forEach(ab => {
      const m = document.getElementById('sum-mod-' + ab);
      const s = document.getElementById('sum-score-' + ab);
      if (m) m.textContent = '+0';
      if (s) s.textContent = '10';
    });
    return;
  }

  document.getElementById('sum-name').textContent = char.name || 'Unnamed';

  // Subtitle: race + class/level list
  const classStr = (char.classes || [])
    .filter(c => c.name && parseInt(c.level) > 0)
    .map(c => `${c.name.charAt(0).toUpperCase() + c.name.slice(1)} ${c.level}`)
    .join(' / ');
  const subtitle = [char.race, classStr].filter(Boolean).join(' · ');
  document.getElementById('sum-subtitle').textContent = subtitle || '—';

  const hpMax = calcHPMax(char);
  document.getElementById('sum-hp').textContent = char.hpCurrent ?? hpMax ?? '—';
  document.getElementById('sum-hp-max').textContent = hpMax ?? '—';
  const tempWrap = document.getElementById('sum-hp-temp-wrap');
  if (tempWrap) {
    const hasTemp = (char.hpTemp || 0) > 0;
    tempWrap.style.display = hasTemp ? '' : 'none';
    document.getElementById('sum-hp-temp').textContent = char.hpTemp || 0;
  }
  document.getElementById('sum-ac').textContent = calcAC(char);
  document.getElementById('sum-init').textContent = fmtBonus(abilityMod(abilityScore(char, 'dex')));
  document.getElementById('sum-speed').textContent = (char.speed || 30) + '\'';
  document.getElementById('sum-prof').textContent = fmtBonus(getProf(char));
  document.getElementById('sum-passive').textContent = passivePerception(char);
  const dc = spellDC(char);
  const atk = spellAttack(char);
  document.getElementById('sum-spell-dc').textContent = dc !== null ? dc : '—';
  document.getElementById('sum-spell-atk').textContent = atk !== null ? fmtBonus(atk) : '—';

  ABILITIES.forEach(ab => {
    const score = abilityScore(char, ab);
    const m = document.getElementById('sum-mod-' + ab);
    const s = document.getElementById('sum-score-' + ab);
    if (m) m.textContent = fmtBonus(abilityMod(score));
    if (s) s.textContent = score;
  });

  // Concentration banner
  const concBanner = document.getElementById('concentration-banner');
  const concSpan = document.getElementById('sum-conc');
  if (char.concentration) {
    concBanner.style.display = 'block';
    concSpan.textContent = char.concentration;
  } else {
    concBanner.style.display = 'none';
  }

  // Active conditions
  const condWrap = document.getElementById('conditions-active');
  const condChips = document.getElementById('sum-conditions');
  const activeConds = char.conditions || [];
  if (activeConds.length > 0) {
    condWrap.style.display = 'block';
    condChips.innerHTML = activeConds.map(c => `<span class="cond-chip">${c}</span>`).join('');
  } else {
    condWrap.style.display = 'none';
  }
}

// ── Spell search ──────────────────────────────────────────────────────────────

function updateSpellSearch() {
  const query = (document.getElementById('spell-search-input')?.value || '').toLowerCase().trim();
  const levelFilter = document.getElementById('spell-filter-level')?.value;
  const classFilter = document.getElementById('spell-filter-class')?.value;
  const resultsEl = document.getElementById('spell-results');
  if (!resultsEl) return;

  if (!query && !levelFilter && !classFilter) {
    resultsEl.classList.add('hidden');
    resultsEl.innerHTML = '';
    return;
  }

  const char = getActive();
  const existingNames = new Set((char?.spells || []).map(s => s.name));

  let filtered = spellsData;
  if (query) filtered = filtered.filter(s => s.name.toLowerCase().includes(query));
  if (levelFilter !== '') filtered = filtered.filter(s => String(s.level) === levelFilter);
  if (classFilter) filtered = filtered.filter(s => (s.classes || []).includes(classFilter));

  filtered = filtered.slice(0, 40);

  if (filtered.length === 0) {
    resultsEl.classList.remove('hidden');
    resultsEl.innerHTML = '<div style="padding:0.5rem;font-size:0.8rem;color:var(--text-muted);">No spells found.</div>';
    return;
  }

  resultsEl.classList.remove('hidden');
  resultsEl.innerHTML = '';
  filtered.forEach(sp => {
    const lvlLabel = sp.level === 0 ? 'Cantrip' : `L${sp.level}`;
    const alreadyAdded = existingNames.has(sp.name);
    const item = document.createElement('div');
    item.className = 'spell-result-item';
    item.innerHTML = `
      <div>
        <span style="font-weight:600;">${esc(sp.name)}</span>
        <span class="spell-result-info"> · ${lvlLabel} ${sp.school} · ${sp.classes.join(', ')}</span>
      </div>
      <button class="spell-add-btn" data-spname="${esc(sp.name)}" ${alreadyAdded?'disabled':''}>
        ${alreadyAdded ? '✓' : 'Add'}
      </button>
    `;
    resultsEl.appendChild(item);
  });
}

function addSpellFromData(spellName) {
  const char = getActive();
  if (!char) return;
  const sp = spellsData.find(s => s.name === spellName);
  if (!sp) return;
  if (char.spells.find(s => s.name === spellName)) return;
  char.spells.push({
    id: Date.now().toString(36) + Math.random().toString(36).slice(2),
    name: sp.name,
    level: sp.level,
    school: sp.school,
    castingTime: sp.castingTime,
    range: sp.range,
    components: (sp.components || []).join(', '),
    materials: sp.materials || '',
    duration: sp.duration,
    concentration: sp.concentration,
    ritual: sp.ritual,
    desc: sp.desc,
    prepared: false,
  });
  saveAll();
  renderSpellsTab(char);
  updateSpellSearch();
}

function addCustomSpell() {
  const char = getActive();
  if (!char) return;
  const name = prompt('Spell name:');
  if (!name) return;
  const level = parseInt(prompt('Spell level (0 = cantrip):', '0')) || 0;
  char.spells.push({
    id: Date.now().toString(36) + Math.random().toString(36).slice(2),
    name: name.trim(),
    level,
    school: '',
    castingTime: '',
    range: '',
    components: '',
    materials: '',
    duration: '',
    concentration: false,
    ritual: false,
    desc: '',
    prepared: false,
  });
  saveAll();
  renderSpellsTab(char);
}

// ── Event wiring ──────────────────────────────────────────────────────────────

function readCharFromForm(char) {
  if (!char) return;

  char.name        = document.getElementById('f-name')?.value || 'Unnamed';
  char.pronouns    = document.getElementById('f-pronouns')?.value || '';
  char.race        = document.getElementById('f-race')?.value || '';
  char.background  = document.getElementById('f-background')?.value || '';
  char.alignment   = document.getElementById('f-alignment')?.value || '';
  char.xp          = parseInt(document.getElementById('f-xp')?.value) || 0;
  char.inspiration = parseInt(document.getElementById('f-inspiration')?.value) || 0;
  char.bgBonus1Ability = document.getElementById('f-bg-bonus1-ability')?.value || '';
  char.bgBonus1Val     = parseInt(document.getElementById('f-bg-bonus1-val')?.value) || 0;
  char.bgBonus2Ability = document.getElementById('f-bg-bonus2-ability')?.value || '';
  char.bgBonus2Val     = parseInt(document.getElementById('f-bg-bonus2-val')?.value) || 0;
  char.bgBonus3Ability = document.getElementById('f-bg-bonus3-ability')?.value || '';
  char.appearance  = document.getElementById('f-appearance')?.value || '';

  ABILITIES.forEach(ab => {
    const el = document.getElementById('ab-' + ab);
    if (el) char.abilities[ab] = parseInt(el.value) || 10;
  });

  char.jackOfAllTrades = document.getElementById('jack-of-all-trades')?.checked || false;
  char.languages = document.getElementById('f-languages')?.value || '';
  char.tools     = document.getElementById('f-tools')?.value || '';

  char.hpMaxOverride = document.getElementById('f-hp-max-override')?.value ? parseInt(document.getElementById('f-hp-max-override').value) : null;
  char.acMode    = document.getElementById('f-ac-mode')?.value || 'auto';
  char.acManual  = parseInt(document.getElementById('f-ac-manual')?.value) || 10;
  char.armorType = document.getElementById('f-armor-type')?.value || 'none';
  char.shield    = parseInt(document.getElementById('f-shield')?.value) || 0;
  char.acBonus   = parseInt(document.getElementById('f-ac-bonus')?.value) || 0;
  char.speed     = parseInt(document.getElementById('f-speed')?.value) || 30;
  char.concentration = document.getElementById('f-concentration')?.value || '';

  ['cp','sp','ep','gp','pp'].forEach(cur => {
    char.currency[cur] = parseInt(document.getElementById('f-' + cur)?.value) || 0;
  });

  char.classFeatures      = document.getElementById('f-class-features')?.value || '';
  char.backgroundFeature  = document.getElementById('f-background-feature')?.value || '';
  char.feats              = document.getElementById('f-feats')?.value || '';
  char.backstory          = document.getElementById('f-backstory')?.value || '';
  char.personality        = document.getElementById('f-personality')?.value || '';
  char.ideals             = document.getElementById('f-ideals')?.value || '';
  char.bonds              = document.getElementById('f-bonds')?.value || '';
  char.flaws              = document.getElementById('f-flaws')?.value || '';
  char.allies             = document.getElementById('f-allies')?.value || '';
  char.notes              = document.getElementById('f-notes')?.value || '';
}

function onAnyChange() {
  if (suppressSave) return;
  const char = getActive();
  if (!char) return;
  readCharFromForm(char);
  updateAbilityDerivedUI(char);
  updateCombatDerivedUI(char);
  updateCarrying(char);
  renderSummaryCard(char);
  renderCharacterPicker();
  saveAll();
}

function initEventHandlers() {
  // Tab navigation
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = document.getElementById('tab-' + btn.dataset.tab);
      if (panel) panel.classList.add('active');
    });
  });

  // Character picker
  document.getElementById('char-select')?.addEventListener('change', e => {
    activeId = e.target.value || null;
    saveAll();
    renderSheet();
  });

  // New character
  document.getElementById('btn-new')?.addEventListener('click', () => {
    const char = blankCharacter();
    characters[char.id] = char;
    activeId = char.id;
    saveAll();
    renderCharacterPicker();
    renderSheet();
  });

  // Duplicate
  document.getElementById('btn-duplicate')?.addEventListener('click', () => {
    const char = getActive();
    if (!char) return;
    const dupe = JSON.parse(JSON.stringify(char));
    dupe.id = Date.now().toString(36) + Math.random().toString(36).slice(2);
    dupe.name = (dupe.name || 'Character') + ' (copy)';
    characters[dupe.id] = dupe;
    activeId = dupe.id;
    saveAll();
    renderCharacterPicker();
    renderSheet();
  });

  // Delete
  document.getElementById('btn-delete')?.addEventListener('click', () => {
    const char = getActive();
    if (!char) return;
    if (!confirm(`Delete "${char.name}"? This cannot be undone.`)) return;
    delete characters[activeId];
    activeId = Object.keys(characters)[0] || null;
    saveAll();
    renderCharacterPicker();
    renderSheet();
  });

  // Export
  document.getElementById('btn-export')?.addEventListener('click', () => {
    const data = JSON.stringify(Object.values(characters), null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gpg-dnd-characters.json';
    a.click();
    URL.revokeObjectURL(url);
  });

  // Import
  document.getElementById('import-file')?.addEventListener('change', e => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const data = JSON.parse(ev.target.result);
        const arr = Array.isArray(data) ? data : [data];
        if (arr.length === 0) { alert('No characters found in file.'); return; }
        let imported = 0;
        arr.forEach(char => {
          if (!char.id) char.id = Date.now().toString(36) + Math.random().toString(36).slice(2);
          // Ensure required fields
          if (!char.abilities) char.abilities = { str:10, dex:10, con:10, int:10, wis:10, cha:10 };
          if (!char.currency) char.currency = { cp:0, sp:0, ep:0, gp:0, pp:0 };
          if (!char.classes) char.classes = [];
          if (!char.spells) char.spells = [];
          if (!char.items) char.items = [];
          if (!char.skillProficiencies) char.skillProficiencies = SKILLS.map(s => ({ name: s.name, level: 'none' }));
          if (!char.resources) char.resources = {};
          if (!char.conditions) char.conditions = [];
          if (!char.attacks) char.attacks = [];
          if (!char.deathSaves) char.deathSaves = { successes: 0, failures: 0 };
          characters[char.id] = char;
          imported++;
        });
        activeId = arr[arr.length - 1].id;
        saveAll();
        renderCharacterPicker();
        renderSheet();
        alert(`Imported ${imported} character(s).`);
      } catch (err) {
        alert('Failed to parse JSON: ' + err.message);
      }
      e.target.value = '';
    };
    reader.readAsText(file);
  });

  // Print
  document.getElementById('btn-print')?.addEventListener('click', () => {
    // Show all tab panels for printing
    document.querySelectorAll('.tab-panel').forEach(p => p.style.display = 'block');
    window.print();
    // Restore
    setTimeout(() => {
      document.querySelectorAll('.tab-panel').forEach(p => p.style.display = '');
      const activeTab = document.querySelector('.tab-btn.active')?.dataset.tab;
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      if (activeTab) document.getElementById('tab-' + activeTab)?.classList.add('active');
    }, 500);
  });

  // Short rest
  document.getElementById('btn-rest-short')?.addEventListener('click', () => {
    const char = getActive();
    if (!char) return;
    const hpMax = calcHPMax(char);
    const hd = (totalLevel(char)) - (char.hdUsed || 0);
    let msg = `Short rest:\n- Resources that reset on short rest are restored\n- You have ${hd} hit dice available`;
    if (hd > 0 && hpMax) {
      const useHD = parseInt(prompt(`Use how many hit dice? (${hd} available, HP: ${char.hpCurrent}/${hpMax})`, '1')) || 0;
      if (useHD > 0) {
        const conMod = abilityMod(abilityScore(char, 'con'));
        let healed = 0;
        for (let i = 0; i < Math.min(useHD, hd); i++) {
          const die = CLASS_DATA[char.classes[0]?.name?.toLowerCase()]?.hitDie || 8;
          healed += Math.floor(Math.random() * die) + 1 + conMod;
        }
        char.hdUsed = Math.min((char.hdUsed || 0) + Math.min(useHD, hd), totalLevel(char));
        char.hpCurrent = Math.min((char.hpCurrent || 0) + healed, hpMax);
        alert(`Rolled ${Math.min(useHD, hd)} hit dice, healed ${healed} HP.\nHP: ${char.hpCurrent}/${hpMax}`);
      }
    }
    // Restore short-rest resources
    for (const cls of (char.classes || [])) {
      const data = CLASS_DATA[cls.name?.toLowerCase()];
      if (!data) continue;
      for (const res of (data.resources || [])) {
        if (res.resetOn.includes('short')) {
          delete char.resources[res.name];
        }
      }
    }
    // Restore warlock pact slots
    const { pactSlots } = calcSpellSlots(char);
    if (pactSlots.count > 0) char.pactSlotsUsed = 0;

    saveAll();
    renderSheet();
  });

  // Long rest
  document.getElementById('btn-rest-long')?.addEventListener('click', () => {
    const char = getActive();
    if (!char) return;
    const hpMax = calcHPMax(char);
    char.hpCurrent = hpMax || 0;
    char.hpTemp = 0;
    // Restore half hit dice (min 1)
    const lvl = totalLevel(char);
    const recover = Math.max(1, Math.floor(lvl / 2));
    char.hdUsed = Math.max(0, (char.hdUsed || 0) - recover);
    // Reset death saves
    char.deathSaves = { successes: 0, failures: 0 };
    // Reset all resources
    char.resources = {};
    // Reset all spell slots
    char.spellSlotsUsed = {};
    char.pactSlotsUsed = 0;
    saveAll();
    renderSheet();
    alert('Long rest complete. HP fully restored, spell slots restored, resources reset.');
  });

  // HP controls
  document.getElementById('btn-heal')?.addEventListener('click', () => {
    const char = getActive();
    if (!char) return;
    const delta = parseInt(document.getElementById('hp-delta')?.value) || 0;
    if (delta <= 0) return;
    const hpMax = calcHPMax(char) || 999;
    char.hpCurrent = Math.min((char.hpCurrent || 0) + delta, hpMax);
    document.getElementById('hp-delta').value = '';
    saveAll();
    updateCombatDerivedUI(char);
    renderSummaryCard(char);
  });

  document.getElementById('btn-damage')?.addEventListener('click', () => {
    const char = getActive();
    if (!char) return;
    const delta = parseInt(document.getElementById('hp-delta')?.value) || 0;
    if (delta <= 0) return;
    let remaining = delta;
    const temp = parseInt(char.hpTemp) || 0;
    const absorbedByTemp = Math.min(remaining, temp);
    char.hpTemp = temp - absorbedByTemp;
    remaining -= absorbedByTemp;
    char.hpCurrent = Math.max(0, (char.hpCurrent || 0) - remaining);
    document.getElementById('hp-delta').value = '';
    saveAll();
    updateCombatDerivedUI(char);
    renderSummaryCard(char);
  });

  document.getElementById('btn-set-temp')?.addEventListener('click', () => {
    const char = getActive();
    if (!char) return;
    const val = parseInt(document.getElementById('f-hp-temp-quick')?.value) || 0;
    char.hpTemp = Math.max(0, val);
    document.getElementById('f-hp-temp-quick').value = '';
    saveAll();
    renderSummaryCard(char);
  });

  document.getElementById('btn-use-hd-sum')?.addEventListener('click', () => {
    const char = getActive();
    if (!char) return;
    const used = parseInt(char.hdUsed) || 0;
    const total = totalLevel(char);
    if (used >= total) { alert('No hit dice remaining.'); return; }
    const die = CLASS_DATA[char.classes[0]?.name?.toLowerCase()]?.hitDie || 8;
    const conMod = abilityMod(abilityScore(char, 'con'));
    const roll = Math.floor(Math.random() * die) + 1;
    const healed = roll + conMod;
    const hpMax = calcHPMax(char) || 999;
    char.hdUsed = used + 1;
    char.hpCurrent = Math.min((char.hpCurrent || 0) + Math.max(1, healed), hpMax);
    saveAll();
    renderSheet();
    alert(`Rolled 1d${die} (${roll}) + ${conMod} CON = ${Math.max(1, healed)} HP healed.`);
  });

  document.getElementById('btn-use-hd')?.addEventListener('click', () => {
    const char = getActive();
    if (!char) return;
    const used = parseInt(char.hdUsed) || 0;
    const total = totalLevel(char);
    if (used >= total) { alert('No hit dice remaining.'); return; }
    const die = CLASS_DATA[char.classes[0]?.name?.toLowerCase()]?.hitDie || 8;
    const conMod = abilityMod(abilityScore(char, 'con'));
    const roll = Math.floor(Math.random() * die) + 1;
    const healed = roll + conMod;
    const hpMax = calcHPMax(char) || 999;
    char.hdUsed = used + 1;
    char.hpCurrent = Math.min((char.hpCurrent || 0) + Math.max(1, healed), hpMax);
    saveAll();
    renderSheet();
    alert(`Rolled 1d${die} (${roll}) + ${conMod} CON = ${Math.max(1, healed)} HP healed.`);
  });

  // Death saves
  document.getElementById('death-success-pips')?.addEventListener('click', e => {
    const pip = e.target.closest('.ds-pip.success');
    if (!pip) return;
    const char = getActive();
    if (!char) return;
    const idx = parseInt(pip.dataset.idx);
    char.deathSaves.successes = char.deathSaves.successes === idx + 1 ? idx : idx + 1;
    saveAll();
    renderDeathSaves(char);
  });
  document.getElementById('death-fail-pips')?.addEventListener('click', e => {
    const pip = e.target.closest('.ds-pip.failure');
    if (!pip) return;
    const char = getActive();
    if (!char) return;
    const idx = parseInt(pip.dataset.idx);
    char.deathSaves.failures = char.deathSaves.failures === idx + 1 ? idx : idx + 1;
    saveAll();
    renderDeathSaves(char);
  });
  document.getElementById('btn-reset-death')?.addEventListener('click', () => {
    const char = getActive();
    if (!char) return;
    char.deathSaves = { successes: 0, failures: 0 };
    saveAll();
    renderDeathSaves(char);
  });

  // Spell slot pips (delegated)
  document.getElementById('spell-slots-track')?.addEventListener('click', e => {
    const pip = e.target.closest('.slot-pip');
    if (!pip) return;
    const char = getActive();
    if (!char) return;
    const key = pip.dataset.slotKey;
    const isPact = pip.dataset.isPact === '1';
    const idx = parseInt(pip.dataset.slotIdx);
    if (isPact) {
      char.pactSlotsUsed = char.pactSlotsUsed === idx + 1 ? idx : idx + 1;
    } else {
      if (!char.spellSlotsUsed) char.spellSlotsUsed = {};
      const { slots } = calcSpellSlots(char);
      const max = slots[key] || 0;
      const current = char.spellSlotsUsed[key] || 0;
      char.spellSlotsUsed[key] = current === idx + 1 ? idx : idx + 1;
      char.spellSlotsUsed[key] = Math.min(char.spellSlotsUsed[key], max);
    }
    saveAll();
    renderSpellsTab(char);
  });

  // Spell search
  document.getElementById('spell-search-input')?.addEventListener('input', updateSpellSearch);
  document.getElementById('spell-filter-level')?.addEventListener('change', updateSpellSearch);
  document.getElementById('spell-filter-class')?.addEventListener('change', updateSpellSearch);

  // Add spell from results (delegated)
  document.getElementById('spell-results')?.addEventListener('click', e => {
    const btn = e.target.closest('.spell-add-btn');
    if (!btn || btn.disabled) return;
    addSpellFromData(btn.dataset.spname);
  });

  // Custom spell
  document.getElementById('btn-add-manual-spell')?.addEventListener('click', addCustomSpell);

  // Spell prepared toggle + delete + desc toggle (delegated to char-spells-list)
  document.getElementById('char-spells-list')?.addEventListener('click', e => {
    const char = getActive();
    if (!char) return;
    const delBtn = e.target.closest('.sp-del');
    if (delBtn) {
      char.spells = char.spells.filter(s => s.id !== delBtn.dataset.spid);
      saveAll();
      renderSpellsTab(char);
      return;
    }
    const nameEl = e.target.closest('.spell-item-name');
    if (nameEl) {
      const desc = document.getElementById('spdesc-' + nameEl.dataset.spid);
      if (desc) desc.style.display = desc.style.display === 'block' ? 'none' : 'block';
    }
  });
  document.getElementById('char-spells-list')?.addEventListener('change', e => {
    const cb = e.target.closest('.spell-prepared-cb');
    if (!cb) return;
    const char = getActive();
    if (!char) return;
    const sp = char.spells.find(s => s.id === cb.dataset.spid);
    if (sp) sp.prepared = cb.checked;
    saveAll();
  });

  // Conditions (delegated)
  document.getElementById('conditions-grid')?.addEventListener('change', e => {
    const cb = e.target.closest('.condition-cb');
    if (!cb) return;
    const char = getActive();
    if (!char) return;
    const cond = cb.dataset.cond;
    if (cb.checked) {
      if (!char.conditions.includes(cond)) char.conditions.push(cond);
    } else {
      char.conditions = char.conditions.filter(c => c !== cond);
    }
    cb.closest('.condition-item').classList.toggle('active', cb.checked);
    saveAll();
    renderSummaryCard(char);
  });

  // Classes list (delegated)
  document.getElementById('classes-list')?.addEventListener('change', e => {
    const char = getActive();
    if (!char) return;
    const idx = e.target.dataset.idx;
    if (idx === undefined) return;
    if (e.target.classList.contains('cls-name')) char.classes[idx].name = e.target.value;
    if (e.target.classList.contains('cls-level')) char.classes[idx].level = parseInt(e.target.value) || 1;
    onAnyChange();
    renderClassesList(char);
    renderSpellsTab(char);
    renderResources(char);
  });
  document.getElementById('classes-list')?.addEventListener('input', e => {
    const char = getActive();
    if (!char) return;
    const idx = e.target.dataset.idx;
    if (idx === undefined) return;
    if (e.target.classList.contains('cls-subclass')) {
      char.classes[idx].subclass = e.target.value;
      if (!suppressSave) saveAll();
    }
  });
  document.getElementById('classes-list')?.addEventListener('click', e => {
    const btn = e.target.closest('.cls-del');
    if (!btn) return;
    const char = getActive();
    if (!char) return;
    char.classes.splice(parseInt(btn.dataset.idx), 1);
    saveAll();
    onAnyChange();
    renderClassesList(char);
    renderSpellsTab(char);
    renderResources(char);
  });
  document.getElementById('btn-add-class')?.addEventListener('click', () => {
    const char = getActive();
    if (!char) return;
    char.classes.push({ name: 'fighter', subclass: '', level: 1 });
    saveAll();
    renderClassesList(char);
    renderSpellsTab(char);
    renderResources(char);
  });

  // Skills (delegated)
  document.getElementById('skills-list')?.addEventListener('change', e => {
    const sel = e.target.closest('.skill-prof-sel');
    if (!sel) return;
    const char = getActive();
    if (!char) return;
    const skillName = sel.dataset.skill;
    let sp = (char.skillProficiencies || []).find(s => s.name === skillName);
    if (!sp) { sp = { name: skillName, level: 'none' }; char.skillProficiencies.push(sp); }
    sp.level = sel.value;
    saveAll();
    renderSkillsList(char);
    renderSummaryCard(char);
  });

  // Save proficiencies (delegated)
  document.getElementById('saves-grid')?.addEventListener('change', e => {
    const cb = e.target.closest('.save-prof-cb');
    if (!cb) return;
    const char = getActive();
    if (!char) return;
    const ab = cb.dataset.ability;
    if (cb.checked) {
      if (!char.saveProficiencies.includes(ab)) char.saveProficiencies.push(ab);
    } else {
      char.saveProficiencies = char.saveProficiencies.filter(s => s !== ab);
    }
    saveAll();
    updateAbilityDerivedUI(char);
    renderSummaryCard(char);
  });

  // Jack of all trades
  document.getElementById('jack-of-all-trades')?.addEventListener('change', e => {
    const char = getActive();
    if (!char) return;
    char.jackOfAllTrades = e.target.checked;
    saveAll();
    renderSkillsList(char);
    renderSummaryCard(char);
  });

  // Attacks
  document.getElementById('attacks-body')?.addEventListener('input', e => {
    const char = getActive();
    if (!char) return;
    const idx = parseInt(e.target.dataset.idx);
    if (isNaN(idx)) return;
    if (e.target.classList.contains('atk-name')) char.attacks[idx].name = e.target.value;
    if (e.target.classList.contains('atk-bonus')) char.attacks[idx].bonus = e.target.value;
    if (e.target.classList.contains('atk-damage')) char.attacks[idx].damage = e.target.value;
    if (e.target.classList.contains('atk-range')) char.attacks[idx].range = e.target.value;
    if (e.target.classList.contains('atk-notes')) char.attacks[idx].notes = e.target.value;
    saveAll();
  });
  document.getElementById('attacks-body')?.addEventListener('click', e => {
    const btn = e.target.closest('.atk-del');
    if (!btn) return;
    const char = getActive();
    if (!char) return;
    char.attacks.splice(parseInt(btn.dataset.idx), 1);
    saveAll();
    renderAttacks(char);
  });
  document.getElementById('btn-add-attack')?.addEventListener('click', () => {
    const char = getActive();
    if (!char) return;
    char.attacks.push({ name: '', bonus: '', damage: '', range: '', notes: '' });
    saveAll();
    renderAttacks(char);
  });

  // Items
  document.getElementById('items-body')?.addEventListener('input', e => {
    const char = getActive();
    if (!char) return;
    const idx = parseInt(e.target.dataset.idx);
    if (isNaN(idx)) return;
    if (e.target.classList.contains('item-name')) char.items[idx].name = e.target.value;
    if (e.target.classList.contains('item-qty')) char.items[idx].qty = parseInt(e.target.value) || 1;
    if (e.target.classList.contains('item-wt')) char.items[idx].wt = parseFloat(e.target.value) || 0;
    if (e.target.classList.contains('item-notes')) char.items[idx].notes = e.target.value;
    saveAll();
    updateCarrying(char);
  });
  document.getElementById('items-body')?.addEventListener('click', e => {
    const btn = e.target.closest('.item-del');
    if (!btn) return;
    const char = getActive();
    if (!char) return;
    char.items.splice(parseInt(btn.dataset.idx), 1);
    saveAll();
    renderItems(char);
    updateCarrying(char);
  });
  document.getElementById('btn-add-item')?.addEventListener('click', () => {
    const char = getActive();
    if (!char) return;
    char.items.push({ name: '', qty: 1, wt: 0, notes: '' });
    saveAll();
    renderItems(char);
  });

  // Resources (delegated)
  document.getElementById('resources-list')?.addEventListener('click', e => {
    const pip = e.target.closest('.res-pip');
    if (!pip) return;
    const char = getActive();
    if (!char) return;
    const resName = pip.dataset.resName;
    const idx = parseInt(pip.dataset.resIdx);
    const current = parseInt(char.resources[resName]) || 0;
    char.resources[resName] = current === idx + 1 ? idx : idx + 1;
    saveAll();
    renderResources(char);
  });

  // AC mode change
  document.getElementById('f-ac-mode')?.addEventListener('change', () => {
    const char = getActive();
    if (!char) return;
    char.acMode = document.getElementById('f-ac-mode').value;
    saveAll();
    updateCombatDerivedUI(char);
    renderSummaryCard(char);
  });

  // Generic form inputs (catch-all for text/number/select/textarea)
  const tabContent = document.getElementById('tab-content');
  tabContent?.addEventListener('change', e => {
    if (suppressSave) return;
    const skip = ['cls-name','cls-level','skill-prof-sel','save-prof-cb','condition-cb','spell-prepared-cb','f-ac-mode','jack-of-all-trades'];
    if (skip.some(cls => e.target.classList.contains(cls) || e.target.id === cls)) return;
    onAnyChange();
  });
  tabContent?.addEventListener('input', e => {
    if (suppressSave) return;
    const skip = ['cls-subclass','atk-name','atk-bonus','atk-damage','atk-range','atk-notes','item-name','item-qty','item-wt','item-notes'];
    if (skip.some(cls => e.target.classList.contains(cls))) return;
    onAnyChange();
  });
}

// ── Utilities ─────────────────────────────────────────────────────────────────

function esc(str) {
  return String(str ?? '')
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;');
}

// ── Init ─────────────────────────────────────────────────────────────────────

async function init() {
  // Load spell data
  try {
    const resp = await fetch('data/spells.json');
    spellsData = await resp.json();
  } catch { spellsData = []; }

  loadAll();
  renderCharacterPicker();
  renderSheet();
  initEventHandlers();

  // Build conditions grid (static)
  const grid = document.getElementById('conditions-grid');
  if (grid && grid.children.length === 0) {
    const char = getActive();
    renderConditions(char || { conditions: [] });
  }
}

document.addEventListener('DOMContentLoaded', init);
