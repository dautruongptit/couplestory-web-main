const fs = require('fs');
['Pricing.tsx', 'PricingMobile.tsx', 'TemplatesGallery.tsx'].forEach(f => {
  const p = 'src/pages/' + f;
  if(!fs.existsSync(p)) return;
  let c = fs.readFileSync(p, 'utf8');
  c = c.replace(/import { Link } from ['"]react-router-dom['"];\n/i, '');
  fs.writeFileSync(p, c);
});
