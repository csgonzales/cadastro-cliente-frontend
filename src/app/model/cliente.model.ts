export class Cliente {

    id?: Number;
    nome: String;
    limiteCredito: Number;
    risco: Risco;
    taxaJuros?: Number;


}

export enum Risco {A, B, C}