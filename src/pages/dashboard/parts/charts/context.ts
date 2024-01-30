import { createContext } from "react";

export interface IrevenueChartItem {
    title: string;
    value: number;
    details: {
        order: number;
        revenue: number;
        profit: number;
        direct: number;
        affiliate: number;
    };
}

export interface IrevenueReports {
    profit: {
        affiliate: number;
        direct: number;
        value: number;
    };
    orders: {
        affiliate: number;
        direct: number;
        value: number;
    };
    customerChart: {
        affiliate: number;
        direct: number;
        value: number;
    };
}

export interface IrevenueData {
    chart: IrevenueChartItem[];
    total: number;
    report: IrevenueReports;
}

export interface IdashboardChartsStates {
    revenue: IrevenueData;
    date: "WEEKLY" | "MONTHLY" | "YEARLY";
}

interface IProps {
    states: IdashboardChartsStates;
    isLoading: boolean;
    method: {
        updateStates: Function;
    };
}

export const dashboardChartsStates: IdashboardChartsStates = {
    revenue: null,
    date: "YEARLY",
};

const dashboardChartsContext = createContext<IProps>({
    states: dashboardChartsStates,
    method: {
        updateStates: () => {},
    },
    isLoading: false,
});

export default dashboardChartsContext;
