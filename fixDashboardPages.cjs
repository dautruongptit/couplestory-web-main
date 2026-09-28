const fs = require('fs');
const path = require('path');
const HTMLtoJSX = require('htmltojsx');

const designDir = path.join(__dirname, '../Design');
const pagesDir = path.join(__dirname, 'src/pages');
const templatesDir = path.join(__dirname, 'src/templates');

// Map component info
const mapDirToComponent = {
  'couplestory_dashboard_qu_n_l':                                   { name: 'Dashboard',        type: 'page', isDashboard: true },
  'couplestory_dashboard_s_p_h_t_h_n_n_ng_c_p':                     { name: 'DashboardUpgrade', type: 'page', isDashboard: true },
  'couplestory_admin_qu_n_l_ng_i_d_ng_story':                       { name: 'AdminUsers',       type: 'page', isDashboard: true },
  'couplestory_admin_qu_n_l_g_i_c_c_doanh_thu':                    { name: 'AdminRevenue',     type: 'page', isDashboard: true },
};

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

Object.entries(mapDirToComponent).forEach(([dir, info]) => {
  const codePath = path.join(designDir, dir, 'code.html');
  if (!fs.existsSync(codePath)) return;

  let html = fs.readFileSync(codePath, 'utf8');

  // Strip aside and header for dashboard layout pages
  if (info.isDashboard) {
    html = html.replace(/<aside[\s\S]*?<\/aside>/i, '');
    html = html.replace(/<header[\s\S]*?<\/header>/i, '');
    html = html.replace(/<div class="pl-\[250px\]">([\s\S]*?)<\/div>\s*<\/body>/i, '$1</body>');
  }

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

  const { name: compName } = info;
  const component = `import { Link } from 'react-router-dom';\n\nexport default function ${compName}() {\n  return (\n    <>\n${jsx}\n    </>\n  );\n}\n`;
  fs.writeFileSync(path.join(pagesDir, `${compName}.tsx`), component, { encoding: 'utf8' });
  console.log(`Re-converted ${compName}.tsx without layout elements`);
});
