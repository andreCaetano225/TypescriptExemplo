import { BaseButton, Button } from "office-ui-fabric-react";
import { useCallback, useState } from "react";

export interface IWarningModalProps { }

export interface IWarningModal {
    open: (ev: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement | BaseButton | Button | HTMLSpanElement>) => void;
    onClose: () => void;
    isOpen: boolean;
    status: string;
    user: string;
    message: string;
}

export const useWarningModal = (): IWarningModal => {
    const [status, setStatus] = useState('');
    const [user, setUser] = useState('');
    const [message, setMessage] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const open = useCallback(
        (ev: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement | BaseButton | Button | HTMLSpanElement>) => {

            let dataset = (ev.currentTarget as HTMLButtonElement)?.dataset;
            setStatus(dataset.status);
            setUser(dataset.user);
            setMessage(dataset.text);
            setIsOpen(true);
        },
        [],
    );

    const onClose = useCallback(
        () => {
            setStatus('');
            setUser('');
            setMessage('');
            setIsOpen(false);
        },
        [],
    );

    return {
        status,
        user,
        message,
        isOpen,
        open,
        onClose
    };
};
