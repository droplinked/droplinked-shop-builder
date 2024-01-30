export enum dashboardDates {
    yearly = 'YEARLY',
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

