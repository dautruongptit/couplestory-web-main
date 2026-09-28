const fs = require('fs');
const file = 'src/pages/TemplatesGallery.tsx';
let c = fs.readFileSync(file, 'utf8');

c = c.replace(/<a([^>]*?)href="#"([^>]*?)>(\s*Gửi yêu cầu tùy chỉnh 1-1\s*)<\/a>/g, '<Link$1to="/#contact"$2>$3</Link>');
c = c.replace(/<a([^>]*?)href="#"([^>]*?)>(\s*Trò chuyện với Designer\s*)<\/a>/g, '<Link$1to="/#contact"$2>$3</Link>');

fs.writeFileSync(file, c);
