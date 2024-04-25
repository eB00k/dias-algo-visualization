import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SelectOption from "@/components/ui/select/SelectOption";
import { stackOptions } from "@/lib/store/config";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";

export const Route = createLazyFileRoute("/visulization/stack")({
  component: Stack,
});

function StackContainer({ arr }) {
  return (
    <div className="w-[var(--stack-container-width)] h-[320px] border-4 border-t-0 border-bluish rounded-b-xl flex gap-1 flex-col-reverse p-1 overflow-y-auto flex-end">
      {arr.map((item, index) => (
        <div
          key={index}
          className="h-10 min-h-10 w-full rounded-lg bg-emerald-600 flex justify-center items-center text-white"
        >
          {item}
        </div>
      ))}
    </div>
  );
}

function QueueContainer({ arr }) {
  return (
    <div className="w-[90%] max-w-[500px] h-24 border-4 border-bluish flex justify-start gap-1 p-1 overflow-x-auto border-l-0 border-r-0">
      {arr.map((item, index) => (
        <div
          key={index}
          className="h-full min-w-16 w-16 rounded-lg bg-emerald-600 flex justify-center items-center text-white"
        >
          {item}
        </div>
      ))}
    </div>
  );
}

function Stack() {
  const [arr, setArr] = useState([]);
  const [history, setHistory] = useState([]);
  const [selected, setSelected] = useState("Stack");
  const inputRef = useRef(null);

  let container;

  switch (selected) {
    case "Stack":
      container = <StackContainer arr={arr} />;
      break;
    case "Queue":
      container = <QueueContainer arr={arr} />;
      break;
    default:
      container = <StackContainer arr={arr} />;
  }

  const addToHistory = (action) => {
    setHistory((prev) => [...prev, action]);
  };

  const handlePush = () => {
    const val = inputRef.current.value;
    if (!val) return;
    const action = selected === "Stack" ? `${val} pushed` : `${val} enqueued`;
    addToHistory(action);
    setArr((prev) => [...prev, val]);
    inputRef.current.value = ""; // Clear input after pushing
  };

  const handlePop = () => {
    if (arr.length === 0) return;
    const topItem = arr[arr.length - 1];
    const action =
      selected === "Stack" ? `${topItem} popped` : `${topItem} dequeued`;
    addToHistory(action);
    setArr((prev) => {
      return selected === "Stack" ? prev.slice(0, -1) : prev.slice(1);
    });
  };

  const handleTop = () => {
    if (arr.length === 0) return;
    const action =
      selected === "Stack"
        ? `Top element is ${arr[arr.length - 1]}`
        : `Front element is ${arr[0]}`;
    addToHistory(action);
  };

  return (
    <div className="page">
      <div className="w-full">
        <h1 className="p-1 text-slate-500 font-bold">Stack & Queue </h1>
        <div className="flex flex-col h-[500px] gap-2">
          <div className="flex w-full justify-between flex-col gap-2 p-2 md:flex-row">
            <SelectOption
              options={stackOptions}
              defaultValue={selected}
              setValue={setSelected}
            ></SelectOption>
            <div className="flex gap-2 justify-between flex-col md:flex-row">
              <Input
                type={"number"}
                className="w-full md:max-w-48"
                ref={inputRef}
              />
              <div className="flex space-x-2">
                <Button className="w-full" onClick={handlePush}>
                  {selected === "Stack" ? "Push" : "Enqueue"}
                </Button>
                <Button className="w-full" onClick={handlePop}>
                  {selected === "Stack" ? "Pop" : "Dequeue"}
                </Button>
                <Button className="w-full" onClick={handleTop}>
                  {selected === "Stack" ? "Top" : "Front"}
                </Button>
              </div>
            </div>
          </div>
          <div className="flex h-[420px] bg-secondary w-full rounded-md">
            <div className="flex-[1.5] h-full flex justify-center items-center ">
              {container}
            </div>
            <div className="flex-1 border-2 border-dotted h-full overflow-y-auto hidden md:block">
              <ul>
                {history.map((action, index) => (
                  <li key={index}>{action}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
