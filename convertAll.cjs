const fs = require('fs');
const path = require('path');
const HTMLtoJSX = require('htmltojsx');

const designDir = path.join(__dirname, '../Design');
const pagesDir = path.join(__dirname, 'src/pages');
const templatesDir = path.join(__dirname, 'src/templates');

if (!fs.existsSync(templatesDir)) fs.mkdirSync(templatesDir, { recursive: true });

// Map data-path → React Router path
const PATH_MAP = {
  'trang-chu':          '/',
  'template':           '/templates',
  'kho-template':       '/templates',
  'bang-gia':           '/pricing',
  'dang-nhap':          '/login',
  'dang-ky':            '/register',
  'quen-mat-khau':      '/forgot-password',
  'dashboard':          '/dashboard',
  'checkout':           '/checkout',
  'thanh-toan':         '/checkout',
  'story-eternal':      '/s/eternal',
  'story-minimal':      '/s/minimal',
  'admin-users':        '/admin/users',
  'admin-revenue':      '/admin/revenue',
  'gioi-thieu':         '/#about',
  'blog':               '/#blog',
  'tinh-nang':          '/#features',
  'nhat-ky-doi':        '/dashboard',
  'trung-tam-tro-giup': '/#help',
  'huong-dan':          '/#guide',
  'cau-hoi-thuong-gap': '/#faq',
  'lien-he':            '/#contact',
  'dieu-khoan':         '/#terms',
  'bao-mat':            '/#privacy',
  'quyen-rieng-tu':     '/#privacy',
  'cookie':             '/#cookie',
  'demo':               '/s/eternal',
};

// Map component info
const mapDirToComponent = {
  'couplestory_trang_ch':                                           { name: 'Home',             type: 'page' },
  'couplestory_ng_nh_p':                                            { name: 'Login',            type: 'page' },
  'couplestory_ng_k_t_i_kho_n':                                     { name: 'Register',         type: 'page' },
  'couplestory_qu_n_m_t_kh_u':                                      { name: 'ForgotPassword',   type: 'page' },
  'couplestory_b_ng_gi_d_ch_v':                                     { name: 'Pricing',          type: 'page' },
  'couplestory_kho_template_giao_di_n':                             { name: 'TemplatesGallery', type: 'page' },
  'couplestory_dashboard_qu_n_l':                                   { name: 'Dashboard',        type: 'page' },
  'couplestory_thanh_to_n_k_ch_ho_t_g_i_d_ch_v_checkout':          { name: 'Checkout',         type: 'page' },
  'couplestory_thanh_to_n_th_nh_c_ng_k_ch_ho_t_k_ni_m_success':    { name: 'CheckoutSuccess',  type: 'page' },
  'couplestory_admin_qu_n_l_ng_i_d_ng_story':                       { name: 'AdminUsers',       type: 'page' },
  'couplestory_admin_qu_n_l_g_i_c_c_doanh_thu':                    { name: 'AdminRevenue',     type: 'page' },
  'couplestory_403_forbidden_admin_access_restricted':              { name: 'Forbidden403',     type: 'page' },
  'couplestory_kh_ng_t_m_th_y_trang_404':                           { name: 'NotFound404',      type: 'page' },
  'public_story_eternal_love_template':                             { name: 'TemplateEternalLove',   type: 'template' },
  'public_story_minimal_couple_template':                           { name: 'TemplateMinimalCouple', type: 'template' },
};

const converter = new HTMLtoJSX({ createClass: false });

// Replace data-path hrefs with real routes
function fixLinks(jsx) {
  // Replace href="#" on elements with data-path attribute → proper path
  return jsx.replace(/data-path="([^"]+)"\s+href="[^"]*"/g, (match, dataPaths) => {
    const key = dataPaths.trim();
    const route = PATH_MAP[key] || '#';
    return `data-path="${key}" href="${route}"`;
  }).replace(/href="[^"]*"\s+data-path="([^"]+)"/g, (match, dataPaths) => {
    const key = dataPaths.trim();
    const route = PATH_MAP[key] || '#';
    return `href="${route}" data-path="${key}"`;
  });
}

let successCount = 0;

Object.entries(mapDirToComponent).forEach(([dir, info]) => {
  const codePath = path.join(designDir, dir, 'code.html');
  if (!fs.existsSync(codePath)) {
    console.warn(`  [SKIP] ${dir}`);
    return;
  }

  let html = fs.readFileSync(codePath, 'utf8');

  // Extract body
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) html = bodyMatch[1];

  // Remove scripts and comments
  html = html.replace(/<script[\s\S]*?<\/script>/ig, '');
  html = html.replace(/<!--[\s\S]*?-->/g, '');

  // Convert HTML → JSX
  let jsx = converter.convert(html);

  // Fix event handlers (all case variants)
  jsx = jsx.replace(/onsubmit="[^"]*"/gi, 'onSubmit={(e) => e.preventDefault()}');
  jsx = jsx.replace(/onclick="[^"]*"/gi, 'onClick={() => {}}');
  jsx = jsx.replace(/onchange="[^"]*"/gi, 'onChange={() => {}}');
  jsx = jsx.replace(/onfocus="[^"]*"/gi, 'onFocus={() => {}}');
  jsx = jsx.replace(/onblur="[^"]*"/gi, 'onBlur={() => {}}');
  jsx = jsx.replace(/oninput="[^"]*"/gi, 'onInput={() => {}}');

  // Fix crossOrigin
  jsx = jsx.replace(/ crossOrigin(?!=)/gi, ' crossOrigin="anonymous"');

  // Fix navigation links based on data-path
  jsx = fixLinks(jsx);

  const { name: compName, type } = info;
  const outDir = type === 'page' ? pagesDir : templatesDir;

  const component = `export default function ${compName}() {\n  return (\n    <div className="min-h-screen">\n${jsx}\n    </div>\n  );\n}\n`;
  fs.writeFileSync(path.join(outDir, `${compName}.tsx`), component, { encoding: 'utf8' });
  console.log(`  [OK] ${compName}.tsx`);
  successCount++;
});

console.log(`\n✅ Hoàn tất: ${successCount}/${Object.keys(mapDirToComponent).length} file`);
