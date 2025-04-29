import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import "./Register.css";

const Cadastro = () => {
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
            Cadastre-se para ser lembrado semanalmente a retirar seu lixo
            reciclável
          </p>
        </Col>

        <Col
          md={6}
          className="d-flex flex-column justify-content-center align-items-center"
          id="right-side"
        >
          <div className="d-flex flex-column justify-content-center align-items-center">
            <h2 className="text-center mb-4">Cadastro</h2>
            <Form id="register-form" onSubmit={handleSubmit}>
              <Form.Group className="mb-3 form-group" controlId="nomeCompleto">
                <i className="bi bi-person top-50 start-0 translate-middle-y ms-3"></i>
                <Form.Control
                  className="ps-5 campos"
                  type="text"
                  placeholder="Nome completo"
                  name="nomeCompleto"
                />
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group className="mb-3 form-group" controlId="cep">
                    <i className="bi bi-geo-alt top-50 start-0 translate-middle-y ms-3"></i>
                    <Form.Control
                      className="ps-5 campos"
                      type="text"
                      placeholder="Cep"
                      name="cep"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3 form-group" controlId="cidade">
                    <i className="bi bi-geo-alt top-50 start-0 translate-middle-y ms-3"></i>
                    <Form.Control
                      className="ps-5 campos"
                      type="text"
                      placeholder="Cidade"
                      name="localidade"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3 form-group" controlId="logradouro">
                <i className="bi bi-geo-alt top-50 start-0 translate-middle-y ms-3"></i>
                <Form.Control
                  className="ps-5 campos"
                  type="text"
                  placeholder="Logradouro"
                  name="logradouro"
                />
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group className="mb-3 form-group" controlId="bairro">
                    <i className="bi bi-geo-alt top-50 start-0 translate-middle-y ms-3"></i>
                    <Form.Control
                      className="ps-5 campos"
                      type="text"
                      placeholder="Bairro"
                      name="bairroId"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3 form-group" controlId="numero">
                    <i className="bi bi-geo-alt top-50 start-0 translate-middle-y ms-3"></i>
                    <Form.Control
                      className="ps-5 campos"
                      type="text"
                      placeholder="Número"
                      name="numero"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3 form-group" controlId="complemento">
                <i className="bi bi-geo-alt top-50 start-0 translate-middle-y ms-3"></i>
                <Form.Control
                  className="ps-5 campos"
                  type="text"
                  placeholder="Complemento"
                  name="complemento"
                />
              </Form.Group>

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

              <div className="d-flex justify-content-center">
                <Button className="btn btn-success" type="submit">
                  Cadastrar
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Cadastro;
