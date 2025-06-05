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

  useEffect(() => {
    if (estaAutenticado()) {
      navigate("/");
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const endpoint = "/auth/login";
      const method = "post";

      const response = await api[method](endpoint, formData);

      if ([200, 201].includes(response.status)) {
        const token = response.data.token;
        login(token);
        alert(`Login realizado com sucesso!`);
        navigate("/");
      }
    } catch (err) {
      console.error("Erro ao realizar login:", err);
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
    </div>
  );
};

export default Login;
