import { defineConfig } from 'vitest/config';
import { fileURLToPath, URL } from 'node:url';

// 独立于 vite.config.ts，避免 vitest 自带的 vite 与项目 vite 的插件类型冲突
export default defineConfig({
  root: 'web',
  resolve: {
    alias: { '@': fileURLToPath(new URL('./web/src', import.meta.url)) },
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.ts'],
    setupFiles: ['src/test-setup.ts'],
    restoreMocks: true,
  },
});
