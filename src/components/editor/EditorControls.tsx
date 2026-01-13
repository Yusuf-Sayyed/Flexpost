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
  const isDark = state.theme === 'dark';

  return (
    <div className="w-full max-w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all">

      {/* Header */}
      <div className="mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
        <div className="h-2 w-2 rounded-full bg-blue-500" />
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
          Editor Settings
        </h3>
      </div>

      <div className="space-y-6">

        {/* --- SECTION 1: APPEARANCE --- */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">
            Appearance
          </label>

          {/* Theme Toggle */}
          <button
            onClick={state.toggleTheme}
            className={cn(
              "group flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium transition-all hover:shadow-md",
              isDark
                ? "border-slate-800 bg-slate-900 text-white hover:bg-slate-800"
                : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-slate-900"
            )}
          >
            <div className="flex items-center gap-3">
              {isDark ? <Moon size={18} /> : <Sun size={18} />}
              <span>Dark Mode</span>
            </div>
            {/* Status Indicator */}
            <div className={cn(
              "h-4 w-8 rounded-full p-0.5 transition-colors duration-300",
              isDark ? "bg-slate-700" : "bg-slate-200"
            )}>
              <div className={cn(
                "h-3 w-3 rounded-full bg-white shadow-sm transition-transform duration-300",
                isDark ? "translate-x-4" : "translate-x-0"
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
                  ? "border-blue-200 bg-blue-50 text-blue-700"
                  : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-slate-900"
              )}
            >
              <div className="flex items-center gap-3">
                <BadgeCheck size={18} className={state.isVerified ? "fill-current" : ""} />
                <span>Verified Badge</span>
              </div>
              {state.isVerified ? <CheckCircle2 size={16} /> : <div className="h-4 w-4 rounded-full border border-slate-300" />}
            </button>

            {/* Sub-option: Color (Only if Verified) */}
            {state.isVerified && (
              <div className="ml-4 pl-4 border-l-2 border-slate-100">
                <button
                  onClick={state.toggleVerifiedType}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all",
                    state.verifiedType === 'yellow'
                      ? "border-yellow-200 bg-yellow-50 text-yellow-700"
                      : "border-sky-200 bg-sky-50 text-sky-700"
                  )}
                >
                  <Palette size={16} />
                  <span>{state.verifiedType === 'yellow' ? 'Gold / Business' : 'Blue / Individual'}</span>
                </button>
              </div>
            )}
          </div>

          {/* Custom Badge */}
          <button
            onClick={() => state.updateField('customBadgeUrl', state.customBadgeUrl ? null : 'https://placehold.co/20x20/orange/white')}
            className={cn(
              "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-all hover:translate-x-1 hover:shadow-sm",
              state.customBadgeUrl
                ? "border-orange-200 bg-orange-50 text-orange-700"
                : "border-slate-200 bg-white text-slate-600 hover:border-orange-300 hover:text-slate-900"
            )}
          >
            <Stamp size={18} />
            <span>Custom Icon</span>
            {state.customBadgeUrl && <span className="ml-auto text-[10px] uppercase font-bold tracking-wider opacity-60">Active</span>}
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
              "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-all hover:translate-x-1 hover:shadow-sm",
              state.postImageUrl
                ? "border-red-200 bg-red-50 text-red-700"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
            )}
          >
            <ImageIcon size={18} />
            <span>{state.postImageUrl ? 'Remove Post Image' : 'Add Post Image'}</span>
            {state.postImageUrl ? <XCircle size={16} className="ml-auto opacity-50" /> : null}
          </button>
        </div>

      </div>
    </div>
  );
};