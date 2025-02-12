import { PerformanceReportResponse } from "lib/apis/dashboard/interfaces"

export const DEFAULT_PERFORMANCE_DATA: PerformanceReportResponse = {
    customers: { directCustomers: 0, affiliateCustomers: 0, total: 0 },
    netProfit: { directSales: 0, affiliateSales: 0, total: 0 },
    numberOfProducts: 0,
    orders: { directOrders: 0, affiliateOrders: 0, totalOrders: 0 },
    productBreakdown: [],
    totalInventoryValue: 0,
    visitors: 0,
}
