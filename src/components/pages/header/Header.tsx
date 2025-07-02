import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { estaAutenticado, logout } from "../../../service/auth";
import { getRole } from "../../../service/auth";
import logo from "../../../assets/logo-branca.png";
import "./Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const estaLogado = estaAutenticado();
  const role = getRole();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header>
      <nav className="navbar">
        <div className="navbar-content">
          <Link
            to="/sobre"
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
              to="/sobre"
              className="nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre Nós
            </Link>
            <Link
              to="/conscientizacao"
              className="nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Conscientização
            </Link>
            <Link
              to="/cronograma"
              className="nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Cronograma
            </Link>

            {estaLogado && (
              <>
                <Link
                  to="/comentario"
                  className="nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Comentário
                </Link>
              </>
            )}

            {!estaLogado && (
              <>
                <Link
                  to="/cadastro"
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

            {estaLogado && (
              <>
                {role !== "ADMIN" && (
                  <Link
                    to="/perfil"
                    className="nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Perfil
                  </Link>
                )}

                <button
                  className="nav-link"
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                >
                  Sair
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
