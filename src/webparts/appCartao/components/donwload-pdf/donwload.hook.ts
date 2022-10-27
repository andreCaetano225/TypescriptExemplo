import { useEffect, useState } from "react";
import { getVCard } from "shared/api/vcard.api";
import { IVCard, IVCardModel } from "shared/types";

export interface IAppCartaoPdfProps {
    listId: string;
    listIdModel: string;
    id: number;
    textButton: string;
    textSigla: string;
}

export interface IAppImagemPdfProps {
    id: number;
}

export interface IAppCartaoPdf {
    card: IVCard;
    model: IVCardModel;
    avatar: string;
    loaded: boolean;
}



export const useCardHooks = (props: IAppCartaoPdfProps): IAppCartaoPdf => {
    const [card, setCard] = useState({} as IVCard);
    const [model, setModel] = useState({} as IVCardModel);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (props.id) {
            getVCard(props.listId, props.listIdModel, props.id)
                .then(res => {
                    setCard(res.card);
                    setModel(res.model);
                }
                )
                .catch(console.error);

        } else {
            console.log('Id = null');
        }
    }, [props.id]);
    return { card, avatar: card?.Foto?.Url, model, loaded };
};