import puppeteer, { executablePath } from "puppeteer";
import fs from "fs";

class TechCrunchCrawler{
  constructor() {
    this.page = null;
    this.browser = null;
  }

  /** 
   * A folder path where to save requested HTML pages.
   */
  location = 'octo-packages/public'
  
  /**
   * Chromium startup arguments
   */
  args = [
    "--headless=new",
    "--disable-background-timer-throttling",
    "--disable-backgrounding-occluded-windows",
    "--disable-ipc-flooding-protection",
    "--disable-renderer-backgrounding",
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-blink-features=AutomationControlled",
  ];

  /**
   * TechCrunch topic paths for easy navigation.
   */
  topics = {
    ai: '/category/artificial-intelligence/',
    crypto: '/category/cryptocurrency/',
    security: '/category/security/',
    startups: '/category/startups/',
  }

  articleSelector = 'article h2 a[href]';

  async open(path = "") {
    return this.page.goto(`https://techcrunch.com${path}`, {waitUntil: 'load'})
  }

  /**
   * Launches a new Chromium instance
   * Returns two instances to operate the browser
   */
  async launch() {
    this.browser = await puppeteer.launch({
      executablePath: executablePath(),
      args: this.args,
      defaultViewport: null,
      headless: true,
    });

    this.page = await this.browser.newPage();
  }

  async iterating() {
    for (let topic in this.topics) {
      await this.crawling(this.topics[topic], topic)
    }
    await this.browser.close()
  }

  /**
   * Opens a webpage by given URL query path. After entering saving
   * An HTML file of a page.
   * @param path URL address where to go
   * @param topic topic's title
   */
  async crawling(path, topic) {
    await this.open(path); 
    const html = await this.page.content();
    fs.writeFile(`${this.location}/${topic}.html`, html, (err) => {
      if (err) throw err;
    });
  };
};

async function run() {
  const techCrunchCrawler = new TechCrunchCrawler();
  await techCrunchCrawler.launch();
  await techCrunchCrawler.iterating();
}

run();