import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()],
  server: { https: true },
  define: {
    'process.env': {}
  }
})
//REMOVE THIS CERT STUFF FOR PRODUCTION!!!!!!!!!!!!! @REMIND_ME