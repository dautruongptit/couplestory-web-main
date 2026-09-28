const fs = require('fs');
const buffer = fs.readFileSync('../Design/couplestory_trang_ch/code.html');
const str = buffer.toString('utf8');
const idx = str.indexOf('Nam');
if(idx > -1) {
  console.log('Found:', str.substring(idx - 40, idx + 20));
}
const idx2 = str.indexOf('Trang');
if(idx2 > -1) {
  console.log('Found:', str.substring(idx2 - 10, idx2 + 20));
}
