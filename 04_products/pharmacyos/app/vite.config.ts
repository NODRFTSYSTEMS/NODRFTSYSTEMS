import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
//
// ⚠️  DEPLOYMENT: Do NOT set VITE_BASE_PATH as an env var — Git Bash on Windows
// converts /pharmacyos/ to a Windows path (MSYS path expansion).
// Use the CLI flag instead (see memory file — project_pharmacyos_winchester.md):
//   MSYS_NO_PATHCONV=1 VITE_DEMO_MODE=true npx vite build --base /pharmacyos/
//
// The `base` field below is the local dev default ('/'). The --base CLI flag
// overrides it at build time and is not subject to env var path conversion.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    css: false,
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
})
