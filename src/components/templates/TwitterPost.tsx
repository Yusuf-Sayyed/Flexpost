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

    const themeClasses = {
        bg: isDark ? 'bg-black' : 'bg-white',
        text: isDark ? 'text-white' : 'text-gray-900',
        subText: isDark ? 'text-gray-500' : 'text-gray-500',
        border: isDark ? 'border-gray-800' : 'border-gray-100',
        inputPlaceholder: isDark ? 'placeholder:text-gray-700' : 'placeholder:text-gray-400'
    };

    return (
        <div className="flex flex-col gap-6">

            {/* --- THE POST CARD --- */}
            <div
                id={id}
                className={cn(
                    "w-full max-w-[680px] border sm:rounded-xl p-4 shadow-sm transition-colors duration-200",
                    themeClasses.bg,
                    themeClasses.text,
                    themeClasses.border
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
                            {/* Name Row - gap-0.5 makes badge stick to name */}
                            <div className="flex items-center gap-1">
                                {/* Text-width controlled name */}
                                <div className="relative inline-grid">
                                    {/* Hidden width mirror */}
                                    <span
                                        className={cn(
                                            "invisible whitespace-pre font-bold text-[15px]",
                                            themeClasses.text
                                        )}
                                    >
                                        {state.displayName || "Name"}
                                    </span>

                                    {/* Actual input */}
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

            {/* Verified Badge (Blue or Yellow) */}
                            {state.isVerified && (
                            <img
                                src={state.verifiedType === 'yellow' ? "/Yellverified.png" : "/verify.png"}
                                className="w-[18px] h-[18px] shrink-0 translate-y-[1px]"
                                alt="verified"
                            />
                            )}

                                {/* Custom badge (optional spacing) */}
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
                    className={cn(
                        "block w-full min-h-[3.5rem] text-[17px] leading-normal whitespace-pre-wrap mb-3",
                        themeClasses.text,
                        themeClasses.inputPlaceholder
                    )}
                    placeholder="What is happening?!"
                />

                {/* Post Image (Conditional) */}
                {state.postImageUrl && (
                    <div className="mb-3 mt-3">
                        <EditableImage
                            src={state.postImageUrl}
                            onChange={(url) => state.updateField('postImageUrl', url)}
                            className={cn(
                                "w-full h-auto max-h-[500px] border rounded-2xl object-cover",
                                themeClasses.border
                            )}
                        />
                    </div>
                )}

                {/* Metadata */}
                <div className={cn(
                    "border-b pb-3 mb-3 flex items-center text-[15px]",
                    themeClasses.border,
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
                        {/* Text-width controlled views number */}
                        <div className="relative inline-grid">
                            {/* Hidden width mirror */}
                            <span
                                className={cn(
                                    "invisible whitespace-pre font-bold tabular-nums text-[15px]",
                                    themeClasses.text
                                )}
                            >
                                {state.stats.views || "0"}
                            </span>

                            {/* Actual input */}
                            <input
                                type="text"
                                value={state.stats.views}
                                onChange={(e) =>
                                    state.updateStat(
                                        'views',
                                        e.target.value.replace(/\D/g, '').slice(0, 10) // up to 1B
                                    )
                                }
                                onBlur={() => handleStatBlur('views', state.stats.views)}
                                className={cn(
                                    "absolute inset-0 bg-transparent border-0 outline-none",
                                    "font-bold tabular-nums text-[15px] p-0 m-0",
                                    themeClasses.text
                                )}
                            />
                        </div>

                        {/* Views label — glued like verified badge */}
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
    );
};