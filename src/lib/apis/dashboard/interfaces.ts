export enum dashboardDates {
    weekly = 'WEEKLY',
    monthly = 'MONTHLY',
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

