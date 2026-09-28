const fs = require('fs');
const str = fs.readFileSync('src/pages/Home.tsx', 'utf8');
console.log(str.substring(0, 1000));
