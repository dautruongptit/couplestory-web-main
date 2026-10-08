const fs = require('fs');
let c = fs.readFileSync('src/pages/StoryEditor.tsx', 'utf8');

// Top publish button
c = c.replace(
  /onClick=\{async \(\) => \{ if \(await handleSave\(\)\) navigate\(`\/editor\/\$\{scenarioId\}\/preview`\); \}\}\s+className="flex items-center gap-1\.5 px-4 py-1\.5 rounded-full bg-rose-500/,
  `onClick={async () => { if (await handleSave(true)) navigate(\`/editor/\${scenarioId}/published\`); }}\n              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-500`
);

// Bottom publish button
c = c.replace(
  /onClick=\{handleSave\} className="flex-1 py-2 rounded-xl bg-rose-500 text-white text-xs/,
  `onClick={async () => { if (await handleSave(true)) navigate(\`/editor/\${scenarioId}/published\`); }} className="flex-1 py-2 rounded-xl bg-rose-500 text-white text-xs`
);

fs.writeFileSync('src/pages/StoryEditor.tsx', c, 'utf8');
