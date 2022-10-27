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




interface WebPartPTProps{
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
    dropdownStatus: IOptions;
    loaded: boolean;
    properties: IAppCartaoWebPartProps;
    onChangeDropdownIdioma: (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => void;
    options: IDropdownOption[];
    columnsMobile: IColumn[];
}


export const WebPartPT: React.FC <WebPartPTProps> = (props) => {
    return(
    <>
        <div className={styles.container}>
        <Header 
        cardTitle='Cartões Virtuais' 
        textButton='Novo Cartão' 
        onClick={props.onClick} 
        dropdownStatus={props.dropdownStatus} 
        onChangeDropdownIdioma={props.onChangeDropdownIdioma}
        options={props.options}
        textIdioma='Idioma'
        />
        <div className={styles.divColumnsDesktop}>
        <Table textNotCard='Nenhum cartão encontrado' cards={props.cards} columns={props.columns} loaded={props.loaded} />
        </div>
        <div className={styles.divColumnsMobile}>
        <Table textNotCard='Nenhum cartão encontrado' cards={props.cards} columns={props.columnsMobile} loaded={props.loaded} />
        </div>
        {props.hasNext ? (
          <div className={styles.containerbutton}>
            <DefaultButton className={styles.button} onClick={props.onLoadMore}>
              Carregar mais 
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
          titleForm='Novo cartão virtual'
          inputName='Nome'
          inputArea='Área'
          inputEmail='E-mail'
          inputModel='Modelo de cartão'
          inputPhone='Telefone'
          buttonSalvar='Salvar'
          buttonCancel='Cancelar'
          textSalvar='Deseja salvar o cartão?'
          textSim='Sim'
          textNao='Não'
          labelSpiiner='Salvando cartão, aguarde...'
          textDropImage='Selecione'
          textFoto='Com foto'
          textnotFoto='Sem foto'
          textLabelFoto='Deseja adicionar foto?'
          textDropIdiomaEN='Inglês'
          textDropIdiomaES='Espanhol'
          textDropIdiomaPT='Português'
          textAlertEmpresa='Por favor selecione Empresa e Idioma'
        />
      </div>
      <DialogModal 
      loaded={props.loaded} 
      isOpen={props.isOpen} 
      onConfirm={props.onConfirm} 
      onCancel={props.onCancel}
      titleSolicit={'Solicitar aprovação'}
      paragraSolicit={'Deseja efetuar esta solicitação?'}
      paragraSolicit2={'Qualquer outra solicitação em aberto será cancelada.'}
      textButtonConfirm={'Enviar'}
      textButtonCancel={'Cancelar'}
      textEviando={'Enviando cartão, aguarde...'}
      
      />
      <WarningModal {...props.warningModal}/>
    </>
    );
};