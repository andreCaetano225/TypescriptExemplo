import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import * as strings from "AppCartaoWebPartStrings";
import { AppCartao } from "./components/AppCartao";
import { IAppCartaoProps } from "./components/IAppCartaoProps";
import { setup as pnpSetup } from "@pnp/common";
import { graph } from "@pnp/graph";
import "@pnp/graph/users";
export interface IAppCartaoWebPartProps {
  listProjetoId: string;
  listModeloId: string;
  emailAdmin: string;
  idiomaEspanhol: string;
  titleTable: string;
  dataCriacao: string;
  buttonSolicit: string;
  textButtonBaixar: string;
  textButtonBaixarMobile: string;
  textButtonBaixarMobileSolicit: string;
  textButtonBaixarMobileSolicit2: string;
  textStatusAprovado: string;
  textStatusRascunho: string;
  textStatusReprovado: string;
  textStatusEmAprovacao: string;
  textStatusCancelado: string;

}

export default class AppCartaoWebPart extends BaseClientSideWebPart<IAppCartaoWebPartProps> {
  protected onInit(): Promise<void> {
    return super.onInit().then((_) => {
      // other init code may be present

      pnpSetup({
        spfxContext: this.context,
        headers: {
          Accept: "application/json;odata=verbose"
        }
      });
      graph.setup({
        spfxContext: this.context,
      });
    });
  }

  public render(): void {
    if (
      this.properties.listProjetoId &&
      this.properties.listModeloId &&
      this.properties.emailAdmin &&
      this.properties.idiomaEspanhol &&
      this.properties.titleTable &&
      this.properties.dataCriacao &&
      this.properties.buttonSolicit &&
      this.properties.textButtonBaixar &&
      this.properties.textButtonBaixarMobile &&
      this.properties.textButtonBaixarMobileSolicit &&
      this.properties.textButtonBaixarMobileSolicit2 &&
      this.properties.textStatusAprovado &&
      this.properties.textStatusRascunho &&
      this.properties.textStatusReprovado &&
      this.properties.textStatusEmAprovacao &&
      this.properties.textStatusCancelado
    ) {
      const element: React.ReactElement<IAppCartaoProps> = React.createElement(
        AppCartao,
        {
          properties: this.properties,
        }
      );

      ReactDom.render(element, this.domElement);
    } else {
      ReactDom.render(
        React.createElement("div", {
          dangerouslySetInnerHTML: {
            __html:
              '<p style="text-align:center;"> Por favor preencha os dados da Webpart</p>',
          },
        }),
        this.domElement
      );
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("listProjetoId", {
                  label: "Id da lista de Projeto",
                }),
                PropertyPaneTextField("listModeloId", {
                  label: "Id da lista de Modelo",
                }),
                PropertyPaneTextField("emailAdmin", {
                  label: "E-mail do Adminstrador",
                }),
                PropertyPaneTextField("idiomaEspanhol", {
                  label: "Idioma Espanhol - Sim ou Não",
                }),
                PropertyPaneTextField("titleTable", {
                  label: "Coluna Nome",
                }),
                PropertyPaneTextField("dataCriacao", {
                  label: "Coluna Data",
                }),
                PropertyPaneTextField("buttonSolicit", {
                  label: "Botão solicitar",
                }),
                PropertyPaneTextField("textButtonBaixar", {
                  label: "Botão Baixar",
                }),
                PropertyPaneTextField("textButtonBaixarMobile", {
                  label: "Botão Baixar Mobile",
                }),
                PropertyPaneTextField("textButtonBaixarMobileSolicit", {
                  label: "Botão Solicitar Mobile",
                }),
                PropertyPaneTextField("textButtonBaixarMobileSolicit2", {
                  label: "Botão Solicitar Mobile2",
                }),
                PropertyPaneTextField("textStatusAprovado", {
                  label: "Texto Status Aprovado",
                }),
                PropertyPaneTextField("textStatusReprovado", {
                  label: "Texto Status Reprovado",
                }),
                PropertyPaneTextField("textStatusCancelado", {
                  label: "Texto Status Cancelado",
                }),
                PropertyPaneTextField("textStatusEmAprovacao", {
                  label: "Texto Status Em Aprovação",
                }),
                PropertyPaneTextField("textStatusRascunho", {
                  label: "Texto Status Rascunho",
                }),
              ],
            },
          ],
        },
      ],
      /**
       *  :string;
  :string;
  :string;
       */
    };
  }
}
