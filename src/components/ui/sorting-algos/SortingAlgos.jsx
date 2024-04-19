import { delay } from "@/lib/utils";

export const BubbleSort = async (array, delayTime = 100) => {
  const newArray = [...array];
  const n = newArray.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (newArray[j] > newArray[j + 1]) {
        [newArray[j], newArray[j + 1]] = [newArray[j + 1], newArray[j]];
        await delay(delayTime);
      }
    }
  }

  return newArray;
};
