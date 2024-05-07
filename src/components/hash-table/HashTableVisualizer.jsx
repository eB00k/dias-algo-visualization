import { useState } from "react";
import HashTable from "./HashTable";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function HashTableList({ hashTable }) {
  return (
    <div className="hash-table">
      {hashTable.table.map((bucket, index) => (
        <div key={index} className="hash-table-bucket">
          {bucket.map(({ key, value }) => (
            <div key={key} className="hash-table-entry">
              <div className="hash-table-key">{key}</div>
              <div className="hash-table-value">{value}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function HashTableVisualizer({ hashTable, setHashTable, collisionStrategy }) {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  const handleInsert = () => {
    if (key && value) {
      hashTable.set(key, value, collisionStrategy);
      setKey("");
      setValue("");
      //setHashTable(new HashTable(hashTable)); // To trigger re-render
    }
  };

  const handleDelete = () => {
    if (key) {
      hashTable.remove(key);
      setKey("");
      //setHashTable(new HashTable(hashTable)); // To trigger re-render
    }
  };

  const handleFind = () => {
    if (key) {
      const foundValue = hashTable.get(key);
      if (foundValue !== undefined) {
        alert(`Value found: ${foundValue}`);
      } else {
        alert("Value not found");
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-2 mb-4">
        <Input
          type="text"
          placeholder="Key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="md:max-w-96"
        />
        <Input
          type="text"
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="md:max-w-96"
        />
        <Button onClick={handleInsert} className="bg-blue-500 text-white">
          Insert
        </Button>
        <Button onClick={handleDelete} className="bg-red-500 text-white">
          Delete
        </Button>
        <Button onClick={handleFind} className="bg-gray-500 text-white">
          Find
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {hashTable.table.map((bucket, index) => (
          <div
            key={index}
            className="border rounded-md p-2 mr-2 w-20 h-10 bg-border"
          >
            <div>
              {bucket.map(({ key, value }) => (
                <div key={key} className="flex">
                  <div className="font-bold mr-2">{index} :</div>
                  <div>{value}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HashTableVisualizer;
