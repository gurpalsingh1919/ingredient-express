import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

console.log("Loaded Vite config");


// https://vite.dev/con
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5175,
    strictPort: true
  }
})
