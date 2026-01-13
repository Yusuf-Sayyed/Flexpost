import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface TwitterState {
  theme: 'dark' | 'light'
  verifiedType: 'blue' | 'yellow'; // <--- State for badge color
  displayName: string
  username: string
  content: string
  timestamp: string
  date: string
  avatarUrl: string | null
  postImageUrl: string | null
  customBadgeUrl: string | null
  isVerified: boolean
  stats: {
    views: string
    likes: string
    retweets: string
    replies: string
    bookmarks: string
  }
}

interface Actions {
  updateField: (field: keyof TwitterState, value: any) => void
  updateStat: (stat: keyof TwitterState['stats'], value: string) => void
  toggleVerified: () => void
  toggleTheme: () => void
  toggleVerifiedType: () => void; // <--- Action definition
  reset: () => void
}

const initialState: TwitterState = {
  theme: 'dark',
  verifiedType: 'blue', // Default to blue
  displayName: 'Yusuf',
  username: 'Yusuf_SDEV',
  content: 'gm\n\nNever stop hustling\n\nKeep trying and you will achieve it',
  timestamp: '8:13 AM',
  date: 'Jan 12, 2026',
  avatarUrl: null,
  postImageUrl: null,
  customBadgeUrl: null,
  isVerified: false,
  stats: {
    views: '10',
    likes: '45',
    retweets: '12',
    replies: '5',
    bookmarks: '3'
  }
}

export const usePostStore = create<TwitterState & Actions>()(
  persist(
    (set) => ({
      ...initialState,

      updateField: (field, value) => set((state) => ({ ...state, [field]: value })),

      updateStat: (stat, value) =>
        set((state) => ({
          stats: { ...state.stats, [stat]: value }
        })),

      toggleVerified: () => set((state) => ({ isVerified: !state.isVerified })),

      toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),

      // --- ADDED THIS MISSING LOGIC ---
      toggleVerifiedType: () => set((state) => ({
        verifiedType: state.verifiedType === 'blue' ? 'yellow' : 'blue'
      })),

      reset: () => set(initialState)
    }),
    { name: 'social-mockup-storage' }
  )
)