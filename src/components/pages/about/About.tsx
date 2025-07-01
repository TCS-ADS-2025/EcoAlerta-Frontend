import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Header from "../header/Header";
import Footer from "../footer/Footer";

import "./About.css";
import mundo from "../../../assets/mundo.png";
import lampada from "../../../assets/lampada.png";
import folha from "../../../assets/folha.png";
import folha2 from "../../../assets/folha2.png";
import aviso from "../../../assets/card-3/aviso.png";
import info from "../../../assets/card-3/info.png";
import lixeiras from "../../../assets/card-3/lixeiras.png";
import megafone from "../../../assets/card-3/megafone.png";

const About = (): ReactElement => {
  return (
    <>
      <Header />

      <div className="main-container-1">
        <div className="welcome-container">
          <div className="welcome-title">
            <img src={folha} alt="Ícone de folha" />
            <h1>Bem-vindo ao Eco Alerta!</h1>
          </div>

          <div className="about-container">
            <img id="mundo-img" src={mundo} alt="planeta terra" />
            <p>Somos uma plataforma criada para ajudar você, cidadão de Criciúma,
              a ficar por dentro dos dias certos da coleta seletiva no seu
              bairro!
            </p>
          </div>

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
        <div className="notice-title">
          <h2>Você encontra aqui</h2>
          <img src={folha2} alt="Ícone de folha" />
        </div>
        <div className="notice-grid">
          <div>
            <Card className="notice-card border-0">
              <Card.Body>
                <img src={aviso} alt="Ícone de aviso" />
                <Card.Text>
                  Alertas automáticos com as datas da coleta de recicláveis
                </Card.Text>
                <Link to="/register">
                  <button className="btn-card">Cadastre-se!</button>
                </Link>
              </Card.Body>
            </Card>
          </div>

          <div>
            <Card className="notice-card border-0">
              <Card.Body>
                <img src={lixeiras} alt="Ícone de aviso" />
                <Card.Text>
                  Dicas práticas sobre como separar o lixo corretamente
                </Card.Text>
                <Link to="/">
                  <button className="btn-card">Veja!</button>
                </Link>
              </Card.Body>
            </Card>
          </div>

          <div>
            <Card className="notice-card border-0">
              <Card.Body>
                <img src={info} alt="Ícone de aviso" />
                <Card.Text>
                  Informações atualizadas da Prefeitura sobre o serviço
                </Card.Text>
                <Link to="/timeline">
                  <button className="btn-card">Cronograma!</button>
                </Link>
              </Card.Body>
            </Card>
          </div>

          <div>
            <Card className="notice-card border-0">
              <Card.Body>
                <img src={megafone} alt="Ícone de aviso" />
                <Card.Text>Opiniões dos cidadãos sobre o serviço</Card.Text>
                <Link to="/coment">
                  <button className="btn-card">Comente!</button>
                </Link>
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
