const { chromium } = require('playwright');

const seeds = Array.from({ length: 10 }, (_, i) => 38 + i);
const baseURL = "https://sanand0.github.io/tdsdata/js_table/?seed=";

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let grandTotal = 0;

  for (const seed of seeds) {
    const url = `${baseURL}${seed}`;
    await page.goto(url);
    const numbers = await page.$$eval('table td', tds =>
      tds.map(td => parseFloat(td.textContent)).filter(n => !isNaN(n))
    );
    const pageSum = numbers.reduce((acc, val) => acc + val, 0);
    console.log(`Seed ${seed} sum: ${pageSum}`);
    grandTotal += pageSum;
  }

  console.log(`✅ Grand Total of all seeds: ${grandTotal}`);
  await browser.close();
})();
