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
