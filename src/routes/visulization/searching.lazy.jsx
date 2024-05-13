import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { delay } from "@/lib/utils";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export const Route = createLazyFileRoute("/visulization/searching")({
  component: SearchingAlgos,
});

function SearchingAlgos() {
  const [initialArray, setInitialArray] = useState([]);
  const [sortedArray, setSortedArray] = useState([]);
  const [linearSearchIndex, setLinearSearchIndex] = useState(-1);
  const [binarySearchIndex, setBinarySearchIndex] = useState(-1);
  const [searchResultLinear, setSearchResultLinear] = useState(-1);
  const [searchResultBinary, setSearchResultBinary] = useState(-1);
  const [searchTarget, setSearchTarget] = useState("");

  useEffect(() => {
    // Function to generate a random integer between min and max (inclusive)
    const getRandomInt = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    // Generate a random initial array of length 50 with numbers between 1 and 100
    const randomArray = Array.from({ length: 50 }, () => getRandomInt(1, 100));
    console.log("randomArray", randomArray);
    setInitialArray(randomArray);
    setSortedArray([...randomArray].sort((a, b) => a - b));
  }, []);

  const linearSearch = async (target) => {
    for (let i = 0; i < initialArray.length; i++) {
      setLinearSearchIndex(i);
      await delay(500);
      if (initialArray[i] === target) {
        setSearchResultLinear(i);
        break;
      }
    }
  };

  const binarySearch = async (target) => {
    let left = 0;
    let right = sortedArray.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      setBinarySearchIndex(mid);
      await delay(500);
      if (sortedArray[mid] === target) {
        setSearchResultBinary(mid);
        break;
      } else if (sortedArray[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  };

  const handleSearchBoth = () => {
    const target = parseInt(searchTarget);
    if (!target) return;
    setSearchResultBinary(-1);
    setSearchResultLinear(-1);
    linearSearch(target);
    binarySearch(target);
  };

  return (
    <div className="page">
      <div className="w-full">
        <h1 className="page-title">Searching</h1>
        <div className="flex gap-2 my-4">
          <Input
            type="number"
            placeholder="Enter search target"
            value={searchTarget}
            onChange={(e) => setSearchTarget(e.target.value)}
            className="md:max-w-96"
          />
          <Button variant="secondary" onClick={handleSearchBoth}>
            Run Both
          </Button>
        </div>
        <div>
          <div className="flex flex-col md:flex-row flex-wrap gap-4 justify-between">
            <SearchAlgoComponent
              arr={initialArray}
              label="Linear Search"
              searchTarget={searchTarget}
              onSearch={linearSearch}
              searchIndex={linearSearchIndex}
              searchResult={searchResultLinear}
              setSearchResult={setSearchResultLinear}
            />
            <SearchAlgoComponent
              arr={sortedArray}
              label="Binary Search"
              searchTarget={searchTarget}
              onSearch={binarySearch}
              searchIndex={binarySearchIndex}
              searchResult={searchResultBinary}
              setSearchResult={setSearchResultBinary}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchAlgoComponent({
  arr,
  label,
  searchTarget,
  onSearch,
  searchIndex,
  searchResult,
  setSearchResult,
}) {
  const handleSearch = (target) => {
    setSearchResult(-1);
    onSearch(parseInt(target));
  };

  return (
    <div className="flex-1 ">
      <Button
        variant={"destructive"}
        onClick={() => handleSearch(searchTarget)}
        className="my-2"
      >
        {label}
      </Button>
      {/* grid grid-cols-5 sm:grid-cols-7 gap-2 place-items-center  */}
      <div className="flex flex-wrap gap-2">
        {arr.map((item, index) => {
          return (
            <div
              key={index}
              className={twMerge(
                "w-16 h-16 bg-border flex justify-center items-center rounded-lg border",
                index === searchIndex ? "bg-blue-400 animate-ping" : "",
                index === searchResult && searchResult !== -1
                  ? "bg-green-400 animate-bounce"
                  : ""
              )}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
}
