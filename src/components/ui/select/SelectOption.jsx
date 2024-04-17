import { useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import { sortingAlgorithms } from "@/lib/store/config";

function SelectOption({ algorithm, setAlgorithm, resetSorting }) {
  const handleSelectOnChange = useCallback((value) => {
    setAlgorithm(value);
    resetSorting();
  }, []);

  return (
    <Select onValueChange={handleSelectOnChange} defaultValue={"BubbleSort"}>
      <SelectTrigger className="w-[200px] bg-secondary">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {sortingAlgorithms.map((algorithm) => (
          <SelectItem key={algorithm.name} value={algorithm.name}>
            {algorithm.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SelectOption;
