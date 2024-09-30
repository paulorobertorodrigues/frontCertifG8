// declare module 'html2pdf.js' {
//   interface Html2PdfOptions {
//     // Defina as opções que podem ser passadas para o método set
//     margin?: number | string;
//     filename?: string;
//     image?: { type: string; quality: number };
//     html2canvas?: { scale: number };
//     jsPDF?: { unit: string; format: string; orientation: string };
//     // Adicione mais opções conforme necessário
//   }

//   export default function html2pdf(element: HTMLElement): {
//     from: (element: HTMLElement) => {
//       set: (options: Html2PdfOptions) => {
//         save: (filename?: string) => Promise<void>;
//       };
//     };
//   };
// }

const generatePDF = () => {
  const element = document.getElementById('todo');
  const button = document.getElementById('pdf-button');

  // Verifica se o elemento existe antes de continuar
  if (element && button) {
    button.style.display = 'none'; // Esconde o botão durante a geração do PDF

    html2pdf()
      .from(element)
      .set({
        margin: 1,
        filename: `certificado-${codigo || id}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      })
      .save()
      .finally(() => {
        button.style.display = 'block'; // Mostra o botão novamente após a geração
      });
  } else {
    console.error("O elemento 'todo' ou o botão 'pdf-button' não foram encontrados.");
  }
};
