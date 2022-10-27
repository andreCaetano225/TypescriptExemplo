import { IFieldImage } from "shared/types/IFieldImage";

export const parseImage = (rawImage: string): IFieldImage => {
    if (rawImage) {
        let foto = JSON.parse(rawImage);
        return {
            Description: foto.fileName,
            Url: foto.serverRelativeUrl,
        } as IFieldImage;
    } else {
        return null;
    }
};