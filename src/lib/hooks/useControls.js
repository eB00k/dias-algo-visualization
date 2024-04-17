import { useState, useCallback } from "react";

export const useControls = () => {
  const [barNumber, setBarNumber] = useState(25);

  return {
    barNumber,
    setBarNumber,
  };
};

export const useData = () => {
  const [algorithm, setAlgorithm] = useState("BubbleSort");
  const [sortingArray, setSortingArray] = useState([]);

  function generateRandomArray(
    numberOfBars = 50,
    maxHeight = 400,
    minHeight = 10
  ) {
    const arr = [];
    for (let i = 0; i < numberOfBars; i++) {
      arr.push(
        Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight
      );
    }
    return arr;
  }

  return {
    algorithm,
    sortingArray,
    setAlgorithm,
    setSortingArray,
    generateRandomArray,
  };
};
