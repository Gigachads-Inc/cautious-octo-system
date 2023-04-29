import puppeteer, { executablePath } from "puppeteer";
import fs from "fs";

class HeadlessCrawler {
  constructor() {
    this.page = null;
    this.browser = null;
  }

  args = [
    "--disable-background-timer-throttling",
    "--disable-backgrounding-occluded-windows",
    "--disable-ipc-flooding-protection",
    "--disable-renderer-backgrounding",
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-blink-features=AutomationControlled",
  ];

  techCrunchTopic = {
    TechCrunchAI: 'https://techcrunch.com/category/artificial-intelligence/',
    TechCrunchCrypto: 'https://techcrunch.com/category/cryptocurrency/',
    TechCrunchSecurity: 'https://techcrunch.com/category/security/',
    TechCrunchStartups: 'https://techcrunch.com/category/startups/',
  }

  async launch() {
    this.browser = await puppeteer.launch({
      executablePath: executablePath(),
      args,
      defaultViewport: null,
      headless: true,
    });

    this.page = await puppeteer.newPage();
  }

  async articleCrawler() {
    await this.page.goto("https://techcrunch.com/2023/04/27/muslims-come-into-the-frame-in-southeast-asias-fintech-boom/", {waitUntil: 'load'});
    const html = await page.content();
  
    fs.writeFile('./content/article.html', html, (err) => {
      if (err) throw err;
    });

    await browser.close()
  };
}