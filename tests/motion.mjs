// Motion button check in a reduced-motion browser: motion stays on by default.
// Run: serve the repo on :8732 (python3 -m http.server 8732), then
// PLAYWRIGHT=<path to playwright/index.mjs> CHROME_PATH=<chrome> node tests/motion.mjs
const { chromium } = await import(process.env.PLAYWRIGHT || 'playwright');
const assert = (ok, msg) => { if (!ok) { console.error('FAIL', msg); process.exitCode = 1; } else console.log('ok', msg); };
const b = await chromium.launch({ executablePath: process.env.CHROME_PATH });
const ctx = await b.newContext({ reducedMotion: 'reduce' });
const p = await ctx.newPage();
const U = process.env.URL || 'http://localhost:8732/vint.html';
const state = () => p.evaluate(() => [document.documentElement.dataset.motion,
  document.querySelector('#pk-steps').checked ? 'steps' : 'animated']);
await p.goto(U);
let [m, a] = await state();
assert(m === 'on' && a === 'animated', 'animated by default, even when the OS asks for reduced motion');
await p.click('.motion-toggle');
[m, a] = await state();
assert(m === 'off' && a === 'steps', 'still after the button');
await p.reload();
[m, a] = await state();
assert(m === 'off' && a === 'steps', 'choice survives reload');
await b.close();
