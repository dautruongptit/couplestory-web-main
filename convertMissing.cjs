const fs = require('fs');
const path = require('path');
const HTMLtoJSX = require('htmltojsx');

const designDir = path.join(__dirname, '../Design');
const pagesDir = path.join(__dirname, 'src/pages');
const componentsDir = path.join(__dirname, 'src/components/modals');

if (!fs.existsSync(componentsDir)) fs.mkdirSync(componentsDir, { recursive: true });

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
  'trung-tam-tro-giup': '/#help', 'huong-dan': '/#guide',
  'cau-hoi-thuong-gap': '/#faq', 'lien-he': '/#contact',
  'dieu-khoan': '/#terms', 'bao-mat': '/#privacy',
  'quyen-rieng-tu': '/#privacy', 'cookie': '/#cookie',
};

const converter = new HTMLtoJSX({ createClass: false });

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

function convertDir(dir, outFile, compName, outDir, isModal = false) {
  const codePath = path.join(designDir, dir, 'code.html');
  if (!fs.existsSync(codePath)) { console.warn(`[SKIP] ${dir}`); return; }

  let html = fs.readFileSync(codePath, 'utf8');
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) html = bodyMatch[1];
  html = html.replace(/<script[\s\S]*?<\/script>/ig, '');
  html = html.replace(/<!--[\s\S]*?-->/g, '');

  let jsx = converter.convert(html);
  jsx = jsx.replace(/onsubmit="[^"]*"/gi, 'onSubmit={(e) => e.preventDefault()}');
  jsx = jsx.replace(/onclick="[^"]*"/gi, 'onClick={() => {}}');
  jsx = jsx.replace(/onchange="[^"]*"/gi, 'onChange={() => {}}');
  jsx = jsx.replace(/ crossOrigin(?!=)/gi, ' crossOrigin="anonymous"');
  jsx = fixLinks(jsx);

  let component;
  if (isModal) {
    component = `import type { ReactNode } from 'react';\n\ninterface Props { onClose?: () => void; children?: ReactNode; }\n\nexport default function ${compName}({ onClose }: Props) {\n  return (\n    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>\n      <div className="relative max-w-2xl w-full mx-4" onClick={e => e.stopPropagation()}>\n${jsx}\n      </div>\n    </div>\n  );\n}\n`;
  } else {
    component = `export default function ${compName}() {\n  return (\n    <div className="min-h-screen">\n${jsx}\n    </div>\n  );\n}\n`;
  }

  fs.writeFileSync(path.join(outDir, outFile), component, { encoding: 'utf8' });
  console.log(`  [OK] ${outFile}`);
}

// DashboardUpgrade
convertDir('couplestory_dashboard_s_p_h_t_h_n_n_ng_c_p', 'DashboardUpgrade.tsx', 'DashboardUpgrade', pagesDir);

// ShareModal
convertDir('couplestory_modal_xu_t_b_n_chia_s_desktop', 'ShareModal.tsx', 'ShareModal', componentsDir, true);

// Mobile story templates → create as separate components (responsive)
const templatesMobile = [
  { dir: 'public_story_mobile_eternal_love',   out: 'TemplateEternalLoveMobile.tsx', name: 'TemplateEternalLoveMobile' },
  { dir: 'public_story_mobile_minimal_couple', out: 'TemplateMinimalCoupleMobile.tsx', name: 'TemplateMinimalCoupleMobile' },
];
const templatesDir = path.join(__dirname, 'src/templates');
templatesMobile.forEach(({ dir, out, name }) => convertDir(dir, out, name, templatesDir));

console.log('\n✅ Hoàn tất convert màn hình còn thiếu!');
