import { ReactElement } from "react";
import { Card, Container } from "react-bootstrap";
import Header from "../header/Header";
import Footer from "../footer/Footer";

import "./About.css";
import mundo from "../../assets/mundo.png";
import lampada from "../../assets/lampada.png";
import folha from "../../assets/folha.png";
import folha2 from "../../assets/folha2.png";

const About = (): ReactElement => {
  return (
    <>
      <Header />

      <div className="main-container-1">
        <div className="welcome-container">
          <div className="welcome-title">
            <img src={folha} alt="Ícone de folha" />
            <h2>Bem-vindo ao Eco Alerta!</h2>
          </div>

          <span>
            <img id="mundo-img" src={mundo} alt="planeta terra" />
            Somos uma plataforma criada para ajudar você, cidadão de Criciúma,
            <br />a ficar por dentro dos dias certos da coleta seletiva no seu
            bairro!
          </span>

          <div className="register-now">
            <img src={lampada} alt="lampada" />
            <p id="lampada-img">
              Cadastre-se agora e receba alerta do dia da coleta seletiva
            </p>
            <img src={lampada} alt="lampada" />
          </div>
        </div>
      </div>

      <div className="main-container-2">
        <div className="advices-container">
          <div className="advices-title">
            <h2>Você encontra aqui</h2>
            <img src={folha2} alt="Ícone de folha" />
          </div>
          <div className="advice-grid">
            <Card className="advice-card">
              <Card.Body>
                <Card.Text>
                  Alertas automáticos com as datas da coleta de recicláveis
                </Card.Text>
                <button className="btn-card">Cadastre-se!</button>
              </Card.Body>
            </Card>
            <Card className="advice-card">
              <Card.Body>
                <Card.Text>
                  Dicas práticas sobre como separar o lixo corretamente
                </Card.Text>
                <button className="btn-card">Veja!</button>
              </Card.Body>
            </Card>
            <Card className="advice-card">
              <Card.Body>
                <Card.Text>
                  Informações atualizadas da Prefeitura sobre o serviço
                </Card.Text>
                <button className="btn-card">Cronograma!</button>
              </Card.Body>
            </Card>
            <Card className="advice-card">
              <Card.Body>
                <Card.Text>Opiniões dos cidadãos sobre o serviço</Card.Text>
                <button className="btn-card">Comente!</button>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default About;
