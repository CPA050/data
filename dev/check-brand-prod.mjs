const html = await (await fetch('https://data-1i1.pages.dev/')).text();
console.log('title:', html.match(/<title>([^<]*)<\/title>/)?.[1]);
console.log('apple-title:', html.match(/apple-mobile-web-app-title" content="([^"]*)"/)?.[1]);
console.log('description:', html.match(/<meta name="description" content="([^"]*)"/)?.[1]);

const js = html.match(/assets\/index-[\w-]+\.js/)?.[0];
const code = await (await fetch('https://data-1i1.pages.dev/' + js)).text();
console.log('bundle has 基准:', code.includes('基准'), '| still has 原点 · Origin:', code.includes('原点 · Origin'));

const m = await (await fetch('https://data-1i1.pages.dev/manifest.webmanifest')).json();
console.log('manifest:', m.name, '|', m.short_name);
