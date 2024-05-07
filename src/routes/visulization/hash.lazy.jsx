import HashTable from "@/components/hash-table/HashTable";
import HashTableVisualizer from "@/components/hash-table/HashTableVisualizer";
import SelectOption from "@/components/ui/select/SelectOption";
import { Slider } from "@/components/ui/slider";
import { hashCollisionStrategyOptions } from "@/lib/store/config";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createLazyFileRoute("/visulization/hash")({
  component: Hash,
});

function Hash() {
  const [size, setSize] = useState(10);
  const [selected, setSelected] = useState("linear");
  const [hashTable, setHashTable] = useState(new HashTable());
  console.log(hashTable);

  const handleSizeChange = (e) => {
    let newSize = e[0];
    setSize(newSize);
    const newHashTable = new HashTable(newSize);
    // Re-insert existing data into the new hash table
    hashTable.table.forEach((bucket) => {
      bucket.forEach(({ key, value }) => {
        newHashTable.set(key, value, selected);
      });
    });
    setHashTable(newHashTable);
  };

  useEffect(() => {
    setHashTable(new HashTable());
  }, [selected]);

  return (
    <div className="page">
      <div>
        <h1 className="page-title">Closed Hashing </h1>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <SelectOption
              options={hashCollisionStrategyOptions}
              defaultValue={selected}
              setValue={setSelected}
            ></SelectOption>
            <Slider
              min={5}
              max={50}
              step={1}
              defaultValue={[size]}
              onValueChange={handleSizeChange}
            />
            <output className="flex justify-center items-center">{size}</output>
          </div>
          <HashTableVisualizer
            hashTable={hashTable}
            setHashTable={setHashTable}
            collisionStrategy={selected}
          />
        </div>
      </div>
    </div>
  );
}
