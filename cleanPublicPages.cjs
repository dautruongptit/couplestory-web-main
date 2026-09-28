const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src/pages');
const pagesToClean = [
  'Home.tsx',
  'Pricing.tsx',
  'PricingMobile.tsx',
  'TemplatesGallery.tsx'
];

pagesToClean.forEach(file => {
  const filePath = path.join(pagesDir, file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  content = content.replace(/<header[\s\S]*?<\/header>/gi, '');
  content = content.replace(/<footer[\s\S]*?<\/footer>/gi, '');
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Removed header and footer from ${file}`);
});
