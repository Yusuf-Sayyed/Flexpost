"use client";

import { usePostStore } from '@/store/usePostStore';
import { AutoWidthText } from '../editor/AutoWidthText';
import { EditableText } from '../editor/EditableText';
import { EditableImage } from '../editor/EditableImage';
import {
    ThumbsUp,
    MessageSquare,
    MessageCircleMore,
    Repeat,
    Repeat2,
    Send,
    Share2,
    MoreHorizontal,
    Globe,
    Plus,
    X,
    Reply
} from 'lucide-react';
import { cn, formatCompactNumber } from '@/lib/utils';
import React from 'react';

export const LinkedInPost = ({ id }: { id: string }) => {
    const state = usePostStore();
    const isDark = state.theme === 'dark';

    const theme = {
        bg: isDark ? 'bg-[#1f2328]' : 'bg-white',
        text: isDark ? 'text-[#e6edf3]' : 'text-gray-900',
        subText: isDark ? 'text-[#8b949e]' : 'text-gray-500',
        border: isDark ? 'border-[#30363d]' : 'border-gray-300',
        placeholder: isDark ? 'placeholder:text-[#8b949e]' : 'placeholder:text-gray-400'
    };

    const handleStatBlur = (key: keyof typeof state.stats, value: string) => {
        let num = parseInt(value.replace(/,/g, '') || '0', 10);
        if (num > 1000000000) num = 1000000000;
        state.updateStat(key, formatCompactNumber(num.toString()));
    };

    const handleStatChange = (key: keyof typeof state.stats, value: string) => {
        // numeric only
        const clean = value.replace(/[^0-9]/g, '');
        // limit check during typing
        if (clean.length > 10) return; // Max 10 digits (1 billion = 1,000,000,000)

        // Check if number exceeds 1 billion
        const num = parseInt(clean || '0', 10);
        if (num > 1000000000) return;

        // Store raw number, format on blur
        state.updateStat(key, clean);
    };

    return (
        <div className="flex justify-center">
            {/* Capture wrapper */}
            <div
                id={id}
                className={cn(
                    "w-full flex justify-center p-6 rounded-xl",
                    isDark ? "bg-[#0f1419]" : "bg-[#eaf2ff]"
                )}
            >
                {/* Post card */}
                <div
                    className={cn(
                        "w-full max-w-[680px] min-w-[550px] border rounded-xl overflow-hidden font-sans relative",
                        theme.bg,
                        theme.border,
                        theme.text
                    )}
                >
                    {/* Top right menu */}
                    <div className="absolute top-3 right-3 flex gap-1 text-gray-500">
                        <div className="p-1 hover:bg-white/5 rounded-full cursor-pointer">
                            <MoreHorizontal size={18} />
                        </div>
                        <div className="p-1 hover:bg-white/5 rounded-full cursor-pointer">
                            <X size={18} />
                        </div>
                    </div>

                    {/* Header */}
                    <div className="flex gap-3 px-4 pt-4 pb-2">
                        <EditableImage
                            src={state.linkedinAvatarUrl || null}
                            onChange={(url) => state.updateField('linkedinAvatarUrl', url)}
                            className="w-12 h-12 rounded-full shrink-0"
                            isAvatar
                        />

                        <div className="flex flex-col min-w-0 flex-1">
                            {/* Name row */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-0.5 flex-wrap">
                                    <div className="relative inline-grid">
                                        <span className="invisible whitespace-pre font-semibold text-[14px]">
                                            {state.linkedinDisplayName || "Yusuf Sayyed"}
                                        </span>
                                        <input
                                            type="text"
                                            value={state.linkedinDisplayName || ""}
                                            onChange={(e) => state.updateField('linkedinDisplayName', e.target.value)}
                                            placeholder="Yusuf Sayyed"
                                            className="absolute inset-0 bg-transparent border-0 outline-none font-semibold text-[14px] p-0 m-0 w-full h-full"
                                        />
                                    </div>

                                    {/* Premium Badge */}
                                    {state.linkedinIsVerified && (
                                        <div className="w-3.5 h-3.5 mt-0.5 relative shrink-0 mx-1">
                                            <img src="/linkedinP.png" alt="Premium" className="w-full h-full object-contain" />
                                        </div>
                                    )}
                                    <span className={cn("text-[12px] mx-0.5", theme.subText)}>•</span>

                                    <EditableText
                                        value={state.linkedinConnectionDegree || "1st"}
                                        onChange={(v) => state.updateField('linkedinConnectionDegree', v)}
                                        className={cn("text-[12px]", theme.subText)}
                                    />
                                </div>
                            </div>

                            {/* Headline */}
                            <EditableText
                                value={state.linkedinUsername || ""}
                                onChange={(v) => state.updateField('linkedinUsername', v)}
                                placeholder='Software Developer'
                                className={cn("text-[12px] leading-tight mt-0.5", theme.subText)}
                            />

                            {/* Meta */}
                            <div className={cn("flex items-center gap-1 text-[12px] mt-0.5", theme.subText)}>
                                {/* Timestamp Composite Control */}
                                <div className="flex items-center gap-[0px]">
                                    <input
                                        type="text"
                                        value={parseInt(state.linkedinTimestamp || "") || ""}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 2);
                                            const currentUnit = (state.linkedinTimestamp || "").replace(/[0-9]/g, '') || "d";
                                            state.updateField('linkedinTimestamp', `${val}${currentUnit}`);
                                        }}
                                        className={cn(
                                            "bg-transparent border-none outline-none p-0 text-right font-[inherit] text-[inherit]",
                                            (state.linkedinTimestamp || "").replace(/[^0-9]/g, '').length === 3 ? "w-[24px]" :
                                                (state.linkedinTimestamp || "").replace(/[^0-9]/g, '').length === 2 ? "w-[16px]" : "w-[8px]"
                                        )}
                                        placeholder="1"
                                    />
                                    <select
                                        value={(state.linkedinTimestamp || "").replace(/[0-9]/g, '') || "d"}
                                        onChange={(e) => {
                                            const currentVal = parseInt(state.linkedinTimestamp || "") || 1;
                                            state.updateField('linkedinTimestamp', `${currentVal}${e.target.value}`);
                                        }}
                                        // Removed negative margin here to ensure "mo" has space
                                        className="bg-transparent border-none outline-none p-0 cursor-pointer text-[inherit] font-[inherit] appearance-none"
                                    >
                                        {['s', 'm', 'h', 'd', 'w', 'mo', 'yr'].map((u) => (
                                            <option key={u} value={u} className="bg-white text-black">{u}</option>
                                        ))}
                                    </select>
                                </div>
                                <span className="text-[10px] opacity-70 -ml-[3px]">•</span>
                                <Globe size={12} className="opacity-70" />
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-4 pt-2 pb-3">
                        <EditableText
                            value={state.linkedinContent || ""}
                            onChange={(v) => state.updateField('linkedinContent', v)}
                            className={cn(
                                "whitespace-pre-wrap min-h-[1.5rem] w-full resize-none",
                                "text-[14px] leading-[1.7]",
                                theme.text,
                                theme.placeholder
                            )}
                            placeholder="Start typing here....... (Support project by giving star on github)"
                        />
                    </div>

                    {/* Images */}
                    {(state.linkedinShowImage || state.linkedinShowImage2) && (
                        <div className="px-4 pb-3">
                            <div className="flex gap-1">
                                {state.linkedinShowImage && (
                                    <EditableImage
                                        src={state.linkedinPostImageUrl || null}
                                        onChange={(url) => state.updateField('linkedinPostImageUrl', url)}
                                        className={cn(
                                            "rounded-lg object-cover border-0",
                                            state.linkedinShowImage2 ? "w-1/2" : "w-full",
                                            state.linkedinShowImage2 ? "aspect-square" : "aspect-video"
                                        )}
                                    />
                                )}
                                {state.linkedinShowImage2 && (
                                    <EditableImage
                                        src={state.linkedinPostImage2Url || null}
                                        onChange={(url) => state.updateField('linkedinPostImage2Url', url)}
                                        className={cn(
                                            "rounded-lg object-cover border-0",
                                            state.linkedinShowImage ? "w-1/2" : "w-full",
                                            state.linkedinShowImage ? "aspect-square" : "aspect-video"
                                        )}
                                    />
                                )}
                            </div>
                        </div>
                    )}

                    {/* Engagement Stats Row */}
                    <div
                        className={cn(
                            "flex justify-between items-center px-4 py-2 text-[12px] border-t border-[#30363d]",
                            theme.subText
                        )}
                    >
                        {/* Left Side: Reactions (Pinned Left) */}
                        <div className="flex items-center gap-1 cursor-pointer">
                            <div className="flex -space-x-1">
                                {/* Like Reaction */}
                                <div className="z-30 rounded-full bg-white border border-transparent p-[1px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="w-3.5 h-3.5 fill-[#1485BD]" aria-label="Like">
                                        <circle cx="8" cy="8" r="8" fill="#1485BD" />
                                        <path d="M4 10V6H5V10H4ZM5 6H8.5L9.5 4H7V3H8C8.6 3 9 3.4 9 4L8 6H11C11.6 6 12 6.4 12 7V9C12 9.2 11.9 9.3 11.8 9.5L10.3 11.5C10.1 11.8 9.8 12 9.5 12H6V10H5V6Z" fill="white" transform="scale(0.8) translate(1.5, 1.5)" />
                                    </svg>
                                </div>
                                {/* Love Reaction */}
                                <div className="z-20 rounded-full bg-white border border-transparent p-[1px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="w-3.5 h-3.5 fill-[#E2552B]" aria-label="Love">
                                        <circle cx="8" cy="8" r="8" fill="#E2552B" />
                                        <path d="M8 11.5L7.5 11C5.5 9 4.5 7.5 4.5 6C4.5 4.5 5.5 3.5 7 3.5C7.7 3.5 8.3 3.8 8.8 4.3C9.2 3.8 9.8 3.5 10.5 3.5C12 3.5 13 4.5 13 6C13 7.5 12 9 10 11L9.5 11.5L8 13L8 11.5Z" fill="white" transform="scale(0.65) translate(4.5, 3.5)" />
                                    </svg>
                                </div>
                                {/* Clap Reaction */}
                                <div className="z-10 rounded-full bg-white border border-transparent p-[1px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="w-3.5 h-3.5 fill-[#4DA24F]" aria-label="Clap">
                                        <circle cx="8" cy="8" r="8" fill="#4DA24F" />
                                        <path d="M9.5 7.5C9.5 7.5 9.5 7.5 9.5 7.5L8 6L5.5 8.5L6 9L9.5 5.5C10 5 10.5 5 11 5.5L11.5 6C12 6.5 12 7 11.5 7.5L8 11L7 12L4 9L4.5 8.5L7 11H8L11 8C11 8 11 8 11 8C11.3 7.7 11.3 7.3 11 7L10.5 6.5C10.2 6.2 9.8 6.2 9.5 6.5L6 10L6.5 10.5L9.5 7.5Z" fill="white" transform="scale(0.8) translate(2, 2)" />
                                    </svg>
                                </div>
                            </div>
                            <EditableText
                                value={state.stats.likes}
                                onChange={(v) => handleStatChange('likes', v)}
                                onBlur={() => handleStatBlur('likes', state.stats.likes)}
                                className="ml-1"
                            />
                        </div>

                        {/* Right Side: Comments & Reposts */}
                        <div className="flex items-center gap-0 text-[12px]">
                            <div className="relative inline-grid">
                                <span className="invisible whitespace-pre text-[12px]">
                                    {state.stats.replies || "10"}
                                </span>
                                <input
                                    type="text"
                                    value={state.stats.replies || ""}
                                    onChange={(e) => handleStatChange('replies', e.target.value)}
                                    onBlur={() => handleStatBlur('replies', state.stats.replies)}
                                    className="absolute inset-0 bg-transparent border-0 outline-none text-[12px] p-0 m-0 w-full h-full"
                                />
                            </div>
                            <span className="ml-0.5">comments</span>
                            <span className="mx-1">•</span>
                            <div className="relative inline-grid">
                                <span className="invisible whitespace-pre text-[12px]">
                                    {state.stats.retweets || "10"}
                                </span>
                                <input
                                    type="text"
                                    value={state.stats.retweets || ""}
                                    onChange={(e) => handleStatChange('retweets', e.target.value)}
                                    onBlur={() => handleStatBlur('retweets', state.stats.retweets)}
                                    className="absolute inset-0 bg-transparent border-0 outline-none text-[12px] p-0 m-0 w-full h-full"
                                />
                            </div>
                            <span className="ml-0.5">reposts</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-between px-2 py-1">
                        <Action icon={<LinkedInLikeIcon />} text="Like" />
                        <Action icon={<MessageCircleMore size={16} />} text="Comment" />
                        <Action icon={<Repeat2 size={16} />} text="Repost" />
                        <Action icon={<Send size={16} />} text="Send" />
                    </div>
                </div>
            </div>
        </div>
    );
};

// Custom LinkedIn-style Icons
const LinkedInLikeIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M7 22V11M2 13V20C2 21.1046 2.89543 22 4 22H17.4262C18.907 22 20.1662 20.9197 20.3914 19.4562L21.4683 12.4562C21.7479 10.6389 20.3418 9 18.5032 9H15V4.46584C15 3.10399 13.896 2 12.5342 2C12.2093 2 11.915 2.1913 11.7831 2.48812L7.26394 12.1303C7.10344 12.4841 6.74532 12.7105 6.35013 12.7105H4C2.89543 12.7105 2 13.6059 2 14.7105V13Z" strokeLinecap="round" strokeLinejoin="round" transform="scale(-1, 1) translate(-24, 0)" />
    </svg>
);

const LinkedInCommentIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M7.9 20C7.9 20.5 7.5 21 7 21H5C3.3 21 2 19.7 2 18V7C2 5.3 3.3 4 5 4H19C20.7 4 22 5.3 22 7V13C22 14.7 20.7 16 19 16H13L8.3 20.3C8.1 20.4 7.9 20.5 7.9 20.5V20Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const LinkedInRepostIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 5H21M21 5V13M21 5L13 13L9 9L3 15" strokeLinecap="round" strokeLinejoin="round" transform="rotate(90 12 12)" />
        <path d="M4 9V4H9" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 15V20H15" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 4L9 9M15 15L20 20" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const LinkedInSendIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const Action = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
    <div className="flex flex-col w-full items-center justify-center gap-1 py-3 text-[14px] font-semibold text-[#8b949e] hover:bg-white/5 rounded-md cursor-pointer">
        {icon}
        <span className="text-[12px]">{text}</span>
    </div>
);
