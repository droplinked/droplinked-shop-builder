import { ReactNode } from "react"

export interface RevenueStat {
    icon: ReactNode
    label: string
    value: number
    isPrice: boolean
}

export interface QuickAction {
    icon: ReactNode
    label: string
    url: string
}

export interface SocialMediaItem {
    icon: ReactNode
    label: string
    hoverEffect: string
    url: string
}