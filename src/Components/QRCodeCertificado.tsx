import React from 'react';
import QRCode from 'react-qr-code';

interface QRCodeCertificadoProps {
  codigo: string;
}

const QRCodeCertificado: React.FC<QRCodeCertificadoProps> = ({ codigo }) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const url = `${baseUrl}/certificado/${codigo}`;

  return <QRCode value={url} size={100} />;
};

export default QRCodeCertificado;
