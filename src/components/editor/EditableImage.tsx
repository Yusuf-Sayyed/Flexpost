'use client';

import { useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EditableImageProps {
  src: string | null;
  onChange: (value: string | null) => void;
  className?: string;
  isAvatar?: boolean;
}

export const EditableImage = ({ src, onChange, className, isAvatar }: EditableImageProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div
      onClick={() => fileInputRef.current?.click()}
      className={cn(
        "relative group cursor-pointer overflow-hidden bg-gray-100 flex items-center justify-center transition-colors hover:bg-gray-200",
        isAvatar ? "rounded-full" : "rounded-2xl border border-gray-200",
        className
      )}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {src && src.length > 0 ? (
        <>
          <img
            src={src}
            alt="Upload"
            className="w-full h-full object-cover"
            // 👇 CRITICAL FIXES FOR MOBILE EXPORT:
            crossOrigin="anonymous" // Helps with CORS (even for base64)
            decoding="sync"         // Forces browser to decode immediately, not async
            loading="eager"         // Prevents lazy loading
          />
          <button
            onClick={handleRemove}
            className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 z-10"
            title="Remove image"
          >
            <X size={12} />
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-500">
          <Upload size={isAvatar ? 16 : 24} />
          {!isAvatar && <span className="text-sm mt-1">Upload Image</span>}
        </div>
      )}
    </div>
  );
};