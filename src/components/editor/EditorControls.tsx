import { usePostStore } from '@/store/usePostStore';
import {
  BadgeCheck,
  Stamp,
  Moon,
  Sun,
  Palette,
  Image as ImageIcon,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const EditorControls = () => {
  const state = usePostStore();

  // 1. Get Global Theme State
  const isGlobalDark = state.globalTheme === 'dark';
  const isCardDark = state.theme === 'dark'; // Current card state

  return (
    <div
      className={cn(
        "w-full max-w-full rounded-2xl border p-5 shadow-sm transition-all duration-300",
        // 2. Adapt Container Background
        isGlobalDark
          ? "bg-[#1F1F1F] border-white/10 shadow-black/20"
          : "bg-white border-slate-200 shadow-sm"
      )}
    >

      {/* Header */}
      {/* <div className={cn(
        "mb-6 flex items-center gap-2 border-b pb-4",
        isGlobalDark ? "border-white/10" : "border-slate-100"
      )}>
        <div className="h-2 w-2 rounded-full bg-blue-500" />
        <h3 className={cn(
          "text-sm font-bold uppercase tracking-wider",
          isGlobalDark ? "text-slate-200" : "text-slate-900"
        )}>
          Editor Controls
        </h3>
      </div> */}

      <div className="space-y-6">

        {/* --- SECTION 1: APPEARANCE --- */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">
            Card Appearance
          </label>

          {/* Card Theme Toggle */}
          <button
            onClick={state.toggleTheme}
            className={cn(
              "group flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium transition-all hover:shadow-md",
              // Active State (Dark Mode Card)
              isCardDark
                ? (isGlobalDark
                    ? "border-slate-700 bg-slate-800 text-white hover:border-neutral-700"
                    : "border-slate-800 bg-slate-900 text-white hover:bg-slate-800")
                // Inactive State (Light Mode Card)
                : (isGlobalDark
                    ? "bg-white/5 border-white/10 text-slate-300 hover:border-neutral-800 hover:text-white hover:bg-white/10"
                    : "bg-white border-slate-200 text-slate-600 hover:border-neutral-100 hover:text-slate-900")
            )}
          >
            <div className="flex items-center gap-3">
              {isCardDark ? <Moon size={18} /> : <Sun size={18} />}
              <span>{isCardDark ? "Dark Mode" : "Light Mode"}</span>
            </div>

            {/* Toggle Switch Visual */}
            <div className={cn(
              "h-5 w-9 rounded-full p-0.5 transition-colors duration-300 flex items-center",
              isCardDark
                ? (isGlobalDark ? "bg-blue-500" : "bg-slate-700")
                : "bg-neutral-500"
            )}>
              <div className={cn(
                "h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-300",
                isCardDark ? "translate-x-4" : "translate-x-0"
              )} />
            </div>
          </button>
        </div>

        {/* --- SECTION 2: IDENTITY --- */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">
            Identity
          </label>

          {/* Verified Toggle */}
          <div className="flex flex-col gap-2">
            <button
              onClick={state.toggleVerified}
              className={cn(
                "group flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium transition-all hover:shadow-md",
                state.isVerified
                  // Active (Blue)
                  ? (isGlobalDark
                      ? "text-blue-500"
                      : " text-blue-500")
                  // Inactive
                  : (isGlobalDark
                      ? "bg-white/5 border-white/10 text-slate-300 hover:border-neutral-700 hover:text-white hover:bg-white/10"
                      : "bg-white border-slate-200 text-slate-600 hover:border-neutral-100 hover:text-slate-900")
              )}
            >
              <div className="flex items-center gap-3">
                <BadgeCheck size={18} className={state.isVerified ? "fill-none" : ""} />
                <span>Verified Badge</span>
              </div>
              {state.isVerified ? <CheckCircle2 size={18} /> : <div className={cn("h-4 w-4 rounded-full border", isGlobalDark ? "border-slate-600" : "border-slate-300")} />}
            </button>

            {/* Sub-option: Color */}
            <div className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out pl-4 border-l-2",
                isGlobalDark ? "border-white/10" : "border-slate-100",
                state.isVerified ? "max-h-20 opacity-100 mt-1" : "max-h-0 opacity-0 mt-0"
            )}>
              <button
                onClick={state.toggleVerifiedType}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all hover:shadow-sm",
                  state.verifiedType === 'yellow'
                    // Active Yellow
                    ? (isGlobalDark
                        ? "border-yellow-500/50 bg-yellow-500/20 text-yellow-200 hover:bg-yellow-500/30"
                        : "border-yellow-200 bg-yellow-50 text-yellow-700 hover:bg-yellow-100")
                    // Active Blue (Alternative)
                    : (isGlobalDark
                        ? "border-sky-500/50 bg-blue-400 text-black hover:bg-blue-500"
                        : "border-sky-200 bg-blue-400 text-neutral-100 hover:bg-blue-500")
                )}
              >
                <Palette size={16} />
                <span>{state.verifiedType === 'yellow' ? 'Gold Check (Business)' : 'Blue Check (Person)'}</span>
              </button>
            </div>
          </div>

          {/* Custom Badge */}
          <button
            onClick={() => state.updateField('customBadgeUrl', state.customBadgeUrl ? null : 'https://placehold.co/20x20/orange/white')}
            className={cn(
              "flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium transition-all hover:shadow-md",
              state.customBadgeUrl
                // Active
                ? (isGlobalDark
                    ? "border-blue-500 text-blue-500"
                    : "border-blue-500 text-blue-500")
                // Inactive
                : (isGlobalDark
                      ? "bg-white/5 border-white/10 text-slate-300 hover:border-neutral-700 hover:text-white hover:bg-white/10"
                      : "bg-white border-slate-200 text-slate-600 hover:border-neutral-100 hover:text-slate-900")
            )}
          >
            <div className="flex items-center gap-3">
              <Stamp size={18} />
              <span>Custom Icon</span>
            </div>
            {state.customBadgeUrl && <span className={cn("text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider", isGlobalDark ? "bg-blue-200 text-blue-500" : "bg-blue-200 text-blue-500")}>Active</span>}
          </button>
        </div>

        {/* --- SECTION 3: MEDIA --- */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">
            Media
          </label>

          <button
            onClick={() => state.updateField('postImageUrl', state.postImageUrl ? null : 'https://via.placeholder.com/600x400')}
            className={cn(
              "flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium transition-all hover:shadow-md",
              state.postImageUrl
                // Active (Red)
                ? (isGlobalDark
                    ? "border-red-500/50 text-red-700"
                    : "border-red-200 bg-red-50 text-red-700")
                // Inactive
                : (isGlobalDark
                      ? "bg-white/5 border-white/10 text-slate-300 hover:border-neutral-700 hover:text-white hover:bg-white/10"
                      : "bg-white border-slate-200 text-slate-600 hover:border-neutral-100 hover:text-slate-900")
            )}
          >
            <div className="flex items-center gap-3">
              <ImageIcon size={18} />
              <span>Post Image</span>
            </div>
            {state.postImageUrl ? (
                <div className="flex items-center gap-1 text-red-500 text-xs font-bold">
                    <XCircle size={14} /> Remove
                </div>
            ) : (
                <div className="flex items-center gap-1 text-slate-400 text-xs font-bold">
                    Add
                </div>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};