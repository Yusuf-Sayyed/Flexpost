import { cn } from '@/lib/utils';
import TextareaAutosize from 'react-textarea-autosize';

interface EditableTextProps {
  value: string;
  onChange: (val: string) => void;
  onBlur?: () => void; // <--- NEW PROP
  className?: string;
  placeholder?: string;
}

export const EditableText = ({ value, onChange, onBlur, className, placeholder }: EditableTextProps) => {
  return (
    <TextareaAutosize
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur} // <--- Pass it here
      placeholder={placeholder}
      className={cn(
        "bg-transparent resize-none outline-none overflow-hidden",
        "placeholder:text-gray-400 empty:before:content-[attr(placeholder)]",
        " px-1 -mx-1 border-none",
        className
      )}
      spellCheck={false}
    />
  );
};