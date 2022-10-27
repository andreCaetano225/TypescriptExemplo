import { useEffect, useState } from "react";
import { IVCard, IVCardModel } from "shared/types";

export interface ICardViewerProps {
    model: IVCardModel;
    card: IVCard;
    avatar: string;

}

export const useCardViewer = (props: ICardViewerProps): string => {
    const [vcardQRCode, setVcardQRCode] = useState('');

    useEffect(() => {
        const { card, model } = props;
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
TEL;type=WORK;type=pref:${card.Telefone ?? ''}
TEL;type=CELL:${card.WhatsApp ?? ''}
EMAIL;type=WORK:${card.Email}
REV:${card.Created}
x-qq:21588891
END:VCARD'`;
        setVcardQRCode(str_vcard);

    }, [props]);
    return vcardQRCode;
};