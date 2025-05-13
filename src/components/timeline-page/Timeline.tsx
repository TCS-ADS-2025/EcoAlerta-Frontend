import { ReactElement, useEffect, useState } from "react";
import { Bairro, CronogramaData } from "../../interface/CronogramaData";
import api from "../../service/api";

import Header from "../header/Header";
import Footer from "../footer/Footer";

import "./Timeline.css";

const diasSemana = [
  { api: "SEGUNDA", label: "Segunda-feira" },
  { api: "TERCA", label: "Terça-feira" },
  { api: "QUARTA", label: "Quarta-feira" },
  { api: "QUINTA", label: "Quinta-feira" },
  { api: "SEXTA", label: "Sexta-feira" },
  { api: "SABADO", label: "Sábado" },
  { api: "DOMINGO", label: "Domingo" },
];

const Timeline = (): ReactElement => {
  const [cronogramas, setCronogramas] = useState<Record<string, Bairro[]>>({});

  useEffect(() => {
    const fetchCronogramas = async () => {
      try {
        const response = await api.get<CronogramaData[]>("/cronogramas/listar");
        console.log("Dados recebidos:", response.data);

        const dadosAgrupados: Record<string, Bairro[]> = {};
        diasSemana.forEach((dia) => {
          dadosAgrupados[dia.label] = [];
        });

        response.data.forEach((item) => {
          const diaEncontrado = diasSemana.find(
            (d) => d.api === item.diaSemana.toUpperCase()
          );
          if (diaEncontrado) {
            dadosAgrupados[diaEncontrado.label].push(...item.bairros);
          }
        });

        setCronogramas(dadosAgrupados);
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
              {diasSemana.map((dia) => (
                <th key={dia.api}>{dia.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {diasSemana.map((dia) => (
                <td key={dia.api}>
                  <ul className="bairro-list">
                    {cronogramas[dia.label]?.length ? (
                      cronogramas[dia.label].map((bairro) => (
                        <li key={bairro.id} className="bairro-item">
                          {bairro.nomeBairro}
                        </li>
                      ))
                    ) : (
                      <li className="bairro-item vazio">Nenhum bairro</li>
                    )}
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
