import React, { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";

import api from "../../service/api";
import { cadastro } from "../../service/auth";

import { UserData } from "../../interface/UserData";
import { BairroData } from "../../interface/BairroData";

import "./Register.css";
import Header from "../header/Header";

const Cadastro = (): ReactElement => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<UserData>({
    nomeCompleto: "",
    email: "",
    cep: "",
    bairroId: "",
    localidade: "Criciúma",
    logradouro: "",
    numero: "",
    complemento: "",
    senha: "",
  });

  const [bairros, setBairros] = useState<BairroData[]>([]);

  useEffect(() => {
    const fetchBairros = async () => {
      try {
        const response = await api.get("/bairros/listar");
        setBairros(response.data);
      } catch (err) {
        console.error("Erro ao buscar bairros:", err);
      }
    };

    fetchBairros();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint = "/auth/register";
      const method = "post";
      const response = await api[method](endpoint, formData);

      if ([200, 201].includes(response.status)) {
        const token = response.data.token;
        cadastro(token);
        alert(`Usuário cadastrado com sucesso!`);
        navigate("/");
      }
    } catch (err) {
      console.error("Erro ao realizar login:", err);
    } finally {
      setLoading(false);
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
          id="left-side-register"
        >
          <h1>Bem-Vindo!</h1>
          <p className="text-center px-3 px-md-5">
            Cadastre-se para ser lembrado semanalmente a retirar seu lixo
            reciclável
          </p>
        </Col>

        <Col
          xs={12}
          md={6}
          className="d-flex flex-column justify-content-center align-items-center"
          id="right-side-register"
        >
          <div className="d-flex flex-column justify-content-center align-items-center">
            <h2 className="text-center mb-4">Cadastro</h2>
            <Form id="register-form" onSubmit={handleSubmit}>
              <Form.Group className="mb-3 form-group" controlId="nomeCompleto">
                <i className="bi bi-person top-50 start-0 translate-middle-y ms-3"></i>
                <Form.Control
                  className="ps-5 register-campos"
                  type="text"
                  placeholder="Nome completo"
                  name="nomeCompleto"
                  value={formData.nomeCompleto}
                  onChange={handleChange}
                />
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group className="mb-3 form-group" controlId="cep">
                    <i className="bi bi-geo-alt top-50 start-0 translate-middle-y ms-3"></i>
                    <Form.Control
                      className="ps-5 register-campos"
                      type="text"
                      placeholder="Cep"
                      name="cep"
                      value={formData.cep}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3 form-group" controlId="bairroId">
                    <i className="bi bi-geo-alt top-50 start-0 translate-middle-y ms-3"></i>
                    <Form.Select
                      className="ps-5 register-campos"
                      name="bairroId"
                      value={formData.bairroId}
                      onChange={handleChange}
                      onFocus={(e) =>
                        e.target.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        })
                      }
                    >
                      <option value="">Bairro</option>
                      {bairros.map((bairro) => (
                        <option key={bairro.id} value={bairro.id}>
                          {bairro.nomeBairro}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3 form-group" controlId="logradouro">
                <i className="bi bi-geo-alt top-50 start-0 translate-middle-y ms-3"></i>
                <Form.Control
                  className="ps-5 register-campos"
                  type="text"
                  placeholder="Logradouro"
                  name="logradouro"
                  value={formData.logradouro}
                  onChange={handleChange}
                />
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group className="mb-3 form-group" controlId="cidade">
                    <i className="bi bi-geo-alt top-50 start-0 translate-middle-y ms-3"></i>
                    <Form.Control
                      className="ps-5 register-campos"
                      type="text"
                      placeholder="Cidade"
                      name="localidade"
                      value={formData.localidade}
                      disabled
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3 form-group" controlId="numero">
                    <i className="bi bi-geo-alt top-50 start-0 translate-middle-y ms-3"></i>
                    <Form.Control
                      className="ps-5 register-campos"
                      type="text"
                      placeholder="Número"
                      name="numero"
                      value={formData.numero}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3 form-group" controlId="complemento">
                <i className="bi bi-geo-alt top-50 start-0 translate-middle-y ms-3"></i>
                <Form.Control
                  className="ps-5 register-campos"
                  type="text"
                  placeholder="Complemento"
                  name="complemento"
                  value={formData.complemento}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3 form-group" controlId="email">
                <i className="bi bi-envelope top-50 start-0 translate-middle-y ms-3"></i>
                <Form.Control
                  className="ps-5 register-campos"
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
                  className="ps-5 register-campos"
                  type="password"
                  placeholder="Senha"
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                />
              </Form.Group>

              <div className="d-flex justify-content-center">
                <Button
                  className="register-form-btn btn-success"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Cadastrando..." : "Cadastrar"}
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Cadastro;
