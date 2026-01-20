"use client";

import { useState, useRef } from "react";
import { toPng } from "html-to-image";

export default function AxiomPnL() {
  const ref = useRef<HTMLDivElement>(null);

  // State for the card data
  const [data, setData] = useState({
    pair: "BTC/USDT",
    type: "Long",
    leverage: "20x",
    roi: "+142.5%",
    entry: "42,150.00",
    mark: "44,200.50",
  });

  const [background, setBackground] = useState<string | null>(null);
  const [isVideo, setIsVideo] = useState(false);

  // Handle File Upload (Client-side only)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setBackground(url);
      setIsVideo(file.type.startsWith("video"));
    }
  };

  // Export Function
  const handleExport = async () => {
    if (!ref.current) return;

    // Generates a PNG snapshot of the card (even if video is playing)
    const dataUrl = await toPng(ref.current, { cacheBust: true });

    // Standard download logic
    const link = document.createElement("a");
    link.download = "flexpost-pnl.png";
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="flex flex-col gap-6 items-center">

      {/* The PnL Card Container */}
      <div
        ref={ref}
        className="relative w-[600px] h-[350px] rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900 flex flex-col justify-between p-8 text-white"
      >
        {/* Dynamic Background Layer */}
        <div className="absolute inset-0 z-0 opacity-50">
           {background ? (
             isVideo ? (
               <video src={background} autoPlay loop muted playsInline className="w-full h-full object-cover" />
             ) : (
               <img src={background} alt="bg" className="w-full h-full object-cover" />
             )
           ) : (
             // Default Abstract Pattern if no background uploaded
             <div className="w-full h-full bg-gradient-to-br from-green-900 via-slate-900 to-black" />
           )}
        </div>

        {/* Content Layer (Z-index 10 to sit above background) */}
        <div className="relative z-10 font-mono">
          <div className="flex justify-between items-start">
            <div className="flex gap-2 items-center">
               <h2 className="text-2xl font-bold">{data.pair}</h2>
               <span className="bg-white/20 px-2 py-0.5 text-sm rounded">{data.type}</span>
               <span className="bg-white/20 px-2 py-0.5 text-sm rounded">{data.leverage}</span>
            </div>
            {/* Logo or QR Code can go here */}
            <div className="opacity-50 text-xs">FLEXPOST</div>
          </div>

          <div className="mt-8">
             <div className="text-6xl font-black text-green-400 drop-shadow-lg tracking-tighter">
                {data.roi}
             </div>
             <div className="text-sm text-green-200 mt-2 font-semibold">Return on Equity</div>
          </div>
        </div>

        {/* Footer Data */}
        <div className="relative z-10 flex gap-8 text-sm opacity-90 border-t border-white/10 pt-4 mt-auto">
           <div>
              <div className="text-slate-400 text-xs uppercase">Entry Price</div>
              <div className="font-bold">{data.entry}</div>
           </div>
           <div>
              <div className="text-slate-400 text-xs uppercase">Mark Price</div>
              <div className="font-bold">{data.mark}</div>
           </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        <label className="btn-secondary cursor-pointer">
           Upload Background
           <input type="file" accept="image/*,video/*" onChange={handleFileChange} className="hidden" />
        </label>
        <button onClick={handleExport} className="btn-primary">
           Export Snapshot
        </button>
      </div>
    </div>
  );
}