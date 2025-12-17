/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setupTests.ts'],
    globals: true,
    css: true,
    coverage: {
      reporter: ['text', 'lcov'],
      reportsDirectory: './coverage',
    },
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
})
