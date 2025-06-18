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

export interface UserDataCadastro {
  nomeCompleto: string;
  email: string;
  cep: string;
  localidade: string;
  bairroId: string;
  logradouro: string;
  numero?: string;
  complemento?: string;
  senha: string;
}
