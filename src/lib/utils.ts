// src/lib/utils.ts

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCompactNumber(number: number | string): string {
  const num = Number(number);
  if (isNaN(num)) return number.toString();
  return new Intl.NumberFormat('en-US', {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(num);
}

// --- NEW HELPERS ---

// Converts "2026-01-12" -> "Jan 12, 2026"
export function formatDateToTwitter(isoDate: string): string {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}

// Converts "14:30" -> "2:30 PM"
export function formatTimeToTwitter(isoTime: string): string {
  if (!isoTime) return "";
  // Create a dummy date with this time
  const [hours, minutes] = isoTime.split(':');
  const date = new Date();
  date.setHours(parseInt(hours), parseInt(minutes));

  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(date);
}