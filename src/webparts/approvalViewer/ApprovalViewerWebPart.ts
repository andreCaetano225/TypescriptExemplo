import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ApprovalViewerWebPartStrings';
import { App } from './components/app';
import { IAppProps } from './components/app/types/IApp';
import { setup as pnpSetup } from "@pnp/common";
export interface IApprovalViewerWebPartProps {
  cardListId: string;
  modelListId: string;
  infodocartao: string;
  textNome: string;
  textArea: string;
  textEmail: string;
  textTelefone: string;
  textWpp: string;
  textButton: string;
}

export default class ApprovalViewerWebPart extends BaseClientSideWebPart<IApprovalViewerWebPartProps> {

  protected onInit(): Promise<void> {
    return super.onInit().then((_) => {
      // other init code may be present

      pnpSetup({
        spfxContext: this.context,
        headers: {
          Accept: "application/json;odata=verbose"
        }
      });

    });
  }
  public render(): void {

    let search = window.location.search;

    if (search) {
      const cardId = new URLSearchParams(search).get('cardId');
      if (cardId) {
        const element: React.ReactElement<IAppProps> = React.createElement(
          App,
          {
            lists: {
              card: this.properties.cardListId,
              model: this.properties.modelListId,
              infodocartao: this.properties.infodocartao,
              textNome: this.properties.textNome,
              textArea: this.properties.textArea,
              textEmail: this.properties.textEmail,
              textTelefone: this.properties.textEmail,
              textWpp: this.properties.textWpp,
              textButton: this.properties.textButton
            },
            id: parseInt(cardId)
          }
        );
        ReactDom.render(element, this.domElement);
      }
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('cardListId', {
                  label: 'Id da lista de V-Card'
                }),
                PropertyPaneTextField('modelListId', {
                  label: 'Id da lista de modelos de V-Card'
                }),
                PropertyPaneTextField('infodocartao', {
                  label: 'Texto campo informação do cartão'
                }),
                PropertyPaneTextField('textNome', {
                  label: 'Texto campo Nome'
                }),
                PropertyPaneTextField('textArea', {
                  label: 'Texto campo Area'
                }),
                PropertyPaneTextField('textEmail', {
                  label: 'Texto campo Email'
                }),
                PropertyPaneTextField('textTelefone', {
                  label: 'Texto campo Telefone'
                }),
                PropertyPaneTextField('textWpp', {
                  label: 'Texto campo Whatszap'
                }),
                PropertyPaneTextField('textButton', {
                  label: 'Texto do Botão'
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
