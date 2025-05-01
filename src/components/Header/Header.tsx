import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo-branca.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header>
      <nav className="navbar">
        <div className="navbar-content">
          <Link to="/" className="navbar-logo">
            <img
              src={logo}
              alt="Eco Alerta Logo"
              className="logo-img"
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
    </header>
  );
};

export default Header;
