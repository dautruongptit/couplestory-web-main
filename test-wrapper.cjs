const fs = require('fs');
const HTMLtoJSX = require('htmltojsx');
const converter = new HTMLtoJSX({ createClass: false });
let html = fs.readFileSync('../Design/couplestory_trang_ch/code.html', 'utf8');
let match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
if (match) html = match[1];
html = html.replace(/<script[\s\S]*?<\/script>/ig, '');
html = html.replace(/<!--[\s\S]*?-->/g, '');
let jsx = converter.convert(html);

console.log(jsx.substring(800, 1000));
