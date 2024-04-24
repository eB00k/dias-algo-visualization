import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateRandomBetween, generateUniqueNumbers } from "@/lib/utils";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export const Route = createLazyFileRoute("/visulization/linked-list")({
  component: LinkedList,
});

const boxes = [
  [1, 2, 3, 4, 5, 6],
  [7, 8, 9, 10, 11, 12],
  [13, 14, 15, 16, 17, 18],
  [19, 20, 21, 22, 23, 24],
  [25, 26, 27, 28, 29, 30],
];

function LinkedList() {
  const [nodes, setNodes] = useState([]);
  const [usedBoxes, setUsedBoxes] = useState([]);
  const inputRef = useRef(null);

  const numberOfUsedBoxes = generateRandomBetween(3, 9);
  const initialUsedBoxes = generateUniqueNumbers(1, 30, numberOfUsedBoxes);

  const addNode = (value) => {
    if (!value || isNaN(value)) {
      alert("Please enter a valid number.");
      return;
    }

    // creating a new node
    const newNode = {
      value: Number(value),
      next: null,
      position: getUnusedPosition(),
    };

    // setting the last node next to the new node's position
    if (nodes.length > 0) {
      setNodes((prevNodes) => {
        const lastNode = prevNodes[prevNodes.length - 1];
        return [
          ...prevNodes.slice(0, -1),
          { ...lastNode, next: newNode.position },
          newNode,
        ];
      });
    } else {
      setNodes([newNode]);
    }

    setUsedBoxes((prevUsedBoxes) => [...prevUsedBoxes, newNode.position]);
  };

  const getUnusedPosition = () => {
    const unusedPositions = boxes
      .flat()
      .filter((position) => !usedBoxes.includes(position));
    if (unusedPositions.length === 0) {
      return null;
    }
    return unusedPositions[Math.floor(Math.random() * unusedPositions.length)];
  };

  useEffect(() => {
    setUsedBoxes(initialUsedBoxes);
  }, []);

  function handleAdd() {
    const val = inputRef.current.value.trim();
    if (!val) return;

    addNode(val);
    inputRef.current.value = "";
  }

  const renderBox = (item) => {
    const node = nodes.find((node) => node.position === item);
    const bgColorClass = node
      ? "bg-emerald-400 dark:bg-emerald-500"
      : usedBoxes.includes(item)
        ? "bg-red-400 dark:bg-red-500"
        : "bg-slate-300 dark:bg-slate-500";

    return (
      <div
        key={item}
        className={twMerge(
          "relative bg-secondary-foreground m-1 rounded-lg text-white text-sm flex flex-col items-center justify-center white-space",
          bgColorClass
        )}
      >
        {node ? (
          <>
            <div>v: {node.value}</div>
            <div className="absolute z-10 -right-2 -top-2 w-8 h-8 bg-secondary-foreground flex justify-center items-center rounded-full">
              {node.position}
            </div>
            <div>next: {node.next || "null"}</div>
          </>
        ) : (
          <div>Place: {item}</div>
        )}
      </div>
    );
  };

  return (
    <div className="page">
      <h1>Linked List</h1>
      <div className="flex justify-evenly flex-col md:flex-row">
        <div className="p-2 flex space-x-4 justify-center">
          <Input ref={inputRef} type={"text"} className="max-w-[300px]" />
          <Button onClick={handleAdd}>+Add</Button>
        </div>
        <div className="flex justify-center items-center">
          <div className="w-[528px]  h-[440px] grid grid-cols-6 grid-rows-5">
            {boxes.map((row, rowIndex) => row.map((item) => renderBox(item)))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LinkedList;
