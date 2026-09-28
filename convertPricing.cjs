const fs = require('fs');
const path = require('path');
const HTMLtoJSX = require('htmltojsx');

const designDir = path.join(__dirname, '../Design');
const pagesDir = path.join(__dirname, 'src/pages');

const converter = new HTMLtoJSX({ createClass: false });

const PATH_MAP = {
  'trang-chu': '/', 'template': '/templates', 'kho-template': '/templates',
  'bang-gia': '/pricing', 'dang-nhap': '/login', 'dang-ky': '/register',
  'quen-mat-khau': '/forgot-password', 'dashboard': '/dashboard',
  'dashboard-upgrade': '/dashboard/upgrade', 'nang-cap': '/dashboard/upgrade',
  'checkout': '/checkout', 'thanh-toan': '/checkout',
  'story-eternal': '/s/eternal', 'story-minimal': '/s/minimal',
  'admin-users': '/admin/users', 'admin-revenue': '/admin/revenue',
  'gioi-thieu': '/#about', 'blog': '/#blog', 'tinh-nang': '/#features',
  'nhat-ky-doi': '/dashboard', 'demo': '/s/eternal',
};

function fixLinks(jsx) {
  return jsx
    .replace(/data-path="([^"]+)"\s+href="[^"]*"/g, (_, dp) => {
      const route = PATH_MAP[dp.trim()] || '#';
      return `data-path="${dp}" href="${route}"`;
    })
    .replace(/href="[^"]*"\s+data-path="([^"]+)"/g, (_, dp) => {
      const route = PATH_MAP[dp.trim()] || '#';
      return `href="${route}" data-path="${dp}"`;
    });
}

let html = fs.readFileSync(path.join(designDir, 'couplestory_b_ng_gi_mobile', 'code.html'), 'utf8');
const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
if (bodyMatch) html = bodyMatch[1];
html = html.replace(/<script[\s\S]*?<\/script>/ig, '');

let jsx = converter.convert(html);
jsx = jsx.replace(/onsubmit="[^"]*"/gi, 'onSubmit={(e) => e.preventDefault()}');
jsx = jsx.replace(/onclick="[^"]*"/gi, 'onClick={() => {}}');
jsx = jsx.replace(/onchange="[^"]*"/gi, 'onChange={() => {}}');
jsx = jsx.replace(/ crossOrigin(?!=)/gi, ' crossOrigin="anonymous"');
jsx = fixLinks(jsx);

fs.writeFileSync(path.join(pagesDir, 'PricingMobile.tsx'), 'import { Link } from "react-router-dom";\n\nexport default function PricingMobile() {\n  return (\n    <>\n' + jsx + '\n    </>\n  );\n}\n');
console.log('Done PricingMobile');
