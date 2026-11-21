// Every footnote marker resolves to a source entry and back, and every source entry is cited.
const { test, expect } = require('@playwright/test');

const pages = ['index.html', 'tim.html', 'vint.html', 'google.html'];
const all = [...pages, ...pages.map((p) => `en/${p}`)];

for (const file of all) {
  test(`${file} footnotes resolve both ways`, async ({ page }) => {
    await page.goto(file);
    const r = await page.evaluate(() => {
      const refs = [...document.querySelectorAll('a.fn-ref')];
      const entries = [...document.querySelectorAll('.sources li[id]')];
      const problems = [];
      for (const a of refs) {
        const id = a.getAttribute('href').slice(1);
        const li = document.getElementById(id);
        if (!li || !li.closest('.sources')) problems.push(`${a.id} -> missing ${id}`);
        else if (!li.querySelector(`a.fn-back[href="#${a.id}"]`)) problems.push(`${id} has no back link to ${a.id}`);
        if (!a.getAttribute('aria-label')) problems.push(`${a.id} lacks aria-label`);
      }
      for (const li of entries) {
        if (!refs.some((a) => a.getAttribute('href') === `#${li.id}`)) problems.push(`${li.id} never cited`);
        for (const b of li.querySelectorAll('a.fn-back')) {
          const t = document.getElementById(b.getAttribute('href').slice(1));
          if (!t || !t.classList.contains('fn-ref')) problems.push(`${li.id} back link ${b.getAttribute('href')} dangles`);
        }
        if (!li.querySelector('a[href*="web.archive.org"], a[href^="https://doi.org/"]')) problems.push(`${li.id} has neither an archive link nor a DOI`);
      }
      return { refs: refs.length, entries: entries.length, problems };
    });
    expect(r.refs).toBeGreaterThan(0);
    expect(r.entries).toBeGreaterThan(0);
    expect(r.problems).toEqual([]);
  });
}


for (const file of all) {
  test(`${file} has unique ids`, async ({ page }) => {
    await page.goto(file);
    const dupes = await page.evaluate(() => {
      const seen = new Map();
      for (const el of document.querySelectorAll('[id]')) seen.set(el.id, (seen.get(el.id) || 0) + 1);
      return [...seen].filter(([, n]) => n > 1).map(([id]) => id);
    });
    expect(dupes).toEqual([]);
  });
}

for (const file of pages) {
  test(`${file} and en/${file} cite the same sources the same number of times`, async ({ page }) => {
    const count = async (f) => {
      await page.goto(f);
      return page.evaluate(() => ({
        refs: [...document.querySelectorAll('a.fn-ref')].map((a) => a.getAttribute('href')),
        entries: document.querySelectorAll('.sources li[id]').length,
      }));
    };
    const sv = await count(file);
    const en = await count(`en/${file}`);
    expect(en.refs.length).toBe(sv.refs.length);
    expect(en.refs).toEqual(sv.refs);
    expect(en.entries).toBe(sv.entries);
  });
}
