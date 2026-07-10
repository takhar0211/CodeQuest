import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(seconds: number): string {
  if (seconds < 60) return seconds + "s";
  const mins = Math.floor(seconds / 60);
  if (mins < 60) return mins + "m";
  const hours = Math.floor(mins / 60);
  return hours + "h " + (mins % 60) + "m";
}
