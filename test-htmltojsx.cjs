const HTMLtoJSX = require('htmltojsx');
const converter = new HTMLtoJSX({ createClass: false });
const out = converter.convert('<span>Trang chủ</span>');
console.log('Out:', out);
