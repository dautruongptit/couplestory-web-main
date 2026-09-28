const fs = require('fs');
const str = fs.readFileSync('src/pages/Home.tsx', 'utf8');
const idx = str.indexOf('Nam');
if(idx > -1) {
  console.log('Found:', str.substring(idx - 40, idx + 20));
}
const idx2 = str.indexOf('Trang');
if(idx2 > -1) {
  console.log('Found:', str.substring(idx2 - 10, idx2 + 20));
}
