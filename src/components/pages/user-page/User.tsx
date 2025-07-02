import { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../../../types/UserData";
import { Modal, Form } from "react-bootstrap";
import Header from "../header/Header";
import api from "../../../service/api";
import { logout } from "../../../service/auth";
import { formatarCEP } from '../../helpers/formatarCEP';
import { BairroData } from "../../../types/BairroData";
import Message from "../../alerts/Message";
import ConfirmationModal from "../../ConfirmationModal";
import logo from "../../../assets/logo-branca.png"
import user from "../../../assets/user.png"
import "./User.css";

const User = (): ReactElement => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserData | null>(null);
  const [editData, setEditData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [bairros, setBairros] = useState<BairroData[]>([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [viaCepData, setViaCepData] = useState({
    logradouro: "",
    localidade: "",
  });

  const handleOpenModal = () => {
    setEditData(formData ? { ...formData } : null);
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);
  const handleDeleteClick = () => setShowDeleteConfirm(true);
  const handleCloseDeleteConfirm = () => setShowDeleteConfirm(false);

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

  useEffect(() => {
    fetchUser();
  }, []);

  const buscarEnderecoPorCep = async (cep: string) => {
    try {
      const response = await api.get(`/consulta-cep/${cep}`);
      const dados = response.data;

      if (!editData) {
        console.warn("editData está nulo, abortando atualização do endereço");
        return;
      }

      setEditData(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          endereco: {
            ...prev.endereco,
            cep: dados.cep || "",
            logradouro: dados.logradouro || "",
            localidade: "Criciúma",
          },
        };
      });

      setViaCepData({
        logradouro: dados.logradouro || "",
        localidade: "Criciúma",
      });

    } catch (error) {
      console.error("Erro ao buscar endereço pelo CEP:", error);
      setError("CEP inválido ou não encontrado");
    }
  };

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!editData) return;

    const { name, value } = e.target;

    if (name === "bairroId") {
      setEditData({
        ...editData,
        endereco: {
          ...editData.endereco,
          bairroId: value,
        },
      });
    } else if (name === "cep") {
      const somenteNumeros = value.replace(/\D/g, '');
      setEditData(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          endereco: {
            ...prev.endereco,
            cep: formatarCEP(somenteNumeros),
          },
        };
      });
    } else if (name in editData.endereco) {
      setEditData({
        ...editData,
        endereco: {
          ...editData.endereco,
          [name]: value,
        },
      });
    } else {
      setEditData({
        ...editData,
        [name]: value,
      });
    }
  };

  const handleUpdate = async () => {
    if (!editData) return;

    const payload = {
      nomeCompleto: editData.nomeCompleto,
      email: editData.email,
      cep: editData.endereco.cep,
      bairroId: editData.endereco.bairroId,
      logradouro: editData.endereco.logradouro,
      numero: editData.endereco.numero,
      complemento: editData.endereco.complemento,
    };

    try {
      await api.put(`/usuarios/atualizar/${editData.id}`, payload);
      setFormData(editData);
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

      {success && (<Message type="success" message={success} onClose={() => setSuccess("")} />)}
      {error && (<Message type="error" message={error} onClose={() => setError("")} />)}

      <div className="perfil-container">
        <div className="d-flex flex-column lado-esquerdo">
          <img id="logo-perfil" src={logo} alt="Logo Eco Alerta" />
        </div>

        <div className="lado-direito">
          <div className="d-flex flex-column info-usuario">
            {loading ? (
              <p>Carregando dados...</p>
            ) : formData ? (
              <>
                <div className="cabecalho-perfil">
                  <img className="imagem-perfil" src={user} alt="Ícone de usuário" />
                  <div className="nome-perfil">
                    <p>{formData.nomeCompleto}</p>
                  </div>
                </div>

                <div className="d-flex flex-column container-lista">
                  <ul className="lista-dados">
                    <li className="item-lista">
                      <strong>Email:</strong> {formData.email}
                    </li>
                    <li className="item-lista">
                      <strong>CEP:</strong> {formatarCEP(formData.endereco.cep || '')}
                    </li>
                    <li className="item-lista">
                      <strong>Cidade:</strong> {formData.endereco.localidade}
                    </li>
                    <li className="item-lista">
                      <strong>Bairro:</strong> {formData.endereco.nomeBairro}
                    </li>
                    <li className="item-lista">
                      <strong>Logradouro:</strong> {formData.endereco.logradouro}
                    </li>
                    <li className="item-lista">
                      <strong>Número:</strong> {formData.endereco.numero}
                    </li>
                    <li className="item-lista">
                      <strong>Complemento:</strong> {formData.endereco.complemento}
                    </li>
                  </ul>
                </div>
                <div className="container-buttons">
                  <button className="btn btn-warning btn-perfil" onClick={handleOpenModal}>
                    Editar
                  </button>
                  <button className="btn btn-danger btn-perfil" onClick={handleDeleteClick}>
                    Excluir
                  </button>
                </div>
              </>
            ) : (
              <p>Erro ao carregar dados do usuário.</p>
            )}
          </div>
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
                value={editData?.nomeCompleto}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={editData?.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>CEP</Form.Label>
              <Form.Control
                type="text"
                name="cep"
                value={editData?.endereco.cep}
                onChange={handleChange}
                onBlur={(e) => buscarEnderecoPorCep(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Bairro</Form.Label>
              <Form.Select
                name="bairroId"
                value={editData?.endereco.bairroId}
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
                value={editData?.endereco.logradouro}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Número</Form.Label>
              <Form.Control
                type="text"
                name="numero"
                value={editData?.endereco.numero}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Complemento</Form.Label>
              <Form.Control
                type="text"
                name="complemento"
                value={editData?.endereco.complemento}
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
    </>
  );
};

export default User;
