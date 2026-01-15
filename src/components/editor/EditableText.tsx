import { cn } from '@/lib/utils';
import TextareaAutosize from 'react-textarea-autosize';

interface EditableTextProps {
  value: string;
  onChange: (val: string) => void;
  onBlur?: () => void;
  onPaste?: (e: React.ClipboardEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  className?: string;
  placeholder?: string;
}

export const EditableText = ({ value, onChange, onBlur, onPaste, onKeyDown,className, placeholder }: EditableTextProps) => {
  return (
    <TextareaAutosize
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      onPaste={onPaste}
      onKeyDown={onKeyDown}
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