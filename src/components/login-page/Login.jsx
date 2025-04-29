import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import "./Login.css";
import logo from "../../assets/logo-sem-fundo.jpg";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <Container fluid className="vh-100 d-flex p-0">
      <Row className="flex-grow-1">
        <Col
          md={6}
          className="d-flex flex-column justify-content-center align-items-center"
          id="left-side"
        >
          <h1>Bem-Vindo!</h1>
          <p className="text-center px-5">
            Sistema de notificação e conscientização da coleta seletiva
          </p>
        </Col>

        <Col
          md={6}
          className="d-flex flex-column justify-content-center align-items-center"
          id="right-side"
        >
          <div
            id="container-form"
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <img id="logo" src={logo} alt="Eco Alerta logo" />
            <h2 className="text-center mb-3">Login</h2>
            <Form id="register-form" onSubmit={handleSubmit}>
              <Form.Group className="mb-3 form-group" controlId="email">
                <i className="bi bi-envelope top-50 start-0 translate-middle-y ms-3"></i>
                <Form.Control
                  className="ps-5 campos"
                  type="email"
                  placeholder="E-mail"
                  name="email"
                />
              </Form.Group>

              <Form.Group className="mb-4 form-group" controlId="senha">
                <i className="bi bi-lock top-50 start-0 translate-middle-y ms-3"></i>
                <Form.Control
                  className="ps-5 campos"
                  type="password"
                  placeholder="Senha"
                  name="senha"
                />
              </Form.Group>

              <div className="d-flex justify-content-around mb-4 links">
                <a href="register">Cadastrar-se</a>
                <a href="#">Esqueci minha senha</a>
              </div>

              <div className="d-flex justify-content-center">
                <Button className="btn btn-success" type="submit">
                  Entrar
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
