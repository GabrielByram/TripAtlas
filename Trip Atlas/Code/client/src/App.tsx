import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import MainPage from './Pages/MainPage/MainPage';
import LoginPage from './Pages/LoginPage';
import AccountPage from './Pages/AccountPage';

function App() {
  const handleNavLinkClick = (e: any) => {
    const { pathname } = e.currentTarget;

    if (window.location.pathname === pathname) {
      e.preventDefault();
      window.location.reload();
    }
  };

  return (
    <div className="App">
      <Router>
        <Navbar bg="dark" variant="dark" expand="lg" className="Navbar">
          <Navbar.Brand as={Link} to="/" onClick={handleNavLinkClick}>Trip Atlas</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav" className="justify-content-end">
            <Nav>
              <Nav.Link as={Link} to="/account" onClick={handleNavLinkClick}>Account</Nav.Link>
              <Nav.Link as={Link} to="/login" onClick={handleNavLinkClick}>Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div className="Page">
          <Routes>
            <Route path="/" Component={MainPage} />
            <Route path="/login" Component={LoginPage} />
            <Route path="/account" Component={AccountPage} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
