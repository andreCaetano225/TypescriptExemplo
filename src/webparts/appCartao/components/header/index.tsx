import * as React from "react";
import {
  BaseButton,
  Button,
  DefaultButton,
  Dropdown,
  IDropdownOption,
  IDropdownStyles,
  PrimaryButton
} from "office-ui-fabric-react";
import { IOptions } from "../../Hooks/useDropdown.hook";
import styles from "./header.module.scss";

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 186 },
};
const dropdownStylesMobile: Partial<IDropdownStyles> = {
  dropdown: { width: 100 },
};

interface IHeader {
  dropdownStatus: IOptions;
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
  cardTitle: string;
  textButton: string;
  onChangeDropdownIdioma: (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => void;
  options: IDropdownOption[];
  textIdioma: string;
}
export const Header: React.FC<IHeader> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.titleHeader}>
      <span className={styles.Title}>{props.cardTitle}</span>
      <div className={styles.divFlex}>
      <div className={styles.divStatus}>
      <span className={styles.Status}>Status</span>
      <Dropdown
        styles={dropdownStyles}
        onChange={props.dropdownStatus.onChange}
        options={props.dropdownStatus.options}
        selectedKey={props.dropdownStatus.selectedOption}
        className={styles.dropdownDesktop}
      />
       <Dropdown
        styles={dropdownStylesMobile}
        onChange={props.dropdownStatus.onChange}
        options={props.dropdownStatus.options}
        selectedKey={props.dropdownStatus.selectedOption}
        className={styles.dropdownMobile}
      />
      </div>
      <span className={styles.Line} />
      <DefaultButton
        iconProps={{ iconName: "add" }}
        text={`${props.textButton}`}
        onClick={props.onClick}
        data-status="Rascunho"
        data-id={0}
        className={styles.Button}
      />
      </div>
      </div>
    </div>
  );
};
