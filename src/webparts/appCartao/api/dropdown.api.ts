import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { IDropdownOption } from "office-ui-fabric-react";
export const getDropdownOptions = async (listId: string): Promise<IDropdownOption[]> => {

  const dataS = await sp.web.lists
    .getById(listId)
    .items
    .select('Title', 'ID')
    .get();
  return dataS.map(x => ({ text: x.Title, key: x.ID }));

};