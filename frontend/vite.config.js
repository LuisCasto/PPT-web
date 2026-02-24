import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Puerto alternativo
    host: true, // Permite conexiones desde la red
    strictPort: false, // Si el puerto está ocupado, busca otro automáticamente
  }
})