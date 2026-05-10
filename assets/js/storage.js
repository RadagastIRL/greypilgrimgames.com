/**
 * storage.js — Grey Pilgrim Games data persistence abstraction
 *
 * Today this is a thin wrapper around localStorage.
 *
 * When server-side persistence is ready (Dreamhost PHP or a REST API),
 * only the three private helpers (_load, _save, _remove) need to change —
 * the rest of the app code stays identical.
 *
 * Suggested future API endpoints (PHP on Dreamhost):
 *   GET  /api/storage.php?key=<key>            → { value: <json> }
 *   POST /api/storage.php { key, value }        → { ok: true }
 *   DELETE /api/storage.php?key=<key>           → { ok: true }
 *
 * All keys are automatically namespaced with the 'gpg:' prefix so they
 * never collide with browser extensions or third-party scripts.
 */
const GPGStorage = (() => {
  const NS = 'gpg:';

  // ── Storage back-end (swap these three to move to server-side) ──────────

  function _load(namespacedKey) {
    return localStorage.getItem(namespacedKey);
  }

  function _save(namespacedKey, serialised) {
    localStorage.setItem(namespacedKey, serialised);
  }

  function _remove(namespacedKey) {
    localStorage.removeItem(namespacedKey);
  }

  // ────────────────────────────────────────────────────────────────────────

  return {
    /**
     * Read a value. Returns `fallback` (default null) if the key is absent.
     * Values are always stored as JSON strings internally.
     */
    get(key, fallback = null) {
      const raw = _load(NS + key);
      if (raw === null) return fallback;
      try { return JSON.parse(raw); } catch { return raw; }
    },

    /**
     * Write a value. Objects/arrays are JSON-serialised automatically.
     */
    set(key, value) {
      _save(NS + key, typeof value === 'string' ? value : JSON.stringify(value));
    },

    /** Delete a single key. */
    remove(key) {
      _remove(NS + key);
    },

    /**
     * Delete all keys that start with the given prefix.
     * Useful for clearing all data for one app (e.g. GPGStorage.clearAll('trp3:')).
     */
    clearAll(prefix = '') {
      const target = NS + prefix;
      Object.keys(localStorage)
        .filter(k => k.startsWith(target))
        .forEach(k => localStorage.removeItem(k));
    },
  };
})();
