import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

export function formatProjectDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number)
  return `${String(day).padStart(2, '0')} ${MONTHS[month - 1]}, ${year}`
}