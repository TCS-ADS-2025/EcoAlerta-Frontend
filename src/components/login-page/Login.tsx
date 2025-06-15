import React, { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";

import api from "../../service/api";
import { estaAutenticado, login } from "../../service/auth";
import { LoginData } from "./../../interface/LoginData";

import "./Login.css";
import logo from "../../assets/logo-verde-sem-fundo.png";
import Header from "../header/Header";
import Footer from "../footer/Footer";

const Login = (): ReactElement => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginData>({ email: "", senha: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (estaAutenticado()) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!formData.email || !formData.senha) {
      setError("Por favor, preencha todos os campos");
      return;
    }

    try {
      const response = await api.post("/auth/login", formData);

      if (response.status === 200) {
        const { token, role } = response.data;
        login(token); 
        
        if (role === 'ADMIN') {
          navigate("/T3l4d0@dm");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      console.error("Erro ao realizar login:", err);
      setError("E-mail ou senha incorretos");
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Row className="flex-grow-1 mt-0">
        <Col
          xs={12}
          md={6}
          className="d-flex flex-column justify-content-center align-items-center"
          id="left-side-login"
        >
          <h1>Bem-Vindo!</h1>
          <p className="text-center px-3 px-md-5">
            Sistema de notificação e conscientização da coleta seletiva
          </p>
        </Col>

        <Col
          xs={12}
          md={6}
          className="d-flex flex-column justify-content-center align-items-center"
          id="right-side-login"
        >
          <div
            id="login-form"
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <img id="logo" src={logo} alt="Eco Alerta logo" />
            <h2 className="text-center mb-3">Login</h2>
            
            {error && <div className="alert alert-danger">{error}</div>}
            
            <Form id="register-form" onSubmit={handleSubmit}>
              <Form.Group className="mb-3 form-group" controlId="email">
                <i className="bi bi-envelope top-50 start-0 translate-middle-y ms-3"></i>
                <Form.Control
                  className="ps-5 login-campos"
                  type="email"
                  placeholder="E-mail"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4 form-group" controlId="senha">
                <i className="bi bi-lock top-50 start-0 translate-middle-y ms-3"></i>
                <Form.Control
                  className="ps-5 login-campos"
                  type="password"
                  placeholder="Senha"
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <div className="d-flex justify-content-around mb-4 links">
                <a href="register">Cadastrar-se</a>
                <a href="#">Esqueci minha senha</a>
              </div>

              <div className="d-flex justify-content-center">
                <Button className="login-form-btn btn-success" type="submit">
                  Entrar
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
      <Footer />
    </div>
  );
};

export default Login;