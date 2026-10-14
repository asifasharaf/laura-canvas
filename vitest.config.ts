import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

// One run for the whole workspace: every package's test/ plus the cross-package tests/.
// Workspace packages resolve to their src/ (like the `source` export condition does for tsc), so tests need no build.
export default defineConfig({
  resolve: {
    alias: [{ find: /^@laura-canvas\/([\w-]+)$/, replacement: fileURLToPath(new URL('./packages/$1/src/index.ts', import.meta.url)) }],
  },
  test: {
    include: ['packages/*/test/**/*.test.ts', 'tests/**/*.test.ts'],
  },
});
