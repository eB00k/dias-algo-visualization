function hashStringToInt(key, tableSize = 10) {
  let hash = 17;
  for (let i = 0; i < key.length; i++) {
    hash += key.charCodeAt(i);
  }
  return hash % tableSize;
}

class HashTable {
  table = new Array(10);

  set = (key, value) => {
    const idx = hashStringToInt(key);
    this.table[idx] = value;
  };

  get = (key) => {
    const idx = hashStringToInt(key);
    return this.table[idx];
  };

  display() {
    console.log(this.table);
  }
}

const mp = new HashTable();
mp.set("Dastan", "The best!");
mp.set("fsppd", "The fsd!");
mp.set("dfaoosd", "The erwesd!");
mp.get("Dastan");
console.log(mp.get("Dastan"));
mp.display();
