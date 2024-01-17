import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

/**
 * Returns a number formatted to US standard
 * 
 *     +1 (areaCode) centralCode - lineNumber
 *     +1 (555) 555-5555
 * @param phoneNumber 
 * @returns 
 */
export const formatToUSNumber = (phoneNumber: string): string => {
  const areaCode = phoneNumber.slice(0, 3);
  const centralCode = phoneNumber.slice(3, 6);
  const lineNumber = phoneNumber.slice(6);
  return `+1 (${areaCode}) ${centralCode}-${lineNumber}`;
};

/**
 * Returns a value between two numbers. Max Value is required but min Value defaults to 0 if none is provided.
 * @param maxValue 
 * @param minValue 
 * @returns number
 */
export const getRandomNumBetween = (maxValue: number, minValue: number = 0): number => {
  return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue)
}

/**
 * Returns a random date from 2023-2024
 * @returns Date
 */
export const getRandomDate = () => {
  let randomMonth = getRandomNumBetween(11)
  let randomDay = getRandomNumBetween(30)
  let randomYear = getRandomNumBetween(2023, 2023)
  let randomHour = getRandomNumBetween(23)
  let randomMinute = getRandomNumBetween(59)
  let randomSecond = getRandomNumBetween(59)
  return new Date(randomYear, randomMonth, randomDay, randomHour, randomMinute, randomSecond)
};
