import { IVCard, IVCardModel } from "shared/types";

export const createVCard = (card: IVCard, model: IVCardModel) => {
    let name = '', lastname = '';
    if (/(^[^ ]+) (.+$)/.test(card.Title)) {
        var result = /(^[^ ]+) (.+$)/.exec(card.Title);
        name = result[1];
        lastname = result[2];
    }

    const str_vcard = `BEGIN:VCARD
VERSION:3.0
N:${lastname};${name};
FN:${card.Title}
ORG:${model.Empresa}
TEL;type=WORK;type=pref:${card.Telefone}
TEL;type=CELL:+1 781 555 1212
EMAIL;type=WORK:${card.Email}
REV:${card.Created}
x-qq:21588891
END:VCARD'`;
    console.log(str_vcard);
    return str_vcard;
};