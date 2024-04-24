import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getScreenWidth() {
  return window.innerWidth;
}

export function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export function generateRandomBetween(start, end) {
  return Math.floor(Math.random() * (end - start + 1)) + start;
}

export function generateUniqueNumbers(start, end, count) {
  if (end - start + 1 < count) {
    throw new Error(
      "Cannot generate unique numbers. Range is smaller than count."
    );
  }

  const uniqueNumbers = new Set();
  while (uniqueNumbers.size < count) {
    uniqueNumbers.add(generateRandomBetween(start, end));
  }
  return Array.from(uniqueNumbers);
}
