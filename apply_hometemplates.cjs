const fs = require('fs');
let c = fs.readFileSync('src/pages/HomeTemplates.tsx', 'utf8');

const newHeader = `<div className="flex items-center gap-1.5 text-xs text-[#8d7076] mb-3">
        <span className="hover:text-[#ff4d8d] cursor-pointer">Dashboard</span>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-[#ff4d8d] font-medium">Templates</span>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[28px] md:text-[34px] font-bold text-[#2e1220] mb-2 leading-tight tracking-tight">Choose a Template for Your Story ✨</h1>
          <p className="text-[14px] text-[#594046] max-w-[650px] leading-relaxed">
            Pick a romantic handcrafted design for your anniversary, wedding countdown, or sweet everyday love diary. Customizable in seconds with your favorite moments.
          </p>
        </div>
        
        <div className="hidden lg:flex items-center gap-3 bg-white/70 backdrop-blur-md px-4 py-2 rounded-full border border-rose-100 shadow-sm shrink-0">
          <div className="flex -space-x-2">
            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=A" className="w-8 h-8 rounded-full border-2 border-white bg-rose-100" alt="couple" />
            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=B" className="w-8 h-8 rounded-full border-2 border-white bg-blue-100" alt="couple" />
            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=C" className="w-8 h-8 rounded-full border-2 border-white bg-green-100" alt="couple" />
          </div>
          <div className="text-[12px] text-[#594046] font-medium leading-tight">
            <span className="text-[#b90a5a] font-bold">18,500+</span> couples<br/>celebrated
          </div>
        </div>
      </div>

      <div className="sticky top-14 sm:top-0 z-30 -mx-4 md:-mx-6 px-4 md:px-6 py-2 mb-8 bg-[#fff0f4]/95 backdrop-blur-md shadow-sm sm:shadow-none">
        <div className="bg-white/90 backdrop-blur-xl rounded-[24px] border border-white/50 shadow-[0_8px_30px_rgba(255,77,141,0.06)] p-3 md:p-4 flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
            <div className="flex-1 flex items-center gap-2.5 px-4 py-3 rounded-[16px] bg-[#fff5f8] border border-rose-50/50 focus-within:bg-white focus-within:shadow-sm focus-within:border-rose-100 transition-all">
              <span className="material-symbols-outlined text-[20px] text-[#b90a5a]/60">search</span>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Tìm kiếm mẫu theo tên hoặc phong cách (Polaroid, Retro, Minimalist)..."
                className="flex-1 bg-transparent outline-none text-[14px] text-[#2e1220] placeholder:text-[#8d7076]"
              />
              <button className="w-7 h-7 rounded-lg bg-rose-100/50 flex items-center justify-center text-rose-500 hover:bg-rose-100 transition-colors">
                <span className="material-symbols-outlined text-[16px]">tune</span>
              </button>
            </div>
            <div className="flex items-center gap-3 text-[14px]">
              <span className="text-[#594046] font-medium whitespace-nowrap">Sắp xếp:</span>
              <div className="relative">
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value as Sort)}
                  className="appearance-none pl-4 pr-10 py-3 rounded-[16px] bg-[#fff5f8] border border-rose-50/50 font-bold text-[#2e1220] outline-none cursor-pointer hover:bg-white transition-colors"
                >
                  <option value="popular">Phổ biến nhất 🔥</option>
                  <option value="newest">Mới nhất ✨</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[18px] text-[#b90a5a] pointer-events-none">expand_more</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <button className="px-5 py-2.5 rounded-full bg-[#ffe4ec] text-[#b90a5a] text-[13px] font-bold whitespace-nowrap shadow-sm border border-rose-100/50">Tất cả •</button>
            <button className="px-5 py-2.5 rounded-full bg-transparent hover:bg-white text-[#594046] text-[13px] font-medium whitespace-nowrap transition-colors">Love Story 📖</button>
            <button className="px-5 py-2.5 rounded-full bg-transparent hover:bg-white text-[#594046] text-[13px] font-medium whitespace-nowrap transition-colors">Wedding & RSVP 💍</button>
            <button className="px-5 py-2.5 rounded-full bg-transparent hover:bg-white text-[#594046] text-[13px] font-medium whitespace-nowrap transition-colors">Anniversary & Days ⏳</button>
            <button className="px-5 py-2.5 rounded-full bg-transparent hover:bg-white text-[#594046] text-[13px] font-medium whitespace-nowrap transition-colors">Valentine & Dating 💌</button>
          </div>
        </div>
      </div>`;

// Replace from `<div className="flex items-center gap-1.5 text-xs text-[#8d7076] mb-3">` to `</div>\n      </div>` right before grid.
c = c.replace(/<div className="flex items-center gap-1\.5 text-xs text-\[\#8d7076\] mb-3">.*?<\/div>\n\s*<\/div>/s, newHeader);

// Now for the Grid
const newGrid = `<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
        {items.map(t => {
          const image = t.previewImage || TEMPLATE_THUMBNAILS[t.code];
          const locked = !canUsePackage(user?.plan, t.package);
          return (
            <div key={t.code} className="group bg-white rounded-[32px] border border-[#fff0f4] shadow-[0_4px_20px_rgba(255,77,141,0.06)] hover:-translate-y-1 transition-transform duration-300 p-2 flex flex-col relative overflow-hidden">
              <Link to={\`/preview/\${t.code}\`} className="block relative aspect-[4/5] rounded-[24px] overflow-hidden bg-gray-100">
                {image ? (
                  <img src={image} alt={t.name} loading="lazy" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#ffe8ef] to-[#ffd6e6]">
                    <span className="material-symbols-outlined text-[48px] text-[#ff4d8d]/30">palette</span>
                  </div>
                )}
                
                {/* Dark gradient overlay at bottom for text contrast if needed */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent"></div>

                <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm shadow-sm flex items-center gap-1.5">
                  <span className={\`w-2 h-2 rounded-full \${t.package === 'FREE' ? 'bg-[#10b981]' : 'bg-[#a855f7]'}\`} />
                  <span className={\`text-[10px] font-bold tracking-widest uppercase \${t.package === 'FREE' ? 'text-[#059669]' : 'text-[#9333ea]'}\`}>
                    {t.package === 'FREE' ? 'FREE' : 'PREMIUM'}
                  </span>
                </div>
                
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center text-gray-400 hover:text-rose-500 transition-colors">
                  <span className="material-symbols-outlined text-[18px]">favorite_border</span>
                </div>
                
                {locked && (
                  <div className="absolute top-3 right-14 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-[16px]">lock</span>
                  </div>
                )}

                {/* Example overlay for "Playing song" or similar like the mockup */}
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                   <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-2 rounded-2xl border border-white/30 text-white shadow-sm">
                      <span className="material-symbols-outlined text-[20px]">play_circle</span>
                      <div className="flex flex-col">
                        <span className="text-[8px] opacity-80 font-medium">Playing song</span>
                        <span className="text-[10px] font-bold">Until I Found You</span>
                      </div>
                   </div>
                   <div className="bg-rose-500/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-white flex items-center gap-1 shadow-sm">
                      <span className="material-symbols-outlined text-[14px]">favorite</span>
                      <span className="text-[11px] font-bold">1.4k</span>
                   </div>
                </div>
              </Link>
              
              <div className="px-3 pt-5 pb-3 flex-1 flex flex-col">
                <div className="flex items-center justify-between text-[10px] font-bold tracking-widest uppercase mb-1.5">
                  <span className="text-[#ff4d8d]">{TYPE_LABEL[t.type] ?? t.type}</span>
                  <span className="flex items-center gap-1 text-[#8d7076]">
                    <span className="material-symbols-outlined text-[14px]">group</span>
                    {(t.usageCount ?? 0).toLocaleString('vi-VN')}
                  </span>
                </div>
                <h3 className="text-[20px] font-bold text-[#2e1220] leading-tight mb-2">{t.name}</h3>
                <p className="text-[13px] text-[#8d7076] line-clamp-2 mb-6 min-h-[40px] leading-relaxed">{t.description}</p>
                
                <div className="flex items-center gap-2 mt-auto">
                  <Link to={\`/preview/\${t.code}\`} className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-full bg-[#ffe4ec] text-[#b90a5a] font-bold text-[13px] hover:bg-[#ffcce0] transition-colors shadow-sm">
                    <span className="material-symbols-outlined text-[18px]">visibility</span>
                    Preview
                  </Link>
                  {locked ? (
                    <Link to="/home/upgrade" className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-full bg-gradient-to-r from-[#b5179e] to-[#7c3aed] text-white font-bold text-[13px] hover:opacity-90 transition-opacity shadow-sm">
                      <span className="material-symbols-outlined text-[18px]">lock</span>
                      Unlock Pro
                    </Link>
                  ) : (
                    <Link to={\`/home?applyTemplate=\${t.code}\`} className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-full bg-gradient-to-r from-[#a855f7] to-[#7c3aed] text-white font-bold text-[13px] hover:opacity-90 transition-opacity shadow-[0_4px_14px_rgba(168,85,247,0.35)]">
                      Use Template
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Banner Request Custom Design */}
      <div className="mt-8 mb-12 bg-gradient-to-r from-[#ffe4ec] to-[#fce7f3] rounded-[32px] p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm border border-white">
         <div className="flex items-center gap-5">
           <div className="w-14 h-14 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md shrink-0">
             <span className="material-symbols-outlined text-[28px]">design_services</span>
           </div>
           <div>
             <h3 className="text-xl font-bold text-[#2e1220] mb-1">Need a custom one-of-a-kind wedding or love story?</h3>
             <p className="text-sm text-[#594046]">Our romantic designers can illustrate custom stickers, 3D rings, and personalized love animations for your special day.</p>
           </div>
         </div>
         <button className="px-6 py-3.5 rounded-full bg-white text-[#b90a5a] font-bold text-[14px] shadow-sm hover:shadow-md transition-all whitespace-nowrap shrink-0">
           Request Custom Design ✨
         </button>
      </div>`;

c = c.replace(/<div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">.*?<\/div>\n\n\s*\{loading &&/s, newGrid + "\n\n      {loading &&");
fs.writeFileSync('src/pages/HomeTemplates.tsx', c, 'utf8');
