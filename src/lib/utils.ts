import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { toZonedTime } from 'date-fns-tz';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertToKoreanDate(date: Date): Date {
  const timeZone = 'Asia/Seoul'; 
  return toZonedTime(date, timeZone);
}

