import { IDropdownOption } from "office-ui-fabric-react";
import { useCallback, useEffect, useState } from "react";
import { getDropdownOptions } from "webparts/appCartao/api/dropdown.api";

export interface IDropdownProps {
  listId: string;
  name: string;
  defaultValue?: number;
  onChange: (name: string, value: number, data?: number[]) => void;
}

export interface IDropdown {
  options: IDropdownOption[];
  onChange: (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption,
    index?: number
  ) => void;
  defaultValue: number;
}

export const useFormDropdown = (props: IDropdownProps): IDropdown => {
  const [options, setOptions] = useState<IDropdownOption[]>([]);

  const onChange = useCallback(
    (
      event: React.FormEvent<HTMLDivElement>,
      option?: IDropdownOption,
      index?: number
    ) => {
      if (option.key) {
        props.onChange(props.name, parseInt(option.key.toString()), option.data);


      } else {
        props.onChange(props.name, null);
      }
    },
    [props.name, props.defaultValue]
  );

  useEffect(() => {
    if (props.listId) {
      getDropdownOptions(props.listId)
        .then((res) => {
          setOptions(res);
        })
        .catch(console.error);
    }
  }, [props.listId]);

  return {
    options,
    onChange,
    defaultValue: props.defaultValue,
  };
};
