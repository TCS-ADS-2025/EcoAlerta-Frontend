export interface Endereco {
  id: string;
  cep?: string;
  localidade: string;
  bairroId: string;
  nomeBairro: string;
  logradouro: string;
  numero?: string;
  complemento?: string;
}

export interface UserData {
    id: string;
    nomeCompleto: string;
    email: string;
    endereco: Endereco;
    senha?: string;
}