import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { getVCard } from 'shared/api/vcard.api';
import { IVCard, IVCardModel } from 'shared/types';

import { IAppProps, IApp } from '../types/IApp';


export interface IViewerProps {
    model: IVCardModel;
    card: IVCard;
    hidden: boolean;
    onCLickModal: () => void;
    loaded: boolean;
    avatar: string;
    onCLickCloseModal: () => void;
    pt: boolean;
    en: boolean;
    es: boolean;
    TranslationEN: () => void;
    TranslationPT: () => void;
    TranslationES: () => void;
}

type AppType = (props: IAppProps) => IApp;
export const useApp: AppType = (props): IViewerProps => {
    const [card, setCard] = useState<IVCard>();
    const [model, setModel] = useState<IVCardModel>();
    const [loaded, setLoaded] = useState(false);
    const [hidden, setHidden] = useState(true);
    const [pt, setPT] = useState(true);
    const [en, setEN] = useState(false);
    const [es, setES] = useState(false);
    const TranslationEN = useCallback(() => {
        setEN(true);
        setES(false);
        setPT(false);
    }, [en]);
    const TranslationPT = useCallback(() => {
        setPT(true);
        setEN(false);
        setES(false);
    }, [pt]);
    const TranslationES = useCallback(() => {
        setES(true);
        setEN(false);
        setPT(false);
    }, [es]);


    useEffect(() => {
        getVCard(props.lists.card, props.lists.model, props.id).then((result) => {
            setCard(result.card);
            setModel(result.model);
            setLoaded(true);
        });
    }, []);

    const onCLickModal = useCallback(() => {
        setHidden(false);
    }, [hidden]);

    const onCLickCloseModal = useCallback(() => {
        setHidden(true);
    }, [hidden]);

    return { model, card, loaded, avatar: card?.Foto?.Url, hidden, onCLickModal, onCLickCloseModal, TranslationEN, TranslationES, TranslationPT, en, es, pt };

};