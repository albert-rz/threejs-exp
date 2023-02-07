// Configure Vitest (https://vitest.dev/config/)

import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    /* for example, use global to avoid globals imports (describe, test, expect): */
    // globals: true,
    coverage: {
      provider: 'istanbul'
    }
  },
})

console.log(process.env.NODE_ENV)
