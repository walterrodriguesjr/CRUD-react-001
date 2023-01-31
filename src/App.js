/* CSS */

/* Componentes */
import Home from './components/Home';
import Alunos from './components/Alunos';
import Sobre from './components/Sobre';

/* Bibliotecas do react */
import { BrowserRouter, Routes, Link, Route } from "react-router-dom";

/* Componentes do Bootstrap */
import { Nav } from "react-bootstrap";

/* CSS do bootstrap */
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <h1>Minha Aplicação React</h1>

      {/* ROTEAMENTO DOS 3 COMPONENTES PRINCIPAIS, LINK PARA TROCA DE ROTA, ROUTE PARA
       RENDERIZAÇÃO DE CONTEÚDO EM CADA ROTA */}

      <BrowserRouter>

        {/* LINKS */}
        <Nav variant="tabs">
          <Nav.Link as={Link} to="/">Página Inicial</Nav.Link>
          <Nav.Link as={Link} to="/alunos">Cadastro de Alunos</Nav.Link>
          <Nav.Link as={Link} to="/sobre">Sobre</Nav.Link>
        </Nav>

        {/* ROTAS QUE CHAMAM CADA COMPONENTE PARA SUA RESPECTIVA ROTA */}
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/alunos" element={<Alunos />}></Route>
          <Route path="/sobre" element={<Sobre />}></Route>
        </Routes>


      </BrowserRouter>

    </div>
  );
}

export default App;
