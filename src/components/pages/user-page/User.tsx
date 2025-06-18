import { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../../../types/UserData";
import { Modal, Form } from "react-bootstrap";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import api from "../../../service/api";
import { logout } from "../../../service/auth";
import { BairroData } from "../../../types/BairroData";
import Message from "../alerts/Message";
import ConfirmationModal from "../../ConfirmationModal";
import "./User.css";

const User = (): ReactElement => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [bairros, setBairros] = useState<BairroData[]>([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleDeleteClick = () => setShowDeleteConfirm(true);
  const handleCloseDeleteConfirm = () => setShowDeleteConfirm(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/usuarios/perfil");
        setFormData(response.data);
      } catch (error) {
        console.log("Erro ao buscar informações de usuário:", error);
        setError("Erro ao buscar informações de usuário");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchBairros = async () => {
      try {
        const response = await api.get("/bairros/listar");
        setBairros(response.data);
      } catch (err) {
        console.error("Erro ao buscar bairros:", err);
        setError("Erro ao buscar bairros");
      }
    };

    fetchBairros();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (!formData) return;

    const { name, value } = e.target;

    if (name === "bairroId") {
      setFormData({
        ...formData,
        endereco: {
          ...formData.endereco,
          bairroId: value,
        },
      });
    } else if (name in formData.endereco) {
      setFormData({
        ...formData,
        endereco: {
          ...formData.endereco,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleUpdate = async () => {
    if (!formData) return;

    const payload = {
      nomeCompleto: formData.nomeCompleto,
      email: formData.email,
      cep: formData.endereco.cep,
      bairroId: formData.endereco.bairroId,
      logradouro: formData.endereco.logradouro,
      numero: formData.endereco.numero,
      complemento: formData.endereco.complemento,
    };

    try {
      await api.put(`/usuarios/atualizar/${formData.id}`, payload);
      setSuccess("Usuário atualizado com sucesso!");
      setShowModal(false);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      setError("Erro ao atualizar dados");
    }
  };

  const handleDelete = async () => {
    handleCloseDeleteConfirm();

    if (!formData) {
      return;
    }

    try {
      await api.delete(`/usuarios/excluir/${formData.id}`);
      setSuccess("Conta excluída com sucesso!");
      logout();
    } catch (error) {
      console.error("Erro ao excluir conta:", error);
      setError("Erro ao excluir conta");
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <Header />

      {success && (<Message type="success" message={success} onClose={() => setSuccess("")}/>)}
      {error && (<Message type="error" message={error} onClose={() => setError("")} />)}

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
                <button className="btn btn-warning" onClick={handleOpenModal}>
                  Editar
                </button>
                <button className="btn btn-danger" onClick={handleDeleteClick}>
                  Excluir
                </button>
              </div>
            </>
          ) : (
            <p>Erro ao carregar dados do usuário.</p>
          )}
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Nome Completo</Form.Label>
              <Form.Control
                type="text"
                name="nomeCompleto"
                value={formData?.nomeCompleto}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData?.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>CEP</Form.Label>
              <Form.Control
                type="text"
                name="cep"
                value={formData?.endereco.cep}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Bairro</Form.Label>
              <Form.Select
                name="bairroId"
                value={formData?.endereco.bairroId}
                onChange={handleChange}
              >
                <option value="">Selecione o bairro</option>
                {bairros.map((bairro) => (
                  <option key={bairro.id} value={bairro.id}>
                    {bairro.nomeBairro}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Logradouro</Form.Label>
              <Form.Control
                type="text"
                name="logradouro"
                value={formData?.endereco.logradouro}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Número</Form.Label>
              <Form.Control
                type="text"
                name="numero"
                value={formData?.endereco.numero}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Complemento</Form.Label>
              <Form.Control
                type="text"
                name="complemento"
                value={formData?.endereco.complemento}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleCloseModal}>
            Cancelar
          </button>
          <button className="btn btn-success" onClick={handleUpdate}>
            Salvar
          </button>
        </Modal.Footer>
      </Modal>

      <ConfirmationModal
        show={showDeleteConfirm}
        title="Confirmação de Exclusão"
        message="Tem certeza que deseja excluir sua conta? Esta ação é irreversível."
        onConfirm={handleDelete}
        onCancel={handleCloseDeleteConfirm}
        confirmText="Sim"
        cancelText="Não"
        confirmVariant="danger"
      />

      <Footer />
    </>
  );
};

export default User;
