import { cn } from "@/lib/utils";
import React from "react";

interface GridBackgroundProps {
  isDark?: boolean;
}

export function GridBackgroundDemo({ isDark }: GridBackgroundProps) {
  return (
    <div className="absolute inset-0 pointer-events-none min-h-full w-full overflow-hidden transition-colors duration-500">
      {/* Light Mode Grid Layer */}
      <div
        className={cn(
          "absolute inset-0 h-full w-full transition-opacity duration-500",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)]",
          isDark ? "opacity-0" : "opacity-100"
        )}
      />

      {/* Dark Mode Grid Layer (Overlay) */}
      <div
        className={cn(
          "absolute inset-0 h-full w-full transition-opacity duration-500",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
          isDark ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Radial gradient mask to fade edges into the background color */}
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] transition-colors duration-500",
          isDark ? "bg-[#171717]" : "bg-[#EAF2FF]"
        )}
      ></div>

      {/* Optional Glow Effect in the center */}
      <div
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[100px] transition-all duration-500",
          isDark ? "bg-blue-600/20 opacity-40" : "bg-blue-400/20 opacity-40"
        )}
      />
    </div>
  );
}