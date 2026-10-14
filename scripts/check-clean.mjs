// Fails when tracked files contain host-product names or likely secrets. The repo is public:
// nothing from the product this was extracted from, and no credentials, may land here.
// CI also runs gitleaks; this is a fast local guard with a few project-specific patterns.
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const SELF = 'scripts/check-clean.mjs';
const RULES = [
  ['host product name', /\bfactors(\.ai)?\b|\bscout\b|slashbit|designer[- ]agent|\babm\b/i],
  ['private key', /-----BEGIN [A-Z ]*PRIVATE KEY-----/],
  ['API key', /\b(sk-ant-[\w-]{20,}|sk-[A-Za-z0-9]{32,}|AIza[\w-]{35}|gh[pousr]_[A-Za-z0-9]{36,}|xox[abp]-[\w-]{10,})\b/],
];
const files = execFileSync('git', ['ls-files', '--cached', '--others', '--exclude-standard'], { encoding: 'utf8' })
  .split('\n')
  .filter((f) => f && f !== SELF && !f.endsWith('package-lock.json') && !/\.(png|jpe?g|webp|gif|ttf|otf|woff2?|ico)$/i.test(f));
const hits = [];
for (const f of files) {
  let text;
  try {
    text = readFileSync(f, 'utf8');
  } catch {
    continue;
  }
  text.split('\n').forEach((line, i) => {
    for (const [what, re] of RULES) if (re.test(line)) hits.push(`${f}:${i + 1}: ${what}`);
  });
}
if (hits.length) {
  console.error(`check-clean: ${hits.length} problem(s)\n${hits.join('\n')}`);
  process.exit(1);
}
console.log(`check-clean: ${files.length} files clean`);
