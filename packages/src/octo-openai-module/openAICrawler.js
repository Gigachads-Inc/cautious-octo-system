import puppeteer, { executablePath } from "puppeteer";
import { sleep } from "../utils.js";

/**
 * Crawls through chat.openai.com and steals the session token. 🥷
 */
class openAICrawler{
  constructor() {
    this.page = null;
    this.browser = null;
  }
  
  args = [
    // Very important to have a new version of headless since it leaves nearly perfect browser fingerprint.
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
   * Launches a new Chromium instance
   * Returns two browser and page instances to operate the browser
   */
  async launch() {
    this.browser = await puppeteer.launch({
      executablePath: executablePath(),
      args: this.args,
      defaultViewport: null,
    });

    this.page = await this.browser.newPage();
  }

  /**
   * Opens a webpage by given URL query path. After entering saving
   * An HTML file of a page.
   * @param path URL address where to go
   * @param topic topic's title
   */
  async crawling(path) {
    await this.page.goto(path);
    await sleep(3000)
    await this.page.screenshot({path: "screenshot.png"})
  };
};

async function run() {
  const openAI = new openAICrawler();
  await openAI.launch();
  await openAI.crawling("https://chat.openai.com/"); 
}

run();