import { ReactElement, useEffect, useState } from "react";
import { Bairro, CronogramaData } from "../../interface/CronogramaData";
import api from "../../service/api";

import Header from "../header/Header";
import Footer from "../footer/Footer";

import "./Timeline.css";

const Timeline = (): ReactElement => {
  const [formData, setFormData] = useState<CronogramaData>({
    id: "",
    diaSemana: " ",
    bairros: [],
  });

  const [cronogramas, setCronogrmas] = useState<CronogramaData[]>([]);

  useEffect(() => {
    const fetchCronogramas = async () => {
      try {
        const response = await api.get("/cronogramas/listar");
        setCronogrmas(response.data);
      } catch (err) {
        console.error("Erro ao buscar cronogramas:", err);
      }
    };

    fetchCronogramas();
  }, []);

  return (
    <>
      <Header />

      <div className="timeline-container">
        <table>
          <thead>
            <tr>
              {cronogramas.map((item) => (
                <th key={item.id}>{item.diaSemana}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {cronogramas.map((item) => (
                <td key={item.id}>
                  <ul className="bairro-list">
                    {item.bairros.map((bairro: Bairro) => (
                      <li key={bairro.id} className="bairro-item">
                        {bairro.nomeBairro}
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <Footer />
    </>
  );
};

export default Timeline;
