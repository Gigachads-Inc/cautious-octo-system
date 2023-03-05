import puppeteer from "puppeteer";
import fs from "fs";

function getBrowser() {
  const args = [
    "--disable-background-timer-throttling",
    "--disable-backgrounding-occluded-windows",
    "--disable-ipc-flooding-protection",
    "--disable-renderer-backgrounding",
    "--no-sandbox",
    "--disable-blink-features=AutomationControlled",
  ];

  return puppeteer.launch({
    args,
    defaultViewport: null,
    headless: false,
  });
}

async function getArticle() {
    const browser = await getBrowser();
    const page = await browser.goto();
  
    await page.goto('https://example.com/', {waitUntil: 'load'});
    const html = await page.content();
  
    fs.writeFile('articleToParse.html', html, (err) => {
      if (err) throw err;
    });

    await browser.close()
  };

getArticle();
