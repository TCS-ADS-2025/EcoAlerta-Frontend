import React from "react";
import logo from "../../assets/logo-sem-fundo.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

const Login = () => {
  return (
    <div className="container-fluid vh-100 d-flex p-0">
      <div className="row flex-grow-1">
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center left-side">
          <h1 className="mb-3">Bem-Vindo!</h1>
          <p className="text-center px-5">
            Sistema de notificação e conscientização da coleta seletiva
          </p>
        </div>

        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center right-side">
          <img src={logo} alt="Eco Alerta logo" className="logo" />

          <h2 className="mb-4">Login</h2>

          <form className="login-form">
            <div className="form-group mb-3 position-relative">
              <i className="bi bi-envelope position-absolute top-50 start-0 translate-middle-y ms-3"></i>
              <input
                type="email"
                className="form-control ps-5"
                placeholder="E-mail"
              />
            </div>

            <div className="form-group mb-3 position-relative">
              <i className="bi bi-lock position-absolute top-50 start-0 translate-middle-y ms-3"></i>
              <input
                type="password"
                className="form-control ps-5"
                placeholder="Senha"
              />
            </div>

            <div className="d-flex justify-content-around mb-3 links">
              <a href="#">Cadastrar-se</a>
              <a href="#">Esqueci minha senha</a>
            </div>
            <button type="button" className="btn btn-success login-button">
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;