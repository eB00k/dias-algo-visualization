// HashTable.js
class HashTable {
  constructor(size = 10) {
    this.size = size;
    this.table = new Array(size).fill(null).map(() => []);
  }

  hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % this.size;
  }

  set(key, value, collisionStrategy = "linear") {
    let index = this.hash(key.toString());

    switch (collisionStrategy) {
      case "linear":
        this.linearProbe(index, key, value);
        break;
      case "quadratic":
        this.quadraticProbe(index, key, value);
        break;
      case "double":
        this.doubleHash(index, key, value);
        break;
      default:
        this.linearProbe(index, key, value);
    }
  }

  linearProbe(index, key, value) {
    //   if (!this.table[index]) {
    //     this.table[index] = [{key , value}]
    //     return;
    //   }
    while (this.table[index].length > 0) {
      index = (index + 1) % this.size;
    }
    this.table[index].push({ key, value });
  }

  quadraticProbe(index, key, value) {
    let i = 1;
    while (this.table[index].length > 0) {
      index = (index + i * i) % this.size;
      i++;
    }
    this.table[index].push({ key, value });
  }

  doubleHash(index, key, value) {
    const hash2 = this.hash(key.toString()) || 1; // Ensure hash2 is not zero
    let i = 1;
    while (this.table[index].length > 0) {
      index = (index + i * hash2) % this.size;
      i++;
    }
    this.table[index].push({ key, value });
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.table[index];
    const entry = bucket.find((entry) => entry.key === key);
    return entry ? entry.value : undefined;
  }

  remove(key) {
    const index = this.hash(key);
    const bucket = this.table[index];
    const indexToRemove = bucket.findIndex((entry) => entry.key === key);
    if (indexToRemove !== -1) {
      bucket.splice(indexToRemove, 1);
    }
  }
}

export default HashTable;