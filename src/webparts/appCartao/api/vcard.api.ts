import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/site-users";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/profiles";
import "@pnp/sp/site-users/web";
import * as dayjs from "dayjs";
import { AddFile } from "./documents.api";
import { IItemAddResult, PagedItemCollection } from "@pnp/sp/presets/all";
import { graph } from "@pnp/graph";
import { IVCardGraph } from "../interfaces/IVCardGraph";
import "@pnp/graph/users";
import "@pnp/graph/photos";
import { IVCard } from "shared/types/IVCard";
import { parseImage } from "shared/util/helper.image";

let result: PagedItemCollection<IVCard[]> = null;
let resultStatus: string = "todos";

export interface IResultVCard {
  items: IVCard[];
  hasNext: boolean;
}

export const getItemsByUser = async (
  listId: string,
  size: number,
  status: string,
  resetCards: boolean
): Promise<IResultVCard> => {
  if (result === null || status != resultStatus || resetCards) {
    const user = await sp.web.currentUser
      .select("Id")
      .usingCaching({
        key: "currentUser",
        expiration: dayjs().add(5, "m").toDate(),
      })
      .get();
    let filterStatus = ``;
    if (status != "todos") {
      filterStatus = ` and Status eq '${status}'`;
    }
    result = await sp.web.lists
      .getById(listId)
      .items.select(
        "Id",
        "Title",
        "Status",
        "Created",
        "Reprovacao",
        "Aprovador/Title",
        "Modelo/SiglaButton"
      )
      .expand("Aprovador", "Modelo")
      .top(size)
      .orderBy("Created", false)
      .filter(`AuthorId eq ${user.Id}${filterStatus}`)
      .getPaged<IVCard[]>();
    resultStatus = status;
  } else {
    result = await result.getNext();
  }
  return { items: result.results, hasNext: result.hasNext };
};

export interface IEditResult {
  edit: IVCard;
}
export interface IuserResults {
  user: IVCardGraph;
}

const _updateStatus = async (listid: string, id: number, newValue: string) => {
  await sp.web.lists.getById(listid).items.getById(id).update({
    Status: newValue
  });
};

const getStatus = async (listid: string, status: string) => {
  let user = await sp.web.currentUser.select('Id').get();
  let _status = `'${status}'`;
  let items = await sp.web.lists.getById(listid).items.filter(`AuthorId eq ${user.Id} and Status eq ${_status}`).select('Id')();
  return items.map(ev => ev.Id);
};

export const updateStatus = async (listid: string, id: number) => {
  await _updateStatus(listid, id, "Em aprovação");
  let idRascunho = await getStatus(listid, "Rascunho");
  for (let i = 0; i < idRascunho.length; i++) {
    let _rascunhoId = idRascunho[i];
    await _updateStatus(listid, _rascunhoId, "Cancelado");
  }
  let idAprovacao = await getStatus(listid, "Em aprovação");
  let rascunhoId = idAprovacao[0];
  // if (idAprovacao.length !== 1) {
  //   await _updateStatus(listid, rascunhoId, "Cancelado");
  // }
};

export const save = async (listId: string, vCard: IVCard, image: boolean, model: number): Promise<void> => {
  let newItem = vCard.Id ? false : true;
  let item: IItemAddResult;
  if (newItem) {
    item = await sp.web.lists.getById(listId).items.add({});
    vCard.Id = item.data.Id;
  }
  if (vCard.Foto?.file) {
    vCard.Foto = await AddFile(vCard.Id, vCard.Foto);
  }
  if (image === false) {
    await sp.web.lists
      .getById(listId)
      .items.getById(vCard.Id)
      .update({
        Title: vCard.Title,
        Area: vCard.Area,
        Email: vCard.Email,
        ModeloId: model,
        Telefone: vCard.Telefone,
        WhatsApp: vCard.WhatsApp,
      });
  } else {
    await sp.web.lists
      .getById(listId)
      .items.getById(vCard.Id)
      .update({
        Foto: JSON.stringify({
          fileName: vCard.Foto.Description,
          serverRelativeUrl: vCard.Foto.Url,
        }),
        Title: vCard.Title,
        Area: vCard.Area,
        Email: vCard.Email,
        ModeloId: model,
        Telefone: vCard.Telefone,
        WhatsApp: vCard.WhatsApp,
      });
  }
};

export const getEditCard = async (
  listId: string,
  id: number
): Promise<IEditResult> => {
  const data = await sp.web.lists
    .getById(listId)
    .items.getById(id)
    .select(
      "Title",
      "Area",
      "Email",
      "Foto",
      "Telefone",
      "WhatsApp",
      "ModeloId",
      "Id",
    )
    .get();

  data.Foto = parseImage(data.Foto);
  return { edit: data };
};

export const geUserDados = async (): Promise<IVCardGraph> => {
  const data = await graph.me
    .select(
      "mail",
      "displayName",
      "businessPhones",
      "department",
      "photo",
      "mobilePhone",
    )
    .get<IVCardGraph>();
  let photo: Blob = null;
  try {
    photo = await graph.me.photo.getBlob();
  } catch (error) { }

  return { ...data, photo };
};
// export const getModeloEmpresa = async (listModeloId: string, companyName: string) => {
//   const types = await sp.web.lists.getById(listModeloId).items.filter(`Empresa eq '${companyName}'`).top(1).get();
//   if (types && types.length > 0) {
//     return types[0];
//   }
//   return null;
// };

export const getUserProfileFromDelve = async (email: string) => {
  const user = await sp.web.ensureUser(email);
  const proprities = await sp.profiles.getPropertiesFor(user.data.LoginName);
  const reduceValue = proprities.UserProfileProperties.reduce((acc, i) => {
    acc[i.Key] = i.Value;
    return acc;
  }, {});
  return reduceValue;
};

export const getUserDelvePhone = async (email: string) => {
  const user = await sp.web.ensureUser(email);
  const proprities = await sp.profiles.getPropertiesFor(user.data.LoginName);
  const reduceValuePhone = proprities.UserProfileProperties.reduce((acc, i) => {
    acc[i.Key] = i.Value;
    return acc;
  }, {});
  return reduceValuePhone;
};

