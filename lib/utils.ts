import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ProfileSettings } from "./types";
import { string } from "zod";
import { flightRouterStateSchema } from "next/dist/server/app-render/types";

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
export const getRandomNumBetween = (
  maxValue: number,
  minValue: number = 0
): number => {
  return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
};

/**
 * Returns a random date from 2023-2024. Primarily used for developing.
 * @returns Date
 */
export const getRandomDate = () => {
  let randomMonth = getRandomNumBetween(11);
  let randomDay = getRandomNumBetween(30);
  let randomYear = getRandomNumBetween(2020, 2024);
  let randomHour = getRandomNumBetween(23);
  let randomMinute = getRandomNumBetween(59);
  let randomSecond = getRandomNumBetween(59);
  return new Date(
    randomYear,
    randomMonth,
    randomDay,
    randomHour,
    randomMinute,
    randomSecond
  );
};

export const removeSpecialCharacters = (str: string): string => {
  return str
    .trim()
    .toLowerCase()
    .replace(/[^\w\s]|_/g, "");
};

export const getFullName = (first_name: string, last_name: string) => {
  return `${removeSpecialCharacters(first_name)} ${removeSpecialCharacters(last_name)}`;
};

export const convertSettingString = (settings: string | null) => {
  const defaultSettings: ProfileSettings = {
    showBirthday: 'true',
    bookmarkSortDir: 'desc',
    bookmarkSortOption: "created_at",
    contactSortOption: "last_name",
    contactSortDir: 'asc',
  }

  if (!settings) return defaultSettings;

  const settingsObject = settings
    .split(",")
    .map((line) => line.split("="))
    .reduce((acc, el) => {
      acc[el[0]] = el[1]
      return acc;
    }, defaultSettings);


  return settingsObject;
};
