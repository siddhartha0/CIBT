const puppeteer = require("puppeteer");

async function ScrapThat() {
  const url = "http://127.0.0.1:5500/Index.html/";
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  await page.screenshot({ path: "ex.png" });

  browser.close();
}

ScrapThat();
