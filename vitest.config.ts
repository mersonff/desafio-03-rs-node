import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    environmentMatchGlobs: [['src/http/controllers/**', 'prisma']],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}) 