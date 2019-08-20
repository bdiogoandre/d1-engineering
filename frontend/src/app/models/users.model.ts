export class User{
    id: string;
    fname: string;
    lname: string;
    fullName: string;
    nascimento: string;
    cpf: string;
    rg: string;
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
    enderecos: Array<enderecos>;
    telefones: Array<telefones>;
}
export class enderecos{
    endereco: string;
      numero: string;
      cep: string;
      bairro: string;
      cidade: string;
}
export class telefones{
    telefone: string;
    telefoneLocal: string;
}