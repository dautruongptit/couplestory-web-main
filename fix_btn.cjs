const fs = require('fs');
let content = fs.readFileSync('src/pages/AccountMobile.tsx', 'utf8');

// Replace Save Changes button
content = content.replace(/className="w-full bg-\[#ff4d8d\] text-white py-3\.5 rounded-full font-bold text-\[15px\]/g, 'className="w-full bg-[#ff4d8d] text-white py-2.5 rounded-full font-bold text-[13px]');
content = content.replace(/className="w-full bg-\[#ff4d8d\] text-white py-3\.5 rounded-2xl font-bold text-\[15px\]/g, 'className="w-full bg-[#ff4d8d] text-white py-2.5 rounded-full font-bold text-[13px]');

// Replace Logout button
content = content.replace(/className="w-full bg-\[#f4ebee\] text-\[#594046\] py-3\.5 rounded-full font-bold text-\[14px\]/g, 'className="w-full bg-[#f4ebee] text-[#594046] py-2.5 rounded-full font-bold text-[13px]');
content = content.replace(/className="w-full bg-\[#f4ebee\] text-\[#594046\] py-3\.5 rounded-2xl font-bold text-\[14px\]/g, 'className="w-full bg-[#f4ebee] text-[#594046] py-2.5 rounded-full font-bold text-[13px]');

fs.writeFileSync('src/pages/AccountMobile.tsx', content, 'utf8');
