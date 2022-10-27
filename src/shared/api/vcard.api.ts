import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { IVCardModel, IVCard } from "shared/types";
import { parseImage } from 'shared/util/helper.image';
import { getCardModel } from "./vcard.model.api";
export interface IResultVCard {
    items: IVCard[];
    hasNext: boolean;
}

export interface IVCardResult {
    card: IVCard;
    model: IVCardModel;
}

export const getVCard = async (
    listId: string,
    listModelId: string,
    id: number
): Promise<IVCardResult> => {
    const data = await sp.web.lists
        .getById(listId)
        .items.getById(id)
        .select(
            "Title",
            "Area",
            "Email",
            "Foto",
            "Telefone",
            "WhatsApp",
            "ModeloId",
            "Foto"
        )
        .get();

    data.Foto = parseImage(data.Foto);
    const model = await getCardModel(listModelId, data.ModeloId);
    return { card: data, model };
};