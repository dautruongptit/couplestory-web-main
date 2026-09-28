const fs = require('fs');
const file = 'src/pages/Dashboard.tsx';
let c = fs.readFileSync(file, 'utf8');

c = c.replace(/<a([^>]*?)href="#"([^>]*?)>(\s*<span[^>]*>public<\/span>\s*<span[^>]*>bao-long-an-nhien.couplestory.site<\/span>[\s\S]*?)<\/a>/g, '<Link$1to="/s/eternal"$2>$3</Link>');

c = c.replace(/<a([^>]*?)href="#"([^>]*?title="Xem trang web"[^>]*?)>([\s\S]*?)<\/a>/g, '<Link$1to="/s/eternal"$2>$3</Link>');

c = c.replace(/<a([^>]*?)href="#"([^>]*?)>(\s*<span[^>]*>public<\/span>\s*<span[^>]*>dalat-memories.couplestory.site<\/span>[\s\S]*?)<\/a>/g, '<Link$1to="/s/minimal"$2>$3</Link>');

c = c.replace(/<a([^>]*?)href="#"([^>]*?)>(\s*<span[^>]*>edit<\/span>[\s\S]*?)<\/a>/g, '<a$1href="#"$2>$3</a>'); // Do nothing for edit, it's just a mockup

c = c.replace(/<a([^>]*?)href="#"([^>]*?)>(\s*<span>Xem tất cả<\/span>[\s\S]*?)<\/a>/g, '<Link$1to="/dashboard"$2>$3</Link>');

fs.writeFileSync(file, c);
