import SelectOption from "@/components/ui/select/SelectOption";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useData, useControls } from "@/lib/hooks/useControls";
import { Slider } from "@/components/ui/slider";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { delay } from "@/lib/utils";

export const Route = createLazyFileRoute("/visulization/sorting")({
  component: Sorting,
});

function Sorting() {
  const data = useData();
  const { barNumber, setBarNumber } = useControls();
  const [
    algorithm,
    setAlgorithm,
    sortingArray,
    setSortingArray,
    generateRandomArray,
  ] = [
    data.algorithm,
    data.setAlgorithm,
    data.sortingArray,
    data.setSortingArray,
    data.generateRandomArray,
  ];

  const sortingAlgos = {
    BubbleSort: () => bubbleSortAnimation(),
  };

  const handleChangeSlider = (e) => {
    setBarNumber(e[0]);
  };

  const handlePlay = () => {
    console.log("algorithm", algorithm);
    sortingAlgos[algorithm]();
  };

  useEffect(() => {
    setSortingArray(generateRandomArray(barNumber, 440, 15));
  }, [barNumber]);

  // Bubble Sort algorithm
  async function bubbleSortAnimation() {
    const newArray = [...sortingArray];
    const n = newArray.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (newArray[j] > newArray[j + 1]) {
          // Swap elements
          [newArray[j], newArray[j + 1]] = [newArray[j + 1], newArray[j]];
          setSortingArray([...newArray]);
          await delay(100); // Adjust delay as needed for animation speed
        }
      }
    }
  }

  return (
    <div className="page">
      <h1>Sorting Algorithms</h1>

      <div className="flex space-x-4">
        <SelectOption
          algorithm={algorithm}
          setAlgorithm={setAlgorithm}
          resetSorting={() => console.log("resetting sorting")}
        />
        <Slider
          min={10}
          max={100}
          step={1}
          defaultValue={[barNumber]}
          onValueChange={handleChangeSlider}
        />
        <output className="flex items-center justify-center">
          {barNumber}
        </output>
        <Button variant="destructive" onClick={handlePlay}>
          Play
        </Button>
      </div>

      <div className="pt-4 w-full">
        <div className="w-full bg-secondary h-[500px] flex items-end space-x-1">
          {sortingArray.map((item, index) => {
            return (
              <div
                key={index}
                className="flex-[1] bg-bluish rounded-t-md rounded-b-sm transition-height duration-300 ease-in"
                style={{ height: item }}
                title={item}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
