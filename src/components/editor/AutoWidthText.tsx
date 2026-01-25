import { cn } from '@/lib/utils';
import React from 'react';

interface AutoWidthTextProps {
    value: string;
    onChange: (val: string) => void;
    className?: string; // Applied to the input/text
    wrapperClassName?: string; // Applied to the container
    placeholder?: string;
    onBlur?: () => void;
}

export const AutoWidthText = ({
    value,
    onChange,
    className,
    wrapperClassName,
    placeholder,
    onBlur
}: AutoWidthTextProps) => {
    return (
        <div className={cn("inline-grid items-center align-top", wrapperClassName)}>
            {/* Invisible span to push width */}
            <span className={cn(
                "col-start-1 row-start-1 invisible whitespace-pre",
                "font-[inherit] text-[inherit] tracking-[inherit] leading-[inherit]",
                "border border-transparent", // maintain box sizing 
                className // Include padding/font classes to match size
            )}>
                {value || placeholder}
            </span>

            {/* Visible Input */}
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onBlur={onBlur}
                placeholder={placeholder}
                className={cn(
                    "col-start-1 row-start-1 w-full h-full min-w-[1px]",
                    "bg-transparent outline-none border-none p-0 m-0",
                    "font-[inherit] text-[inherit] tracking-[inherit] leading-[inherit]",
                    className
                )}
            />
        </div>
    );
};
