import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as z from "zod";

import { userSettingsSchema } from "@/schemas";

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

/**
 * Converts a setting string into a settings object.
 * @param settings 
 */
export const convertSettingsString = (settings: string | null) => {
  const settingsObject: Record<string, string> = {};

  if (!settings) return userSettingsSchema.parse(settingsObject);

  const parsedSettings =
    settings
      .split(",")
      .map((line) => line.split("="))
      .reduce((acc, el) => {
        acc[el[0]] = el[1];
        return acc;
      }, settingsObject)

  const convertedSettings = {
    ...parsedSettings,
    showBirthday: parsedSettings.showBirthday === 'true',
  }

  return userSettingsSchema.parse(convertedSettings);
};

/**
 * Converts a setting object into a settings string.
 * @param settingsObject 
 */
export const convertSettingsObject = (settingsObject: z.infer<typeof userSettingsSchema>) => {
  const entries = Object.entries(settingsObject)
  return entries.reduce((acc, el, i) => {
    i === entries.length - 1 ? acc += `${el[0]}=${el[1]}` : acc += `${el[0]}=${el[1]},`
    return acc;
  }, '')
}

export const hasShowBirthday = (settings: string | null) => {
  if (!settings) return true
  const settingsObject = convertSettingsString(settings)
  return settingsObject.showBirthday
}