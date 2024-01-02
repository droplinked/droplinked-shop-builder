export enum dashboardDates {
    weekly = 'WEEKLY',
    monthly = 'MONTHLY',
}

export interface IgetRevenueServices {
    dateRange: dashboardDates
    to: Date
    from: Date
}

