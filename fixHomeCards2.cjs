const fs = require('fs');
const file = 'src/pages/Home.tsx';
let c = fs.readFileSync(file, 'utf8');

c = c.replace(
  /<div className="hidden sm:block w-48 md:w-60 lg:w-64 transform -rotate-6 hover:-rotate-2 transition-transform duration-500 rounded-3xl bg-surface-container-lowest p-2.5 shadow-\[0_20px_40px_-10px_rgba\(61,31,45,0.15\)\] shrink-0">([\s\S]*?)<p className="font-body-sm text-body-sm text-surface-container-low truncate mt-1">Minh Quân &amp; Thảo Nhi<\/p>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/,
  '<Link to="/templates" className="hidden sm:block w-48 md:w-60 lg:w-64 transform -rotate-6 hover:-rotate-2 transition-transform duration-500 rounded-3xl bg-surface-container-lowest p-2.5 shadow-[0_20px_40px_-10px_rgba(61,31,45,0.15)] shrink-0 block">$1<p className="font-body-sm text-body-sm text-surface-container-low truncate mt-1">Minh Quân &amp; Thảo Nhi</p></div></div></div></Link>'
);

c = c.replace(
  /<div className="w-64 sm:w-72 md:w-80 lg:w-96 z-20 transform -translate-y-4 hover:-translate-y-6 transition-transform duration-500 rounded-\[2.5rem\] bg-surface-container-lowest p-3 shadow-\[0_30px_60px_-12px_rgba\(185,10,90,0.28\)\]">([\s\S]*?)<p className="font-headline-md text-headline-md text-white font-medium">Bảo Long &amp; An Nhiên<\/p>([\s\S]*?)<div className="grid grid-cols-4 gap-1 text-center divide-x divide-outline-variant\/30">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/,
  '<Link to="/s/eternal" className="w-64 sm:w-72 md:w-80 lg:w-96 z-20 transform -translate-y-4 hover:-translate-y-6 transition-transform duration-500 rounded-[2.5rem] bg-surface-container-lowest p-3 shadow-[0_30px_60px_-12px_rgba(185,10,90,0.28)] block">$1<p className="font-headline-md text-headline-md text-white font-medium">Bảo Long &amp; An Nhiên</p>$2<div className="grid grid-cols-4 gap-1 text-center divide-x divide-outline-variant/30">$3</div></div></div></div></Link>'
);

c = c.replace(
  /<div className="hidden sm:block w-48 md:w-60 lg:w-64 transform rotate-6 hover:rotate-2 transition-transform duration-500 rounded-3xl bg-surface-container-lowest p-2.5 shadow-\[0_20px_40px_-10px_rgba\(61,31,45,0.15\)\] shrink-0">([\s\S]*?)<p className="font-body-sm text-body-sm text-surface-container-low truncate mt-1">Đăng Khoa &amp; Thùy Trang<\/p>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/,
  '<Link to="/s/minimal" className="hidden sm:block w-48 md:w-60 lg:w-64 transform rotate-6 hover:rotate-2 transition-transform duration-500 rounded-3xl bg-surface-container-lowest p-2.5 shadow-[0_20px_40px_-10px_rgba(61,31,45,0.15)] shrink-0 block">$1<p className="font-body-sm text-body-sm text-surface-container-low truncate mt-1">Đăng Khoa &amp; Thùy Trang</p></div></div></div></Link>'
);

fs.writeFileSync(file, c);
