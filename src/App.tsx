import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Components/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Certificado from './Components/Certificado'
import PDFPage from  './Components/PDFPage'
//adicionado
import QrCodeCertificado from './Components/QrCodeCertificado';
//
function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/certificado' element={<Certificado />}></Route>
        <Route path="/pdf/:codigo" element={<PDFPage />}></Route>

        <Route path="/" element={<PDFPage />} />
        <Route path="/qrcode/:id" element={<QrCodeCertificado />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App