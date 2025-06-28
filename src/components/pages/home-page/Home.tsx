import { ReactElement } from "react";
import { Container, Card } from "react-bootstrap";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import coleta from "../../../assets/coleta-seletiva-port.png";
import separacao from "../../../assets/card-1/separacao.png";
import limpeza from "../../../assets/card-1/limpeza.png";
import reaproveitamento from "../../../assets/card-1/reaproveitamento.png";
import reciclagem from "../../../assets/card-1/reciclagem.png";
import reduza from "../../../assets/card-1/reduza.png";
import eletronico from "../../../assets/card-1/eletronico.png";
import papel from "../../../assets/card-2/papel.png";
import fralda from "../../../assets/card-2/fralda.png";
import cigarro from "../../../assets/card-2/cigarro.png";
import chiclete from "../../../assets/card-2/chiclete.png";
import copo from "../../../assets/card-2/copo.png";
import vidro from "../../../assets/card-2/vidro.png";
import "./Home.css";

const Home = (): ReactElement => {
  return (
    <>
      <Header />

      <Container
        id="container-1"
        className="d-flex flex-column justify-content-center align-items-center py-5"
      >
        <section className="section-1 ">
          <div className="container-section-1">
            <span id="span-yellow" className="span-group">
              VOCÊ
            </span>
            <span className="span-group span-brown">SEPARA O LIXO</span>
            <span id="span-blue" className="span-group">
              CORRETAMENTE?
            </span>
            <p>
              Separar o lixo é um gesto <br /> simples que faz uma <br />
              grande diferença!
              <br />
              Quando reciclamos corretamente,
              <br />
              ajudamos a reduzir a poluição,
              <br />
              economizamos recursos naturais <br />
              e damos um destino sustentável <br />
              aos resíduos!
            </p>
          </div>

          <img id="coleta-image" src={coleta} alt="Tipos de lixo" />
        </section>
      </Container>

      <div id="container-2">
        <span id="span-brown-2" className="span-group span-brown">
          COMO SEPARAR?
        </span>
        <div className="card-grid">
          <Card className="card-green">
            <Card.Body>
              <img className="card-image" src={separacao} alt="" />
              <Card.Title>SEPARAÇÃO</Card.Title>
              <Card.Text>Divida o lixo seco e úmido corretamente.</Card.Text>
            </Card.Body>
          </Card>
          <Card className="card-green">
            <Card.Body>
              <img className="card-image" src={limpeza} alt="" />
              <Card.Title>LIMPEZA</Card.Title>
              <Card.Text>
                Lave os recicláveis para evitar contaminação.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="card-green">
            <Card.Body>
              <img className="card-image" src={reaproveitamento} alt="" />
              <Card.Title>REAPROVEITAMENTO</Card.Title>
              <Card.Text>
                Dê novos usos aos materiais que puder reutilizar.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="card-green">
            <Card.Body>
              <img className="card-image" src={reciclagem} alt="" />
              <Card.Title>RECICLAGEM</Card.Title>
              <Card.Text>
                Descarte corretamente os materiais recicláveis.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="card-green">
            <Card.Body>
              <img className="card-image" src={reduza} alt="" />
              <Card.Title>REDUZA</Card.Title>
              <Card.Text>
                Consuma de forma consciente e evite desperdícios.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="card-green">
            <Card.Body>
              <img className="card-image" src={eletronico} alt="" />
              <Card.Title>LIXO ESPECIAL</Card.Title>
              <Card.Text>
                Pilhas, baterias e eletrônicos vão em pontos específicos.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>

      <div id="container-3">
        <div className="banner">
          <div className="icon">⏳</div>
          <p>
            Tempo de decomposição <br />
            dos materiais!
          </p>
        </div>
        <div className="card-grid-2">
          <Card className="card-2">
            <Card.Body>
              <img className="card-image" src={papel} alt="" />
              <Card.Title>PAPEL</Card.Title>
              <Card.Text>3 a 6 meses</Card.Text>
            </Card.Body>
          </Card>
          <Card className="card-2">
            <Card.Body>
              <img className="card-image" src={fralda} alt="" />
              <Card.Title>FRALDA DESCARTÁVEL</Card.Title>
              <Card.Text>450 a 600 anos</Card.Text>
            </Card.Body>
          </Card>
          <Card className="card-2">
            <Card.Body>
              <img className="card-image" src={cigarro} alt="" />
              <Card.Title>BITUCA DE CIGARRO</Card.Title>
              <Card.Text>2 anos</Card.Text>
            </Card.Body>
          </Card>
          <Card className="card-2">
            <Card.Body>
              <img className="card-image" src={chiclete} alt="" />
              <Card.Title>CHICLETE</Card.Title>
              <Card.Text>5 anos</Card.Text>
            </Card.Body>
          </Card>
          <Card className="card-2">
            <Card.Body>
              <img className="card-image" src={copo} alt="" />
              <Card.Title>COPO DE PLÁSTICO</Card.Title>
              <Card.Text>50 anos</Card.Text>
            </Card.Body>
          </Card>
          <Card className="card-2">
            <Card.Body>
              <img className="card-image" src={vidro} alt="" />
              <Card.Title>VIDRO</Card.Title>
              <Card.Text>4 mil anos</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
