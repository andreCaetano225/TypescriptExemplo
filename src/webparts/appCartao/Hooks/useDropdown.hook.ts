import { IDropdownOption } from "office-ui-fabric-react";
import { useCallback, useState } from "react";

export interface IOptions {
  options: IDropdownOption[];
  selectedOption: string;
  onChange: (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => void;
  load: (data: IDropdownOption[]) => void;
  change: (status: string) => void;
}

export const useDropdown = (onStatusChange: (newStatus: string, resetCards: boolean) => void): IOptions => {
  const [options, setOptions] = useState<IDropdownOption[]>([]);
  const [selectedOption, setSelectedOption] = useState("todos");

  const onChange = useCallback(
    (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {
      if (option.key === selectedOption) {
        return;
      }
      setSelectedOption(option.key.toString());
      onStatusChange(option.key.toString(), true);
    },
    [selectedOption],
  );
  const change = useCallback(
    (status: string) => {
      setSelectedOption(status);
      onStatusChange(status, true);
    },
    [selectedOption],
  );

  const load = useCallback(
    (data: IDropdownOption[]) => {
      setOptions(data);
    },
    [options],
  );

  return {
    options,
    selectedOption,
    onChange,
    change,
    load
  };
};
