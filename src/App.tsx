import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Components/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Certificado from './Components/Certificado'
import PDFPage from  './Components/PDFPage'


//adicionado rotas publicas

import CertificadoPublico from './pages/CertificadoPublico';


//fim rotas


function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/certificado' element={<Certificado />}></Route>
        <Route path="/pdf/:codigo" element={<PDFPage />}></Route>

        {/*<Route path="/" element={<Certificado />}></Route>*/}
        <Route path="/certificado/:codigo" element={<CertificadoPublico />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App