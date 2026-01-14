import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCompactNumber(number: number | string): string {
  const num = typeof number === 'string' ? parseInt(number, 10) : number;
  if (isNaN(num)) return '0';
  return Intl.NumberFormat('en-US', {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(num);
}

// 👇 Add these missing functions 👇

export function formatDateToTwitter(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; // Return original if invalid

    // Format: "Oct 2, 2023"
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    }).format(date);
}

export function formatTimeToTwitter(timeString: string): string {
    if (!timeString) return '';

    // Check if it's already in 12h format (e.g. "9:41 PM")
    if (timeString.match(/AM|PM/i)) return timeString;

    // Handle "HH:MM" (24h) input
    const [hoursStr, minutes] = timeString.split(':');
    let hours = parseInt(hoursStr, 10);

    if (isNaN(hours)) return timeString;

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    return `${hours}:${minutes} ${ampm}`;
}