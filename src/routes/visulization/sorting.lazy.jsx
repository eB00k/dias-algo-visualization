import SelectOption from "@/components/ui/select/SelectOption";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useData, useControls } from "@/lib/hooks/useControls";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { delay } from "@/lib/utils";

export const Route = createLazyFileRoute("/visulization/sorting")({
  component: Sorting,
});

function Sorting() {
  const { barNumber, setBarNumber, speed, handleChangeSpeed } = useControls();
  const {
    algorithm,
    setAlgorithm,
    sortingArray,
    setSortingArray,
    generateRandomArray,
  } = useData();

  const [comparingIndices, setComparingIndices] = useState([]);
  const [swappingIndices, setSwappingIndices] = useState([]);
  const [movingIndex, setMovingIndex] = useState(null);
  const [bucketStates, setBucketStates] = useState([]);

  const sortingAlgos = {
    BubbleSort: bubbleSortAnimation, // done
    InsertionSort: insertionSortAnimation, // done
    SelectionSort: selectionSortAnimation, // done
    MergeSort: mergeSortAnimation, // done
    QuickSort: quickSortAnimation,
    RadixSort: radixSortAnimation,
    HeapSort: heapSortAnimation,
  };

  const handleChangeBarNumber = (e) => {
    setBarNumber(e[0]);
  };

  const handlePlay = () => {
    sortingAlgos[algorithm]();
  };

  useEffect(() => {
    setSortingArray(generateRandomArray(barNumber, 440, 15));
  }, [barNumber]);

  // Bubble Sort
  async function bubbleSortAnimation() {
    const newArray = [...sortingArray];
    const n = newArray.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        // Set comparing indices to highlight the elements being compared
        setComparingIndices([j, j + 1]);

        if (newArray[j] > newArray[j + 1]) {
          [newArray[j], newArray[j + 1]] = [newArray[j + 1], newArray[j]];
          setSortingArray([...newArray]);
          console.log(speed);
          await delay(speed);
        }
      }
      // Clear comparing indices after sorting completes
      setComparingIndices([]);
    }
  }

  // Insertion Sort
  async function insertionSortAnimation() {
    const newArray = [...sortingArray];
    const n = newArray.length;

    for (let i = 1; i < n; i++) {
      let key = newArray[i];
      let j = i - 1;

      setMovingIndex(i);

      while (j >= 0 && newArray[j] > key) {
        setComparingIndices([j, j + 1]);
        await delay(speed);
        newArray[j + 1] = newArray[j];
        setSortingArray([...newArray]);
        setSwappingIndices([j, j + 1]);
        await delay(speed);
        setSwappingIndices([]);
        j = j - 1;
      }

      newArray[j + 1] = key;
      setMovingIndex(null);
      setSortingArray([...newArray]);
      await delay(speed);
      setComparingIndices([]);
    }
  }

  // Selection Sort
  async function selectionSortAnimation() {
    const newArray = [...sortingArray];
    const n = newArray.length;

    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;
      setComparingIndices([minIndex]);

      for (let j = i + 1; j < n; j++) {
        setComparingIndices([minIndex, j]);
        await delay(speed);

        if (newArray[j] < newArray[minIndex]) {
          minIndex = j;
        }
      }

      [newArray[i], newArray[minIndex]] = [newArray[minIndex], newArray[i]];
      setSortingArray([...newArray]);
      await delay(speed);
      setComparingIndices([]);
    }
  }

  // Merge Sort
  async function mergeSortAnimation() {
    const newArray = [...sortingArray];
    const n = newArray.length;
    await mergeSortHelper(newArray, 0, n - 1);
  }

  async function mergeSortHelper(arr, start, end) {
    if (start < end) {
      const mid = Math.floor((start + end) / 2);
      await mergeSortHelper(arr, start, mid);
      await mergeSortHelper(arr, mid + 1, end);
      await merge(arr, start, mid, end);
    }
  }

  async function merge(arr, start, mid, end) {
    const n1 = mid - start + 1;
    const n2 = end - mid;

    const leftArray = new Array(n1);
    const rightArray = new Array(n2);

    for (let i = 0; i < n1; i++) {
      leftArray[i] = arr[start + i];
    }

    for (let j = 0; j < n2; j++) {
      rightArray[j] = arr[mid + 1 + j];
    }

    let i = 0;
    let j = 0;
    let k = start;

    while (i < n1 && j < n2) {
      if (leftArray[i] <= rightArray[j]) {
        arr[k] = leftArray[i];
        i++;
      } else {
        arr[k] = rightArray[j];
        j++;
      }
      setComparingIndices([start + i, mid + 1 + j]);
      setSortingArray([...arr]);
      await delay(speed);
      k++;
    }

    while (i < n1) {
      arr[k] = leftArray[i];
      i++;
      k++;
    }

    while (j < n2) {
      arr[k] = rightArray[j];
      j++;
      k++;
    }

    setComparingIndices([]);
    setSortingArray([...arr]);
  }

  // Quick Sort
  async function quickSortAnimation() {
    const newArray = [...sortingArray];
    await quickSortHelper(newArray, 0, newArray.length - 1);
  }

  async function quickSortHelper(arr, low, high) {
    if (low < high) {
      const pivotIndex = await partition(arr, low, high);
      await quickSortHelper(arr, low, pivotIndex - 1);
      await quickSortHelper(arr, pivotIndex + 1, high);
    }
  }

  async function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setComparingIndices([i, j]);
        setSortingArray([...arr]);
        await delay(speed);
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setComparingIndices([i + 1, high]);
    setSortingArray([...arr]);
    await delay(speed);
    setComparingIndices([]);
    return i + 1;
  }

  // Radix Sort
  async function radixSortAnimation() {
    const newArray = [...sortingArray];
    const maxNum = Math.max(...newArray);
    const maxDigitCount = digitCount(maxNum);
    for (let k = 0; k < maxDigitCount; k++) {
      let digitBuckets = Array.from({ length: 10 }, () => []);
      for (let i = 0; i < newArray.length; i++) {
        let digit = getDigit(newArray[i], k);
        digitBuckets[digit].push(newArray[i]);
        setBucketStates([...digitBuckets]);
        await delay(speed);
      }
      newArray.splice(0, newArray.length, ...digitBuckets.flat());
      setSortingArray([...newArray]);
    }
  }

  function digitCount(num) {
    if (num === 0) return 1;
    return Math.floor(Math.log10(Math.abs(num))) + 1;
  }

  function getDigit(num, place) {
    return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
  }

  // Heap Sort
  async function heapSortAnimation() {
    let n = sortingArray.length;

    // Build a max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(sortingArray, n, i);
    }

    // Heap sort
    for (let i = n - 1; i > 0; i--) {
      // Swap root (maximum element) with the last element
      let temp = sortingArray[0];
      sortingArray[0] = sortingArray[i];
      sortingArray[i] = temp;

      setSortingArray([...sortingArray]);
      await delay(speed);

      // Heapify the reduced heap
      await heapify(sortingArray, i, 0);
    }
  }

  async function heapify(arr, n, i) {
    let largest = i; // Initialize largest as root
    let left = 2 * i + 1; // Left child
    let right = 2 * i + 2; // Right child

    // If left child is larger than root
    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }

    // If right child is larger than largest so far
    if (right < n && arr[right] > arr[largest]) {
      largest = right;
    }

    // If largest is not root
    if (largest !== i) {
      // Swap
      let temp = arr[i];
      arr[i] = arr[largest];
      arr[largest] = temp;

      setSortingArray([...arr]);
      await delay(speed);

      // Recursively heapify the affected sub-tree
      await heapify(arr, n, largest);
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
          step={10}
          defaultValue={[barNumber]}
          onValueChange={handleChangeBarNumber}
        />
        <output className="flex items-center justify-center">
          {barNumber}
        </output>
        <Slider
          min={1}
          max={100}
          step={1}
          defaultValue={[speed]}
          onValueChange={handleChangeSpeed}
        />
        <output className="flex items-center justify-center">{speed}</output>
        <Button variant="destructive" onClick={handlePlay}>
          Play
        </Button>
      </div>

      <div className="pt-4 w-full">
        <div className="w-full bg-secondary h-[500px] flex items-end space-x-1">
          {sortingArray.map((item, index) => {
            const isInBucket = bucketStates.some((bucket) =>
              bucket.includes(item)
            );
            const isComparing = comparingIndices.includes(index);
            const isSwapping = swappingIndices.includes(index);
            const isMoving = movingIndex === index;
            let barColor = "#3498db";

            if (isComparing) {
              barColor = "#e74c3c";
            } else if (isSwapping) {
              barColor = "#f39c12";
            } else if (isMoving) {
              barColor = "#2ecc71";
            }

            return (
              <div
                key={index}
                className="flex-[1] bg-bluish rounded-t-md rounded-b-sm"
                style={{
                  height: item,
                  backgroundColor: barColor,
                }}
                title={item}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
