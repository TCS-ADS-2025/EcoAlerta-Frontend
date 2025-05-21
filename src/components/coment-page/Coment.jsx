import Header from "../header/Header";
import Footer from "../footer/Footer";
import "../coment-page/Coment.css";

const Coment =
  () => {
    // Dados dos comentários (pode vir de uma API no futuro)
    const comments =
      [
        {
          id: 1,
          name: "Francis Morphy",
          time: "7 Days ago",
          text: "This comments system looks very decent. 8/10.",
          likes: 27,
        },
        {
          id: 2,
          name: "Maria Sharapova",
          time: "5 Days ago",
          text: "Lorem ipsum dolor.",
          likes: 21,
        },
        {
          id: 3,
          name: "Marvon Samuels",
          time: "2 Days ago",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
          likes: 15,
        },
        {
          id: 4,
          name: "OMG",
          time: "3 Days ago",
          text: "🔍🔍🔍 Lorem ipsum dolor.",
          likes: 9,
        },
        {
          id: 5,
          name: "Kevin Justong",
          time: "11 Days ago",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
          likes: 4,
        },
        {
          id: 6,
          name: "Xiaomifanboy",
          time: "7 Hours ago",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          likes: 3,
        },
      ];

    return (
      <>
        <Header />
        <div className="d-flex flex-column min-vh-100">
          <main className="main-container">
            <section className="input-1-section">
              <h1>
                Comentários
              </h1>
              <textarea
                className="comment-input"
                placeholder="Deixe um comentário"
                rows="3"
              />
              <button className="submit-button">
                Enviar
              </button>
            </section>
 
            <section className="comment-section">
              <div className="comment-header">
                <span>
                  {
                    comments.length
                  }{" "}
                  Respostas
                </span>
                <div className="sort-options">
                  <button className="active">
                    Newest
                  </button>
                  <button>
                    Most
                    Liked
                  </button>
                  <button>
                    Oldest
                  </button>
                </div>
              </div>

              <div className="comments-list">
                {comments.map(
                  (
                    comment
                  ) => (
                    <div
                      key={
                        comment.id
                      }
                      className="comment-card"
                    >
                      <div className="comment-header">
                        <span className="comment-likes">
                          {
                            comment.likes
                          }
                        </span>
                        <h3 className="comment-name">
                          {
                            comment.name
                          }
                        </h3>
                        <span className="comment-time">
                          {
                            comment.time
                          }
                        </span>
                      </div>
                      <p className="comment-text">
                        {
                          comment.text
                        }
                      </p>
                    </div>
                  )
                )}
              </div>
            </section>
          </main>
        </div>
        <Footer />
      </>
    );
  };

export default Coment;
