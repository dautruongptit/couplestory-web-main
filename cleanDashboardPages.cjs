const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src/pages');
const pagesToClean = [
  'Dashboard.tsx',
  'DashboardUpgrade.tsx',
  'AdminUsers.tsx',
  'AdminRevenue.tsx'
];

pagesToClean.forEach(file => {
  const filePath = path.join(pagesDir, file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 1. Remove <aside>...</aside> completely
  content = content.replace(/<aside[\s\S]*?<\/aside>/i, '');
  
  // 2. Remove <header>...</header> completely
  content = content.replace(/<header[\s\S]*?<\/header>/i, '');
  
  // 3. The content is inside <div className="pl-[250px]"> or similar.
  // Actually, we can just replace `<div className="pl-[250px]"><main...`
  // with just `<main...` (and remove the closing </div>)
  
  // A simpler way: we just strip <div className="pl-[250px]"> and its matching closing tag if we can,
  // or we leave it. Let's look at how it's structured.
  content = content.replace(/<div className="pl-\[250px\]">/i, '');
  
  // Now we have one extra closing </div> before the final </div> of the component.
  // The component usually ends with:
  //    </div>
  //  );
  // }
  // So if we remove one </div> at the end.
  content = content.replace(/<\/div>\s*<\/div>\s*\);\s*}\s*$/, '</div>\n  );\n}\n');
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Cleaned layout elements from ${file}`);
});
