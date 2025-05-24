import { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { useNavigate } from 'react-router-dom';

function QRCodeReader() {
  const [data, setData] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <div className="container text-center mt-5">
      <h2>Escaneie o QR Code</h2>
      <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
        <QrReader
          constraints={{ video: { facingMode: 'environment' } }} // ✅ Correção aqui
          onResult={(result: any, error: any) => {
            if (result) {
              const url = result.getText();
              setData(url);

              // Se for da mesma origem, redireciona para a rota local
              if (url.startsWith(window.location.origin)) {
                const path = url.replace(window.location.origin, '');
                navigate(path);
              } else {
                window.open(url, '_blank'); // Se for externo, abre em nova aba
              }
            }
            if (error) {
              console.warn(error);
            }
          }}
          style={{ width: '100%' }}
        />
      </div>
      {data && <p>URL detectada: {data}</p>}
    </div>
  );
}

export default QRCodeReader;
