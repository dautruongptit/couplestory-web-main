const fs = require('fs');
const HTMLtoJSX = require('htmltojsx');

function convert(htmlFile, outFile, componentName) {
  let html = fs.readFileSync(htmlFile, 'utf8');

  // Extract body content
  let match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (match) {
    html = match[1];
  }

  // Remove <script> tags
  html = html.replace(/<script[\s\S]*?<\/script>/ig, '');
  // Remove comments
  html = html.replace(/<!--[\s\S]*?-->/g, '');

  const converter = new HTMLtoJSX({ createClass: false });
  let jsx = converter.convert(html);

  const component = `import { Link } from 'react-router-dom';\n\nexport default function ${componentName}() {\n  return (\n    <>\n${jsx}\n    </>\n  );\n}\n`;
  fs.writeFileSync(outFile, component);
}

convert('../Design/couplestory_trang_ch/code.html', 'src/pages/Home.tsx', 'Home');
convert('../Design/couplestory_ng_nh_p/code.html', 'src/pages/Login.tsx', 'Login');
