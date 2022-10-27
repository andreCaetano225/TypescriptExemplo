import { IVCard, IVCardModel } from "shared/types";

export interface IListSettings {
    card: string;
    model: string;
    infodocartao: string;
    textNome: string;
    textArea: string;
    textEmail: string;
    textTelefone: string;
    textWpp: string;
    textButton: string;
}
export interface IAppProps {
    lists: IListSettings;
    id: number;

}
export interface IApp {
    model: IVCardModel;
    card: IVCard;
    loaded: boolean;
    avatar: string;
    hidden: boolean;
    onCLickModal: () => void;
    onCLickCloseModal: () => void;
    pt: boolean;
    en: boolean;
    es: boolean;
    TranslationEN: () => void;
    TranslationPT: () => void;
    TranslationES: () => void;


}