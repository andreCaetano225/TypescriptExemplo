import { IWeb, Web } from "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/sites";
import "@pnp/sp/folders";
import "@pnp/sp/files";
import { IFolder, IFolderInfo } from "@pnp/sp/folders";
import { sp } from "@pnp/sp";
import * as dayjs from "dayjs";
import { IFieldImage } from "shared/types/IFieldImage";

const getOrCreate = async (
  web: IWeb,
  folderbase: string,
  folderNames: string[]
): Promise<IFolderInfo> => {
  let subfolder: IFolderInfo = null;

  let path = folderbase;
  try {
    subfolder = await web.getFolderByServerRelativeUrl(
      `${path}/${folderNames.join("/")}`
    )();
  } catch {
    while (folderNames.length > 0) {
      path = `${path}/${folderNames.shift()}`;
      try {
        subfolder = await web.getFolderByServerRelativeUrl(path)();
      } catch (error) {
        await web.folders.add(path);
        subfolder = await web.getFolderByServerRelativeUrl(path)();
      }
    }
  }
  return subfolder;
};

export const AddFolder = async (site: string): Promise<IFolderInfo> => {
  var libraries = await sp.site.getDocumentLibraries(site);

  let folderPath = libraries[0].ServerRelativeUrl;
  var folder = await getOrCreate(sp.web, folderPath, [dayjs().format("YYYY")]);

  return folder;
};

export const AddFile = async (
  vCardId: number,
  file: IFieldImage
): Promise<IFieldImage> => {
  let web = await sp.web.select("Url")();
  let extension = /([^\.]+$)/.exec(file.file.name)[0];

  const folder = await AddFolder(web.Url);
  file.Description = `v-card-${vCardId}.${extension}`;
  let result = await Web(web.Url)
    .getFolderByServerRelativeUrl(folder.ServerRelativeUrl)
    .files.addChunked(
      `${folder.ServerRelativeUrl}/${file.Description}`,
      file.file,
      () => { },
      true
    );
  file.Url = result.data.ServerRelativeUrl;

  return file;
};
