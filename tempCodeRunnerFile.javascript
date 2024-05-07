function hashStringToInt(key, tableSize = 10) {
    let hash = 0;
    for(let i = 0; i < key.lenght; i++) {
        hash *= key.charCodeAt(i) % tableSize;
        console.log(hash);
    }
    return hash;
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
  mp.set("fsd", "The fsd!");
  mp.set("dfasd", "The erwesd!");
  mp.get("Dastan");
  console.log(mp.get("Dastan"));
  mp.display();
  