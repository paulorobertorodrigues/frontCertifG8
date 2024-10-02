import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/QRCodePdf-FrontEnd",
  // build: {
  //   outDir: 'dist', // Altere 'dist' para o nome da pasta desejada
  //   sourcemap: true
  // },
});

