import { Button, DefaultButton, IDropdownOption } from 'office-ui-fabric-react';
import * as React from 'react';
import styles from '../../components/AppCartao.module.scss';
import { DialogModal } from '../dialog-modal';
import { Form } from '../form';
import { Table } from '../table';
import { WarningModal } from '../warning-modal';
import { IWarningModal } from 'webparts/appCartao/Hooks/warning.modal.hook';
import { IOptions } from 'webparts/appCartao/Hooks/useDropdown.hook';
import { IVCard } from 'shared/types';
import { IColumn } from "office-ui-fabric-react/lib/components/DetailsList";
import { BaseButton } from "office-ui-fabric-react/lib/components/Button/BaseButton";
import { IAppCartaoWebPartProps } from 'webparts/appCartao/AppCartaoWebPart';
import { Header } from '../header';




interface WebPartESProps{
    cards: IVCard[];
    columns: IColumn[];
    editId: number;
    onClosePanel: () => void;
    onClick: (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement | BaseButton | Button | HTMLSpanElement, MouseEvent>) => void;
    onLoadMore: () => void;
    hasNext: boolean;
    isOpen: boolean;
    onConfirm: (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement | BaseButton | Button | HTMLSpanElement, MouseEvent>) => void;
    onCancel: () => void;
    warningModal: IWarningModal;
    dropdownStatusES: IOptions;
    loaded: boolean;
    properties: IAppCartaoWebPartProps;
    onChangeDropdownIdioma: (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => void;
    options: IDropdownOption[];
    columnsMobile: IColumn[];
}


export const WebPartES: React.FC <WebPartESProps> = (props) => {
    return(
    <>
        <div className={styles.container}>
        <Header 
        cardTitle='Tarjetas virtuales' 
        textButton='Nueva tarjeta' 
        onClick={props.onClick} 
        dropdownStatus={props.dropdownStatusES} 
        onChangeDropdownIdioma={props.onChangeDropdownIdioma}
        options={props.options}
        textIdioma='Idioma'
        />
        <div className={styles.divColumnsDesktop}>
        <Table textNotCard='No se encontró ninguna tarjeta' cards={props.cards} columns={props.columns} loaded={props.loaded} />
        </div>
        <div className={styles.divColumnsMobile}>
        <Table textNotCard='No se encontró ninguna tarjeta' cards={props.cards} columns={props.columnsMobile} loaded={props.loaded} />
        </div>
        {props.hasNext ? (
          <div className={styles.containerbutton}>
            <DefaultButton className={styles.button} onClick={props.onLoadMore}>
            Carga más 
            </DefaultButton>
          </div>
        ) : null}
        <Form        
          listId={props.properties.listProjetoId}
          listIdModel={props.properties.listModeloId}
          properties={props.properties}
          vCardId={props.editId}
          onClosePanel={props.onClosePanel}
          emailAdmin={props.properties.emailAdmin}
          titleForm='Nueva tarjeta virtual'
          inputName='Nombre'
          inputArea='Área'
          inputEmail='Correo electrónico'
          inputModel='Plantilla de tarjeta'
          inputPhone='Teléfono'
          buttonSalvar='Guardar'
          buttonCancel='Cancelar'
          textSalvar='¿Quieres guardar la tarjeta?'
          textSim='Sí'
          textNao='No'
          labelSpiiner='Guardando tarjeta, por favor espere...'
          textDropImage='Seleccione'
          textFoto='Con fotografía'
          textnotFoto='Sin fotografía'
          textLabelFoto='¿Quieres agregar una foto?'
          textDropIdiomaEN='Inglês'
          textDropIdiomaES='Espanhol'
          textDropIdiomaPT='Português'
          textAlertEmpresa='Por favor seleccione Empresa e Idioma.'
          
        />
      </div>
      <DialogModal 
      loaded={props.loaded} 
      isOpen={props.isOpen} 
      onConfirm={props.onConfirm} 
      onCancel={props.onCancel}
      titleSolicit={'Pedir aprobación'}
      paragraSolicit={'¿Quieres hacer esta petición?'}
      paragraSolicit2={'Cualquier otra solicitud abierta será cancelada.'}
      textButtonConfirm={'Mandar'}
      textButtonCancel={'Cancelar'}
      textEviando={'Enviando tarjeta, por favor espere...'}
      />
      <WarningModal {...props.warningModal}/>
    </>
    );
};