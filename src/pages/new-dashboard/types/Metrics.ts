import { ReactNode } from "react"

export interface Metric {
    icon: ReactNode
    label: string
    value: number
    isPrice: boolean
}

export interface Action {
    icon: ReactNode
    label: string
    onClick: () => void
}