// Static check of nginx.conf (no nginx binary needed). Run: node scripts/check-nginx-conf.mjs
// nginx drops every inherited add_header in a location that declares its own add_header, so the
// check also verifies the security headers are repeated there.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const path = fileURLToPath(new URL('../nginx.conf', import.meta.url));
const conf = readFileSync(path, 'utf8').replace(/#.*$/gm, '');
const failures = [];
const fail = (msg) => failures.push(msg);

const opens = (conf.match(/\{/g) || []).length;
const closes = (conf.match(/\}/g) || []).length;
if (opens !== closes) fail(`unbalanced braces: ${opens} "{" vs ${closes} "}"`);

const locations = [...conf.matchAll(/location\s+([^{]+)\{([^{}]*)\}/g)].map((m) => ({ name: m[1].trim(), body: m[2] }));
const serverLevel = conf.replace(/location\s+[^{]+\{[^{}]*\}/g, '');

const header = (name, text) => new RegExp(`add_header\\s+${name}\\s+"([^"]*)"\\s+always\\s*;`, 'i').exec(text);
const NOSNIFF = /add_header\s+X-Content-Type-Options\s+"nosniff"\s+always\s*;/i;

if (!NOSNIFF.test(serverLevel)) fail('server: X-Content-Type-Options "nosniff" always is missing');
if (!header('Referrer-Policy', serverLevel)?.[1].includes('strict-origin-when-cross-origin')) fail('server: Referrer-Policy strict-origin-when-cross-origin is missing');
if (header('X-Frame-Options', serverLevel)?.[1] !== 'SAMEORIGIN') fail('server: X-Frame-Options "SAMEORIGIN" is missing (the preview iframe is same-origin)');
if (!header('Permissions-Policy', serverLevel)?.[1].includes('camera=()')) fail('server: Permissions-Policy is missing');

const csp = header('Content-Security-Policy-Report-Only', serverLevel)?.[1];
if (!csp) {
  fail('server: Content-Security-Policy-Report-Only is missing');
} else {
  for (const directive of [
    "default-src 'self'",
    "script-src 'self' https://accounts.google.com",
    "object-src 'none'",
    "base-uri 'self'",
    "frame-ancestors 'self'",
    'frame-src https://accounts.google.com',
  ]) {
    if (!csp.includes(directive)) fail(`CSP is missing: ${directive}`);
  }
}

for (const loc of locations) {
  if (/add_header/i.test(loc.body) && !NOSNIFF.test(loc.body)) {
    fail(`location ${loc.name}: declares add_header but does not repeat X-Content-Type-Options (inherited headers are dropped)`);
  }
  if (/proxy_pass|\$backend/.test(loc.body)) {
    for (const h of ['X-Content-Type-Options', 'X-Frame-Options']) {
      if (!new RegExp(`proxy_hide_header\\s+${h}\\s*;`, 'i').test(loc.body)) {
        fail(`location ${loc.name}: proxies to the API but does not proxy_hide_header ${h} (duplicate or conflicting header)`);
      }
    }
  }
}

if (failures.length) {
  console.error(`nginx.conf check FAILED (${failures.length}):`);
  for (const f of failures) console.error(` - ${f}`);
  process.exit(1);
}
console.log(`nginx.conf check OK (${locations.length} locations)`);
