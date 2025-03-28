import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 9000,
    open: false, // можно true, чтобы автоматически открывалось
  },
  define: {
    __APP_VERSION__: JSON.stringify('0.1.0'),
  }
})
