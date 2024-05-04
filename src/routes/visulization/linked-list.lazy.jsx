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

  const deleteNodeByValue = (valueToDelete) => {
    setNodes((prevNodes) => {
      let prevNode = null;
      const updatedNodes = prevNodes.filter((node) => {
        if (node.value === valueToDelete) {
          if (prevNode) {
            // Update the next pointer of the previous node
            prevNode.next = node.next;
          }
          return false; // Remove the node from the list
        }
        prevNode = node;
        return true; // Keep the node in the list
      });
      return updatedNodes;
    });

    setUsedBoxes((prevUsedBoxes) =>
      prevUsedBoxes.filter((position) => {
        const node = nodes.find((node) => node.position === position);
        return node ? node.value !== valueToDelete : true;
      })
    );
  };

  const clearLinkedList = () => {
    setNodes([]);
    setUsedBoxes([]);
  };

  function handleAdd() {
    const val = inputRef.current.value.trim();
    if (!val) return;

    addNode(val);
    inputRef.current.value = "";
  }

  const renderArrow = (fromPosition, toPosition) => {
    const fromRow = Math.floor((fromPosition - 1) / 6);
    const fromCol = (fromPosition - 1) % 6;
    const toRow = Math.floor((toPosition - 1) / 6);
    const toCol = (toPosition - 1) % 6;

    const gridWidth = 528;
    const gridHeight = 440;
    const cellWidth = gridWidth / 6;
    const cellHeight = gridHeight / 5;

    const fromX = (fromCol + 0.5) * cellWidth;
    const fromY = (fromRow + 0.5) * cellHeight;
    const toX = (toCol + 0.5) * cellWidth;
    const toY = (toRow + 0.5) * cellHeight;

    const angleRadians = Math.atan2(toY - fromY, toX - fromX);
    const angle = (angleRadians * 180) / Math.PI;

    const length = Math.sqrt(
      Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2)
    );

    console.log(angle);
    const arrowStyle = {
      width: `${length}px`,
      transformOrigin: "0 0px",
      transform: `rotate(${angle}deg)`,
    };

    return (
      <div
        key={`${fromX}-${fromY}`}
        className="absolute h-[5px] bg-gray-700 dark:bg-gray-300 z-20 rounded-full"
        style={{ ...arrowStyle, left: "44px", top: "44px" }}
      ></div>
    );
  };

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
            <div className="absolute z-10 -right-2 -top-2 w-8 h-8 bg-secondary-foreground text-primary-foreground flex justify-center items-center rounded-full">
              {node.position}
            </div>
            <div>next: {node.next || "null"}</div>
          </>
        ) : (
          <div>Place: {item}</div>
        )}
        {node && node.next && renderArrow(node.position, node.next)}
      </div>
    );
  };

  return (
    <div className="page">
      <h1 className="p-1 text-slate-500 font-bold">Linked List</h1>
      <div className="flex justify-evenly flex-col md:flex-row">
        <div className="p-2 flex gap-4 justify-center flex-col ">
          <Input ref={inputRef} type={"text"} className="md:max-w-[300px]" />
          <Button onClick={handleAdd}>+Add</Button>
          <Button
            onClick={() => deleteNodeByValue(parseInt(inputRef.current.value))}
          >
            Delete Node
          </Button>
          <Button onClick={clearLinkedList}>Clear List</Button>
        </div>
        <div className="flex justify-center items-center min-w-[600px]">
          <div className="w-[528px]  h-[440px] grid grid-cols-6 grid-rows-5">
            {boxes.map((row, rowIndex) => row.map((item) => renderBox(item)))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LinkedList;
