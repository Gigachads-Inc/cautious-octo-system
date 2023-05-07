import fs from "fs";
import { JSDOM } from "jsdom";

const htmlPath = './content/article.html';

const sourceHTML = fs.readFileSync(htmlPath, 'utf8');
const scriptRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

const HTML = sourceHTML.replace(scriptRegex, "");
const DOM = new JSDOM(HTML);

const document = DOM.window.document;

const paragraphs = document.querySelectorAll('p');

class Extractor {
  constructor() {
    this.document = null;
    this.DOM = null;
  }

  async Setup() {
    
  }

  async Stripping() {

  }

  async MetaImage() {
    const pattern = /<meta\s+property="og:image"\s+content="(.+?)"/i;
    const match = HTML.match(pattern);
    const imageUrl = match && match[1];
    return imageUrl
  };

  async Content() {
    for (let i = 0; i < paragraphs.length; i++) {
      let paragraph = paragraphs[i];
      let text = paragraph.textContent;
      console.log(text);
    }
  };

  async Title() {
    return(document.title)
  };

};

