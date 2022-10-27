import * as React from "react";
import { ICardViewerProps, useCardViewer } from "./useCardViewer";
import styles from "./viewer.module.scss";
import { Header } from "../controls/header";
import { Name } from "../controls/name";
import { DetailsCartao } from "../controls/details";
import { DetailsClick } from "../controls/detailsclick";
import { Qrcode } from "../controls/qrcode";

export const CardViewer: React.FC<ICardViewerProps> = (props) => {
  const getPageMargins = () => {
    return `@page { margin: 0 !important; }`;
  };
  const qrcodeValue = useCardViewer(props);
  return (
    <>
    {console.log(props.model.TextIcon)}
      <div className={styles.controls}>
        <style>{getPageMargins()}</style>
        {props.card.Foto ? (
        <>
        <img
          src={props.model.FundoComFoto}
          alt="fundo"
          style={{ position: "absolute" }}
        />
        </>
        ) : (
          <>
          <img
          src={props.model.Fundo}
          alt="fundo"
          style={{ position: "absolute" }}
        />
          </>
        )}
        <div className={styles.container}>
          <Name 
          name={props.card.Title} 
          area={props.card.Area} 
          corname={props.model.CorFonteNome} 
          corarea={props.model.CorFonteArea} 
          FotoUser={props.card.Foto}
          
          />
          {props.model && (
            <DetailsCartao
              email={props.card.Email}
              Iconemail={props.model.IconEmail}
              telefone={props.card.Telefone}
              Icontelefone={props.model.IconTelefone}
              whatsapp={props.card.WhatsApp}
              Iconwhatsapp={props.model.IconWhatsApp}
              site={props.model.Site}
              IconSite={props.model.IconSite}
            />
          )}
          {/* {props.model && (
            <DetailsClick IconClick={props.model.IconClick} corText={props.model.CorFonteDetalhesCard} textIcon={props.model.TextIcon}/>
          )} */}
          <Qrcode qrcodeValue={qrcodeValue} corTextDetails={props.model.CorFonteDetalhesCard} textQrCode={props.model.TextQrCode}/>
        </div>
      </div>
    </>
  );
};
