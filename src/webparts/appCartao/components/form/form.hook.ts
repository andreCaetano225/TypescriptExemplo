import { IDropdownOption } from "office-ui-fabric-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { IFieldImage, IVCard } from "shared/types";
import {
  getEditCard,
  getUserDelvePhone,
  getUserProfileFromDelve,
  geUserDados,
  save,
} from "../../api/vcard.api";
import { IAppCartaoWebPartProps } from "../../AppCartaoWebPart";
import { IVCardGraph } from "../../interfaces/IVCardGraph";

export interface IFormProps {
  onClosePanel: () => void;
  vCardId: number;
  properties: IAppCartaoWebPartProps;
  listId: string;
  listIdModel: string;
  emailAdmin: string;
  titleForm: string;
  inputName: string;
  inputArea: string;
  inputEmail: string;
  inputModel: string;
  inputPhone: string;
  buttonSalvar: string;
  buttonCancel: string;
  textSalvar: string;
  textSim: string;
  textNao: string;
  labelSpiiner: string;
  textDropImage: string;
  textFoto: string;
  textnotFoto: string;
  textLabelFoto: string;
  textDropIdiomaPT: string;
  textDropIdiomaES: string;
  textDropIdiomaEN: string;
  textAlertEmpresa: string;

}

export interface IForm {
  isOpen: boolean;
  vCard: IVCard;
  onChangeDropdown: (name: string, value: number) => void;
  onCloseSub: () => void;
  onChangeImagem: (file: File) => void;
  onChangeText: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  onSubForm: (ev: any) => void;
  onCLick: () => void;
  onCLickCancel: () => void;
  onCLickErrorModel: () => void;
  hidden: boolean;
  ref: React.LegacyRef<HTMLFormElement>;
  vCardGraph: IVCardGraph;
  loaded: boolean;
  showErrorModel: boolean;
  hiddenErrorModel: boolean;
  onCLickImage: () => void;
  onNotCLickImage: () => void;
  image: boolean;
  options: IDropdownOption[];
  optionsIdioma: IDropdownOption[];
  onChangeDropdownImage: (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => void;

}
const getVCardInfo = async (listId: string, listModeloId: string) => {
  const userData = await geUserDados();

  let file: File = null;
  if (userData.photo != null) {
    file = new File([userData.photo], "profile.jpeg");
  }

  if (userData.mail) {

    const userDelveWork = await getUserProfileFromDelve(userData.mail);

    const useDelvePhone = await getUserDelvePhone(userData.mail);

    let vCard = {
      Title: userData.displayName,
      Telefone: userDelveWork?.WorkPhone ?? '',
      WhatsApp: useDelvePhone?.CellPhone ?? '',
      Area: userData.department,
      Email: userData.mail,
      Foto: {
        file,
        Description: "profile.jpeg",
      },
    } as IVCard;
    return vCard;

  } else {

    let vCard = {
      Title: userData.displayName,
      Area: userData.department,
      Email: userData.mail,
      Foto: {
        file,
        Description: "profile.jpeg",
      },
    } as IVCard;
    return vCard;

  }
};



export const useForm = (props: IFormProps): IForm => {
  const [hidden, setHidden] = useState(true);
  const [hiddenErrorModel, setHiddenErrorModel] = useState(true);
  const [vCard, setVCard] = useState<IVCard>(null);
  const [vCardGraph, setVCardGraph] = useState<IVCardGraph>(null);
  const [loaded, setLoaded] = useState(true);
  const ref = useRef<HTMLFormElement>(null);
  const [showErrorModel, setShowErrorModel] = useState(false);
  const [image, setImage] = useState(false);
  const [options, setOptions] = useState<IDropdownOption[]>([]);
  const [optionsIdioma, setOptionsIdioma] = useState<IDropdownOption[]>([]);
  const [foto, setFoto] = useState(null);
  const [idioma, setIdioma] = useState(null);
  const [model, setModel] = useState(null);
  const [checkFoto, setCheckFoto] = useState(true);

  const onChangeDropdownImage = useCallback(
    (
      event: React.FormEvent<HTMLDivElement>,
      option?: IDropdownOption,
      index?: number
    ) => {
      setFoto(option.key.valueOf());
    },
    [options]
  );

  useEffect(() => {
    if (props.vCardId > 0) {
      getEditCard(props.listId, props.vCardId)
        .then((res) => {
          setVCard(res.edit);
        })
        .catch(console.error);
    } else {
      setImage(null);
      getVCardInfo(props.listId, props.properties.listModeloId).then((data) => {
        setVCard(data);
        if (data.ModeloId == 0) {
          setShowErrorModel(true);

        } else {
          setShowErrorModel(false);
        }
      });
    }

    setOptions([
      { key: 'Com foto', text: `${props.textFoto}` },
      { key: 'Sem foto', text: `${props.textnotFoto}` }
    ]);
    // setOptionsIdioma([
    //   { key: 'Português', text: `${props.textDropIdiomaPT}` },
    //   { key: 'Inglês', text: `${props.textDropIdiomaEN}` },
    //   { key: 'Espanhol', text: `${props.textDropIdiomaES}` },
    // ]);

    switch (foto) {
      case 'Com foto':
        return setImage(true);
      case 'Sem foto':
        return setImage(false)
    }
  }, [props.vCardId, foto, model]);

  const onChangeImagem = useCallback(
    (file: File) => {
      setVCard({ ...vCard, Foto: { file: file } as IFieldImage });
    },
    [vCard]
  );

  useEffect(() => {
    if (vCard?.Foto?.file === null) {
      setCheckFoto(false);
    } else if (vCard?.Foto?.file != null) {
      setCheckFoto(true);
    }
    if (image === false) {
      setCheckFoto(true);
    }
  }, [image, vCard])

  const onCLick = useCallback((
  ) => {
    if (model == null) {
      alert('Por favor, selecione Empresa e Idioma.');
    } else if (checkFoto === false) {
      alert('Por favor, selecione uma imagem.');
    } else {
      if (ref != null) {
        if (ref.current.checkValidity()) {
          if (showErrorModel == true) {
            setHiddenErrorModel(false);
          }
          else {
            setHidden(!hidden);
          }
        } else {
          ref.current.requestSubmit();
        }
      }
    }
  }, [hidden, ref, showErrorModel, hiddenErrorModel, model, foto, vCard, checkFoto, image]);
  const onCLickCancel = useCallback(() => {
    setHidden(true);
  }, [hidden]);

  const onNotCLickImage = useCallback(() => {
    setImage(true);
  }, [image]);

  const onCLickImage = useCallback(() => {
    setImage(false);
  }, [image]);

  const onCLickErrorModel = useCallback(() => {
    setHiddenErrorModel(true);
    props.onClosePanel();

  }, [hiddenErrorModel]);


  const onCloseSub = useCallback(() => {
    setVCard(null);
    props.onClosePanel();
  }, [props.vCardId]);

  const onSubForm = useCallback(
    (ev) => {
      ev.preventDefault();
      setLoaded(false);
      save(props.listId, vCard, image, model).then(() => {
        setHidden(true);
        onCloseSub();
        setTimeout(() => { setLoaded(true); }, 3000);
      });
    },
    [vCard, loaded, image]
  );


  const onChangeDropdown = useCallback(
    (name: string, value: number) => {
      switch (name) {
        case "empresa":
          return setModel(value);
      }
    },
    [vCard, model]
  );

  const onChangeText = useCallback(
    (
      ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
      newValue?: string
    ) => {
      switch (ev.target["name"]) {
        case "Nome":
          return setVCard({ ...vCard, Title: newValue });
        case "Area":
          return setVCard({ ...vCard, Area: newValue });
        case "Email":
          return setVCard({ ...vCard, Email: newValue });
        case "Telefone":
          return setVCard({ ...vCard, Telefone: newValue });
        case "wpp":
          return setVCard({ ...vCard, WhatsApp: newValue });
      }
    },
    [vCard]
  );


  return {
    vCard,
    isOpen: props.vCardId != -1,
    onChangeDropdown,
    onCloseSub,
    onChangeImagem,
    onChangeText,
    onSubForm,
    onCLick,
    hidden,
    ref,
    vCardGraph,
    loaded,
    showErrorModel,
    onCLickCancel,
    hiddenErrorModel,
    onCLickErrorModel,
    onCLickImage,
    onNotCLickImage,
    image,
    onChangeDropdownImage,
    options,
    optionsIdioma,
  };
};
