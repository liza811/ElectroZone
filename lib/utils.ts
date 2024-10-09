import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import stc from "string-to-color";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const stringToColor = (str: string) => {
  return stc(str);
};

export function hexToRgba(hex: string, opacity: number): string {
  hex = hex.replace("#", "");

  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

{
}
