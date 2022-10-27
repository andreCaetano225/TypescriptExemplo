import * as React from "react";
import { useRef } from "react";
import { useCardHooks, IAppCartaoPdfProps } from "./donwload.hook";
import styles from "./download.module.scss";

import ReactToPrint from "react-to-print";
import { DefaultButton } from "office-ui-fabric-react";
import { CardViewer } from "shared/components/card-viewer";

const AppCartaoPdf: React.FC<IAppCartaoPdfProps> = (
  props: IAppCartaoPdfProps
) => {
  const { card, avatar, model, loaded } = useCardHooks(props);

  const componentRef = useRef();

  return (
    <>
      <div style={{ display: "none" }}>
        <div ref={componentRef} className={styles.appCartaoPdf}>
          <CardViewer model={model} card={card} avatar={avatar}/>
        </div>
      </div>
      <div>
        <ReactToPrint
          pageStyle={"@page {size: A4;margin:0mn !important;}"}
          trigger={() => (
            <DefaultButton
              iconProps={{ iconName: "download" }}
              text={`${props.textButton} [${props.textSigla}]`}
              className={styles.buttonstyle}
            />
          )}
          content={() => componentRef.current}
        />
      </div>
    </>
  );
};

export default AppCartaoPdf;
