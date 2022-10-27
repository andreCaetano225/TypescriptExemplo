import * as React from "react";
import { useEffect, useRef } from "react";
import styles from "./image.module.scss";
import { DefaultButton } from "office-ui-fabric-react";
import { IconsImage } from "../../utils/icon";
import { IFieldImage } from "shared/types/IFieldImage";

export interface IImageUploadProps {
  foto: IFieldImage;
  onChange: (file: File) => void;
  disabled?: boolean;
}

export const FormImage: React.FC<IImageUploadProps> = ({
  foto,
  onChange,
  disabled,
}) => {
  const ref = useRef(null);
  useEffect(() => {
    console.log({ foto: foto?.file });
  }, [foto]);
  return (
    <>
      <div className={styles.Image}>
        <img
          src={
            foto ? foto.file ? URL.createObjectURL(foto.file) : foto.Url ? foto.Url : `${IconsImage.user}` : `${IconsImage.user}`
          }
          alt="Adicionar foto de perfil"
          onClick={() => {
            if (!disabled) {
              ref.current.click();
            }
          }}
        />
        <input
          multiple={false}
          accept=".jpg,.jpeg,.png,.svg"
          style={{ display: "none" }}
          onChange={(ev) => {
            const file = ev.target.files[0];
            onChange(file);
          }}
          ref={ref}
          type="file"
        />
        <div>
          <DefaultButton
            text="Alterar imagem"
            iconProps={{ iconName: "Upload" }}
            className={styles.ButtonI}
            onClick={() => {
              if (!disabled) {
                ref.current.click();
              }
            }}
          />
        </div>
      </div>
    </>
  );
};
