import axios from "axios";
import { JSDOM } from "jsdom";

const channel = "https://t.me/s/addmeto";
const lastPostSelectorContent = "div:last-of-type > [data-post*='addmeto/'] [class*='text'] [href]";

const response = await axios.get(channel);


const DOM = new JSDOM(response.data);
const document = DOM.window.document;

const urlElement = document.querySelector(lastPostSelectorContent);
console.log(urlElement.textContent)




