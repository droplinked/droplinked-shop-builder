// Utility functions for date and time formatting, comparison, and calculations.

export const formatDateToLocaleString = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).replace(',', ' -').replace('at', '');
}

// Sorts data by a date field in ascending or descending order
export function sortByDate<T extends { [key: string]: any }>(data: T[], date_key: keyof T, order: "asc" | "desc" = "asc"): T[] {
    return data.sort((a, b) => {
        const date_a = new Date(a[date_key]);
        const date_b = new Date(b[date_key]);
        if (order === "asc") return date_a.getTime() - date_b.getTime();
        else return date_b.getTime() - date_a.getTime();
    });
}

// Returns a human-readable string of the time elapsed since the given date
export const getTimeAgo = (date_string: string): string => {
    const given_date = new Date(date_string);
    if (isNaN(given_date.getTime())) return "Invalid date";
    const current_date = new Date();

    const ms_per_minute = 60 * 1000;
    const ms_per_hour = ms_per_minute * 60;
    const ms_per_day = ms_per_hour * 24;
    const ms_per_month = ms_per_day * 30;
    const ms_per_year = ms_per_day * 365;

    const elapsed = current_date.getTime() - given_date.getTime();

    if (elapsed < ms_per_day) {
        return "less than a day ago";
    } else if (elapsed < ms_per_month) {
        const days = Math.floor(elapsed / ms_per_day);
        return `${days} day${days !== 1 ? "s" : ""} ago`;
    } else if (elapsed < ms_per_year) {
        const months = Math.floor(elapsed / ms_per_month);
        if (months <= 5) {
            return `${months} month${months !== 1 ? "s" : ""} ago`;
        }
    }

    return new Intl.DateTimeFormat("en-US", { month: "numeric", day: "numeric", year: "numeric" }).format(given_date);
};

// Formats a date in a long style format (e.g., "November 1, 2022")
export const formatDateToLongStyle = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }
    return date.toLocaleDateString('en-US', options)
}

// Returns the ISO string for midnight of the next day
export const getNextDayMidnightISO = () => {
    let currentDate = new Date();
    let tomorrowDate = new Date(currentDate);
    tomorrowDate.setDate(currentDate.getDate() + 1);
    tomorrowDate.setHours(0, 0, 0, 0);
    return tomorrowDate.toISOString();
};

export const isDateExpired = (isoDate: string | null) => {
    if (!isoDate) return true;

    const date = new Date(isoDate);
    return date < new Date();
};
