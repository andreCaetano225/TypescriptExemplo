import * as React from 'react';
import {
  BaseButton,
  Button,
  DefaultButton,
  PrimaryButton,
} from 'office-ui-fabric-react/lib/components/Button';
import styles from './dialog.module.scss';
import { Dialog, DialogFooter, Spinner, SpinnerSize } from 'office-ui-fabric-react';

export interface IDialogModal {
  isOpen: boolean;
  onConfirm: (
    event: React.MouseEvent<
      | HTMLAnchorElement
      | HTMLButtonElement
      | HTMLDivElement
      | BaseButton
      | Button
      | HTMLSpanElement
      | MouseEvent
    >,
  ) => void;
  onCancel: () => void;
  loaded: boolean;
  titleSolicit: string;
  paragraSolicit: string;
  paragraSolicit2: string;
  textButtonConfirm: string;
  textButtonCancel:string;
  textEviando: string;
}

export const DialogModal: React.FC<IDialogModal> = (props:IDialogModal) => {
  return (
    <Dialog hidden={!props.isOpen} onDismiss={props.onCancel} isBlocking={true}>
      {props.loaded ?  
        <>
         <div className={styles.requestdialog}>
           <label className={styles.titledialog}>{props.titleSolicit}</label>
           <label className={styles.textdialog}>
             {props.paragraSolicit} 
             <br /> 
             {props.paragraSolicit2}
           </label>
         </div>
         <DialogFooter className={styles.footerdialog}>
           <PrimaryButton
             onClick={props.onConfirm}
             text={`${props.textButtonConfirm}`}
             className={styles.sendbutton}
           />
           <DefaultButton
             onClick={props.onCancel}
             text={`${props.textButtonCancel}`}
             className={styles.cancelbutton}
           />
         </DialogFooter>
        </> : <Spinner size={SpinnerSize.large} label={`${props.textEviando}`}/>
      }
    </Dialog>
  );
};
