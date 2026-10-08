const fs = require('fs');

let content = fs.readFileSync('src/pages/Dashboard.tsx', 'utf8');

const regex = /<article key=\{story\.id\}.*?<\/article>/s;

const newArticle = `<article key={story.id} className="relative bg-white rounded-[24px] p-4 shadow-[0_4px_20px_rgba(255,77,141,0.06)] border border-[#fff0f4] flex flex-col mt-4 group hover:-translate-y-1 transition-transform duration-300">
                    {/* Top Floating Badge */}
                    <div className={\`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-sm text-[10px] font-bold tracking-widest uppercase shadow-sm whitespace-nowrap \${isPublished ? 'bg-[#ffe4ec] text-[#b90a5a]' : 'bg-[#faebd7] text-[#8b4513]'}\`}>
                      {story.templateCode || (isPublished ? 'OUR JOURNEY' : 'DAILY MEMENTO')}
                    </div>

                    {/* Thumbnail */}
                    <div className="relative aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#ffe8ef] to-[#ffd6e6] overflow-hidden mb-4 border border-[#f0e4e8]/50">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[48px] text-[#ff4d8d]/30">image</span>
                      </div>
                      
                      {/* Top-Left Pill */}
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                        <span className={\`w-2 h-2 rounded-full \${isPublished ? 'bg-[#10b981]' : 'bg-[#f59e0b]'}\`} />
                        <span className="text-[11px] font-bold text-[#2e1220]">
                          {isPublished ? 'Published' : 'Draft'} • {days !== null && days > 0 ? \`\${days} days\` : (isPublished ? 'Just now' : '85% Completed')}
                        </span>
                      </div>

                      {/* Bottom-Right Pill */}
                      <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                        {isPublished ? (
                          <>
                            <span className="text-[12px]">💕</span>
                            <span className="text-[11px] font-bold text-[#2e1220]">{story.views || Math.floor(Math.random() * 500) + 100} views</span>
                          </>
                        ) : (
                          <>
                            <span className="material-symbols-outlined text-[14px] text-[#7c3aed]">photo_camera</span>
                            <span className="text-[11px] font-bold text-[#2e1220]">12 photos</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 px-1">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-bold text-[#2e1220] text-[18px] leading-tight line-clamp-2">
                          {story.coupleName1} &amp; {story.coupleName2}
                        </h3>
                        <span className={\`px-2 py-0.5 rounded text-[10px] font-bold uppercase shrink-0 \${isPublished ? 'bg-indigo-50 text-indigo-600' : 'bg-pink-50 text-pink-600'}\`}>
                          {isPublished ? 'Live' : 'Draft'}
                        </span>
                      </div>
                      <p className="text-[12px] text-[#594046] mb-3">
                        Dedicated to {story.coupleName2 || 'your partner'} • Last edited {new Date(story.updatedAt || story.createdAt || Date.now()).toLocaleDateString('vi-VN')}
                      </p>

                      {/* Dynamic Body */}
                      {!isPublished ? (
                        <div className="mt-1 mb-5">
                          <div className="flex justify-between text-[11px] font-bold mb-1.5">
                            <span className="text-[#594046]">Story Completion</span>
                            <span className="text-[#b90a5a]">85%</span>
                          </div>
                          <div className="w-full h-2 bg-[#fff0f4] rounded-full overflow-hidden">
                            <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-[#b90a5a] to-[#a855f7]"></div>
                          </div>
                        </div>
                      ) : (
                        <p className="text-[13px] text-[#8d7076] italic line-clamp-2 mb-5 leading-relaxed">
                          "Two full circles around the sun, counting every single laugh and cafe discovery..."
                        </p>
                      )}

                      {/* Actions */}
                      <div className="flex items-center justify-between mt-auto pt-2">
                        {isPublished ? (
                          <>
                            <div className="flex items-center gap-1.5">
                              <Link to={\`/editor/\${story.id}\`} className="w-9 h-9 rounded-full bg-[#fff0f4] text-[#594046] flex items-center justify-center hover:bg-[#ffe0eb] transition-colors" title="Edit">
                                <span className="material-symbols-outlined text-[16px]">edit</span>
                              </Link>
                              <Link to={\`/demo/\${story.id}\`} className="w-9 h-9 rounded-full bg-[#fff0f4] text-[#594046] flex items-center justify-center hover:bg-[#ffe0eb] transition-colors" title="Preview">
                                <span className="material-symbols-outlined text-[16px]">visibility</span>
                              </Link>
                              <button onClick={() => setDeleteTarget(story.id)} className="w-9 h-9 rounded-full bg-[#fff0f4] text-[#ba1a1a] flex items-center justify-center hover:bg-[#ffe0eb] transition-colors" title="Delete">
                                <span className="material-symbols-outlined text-[16px]">delete</span>
                              </button>
                            </div>
                            <Link to={\`/demo/\${story.id}\`} className="px-4 py-2.5 rounded-full bg-[#ffe0eb] text-[#b90a5a] font-bold text-[13px] flex items-center gap-1.5 hover:bg-[#ffcce0] transition-colors whitespace-nowrap">
                              View Sanctuary <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                            </Link>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center gap-1.5 text-[#8d7076] text-[11px] font-medium leading-tight">
                              <span className="material-symbols-outlined text-[16px]">schedule</span>
                              Saved 14m<br/>ago
                              <button onClick={() => setDeleteTarget(story.id)} className="ml-1 w-6 h-6 rounded-full bg-[#fef1f1] text-[#ba1a1a] flex items-center justify-center hover:bg-[#ffdad6] transition-colors" title="Delete">
                                <span className="material-symbols-outlined text-[13px]">delete</span>
                              </button>
                            </div>
                            <Link to={\`/editor/\${story.id}\`} className="px-5 py-2.5 rounded-full bg-[#b90a5a] text-white font-bold text-[13px] flex items-center gap-1.5 hover:opacity-90 transition-opacity whitespace-nowrap">
                              <span className="material-symbols-outlined text-[16px]">edit_note</span>
                              Continue Editing
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  </article>`;

content = content.replace(regex, newArticle);

fs.writeFileSync('src/pages/Dashboard.tsx', content, 'utf8');
