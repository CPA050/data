const urls = [
  '/favicon.ico',
  '/favicon.png',
  '/icon-16.png',
  '/icon-32.png',
  '/icon-192.png',
  '/icon-512.png',
  '/icon-maskable-512.png',
  '/apple-touch-icon.png',
  '/safari-pinned-tab.svg',
];

for (const path of urls) {
  const res = await fetch('https://data-1i1.pages.dev' + path);
  const buf = await res.arrayBuffer();
  console.log(path, res.status, (res.headers.get('content-type') || '').split(';')[0], buf.byteLength);
}

const html = await (await fetch('https://data-1i1.pages.dev/')).text();
const links = html.match(/<link rel="[^"]*icon[^>]*>/g) || [];
console.log('icon links:', links.length);
for (const l of links) console.log('  ', l);

const manifest = await (await fetch('https://data-1i1.pages.dev/manifest.webmanifest')).json();
console.log('manifest:', JSON.stringify(manifest.icons));
