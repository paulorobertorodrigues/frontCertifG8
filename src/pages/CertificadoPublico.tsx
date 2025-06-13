import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Certificado {
    data: string;
    revisao: string;
    codigo: string;
    validade: string;
    responsavel: string;
    registro: string;
}

const CertificadoPublico: React.FC = () => {
    const { codigo } = useParams();
    const [certificado, setCertificado] = useState<Certificado | null>(null);
    const [erro, setErro] = useState<boolean>(false);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/public/certificado/${codigo}`)
            .then(response => setCertificado(response.data))
            .catch(() => setErro(true));
    }, [codigo]);

    if (erro) return <div>Certificado não encontrado</div>;
    if (!certificado) return <div>Carregando...</div>;

    return (
        <div className="container text-center mt-5">
            <h1>Certificado de Autenticidade</h1>
            <p><strong>Código:</strong> {certificado.codigo}</p>
            <p><strong>Data:</strong> {new Date(certificado.data).toLocaleDateString('pt-BR')}</p>
            <p><strong>Revisão:</strong> {certificado.revisao}</p>
            <p><strong>Validade:</strong> {new Date(certificado.validade).toLocaleDateString('pt-BR')}</p>
            <p><strong>Responsável Técnico:</strong> {certificado.responsavel}</p>
            <p><strong>Registro CREA:</strong> {certificado.registro}</p>
        </div>
    );
};

export default CertificadoPublico;
