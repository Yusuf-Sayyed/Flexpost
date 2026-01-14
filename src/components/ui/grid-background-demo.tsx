import { cn } from "@/lib/utils";
import React from "react";

interface GridBackgroundProps {
  isDark?: boolean;
}

export function GridBackgroundDemo({ isDark }: GridBackgroundProps) {
  return (
    <div className="absolute inset-0 pointer-events-none min-h-full w-full overflow-hidden">
      <div
        className={cn(
          "absolute inset-0 h-full w-full",
          "[background-size:40px_40px]",
          // Light Mode Grid (on #EAF2FF bg)
          !isDark && "[background-image:linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)]",
          // Dark Mode Grid (on #171717 bg)
          isDark && "[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )}
      />

      {/* Radial gradient mask to fade edges into the background color */}
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]",
          isDark ? "bg-[#171717]" : "bg-[#EAF2FF]"
        )}
      ></div>

      {/* Optional Glow Effect in the center */}
      <div
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[100px] opacity-40",
          isDark ? "bg-blue-600/20" : "bg-blue-400/20"
        )}
      />
    </div>
  );
}