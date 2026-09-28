const fs = require('fs');

const designRaw = fs.readFileSync('../Design/romantic_modern_saas/DESIGN.md', 'utf8');

const colorsMatch = designRaw.match(/colors:\n([\s\S]*?)typography:/);
const typographyMatch = designRaw.match(/typography:\n([\s\S]*?)rounded:/);
const roundedMatch = designRaw.match(/rounded:\n([\s\S]*?)spacing:/);
const spacingMatch = designRaw.match(/spacing:\n([\s\S]*?)---/);

let css = `@import "tailwindcss";\n@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Dancing+Script:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');\n\n@theme {\n`;

const colors = colorsMatch[1].split('\n').filter(l => l.includes(':'));
colors.forEach(c => {
  let [name, val] = c.split(':').map(s => s.trim().replace(/['"]/g, ''));
  if(name) css += `  --color-${name}: ${val};\n`;
});

const spacings = spacingMatch[1].split('\n').filter(l => l.includes(':'));
spacings.forEach(c => {
  let [name, val] = c.split(':').map(s => s.trim().replace(/['"]/g, ''));
  if(name) css += `  --spacing-${name}: ${val};\n`;
});

const roundeds = roundedMatch[1].split('\n').filter(l => l.includes(':'));
roundeds.forEach(c => {
  let [name, val] = c.split(':').map(s => s.trim().replace(/['"]/g, ''));
  if(name) {
    if(name === 'DEFAULT') css += `  --radius: ${val};\n`;
    else css += `  --radius-${name}: ${val};\n`;
  }
});

css += `  --font-headline-xl: "Playfair Display", serif;\n`;
css += `  --font-headline-md: "Playfair Display", serif;\n`;
css += `  --font-body-lg: "DM Sans", sans-serif;\n`;
css += `  --font-label-md: "DM Sans", sans-serif;\n`;
css += `}\n\n`;

css += `@layer utilities {\n`;
const typoLines = typographyMatch[1].split('\n');
let currClass = '';
typoLines.forEach(l => {
  if (l.match(/^  [a-z0-9-]+:/)) {
    if(currClass) css += `  }\n`;
    currClass = l.trim().replace(':', '');
    css += `  .font-${currClass}, .text-${currClass} {\n`;
  } else if (l.trim() && currClass) {
    let [prop, val] = l.split(':').map(s => s.trim().replace(/['"]/g, ''));
    if(prop === 'fontFamily') {
       css += `    font-family: "${val}", ${val === 'Playfair Display' ? 'serif' : 'sans-serif'};\n`;
    } else if (prop === 'fontSize') {
       css += `    font-size: ${val};\n`;
    } else if (prop === 'fontWeight') {
       css += `    font-weight: ${val};\n`;
    } else if (prop === 'lineHeight') {
       css += `    line-height: ${val};\n`;
    } else if (prop === 'letterSpacing') {
       css += `    letter-spacing: ${val};\n`;
    }
  }
});
if(currClass) css += `  }\n`;
css += `}\n\n`;

css += `@layer base {
  body {
    background-color: var(--color-background);
    color: var(--color-on-background);
    font-family: var(--font-body-md);
  }
}\n`;

fs.writeFileSync('src/index.css', css);
