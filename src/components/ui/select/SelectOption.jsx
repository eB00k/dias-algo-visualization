import { useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";

function SelectOption({ setValue, defaultValue, options = [] }) {
  const handleSelectOnChange = useCallback((value) => {
    setValue(value);
    // resetSorting();
  }, []);

  return (
    <Select onValueChange={handleSelectOnChange} defaultValue={defaultValue}>
      <SelectTrigger className="w-[200px] bg-secondary">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((item) => (
          <SelectItem key={item.name} value={item.name}>
            {item.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SelectOption;
