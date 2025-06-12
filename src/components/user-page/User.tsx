import { ReactElement, useEffect, useState } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import api from "../../service/api";
import "./User.css";

interface Endereco {
  cep: string;
  localidade: string;
  nomeBairro: string;
  logradouro: string;
  numero: string;
  complemento: string;
}

interface Usuario {
  nomeCompleto: string;
  email: string;
  endereco: Endereco;
}

const User = (): ReactElement => {
  const [formData, setFormData] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/usuarios/perfil");
        setFormData(response.data);
      } catch (error) {
        console.log("Erro ao buscar informações de usuário:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <Header />
      <div className="container-principal">
        <div className="info-usuario">
          {loading ? (
            <p>Carregando dados...</p>
          ) : formData ? (
            <>
              <h2>Perfil do Usuário</h2>
              <ul className="list-group">
                <li className="list-group-item">
                  <strong>Nome:</strong> {formData.nomeCompleto}
                </li>
                <li className="list-group-item">
                  <strong>Email:</strong> {formData.email}
                </li>
                <li className="list-group-item">
                  <strong>CEP:</strong> {formData.endereco.cep}
                </li>
                <li className="list-group-item">
                  <strong>Cidade:</strong> {formData.endereco.localidade}
                </li>
                <li className="list-group-item">
                  <strong>Bairro:</strong> {formData.endereco.nomeBairro}
                </li>
                <li className="list-group-item">
                  <strong>Logradouro:</strong> {formData.endereco.logradouro}
                </li>
                <li className="list-group-item">
                  <strong>Número:</strong> {formData.endereco.numero}
                </li>
                <li className="list-group-item">
                  <strong>Complemento:</strong> {formData.endereco.complemento}
                </li>
              </ul>
              <div className="container-buttons">
                <button className="btn btn-warning">Editar</button>
                <button className="btn btn-danger">Excluir</button>
              </div>
            </>
          ) : (
            <p>Erro ao carregar dados do usuário.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default User;
