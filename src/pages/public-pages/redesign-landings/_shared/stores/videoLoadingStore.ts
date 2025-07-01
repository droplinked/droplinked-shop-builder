import { create } from 'zustand'

interface VideoLoadingState {
    loadingVideos: Set<string>
    setVideoLoading: (videoId: string, isLoading: boolean) => void
    isAnyVideoLoading: () => boolean
    areAllVideosLoaded: () => boolean
    getLoadingCount: () => number
}

export const useVideoLoadingStore = create<VideoLoadingState>((set, get) => ({
    loadingVideos: new Set(),

    setVideoLoading: (videoId: string, isLoading: boolean) => {
        set((state) => {
            const newLoadingVideos = new Set(state.loadingVideos)
            if (isLoading) {
                newLoadingVideos.add(videoId)
            } else {
                newLoadingVideos.delete(videoId)
            }
            return { loadingVideos: newLoadingVideos }
        })
    },

    isAnyVideoLoading: () => {
        return get().loadingVideos.size > 0
    },

    areAllVideosLoaded: () => {
        return get().loadingVideos.size === 0
    },

    getLoadingCount: () => {
        return get().loadingVideos.size
    }
}))
