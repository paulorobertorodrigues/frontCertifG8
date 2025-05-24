// import './App.css'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import Login from './Components/Login'
// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Certificado from './Components/Certificado'
// import PDFPage from  './Components/PDFPage'

// function App() {

//   return (

//     <BrowserRouter>
//       <Routes>
//         <Route path='/' element={<Login />}></Route>
//         <Route path='/certificado' element={<Certificado />}></Route>
//         <Route path="/pdf/:codigo" element={<PDFPage />}></Route>
//       </Routes>
//     </BrowserRouter>
//   )
// }

// export default App

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Certificado from './Components/Certificado';
import PDFPage from './Components/PDFPage';
import QRCodeReader from './Components/QRCodeReader'; // caminho corrigido

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/certificado' element={<Certificado />} />
        <Route path='/pdf/:codigo' element={<PDFPage />} />
        <Route path='/scanner' element={<QRCodeReader />} /> {/* Nova rota para escanear */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
