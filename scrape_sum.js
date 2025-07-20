name: Automated QA with Playwright

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  scrape-and-sum:
    name: Scrape QA with 24ds1000011@ds.study.iitm.ac.in
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: |
          npm install playwright
          npx playwright install --with-deps

      - name: Run scraping script
        run: node scrape_sum.js
