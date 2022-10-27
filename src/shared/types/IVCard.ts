import { IFieldImage } from "./IFieldImage";

export interface ILookup {
    Title: string;
    Id: number;
}
export interface IVCard {
    Id: number;
    Title: string;
    Created: string;
    Status: string;
    ModeloId: number;
    UnidadeId: number;
    SiteId: number;
    Foto: IFieldImage;
    Area: string;
    Email: string;
    WhatsApp: string;
    Telefone: string;
    Unidade: {
        Endereco: string;
    };
    Site: {
        Title: string;
    };
    Reprovacao: string;
    first: boolean;
    Aprovador: ILookup;
    companyName: string;
    Idioma: string;
    Modelo: {
        SiglaButton: string;
    }
}
