import { usePostStore } from '@/store/usePostStore';
import { EditableText } from '../editor/EditableText';
import { EditableImage } from '../editor/EditableImage';
import { EditableDate, EditableTime } from '../editor/Pickers';
import {
    MessageCircle, Repeat2, Heart, Share, Bookmark, MoreHorizontal
} from 'lucide-react';
import { cn, formatCompactNumber } from '@/lib/utils';

export const TwitterPost = ({ id }: { id: string }) => {
    const state = usePostStore();
    const isDark = state.theme === 'dark';

    const handleStatBlur = (statKey: keyof typeof state.stats, value: string) => {
        const formatted = formatCompactNumber(value);
        state.updateStat(statKey, formatted);
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
        if (e.clipboardData.files.length > 0) {
            const file = e.clipboardData.files[0];
            if (file.type.startsWith('image/')) {
                e.preventDefault();
                const reader = new FileReader();
                reader.onload = (ev) => {
                    if (typeof ev.target?.result === 'string') {
                        state.updateField('postImageUrl', ev.target.result);
                    }
                };
                reader.readAsDataURL(file);
            }
        }
    };

    const themeClasses = {
        // We use inline styles for the main BG to ensure capture reliability
        text: isDark ? 'text-white' : 'text-gray-900',
        subText: isDark ? 'text-gray-500' : 'text-gray-500',
        inputPlaceholder: isDark ? 'placeholder:text-gray-700' : 'placeholder:text-gray-400'
    };

    return (
        <div className="flex flex-col gap-6">

            {/* --- CAPTURE WRAPPER --- */}
            {/* This is the container we export.
               By giving it a solid background color (matching the app theme),
               we eliminate 'white corner' artifacts because there is no transparency for the browser to miscalculate.
            */}
            <div
                id={id}
                className={cn(
                    "p-10 flex justify-center items-center transition-colors duration-200 rounded-2xl",
                    isDark ? "bg-[#171717]" : "bg-[#EAF2FF]"
                )}
            >

                {/* --- THE POST CARD --- */}
                <div
                    // Force card background color via inline style to ensure it never renders as transparent
                    style={{ backgroundColor: isDark ? '#000000' : '#ffffff' }}
                    className={cn(
                        "w-full max-w-[600px] border sm:rounded-2xl p-4 shadow-xl transition-all duration-200 overflow-hidden relative",
                        // Crisp borders to ensure the card doesn't blend into the dark background
                        isDark ? "border-none ring-1 ring-white/5" : "border-[#EAF2FF] ring-1 ring-slate-900/5",
                        themeClasses.text
                    )}
                >
                    {/* Header */}
                    <div className="flex justify-between items-start mb-3">

                        <div className="flex gap-1">
                            <EditableImage
                                src={state.avatarUrl}
                                onChange={(url) => state.updateField('avatarUrl', url)}
                                className="w-12 h-12 shrink-0"
                                isAvatar
                            />

                            <div className="flex flex-col gap-[2px]">
                                {/* Name Row */}
                                <div className="flex items-center gap-1">
                                    <div className="relative inline-grid">
                                        <span className={cn("invisible whitespace-pre font-bold text-[15px]", themeClasses.text)}>
                                            {state.displayName || "Name"}
                                        </span>
                                        <input
                                            type="text"
                                            value={state.displayName}
                                            onChange={(e) => state.updateField('displayName', e.target.value)}
                                            placeholder="Name"
                                            className={cn(
                                                "absolute inset-0 bg-transparent border-0 outline-none font-bold text-[15px]",
                                                themeClasses.text
                                            )}
                                        />
                                    </div>

                                    {/* Verified Badge */}
                                    {state.isVerified && (
                                        <img
                                            src={state.verifiedType === 'yellow' ? "/Yellverified.png" : "/verify.png"}
                                            className="w-[18px] h-[18px] shrink-0 translate-y-[1px]"
                                            alt="verified"
                                        />
                                    )}

                                    {/* Custom badge */}
                                    {state.customBadgeUrl && (
                                        <div className="ml-1">
                                            <EditableImage
                                                src={state.customBadgeUrl}
                                                onChange={(url) => state.updateField('customBadgeUrl', url)}
                                                className="w-[18px] h-[18px] !rounded-sm"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="flex text-[15px] text-gray-500">
                                    <span>@</span>
                                    <EditableText
                                        value={state.username}
                                        onChange={(v) => state.updateField('username', v)}
                                        className="p-0 m-0"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={cn("cursor-pointer", themeClasses.subText)}>
                            <MoreHorizontal size={20} />
                        </div>

                    </div>

                    {/* Content */}
                    <EditableText
                        value={state.content}
                        onChange={(v) => state.updateField('content', v)}
                        onPaste={handlePaste}
                        className={cn(
// Added: tracking-[-0.015em] (tightens space between chars/words)
                            // Changed: leading-[1.3] (standard X line height)
                            "block w-full min-h-[1.5rem] text-[17px] leading-[1.3] tracking-[-0.015em] whitespace-pre-wrap mb-3",
                            themeClasses.text,
                            themeClasses.inputPlaceholder
                        )}
                        placeholder="Write your tweet content here..."
                    />

                    {/* Post Image */}
                    {state.postImageUrl && (
                        <div className="mb-3 mt-3">
                            <EditableImage
                                src={state.postImageUrl}
                                onChange={(url) => state.updateField('postImageUrl', url)}
                                className={cn(
                                    "w-full h-auto max-h-[500px] border-none rounded-2xl object-cover",
                                    isDark ? "border-none" : "border-none"
                                )}
                            />
                        </div>
                    )}

                    {/* Metadata */}
                    <div className={cn(
                        "border-b pb-3 mb-3 flex items-center text-[15px]",
                        isDark ? "border-gray-800" : "border-gray-100",
                        themeClasses.subText
                    )}>

                        <EditableTime
                            value={state.timestamp}
                            onChange={(v) => state.updateField('timestamp', v)}
                        />
                        <span className="mx-1">·</span>
                        <EditableDate
                            value={state.date}
                            onChange={(v) => state.updateField('date', v)}
                        />
                        <span className="mx-1">·</span>
                        <div className="inline-flex items-baseline whitespace-nowrap">
                            <div className="relative inline-grid">
                                <span className={cn("invisible whitespace-pre font-bold tabular-nums text-[15px]", themeClasses.text)}>
                                    {state.stats.views || "0"}
                                </span>
                                <input
                                    type="text"
                                    value={state.stats.views}
                                    onChange={(e) => state.updateStat('views', e.target.value.replace(/\D/g, '').slice(0, 10))}
                                    onBlur={() => handleStatBlur('views', state.stats.views)}
                                    className={cn(
                                        "absolute inset-0 bg-transparent border-0 outline-none font-bold tabular-nums text-[15px] p-0 m-0",
                                        themeClasses.text
                                    )}
                                />
                            </div>
                            <span className="ml-0.5 leading-tight">Views</span>
                        </div>

                    </div>

                    {/* Footer */}
                    <div className="flex justify-start gap-10 text-gray-500 px-1">
                        <div className="flex items-center gap-2">
                            <MessageCircle size={18} />
                            <EditableText
                                value={state.stats.replies}
                                onChange={(v) => state.updateStat('replies', v.replace(/\D/g, '').slice(0, 10))}
                                onBlur={() => handleStatBlur('replies', state.stats.replies)}
                                className="w-[7ch]"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Repeat2 size={18} />
                            <EditableText
                                value={state.stats.retweets}
                                onChange={(v) => state.updateStat('retweets', v.replace(/\D/g, '').slice(0, 10))}
                                onBlur={() => handleStatBlur('retweets', state.stats.retweets)}
                                className="w-[7ch]"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Heart size={18} />
                            <EditableText
                                value={state.stats.likes}
                                onChange={(v) => state.updateStat('likes', v.replace(/\D/g, '').slice(0, 10))}
                                onBlur={() => handleStatBlur('likes', state.stats.likes)}
                                className="w-[7ch]"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Bookmark size={18} />
                            <EditableText
                                value={state.stats.bookmarks}
                                onChange={(v) => state.updateStat('bookmarks', v.replace(/\D/g, '').slice(0, 10))}
                                onBlur={() => handleStatBlur('bookmarks', state.stats.bookmarks)}
                                className="w-[7ch]"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Share size={18} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};