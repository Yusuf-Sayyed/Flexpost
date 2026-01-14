import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { Image as ImageIcon, Upload, X } from 'lucide-react';

interface EditableImageProps {
  src: string | null;
  onChange: (url: string | null) => void; // Allow null to remove
  className?: string;
  isAvatar?: boolean;
}

export const EditableImage = ({ src, onChange, className, isAvatar }: EditableImageProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onChange(url);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop click from triggering upload
    onChange(null);
  };

  return (
    <div
      onClick={() => fileInputRef.current?.click()}
      className={cn(
        "relative group cursor-pointer overflow-hidden bg-gray-100 flex items-center justify-center",
        isAvatar ? "rounded-full" : "rounded-2xl", // rounded-2xl matches Twitter modern radius
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

      {src ? (
        <>
          <img src={src} alt="Upload" className="w-full h-full object-cover" />

          {/* Remove Button (Only for post images, not avatars) */}
          {!isAvatar && (
            <button
              onClick={handleRemove}
              className="absolute top-2 cursor-pointer right-2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
              title="Remove image"
            >
              <X size={20} />
            </button>
          )}
        </>
      ) : (
        <div className="text-gray-400 flex flex-col items-center gap-1">
          {isAvatar ? <ImageIcon size={20} /> : <Upload size={24} />}
        </div>
      )}
    </div>
  );
};