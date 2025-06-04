import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import logoG8 from '../Images/logo_g8.png';
import certifiedLogo from '../Images/certified.png';
import axios from 'axios';

function QrCodeCertificado() {
  const { id } = useParams();
  const [certificado, setCertificado] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/empregados/${id}`)
      .then(res => setCertificado(res.data))
      .catch(err => console.error('Erro ao buscar certificado:', err));
  }, [id]);

  if (!certificado) return <p>Carregando certificado...</p>;

  const { data, revisao, codigo, validade, responsavel, registro } = certificado;
  const currentUrl = window.location.href;

  return (
    <div className="container" id="todo">
      <div className="card text-center">
        <div className="card-header d-flex justify-content-between align-items-center">
          <img src={logoG8} width="200" height="100" alt="Logo G8" />
          <QRCode value={currentUrl} size={100} />
        </div>

        <div className="d-flex justify-content-center m-4">
          <h2><i>Certificado de Autenticidade</i></h2>
        </div>

        <div className="container text-center">
          <div className="row row-cols-2">
            <div className="col">
              <p>Data da Elaboração<br /><strong>{new Date(data).toLocaleDateString('pt-BR')}</strong></p>
            </div>
            <div className="col">
              <p>Revisão<br /><strong>{revisao}</strong></p>
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
                <p className="mb-0">Web-site: <a href="https://www.g8online.com.br" target="_blank" rel="noreferrer">g8online.com.br</a></p>
                <p className="mb-0">E-mail: <a href="mailto:g8@g8online.com.br" target="_blank" rel="noreferrer">g8@g8online.com.br</a></p>
              </div>
            </div>
            <div className="col" id="logo-certified">
              <img src={certifiedLogo} width="130" height="130" alt="Certified Logo" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QrCodeCertificado;
