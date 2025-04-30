import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Adm from "./components/adm-page/Adm";
import Coment from "./components/coment-page/coment";
import Home from "./components/home-page/Home";
import Login from "./components/login-page/Login";
import Register from "./components/register-page/register";
import Timeline from "./components/timeline-page/timeline";
import logo from "./assets/Eco_logo.png";
import "./App.css";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="app-wrapper">
        <nav className="navbar">
          <div className="navbar-content">
            <Link to="/" className="navbar-logo">
              <img
                src={logo}
                alt="EcoAlerta Logo"
                className="logo-img"
                style={{ maxHeight: "100%" }}
              />
            </Link>

            <button
              className={`hamburger ${isMenuOpen ? "open" : ""}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
              <Link
                to="/"
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/register"
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Cadastro
              </Link>
              <Link
                to="/login"
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/T3l4d0@dm"
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Adm
              </Link>
              <Link
                to="/coment"
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Comentário
              </Link>
              <Link
                to="/timeline"
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Cronograma
              </Link>
            </div>
          </div>
        </nav>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/T3l4d0@dm" element={<Adm />} />
            <Route path="/coment" element={<Coment />} />
            <Route path="/register" element={<Register />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <footer className="footer">
          <h1>teste</h1>
        </footer>
      </div>
    </>
  );
}

export default App;
