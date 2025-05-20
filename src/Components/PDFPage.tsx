import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import QRCode from "react-qr-code";
import html2pdf from 'html2pdf.js';

import logoG8 from '../Images/logo_g8.png';
import certifiedLogo from '../Images/certified.png';

function PDFPage() {
  const { id } = useParams(); // código do certificado
  const [certificado, setCertificado] = useState(null);
  const [loading, setLoading] = useState(true);

  const baseUrl = window.location.origin; // Ex: https://meusite.com
  const qrLink = `${baseUrl}/certificados/${id}`; // URL que será usada no QR code

  useEffect(() => {
    fetch(`${process.env.VITE_API_URL}/api/certificados/${id}`)
      .then(res => res.json())
      .then(data => {
        setCertificado(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao buscar certificado:", err);
        setLoading(false);
      });
  }, [id]);

  const generatePDF = () => {
    const element = document.getElementById('todo');
    const button = document.getElementById('pdf-button');
    if (button) button.style.display = 'none';

    html2pdf()
      .from(element)
      .set({
        margin: 1,
        filename: `certificado-${id}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      })
      .save()
      .finally(() => {
        if (button) button.style.display = 'block';
      });
  };

  if (loading) return <p>Carregando certificado...</p>;
  if (!certificado) return <p>Certificado não encontrado.</p>;

  const { data, revisao, codigo, validade, responsavel, registro } = certificado;

  return (
    <div className="container" id="todo">
      <div className="card text-center">
        <div className="card-header d-flex justify-content-between align-items-center">
          <img src={logoG8} width="200" height="100" alt="Logo G8" />
          <QRCode value={qrLink} size={100} />
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
        </div><br /><br />

        <div className="container custom-container">
          <div className="row row-cols-2">
            <div className="col custom-margin">
              <p className="mb-0"><strong>G8 Consultoria, Assessoria & Treinamento</strong></p>
              <div className="cnpj">
                <p className="mb-0">CNPJ: 17.819.089/000115</p>
                <p className="mb-0">
                  Web-site: <a href="https://www.g8online.com.br" target="_blank" rel="noopener noreferrer">https://www.g8online.com.br</a>
                </p>
                <p className="mb-0">
                  E-mail: <a href="mailto:g8@g8online.com.br" target="_blank" rel="noopener noreferrer">g8@g8online.com.br</a>
                </p>
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
