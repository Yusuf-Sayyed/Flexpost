"use client";

import { useState, useRef, ChangeEvent, useEffect } from "react";
import { toPng } from "html-to-image";
import { Upload, Download, RefreshCw, X, Image as ImageIcon, Search, FileCode, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

// 1. CONSTANTS: Fallback list
const FALLBACK_TOKENS = [
  { symbol: "SOL", logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/assets/So11111111111111111111111111111111111111112/logo.png", name: "Solana", address: "So11111111111111111111111111111111111111112", icon: "" },
  { symbol: "USDC", logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/assets/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png", name: "USDC", address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", icon: "" },
  { symbol: "WBTC", logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/assets/3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh/logo.png", name: "Wrapped Bitcoin", address: "3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh", icon: "" },
  { symbol: "WETH", logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/assets/7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs/logo.png", name: "Wrapped Ethereum", address: "7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs", icon: "" },
  { symbol: "BONK", logoURI: "https://arweave.net/hQiPZOsRZXGXBJd_82PhVdlM_hACsT_q6wqwf5cSY7I", name: "Bonk", address: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263", icon: "" },
  { symbol: "WIF", logoURI: "https://bafkreibk3cvsi5ctw7xu5r6356l253k3y6f52k5j3o555u7j7j2j3a.ipfs.nftstorage.link", name: "dogwifhat", address: "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm", icon: "" },
];

const sanitizeNumber = (value: string) => value.replace(/[^0-9.\-+]/g, "");

interface Token {
  symbol: string;
  name: string;
  icon?: string;
  logoURI?: string;
  address: string;
}

export default function AxiomTemplatePage() {
  const cardRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const [isExporting, setIsExporting] = useState(false);
  const [searchMode, setSearchMode] = useState<'ticker' | 'contract'>('ticker');
  const [tokenList, setTokenList] = useState<Token[]>(FALLBACK_TOKENS);
  const [tokenLogo, setTokenLogo] = useState<string>(FALLBACK_TOKENS[0].logoURI!);

  const [data, setData] = useState({
    username: "NEKA",
    pair: "SOL",
    roi: "+17.05",
    pnlPercent: "+1949.69%",
    bought: "0.866",
    position: "17.92",
    handle: "@yourusername",
    footerText: "@axiom.trade",
  });

  const [bgFile, setBgFile] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isVideo, setIsVideo] = useState(false);

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

  const resolveToken = async (query: string) => {
    if (!query) return;
    const cleanQuery = query.trim();

    if (searchMode === 'contract') {
      if (cleanQuery.length > 25) {
        try {
          const res = await fetch(`https://tokens.jup.ag/token/${cleanQuery}`);
          if (res.ok) {
            const tokenData: Token = await res.json();
            const image = tokenData.logoURI || tokenData.icon || "";
            if (image) setTokenLogo(image);
            setData(prev => ({ ...prev, pair: tokenData.symbol }));
            toast.success(`Found: ${tokenData.name}`);
            return;
          }
        } catch (err) {
          console.warn("Contract lookup failed", err);
        }
      }
    } else {
      const upperQuery = cleanQuery.toUpperCase();
      const aliases: Record<string, string> = { "BTC": "WBTC", "ETH": "WETH" };
      const searchSymbol = aliases[upperQuery] || upperQuery;

      const foundToken = tokenList.find((t) => t.symbol === searchSymbol);
      if (foundToken) {
        const image = foundToken.logoURI || foundToken.icon || "";
        if (image) setTokenLogo(image);
      }
    }
  };

  const handlePairChange = (value: string) => {
    setData((prev) => ({ ...prev, pair: value }));
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      resolveToken(value);
    }, 600);
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

  const handleProfileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setProfileImage(objectUrl);
  };

  const clearProfileImage = () => {
    setProfileImage(null);
  };

  const handleNumberInput = (field: keyof typeof data, value: string) => {
    setData((prev) => ({ ...prev, [field]: sanitizeNumber(value) }));
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    if (!profileImage || !data.pair || !data.roi) {
      toast.error("Please fill in fields (Profile Pic is required!)");
      return;
    }

    setIsExporting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 100));
      const dataUrl = await toPng(cardRef.current, { cacheBust: false, pixelRatio: 3, skipAutoScale: true });
      const link = document.createElement("a");
      link.download = `axiom-pnl-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      toast.success("Exported successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to export image.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-green-500/30 overflow-x-hidden">
      {/* HEADER */}
      <nav className="h-16 shrink-0 flex items-center justify-between px-6 border-b bg-[#171717] border-white/5 z-50">
        {/* Left Side - Back Button */}
        <div className="flex items-center gap-2">
          <Link href="/templates" className="group">
            <div className="p-1.5 rounded-full transition-colors text-neutral-500 bg-neutral-800 hover:text-slate-900 hover:bg-indigo-50">
              <ChevronLeft size={16} />
            </div>
          </Link>
          <span className="hidden min-[768px]:inline text-sm font-semibold select-none text-neutral-500">
            Back
          </span>
        </div>

        {/* Center Title */}
        <span className="text-sm font-bold tracking-widest uppercase opacity-40 hidden sm:block text-white">
          Studio
        </span>

        {/* Spacer for centering */}
        <div className="w-20" />
      </nav>

      {/* MAIN CONTENT */}
      <div className="p-3 sm:p-4 md:p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-12 items-start">
          {/* --- LEFT COLUMN: CONTROLS (Mobile-first adjustments) --- */}
          <div className="lg:col-span-4 bg-[#0A0A0A] border border-white/5 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-xl order-2 lg:order-1">
            <div className="flex items-center justify-between mb-6 md:mb-8 pb-4 md:pb-6 border-b border-white/5">
              <h2 className="text-base md:text-lg font-bold text-white tracking-wide">Configuration</h2>
              <span className="px-2 py-1 rounded bg-green-500/10 text-green-400 text-xs font-mono font-bold">Beta</span>
            </div>

            <div className="space-y-4 md:space-y-6">
              {/* File Uploads - Stack on mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Background</label>
                  <div className="flex gap-2">
                    <label className="flex-1 flex items-center justify-center gap-2 cursor-pointer bg-white/5 hover:bg-white/10 border border-dashed border-white/10 rounded-lg h-10 transition-all group overflow-hidden relative">
                      {bgFile ? (
                        isVideo ? <div className="text-green-500 text-[10px] font-bold">VIDEO</div> : <img src={bgFile} className="w-full h-full object-cover opacity-50" />
                      ) : (
                        <>
                          <Upload size={14} className="text-gray-400 group-hover:text-white" />
                          <span className="text-[10px] text-gray-400 group-hover:text-white hidden xs:inline">BG Media</span>
                          <span className="text-[10px] text-gray-400 group-hover:text-white xs:hidden">BG</span>
                        </>
                      )}
                      <input type="file" onChange={handleFileUpload} accept="image/*,video/*" className="hidden" />
                    </label>
                    {bgFile && (
                      <button onClick={clearBackground} className="h-10 w-8 flex items-center justify-center bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 rounded-lg text-red-500 transition-colors">
                        <X size={14} />
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Profile Pic</label>
                  <div className="flex gap-2">
                    <label className="flex-1 flex items-center justify-center gap-2 cursor-pointer bg-white/5 hover:bg-white/10 border border-dashed border-white/10 rounded-lg h-10 transition-all group overflow-hidden relative">
                      {profileImage ? (
                        <>
                          <Upload size={14} className="text-green-500" />
                          <span className="text-[10px] text-green-500 font-bold">Set</span>
                        </>
                      ) : (
                        <>
                          <Upload size={14} className="text-gray-400 group-hover:text-white" />
                          <span className="text-[10px] text-gray-400 group-hover:text-white hidden xs:inline">Upload</span>
                          <span className="text-[10px] text-gray-400 group-hover:text-white xs:hidden">PFP</span>
                        </>
                      )}
                      <input type="file" onChange={handleProfileUpload} accept="image/*" className="hidden" />
                    </label>
                    {profileImage && (
                      <button onClick={clearProfileImage} className="h-10 w-8 flex items-center justify-center bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 rounded-lg text-red-500 transition-colors">
                        <X size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-3 md:space-y-4">
                {/* Username and Token Input */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Username</label>
                    <input
                      type="text"
                      value={data.username}
                      onChange={(e) => setData({ ...data, username: e.target.value })}
                      className="w-full bg-black border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-green-500 outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center flex-wrap gap-1">
                      <label className="text-[10px] font-bold text-gray-500 uppercase">Token Input</label>
                      <div className="flex bg-white/5 p-0.5 rounded-md">
                      </div>
                    </div>

                    <input
                      type="text"
                      value={data.pair}
                      onChange={(e) => handlePairChange(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-green-500 outline-none placeholder:text-gray-700"
                      placeholder={searchMode === 'ticker' ? "e.g. WIF, BONK" : "Paste Contract..."}
                    />
                  </div>
                </div>

                {/* ROI Value */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-green-500 uppercase">ROI Value</label>
                  <input
                    type="text"
                    value={data.roi}
                    onChange={(e) => handleNumberInput('roi', e.target.value)}
                    className="w-full bg-black border border-white/10 rounded px-3 py-2 text-white text-base md:text-lg font-bold font-mono focus:border-green-500 outline-none"
                  />
                </div>

                {/* PnL % */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Total PnL %</label>
                  <input
                    type="text"
                    value={data.pnlPercent}
                    onChange={(e) => setData({ ...data, pnlPercent: e.target.value })}
                    className="w-full bg-black border border-white/10 rounded px-3 py-2 text-green-400 font-mono text-sm focus:border-green-500 outline-none"
                  />
                </div>

                {/* Bought and Position */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Bought</label>
                    <input
                      type="text"
                      value={data.bought}
                      onChange={(e) => handleNumberInput('bought', e.target.value)}
                      className="w-full bg-black border border-white/10 rounded px-3 py-2 text-sm text-white font-mono focus:border-green-500 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Position</label>
                    <input
                      type="text"
                      value={data.position}
                      onChange={(e) => handleNumberInput('position', e.target.value)}
                      className="w-full bg-black border border-white/10 rounded px-3 py-2 text-sm text-white font-mono focus:border-green-500 outline-none"
                    />
                  </div>
                </div>

                {/* Handle */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Handle</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-gray-500 text-sm">@</span>
                    <input
                      type="text"
                      value={data.handle.replace(/^@/, '')}
                      onChange={(e) => setData({ ...data, handle: '@' + e.target.value.replace(/@/g, '') })}
                      className="w-full bg-black border border-white/10 rounded px-3 pl-7 py-2 text-sm text-white focus:border-green-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Download Button */}
              <button
                onClick={handleDownload}
                disabled={isExporting}
                className="w-full bg-[#2EEFA6] hover:bg-[#26d090] text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
              >
                {isExporting ? <RefreshCw className="animate-spin" size={18} /> : <Download size={18} />}
                {isExporting ? "Rendering..." : "Download Card"}
              </button>
            </div>
          </div>

          {/* --- RIGHT COLUMN: PREVIEW (Fixed layout to match image) --- */}
          <div className="lg:col-span-8 flex flex-col gap-4 md:gap-6 order-1 lg:order-2">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 px-1 sm:px-2">
              <h2 className="text-lg md:text-xl font-bold text-gray-400 flex items-center gap-2">
                <ImageIcon size={18} className="md:h-5 md:w-5" />
                <span className="text-sm md:text-base lg:text-xl">Preview</span>
              </h2>
              <div className="text-xs font-mono text-gray-600 text-right">
                HD • 1920x1080 Scale
              </div>
            </div>

            {/* Card Container - Fixed layout to match image exactly */}
            <div className="relative group rounded-lg md:rounded-xl overflow-hidden shadow-2xl shadow-green-900/10 ring-1 ring-white/10">
              <div
                ref={cardRef}
                className="relative w-full aspect-[1.91/1] bg-[#050505] overflow-hidden select-none min-h-[300px]"
              >
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

                {/* Layer 2: Content - Fixed layout to match image */}
                <div className="relative z-10 w-full h-full flex flex-col p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10">
                  {/* Header - Logo left, Brand text right */}
                  <div className="flex justify-between items-start w-full mb-2 sm:mb-3 md:mb-4">
                    {/* Logo - Top Left */}
                    <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 relative">
                      <img
                        src="/axiomwhite.svg"
                        alt="Logo"
                        className="w-full h-full object-contain brightness-0 invert"
                      />
                    </div>

                    {/* Brand Text - Top Right */}
                    <span className="font-sans text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl font-medium tracking-tight text-white">
                      AXIOM<span className="font-light text-gray-400">Pro</span>
                    </span>
                  </div>

                  {/* Main Content - Vertical layout as in image */}
                  <div className="flex-1 flex flex-col">
                    {/* Pair Name - Top Left */}
                    <h3 className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl font-medium text-white tracking-wide uppercase mb-2 sm:mb-3 md:mb-4">
                      {data.pair}
                    </h3>

                    {/* ROI Card - Centered with token logo */}
                    <div className={`inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 rounded-sm w-fit transition-colors duration-300 mb-3 sm:mb-4 md:mb-5 ${data.roi.startsWith("-") ? "bg-[#FF4D4D] shadow-[0_0_20px_rgba(255,77,77,0.3)] text-black" : "bg-[#2EEFA6] shadow-[0_0_20px_rgba(46,239,166,0.3)] text-black"}`}>
                      <span className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold tracking-tighter flex items-center gap-2 sm:gap-3">
                        {/* Token Logo */}
                        <img
                          src={tokenLogo}
                          alt="Token"
                          className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 rounded-full object-cover"
                          onError={(e) => e.currentTarget.style.display = 'none'}
                        />
                        <span className="whitespace-nowrap">{data.roi}</span>
                      </span>
                    </div>

                    {/* Stats Grid - Vertical list as in image */}
                    <div className="flex flex-col gap-1 sm:gap-1.5 md:gap-2 mb-2 sm:mb-5 md:mb-6">
                      {/* PNL */}
                      <div className="flex items-baseline">
                        <span className={`font-bold text-[10px] sm:text-xs md:text-sm w-12 sm:w-14 md:w-16 uppercase tracking-wider ${data.roi.startsWith("-") ? "text-[#FF4D4D]" : "text-[#2EEFA6]"}`}>
                          PNL
                        </span>
                        <span className={`font-mono font-bold text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl ml-2 sm:ml-3 md:ml-4 tracking-wide ${data.roi.startsWith("-") ? "text-[#FF4D4D]" : "text-[#2EEFA6]"}`}>
                          {data.pnlPercent}
                        </span>
                      </div>

                      {/* BOUGHT */}
                      <div className="flex items-baseline">
                        <span className="text-gray-400 font-medium text-[10px] sm:text-xs md:text-sm w-12 sm:w-14 md:w-16 uppercase tracking-wider">
                          BOUGHT
                        </span>
                        <span className="text-white font-mono font-bold text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl ml-2 sm:ml-3 md:ml-4 tracking-wide flex items-center gap-1">
                          {data.bought}
                        </span>
                      </div>

                      {/* POSITION */}
                      <div className="flex items-baseline">
                        <span className="text-gray-400 font-medium text-[10px] sm:text-xs md:text-sm w-12 sm:w-14 md:w-16 uppercase tracking-wider">
                          POSITION
                        </span>
                        <span className="text-white font-mono font-bold text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl ml-2 sm:ml-3 md:ml-4 tracking-wide flex items-center gap-1">
                          {data.position}
                        </span>
                      </div>
                    </div>

                    {/* Footer Section - Profile and handle at bottom */}
                    <div className="mt-auto flex items-center gap-2 sm:gap-3">
                      {/* Profile Image - Fixed to match image */}
                      <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 bg-[#FF9F1C] rounded-sm flex items-center justify-center text-black font-bold text-xs sm:text-sm md:text-base shadow-lg overflow-hidden flex-shrink-0">
                        {profileImage ? (
                          <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          data.handle[1]?.toUpperCase() || "K"
                        )}
                      </div>

                      {/* Handle and Footer Text - Stacked as in image */}
                      <div className="flex flex-col">
                        <span className="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg font-bold text-white tracking-wide leading-tight">
                          {data.handle}
                        </span>
                        <span className="text-[8px] sm:text-[9px] md:text-[10px] text-gray-400 font-medium tracking-wide mt-2 opacity-80 leading-tight">
                          {data.footerText}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Optimization Note */}
            <div className="lg:hidden text-xs text-gray-500 text-center mt-2 px-4">
              <p>Card preview scales for mobile. Actual download will be in 1920x1080 HD resolution.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}