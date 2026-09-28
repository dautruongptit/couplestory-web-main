const fs = require('fs');

['src/pages/Pricing.tsx', 'src/pages/PricingMobile.tsx'].forEach(file => {
  if (!fs.existsSync(file)) return;
  let c = fs.readFileSync(file, 'utf8');

  // Replace buttons href="#" to Checkout/Register
  c = c.replace(/<a([^>]*?)href="#"([^>]*?)>(\s*Bắt đầu ngay\s*)<\/a>/g, '<Link$1to="/register"$2>$3</Link>');
  c = c.replace(/<a([^>]*?)href="#"([^>]*?)>(\s*Mua gói Nâng Cao\s*)<\/a>/g, '<Link$1to="/checkout?plan=premium"$2>$3</Link>');
  c = c.replace(/<a([^>]*?)href="#"([^>]*?)>(\s*Liên hệ tư vấn\s*)<\/a>/g, '<Link$1to="/#contact"$2>$3</Link>');

  // Add Link import if needed
  if (c.includes('<Link') && !c.includes('import { Link }')) {
    c = c.replace(/import { Link } from ['"]react-router-dom['"];\n*/i, '');
    c = `import { Link } from 'react-router-dom';\n` + c;
  }

  fs.writeFileSync(file, c);
});
