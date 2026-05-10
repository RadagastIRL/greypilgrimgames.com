// ═══════════════════════════════════════════════════════════
// ICONS
// ═══════════════════════════════════════════════════════════

const ICONS = [
  // Identity
  { label:'Question',      path:'Interface\\Icons\\INV_Misc_QuestionMark' },
  { label:'Human M',       path:'Interface\\Icons\\Achievement_Character_Human_Male' },
  { label:'Human F',       path:'Interface\\Icons\\Achievement_Character_Human_Female' },
  { label:'Night Elf M',   path:'Interface\\Icons\\Achievement_Character_NightElf_Male' },
  { label:'Night Elf F',   path:'Interface\\Icons\\Achievement_Character_NightElf_Female' },
  { label:'Blood Elf M',   path:'Interface\\Icons\\Achievement_Character_BloodElf_Male' },
  { label:'Blood Elf F',   path:'Interface\\Icons\\Achievement_Character_BloodElf_Female' },
  { label:'Undead M',      path:'Interface\\Icons\\Achievement_Character_Undead_Male' },
  { label:'Undead F',      path:'Interface\\Icons\\Achievement_Character_Undead_Female' },
  { label:'Orc M',         path:'Interface\\Icons\\Achievement_Character_Orc_Male' },
  { label:'Orc F',         path:'Interface\\Icons\\Achievement_Character_Orc_Female' },
  { label:'Tauren M',      path:'Interface\\Icons\\Achievement_Character_Tauren_Male' },
  { label:'Dwarf M',       path:'Interface\\Icons\\Achievement_Character_Dwarf_Male' },
  { label:'Gnome M',       path:'Interface\\Icons\\Achievement_Character_Gnome_Male' },
  { label:'Troll M',       path:'Interface\\Icons\\Achievement_Character_Troll_Male' },
  { label:'Draenei M',     path:'Interface\\Icons\\Achievement_Character_Draenei_Male' },
  { label:'Worgen M',      path:'Interface\\Icons\\Achievement_Character_Worgen_Male' },
  { label:'Goblin M',      path:'Interface\\Icons\\Achievement_Character_Goblin_Male' },
  // Writing
  { label:'Book',          path:'Interface\\Icons\\INV_Misc_Book_09' },
  { label:'Scroll',        path:'Interface\\Icons\\INV_Scroll_03' },
  { label:'Note',          path:'Interface\\Icons\\INV_Misc_Note_01' },
  { label:'Map',           path:'Interface\\Icons\\INV_Misc_Map01' },
  // Weapons
  { label:'Sword',         path:'Interface\\Icons\\INV_Sword_04' },
  { label:'Longsword',     path:'Interface\\Icons\\INV_Sword_39' },
  { label:'Dagger',        path:'Interface\\Icons\\INV_Weapon_ShortBlade_05' },
  { label:'Axe',           path:'Interface\\Icons\\INV_Axe_01' },
  { label:'Mace',          path:'Interface\\Icons\\INV_Mace_01' },
  { label:'Staff',         path:'Interface\\Icons\\INV_Staff_13' },
  { label:'Bow',           path:'Interface\\Icons\\INV_Weapon_Bow_05' },
  { label:'Shield',        path:'Interface\\Icons\\INV_Shield_06' },
  // Magic
  { label:'Holy',          path:'Interface\\Icons\\Spell_Holy_Resurrection' },
  { label:'Shadow',        path:'Interface\\Icons\\Spell_Shadow_SoulLeech_3' },
  { label:'Fire',          path:'Interface\\Icons\\Spell_Fire_Flamebolt' },
  { label:'Frost',         path:'Interface\\Icons\\Spell_Frost_FrostBolt02' },
  { label:'Arcane',        path:'Interface\\Icons\\Spell_Arcane_ArcaneBolt' },
  { label:'Nature',        path:'Interface\\Icons\\Spell_Nature_FaerieFire' },
  { label:'Fel',           path:'Interface\\Icons\\Spell_Fel_Incinerate01' },
  { label:'Death',         path:'Interface\\Icons\\Spell_DeathKnight_RaiseDead2' },
  { label:'Life',          path:'Interface\\Icons\\Spell_Nature_WispHeal' },
  { label:'Light',         path:'Interface\\Icons\\Spell_Holy_HolyBolt' },
  { label:'Void',          path:'Interface\\Icons\\Spell_Priest_VoidBlast' },
  { label:'Moon',          path:'Interface\\Icons\\Ability_Druid_Moonfire' },
  { label:'Storm',         path:'Interface\\Icons\\Spell_Nature_CallLightning' },
  // Professions
  { label:'Blacksmith',    path:'Interface\\Icons\\Trade_BlackSmithing' },
  { label:'Tailoring',     path:'Interface\\Icons\\Trade_Tailoring' },
  { label:'Alchemy',       path:'Interface\\Icons\\Trade_Alchemy' },
  { label:'Herbalism',     path:'Interface\\Icons\\Spell_Nature_Thorns' },
  { label:'Mining',        path:'Interface\\Icons\\Trade_Mining' },
  { label:'Engineering',   path:'Interface\\Icons\\Trade_Engineering' },
  { label:'Enchanting',    path:'Interface\\Icons\\Trade_Engraving' },
  { label:'Cooking',       path:'Interface\\Icons\\INV_Misc_Food_15' },
  { label:'Fishing',       path:'Interface\\Icons\\Trade_Fishing' },
  { label:'Inscription',   path:'Interface\\Icons\\INV_Inscription_Tradeskill01' },
  { label:'Jewelcraft',    path:'Interface\\Icons\\INV_Misc_Gem_Diamond_01' },
  // Items
  { label:'Potion',        path:'Interface\\Icons\\INV_Potion_01' },
  { label:'Ring',          path:'Interface\\Icons\\INV_Jewelry_Ring_08' },
  { label:'Rose',          path:'Interface\\Icons\\INV_Misc_Flower_01' },
  { label:'Coin',          path:'Interface\\Icons\\INV_Misc_Coin_01' },
  { label:'Key',           path:'Interface\\Icons\\INV_Misc_Key_01' },
  { label:'Lantern',       path:'Interface\\Icons\\INV_Misc_Lantern_01' },
  { label:'Bag',           path:'Interface\\Icons\\INV_Misc_Bag_11' },
  { label:'Rune',          path:'Interface\\Icons\\INV_Misc_Rune_01' },
  { label:'Herb',          path:'Interface\\Icons\\INV_Misc_Herb_02' },
  { label:'Feather',       path:'Interface\\Icons\\INV_Feather_01' },
  { label:'Drink',         path:'Interface\\Icons\\INV_Drink_09' },
  { label:'Orb',           path:'Interface\\Icons\\INV_Misc_Orb_01' },
  { label:'Gear',          path:'Interface\\Icons\\INV_Misc_Gear_01' },
  // Symbols
  { label:'Heart',         path:'Interface\\Icons\\Spell_Holy_PrayerOfHealing02' },
  { label:'Skull',         path:'Interface\\Icons\\Ability_Creature_Cursed_03' },
  { label:'Star',          path:'Interface\\Icons\\Achievement_Reputation_08' },
  { label:'Eye',           path:'Interface\\Icons\\Ability_EyeOfTheOwl' },
  { label:'Paw',           path:'Interface\\Icons\\Ability_Druid_SurvivalInstincts' },
  { label:'Anchor',        path:'Interface\\Icons\\INV_Misc_Anchor' },
  { label:'Crown',         path:'Interface\\Icons\\INV_Crown_01' },
  { label:'Music',         path:'Interface\\Icons\\INV_Misc_Drum_01' },
  { label:'Compass',       path:'Interface\\Icons\\Achievement_Exploration_Northrend' },
];

function iconUrl(path) {
  const name = String(path || '').split('\\').pop().split('/').pop();
  if (!name) return '';
  return `https://wow.zamimg.com/images/wow/icons/medium/${name.toLowerCase()}.jpg`;
}

// Converts a WoW Interface\ texture path to a web-accessible PNG via Gethe's
// wow-ui-textures repo (https://github.com/Gethe/wow-ui-textures, branch: live).
// Coverage is good for classic UI textures; newer ones may 404 gracefully.
function textureUrl(path) {
  const clean = String(path || '').replace(/^Interface[\\\/]/i, '').replace(/\\/g, '/');
  return `https://raw.githubusercontent.com/Gethe/wow-ui-textures/live/${clean}.PNG`;
}

// Textures available in TRP3's built-in background picker (UITools.lua).
// Paths include the Interface\ prefix (required by TRP3's {img} tag).
// textureUrl() strips the prefix to build Gethe repo preview URLs.
// File-name casing matches the Gethe/wow-ui-textures repo exactly.
const TEXTURES = [
  // ── Expansion Art (Credits screens — Classic through Shadowlands only) ──
  { label:'Classic WoW',        path:'Interface\\Credits\\CreditsScreenBackground0WOW',        cat:'Expansion Art' },
  { label:'Burning Crusade',    path:'Interface\\Credits\\CreditsScreenBackground1BC',         cat:'Expansion Art' },
  { label:'Wrath of the Lich King', path:'Interface\\Credits\\CreditsScreenBackground2WOTLK', cat:'Expansion Art' },
  { label:'Cataclysm',          path:'Interface\\Credits\\CreditsScreenBackground3Cataclysm', cat:'Expansion Art' },
  { label:'Mists of Pandaria',  path:'Interface\\Credits\\CreditsScreenBackground4MOP',       cat:'Expansion Art' },
  { label:'Warlords of Draenor',path:'Interface\\Credits\\CreditsScreenBackground5WOD',       cat:'Expansion Art' },
  { label:'Legion',             path:'Interface\\Credits\\CreditsScreenBackground6Legion',    cat:'Expansion Art' },
  { label:'Battle for Azeroth', path:'Interface\\Credits\\CreditsScreenBackground7BFA',       cat:'Expansion Art' },
  { label:'Shadowlands',        path:'Interface\\Credits\\CreditsScreenBackground8Shadowlands',cat:'Expansion Art' },
  // ── Parchment & Paper ──
  { label:'Dark Sandstone', path:'Interface\\HELPFRAME\\DarkSandstone-Tile',                   cat:'Parchment' },
  { label:'Parchment',      path:'Interface\\HELPFRAME\\Tileable-Parchment',                   cat:'Parchment' },
  { label:'Question Bg',    path:'Interface\\QuestionFrame\\question-background',               cat:'Parchment' },
  { label:'Adventure Map',  path:'Interface\\AdventureMap\\AdventureMapParchmentTile',         cat:'Parchment' },
  { label:'Ship Mission',   path:'Interface\\Garrison\\GarrisonShipMissionParchment',          cat:'Parchment' },
  // ── Stationery ──
  { label:'Auction House',  path:'Interface\\Stationery\\AuctionStationery1',                  cat:'Stationery' },
  { label:'Ironforge',      path:'Interface\\Stationery\\Stationery_ill1',                     cat:'Stationery' },
  { label:'Orgrimmar',      path:'Interface\\Stationery\\Stationery_OG1',                      cat:'Stationery' },
  { label:'Thunder Bluff',  path:'Interface\\Stationery\\Stationery_TB1',                      cat:'Stationery' },
  { label:'Undercity',      path:'Interface\\Stationery\\Stationery_UC1',                      cat:'Stationery' },
  { label:'Stationery Test',path:'Interface\\Stationery\\StationeryTest1',                     cat:'Stationery' },
  // ── UI Backgrounds (tileable) ──
  { label:'Dialog Box',     path:'Interface\\DialogFrame\\UI-DialogBox-Background',             cat:'UI Tiles' },
  { label:'Bank',           path:'Interface\\BankFrame\\Bank-Background',                       cat:'UI Tiles' },
  { label:'Marble',         path:'Interface\\FrameGeneral\\UI-Background-Marble',               cat:'UI Tiles' },
  { label:'Rock',           path:'Interface\\FrameGeneral\\UI-Background-Rock',                 cat:'UI Tiles' },
  { label:'Guild Vault',    path:'Interface\\GuildBankFrame\\GuildVaultBG',                     cat:'UI Tiles' },
  { label:'Collections',    path:'Interface\\Collections\\CollectionsBackgroundTile',           cat:'UI Tiles' },
  { label:'Raid Frame',     path:'Interface\\RAIDFRAME\\UI-RaidFrame-GroupBg',                  cat:'UI Tiles' },
  { label:'Achievement',    path:'Interface\\ACHIEVEMENTFRAME\\UI-Achievement-StatsBackground', cat:'UI Tiles' },
  // ── Faction & Covenant (Shadowlands covenants + older faction frames) ──
  { label:'Alliance',       path:'Interface\\FrameGeneral\\UIFrameAllianceBackground',         cat:'Faction' },
  { label:'Horde',          path:'Interface\\FrameGeneral\\UIFrameHordeBackground',             cat:'Faction' },
  { label:'Neutral',        path:'Interface\\FrameGeneral\\UIFrameNeutralBackground',           cat:'Faction' },
  { label:'Kyrian',         path:'Interface\\FrameGeneral\\UIFrameKyrianBackground',           cat:'Faction' },
  { label:'Night Fae',      path:'Interface\\FrameGeneral\\UIFrameNightFaeBackground',         cat:'Faction' },
  { label:'Venthyr',        path:'Interface\\FrameGeneral\\UIFrameVenthyrBackground',          cat:'Faction' },
  { label:'Necrolord',      path:'Interface\\FrameGeneral\\UIFrameNecrolordBackground',        cat:'Faction' },
  { label:'Oribos',         path:'Interface\\FrameGeneral\\UIFrameOribosBackground',           cat:'Faction' },
  { label:'Marine',         path:'Interface\\FrameGeneral\\UIFrameMarineBackground',           cat:'Faction' },
  { label:'Mechagon',       path:'Interface\\FrameGeneral\\UIFrameMechagonBackground',         cat:'Faction' },
  // ── Garrison & Class Hall ──
  { label:'Garrison',         path:'Interface\\Garrison\\GarrisonUIBackground',                      cat:'Garrison' },
  { label:'Garrison 2',       path:'Interface\\Garrison\\GarrisonUIBackground2',                     cat:'Garrison' },
  { label:'Landing Page',     path:'Interface\\Garrison\\GarrisonLandingPageMiddleTile',              cat:'Garrison' },
  { label:'Mission Info',     path:'Interface\\Garrison\\GarrisonMissionUIInfoBoxBackgroundTile',     cat:'Garrison' },
  { label:'Class Hall',       path:'Interface\\Garrison\\ClassHallBackground',                        cat:'Garrison' },
  { label:'Class Hall Int',   path:'Interface\\Garrison\\ClassHallInternalBackground',               cat:'Garrison' },
  // ── Misc ──
  { label:'World Map 1',  path:'Interface\\WorldMap\\UI-WorldMap-Middle1',                   cat:'Misc' },
  { label:'World Map 2',  path:'Interface\\WorldMap\\UI-WorldMap-Middle2',                   cat:'Misc' },
  { label:'Endscreen',    path:'Interface\\Destiny\\EndscreenBG',                            cat:'Misc' },
  { label:'Glue Popup',   path:'Interface\\Glues\\CharacterSelect\\GlueAnnouncementPopupBackground', cat:'Misc' },
];

// ═══════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════

const STATUS_META = {
  1: { label:'Out of Character', cls:'ooc', dot:'⚫' },
  2: { label:'In Character',     cls:'ic',  dot:'🟢' },
  3: { label:'Looking for RP',   cls:'lfr', dot:'🔵' },
  4: { label:'Do Not Disturb',   cls:'dnd', dot:'🔴' },
};

const MARKUP_COLORS = [
  { label:'Gold',    hex:'ffd100' },
  { label:'Silver',  hex:'c0c0c0' },
  { label:'Red',     hex:'ff4444' },
  { label:'Blue',    hex:'6699ff' },
  { label:'Green',   hex:'55cc55' },
  { label:'Orange',  hex:'ff7c0a' },
  { label:'Purple',  hex:'cc88ff' },
  { label:'Teal',    hex:'44ccbb' },
];

const AI_PRESET_ICONS = {
  'Pronouns':    'Interface\\Icons\\Achievement_GuildPerk_EverybodysFriend',
  'Nickname':    'Interface\\Icons\\Achievement_Character_Human_Female',
  'Occupation':  'Interface\\Icons\\Trade_Engineering',
  'House / Clan':'Interface\\Icons\\Achievement_Reputation_08',
  'Relationship':'Interface\\Icons\\Spell_Holy_PrayerOfHealing02',
  'Birthplace':  'Interface\\Icons\\INV_Misc_Map01',
  'Status':      'Interface\\Icons\\Spell_Holy_Resurrection',
  'Voice':       'Interface\\Icons\\INV_Misc_Drum_01',
};

const DEFAULT_SLIDERS = [
  { id:'s1', left:'Cheerful',  right:'Melancholic', value:50 },
  { id:'s2', left:'Introvert', right:'Extrovert',   value:50 },
  { id:'s3', left:'Humble',    right:'Arrogant',    value:50 },
  { id:'s4', left:'Lawful',    right:'Chaotic',     value:50 },
  { id:'s5', left:'Brave',     right:'Cowardly',    value:50 },
];

const DEFAULT_SECTIONS = [
  { id:'a1', icon:'Interface\\Icons\\INV_Misc_Book_09',                 title:'History',     body:'' },
  { id:'a2', icon:'Interface\\Icons\\Achievement_Character_Human_Male', title:'Appearance',  body:'' },
  { id:'a3', icon:'Interface\\Icons\\Spell_Holy_Resurrection',          title:'Personality', body:'' },
];

const STORAGE_KEY = 'gpg-trp3-builder';
const HELP_KEY    = 'gpg-trp3-builder-help-seen';

// ═══════════════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════════════

let state = {
  profileName:     'My Character',
  playerString:    '',
  firstName:       '',
  lastName:        '',
  title:           '',
  race:            '',
  class:           '',
  age:             '',
  height:          '',
  weight:          '',
  eyeColour:       '',
  tagline:         '',
  colour:          'ff7c0a',
  icon:            'Interface\\Icons\\INV_Misc_QuestionMark',
  currentlyStatus: 2,
  currentlyText:   '',
  sliders:         JSON.parse(JSON.stringify(DEFAULT_SLIDERS)),
  sections:        JSON.parse(JSON.stringify(DEFAULT_SECTIONS)),
  additionalInfo:  [],
  misc:            '',
};

let nextId = 100;

function setState(patch) {
  Object.assign(state, patch);
  saveState();
  renderPreview();
  flashSaved();
}

let _saveTimer = null;
function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ state, nextId })); } catch(e) {}
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    if (saved.state) state = Object.assign(state, saved.state);
    if (!state.additionalInfo) state.additionalInfo = [];
    if (saved.nextId) nextId = saved.nextId;
  } catch(e) {}
}

function flashSaved() {
  const el = document.getElementById('save-indicator');
  el.classList.add('flash');
  clearTimeout(_saveTimer);
  _saveTimer = setTimeout(() => el.classList.remove('flash'), 1800);
}

// ═══════════════════════════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════════════════════════

function escHtml(s) {
  return String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function parseMarkup(text) {
  if (!text) return '';
  let h = String(text).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

  // Headings — {h1}, {h1:c}, {h1:r}
  h = h.replace(/\{h([123])(?::([lcrLCR]))?\}/gi, (_, n, a) => {
    const align = a ? ({l:'left',c:'center',r:'right'}[a.toLowerCase()]||'left') : 'left';
    return `<h${n} style="text-align:${align}">`;
  });
  h = h.replace(/\{\/h([123])\}/gi, (_, n) => `</h${n}>`);

  // Links — {link*url*text}
  h = h.replace(/\{link\*([^*}]+)\*([^}]*)\}/gi,
    (_, url, txt) => `<a href="${escHtml(url)}" target="_blank" rel="noopener">${txt || url}</a>`);

  // Inline icons — {icon:name:size}
  h = h.replace(/\{icon:([^:}]+)(?::(\d+))?\}/gi, (_, name, size) => {
    const px = Math.max(10, Math.min(64, parseInt(size||20,10)));
    const url = `https://wow.zamimg.com/images/wow/icons/medium/${name.toLowerCase()}.jpg`;
    return `<img src="${url}" style="width:${px}px;height:${px}px;border-radius:3px;vertical-align:middle;display:inline-block" onerror="this.style.display='none'">`;
  });

  // Background images — {img:path:width:height}
  h = h.replace(/\{img:([^:}]+):(\d+):(\d+)\}/gi, (_, path, w, ht) => {
    const url = textureUrl(path);
    return `<img src="${url}" style="width:${w}px;height:${ht}px;display:block;object-fit:cover;border-radius:4px;margin:2px 0" onerror="this.style.display='none'">`;
  });

  // Colour tags
  h = h.replace(/\{col:([0-9a-fA-F]{6})\}/gi, '<span style="color:#$1">');
  h = h.replace(/\{\/col\}/gi, '</span>');
  h = h.replace(/\|cff([0-9a-fA-F]{6})/gi, '<span style="color:#$1">');
  h = h.replace(/\|r/gi, '</span>');

  // Remove any remaining unknown tags
  h = h.replace(/\{[^}]{0,40}\}/g, '');

  h = h.replace(/\n/g, '<br>');
  return h;
}

// ═══════════════════════════════════════════════════════════
// THEME
// ═══════════════════════════════════════════════════════════

document.querySelectorAll('#theme-bar button').forEach(b =>
  b.addEventListener('click', () => setTheme(b.dataset.theme)));

// ═══════════════════════════════════════════════════════════
// TABS
// ═══════════════════════════════════════════════════════════

function showTab(name) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.add('hidden'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + name)?.classList.remove('hidden');
  document.querySelector(`.tab-btn[data-tab="${name}"]`)?.classList.add('active');
}
document.querySelectorAll('.tab-btn').forEach(b =>
  b.addEventListener('click', () => showTab(b.dataset.tab)));

// ═══════════════════════════════════════════════════════════
// MARKUP TOOLBAR BUILDER
// ═══════════════════════════════════════════════════════════

function buildToolbar(containerId, textareaId) {
  const bar = document.getElementById(containerId);
  if (!bar) return;

  function ins(open, close) {
    const ta = document.getElementById(textareaId);
    if (!ta) return;
    const s = ta.selectionStart, e = ta.selectionEnd;
    const sel = ta.value.slice(s, e);
    if (sel) {
      ta.setRangeText(open + sel + close, s, e, 'end');
    } else {
      ta.setRangeText(open + close, s, e, 'end');
      const cur = s + open.length;
      ta.setSelectionRange(cur, cur);
    }
    ta.dispatchEvent(new Event('input'));
    ta.focus();
  }

  function btn(label, open, close, title) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'mark-btn';
    b.textContent = label;
    if (title) b.title = title;
    b.addEventListener('click', () => ins(open, close));
    return b;
  }

  function sep() {
    const s = document.createElement('div');
    s.className = 'mark-sep';
    return s;
  }

  // Headings
  bar.appendChild(btn('H1', '{h1}', '{/h1}', 'Large heading'));
  bar.appendChild(btn('H1·C', '{h1:c}', '{/h1}', 'Large heading, centred'));
  bar.appendChild(btn('H2', '{h2}', '{/h2}', 'Medium heading'));
  bar.appendChild(btn('H3', '{h3}', '{/h3}', 'Small heading'));
  bar.appendChild(sep());

  // Colours
  MARKUP_COLORS.forEach(c => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'mark-btn mark-color-btn';
    b.title = c.label;
    b.innerHTML = `<span class="mark-color-swatch" style="background:#${c.hex}"></span>${c.label}`;
    b.addEventListener('click', () => ins(`{col:${c.hex}}`, '{/col}'));
    bar.appendChild(b);
  });
  bar.appendChild(btn('End color', '{/col}', '', 'Close colour tag'));
  bar.appendChild(btn('|r', '|r', '', 'End WoW colour code'));
  bar.appendChild(sep());

  // Link, icon, image
  bar.appendChild(btn('{link}', '{link*https://example.com*', '}', 'Insert hyperlink — edit the URL'));
  (function() {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'mark-btn';
    b.textContent = '{icon}'; b.title = 'Insert inline WoW icon — opens icon picker';
    b.addEventListener('click', e => {
      e.stopPropagation();
      const ta = document.getElementById(textareaId);
      const savedStart = ta ? ta.selectionStart : 0;
      const savedEnd   = ta ? ta.selectionEnd   : 0;
      openIconPicker(b, path => {
        const name = path.split('\\').pop().split('/').pop().toLowerCase();
        const tag  = `{icon:${name}:20}`;
        if (ta) { ta.setRangeText(tag, savedStart, savedEnd, 'end'); ta.dispatchEvent(new Event('input')); ta.focus(); }
      });
    });
    bar.appendChild(b);
  })();
  (function() {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'mark-btn img-pick-btn';
    b.textContent = '{img}'; b.title = 'Insert background texture — opens image picker';
    b.addEventListener('click', e => {
      e.stopPropagation();
      const ta = document.getElementById(textareaId);
      const savedStart = ta ? ta.selectionStart : 0;
      const savedEnd   = ta ? ta.selectionEnd   : 0;
      openImgPicker(b, (path, w, h) => {
        const tag = `{img:${path}:${w}:${h}}`;
        if (ta) { ta.setRangeText(tag, savedStart, savedEnd, 'end'); ta.dispatchEvent(new Event('input')); ta.focus(); }
      });
    });
    bar.appendChild(b);
  })();
}

// ═══════════════════════════════════════════════════════════
// BASICS FORM BINDINGS
// ═══════════════════════════════════════════════════════════

function bindBasics() {
  document.querySelectorAll('[data-key]').forEach(el => {
    const handler = () => {
      const key = el.dataset.key;
      const val = (el.tagName === 'SELECT') ? +el.value : el.value;
      setState({ [key]: val });
    };
    el.addEventListener('input', handler);
    el.addEventListener('change', handler);
  });

  const picker = document.getElementById('colour-picker');
  const hexIn  = document.getElementById('colour-hex');
  const dot    = document.getElementById('colour-dot');

  function syncColour(hex6) {
    const safe = hex6.replace(/[^0-9a-fA-F]/g,'').slice(0,6).toLowerCase();
    state.colour = safe;
    saveState(); renderPreview(); flashSaved();
    dot.style.background = '#' + (safe || 'ff7c0a');
    if (safe.length === 6) picker.value = '#' + safe;
    if (hexIn !== document.activeElement) hexIn.value = safe;
  }
  picker.addEventListener('input', e => syncColour(e.target.value.replace('#','')));
  hexIn.addEventListener('input',  e => syncColour(e.target.value));

  document.getElementById('f-misc').addEventListener('input', e => setState({ misc: e.target.value }));
}

function populateForm() {
  const map = {
    'f-profile-name':   'profileName',
    'f-player-string':  'playerString',
    'f-first-name':     'firstName',
    'f-last-name':      'lastName',
    'f-title':          'title',
    'f-tagline':        'tagline',
    'f-race':           'race',
    'f-class':          'class',
    'f-age':            'age',
    'f-eye-colour':     'eyeColour',
    'f-height':         'height',
    'f-weight':         'weight',
    'f-icon':           'icon',
    'f-currently-text': 'currentlyText',
  };
  for (const [id, key] of Object.entries(map)) {
    const el = document.getElementById(id);
    if (el) el.value = state[key] ?? '';
  }
  document.getElementById('f-status').value = String(state.currentlyStatus ?? 2);
  const col = state.colour || 'ff7c0a';
  document.getElementById('colour-picker').value = '#' + col;
  document.getElementById('colour-hex').value    = col;
  document.getElementById('colour-dot').style.background = '#' + col;
  document.getElementById('f-misc').value = state.misc ?? '';
}

// ═══════════════════════════════════════════════════════════
// ICON PICKER
// ═══════════════════════════════════════════════════════════

const iconPopup = document.getElementById('icon-picker-popup');
let iconTargetCb = null;
let iconFilter = '';

function buildIconGrid() {
  renderIconGrid();
  document.getElementById('icon-search').addEventListener('input', e => {
    iconFilter = e.target.value.trim().toLowerCase();
    renderIconGrid();
  });
}

function renderIconGrid() {
  const grid = document.getElementById('icon-grid');
  grid.innerHTML = '';
  const filtered = ICONS.filter(ic => !iconFilter || ic.label.toLowerCase().includes(iconFilter));
  if (!filtered.length) {
    grid.innerHTML = '<div class="icon-empty" style="grid-column:1/-1">No icons match</div>';
    return;
  }
  filtered.forEach(icon => {
    const sw = document.createElement('div');
    sw.className = 'icon-swatch';
    const url = iconUrl(icon.path);
    sw.innerHTML = `<img src="${url}" alt="${icon.label}" onerror="this.parentNode.querySelector('.il').style.fontSize='0.7rem'"><span class="il">${icon.label}</span>`;
    sw.addEventListener('click', () => {
      if (iconTargetCb) iconTargetCb(icon.path);
      closeIconPicker();
    });
    grid.appendChild(sw);
  });
}

function openIconPicker(nearEl, cb) {
  iconTargetCb = cb;
  iconFilter = '';
  document.getElementById('icon-search').value = '';
  renderIconGrid();
  const rect = nearEl.getBoundingClientRect();
  const top  = rect.bottom + 4;
  const left = Math.min(rect.left, window.innerWidth - 370);
  iconPopup.style.top  = top + 'px';
  iconPopup.style.left = Math.max(8, left) + 'px';
  iconPopup.style.display = 'block';
}
function closeIconPicker() { iconPopup.style.display = 'none'; iconTargetCb = null; }

// ═══════════════════════════════════════════════════════════
// IMAGE / TEXTURE PICKER
// ═══════════════════════════════════════════════════════════

const imgPickerPopup = document.getElementById('img-picker-popup');
let imgPickerCb  = null;
let imgPickerCat = 'all';

const TEXTURE_CATS = ['all', ...new Set(TEXTURES.map(t => t.cat))];

function buildImgPickerCats() {
  const bar = document.getElementById('img-picker-cats');
  TEXTURE_CATS.forEach(cat => {
    const b = document.createElement('button');
    b.className = 'img-cat-btn' + (cat === 'all' ? ' active' : '');
    b.textContent = cat === 'all' ? 'All' : cat;
    b.addEventListener('click', () => {
      imgPickerCat = cat;
      document.querySelectorAll('.img-cat-btn').forEach(el => el.classList.toggle('active', el === b));
      renderImgGrid();
    });
    bar.appendChild(b);
  });
}

function renderImgGrid() {
  const grid = document.getElementById('img-picker-grid');
  grid.innerHTML = '';
  const list = imgPickerCat === 'all' ? TEXTURES : TEXTURES.filter(t => t.cat === imgPickerCat);
  list.forEach(tex => {
    const sw = document.createElement('div');
    sw.className = 'img-swatch';
    const url = textureUrl(tex.path);
    const img = document.createElement('img');
    img.src = url; img.alt = tex.label;
    img.addEventListener('error', () => sw.classList.add('no-preview'));
    const lbl = document.createElement('span');
    lbl.className = 'img-lbl'; lbl.textContent = tex.label;
    sw.appendChild(img); sw.appendChild(lbl);
    sw.addEventListener('click', () => {
      const w  = parseInt(document.getElementById('img-w').value, 10) || 500;
      const h  = parseInt(document.getElementById('img-h').value, 10) || 100;
      if (imgPickerCb) imgPickerCb(tex.path, w, h);
      closeImgPicker();
    });
    grid.appendChild(sw);
  });
}

function openImgPicker(nearEl, cb) {
  imgPickerCb = cb;
  renderImgGrid();
  const rect = nearEl.getBoundingClientRect();
  const top  = rect.bottom + 4;
  const left = Math.min(rect.left, window.innerWidth - 510);
  imgPickerPopup.style.top  = top + 'px';
  imgPickerPopup.style.left = Math.max(8, left) + 'px';
  imgPickerPopup.style.display = 'block';
}

function closeImgPicker() { imgPickerPopup.style.display = 'none'; imgPickerCb = null; }

document.addEventListener('click', e => {
  if (!e.target.closest('#img-picker-popup') && !e.target.closest('.img-pick-btn'))
    closeImgPicker();
});

document.getElementById('icon-pick-main').addEventListener('click', e => {
  openIconPicker(e.currentTarget, path => {
    state.icon = path;
    document.getElementById('f-icon').value = path;
    saveState(); renderPreview(); flashSaved();
  });
});
document.addEventListener('click', e => {
  if (!e.target.closest('#icon-picker-popup') && !e.target.closest('.icon-pick-btn'))
    closeIconPicker();
});

// ═══════════════════════════════════════════════════════════
// PERSONALITY SLIDERS
// ═══════════════════════════════════════════════════════════

function renderSliders() {
  const list = document.getElementById('slider-list');
  list.innerHTML = '';
  state.sliders.forEach((sl, idx) => {
    const row = document.createElement('div');
    row.className = 'slider-row';
    row.innerHTML = `
      <div class="slider-label-row">
        <input type="text" class="sl-left" value="${escHtml(sl.left)}" placeholder="Left trait">
        <span class="sl-val">${sl.value}</span>
        <input type="text" class="sl-right" value="${escHtml(sl.right)}" placeholder="Right trait">
      </div>
      <div class="slider-range-row">
        <input type="range" min="0" max="100" value="${sl.value}" class="sl-range">
      </div>
      <div class="slider-actions">
        ${idx > 0 ? `<button class="btn btn-secondary btn-sm sl-up">↑</button>` : ''}
        ${idx < state.sliders.length - 1 ? `<button class="btn btn-secondary btn-sm sl-down">↓</button>` : ''}
        <button class="btn btn-danger btn-sm sl-remove">✕</button>
      </div>`;

    const valBadge = row.querySelector('.sl-val');
    row.querySelector('.sl-range').addEventListener('input', e => {
      sl.value = +e.target.value;
      valBadge.textContent = sl.value;
      saveState(); renderPreview(); flashSaved();
    });
    row.querySelector('.sl-left').addEventListener('input',  e => { sl.left  = e.target.value; saveState(); renderPreview(); flashSaved(); });
    row.querySelector('.sl-right').addEventListener('input', e => { sl.right = e.target.value; saveState(); renderPreview(); flashSaved(); });
    row.querySelector('.sl-up')?.addEventListener('click',    () => moveSlider(idx, -1));
    row.querySelector('.sl-down')?.addEventListener('click',  () => moveSlider(idx,  1));
    row.querySelector('.sl-remove').addEventListener('click', () => removeSlider(sl.id));
    list.appendChild(row);
  });
}

function addSlider()          { state.sliders.push({ id:'s'+(nextId++), left:'Left', right:'Right', value:50 }); saveState(); renderSliders(); renderPreview(); flashSaved(); }
function removeSlider(id)     { state.sliders = state.sliders.filter(s => s.id !== id); saveState(); renderSliders(); renderPreview(); flashSaved(); }
function moveSlider(idx, dir) {
  const n = idx + dir;
  if (n < 0 || n >= state.sliders.length) return;
  [state.sliders[idx], state.sliders[n]] = [state.sliders[n], state.sliders[idx]];
  saveState(); renderSliders(); renderPreview();
}
document.getElementById('add-slider-btn').addEventListener('click', addSlider);

// ═══════════════════════════════════════════════════════════
// ABOUT SECTIONS
// ═══════════════════════════════════════════════════════════

function makeToolbarButtons(bodyId) {
  const bar = document.createElement('div');
  bar.className = 'markup-toolbar';

  function ins(open, close) {
    const ta = document.getElementById(bodyId);
    if (!ta) return;
    const s = ta.selectionStart, e = ta.selectionEnd;
    const sel = ta.value.slice(s, e);
    if (sel) {
      ta.setRangeText(open + sel + close, s, e, 'end');
    } else {
      ta.setRangeText(open + close, s, e, 'end');
      const cur = s + open.length;
      ta.setSelectionRange(cur, cur);
    }
    ta.dispatchEvent(new Event('input'));
    ta.focus();
  }

  function btn(label, open, close, title) {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'mark-btn';
    b.textContent = label; if (title) b.title = title;
    b.addEventListener('click', () => ins(open, close));
    return b;
  }
  function sep() { const s = document.createElement('div'); s.className = 'mark-sep'; return s; }

  bar.appendChild(btn('H1', '{h1}', '{/h1}', 'Large heading'));
  bar.appendChild(btn('H1·C', '{h1:c}', '{/h1}', 'Large heading, centred'));
  bar.appendChild(btn('H2', '{h2}', '{/h2}', 'Medium heading'));
  bar.appendChild(btn('H3', '{h3}', '{/h3}', 'Small heading'));
  bar.appendChild(sep());

  MARKUP_COLORS.forEach(c => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'mark-btn mark-color-btn'; b.title = c.label;
    b.innerHTML = `<span class="mark-color-swatch" style="background:#${c.hex}"></span>${c.label}`;
    b.addEventListener('click', () => ins(`{col:${c.hex}}`, '{/col}'));
    bar.appendChild(b);
  });
  bar.appendChild(btn('End color', '{/col}', '', 'Close colour tag'));
  bar.appendChild(btn('|r', '|r', '', 'End WoW colour code'));
  bar.appendChild(sep());
  bar.appendChild(btn('{link}', '{link*https://example.com*', '}', 'Hyperlink — edit URL'));
  (function() {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'mark-btn';
    b.textContent = '{icon}'; b.title = 'Insert inline WoW icon — opens icon picker';
    b.addEventListener('click', e => {
      e.stopPropagation();
      const ta = document.getElementById(bodyId);
      const savedStart = ta ? ta.selectionStart : 0;
      const savedEnd   = ta ? ta.selectionEnd   : 0;
      openIconPicker(b, path => {
        const name = path.split('\\').pop().split('/').pop().toLowerCase();
        const tag  = `{icon:${name}:20}`;
        if (ta) { ta.setRangeText(tag, savedStart, savedEnd, 'end'); ta.dispatchEvent(new Event('input')); ta.focus(); }
      });
    });
    bar.appendChild(b);
  })();
  (function() {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'mark-btn img-pick-btn';
    b.textContent = '{img}'; b.title = 'Insert background texture — opens image picker';
    b.addEventListener('click', e => {
      e.stopPropagation();
      const ta = document.getElementById(bodyId);
      const savedStart = ta ? ta.selectionStart : 0;
      const savedEnd   = ta ? ta.selectionEnd   : 0;
      openImgPicker(b, (path, w, h) => {
        const tag = `{img:${path}:${w}:${h}}`;
        if (ta) { ta.setRangeText(tag, savedStart, savedEnd, 'end'); ta.dispatchEvent(new Event('input')); ta.focus(); }
      });
    });
    bar.appendChild(b);
  })();

  return bar;
}

function renderSections() {
  const list = document.getElementById('section-list');
  list.innerHTML = '';
  state.sections.forEach((sec, idx) => {
    const row = document.createElement('div');
    row.className = 'section-row';
    const iconInputId = 'sec-icon-' + sec.id;
    const bodyId      = 'sec-body-' + sec.id;

    row.innerHTML = `
      <div class="section-hdr">
        <span class="section-num">§${idx + 1}</span>
        <input type="text" class="sec-title" value="${escHtml(sec.title)}" placeholder="Section title">
        <div class="section-actions">
          ${idx > 0 ? `<button class="btn btn-secondary btn-sm sec-up">↑</button>` : ''}
          ${idx < state.sections.length - 1 ? `<button class="btn btn-secondary btn-sm sec-down">↓</button>` : ''}
          <button class="btn btn-danger btn-sm sec-remove">✕</button>
        </div>
      </div>
      <div class="icon-field">
        <label style="flex-shrink:0;font-size:0.68rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.07em">Icon</label>
        <input type="text" id="${iconInputId}" class="sec-icon" value="${escHtml(sec.icon)}" placeholder="Interface\\Icons\\...">
        <button class="icon-pick-btn sec-icon-pick">Browse…</button>
      </div>`;

    const toolbar = makeToolbarButtons(bodyId);
    const ta = document.createElement('textarea');
    ta.id = bodyId; ta.className = 'sec-body'; ta.rows = 5;
    ta.placeholder = 'Section body. Use toolbar above for formatting.';
    ta.value = sec.body;

    row.appendChild(toolbar);
    row.appendChild(ta);

    row.querySelector('.sec-title').addEventListener('input', e => { sec.title = e.target.value; saveState(); renderPreview(); flashSaved(); });
    row.querySelector('.sec-icon').addEventListener('input',  e => { sec.icon  = e.target.value; saveState(); renderPreview(); flashSaved(); });
    ta.addEventListener('input', e => { sec.body = e.target.value; saveState(); renderPreview(); flashSaved(); });

    row.querySelector('.sec-icon-pick').addEventListener('click', e => {
      openIconPicker(e.currentTarget, path => {
        sec.icon = path;
        row.querySelector('.sec-icon').value = path;
        saveState(); renderPreview(); flashSaved();
      });
    });

    row.querySelector('.sec-up')?.addEventListener('click',    () => moveSection(idx, -1));
    row.querySelector('.sec-down')?.addEventListener('click',  () => moveSection(idx,  1));
    row.querySelector('.sec-remove').addEventListener('click', () => removeSection(sec.id));
    list.appendChild(row);
  });
}

function addSection()          { state.sections.push({ id:'a'+(nextId++), icon:'Interface\\Icons\\INV_Misc_QuestionMark', title:'New Section', body:'' }); saveState(); renderSections(); renderPreview(); flashSaved(); }
function removeSection(id)     { state.sections = state.sections.filter(s => s.id !== id); saveState(); renderSections(); renderPreview(); flashSaved(); }
function moveSection(idx, dir) {
  const n = idx + dir;
  if (n < 0 || n >= state.sections.length) return;
  [state.sections[idx], state.sections[n]] = [state.sections[n], state.sections[idx]];
  saveState(); renderSections(); renderPreview();
}
document.getElementById('add-section-btn').addEventListener('click', addSection);

// ═══════════════════════════════════════════════════════════
// CUSTOM FIELDS (Additional Info)
// ═══════════════════════════════════════════════════════════

function renderAdditionalInfo() {
  const list = document.getElementById('ai-list');
  list.innerHTML = '';
  state.additionalInfo.forEach((ai, idx) => {
    const row = document.createElement('div');
    row.className = 'ai-row';
    const iconId = 'ai-icon-' + ai.id;

    row.innerHTML = `
      <div class="ai-row-hdr">
        <input type="text" class="ai-name" value="${escHtml(ai.name)}" placeholder="Field name (e.g. Pronouns)">
        <div class="ai-actions">
          ${idx > 0 ? `<button class="btn btn-secondary btn-sm ai-up">↑</button>` : ''}
          ${idx < state.additionalInfo.length - 1 ? `<button class="btn btn-secondary btn-sm ai-down">↓</button>` : ''}
          <button class="btn btn-danger btn-sm ai-remove">✕</button>
        </div>
      </div>
      <div class="ai-row-body">
        <div class="icon-field" style="flex:0 0 auto;min-width:0">
          <input type="text" id="${iconId}" class="ai-icon" value="${escHtml(ai.icon)}" placeholder="Icon path" style="width:160px;font-size:0.72rem;font-family:monospace">
          <button class="icon-pick-btn ai-icon-pick">Browse…</button>
        </div>
        <input type="text" class="ai-value" value="${escHtml(ai.value)}" placeholder="Value (e.g. She/Her)">
      </div>`;

    row.querySelector('.ai-name').addEventListener('input', e => { ai.name = e.target.value; saveState(); renderPreview(); flashSaved(); });
    row.querySelector('.ai-value').addEventListener('input', e => { ai.value = e.target.value; saveState(); renderPreview(); flashSaved(); });
    row.querySelector('.ai-icon').addEventListener('input', e => { ai.icon = e.target.value; saveState(); renderPreview(); flashSaved(); });
    row.querySelector('.ai-icon-pick').addEventListener('click', ev => {
      openIconPicker(ev.currentTarget, path => {
        ai.icon = path;
        row.querySelector('.ai-icon').value = path;
        saveState(); renderPreview(); flashSaved();
      });
    });
    row.querySelector('.ai-up')?.addEventListener('click',    () => moveAI(idx, -1));
    row.querySelector('.ai-down')?.addEventListener('click',  () => moveAI(idx,  1));
    row.querySelector('.ai-remove').addEventListener('click', () => removeAI(ai.id));
    list.appendChild(row);
  });
}

function addAI(name, icon) {
  state.additionalInfo.push({ id:'ai'+(nextId++), name: name||'Field', icon: icon||'Interface\\Icons\\INV_Misc_QuestionMark', value:'' });
  saveState(); renderAdditionalInfo(); renderPreview(); flashSaved();
}
function removeAI(id)     { state.additionalInfo = state.additionalInfo.filter(a => a.id !== id); saveState(); renderAdditionalInfo(); renderPreview(); flashSaved(); }
function moveAI(idx, dir) {
  const n = idx + dir;
  if (n < 0 || n >= state.additionalInfo.length) return;
  [state.additionalInfo[idx], state.additionalInfo[n]] = [state.additionalInfo[n], state.additionalInfo[idx]];
  saveState(); renderAdditionalInfo(); renderPreview();
}

document.getElementById('add-ai-btn').addEventListener('click', () => addAI());

document.querySelectorAll('.ai-preset-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const name = btn.dataset.preset;
    const icon = AI_PRESET_ICONS[name] || 'Interface\\Icons\\INV_Misc_QuestionMark';
    // Don't add duplicates
    if (!state.additionalInfo.find(a => a.name === name)) addAI(name, icon);
    else showTab('custom');
  });
});

// ═══════════════════════════════════════════════════════════
// PREVIEW
// ═══════════════════════════════════════════════════════════

function renderPreview() {
  const s   = state;
  const col = '#' + (s.colour || 'ff7c0a');
  const fullName  = [s.firstName, s.lastName].filter(Boolean).join(' ') || '<span style="opacity:0.3">No name set</span>';
  const raceClass = [s.race, s.class].filter(Boolean).join(' · ');
  const sm        = STATUS_META[s.currentlyStatus] || STATUS_META[2];
  const iconSrc   = iconUrl(s.icon);

  let h = `<div class="pv-nameplate">
    <div class="pv-icon">
      ${iconSrc ? `<img src="${iconSrc}" alt="icon" onerror="this.style.display='none';this.nextSibling.style.display='flex'">` : ''}
      <span class="pv-icon-fallback" style="${iconSrc?'display:none':''}">${escHtml((s.icon||'').split('\\').pop()||'?')}</span>
    </div>
    ${s.title ? `<div class="pv-title">${escHtml(s.title)}</div>` : ''}
    <div class="pv-name" style="color:${col}">${fullName.includes('<') ? fullName : escHtml(fullName)}</div>
    ${raceClass ? `<div class="pv-sub">${escHtml(raceClass)}</div>` : ''}
    ${s.tagline ? `<div class="pv-tagline">"${escHtml(s.tagline)}"</div>` : ''}
  </div>`;

  h += `<div class="pv-status ${sm.cls}">${sm.dot}&nbsp;${sm.label}`;
  if (s.currentlyText) h += ` &nbsp;·&nbsp; <span class="pv-currently">${escHtml(s.currentlyText)}</span>`;
  h += `</div>`;

  const chars = [
    ['Age', s.age], ['Height', s.height], ['Weight', s.weight], ['Eye Colour', s.eyeColour],
  ].filter(([,v]) => v);
  if (chars.length) {
    h += `<div><div class="pv-section-title">Characteristics</div><div class="pv-chars">
      ${chars.map(([k,v]) => `<div class="pv-char"><span class="pv-ck">${k}:</span><span class="pv-cv">${escHtml(v)}</span></div>`).join('')}
    </div></div>`;
  }

  const activeAI = (s.additionalInfo || []).filter(a => a.name && a.value);
  if (activeAI.length) {
    h += `<div><div class="pv-section-title">Additional Info</div><div class="pv-ai-grid">
      ${activeAI.map(a => {
        const aUrl = iconUrl(a.icon);
        return `<div class="pv-ai-row">
          ${aUrl ? `<img class="pv-ai-icon" src="${aUrl}" onerror="this.style.display='none'">` : ''}
          <span class="pv-ai-name">${escHtml(a.name)}:</span>
          <span class="pv-ai-val">${escHtml(a.value)}</span>
        </div>`;
      }).join('')}
    </div></div>`;
  }

  const activeSliders = s.sliders.filter(sl => sl.left || sl.right);
  if (activeSliders.length) {
    h += `<div><div class="pv-section-title">Personality</div><div class="pv-bars">
      ${activeSliders.map(sl => `
        <div class="pv-bar-row">
          <div class="pv-bar-labels"><span>${escHtml(sl.left)}</span><span>${escHtml(sl.right)}</span></div>
          <div class="pv-bar-track"><div class="pv-bar-dot" style="left:${sl.value}%"></div></div>
        </div>`).join('')}
    </div></div>`;
  }

  const activeSections = s.sections.filter(sec => sec.title || sec.body);
  if (activeSections.length) {
    h += `<div><div class="pv-section-title">About</div>
      ${activeSections.map(sec => {
        const sUrl = iconUrl(sec.icon);
        return `<div class="pv-about-sec">
          <div class="pv-about-hdr">
            ${sUrl ? `<img src="${sUrl}" onerror="this.style.display='none'">` : ''}
            ${sec.title ? `<div class="pv-about-title">${escHtml(sec.title)}</div>` : ''}
          </div>
          <div class="pv-about-body">${parseMarkup(sec.body) || '<span class="pv-empty">(empty)</span>'}</div>
        </div>`;
      }).join('')}
    </div>`;
  }

  if (s.misc) {
    h += `<div><div class="pv-section-title">Notes / OOC</div>
      <div class="pv-about-body">${parseMarkup(s.misc)}</div></div>`;
  }

  document.getElementById('preview-body').innerHTML = h;
}

// ═══════════════════════════════════════════════════════════
// LUA SERIALIZER
// ═══════════════════════════════════════════════════════════

function luaStr(v) {
  return '"' + String(v ?? '').replace(/\\/g,'\\\\').replace(/"/g,'\\"').replace(/\n/g,'\\n').replace(/\r/g,'') + '"';
}

function serializeToLua(s) {
  const pn = (s.profileName || 'My Character').trim();

  const ps = s.sliders.map((sl, i) =>
    `\t\t\t\t\t\t\t[${i+1}] = {\n` +
    `\t\t\t\t\t\t\t\t["LF"] = ${luaStr(sl.left)},\n` +
    `\t\t\t\t\t\t\t\t["RF"] = ${luaStr(sl.right)},\n` +
    `\t\t\t\t\t\t\t\t["VA"] = ${Math.max(0,Math.min(100,Math.round(sl.value||50)))},\n` +
    `\t\t\t\t\t\t\t\t["ID"] = ${luaStr(sl.id)},\n` +
    `\t\t\t\t\t\t\t},`
  ).join('\n');

  const t1 = s.sections.map((sec, i) =>
    `\t\t\t\t\t\t\t[${i+1}] = {\n` +
    `\t\t\t\t\t\t\t\t["ID"] = ${luaStr(sec.id)},\n` +
    `\t\t\t\t\t\t\t\t["TT"] = ${luaStr(sec.title)},\n` +
    `\t\t\t\t\t\t\t\t["TX"] = ${luaStr(sec.body)},\n` +
    `\t\t\t\t\t\t\t\t["IC"] = ${luaStr(sec.icon)},\n` +
    `\t\t\t\t\t\t\t},`
  ).join('\n');

  const ai = (s.additionalInfo || []).map((a, i) =>
    `\t\t\t\t\t\t\t[${i+1}] = {\n` +
    `\t\t\t\t\t\t\t\t["NA"] = ${luaStr(a.name)},\n` +
    `\t\t\t\t\t\t\t\t["IC"] = ${luaStr(a.icon)},\n` +
    `\t\t\t\t\t\t\t\t["VA"] = ${luaStr(a.value)},\n` +
    `\t\t\t\t\t\t\t\t["ID"] = ${luaStr(a.id)},\n` +
    `\t\t\t\t\t\t\t},`
  ).join('\n');

  const miBlock = ai ? `\t\t\t\t\t\t["MI"] = {\n\t\t\t\t\t\t\t["AI"] = {\n${ai}\n\t\t\t\t\t\t\t},\n\t\t\t\t\t\t},\n` : '';

  return `TotalRP3_DB = {
\t["player"] = {
\t\t["profiles"] = {
\t\t\t[${luaStr(pn)}] = {
\t\t\t\t["profileID"] = ${luaStr(pn)},
\t\t\t\t["Information"] = {
\t\t\t\t\t["characteristics"] = {
\t\t\t\t\t\t["FN"] = ${luaStr(s.firstName)},
\t\t\t\t\t\t["LN"] = ${luaStr(s.lastName)},
\t\t\t\t\t\t["TI"] = ${luaStr(s.title)},
\t\t\t\t\t\t["RA"] = ${luaStr(s.race)},
\t\t\t\t\t\t["CL"] = ${luaStr(s.class)},
\t\t\t\t\t\t["AG"] = ${luaStr(s.age)},
\t\t\t\t\t\t["HE"] = ${luaStr(s.height)},
\t\t\t\t\t\t["WE"] = ${luaStr(s.weight)},
\t\t\t\t\t\t["EC"] = ${luaStr(s.eyeColour)},
\t\t\t\t\t\t["RE"] = ${luaStr(s.tagline)},
\t\t\t\t\t\t["CH"] = ${luaStr(s.colour || 'ff7c0a')},
\t\t\t\t\t\t["IC"] = ${luaStr(s.icon)},
\t\t\t\t\t\t["CO"] = ${luaStr(s.currentlyText)},
\t\t\t\t\t\t["CU"] = ${Math.max(1,Math.min(4,s.currentlyStatus||2))},
\t\t\t\t\t\t["PS"] = {
${ps}
\t\t\t\t\t\t},
${miBlock}\t\t\t\t\t},
\t\t\t\t\t["about"] = {
\t\t\t\t\t\t["TE"] = 1,
\t\t\t\t\t\t["T1"] = {
${t1}
\t\t\t\t\t\t},
\t\t\t\t\t},
\t\t\t\t\t["misc"] = {
\t\t\t\t\t\t["TT"] = ${luaStr(s.misc)},
\t\t\t\t\t},
\t\t\t\t},
\t\t\t},
\t\t},
\t\t["player"] = ${luaStr(s.playerString || 'Charname-Realm')},
\t\t["selectedProfile"] = ${luaStr(pn)},
\t},
}
`;
}

// ═══════════════════════════════════════════════════════════
// LUA PARSER
// ═══════════════════════════════════════════════════════════

function parseLuaFile(src) {
  let pos = 0;
  const len = src.length;

  function skip() {
    while (pos < len) {
      const ch = src[pos];
      if (ch === ' ' || ch === '\t' || ch === '\n' || ch === '\r') { pos++; continue; }
      if (src[pos] === '-' && src[pos+1] === '-') {
        if (src[pos+2] === '[') {
          let lvl = 0, i = pos + 3;
          while (i < len && src[i] === '=') { lvl++; i++; }
          if (src[i] === '[') {
            const close = ']' + '='.repeat(lvl) + ']';
            const e = src.indexOf(close, i + 1);
            pos = e < 0 ? len : e + close.length;
            continue;
          }
        }
        while (pos < len && src[pos] !== '\n') pos++;
        continue;
      }
      break;
    }
  }

  function readLongString() {
    let lvl = 0; pos++;
    while (pos < len && src[pos] === '=') { lvl++; pos++; }
    pos++;
    if (src[pos] === '\n') pos++;
    const close = ']' + '='.repeat(lvl) + ']';
    const e = src.indexOf(close, pos);
    const content = e < 0 ? '' : src.slice(pos, e);
    pos = e < 0 ? len : e + close.length;
    return content;
  }

  function readString(q) {
    pos++;
    let s = '';
    while (pos < len && src[pos] !== q) {
      if (src[pos] === '\\') {
        pos++;
        const c = src[pos++];
        if      (c === 'n')  s += '\n';
        else if (c === 't')  s += '\t';
        else if (c === 'r')  s += '\r';
        else if (c === '\\') s += '\\';
        else if (c === '"')  s += '"';
        else if (c === "'")  s += "'";
        else if (c >= '0' && c <= '9') {
          let num = c;
          if (pos < len && src[pos] >= '0' && src[pos] <= '9') num += src[pos++];
          if (pos < len && src[pos] >= '0' && src[pos] <= '9') num += src[pos++];
          s += String.fromCharCode(parseInt(num, 10));
        } else s += c;
      } else {
        s += src[pos++];
      }
    }
    pos++;
    return s;
  }

  function parseValue() {
    skip();
    if (pos >= len) return null;
    const ch = src[pos];
    if (ch === '{') return parseTable();
    if (ch === '"' || ch === "'") return readString(ch);
    if (ch === '[') {
      if (src[pos+1] === '[' || src[pos+1] === '=') return readLongString();
      return null;
    }
    if (ch === '-' || (ch >= '0' && ch <= '9')) {
      const m = src.slice(pos).match(/^-?[0-9]+(\.[0-9]+)?([eE][+-]?[0-9]+)?/);
      if (m) { pos += m[0].length; return parseFloat(m[0]); }
    }
    const rest = src.slice(pos);
    if (rest.startsWith('true'))  { pos += 4; return true; }
    if (rest.startsWith('false')) { pos += 5; return false; }
    if (rest.startsWith('nil'))   { pos += 3; return null; }
    const m = rest.match(/^[a-zA-Z_][a-zA-Z0-9_]*/);
    if (m) { pos += m[0].length; return m[0]; }
    pos++; return null;
  }

  function parseTable() {
    pos++;
    const result = {};
    let ai = 1;
    while (true) {
      skip();
      if (pos >= len || src[pos] === '}') { if (pos < len) pos++; break; }
      if (src[pos] === ',') { pos++; continue; }
      if (src[pos] === '[') {
        pos++;
        const key = parseValue();
        skip(); pos++;
        skip(); pos++;
        const val = parseValue();
        if (key !== null) result[key] = val;
      } else {
        const saved = pos;
        const im = src.slice(pos).match(/^[a-zA-Z_][a-zA-Z0-9_]*/);
        if (im) {
          const after = src.slice(pos + im[0].length).replace(/^[\s\t\n\r]+/, '');
          if (after[0] === '=') {
            pos += im[0].length; skip(); pos++;
            const val = parseValue();
            result[im[0]] = val;
            continue;
          }
        }
        pos = saved;
        const val = parseValue();
        result[ai++] = val;
      }
    }
    return result;
  }

  const root = {};
  while (pos < len) {
    skip();
    if (pos >= len) break;
    const m = src.slice(pos).match(/^[a-zA-Z_][a-zA-Z0-9_]*/);
    if (!m) { pos++; continue; }
    const name = m[0]; pos += name.length;
    skip();
    if (pos < len && src[pos] === '=') { pos++; root[name] = parseValue(); }
  }
  return root;
}

function extractProfiles(parsed) {
  try {
    // ── Format 1: Builder's own export ── TotalRP3_DB.player.profiles
    const db = parsed['TotalRP3_DB'];
    if (db?.player?.profiles) {
      return { profiles: db.player.profiles, playerStr: db.player.player || '' };
    }

    // ── Format 2: Real TRP3 save file ── TRP3_Profiles (flat dict keyed by random ID)
    const trp3 = parsed['TRP3_Profiles'];
    if (trp3 && typeof trp3 === 'object' && Object.keys(trp3).length) {
      const profiles = {};
      for (const [, prof] of Object.entries(trp3)) {
        if (!prof || typeof prof !== 'object') continue;
        const name      = String(prof.profileName || '(unnamed)');
        const player    = prof.player    || {};
        const chars     = Object.assign({}, player.characteristics || {});
        const character = player.character || {};
        const about     = Object.assign({}, player.about || {});
        const misc      = player.misc || {};

        // Real TRP3 stores "currently" in `character`, builder expects it in `characteristics`:
        //   character.RP  = status int (1=IC, 2=OOC, 3=casual, 4=full-RP)
        //   character.CU  = "Currently:" free-text
        if (chars.CU === undefined && character.RP !== undefined) chars.CU = character.RP;
        if (chars.CO === undefined && character.CU !== undefined) chars.CO = character.CU;

        // Real TRP3 stores additional-info entries directly as MI[1..n].
        // Builder expects MI.AI[1..n].
        if (chars.MI && typeof chars.MI === 'object' && !chars.MI.AI) {
          chars.MI = { AI: chars.MI };
        }

        // Real TRP3's TE=1 template stores a single text block as about.T1.TX.
        // Builder expects numbered section entries about.T1[1..n].
        const t1 = about.T1;
        if (t1 && typeof t1 === 'object' && t1.TX !== undefined && t1[1] === undefined) {
          about.T1 = { 1: { ID: 'sec1', TT: '', TX: t1.TX, IC: 'Interface\\Icons\\INV_Misc_QuestionMark' } };
        }

        profiles[name] = {
          profileID: name,
          Information: { characteristics: chars, about, misc },
        };
      }
      if (Object.keys(profiles).length) return { profiles, playerStr: '' };
    }

    return { profiles: {}, playerStr: '' };
  } catch(e) { return { profiles:{}, playerStr:'' }; }
}

function profileToState(data, playerStr, profileName) {
  const chars = data?.Information?.characteristics || {};
  const about = data?.Information?.about || {};
  const misc  = data?.Information?.misc  || {};

  const ps = chars?.PS || chars?.ps || {};
  const sliders = [];
  for (let i = 1; ; i++) {
    const sl = ps[i]; if (!sl) break;
    sliders.push({ id:String(sl.ID||sl.id||i), left:String(sl.LF||sl.lf||''), right:String(sl.RF||sl.rf||''), value:Number(sl.VA??sl.va??50) });
  }

  const t1raw = about?.T1 || about?.t1 || {};
  const sections = [];
  for (let i = 1; ; i++) {
    const sec = t1raw[i]; if (!sec) break;
    sections.push({ id:String(sec.ID||sec.id||'a'+i), title:String(sec.TT||sec.tt||''), body:String(sec.TX||sec.tx||''), icon:String(sec.IC||sec.ic||'Interface\\Icons\\INV_Misc_QuestionMark') });
  }

  // Additional Info (MI.AI table)
  const miRaw = chars?.MI || {};
  const aiRaw = miRaw?.AI || {};
  const additionalInfo = [];
  for (let i = 1; ; i++) {
    const ai = aiRaw[i]; if (!ai) break;
    additionalInfo.push({ id:String(ai.ID||ai.id||'ai'+i), name:String(ai.NA||ai.na||''), icon:String(ai.IC||ai.ic||'Interface\\Icons\\INV_Misc_QuestionMark'), value:String(ai.VA||ai.va||'') });
  }

  return {
    profileName:     profileName,
    playerString:    playerStr,
    firstName:       String(chars.FN || ''),
    lastName:        String(chars.LN || ''),
    title:           String(chars.TI || ''),
    race:            String(chars.RA || ''),
    class:           String(chars.CL || ''),
    age:             String(chars.AG || ''),
    height:          String(chars.HE || ''),
    weight:          String(chars.WE || ''),
    eyeColour:       String(chars.EC || ''),
    tagline:         String(chars.RE || ''),
    colour:          String(chars.CH || 'ff7c0a').replace('#',''),
    icon:            String(chars.IC || 'Interface\\Icons\\INV_Misc_QuestionMark'),
    currentlyStatus: Number(chars.CU ?? 2),
    currentlyText:   String(chars.CO || ''),
    sliders:         sliders.length ? sliders : JSON.parse(JSON.stringify(DEFAULT_SLIDERS)),
    sections:        sections.length ? sections : JSON.parse(JSON.stringify(DEFAULT_SECTIONS)),
    additionalInfo,
    misc:            String(misc.TT || ''),
  };
}

// ═══════════════════════════════════════════════════════════
// IMPORT / EXPORT
// ═══════════════════════════════════════════════════════════

let _importProfiles = null, _importPlayerStr = '';

document.getElementById('import-btn').addEventListener('click', () => document.getElementById('file-input').click());

document.getElementById('file-input').addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = evt => {
    try {
      const parsed = parseLuaFile(evt.target.result);
      const { profiles, playerStr } = extractProfiles(parsed);
      _importPlayerStr = playerStr;
      _importProfiles  = profiles;
      const names = Object.keys(profiles);
      if (!names.length) { alert('No profiles found. Is this a valid totalRP3.lua?'); return; }
      if (names.length === 1) { applyImport(names[0]); }
      else { showProfilePicker(names); }
    } catch(err) {
      alert('Could not parse the file.\n\n' + err.message);
    }
    e.target.value = '';
  };
  reader.readAsText(file);
});

function applyImport(name) {
  const newState = profileToState(_importProfiles[name], _importPlayerStr, name);
  Object.assign(state, newState);
  nextId = Math.max(nextId, 200);
  saveState();
  populateForm();
  renderSliders();
  renderSections();
  renderAdditionalInfo();
  renderPreview();
  showTab('basics');
  document.getElementById('import-modal').classList.remove('visible');
}

function showProfilePicker(names) {
  const list = document.getElementById('profile-picker-list');
  list.innerHTML = '';
  names.forEach(name => {
    const opt = document.createElement('div');
    opt.className = 'profile-opt';
    opt.textContent = name;
    opt.addEventListener('click', () => applyImport(name));
    list.appendChild(opt);
  });
  document.getElementById('import-modal').classList.add('visible');
}

document.getElementById('import-cancel-btn').addEventListener('click', () =>
  document.getElementById('import-modal').classList.remove('visible'));
document.getElementById('import-modal').addEventListener('click', e => {
  if (e.target === e.currentTarget) e.currentTarget.classList.remove('visible');
});

document.getElementById('export-btn').addEventListener('click', () => {
  if (!state.profileName?.trim()) {
    alert('Please enter a Profile Name before exporting.');
    showTab('basics');
    document.getElementById('f-profile-name').focus();
    return;
  }
  const lua  = serializeToLua(state);
  const blob = new Blob([lua], { type: 'text/plain;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = 'totalRP3.lua'; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);

  // Feedback + open install guide
  const btn = document.getElementById('export-btn');
  const orig = btn.textContent;
  btn.textContent = '✓ Downloaded!';
  setTimeout(() => { btn.textContent = orig; }, 2200);
  const guide = document.getElementById('install-guide');
  if (!guide.classList.contains('open')) {
    guide.classList.add('open');
    document.getElementById('install-caret').textContent = '▾';
    guide.scrollIntoView({ behavior:'smooth', block:'nearest' });
  }
});

// ═══════════════════════════════════════════════════════════
// RESET
// ═══════════════════════════════════════════════════════════

document.getElementById('reset-btn').addEventListener('click', () => {
  if (!confirm('Reset everything and start a new profile? This cannot be undone.')) return;
  state = {
    profileName: 'My Character', playerString: '',
    firstName: '', lastName: '', title: '',
    race: '', class: '', age: '', height: '', weight: '', eyeColour: '', tagline: '',
    colour: 'ff7c0a', icon: 'Interface\\Icons\\INV_Misc_QuestionMark',
    currentlyStatus: 2, currentlyText: '',
    sliders: JSON.parse(JSON.stringify(DEFAULT_SLIDERS)),
    sections: JSON.parse(JSON.stringify(DEFAULT_SECTIONS)),
    additionalInfo: [],
    misc: '',
  };
  nextId = 100;
  saveState();
  populateForm();
  renderSliders();
  renderSections();
  renderAdditionalInfo();
  renderPreview();
  showTab('basics');
});

// ═══════════════════════════════════════════════════════════
// HELP MODAL
// ═══════════════════════════════════════════════════════════

function openHelp() {
  document.getElementById('help-modal').classList.add('visible');
}
function closeHelp() {
  document.getElementById('help-modal').classList.remove('visible');
  localStorage.setItem(HELP_KEY, '1');
}

document.getElementById('help-btn').addEventListener('click', openHelp);
document.getElementById('help-close-btn').addEventListener('click', closeHelp);
document.getElementById('help-modal').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeHelp();
});

// ═══════════════════════════════════════════════════════════
// INSTALL GUIDE
// ═══════════════════════════════════════════════════════════

document.getElementById('install-toggle').addEventListener('click', () => {
  const guide = document.getElementById('install-guide');
  const open  = guide.classList.toggle('open');
  document.getElementById('install-caret').textContent = open ? '▾' : '▸';
});

// ═══════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════

buildIconGrid();
buildImgPickerCats();
loadState();
populateForm();
bindBasics();
buildToolbar('misc-toolbar', 'f-misc');
renderSliders();
renderSections();
renderAdditionalInfo();
renderPreview();

if (!localStorage.getItem(HELP_KEY)) openHelp();
