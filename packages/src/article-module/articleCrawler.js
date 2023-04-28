import puppeteer, { executablePath } from "puppeteer";
import fs from "fs";

function getBrowser() {
  const args = [
    "--disable-background-timer-throttling",
    "--disable-backgrounding-occluded-windows",
    "--disable-ipc-flooding-protection",
    "--disable-renderer-backgrounding",
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-blink-features=AutomationControlled",
  ];

  return puppeteer.launch({
    executablePath: executablePath(),
    args,
    defaultViewport: null,
    headless: true,
  });
}

async function getArticle() {
    const browser = await getBrowser();
    const page = await browser.newPage();
  
    await page.goto("https://techcrunch.com/2023/04/27/muslims-come-into-the-frame-in-southeast-asias-fintech-boom/", {waitUntil: 'load'});
    const html = await page.content();
  
    fs.writeFile('./content/article.html', html, (err) => {
      if (err) throw err;
    });

    await browser.close()
  };

getArticle();
