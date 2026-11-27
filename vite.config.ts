import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { fileURLToPath, URL } from 'node:url';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const API_TARGET = process.env.API_TARGET || 'http://127.0.0.1:8788';

/** 构建戳：显示在侧栏/关于页，用来确认"线上是不是最新那版" */
const BUILD_STAMP = new Date().toISOString().slice(0, 16).replace('T', ' ');

export default defineConfig({
  root: 'web',
  publicDir: 'public',
  base: '/',
  define: {
    __BUILD__: JSON.stringify(BUILD_STAMP),
  },
  resolve: {
    alias: { '@': fileURLToPath(new URL('./web/src', import.meta.url)) },
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    target: 'es2020',
    cssCodeSplit: false,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules')) return 'vendor';
          return undefined;
        },
      },
    },
  },
  server: {
    port: 5173,
    proxy: { '/api': { target: API_TARGET, changeOrigin: true } },
  },
  plugins: [
    {
      // 构建时额外吐一个 version.json：前端启动就拿它和 __BUILD__ 比对，
      // 不一致就弹「有新版本」提示条，解决"手机还停在旧版"的老问题。
      name: 'datum-version',
      closeBundle() {
        const dist = resolve(process.cwd(), 'dist');
        writeFileSync(resolve(dist, 'version.json'), JSON.stringify({ build: BUILD_STAMP }), 'utf8');
      },
    },
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.png'],
      manifest: {
        name: '基准',
        short_name: '基准',
        description: '刷题 · 错题 · 收藏，离线也能练',
        lang: 'zh-CN',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#f5f6f8',
        theme_color: '#111214',
        icons: [
          { src: '/icons/app-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/icons/app-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: '/icons/app-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,woff2}'],
        navigateFallback: '/index.html',
        runtimeCaching: [
          {
            urlPattern: /^https?:\/\/[^/]+\/api\/questions/,
            handler: 'NetworkFirst',
            options: { cacheName: 'api-questions', networkTimeoutSeconds: 4, expiration: { maxAgeSeconds: 86400 } },
          },
        ],
      },
    }),
  ],
});
