import * as React from "react";
import { IColumn } from "office-ui-fabric-react/lib/components/DetailsList";
import {
  BaseButton,
  Button,
  DefaultButton,
  IconButton,
} from "office-ui-fabric-react/lib/components/Button";
import * as dayjs from "dayjs";
import { mergeStyleSets } from "@uifabric/merge-styles";
import styles from "./table.module.scss";
import Download from "../donwload-pdf";
import { IVCard } from "shared/types/IVCard";
export interface IColumnProps {
  listId: string;
  listIdModel: string;
  title: string;
  Created: string;
  solicit: string;
  textButton: string;
  textStatusAprovado: string;
  textStatusRascunho: string;
  textStatusReprovado: string;
  textStatusEmAprovacao: string;
  textStatusCancelado: string;
  

  onClick: (
    event: React.MouseEvent<
      | HTMLAnchorElement
      | HTMLButtonElement
      | HTMLDivElement
      | BaseButton
      | Button
      | HTMLSpanElement
      | MouseEvent
    >
  ) => void;
  onRequest: (
    event: React.MouseEvent<
      | HTMLAnchorElement
      | HTMLButtonElement
      | HTMLDivElement
      | BaseButton
      | Button
      | HTMLSpanElement
      | MouseEvent
    >
  ) => void;
  showModal: (
    event: React.MouseEvent<
      | HTMLAnchorElement
      | HTMLButtonElement
      | HTMLDivElement
      | BaseButton
      | Button
      | HTMLSpanElement
      | MouseEvent
    >
  ) => void;
}

const classNames = mergeStyleSets({
  Height: {
    height: "45px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    display: "flex",
    height: "270px",
    width: "450px",
  },
});

export const getColumns = (props: IColumnProps): IColumn[] => {
  return [
    {
      key: "column1",
      name: `${props.title}`,
      fieldName: "Title",
      minWidth: 676,
      
      maxWidth: 676,
      className: classNames.Height,
      data: "string",
    },
    {
      key: "column2",
      name: `${props.Created}`,
      fieldName: "Created",
      minWidth: 115,
      maxWidth: 115,
      className: classNames.Height,
      onRender: (item: IVCard) => {
        return dayjs(item.Created).format("DD/MM/YYYY");
      },
    },
    {
      key: "column3",
      name: "Status",
      fieldName: "Status",
      minWidth: 139,
      data: "string",
      className: classNames.Height,
      onRender: (item: IVCard) => {
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex" }}>
              {item.Status === "Reprovado" ? (props.textStatusReprovado) : (item.Status === "Rascunho" ? (props.textStatusRascunho) : (item.Status === "Em aprovação" ? (props.textStatusEmAprovacao) : item.Status === "Aprovado" ? (props.textStatusAprovado) : item.Status === "Cancelado" ? (props.textStatusCancelado) : (null) ))}

              {item.Status === "Reprovado" ? (
                <IconButton
                  iconProps={{ iconName: "info" }}
                  className={
                    item.Status === "Reprovado"
                      ? styles.infoiconfailed
                      : styles.infoiconcancel
                  }
                  onClick={props.showModal}
                  data-status={item.Status}
                  data-text={item.Reprovacao}
                  data-user={item.Aprovador?.Title}
                  data-aprovador={item.Aprovador?.Title}
                />
              ) : null}
            </div>
          </div>
        );
      },
    },
    {
      key: "column4",
      minWidth: 210,
      name: "",
      className: classNames.Height,
      onRender: (item: IVCard) => {
        switch (item.Status) {
          case "Aprovado":
            return (
              item.first === true && (
                <div style={{ marginTop: "-4.5px" }}>
                  <Download
                    listId={props.listId}
                    listIdModel={props.listIdModel}
                    id={item.Id}
                    textButton={`${props.textButton}`}
                   
                    textSigla={item.Modelo.SiglaButton}
                  />
                </div>
              )
            );
          case "Rascunho":
            return (
              <div style={{ marginTop: "-8px" }}>
                <IconButton
                  iconProps={{ iconName: "edit" }}
                  onClick={props.onClick}
                  data-id={item.Id}
                  data-status={item.Status}
                  className={styles.editicon}
                />
                <DefaultButton
                  text={`${props.solicit}`}
                  className={styles.requestbutton}
                  data-id={item.Id}
                  data-status={item.Status}
                  onClick={props.onRequest}
                />
              </div>
            );
        }
      },
    },
  ];
};
