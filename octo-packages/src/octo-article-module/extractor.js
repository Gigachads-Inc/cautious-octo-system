import fs, { readdirSync } from "fs";
import { JSDOM } from "jsdom";


class HTMLProcessor{
  constructor() {
  }

  /**
   * A folder path that contains all fetched HTML pages of requested articles.
   */
  contentFolder = 'octo-packages/public'

  /**
   * @param {string} fileName HTML page filename.
   * Replaces any <script> elements with blank spaces, overwrites the existing HTML file.
   */
  removeScripts(fileName) {
    const scriptPattern = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
    const filePath = `${this.contentFolder}/${fileName}`;
  
    try {
      let HTMLContent = fs.readFileSync(filePath, 'utf-8');
      HTMLContent = HTMLContent.replace(scriptPattern, '');
      fs.writeFileSync(filePath, HTMLContent, 'utf-8');
    } catch (err) {
        throw err.message;
    }
  }

  async getMetaImage() {
    const ogImagePattern = /<meta\s+property="og:image"\s+content="(.+?)"/i;
    const match = this.HTML.match(ogImagePattern);
    const imageUrl = match && match[1];
    return imageUrl;
  };

  async getContent() {
    const paragraphs = this.document.querySelectorAll('p');
    for (let i = 0; i < paragraphs.length; i++) {
      let paragraph = paragraphs[i];
      let text = paragraph.textContent;
      return texx;
    }
  };

  async getPageTitle() {
    return this.document.title;
  };

  /**
   * Iterates over ../public folder in order to remove any <script> tags from the HTML pages.
   */
  prepareFiles() {
    try {
      const articles = readdirSync(this.contentFolder, 'utf-8', errorHandler => {
        if (errorHandler) {
          throw errorHandler.message
        }
      });
      for (const fileName of articles)
        this.removeScripts(fileName)
    } catch (err) {
      console.error(err);
    } 
  }   
};

const extractor = new HTMLProcessor()
extractor.prepareFiles()