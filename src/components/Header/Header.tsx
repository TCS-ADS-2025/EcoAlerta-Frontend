import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo-branca.png";
import { estaAutenticado, logout } from "../../service/auth";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/login"); // ou "/" se quiser redirecionar para home
  };

  const loggedIn = estaAutenticado();

  return (
    <header>
      <nav className="navbar">
        <div className="navbar-content">
          <Link
            to="/"
            className="navbar-logo"
            onClick={() => setIsMenuOpen(false)}
          >
            <img src={logo} alt="Eco Alerta Logo" className="logo-img" />
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
              to="/about"
              className="nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre Nós
            </Link>
            <Link
              to="/"
              className="nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Concientização
            </Link>
            <Link
              to="/timeline"
              className="nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Cronograma
            </Link>
            <Link
              to="/coment"
              className="nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Comentário
            </Link>

            {!loggedIn && (
              <>
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
              </>
            )}

            {loggedIn && (
              <button
                onClick={handleLogout}
                className="nav-link btn-logout"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "white",
                }}
              >
                Sair
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
