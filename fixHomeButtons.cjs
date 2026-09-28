const fs = require('fs');
const file = 'src/pages/Home.tsx';
let c = fs.readFileSync(file, 'utf8');

c = c.replace(/<a([^>]*?)href="#"([^>]*?)>([\s\S]*?Bắt đầu[\s\S]*?)<\/a>/gi, '<Link$1to="/register"$2>$3</Link>');

fs.writeFileSync(file, c);
