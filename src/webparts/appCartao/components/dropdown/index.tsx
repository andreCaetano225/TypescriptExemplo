import { Dropdown } from "office-ui-fabric-react";
import * as React from "react";
import { IDropdownProps, useFormDropdown } from "./dropdown.hooks";

export const FormDropdown: React.FC<IDropdownProps> = (props) => {
  const { options, onChange, defaultValue } = useFormDropdown(props);
  return (
    <>
      <Dropdown
        placeholder="Selecione"
        options={options}
        onChange={onChange}
        selectedKey={defaultValue}
        label={'Empresa e Idioma'}
      />
    </>
  );
};
