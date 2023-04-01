import fs from "fs";
import { JSDOM } from "jsdom";

const htmlPath = './content/article.html';

const sourceHTML = fs.readFileSync(htmlPath, 'utf8');
const scriptRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

const HTML = sourceHTML.replace(scriptRegex, "");
const DOM = new JSDOM(HTML);

const document = DOM.window.document;

const paragraphs = document.querySelectorAll('p');

async function getMetaImage() {
  const pattern = /<meta\s+property="og:image"\s+content="(.+?)"/i;
  const match = HTML.match(pattern);
  const imageUrl = match && match[1];
  console.log(imageUrl); 
};

async function getContent() {
  for (let i = 0; i < paragraphs.length; i++) {
    let paragraph = paragraphs[i];
    let text = paragraph.textContent;
    console.log(text);
  }
};

async function getTitle() {
    return document.title
};