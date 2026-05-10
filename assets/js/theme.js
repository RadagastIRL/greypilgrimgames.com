/**
 * theme.js — Grey Pilgrim Games theme toggle
 *
 * Reads/writes the 'gpg-theme' key in localStorage.
 * Handles pages that use either #theme-bar (ID) or .theme-bar (class).
 * Falls back to the data-theme attribute already on <html> (lets each page
 * specify its own sensible default without hard-coding it here).
 */
(function () {
  const KEY = 'gpg-theme';

  // One-time migration from the old per-page key
  if (!localStorage.getItem(KEY)) {
    const legacy = localStorage.getItem('gpg-wow-theme');
    if (legacy) localStorage.setItem(KEY, legacy);
  }

  const buttons = document.querySelectorAll('#theme-bar button, .theme-bar button');
  const htmlDefault = document.documentElement.dataset.theme || 'light';

  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(KEY, theme);
    buttons.forEach(b => b.classList.toggle('active', b.dataset.theme === theme));
  }

  buttons.forEach(btn =>
    btn.addEventListener('click', () => setTheme(btn.dataset.theme))
  );

  setTheme(localStorage.getItem(KEY) || htmlDefault);
}());
