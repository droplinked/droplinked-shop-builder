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

export interface CardButton {
    label: string
    variant: 'primary' | 'outline'
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
    onClick: () => void
}