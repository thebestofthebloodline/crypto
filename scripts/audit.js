#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'index.html');
if (!fs.existsSync(file)){ console.error('ERROR: index.html not found'); process.exit(1); }
const html = fs.readFileSync(file, 'utf8');

let failures = 0;
const check = (name, ok, detail) => {
  console.log(`  ${ok ? '✓' : '✗'} ${name}${detail ? ' — ' + detail : ''}`);
  if (!ok) failures++;
};

console.log('\n=== $CRYPTO · Data Integrity Audit ===\n');

const coinMatch = html.match(/const COINS = \[([\s\S]*?)\n\];/);
if (!coinMatch){ console.error('COINS not found'); process.exit(1); }
let COINS;
try { eval('COINS = [' + coinMatch[1] + ']'); }
catch(e){ console.error('Parse error:', e.message); process.exit(1); }

console.log('Index:');
check('30 coins total', COINS.length === 30, `got ${COINS.length}`);

const seen = new Set();
let dup = 0;
COINS.forEach(c => { if (seen.has(c.sym)){ dup++; console.log(`    DUP: ${c.sym}`); } seen.add(c.sym); });
check('No duplicate symbols', dup === 0);

const validCats = new Set(["L1","MEME","DEFI","PRIVACY","INFRA"]);
const badCats = COINS.filter(c => !validCats.has(c.cat));
check('All categories valid', badCats.length === 0);

const validTiers = new Set([1,2,3]);
const badTiers = COINS.filter(c => !validTiers.has(c.tier));
check('All tiers in [1,2,3]', badTiers.length === 0);

const missingFields = COINS.filter(c => !c.sym || !c.name || !c.cat || c.tier == null);
check('All required fields present', missingFields.length === 0);

const cats = {};
COINS.forEach(c => cats[c.cat] = (cats[c.cat]||0) + 1);
console.log(`  ℹ Distribution: ${JSON.stringify(cats)}`);

console.log('\nCode:');
const scriptMatch = html.match(/<script>([\s\S]*)<\/script>/);
try { new Function(scriptMatch[1]); check('JS syntax valid', true); }
catch(e){ check('JS syntax valid', false, e.message); }

const balanced = (open, close) => (html.match(open)||[]).length === (html.match(close)||[]).length;
check('<div> balanced',     balanced(/<div[\s>]/g, /<\/div>/g));
check('<section> balanced', balanced(/<section[\s>]/g, /<\/section>/g));
check('<svg> balanced',     balanced(/<svg[\s>]/g, /<\/svg>/g));
check('<button> balanced',  balanced(/<button[\s>]/g, /<\/button>/g));
check('<style> balanced',   balanced(/<style>/g, /<\/style>/g));
check('<script> balanced',  balanced(/<script>/g, /<\/script>/g));

console.log('\nFile:');
console.log(`  Size: ${(html.length / 1024).toFixed(1)} KB`);
console.log(`  Lines: ${html.split('\n').length}`);

console.log('\n' + (failures === 0 ? '═══ ALL CHECKS PASSED ✓ ═══' : `═══ ${failures} CHECK(S) FAILED ═══`));
console.log('');
process.exit(failures === 0 ? 0 : 1);
