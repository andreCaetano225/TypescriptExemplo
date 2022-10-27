import * as React from "react";
import {
  DefaultButton,
  Dialog,
  DialogFooter,
  MaskedTextField,
  Panel,
  PanelType,
  TextField,
  Spinner,
  SpinnerSize,
  Dropdown,
} from "office-ui-fabric-react";
import { IFormProps, useForm } from "./form.hook";
import styles from './form.module.scss';
import { FormImage } from "../form-image";
import { useEffect } from "react";
import { FormDropdown } from "../dropdown";

export const Form: React.FC<IFormProps> = (props) => {
  const {
    isOpen,
    onCloseSub,
    vCard,
    onChangeDropdown,
    onChangeImagem,
    onChangeText,
    onSubForm,
    onCLick,
    hidden,
    ref,
    loaded,
    hiddenErrorModel,
    onCLickCancel,
    onCLickErrorModel,
    onCLickImage,
    onNotCLickImage,
    image,
    onChangeDropdownImage,
    options,
    optionsIdioma
  } = useForm(props);


  return (
    <>
      <Panel
        onDismiss={onCloseSub}
        type={PanelType.medium}
        isOpen={isOpen}
        headerText={`${props.titleForm}`}
      >
        <div className={styles.form}>
          <form ref={ref} onSubmit={onSubForm} >
            <div>
              <div >
                <div>
                <div style={{marginTop: '20px'}}>
                  <FormDropdown 
                  name="empresa" 
                  onChange={onChangeDropdown} 
                  listId={props.listIdModel}
                  
                  />
                  </div>
                <div style={{marginBottom: '12px', marginTop: '24px'}}>
                  <Dropdown
                  options={options}
                  onChange={onChangeDropdownImage}
                  placeholder={`${props.textDropImage}`}
                  label={`${props.textLabelFoto}`}
                  />
                </div>
                {image ? (
                  <>
                  <div style={{ marginTop: '49px'}}>
                  <FormImage foto={vCard?.Foto} onChange={onChangeImagem}/>
                  {/* Componente de Foto do user, caso queria adiconar a 
                  foto do usuário tem que tirar na requisição de salvar o 
                  formulário dentro do formHooks o valor de false, pós foi 
                  colocado pq o cliente pediu sem foto no momento. */}
                  </div>
                  </>
                ) : (
                  <>
                  </>
                )}
                </div>
                <div>
                  <TextField
                    label={`${props.inputName}`}
                    type="text"
                    required
                    className={styles.inputname}
                    name="Nome"
                    onChange={onChangeText}
                    value={vCard?.Title}
                  />
                </div>
                <div className={styles.formAE}>
                  <TextField
                    label={`${props.inputArea}`}
                    type="text"
                    required
                    className={styles.inputname}
                    name="Area"
                    onChange={onChangeText}
                  />
                  <TextField
                    label={`${props.inputEmail}`}
                    type="email"
                    required
                    className={styles.inputnameemail}
                    name="Email"
                    onChange={onChangeText}
                    value={vCard?.Email}
                  />
                  
                  
                </div>
                <div style={{marginTop: '15px'}}>
                  <TextField
                    label={`${props.inputPhone}`}
                    type="text"
                    title="Digitar Telefone"
                    name="Telefone"
                    onChange={onChangeText}
                    disabled
                    value={vCard?.Telefone ?? ""}
                  />
                  <div style={{marginTop: '15px'}}>
                  <TextField
                    label="WhatsApp"
                    type="text"
                    name="wpp"
                    title="Digitar WhatsApp"
                    onChange={onChangeText}
                    disabled
                    value={vCard?.WhatsApp ?? ""}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.formFi}>
              
              <DefaultButton
                onClick={onCLick}
                text={`${props.buttonSalvar}`}
                className={styles.Button}
              />
              <DefaultButton
                onClick={onCloseSub}
                text={`${props.buttonCancel}`}
                className={styles.ButtonC}
              />
              <Dialog hidden={hidden} onDismiss={onCLick} isBlocking={true}>
                {loaded ? (
                  <>
                    <p className={styles.TitleModal}>{props.textSalvar}</p>
                    <DialogFooter className={styles.Modalsave}>
                      <DefaultButton
                        text={`${props.textSim}`}
                        className={styles.Button}
                        onClick={onSubForm}
                      />
                      <DefaultButton
                        text={`${props.textNao}`}
                        className={styles.ButtonCM}
                        onClick={onCLickCancel}
                      />
                    </DialogFooter>
                  </>
                ) : (
                  <Spinner
                    label={`${props.labelSpiiner}`}
                    size={SpinnerSize.large}
                  />
                )}
              </Dialog>
              <Dialog hidden={hiddenErrorModel} onDismiss={onCLick}>
                <p className={styles.TitleModal}>A empresa {vCard?.companyName}  ainda não possui modelo de cartão de visita. Em breve será disponibilizado. Para mais informações, entre em contato pelo e-mail  {props.emailAdmin}</p>
                <DialogFooter className={styles.Modalsave}>
                <DefaultButton
                  text="Ok"
                  className={styles.Button}
                  onClick={onCLickErrorModel}
                  />
                </DialogFooter>
              </Dialog>
            </div>
          </form>
        </div>
      </Panel>
    </>
  );
};
