import * as React from "react";
import * as QRCode from "qrcode.react";
import styled from "./qrcode.module.scss";


export interface IQRcode {
  qrcodeValue: string;
  corTextDetails: string;
  textQrCode: string;
}
export const Qrcode: React.FC<IQRcode> = (props) => {
  return (
    <div className={styled.container}>
      <div className={styled.qrContainer}>
        <div>
          <QRCode value={props.qrcodeValue} size={180} className={styled.qrborder} />
        </div>
      </div>
      <div className={styled.Text}>
        <span>
          <h1 style={ props.corTextDetails ? {color: `${props.corTextDetails}`} : {color: '#FFF'}}>{props.textQrCode}</h1>
        </span>
      </div>
    </div>
  );
};
