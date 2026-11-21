// Motion button. Motion is on unless the visitor turns it off; the choice is kept
// in localStorage. The result lives on <html data-motion="on|off"> for CSS and
// scripts, and a "motionchange" event tells scripts when it flips. Loaded in
// <head>, so the attribute is set before first paint.
(() => {
  const KEY = 'motion';
  // UI strings: Swedish defaults, overridden by window.WP_I18N.motion.
  const T = Object.assign({ pause: 'Pausa rörelse', play: 'Starta rörelse' }, (window.WP_I18N || {}).motion);
  const root = document.documentElement;
  const stored = () => {
    try { return localStorage.getItem(KEY); } catch { return null; }
  };
  const apply = () => {
    root.dataset.motion = stored() === 'off' ? 'off' : 'on';
    document.dispatchEvent(new CustomEvent('motionchange', { detail: root.dataset.motion }));
  };
  apply();

  let button;
  function render() {
    if (!button) return;
    const on = root.dataset.motion === 'on';
    const label = on ? T.pause : T.play;
    button.setAttribute('aria-pressed', String(on));
    button.setAttribute('aria-label', label);
    button.title = label;
  }

  function set(value) {
    try { localStorage.setItem(KEY, value); } catch { /* private mode */ }
    apply();
    render();
  }

  function build() {
    button = document.querySelector('.motion-toggle');
    if (!button) return;
    button.addEventListener('click', () => set(root.dataset.motion === 'on' ? 'off' : 'on'));
    render();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();
