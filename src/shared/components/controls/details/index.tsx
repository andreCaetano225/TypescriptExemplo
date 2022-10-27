import * as React from "react";
import { useEffect, useState } from "react";
import styled from "./details.module.scss";

export interface DetailsProps {
  email: string;
  Iconemail: string;
  telefone: string;
  Icontelefone: string;
  whatsapp: string;
  Iconwhatsapp: string;
  site: string;
  IconSite: string;
}

export const DetailsCartao = (props: DetailsProps) => {
  return (
    <>
      <div className={styled.appDetails}>
        <div>
          {props.telefone ? (
            <a href={`tel:+${props.telefone}`}>
              <img src={props.Icontelefone} alt="IconTelefone" />
            </a>
          ) : null}
          {props.whatsapp ? (
            <a
              href={`https://api.whatsapp.com/send?phone=${props.whatsapp}`}
              target="_blank"
            >
              <img src={props.Iconwhatsapp} alt="IconWhatsApp" />
            </a>
          ) : null}
          <a href={`mailto:${props.email}`}>
            <img src={props.Iconemail} />
          </a>
          <a href={`${props.site}`} target="_blank" rel="noopener noreferrer">
            <img src={props.IconSite} alt="IconSite" />
          </a>
        </div>
      </div>
    </>
  );
};
