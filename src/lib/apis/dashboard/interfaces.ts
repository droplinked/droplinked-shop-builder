export enum dashboardDates {
    yearly = 'YEARLY',
    weekly = 'WEEKLY'
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
    shopName: string
    totalSessionCount: number
    pagesPerSession: number
    activeTimeSpent: number
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

export interface AnalyticsQueryParams {
    startDate: string
    endDate: string
}

export interface SalesReportResponse {
    salesData: SalesData[]
    period: string
    startDate: string
    endDate: string
    totalSalesInPeriod: number
}

export interface SalesData {
    date: string
    totalSales: number
    affiliateSales: number
    directSales: number
}

export interface PerformanceReportResponse {
    netProfit: NetProfit
    customers: CustomerStats
    orders: OrderStats
    visitors: number
    totalInventoryValue: number
    numberOfProducts: number
    productBreakdown: ProductBreakdown[]
}

interface NetProfit {
    total: number
    directSales: number
    affiliateSales: number
}

interface CustomerStats {
    total: number
    directCustomers: number
    affiliateCustomers: number
}

interface OrderStats {
    totalOrders: number
    directOrders: number
    affiliateOrders: number
}

export interface ProductBreakdown {
    productType: string
    totalValue: number
    quantity: number
    percentageOfTotal: number
}

export interface TopSeller {
    totalCount: number
    totalAmountCombined: number
    totalAmountDirect: number
    totalAmountAffiliate: number
    productName: string
    shippingType: ShippingType
    productMedia: ProductMedia[]
    productID: string
}

interface ProductMedia {
    url: string
    isMain: boolean
    thumbnail: string
    _id: string
}

type ShippingType = 'EASY_POST' | 'NONE' | 'PRINTFUL'