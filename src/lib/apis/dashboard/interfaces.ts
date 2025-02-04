export enum dashboardDates {
    yearly = 'YEARLY',
    weekly = 'WEEKLY',
}

export interface IgetRevenueServices {
    dateRange: dashboardDates
    to: Date
    from: Date
}

export interface IbestProducts {
    from: Date
    to: Date
}

export interface IClarityData {
    shopName: string;
    totalSessionCount: number;
    pagesPerSession: number;
    activeTimeSpent: number;
    topCountries: Record<string, number>
}

export interface DashboardPageData {
    shopStats: {
        orders: number
        totalRevenue: number
        profit: number
        customers: number
    },
    recentOrders: {
        _id: string
        status: string
        totalPriceCart: number
        updatedAt: string
    }[]
}