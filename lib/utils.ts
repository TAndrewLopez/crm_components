import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const formatToUSNumber = (phoneNumber: string): string => {
  const areaCode = phoneNumber.slice(0, 3);
  const centralCode = phoneNumber.slice(3, 6);
  const lineNumber = phoneNumber.slice(6);
  return `+1 (${areaCode}) ${centralCode}-${lineNumber}`
}