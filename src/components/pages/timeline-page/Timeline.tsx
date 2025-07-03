import { ReactElement, useEffect, useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { Bairro, CronogramaData } from "../../../types/CronogramaData";
import api from "../../../service/api";
import { getRole } from "../../../service/auth";
import Message from "../../alerts/Message";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import "./Timeline.css";

const Timeline = (): ReactElement => {
  const role = getRole();
  const [cronograma, setCronograma] = useState<Record<string, CronogramaData>>({});
  const [todosBairros, setTodosBairros] = useState<Bairro[]>([]);
  const [diaSelecionado, setDiaSelecionado] = useState<string | null>(null);
  const [bairrosSelecionados, setBairrosSelecionados] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const diaColeta = ["SEGUNDA", "TERCA", "QUARTA", "QUINTA", "SEXTA", "SABADO"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cronogramaRes, bairrosRes] = await Promise.all([
          api.get<CronogramaData[]>("/cronogramas/listar"),
          api.get<Bairro[]>("/bairros/listar"),
        ]);

        const dadosAgrupados: Record<string, CronogramaData> = {};
        cronogramaRes.data.forEach((item) => {
          const dia = item.diaSemana.toUpperCase();
          dadosAgrupados[dia] = item;
        });

        setCronograma(dadosAgrupados);
        setTodosBairros(bairrosRes.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const isBairroUsado = (bairroId: string): boolean => {
    return Object.entries(cronograma).some(([dia, dados]) => {
      if (dia === diaSelecionado) return false; 
      return dados.bairros.some((b) => b.id === bairroId);
    });
  };

  const handleOpenModal = (dia: string) => {
    setDiaSelecionado(dia);
    setBairrosSelecionados(cronograma[dia]?.bairros.map((b) => b.id) || []);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setDiaSelecionado(null);
    setBairrosSelecionados([]);
  };

  const handleCheckboxChange = (bairroId: string) => {
    setBairrosSelecionados((prevSelecionados) => {
      if (prevSelecionados.includes(bairroId)) {
        return prevSelecionados.filter((id) => id !== bairroId);
      } else {
        return [...prevSelecionados, bairroId];
      }
    });
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess("");
    if (!diaSelecionado) return;

    const cronogramaDoDia = cronograma[diaSelecionado];
    const cronogramaId = cronogramaDoDia?.id;
    let novoId = "";

    const payload = {
      diaSemana: diaSelecionado,
      bairrosIds: bairrosSelecionados,
    };

    try {
      if (cronogramaId) {
        await api.put(`/cronogramas/atualizar/${cronogramaId}`, payload);
      } else {
        const response = await api.post("/cronogramas/cadastrar", payload);
        novoId = response.data.id;
      }
      setSuccess("Cronograma salvo com sucesso!");

      const bairrosAtualizados = todosBairros.filter((bairro) =>
        bairrosSelecionados.includes(bairro.id)
      );

      setCronograma((prev) => ({
        ...prev,
        [diaSelecionado]: {
          id: cronogramaId ?? novoId,
          diaSemana: diaSelecionado,
          bairros: bairrosAtualizados,
        },
      }));

      handleCloseModal();
    } catch (error) {
      console.error("Erro ao salvar cronograma:", error);
      setError("Erro ao salvar cronograma.");
    }
  };

  const handleDelete = async (dia: string) => {
    const cronogramaDoDia = cronograma[dia];
    const cronogramaId = cronogramaDoDia?.id;

    if (!cronogramaId) {
      setError("Nenhum cronograma encontrado para este dia.");
      return;
    }

    try {
      await api.delete(`/cronogramas/excluir/${cronogramaId}`);
      setSuccess("Cronograma excluído com sucesso!");

      setCronograma((prev) => {
        const novoEstado = { ...prev };
        delete novoEstado[dia];
        return novoEstado;
      });
    } catch (error) {
      console.error("Erro ao excluir cronograma:", error);
      setError("Erro ao excluir cronograma.");
    }
  };

  return (
    <>
      <Header />

      {success && <Message type="success" message={success} onClose={() => setSuccess("")} />}
      {error && <Message type="error" message={error} onClose={() => setError("")} />}

      <div className="timeline-container">
        <table className="table tabela-cronograma table-bordered table-fixed text-center">
          <thead>
            <tr>
              <th colSpan={7} id="titulo-tabela">
                Coleta Seletiva em Criciúma-SC
              </th>
            </tr>
            <tr>
              {diaColeta.map((dia) => (
                <th key={dia}>{dia}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {diaColeta.map((dia) => (
                <td key={dia}>
                  <ul className="list-unstyled bairro-list">
                    {cronograma[dia]?.bairros.length ? (
                      cronograma[dia].bairros.map((bairro) => (
                        <li key={bairro.id} className="bairro-item">
                          {bairro.nomeBairro}
                        </li>
                      ))
                    ) : (
                      <li className="text-muted">Nenhum bairro</li>
                    )}
                  </ul>
                </td>
              ))}
            </tr>
            {role === "ADMIN" && (
              <tr>
                {diaColeta.map((dia) => (
                  <td key={`${dia}-btn`} className="text-center">
                    <div className="linha-btn">
                      <button
                        className="btn btn-warning"
                        onClick={() => handleOpenModal(dia)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(dia)}
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                ))}
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar bairros de {diaSelecionado}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {todosBairros.map((bairro) => (
              <Form.Check
                key={bairro.id}
                type="checkbox"
                label={bairro.nomeBairro}
                checked={bairrosSelecionados.includes(bairro.id)}
                onChange={() => handleCheckboxChange(bairro.id)}
                disabled={isBairroUsado(bairro.id)} 
              />
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleCloseModal}>
            Cancelar
          </button>
          <button className="btn btn-success" onClick={handleSubmit}>
            Salvar
          </button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </>
  );
};

export default Timeline;
