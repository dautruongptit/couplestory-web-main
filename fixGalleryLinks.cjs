const fs = require('fs');
const file = 'src/pages/TemplatesGallery.tsx';
let c = fs.readFileSync(file, 'utf8');

c = c.replace(/import { Link } from ['"]react-router-dom['"];\n*/i, '');
c = `import { Link } from 'react-router-dom';\n` + c;

let count = 0;
// Replace Xem Demo
c = c.replace(/<a([^>]*?)href="#"([^>]*?)>(\s*<span[^>]*>visibility<\/span>\s*Xem Demo\s*)<\/a>/g, (match, p1, p2, inner) => {
    count++;
    let route = count % 2 === 1 ? '/s/eternal' : '/s/minimal';
    return `<Link${p1}to="${route}"${p2}>${inner}</Link>`;
});

// Replace Dùng Mẫu Này to go to register
c = c.replace(/<a([^>]*?)href="#"([^>]*?)>(\s*Dùng Mẫu Này\s*)<\/a>/g, (match, p1, p2, inner) => {
    return `<Link${p1}to="/register"${p2}>${inner}</Link>`;
});

fs.writeFileSync(file, c);
console.log(`Replaced ${count} Xem Demo links`);
