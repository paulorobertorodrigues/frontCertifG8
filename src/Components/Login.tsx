import React, { useState } from 'react';
import '../assets/style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import '../App.css';
// import './Login.css';

import backgroundImage from '../assets/seguranca.webp';

import.meta.env.VITE_API_URL;


const Login = () => {

    const URL = import.meta.env.VITE_API_URL; // importando a url de .env

    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.post(`${URL}/auth/adminlogin`, values)
            .then(result => {
                if (result.data.loginStatus) {
                    navigate('/certificado');
                } else {
                    setError(result.data.Error)
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 loginPage"
        style={{
            backgroundImage: `linear-gradient(rgba(11,11,11,0.5), rgba(10,10,10,0.5)), url(${backgroundImage})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 120%',
          }}>
            <div className="p-3 rounded border loginForm" style={{ width: '100%', maxWidth: '400px' }}>
                <div className="text-warning">
                    {error && error}
                </div>
                <h2></h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 d-flex justify-content-center">
                        <img src="Images/logotipo_g8.png" alt="logo" className="img-fluid" style={{ maxWidth: '150px' }} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email:</strong></label>
                        <input
                            type="email"
                            name="email"
                            autoComplete="off"
                            placeholder="Digite seu Email"
                            onChange={(e) => setValues({ ...values, email: e.target.value })}
                            className="form-control rounded-0"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><strong>Senha:</strong></label>
                        <input
                            type="password"
                            name="password"
                            autoComplete="off"
                            placeholder="Digite sua Senha"
                            onChange={(e) => setValues({ ...values, password: e.target.value })}
                            className="form-control rounded-0"
                        />
                    </div>
                    <button className="btn btn-success w-100 rounded-0">Entrar</button>
                </form>
            </div>
        </div>

    )
}

export default Login;