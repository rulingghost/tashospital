import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'dayjs': path.resolve(__dirname, './node_modules/dayjs'),
    },
  },

  server: {
    host: '0.0.0.0', // Dış IP adreslerine izin verir
    port: 5173, // Varsayılan port, isteğe bağlı olarak değiştirebilirsiniz
  },
})