import { IrevenueChartItem, IrevenueData } from "../../context";

namespace generalStatisticsModel {
    export const findMaxRevenue = (revenue: IrevenueData) => {
        if(!revenue.chart) return 0
        return Math.max(...revenue.chart.map((item: IrevenueChartItem) => item?.details?.revenue))?.toFixed(2)
    };
}


export default generalStatisticsModel