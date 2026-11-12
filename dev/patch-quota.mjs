import fs from 'node:fs';

const p = 'functions/api/ai.js';
let s = fs.readFileSync(p, 'utf8');

s = s.replace('const QUOTA = { text: 60, extract: 20, generate: 10 };', 'const QUOTA = { text: 60, extract: 20, generate: 60 };');

const labelOld = "bucket === 'extract' ? '识别' : '解析'";
const labelNew = "bucket === 'extract' ? '识别' : bucket === 'generate' ? '出题' : '解析'";
s = s.split(labelOld).join(labelNew);

fs.writeFileSync(p, s, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
console.log('generate quota =>', s.includes('generate: 60'), '| label =>', s.includes('出题'));
