import fs from 'node:fs';

const p = 'functions/api/ai.js';
let s = fs.readFileSync(p, 'utf8');

const wantTokens = `body: JSON.stringify({
      model,
      messages,
      temperature: \${action === 'generate' ? 0.8 : 0.1},
      max_tokens: action === 'generate' ? 8000 : 2000,
      stream: true,
    }),`;

s = s.replace(
  "body: JSON.stringify({ model, messages, temperature: 0.1, stream: true }),",
  wantTokens.replace('${action === \'generate\' ? 0.8 : 0.1}', "${action === 'generate' ? 0.8 : 0.1}").replace(/\n {2}/g, '\n      '),
);

s = s.replace(
  "body: JSON.stringify({ model, messages, temperature: 0.1, stream: false }),",
  `body: JSON.stringify({
      model,
      messages,
      temperature: \${action === 'generate' ? 0.8 : 0.1},
      max_tokens: action === 'generate' ? 8000 : 2000,
      stream: false,
    }),`,
);

fs.writeFileSync(p, s, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
console.log('max_tokens set =>', s.includes('max_tokens: action'));
