export const getDateRange = (type: string): [Date, Date] => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    switch (type) {
        case "Today":
            return [today, today];
        case "This Week":
            const thisWeekStart = new Date(today);
            thisWeekStart.setDate(today.getDate() - today.getDay());
            const thisWeekEnd = new Date(thisWeekStart);
            thisWeekEnd.setDate(thisWeekStart.getDate() + 6);
            return [thisWeekStart, thisWeekEnd];
        case "Last Week":
            const lastWeekStart = new Date(today);
            lastWeekStart.setDate(today.getDate() - today.getDay() - 7);
            const lastWeekEnd = new Date(lastWeekStart);
            lastWeekEnd.setDate(lastWeekStart.getDate() + 6);
            return [lastWeekStart, lastWeekEnd];
        case "This Month":
            return [new Date(now.getFullYear(), now.getMonth(), 1), new Date(now.getFullYear(), now.getMonth() + 1, 0)];
        case "Last Month":
            return [new Date(now.getFullYear(), now.getMonth() - 1, 1), new Date(now.getFullYear(), now.getMonth(), 0)];
        case "This Year":
            return [new Date(now.getFullYear(), 0, 1), new Date(now.getFullYear(), 11, 31)];
        case "Last Year":
            return [new Date(now.getFullYear() - 1, 0, 1), new Date(now.getFullYear() - 1, 11, 31)];
        default:
            return [today, today];
    }
};