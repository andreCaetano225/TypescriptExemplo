import * as React from "react";
import styles from "./AppCartao.module.scss";
import { IAppCartaoProps } from "./IAppCartaoProps";
import { useApp } from "../Hooks/useApp.hook";
import { WebPartPT } from "./ContentePT";
import { WebPartES } from "./ContenteES";

export const AppCartao: React.FC<IAppCartaoProps> = (props) => {
  const {
    cards,
    columns,
    dropdownStatus,
    dropdownStatusES,
    editId,
    onClosePanel,
    onClick,
    onLoadMore,
    hasNext,
    loaded,
    isOpen,
    onConfirm,
    onCancel,
    warningModal,
    onChangeDropdownIdioma,
    options,
    columnsMobile,
    es
  } = useApp(props);
  
  return (
    <>
    <div>
      {es ? (
        <div className={styles.background}>
        <WebPartES 
        properties={props.properties}
        cards={cards} 
        columns={columns} 
        editId={editId} 
        onClosePanel={onClosePanel} 
        onClick={onClick}
        onLoadMore={onLoadMore}
        hasNext={hasNext}
        loaded={loaded}
        isOpen={isOpen}
        onConfirm={onConfirm}
        onCancel={onCancel}
        warningModal={warningModal}
        dropdownStatusES={dropdownStatusES}
        onChangeDropdownIdioma={onChangeDropdownIdioma}
        options={options}
        columnsMobile={columnsMobile}
        />
      </div>
      ) : (
        <div className={styles.background}>
        <WebPartPT 
        properties={props.properties}
        cards={cards} 
        columns={columns} 
        editId={editId} 
        onClosePanel={onClosePanel} 
        onClick={onClick}
        onLoadMore={onLoadMore}
        hasNext={hasNext}
        loaded={loaded}
        isOpen={isOpen}
        onConfirm={onConfirm}
        onCancel={onCancel}
        warningModal={warningModal}
        dropdownStatus={dropdownStatus}
        onChangeDropdownIdioma={onChangeDropdownIdioma}
        options={options}
        columnsMobile={columnsMobile}
        />
      </div>
      ) }
    </div>
    
      
      </>
  );
};
