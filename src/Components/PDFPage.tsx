// import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Certificado';

import QRCode from "react-qr-code";

import html2pdf from 'html2pdf.js';
// import { QRCodeCanvas } from 'qrcode.react';
// import { QRCode } from 'qrcode.react';
import logoG8 from '../Images/logo_g8.png';
import certifiedLogo from '../Images/certified.png';

function PDFPage() {
  const location = useLocation();
  const { id } = useParams(); // Captura o id ou codigo da URL
  const { data, revisao, codigo, validade, responsavel, registro } = location.state || {};

  // const generatePDF = () => {
  //   const element = document.getElementById('todo');
    
  //   const button = document.getElementById('pdf-button');
  //   button.style.display = 'none'; // Esconde o botão durante a geração do PDF

  //   html2pdf()
  //     .from(element)
  //     .set({
  //       margin: 1,
  //       filename: `certificado-${codigo || id}.pdf`,
  //       image: { type: 'jpeg', quality: 0.98 },
  //       html2canvas: { scale: 2 },
  //       jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  //     })
  //     .save()
  //     .finally(() => {
  //       button.style.display = 'block'; // Mostra o botão novamente após a geração
  //     });
  // };



  // const generatePDF = () => {
  //   const element = document.getElementById('todo');
    
  //   const button = document.getElementById('pdf-button');
  //   if (button) { // Verifica se o botão não é null
  //     button.style.display = 'none'; // Esconde o botão durante a geração do PDF
  //   }
  
  //   html2pdf()
  //     .from(element)
  //     .set({
  //       margin: 1,
  //       filename: `certificado-${codigo || id}.pdf`,
  //       image: { type: 'jpeg', quality: 0.98 },
  //       html2canvas: { scale: 2 },
  //       jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  //     })
  //     .save()
  //     .finally(() => {
  //       if (button) { // Verifica novamente se o botão existe
  //         button.style.display = 'block'; // Mostra o botão novamente após a geração
  //       }
  //     });
  // };
  
const generatePDF = async () => {
  const element = document.getElementById('todo');
  const button = document.getElementById('pdf-button');

  if (!element) return;
  if (button) button.style.display = 'none';

  const opt = {
    margin: 1,
    filename: `certificado-${codigo || id}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  };

  try {
    // Gera o PDF em blob
    const worker = html2pdf().from(element).set(opt);
    const pdfBlob = await worker.outputPdf('blob');

    // Envia o PDF ao servidor
    const formData = new FormData();
    formData.append('file', pdfBlob, `certificado-${codigo || id}.pdf`);
    formData.append('codigo', codigo || id); // usado como nome

    const response = await fetch('http://SEU_BACKEND_PUBLICO/upload-certificado', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Erro ao enviar o PDF para o servidor');
    }

    alert('PDF salvo no servidor com sucesso!');

    // Salva localmente
    await worker.save();
  } catch (err) {
    console.error(err);
    alert('Erro ao gerar ou enviar o PDF.');
  } finally {
    if (button) button.style.display = 'block';
  }
};





  const currentUrl = window.location.href; // URL atual da página com o ID

  return (
    <div className="container" id="todo">
      <div className="card text-center">
        <div className="card-header d-flex justify-content-between align-items-center">

          <img src={logoG8} width="200" height="100" alt="Certified Logo" />

          <QRCode value={currentUrl} size={100} className="float-right" /> {/* QR code para a URL atual */}
        </div>
        <div className="d-flex justify-content-center m-4">
          <h2><i>Certificado de Autenticidade</i></h2>
        </div>
        <div className="container text-center">
          <div className="row row-cols-2">
            <div className="col">
              <p>Data da Elaboração do Documento <br /><strong>{new Date(data).toLocaleDateString('pt-BR')}</strong></p>
            </div>
            <div className="col">
              <p>Revisão do Documento <br /><strong>{revisao}</strong></p>
            </div>
          </div>
        </div>
        <div className="container text-center">
          <div className="row row-cols-2">
            <div className="col">
              <p>Código do Documento<br /><strong>{codigo}</strong></p>
            </div>
            <div className="col">
              <p>Validade<br /><strong>{new Date(validade).toLocaleDateString('pt-BR')}</strong></p>
            </div>
          </div>
        </div>

        <div className="container text-center">
          <div className="row row-cols-2">
            <div className="col">
              <p>Responsável Técnico<br /><strong>{responsavel}</strong></p>
            </div>
            <div className="col">
              <p>Registro Profissional<br /><strong>CREA: {registro}</strong></p>
            </div>
          </div>
        </div><br/><br/>

        <div className="container custom-container">
          <div className="row row-cols-2">
            <div className="col custom-margin">
              <p className="mb-0"><strong>G8 Consultoria, Assessoria & Treinamento</strong></p>
              <div className="cnpj">
                <p className="mb-0">CNPJ: 17.819.089/000115</p>
                <p className="mb-0">Web-site: <a href="https://www.g8online.com.br" className="stretched-link" target="_blank">https://www.g8online.com.br</a></p>
                <p className="mb-0">E-mail: <a href="mailto:g8@g8online.com.br" className="stretched-link" target="_blank">g8@g8online.com.br</a></p>
              </div>
            </div>
            <div className="col" id="logo-certified">
              <img src={certifiedLogo} width="130" height="130" alt="Certified Logo" />
            </div>
          </div>
        </div>
      </div>
      <button id="pdf-button" onClick={generatePDF} className="btn btn-primary mt-4">Baixar PDF</button>
    </div>
  );
}

export default PDFPage;