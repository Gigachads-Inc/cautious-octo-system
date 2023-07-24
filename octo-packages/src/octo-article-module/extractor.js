import fs from "fs";
import { JSDOM } from "jsdom";


// Wrap over the class so it can pass the pure document that is ready to be scraped
const htmlPath = './content/article.html';

class Extractor {
  constructor() {
    this.document = null;
  }

  htmlPath = './content/article.html'; 

  async setup() {
    const sourceHTML = fs.readFileSync(htmlPath, 'utf8');
    const pattern = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/i;
    const HTML = sourceHTML.replace(pattern, "");
    const DOM = new JSDOM(HTML);
    this.document = DOM.window.document; 
  }

  async metaImage() {
    const pattern = /<meta\s+property="og:image"\s+content="(.+?)"/i;
    const match = HTML.match(pattern);
    const imageUrl = match && match[1];
    return imageUrl
  };

  async mainContent() {
    const paragraphs = document.querySelectorAll('p');
    for (let i = 0; i < paragraphs.length; i++) {
      let paragraph = paragraphs[i];
      let text = paragraph.textContent;
      console.log(text);
    }
  };

  async pageTitle() {
    return(document.title)
  };

};

