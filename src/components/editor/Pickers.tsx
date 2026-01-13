import { useRef } from 'react';
import { cn, formatDateToTwitter, formatTimeToTwitter } from '@/lib/utils';

// --- DATE PICKER ---
interface EditableDateProps {
  value: string; // "Jan 12, 2026"
  onChange: (val: string) => void;
  className?: string;
}

export const EditableDate = ({ value, onChange, className }: EditableDateProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.target.value is "YYYY-MM-DD"
    if (e.target.value) {
      const prettyDate = formatDateToTwitter(e.target.value); // "Jan 12, 2026"
      onChange(prettyDate);
    }
  };

  return (
    <div
      className={cn("relative cursor-pointer hover:bg-blue-50/10 hover:underline decoration-gray-500/50 rounded px-0.5 -mx-0.5 transition-colors", className)}
      onClick={() => inputRef.current?.showPicker()} // Opens system calendar
    >
      <span>{value}</span>
      <input
        ref={inputRef}
        type="date"
        className="invisible absolute inset-0 w-0 h-0" // Hidden but functional
        onChange={handleDateChange}
      />
    </div>
  );
};

// --- TIME PICKER ---
interface EditableTimeProps {
  value: string; // "8:13 AM"
  onChange: (val: string) => void;
  className?: string;
}

export const EditableTime = ({ value, onChange, className }: EditableTimeProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.target.value is "HH:MM" (24h)
    if (e.target.value) {
      const prettyTime = formatTimeToTwitter(e.target.value); // "8:13 AM"
      onChange(prettyTime);
    }
  };

  return (
    <div
      className={cn("relative cursor-pointer hover:bg-blue-50/10 hover:underline decoration-gray-500/50 rounded px-0.5 -mx-0.5 transition-colors", className)}
      onClick={() => inputRef.current?.showPicker()} // Opens system clock
    >
      <span>{value}</span>
      <input
        ref={inputRef}
        type="time"
        className="invisible absolute inset-0 w-0 h-0"
        onChange={handleTimeChange}
      />
    </div>
  );
};