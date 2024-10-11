// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react-swc';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   // base: "/QRCodePdf-FrontEnd",
//   // build: {
//   //   outDir: 'dist', // Altere 'dist' para o nome da pasta desejada
//   //   sourcemap: true
//   // },
// });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Certifique-se de que o diretório de saída está correto
    rollupOptions: {
      input: 'index.html', // Arquivo de entrada correto
    },
  },
  publicDir: 'public', // Certifique-se de que a pasta public está corretamente mapeada
});
