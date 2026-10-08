const fs = require('fs');
let content = fs.readFileSync('src/pages/AccountMobile.tsx', 'utf8');

// 1. Remove the Tabs header
content = content.replace(/\{\/\* Tabs \*\/\}\s*<div className="flex gap-3 px-4 pb-4 overflow-x-auto scrollbar-hide shrink-0">[\s\S]*?<\/div>/, '');

// 2. Remove the hidden toggles so everything is shown
content = content.replace(/className=\{`flex flex-col gap-6 \$\{activeTab === 'account' \? 'block' : 'hidden'\}`\}/g, 'className="flex flex-col gap-6"');
content = content.replace(/className=\{`\$\{activeTab === 'general' \? 'block' : 'hidden'\}`\}/g, 'className="block"');

// 3. Make the buttons smaller
// Save Changes button
content = content.replace(/py-3 rounded-full font-bold text-\[14px\]/g, 'py-2.5 rounded-full font-bold text-[13px]');

// 4. Make input fields smaller
content = content.replace(/px-4 py-3\.5 rounded-xl text-\[14px\]/g, 'px-3 py-2.5 rounded-xl text-[13px]');

// 5. Shrink some internal paddings if needed.
// Profile Space Card padding
content = content.replace(/p-5 shadow-\[0_4px_20px_rgba\(255,77,141,0\.05\)\]/g, 'p-4 pt-6 shadow-[0_4px_20px_rgba(255,77,141,0.05)]');

fs.writeFileSync('src/pages/AccountMobile.tsx', content, 'utf8');
