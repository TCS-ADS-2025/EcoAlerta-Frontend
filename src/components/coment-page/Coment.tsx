import React, { useState, useEffect, ReactElement } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import "../coment-page/Coment.css";
import api from "../../service/api";
import { CategoriaComentario } from "./CategoriaComentario";
import { Comentario } from "../../interface/Comentario";
import { isAdmin } from "../../service/auth";
import { UserData } from "../../interface/UserData";

const Coment = (): ReactElement => {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [novoComentario, setNovoComentario] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<CategoriaComentario | "">("");
  const [adminStatus, setAdminStatus] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    carregarComentarios();
    setAdminStatus(isAdmin());
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [categoriaFiltro]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const carregarComentarios = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/comentarios/listar");
      const comentariosOrdenados = response.data.sort((a: Comentario, b: Comentario) => {
        return new Date(b.dataHora).getTime() - new Date(a.dataHora).getTime();
      });
      setComentarios(comentariosOrdenados);
    } catch (err) {
      setError("Erro ao carregar comentários");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!novoComentario.trim() || !categoriaSelecionada) {
      setError("Por favor, preencha todos os campos");
      return;
    }

    try {
      setIsLoading(true);
      await api.post("/comentarios/cadastrar", {
        texto: novoComentario,
        categoriaComentario: categoriaSelecionada,
      });

      await carregarComentarios();

      setNovoComentario("");
      setCategoriaSelecionada("");
      setError("");
    } catch (err) {
      setError("Erro ao enviar comentário");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
    {
      isLoading && <div className="loading-indicator">Enviando...</div>;
    }
  };

  const handleExcluir = async (id: string) => {
    try {
      await api.delete(`/comentarios/excluir/${id}`);
      setComentarios(comentarios.filter((c) => c.id !== id));
    } catch (err) {
      setError("Erro ao excluir comentário");
      console.error(err);
    }
  };

  return (
    <>
      <Header />
      <div className="d-flex flex-column min-vh-100">
        <main className="main-container">
          <section className="input-1-section">
            <h1>Comentários</h1>
            <form onSubmit={handleSubmit}>
              <textarea
                className="comment-input"
                placeholder="Deixe um comentário"
                value={novoComentario}
                onChange={(e) => setNovoComentario(e.target.value)}
                rows={3}
              />
              <select
                value={categoriaSelecionada}
                onChange={(e) => setCategoriaSelecionada(e.target.value as CategoriaComentario)}
                className="comment-input"
                required
              >
                <option value="">Selecione...</option>
                {Object.values(CategoriaComentario).map((categoria) => (
                  <option key={categoria} value={categoria}>
                    {categoria.replace(/_/g, " ").toUpperCase()}
                  </option>
                ))}
              </select>
              <button className="submit-button" type="submit" disabled={isLoading}>
                {isLoading ? "Enviando..." : "Enviar"}
              </button>
            </form>
            {error && <div className="error-message">{error}</div>}
          </section>

          <section className="comment-section">
            {isLoading ? (
              <div>Carregando comentários...</div>
            ) : (
              <div className="comments-list">
                {comentarios.map((comentario) => (
                  <div key={comentario.id} className="comment-card">
                    <div className="comment-header">
                      <h3 className="comment-name">{comentario.nomeUsuario}</h3>                      
                      <div className="comment-time">
                        {new Date(comentario.dataHora).toLocaleDateString()}
                      </div>
                      {adminStatus && (
                        <button
                          onClick={() => handleExcluir(comentario.id)}
                          className="delete-button"
                        >
                          Excluir
                        </button>
                      )}
                    </div>
                    <p className="comment-text">{comentario.texto}</p>
                    <div className="comment-category">
                      {comentario.categoriaComentario.replace(/_/g, " ").toLowerCase()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
      <button
        onClick={scrollToTop}
        className={`back-to-top ${showBackToTop ? "visible" : ""}`}
        aria-label="Voltar ao topo"
        title="Voltar ao topo"
      />
      <Footer />
    </>
  );
};
export default Coment;
