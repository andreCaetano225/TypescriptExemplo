import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { IVCardModel } from "shared/types/IVCardModel";
import { parseImage } from "shared/util/helper.image";


export const getCardModel = async (listId, id: number): Promise<IVCardModel> => {
    const data = await sp.web.lists
        .getById(listId)
        .items.getById(id)
        .select("Id",
            "Fundo",
            "FundoComFoto",
            "IconEmail",
            "IconSite",
            "IconTelefone",
            "IconWhatsApp",
            "IconClick",
            "CorBordaPerfil",
            "BordasPerfil",
            "Empresa",
            "Site",
            "CorFonteArea",
            "CorFonteDetalhesCard",
            "CorFonteNome",
            "TextIcon",
            "TextQrCode"
        ).configure({
            headers: {
                Accept: 'application/json;odata=nometadata'
            }
        })
        .get();
    return {
        Fundo: parseImage(data.Fundo)?.Url,
        FundoComFoto: parseImage(data.FundoComFoto)?.Url,
        IconEmail: parseImage(data.IconEmail)?.Url,
        IconSite: parseImage(data.IconSite)?.Url,
        IconWhatsApp: parseImage(data.IconWhatsApp)?.Url,
        IconTelefone: parseImage(data.IconTelefone)?.Url,
        IconClick: parseImage(data.IconClick)?.Url,
        CorBordaPerfil: data.CorBordaPerfil,
        BordasPerfil: data.BordasPerfil,
        Empresa: data.Empresa,
        Site: data.Site,
        CorFonteArea: data.CorFonteArea,
        CorFonteDetalhesCard: data.CorFonteDetalhesCard,
        CorFonteNome: data.CorFonteNome,
        TextIcon: data.TextIcon,
        TextQrCode: data.TextQrCode

    };
};