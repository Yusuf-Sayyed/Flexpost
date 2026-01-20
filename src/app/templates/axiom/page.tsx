"use client";

import { useState, useRef, ChangeEvent, useEffect } from "react";
import { toPng } from "html-to-image";
import { Upload, Download, RefreshCw, X, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

// 1. CONSTANTS: Fallback list
const FALLBACK_TOKENS = [
  { symbol: "SOL", logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/assets/So11111111111111111111111111111111111111112/logo.png", name: "Solana" },
  { symbol: "USDC", logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/assets/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png", name: "USDC" },
  { symbol: "WBTC", logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/assets/3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh/logo.png", name: "Wrapped Bitcoin" },
  { symbol: "WETH", logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/assets/7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs/logo.png", name: "Wrapped Ethereum" },
  { symbol: "BONK", logoURI: "https://arweave.net/hQiPZOsRZXGXBJd_82PhVdlM_hACsT_q6wqwf5cSY7I", name: "Bonk" },
  { symbol: "WIF", logoURI: "https://bafkreibk3cvsi5ctw7xu5r6356l253k3y6f52k5j3o555u7j7j2j3a.ipfs.nftstorage.link", name: "dogwifhat" },
];

const sanitizeNumber = (value: string) => value.replace(/[^0-9.\-+]/g, "");

interface Token {
  symbol: string;
  logoURI: string;
  name: string;
}

export default function AxiomTemplatePage() {
  const cardRef = useRef<HTMLDivElement>(null);
  // Debounce ref to cancel previous API calls
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const [isExporting, setIsExporting] = useState(false);
  const [tokenList, setTokenList] = useState<Token[]>(FALLBACK_TOKENS);
  const [tokenLogo, setTokenLogo] = useState<string>(FALLBACK_TOKENS[0].logoURI);

  const [data, setData] = useState({
    username: "NEKA",
    pair: "SOL", // This controls the input
    roi: "+17.05",
    pnlPercent: "+1949.69%",
    bought: "0.866",
    position: "17.92",
    handle: "@kwahh",
    footerText: "@axiom.trade   Save 10% off fees",
  });

  const [bgFile, setBgFile] = useState<string | null>(null);
  const [isVideo, setIsVideo] = useState(false);

  // --- FETCH TOKEN LIST ON LOAD ---
  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await fetch("https://tokens.jup.ag/tokens?tags=verified");
        if (!response.ok) throw new Error("Network response was not ok");
        const tokens: Token[] = await response.json();
        setTokenList((prev) => [...prev, ...tokens]);
      } catch {
        console.warn("Using fallback token list");
      }
    };
    fetchTokens();
  }, []);

  // --- LOGIC: RESOLVE TOKEN (DEBOUNCED) ---
  const resolveToken = async (query: string) => {
    if (!query) return;
    const cleanQuery = query.trim().toUpperCase();

    // 1. IS IT A CONTRACT ADDRESS? (Long string)
    if (cleanQuery.length > 30) {
      try {
        const res = await fetch(`https://tokens.jup.ag/token/${cleanQuery}`);
        if (res.ok) {
          const tokenData: Token = await res.json();
          setTokenLogo(tokenData.logoURI);
          // Optional: Auto-rename Pair to Symbol if found
          // setData(prev => ({ ...prev, pair: tokenData.symbol }));
          return;
        }
      } catch (err) {
        console.warn("Contract lookup failed");
      }
    }

    // 2. IS IT A TICKER? (Search local list)
    else {
      const aliases: Record<string, string> = { "BTC": "WBTC", "ETH": "WETH" };
      const searchSymbol = aliases[cleanQuery] || cleanQuery;

      const foundToken = tokenList.find((t) => t.symbol === searchSymbol);
      if (foundToken) {
        setTokenLogo(foundToken.logoURI);
      }
    }
  };

  // --- INPUT HANDLER (FIXED) ---
  const handlePairChange = (value: string) => {
    // 1. UPDATE STATE IMMEDIATELY (Fixes Backspace Issue)
    setData((prev) => ({ ...prev, pair: value }));

    // 2. DEBOUNCE THE HEAVY LOOKUP
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      resolveToken(value);
    }, 500); // Wait 500ms after user stops typing to search
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setBgFile(objectUrl);
    setIsVideo(file.type.startsWith("video"));
  };

  const clearBackground = () => {
    setBgFile(null);
    setIsVideo(false);
  };

  const handleNumberInput = (field: keyof typeof data, value: string) => {
    setData((prev) => ({ ...prev, [field]: sanitizeNumber(value) }));
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setIsExporting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 100));
      const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 3 });
      const link = document.createElement("a");
      link.download = `axiom-pnl-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      toast.success("Exported successfully!");
    } catch {
      toast.error("Failed to export image.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 font-sans selection:bg-green-500/30">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

        {/* --- LEFT COLUMN: CONTROLS --- */}
        <div className="lg:col-span-4 bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 shadow-2xl order-2 lg:order-1">
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
             <h2 className="text-lg font-bold text-white tracking-wide">Configuration</h2>
             <span className="px-2 py-1 rounded bg-green-500/10 text-green-400 text-xs font-mono font-bold">V2.4</span>
          </div>

          <div className="space-y-6">

            {/* Background Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Background</label>
              <div className="flex gap-2">
                <label className="flex-1 flex items-center justify-center gap-2 cursor-pointer bg-white/5 hover:bg-white/10 border border-dashed border-white/10 rounded-lg h-10 transition-all group">
                  <Upload size={14} className="text-gray-400 group-hover:text-white" />
                  <span className="text-xs text-gray-400 group-hover:text-white">Upload Media</span>
                  <input type="file" onChange={handleFileUpload} accept="image/*,video/*" className="hidden" />
                </label>
                {bgFile && (
                  <button onClick={clearBackground} className="h-10 w-10 flex items-center justify-center bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 rounded-lg text-red-500 transition-colors">
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Username</label>
                  <input type="text" value={data.username} onChange={(e) => setData({ ...data, username: e.target.value })} className="w-full bg-black border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-green-500 outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Pair / Address</label>
                  <input
                    type="text"
                    value={data.pair}
                    onChange={(e) => handlePairChange(e.target.value)} // Fixed handler
                    className="w-full bg-black border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-green-500 outline-none placeholder:text-gray-700"
                    placeholder="e.g. WIF or Address..."
                  />
                </div>
              </div>

              <div className="space-y-1">
                 <label className="text-[10px] font-bold text-green-500 uppercase">ROI Value</label>
                 <input type="text" value={data.roi} onChange={(e) => handleNumberInput('roi', e.target.value)} className="w-full bg-black border border-white/10 rounded px-3 py-2 text-white text-lg font-bold font-mono focus:border-green-500 outline-none" />
              </div>

              <div className="space-y-1">
                 <label className="text-[10px] font-bold text-gray-500 uppercase">Total PnL %</label>
                 <input type="text" value={data.pnlPercent} onChange={(e) => setData({ ...data, pnlPercent: e.target.value })} className="w-full bg-black border border-white/10 rounded px-3 py-2 text-green-400 font-mono text-sm focus:border-green-500 outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Bought</label>
                  <input type="text" value={data.bought} onChange={(e) => handleNumberInput('bought', e.target.value)} className="w-full bg-black border border-white/10 rounded px-3 py-2 text-sm text-white font-mono focus:border-green-500 outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Position</label>
                  <input type="text" value={data.position} onChange={(e) => handleNumberInput('position', e.target.value)} className="w-full bg-black border border-white/10 rounded px-3 py-2 text-sm text-white font-mono focus:border-green-500 outline-none" />
                </div>
              </div>

              <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Handle</label>
                  <input type="text" value={data.handle} onChange={(e) => setData({ ...data, handle: e.target.value })} className="w-full bg-black border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-green-500 outline-none" />
              </div>
            </div>

            <button onClick={handleDownload} disabled={isExporting} className="w-full bg-[#2EEFA6] hover:bg-[#26d090] text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50">
              {isExporting ? <RefreshCw className="animate-spin" size={18} /> : <Download size={18} />}
              {isExporting ? "Rendering..." : "Download Card"}
            </button>
          </div>
        </div>

        {/* --- RIGHT COLUMN: PREVIEW --- */}
        <div className="lg:col-span-8 flex flex-col gap-6 sticky top-8 order-1 lg:order-2">
          <div className="flex justify-between items-center px-2">
            <h2 className="text-xl font-bold text-gray-400 flex items-center gap-2">
              <ImageIcon size={20} /> Preview
            </h2>
            <div className="text-xs font-mono text-gray-600">HD • 1920x1080 Scale</div>
          </div>

          <div className="relative group rounded-xl overflow-hidden shadow-2xl shadow-green-900/10 ring-1 ring-white/10">
            {/* --- CARD START --- */}
            <div ref={cardRef} className="relative w-full aspect-[1.91/1] bg-[#050505] overflow-hidden select-none">

              {/* Layer 1: Background */}
              <div className="absolute inset-0 z-0">
                {bgFile ? (
                  isVideo ? (
                    <video src={bgFile} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80" />
                  ) : (
                    <img src={bgFile} alt="Background" className="w-full h-full object-cover opacity-80" />
                  )
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#080808] via-[#050505] to-[#020202]">
                     <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2/3 h-full bg-blue-900/20 blur-[120px]" />
                     <div className="absolute bottom-0 right-20 w-px h-64 bg-gradient-to-t from-blue-500/50 to-transparent skew-x-12 blur-[1px]" />
                  </div>
                )}
              </div>

              {/* Layer 2: Content Grid */}
              <div className="relative z-10 w-full h-full flex flex-col p-10 md:p-12">

                {/* Header Row */}
                <div className="flex justify-between items-start w-full mb-6">
                  {/* Logo */}
                  <div className="w-10 h-10 relative">
                     <img src="/axiomlogo.png" alt="Logo" className="w-full h-full object-contain brightness-200 contrast-125 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                  </div>
                  {/* Brand Text */}
                  <div className="text-right">
                    <span className="font-sans text-xl font-medium tracking-tight text-white">
                      AXIOM<span className="font-light text-gray-400">Pro</span>
                    </span>
                  </div>
                </div>

                {/* Main Content Block */}
                <div className="flex flex-col gap-3">
                  {/* Username */}
                  <h3 className="text-xl font-medium text-white tracking-wide uppercase pl-1">{data.username}</h3>

                  {/* ROI Card - Rectangular & Compact */}
                  <div className="inline-flex items-center bg-[#2EEFA6] text-black px-6 py-2 rounded-sm shadow-[0_0_25px_rgba(46,239,166,0.25)] w-fit">
                    <span className="text-4xl font-bold tracking-tighter flex items-center gap-3">

                       {/* DYNAMIC TOKEN LOGO */}
                       <img
                          src={tokenLogo}
                          alt="Token"
                          className="w-8 h-8 rounded-full object-cover"
                          onError={(e) => e.currentTarget.style.display = 'none'}
                       />

                       <span className="font-sans font-normal uppercase text-3xl opacity-90">{data.pair}</span>
                       {data.roi}
                    </span>
                  </div>

                  {/* Stats Grid */}
                  <div className="flex flex-col gap-1.5 mt-2 pl-1">
                    <div className="flex items-center gap-8">
                       <span className="text-[#2EEFA6] font-bold text-xs w-16 uppercase tracking-wider">PNL</span>
                       <span className="text-[#2EEFA6] font-mono font-bold text-lg tracking-wide">{data.pnlPercent}</span>
                    </div>
                    <div className="flex items-center gap-8">
                       <span className="text-gray-400 font-medium text-xs w-16 uppercase tracking-wider">Bought</span>
                       <span className="text-white font-mono font-bold text-base tracking-wide flex items-center gap-1.5">
                         <span className="text-[#a586ff] text-xs">≡</span> {data.bought}
                       </span>
                    </div>
                    <div className="flex items-center gap-8">
                       <span className="text-gray-400 font-medium text-xs w-16 uppercase tracking-wider">Position</span>
                       <span className="text-white font-mono font-bold text-base tracking-wide flex items-center gap-1.5">
                         <span className="text-[#a586ff] text-xs">≡</span> {data.position}
                       </span>
                    </div>
                  </div>
                </div>

                {/* Footer Profile */}
                <div className="absolute bottom-10 left-10 flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#FF9F1C] rounded-sm flex items-center justify-center text-black font-bold text-lg shadow-lg">
                      {data.handle[1]?.toUpperCase() || "K"}
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1">
                        <span className="text-lg font-bold text-white tracking-wide leading-none">{data.handle}</span>
                      </div>
                      <div className="text-[10px] text-gray-400 font-medium tracking-wide mt-1 opacity-80 leading-none">
                        {data.footerText}
                      </div>
                    </div>
                </div>

              </div>
            </div>
            {/* --- CARD END --- */}
          </div>
        </div>

      </div>
    </div>
  );
}