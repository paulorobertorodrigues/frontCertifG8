import React, { useState } from 'react';
import axios from 'axios';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import './Certificado.css';
import.meta.env.VITE_API_URL;


interface Empregado {
    id: number;
    data: string;
    revisao: string;
    codigo: string;
    validade: string;
    responsavel: string;
    registro: string;
}

const Certificado: React.FC = () => {

    const URL = import.meta.env.VITE_API_URL; //imortando a url de .env

    const navigate = useNavigate();

    const [data, setData] = useState<string>('');
    const [revisao, setRevisao] = useState<string>('');
    const [codigo, setCodigo] = useState<string>('');
    const [validade, setValidade] = useState<string>('');
    const [responsavel, setResponsavel] = useState<string>('');
    const [registro, setRegistro] = useState<string>('');
    const [id, setId] = useState<number | null>(null);
    const [editar, setEditar] = useState<boolean>(false);
    const [empregadosList, setEmpregados] = useState<Empregado[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredEmpregados, setFilteredEmpregados] = useState<Empregado[]>([]);

    const add = () => {
        // Verifica se o código já existe na lista de empregados
        const codigoDuplicado = empregadosList.some(empregado => empregado.codigo === codigo);
        if (codigoDuplicado) {
            Swal.fire({
                icon: "error",
                title: "Erro de cadastro",
                text: `O código ${codigo} já está registrado!`,
                timer: 5000
            });
            return;// Interrompe a função caso o código já exista
        }
        // Verifica se todos os campos obrigatórios estão preenchidos
        if (!data || !revisao || !codigo || !validade || !responsavel || !registro) {
            Swal.fire({
                icon: "error",
                title: "Erro de validação",
                text: "Por favor, preencha todos os campos obrigatórios antes de prosseguir.",
                timer: 5000
            });
            return;
        }
        // Se o código for único, continua com o cadastro
        axios.post(`${URL}/create`, {
            data,
            revisao,
            codigo,
            validade,
            responsavel,
            registro
        }).then(() => {
            getEmpregados();
            limparCampo();
            Swal.fire({
                title: "<strong>Registrado com sucesso!</strong>",
                html: `<i>Certificado de autenticidade com o código do documento <strong>${codigo}</strong> registrado!</i>`,
                icon: 'success',
                timer: 3000
            });
        }).catch((error) => {
            Swal.fire({
                icon: "error",
                title: "Erro...",
                text: error.message.includes("Network Error") ? "Tente mais tarde" : error.message
            });
        });
    };

    const update = () => {
        if (id === null) return; // Prevents update if id is null
        axios.put(`${URL}/update`, {
            id,
            data,
            revisao,
            codigo,
            validade,
            responsavel,
            registro
        }).then(() => {
            getEmpregados();
            limparCampo();
            Swal.fire({
                title: "<strong>Atualização efetuada com sucesso!</strong>",
                html: `<i>Certificado de autenticidade com o código do documento <strong>${codigo}</strong> atualizado!</i>`,
                icon: 'success',
                timer: 3000
            });
        }).catch((error) => {
            Swal.fire({
                icon: "error",
                title: "Erro...",
                text: error.message.includes("Network Error") ? "Tente mais tarde" : error.message
            });
        });
    };

    const deleteEmple = (val: Empregado) => {
        //alert sweetalert2
        Swal.fire({
            title: "Quer Deletar?",
            html: `<i>Quer apagar os dados do documento <strong>${val.codigo}</strong>?</i>`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, para deletar!"
        }).then((result: SweetAlertResult) => {
            if (result.isConfirmed) {
                axios.delete(`${URL}/delete/${val.id}`).then(() => {
                    getEmpregados();
                    limparCampo();
                    Swal.fire({
                        icon: 'success',
                        title: `O arquivo com o código do Documento: ${val.codigo} foi Deletado.`,
                        showConfirmButton: false,
                        timer: 3000
                    });
                }).catch((error) => {
                    Swal.fire({
                        icon: "error",
                        title: "Erro...",
                        text: "Não pode eliminar o arquivo!",
                        footer: error.message.includes("Network Error") ? "Tente mais tarde" : error.message
                    });
                });
            }
        });
    };

    const limparCampo = () => {
        setData('');
        setRevisao('');
        setCodigo('');
        setValidade('');
        setResponsavel('');
        setRegistro('');
        setEditar(false);
        setId(null);
    };

    const editarEmpregado = (val: Empregado) => {
        setEditar(true);
        setData(val.data);
        setRevisao(val.revisao);
        setCodigo(val.codigo);
        setValidade(val.validade);
        setResponsavel(val.responsavel);
        setRegistro(val.registro);
        setId(val.id);
    };
    //retorna as informações na tela
    const getEmpregados = () => {
        axios.get(`${URL}/empregados`).then(response => {
            setEmpregados(response.data);
        }).catch(error => {
            if (error.response) {
                console.error('Erro resposta:', error.response.data);
                console.error('Erro Status:', error.response.status);
            } else if (error.request) {
                console.error('Error request:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
        }
        );
    };

    const search = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const results = empregadosList.filter(empregado => empregado.codigo.includes(searchTerm));
        setFilteredEmpregados(results);
    };

    
    getEmpregados();
    

    return (
        <div className="container">
            <div className="card text-center">
                <div className="card-header">
                    <img src='./Images/logo_g8.png' className="img-fluid" style={{ maxWidth: '250px', height: 'auto' }} alt="Logo" />
                    <h1><i>Certificado de Autenticidade</i></h1>
                </div>
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-12 col-md-6">
                            <span className="input-group-text">Data da Elaboração do Documento:</span>
                            <input
                                type="date"
                                onChange={(event) => setData(event.target.value)}
                                className="form-control"
                                value={data}
                            />
                        </div>
                        <div className="col-12 col-md-6">
                            <span className="input-group-text">Revisão:</span>
                            <input
                                type="text"
                                onChange={(event) => setRevisao(event.target.value)}
                                className="form-control"
                                value={revisao}
                                placeholder="Digite a Revisão do Documento"
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-12 col-md-6">
                            <span className="input-group-text">Código:</span>
                            <input
                                type="text"
                                onChange={(event) => setCodigo(event.target.value)}
                                className="form-control"
                                value={codigo}
                                placeholder="Digite o código do Documento"
                            />
                        </div>
                        <div className="col-12 col-md-6">
                            <span className="input-group-text">Validade:</span>
                            <input
                                type="date"
                                onChange={(event) => setValidade(event.target.value)}
                                className="form-control"
                                value={validade}
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-12 col-md-6">
                            <span className="input-group-text">Responsável:</span>
                            <input
                                type="text"
                                onChange={(event) => setResponsavel(event.target.value)}
                                className="form-control"
                                value={responsavel}
                                placeholder="Digite o nome do responsável Técnico"
                            />
                        </div>
                        <div className="col-12 col-md-6">
                            <span className="input-group-text">Registro:</span>
                            <input
                                type="text"
                                onChange={(event) => setRegistro(event.target.value)}
                                className="form-control"
                                value={registro}
                                placeholder="Digite o Registro Profissional CREA"
                            />
                        </div>
                    </div>
                </div>

                <div className="card-footer text-muted d-flex justify-content-center">
                    {editar ? (
                        <div>
                            <button className='btn btn-warning m-2' onClick={update}>Atualizar</button>
                            <button className='btn btn-info m-2' onClick={limparCampo}>Cancelar</button>
                        </div>
                    ) : (
                        <div className="d-flex flex-column flex-md-row">
                            {/* Botão Registrar */}
                            <button className='btn btn-success me-2 mb-2 mb-md-0' onClick={add}>Registrar</button>
                            {/* Formulário de busca ao lado do botão Registrar */}
                            <form className="d-flex flex-grow-1" role="search" onSubmit={search}>
                                <input
                                    className="form-control me-2"
                                    type="search"
                                    placeholder="Pesquise pelo código"
                                    value={searchTerm}
                                    onChange={(event) => setSearchTerm(event.target.value)}
                                />
                                <button className="btn btn-outline-success" type="submit">Pesquisar</button>
                            </form>
                        </div>
                    )}
                </div>

                <table className="table table-success table-striped table-responsive-md">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Data</th>
                            <th scope="col">Revisão</th>
                            <th scope="col">Código</th>
                            <th scope="col">Validade</th>
                            <th scope="col">Técnico</th>
                            <th scope="col">CREA</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(filteredEmpregados.length > 0 ? filteredEmpregados : empregadosList).map((val) => (
                            <tr key={val.id}>
                                <th scope="row">{val.id}</th>
                                <td>{new Date(val.data).toLocaleDateString('pt-BR')}</td>
                                <td>{val.revisao}</td>
                                <td>{val.codigo}</td>
                                <td>{new Date(val.validade).toLocaleDateString('pt-BR')}</td>
                                <td>{val.responsavel}</td>
                                <td>{val.registro}</td>
                                <td>
                                    <div className="btn-group d-flex justify-content-around" role="group">
                                        <button type="button" onClick={() => editarEmpregado(val)} className="btn btn-info btn-sm">Editar</button>
                                        <button type="button" onClick={() => deleteEmple(val)} className="btn btn-danger btn-sm">Delete</button>
                                        <button type="button" onClick={() => navigate(`/pdf/${val.codigo}`, {
                                            state: { ...val }
                                        })} className='btn btn-success btn-sm'>PDF</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default Certificado;