import logo from "../../../assets/logo-branca.png"
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <img className="logo" src={logo} alt="logo" />
      <p>&copy;Eco Alerta 2025 | All rights reserved</p>
      <div className="links">
        <div className="contact">
          <i className="bi bi-instagram"></i>
          <a href="https://www.instagram.com/ecoalerta.cri/" target="_blank">
            @ecoalerta.cri
          </a>
        </div>
        <div className="contact">
          <i className="bi bi-globe-americas"></i>
          <a href="https://criciuma.webbrain.app.br/sites/156Brain/" target="_blank">Prefeitura</a>
        </div>
        <div className="contact">
          <i className="bi bi-telephone"></i>
          <a href="https://api.whatsapp.com/send?phone=5548999010919" target="_blank">RACLI - Criciúma</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
