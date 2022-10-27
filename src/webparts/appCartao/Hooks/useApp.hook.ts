import { BaseButton } from "office-ui-fabric-react/lib/components/Button/BaseButton";
import { Button } from "office-ui-fabric-react/lib/components/Button/Button";
import { IColumn } from "office-ui-fabric-react/lib/components/DetailsList";
import { useCallback, useEffect, useState } from "react";
import { getItemsByUser, updateStatus } from "../api/vcard.api";
import { getColumns } from "../components/table/columns";
import { IOptions, useDropdown } from "./useDropdown.hook";
import { IAppCartaoProps } from "../components/IAppCartaoProps";
import { IWarningModal, useWarningModal } from "./warning.modal.hook";
import { IVCard } from "shared/types/IVCard";
import { IDropdownOption } from "office-ui-fabric-react";
import { getColumnsMobile } from "../components/table/columnsMobile";

export interface ITable {
  cards: IVCard[];
  dropdownStatus: IOptions;
  loaded: boolean;
}

export interface IApp {
  columns: IColumn[];
  onClosePanel: () => void;
  dropdownStatus: IOptions;
  dropdownStatusEN: IOptions;
  dropdownStatusES: IOptions;
  editId: number;
  onClick: (
    event: React.MouseEvent<
      | HTMLAnchorElement
      | HTMLButtonElement
      | HTMLDivElement
      | BaseButton
      | Button
      | HTMLSpanElement,
      MouseEvent
    >
  ) => void;
  hasNext: boolean;
  onLoadMore: () => void;
  loaded: boolean;
  isOpen: boolean;
  onConfirm: (
    event: React.MouseEvent<
      | HTMLAnchorElement
      | HTMLButtonElement
      | HTMLDivElement
      | BaseButton
      | Button
      | HTMLSpanElement,
      MouseEvent
    >
  ) => void;
  onCancel: () => void;
  warningModal: IWarningModal;
  cards: IVCard[];
  onChangeDropdownIdioma: (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => void;
  options: IDropdownOption[];
  columnsMobile: IColumn[];
  es: boolean;
}

function getDownloadCard(data: IVCard[]) {
  let first = false;
  data = data.map(item => {
    if (!first && item.Status == 'Aprovado') {
      first = true;
      return {
        ...item, first: true
      };
    }
    return {
      ...item, first: true
    };
  });
  return data;
}

// function getDownloadCard(data: IVCard[]) {
//   let idioma = [];
//   data = data.map(item => {
//     if (item.Status == 'Aprovado' && idioma.indexOf(item.Idioma) == -1) {
//       idioma.push(item.Idioma);
//       return {
//         ...item, first: true
//       };
//     }
//     return {
//       ...item, first: false
//     };
//   });
//   return data;
// }

export const useApp = (props: IAppCartaoProps): IApp => {
  const [cards, setCards] = useState<IVCard[]>([]);
  const [columns, setColumns] = useState<IColumn[]>([]);
  const [columnsMobile, setColumnsMobile] = useState<IColumn[]>([]);
  const [editId, setEditId] = useState(-1);
  const [hasNext, setHasNext] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [requestId, setRequestId] = useState(0);
  const [pt, setPT] = useState(true);
  const [en, setEN] = useState(false);
  const [es, setES] = useState(false);
  const [options, setOptions] = useState<IDropdownOption[]>([]);
  const [idioma, setIdioma] = useState(null);




  const warningModal = useWarningModal();

  const onChangeDropdownIdioma = useCallback(
    (
      event: React.FormEvent<HTMLDivElement>,
      option?: IDropdownOption,
      index?: number
    ) => {
      setIdioma(option.key.valueOf());
    },
    [options]
  );


  const loadItems = useCallback(
    (newStatus: string, resetCards: boolean) => {
      setLoaded(false);
      getItemsByUser(props.properties.listProjetoId, 10, newStatus, resetCards)
        .then((data) => {
          let items = getDownloadCard(data.items);
          setCards(items);
          setHasNext(data.hasNext);
          setLoaded(true);
        })
        .catch(console.error);
    },
    [cards, hasNext, loaded],
  );

  const dropdownStatus = useDropdown(loadItems);
  const dropdownStatusEN = useDropdown(loadItems);
  const dropdownStatusES = useDropdown(loadItems);

  useEffect(() => {
    dropdownStatusES.load([
      { key: "todos", text: "Todos" },
      { key: "Rascunho", text: "Bosquejo" },
      { key: "Em aprovação", text: "En aprovacion" },
      { key: "Aprovado", text: "Aprobado" },
      { key: "Reprovado", text: "Rechazado" },
      { key: "Cancelado", text: "Cancelado" },
    ]);
    dropdownStatus.load([
      { key: "todos", text: "Todos" },
      { key: "Rascunho", text: "Rascunho" },
      { key: "Em aprovação", text: "Em aprovação" },
      { key: "Aprovado", text: "Aprovado" },
      { key: "Reprovado", text: "Reprovado" },
      { key: "Cancelado", text: "Cancelado" },
    ]);
    let col = getColumns({
      title: props.properties.titleTable,
      Created: props.properties.dataCriacao,
      solicit: props.properties.buttonSolicit,
      textButton: props.properties.textButtonBaixar,
      textStatusAprovado: props.properties.textStatusAprovado,
      textStatusReprovado: props.properties.textStatusReprovado,
      textStatusRascunho: props.properties.textStatusRascunho,
      textStatusEmAprovacao: props.properties.textStatusEmAprovacao,
      textStatusCancelado: props.properties.textStatusCancelado,
      onClick,
      onRequest,
      showModal: warningModal.open,
      listId: props.properties.listProjetoId,
      listIdModel: props.properties.listModeloId
    });
    let colMobile = getColumnsMobile({
      title: props.properties.titleTable,
      Created: props.properties.dataCriacao,
      solicit: props.properties.buttonSolicit,
      textButton: props.properties.textButtonBaixarMobile,
      textButtonMobileSolicit: props.properties.textButtonBaixarMobileSolicit,
      textButtonMobileSolicit2: props.properties.textButtonBaixarMobileSolicit2,
      textStatusAprovado: props.properties.textStatusAprovado,
      textStatusReprovado: props.properties.textStatusReprovado,
      textStatusRascunho: props.properties.textStatusRascunho,
      textStatusEmAprovacao: props.properties.textStatusEmAprovacao,
      textStatusCancelado: props.properties.textStatusCancelado,
      onClick,
      onRequest,
      showModal: warningModal.open,
      listId: props.properties.listProjetoId,
      listIdModel: props.properties.listModeloId
    });
    setColumns(col);
    setColumnsMobile(colMobile);
    loadItems('todos', true);
    console.log(props.properties.idiomaEspanhol);

    if (props.properties.idiomaEspanhol == "Sim") {
      setES(true);
    } else {
      setES(false);
    }
  }, [en]);

  const onConfirm = useCallback(() => {
    setLoaded(false);
    updateStatus(props.properties.listProjetoId, requestId)
      .then(() => {
        setIsOpen(false);
        loadItems("todos", true);
      })
      .catch(console.error);
  }, [requestId, isOpen, loaded]);

  const onCancel = useCallback(() => {
    setIsOpen(false);
    setRequestId(0);
  }, [requestId, isOpen]);

  const onRequest = useCallback(
    (
      event: React.MouseEvent<
        | HTMLAnchorElement
        | HTMLButtonElement
        | HTMLDivElement
        | BaseButton
        | Button
        | HTMLSpanElement,
        MouseEvent
      >
    ) => {
      let dataset = (event.currentTarget as HTMLButtonElement)?.dataset;
      setIsOpen(true);
      setRequestId(parseInt(dataset.id));
    },
    [cards]
  );

  const onClick = useCallback(
    (
      event: React.MouseEvent<
        | HTMLAnchorElement
        | HTMLButtonElement
        | HTMLDivElement
        | BaseButton
        | Button
        | HTMLSpanElement,
        MouseEvent
      >
    ) => {
      let dataset = (event.currentTarget as HTMLButtonElement)?.dataset;
      switch (dataset.status) {
        case 'Rascunho':
          setEditId(parseInt(dataset.id));
      }
    },
    [cards]
  );

  const onClosePanel = useCallback(
    () => {
      setEditId(-1);
      dropdownStatus.change('todos');
    },
    [editId, cards, dropdownStatus.selectedOption],
  );

  const onLoadMore = useCallback(
    () => {
      if (hasNext) {
        getItemsByUser(props.properties.listProjetoId, 10, dropdownStatus.selectedOption, null).then((data) => {
          let items = getDownloadCard([...cards, ...data.items]);
          setCards(items);
          setHasNext(data.hasNext);
        });
      }
    },
    [hasNext, cards],
  );

  return {
    cards: cards.filter(
      (x) => dropdownStatus.selectedOption === "todos" || x.Status === dropdownStatus.selectedOption
    ),
    columns,
    onClosePanel,
    dropdownStatus,
    editId,
    onClick,
    hasNext,
    onLoadMore,
    loaded,
    isOpen,
    onConfirm,
    onCancel,
    warningModal,
    dropdownStatusEN,
    dropdownStatusES,
    onChangeDropdownIdioma,
    options,
    columnsMobile,
    es
  };
};
