import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import MainPage from './Pages/MainPage';
import LoginPage from './Pages/LoginPage';
import RegistrationPage from './Pages/RegistrationPage';
import AccountPage from './Pages/AccountPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar bg="dark" variant="dark" expand="lg" className="Navbar">
          <Navbar.Brand as={Link} to="/">Trip Atlas</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav>
              <Nav.Link as={Link} to="/account">Account</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse id="navbar-nav" className="justify-content-end">
            <Nav>
              <Nav.Link as={Link} to="/registration">Sign Up</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div className="Page">
          <Routes>
            <Route path="/" Component={MainPage} />
            <Route path="/login" Component={LoginPage} />
            <Route path="/registration" Component={RegistrationPage} />
            <Route path="/account" Component={AccountPage} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
