import {
  DefaultButton,
  Dialog,
  DialogType,
  Icon,
} from "office-ui-fabric-react";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import * as React from "react";
import { CardViewer } from "shared/components/card-viewer";
import styles from "./app.module.scss";
import { useApp } from "./hooks/useApp";
import { IAppProps } from "./types/IApp";

export const App: React.FC<IAppProps> = (props) => {
  const {
    card,
    loaded,
    avatar,
    model,
    hidden,
    onCLickModal,
    onCLickCloseModal,
    TranslationEN,
    TranslationES,
    TranslationPT,
    en,
    es,
    pt
  } = useApp(props);
  if (!loaded) {
    return <React.Fragment></React.Fragment>;
  }
  return (
    <React.Fragment>
      <div className={styles.app}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.col12 + " " + styles.colImage}>
              <h2>{props.lists.infodocartao}</h2>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col12 + " " + styles.colImage}>
              <img src={card.Foto?.Url} />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col12}>
              <TextField
                disabled={true}
                label={props.lists.textNome}
                value={card.Title}
              ></TextField>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col12}>
              <TextField
                label={props.lists.textArea}
                disabled={true}
                value={card.Area}
              ></TextField>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col12}>
              <TextField
                label={props.lists.textEmail}
                disabled={true}
                value={card.Email}
              ></TextField>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col6}>
              <TextField
                label={props.lists.textTelefone}
                disabled={true}
                value={card.Telefone}
              ></TextField>
            </div>
            <div className={styles.col6}>
              <TextField
                label={props.lists.textWpp}
                disabled={true}
                value={card.WhatsApp}
              ></TextField>
            </div>
          </div>
            <div className={styles.row}>
            <div className={styles.col12 + " " + styles.colButton}>
              <DefaultButton
                onClick={onCLickModal}
                text={props.lists.textButton}
                className={styles.buttonmodal}
              />
            </div>
          </div>
          <Dialog
            hidden={hidden}
            onDismiss={onCLickModal}
            maxWidth={867}
            dialogContentProps={{
              type: DialogType.normal,
              styles: {
                inner: { padding: 0 },
                title: { display: "none" },
                subText: { display: "none" },
              },
            }}
            isBlocking={false}
          >
            <Icon
              iconName="Cancel"
              className={styles.close}
              onClick={onCLickCloseModal}
            />
            <CardViewer model={model} card={card} avatar={avatar} />
          </Dialog>
        </div>
      </div>
      <div></div>
    </React.Fragment>
  );
};
