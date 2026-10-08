const fs = require('fs');
let content = fs.readFileSync('src/pages/AccountMobile.tsx', 'utf8');

// The main card backgrounds were rounded-3xl, they are fine.
// The session cards should be rounded-2xl
content = content.replace(/className="bg-white rounded-full p-4/g, 'className="bg-white rounded-2xl p-4');
content = content.replace(/className="w-full bg-\[#fff5f8\] text-\[#2e1220\] px-4 py-3.5 rounded-full/g, 'className="w-full bg-[#fff5f8] text-[#2e1220] px-4 py-3.5 rounded-xl');
content = content.replace(/className="w-full bg-\[#fff5f8\] text-\[#594046\] px-4 py-3.5 rounded-full/g, 'className="w-full bg-[#fff5f8] text-[#594046] px-4 py-3.5 rounded-xl');

// The "Paired With" container
content = content.replace(/className="w-full bg-\[#fff5f8\] rounded-full p-4 flex/g, 'className="w-full bg-[#fff5f8] rounded-2xl p-4 flex');

fs.writeFileSync('src/pages/AccountMobile.tsx', content, 'utf8');
