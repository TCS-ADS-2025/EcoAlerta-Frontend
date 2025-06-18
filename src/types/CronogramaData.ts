export type Bairro = {
  id: string;
  nomeBairro: string;
  cronograma: {
    id: string;
    diaSemana: string;
  };
};

export type CronogramaData = {
  id: string;
  diaSemana: string;
  bairros: Bairro[];
};
