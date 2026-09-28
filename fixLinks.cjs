const fs = require('fs');
const path = require('path');

const dirs = [
  path.join(__dirname, 'src/pages'),
  path.join(__dirname, 'src/templates'),
];

// Files that already have manual Link imports (skip them)
const SKIP_FILES = new Set([
  'Login.tsx', 'Register.tsx', 'ForgotPassword.tsx', 'Account.tsx',
]);

let totalFixed = 0;

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(file => {
    if (!file.endsWith('.tsx')) return;
    if (SKIP_FILES.has(file)) return;

    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    let hasInternalLinks = false;

    // 1) Replace <a ... href="/internal-path" ...> with <Link ... to="/internal-path" ...>
    //    and </a> with </Link> for internal links only
    //    Internal = starts with "/" but NOT "http" or "mailto" or "//"
    
    // Match opening <a> tags with href pointing to internal routes
    const aTagRegex = /<a(\s[^>]*?)href="(\/[^"]*?)"([^>]*?)>/g;
    const newContent = content.replace(aTagRegex, (match, before, href, after) => {
      // Skip if it's an external link somehow
      if (href.startsWith('//') || href.startsWith('/http')) return match;
      hasInternalLinks = true;
      changed = true;
      // Replace href with to
      return `<Link${before}to="${href}"${after}>`;
    });

    if (changed) {
      content = newContent;
      
      // Replace corresponding </a> tags for Link elements
      // Strategy: find all <Link and replace the next </a> after each with </Link>
      // Simple approach: since we converted <a href="/..."> to <Link to="/...">,
      // we need to close them properly. 
      // We'll do a pass to match Link...>...</a> and replace </a> with </Link>
      
      let result = '';
      let insideLink = false;
      let depth = 0;
      let i = 0;
      
      while (i < content.length) {
        // Check for <Link
        if (content.substring(i, i + 5) === '<Link') {
          insideLink = true;
          depth++;
          result += '<Link';
          i += 5;
          continue;
        }
        
        // Check for </Link>
        if (content.substring(i, i + 7) === '</Link>') {
          depth--;
          if (depth <= 0) {
            insideLink = false;
            depth = 0;
          }
          result += '</Link>';
          i += 7;
          continue;
        }
        
        // Check for </a>
        if (content.substring(i, i + 4) === '</a>') {
          if (insideLink) {
            depth--;
            if (depth <= 0) {
              insideLink = false;
              depth = 0;
            }
            result += '</Link>';
            i += 4;
            continue;
          }
        }
        
        // Check for nested <a> inside Link (shouldn't happen but just in case)
        if (insideLink && content.substring(i, i + 2) === '<a' && content[i+2] && /[\s>]/.test(content[i+2])) {
          // Keep nested <a> as-is, increment depth so we don't close wrong
          depth++;
        }
        
        result += content[i];
        i++;
      }
      
      content = result;
    }

    // 2) Also convert <a href="#"> to <Link to="#">  (for anchor links within page)
    //    Actually, keep href="#" as <a> since they're non-navigating
    //    But convert <a ... data-path="xxx" href="/route" ...> patterns that might remain
    
    // 3) Add Link import if we have internal links
    if (hasInternalLinks) {
      // Check if file already imports Link
      if (!content.includes("from 'react-router-dom'")) {
        // Add import at the top of the file
        content = `import { Link } from 'react-router-dom';\n\n${content}`;
      } else if (!content.includes('Link')) {
        content = content.replace(
          /from 'react-router-dom'/,
          (match) => {
            return match; // Already has react-router-dom, would need more complex logic
          }
        );
        // Just add Link import separately
        content = `import { Link } from 'react-router-dom';\n${content}`;
      }
    }

    if (changed) {
      fs.writeFileSync(filePath, content, { encoding: 'utf8' });
      const linkCount = (content.match(/<Link /g) || []).length;
      console.log(`  [OK] ${file} — ${linkCount} internal links converted`);
      totalFixed++;
    } else {
      console.log(`  [--] ${file} — no internal <a> links found`);
    }
  });
});

console.log(`\n✅ ${totalFixed} files updated with React Router <Link>`);
