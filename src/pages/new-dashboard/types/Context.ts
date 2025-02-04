import { DashboardPageData } from "lib/apis/dashboard/interfaces";

interface DashboardPageLink {
    title: string
    description: string
    link: string
}

export interface DashboardContextType {
    data?: DashboardPageData
    isLoading: boolean
    blogs: DashboardPageLink[]
    helpLinks: DashboardPageLink[]
}