import { isStyleProp } from "@chakra-ui/react";

export const capitalizeFirstLetter = (value: string) => {
    if (!value) return "";
    return value
        .split(" ")
        .map((el) => el.charAt(0).toUpperCase() + el.slice(1).toLowerCase())
        .join(" ");
};

interface ItoMb {
    value: number;
}
export const toMb = ({ value }: ItoMb) => {
    return value * 1024 * 1024;
};

export const getMinMaxArray = (arr) => {
    let min = arr[0];
    let max = arr[0];
    let i = arr.length;

    while (i--) {
        min = arr[i] < min ? arr[i] : min;
        max = arr[i] > max ? arr[i] : max;
    }
    return { min, max };
};

export const getPercentage = (number: number, max: number) => (number * 100) / max;

const breakpoints = ["base", "xs", "sm", "md", "lg", "xl", "2xl"];
function is_responsive_value(obj) {
    if (obj && typeof obj === "object") if (breakpoints.some((key) => obj.hasOwnProperty(key))) return Object.values(obj).every((value) => typeof value === "string");
    return false;
}

export const picker = (pick_from: any) =>
    Object.keys(pick_from)
        .filter((key) => isStyleProp(key))
        .reduce((obj, key) => {
            obj[key] = pick_from[key];
            return obj;
        }, {} as Record<string, any>);

export const navigating_user_based_on_status = (status: string, data: any) => {
    switch (status) {
        case "NEW":
            localStorage.setItem("registerEmail", JSON.stringify(data.user.email));
            return { href: "/email-confirmation", dashboard: false };
        case "VERIFIED":
            return { href: "url-registration", dashboard: true };
        case "PROFILE_COMPLETED":
            return { href: "url-registration", dashboard: true };
        case "SHOP_INFO_COMPLETED":
            return { href: "", dashboard: true };
        case "IMS_TYPE_COMPLETED":
            return { href: "", dashboard: true };
        case "ACTIVE":
            return { href: "", dashboard: true };
        default:
            return { href: "", dashboard: false };
    }
};


export function sort_by_date<T extends { [key: string]: any }>(data: T[], date_key: keyof T, order: "asc" | "desc" = "asc"): T[] {
    return data.sort((a, b) => {
        const date_a = new Date(a[date_key]);
        const date_b = new Date(b[date_key]);
        if (order === "asc") return date_a.getTime() - date_b.getTime();
        else return date_b.getTime() - date_a.getTime();
    });
}

export const time_ago = (date_string: string): string => {
    const given_date = new Date(date_string);
    if (isNaN(given_date.getTime())) return 'Invalid date';
    const current_date = new Date();

    const ms_per_minute = 60 * 1000;
    const ms_per_hour = ms_per_minute * 60;
    const ms_per_day = ms_per_hour * 24;
    const ms_per_month = ms_per_day * 30;
    const ms_per_year = ms_per_day * 365;

    const elapsed = current_date.getTime() - given_date.getTime();

    if (elapsed < ms_per_day) {
        return 'less than a day ago';
    } else if (elapsed < ms_per_month) {
        const days = Math.floor(elapsed / ms_per_day);
        return `${days} day${days !== 1 ? 's' : ''} ago`;
    } else if (elapsed < ms_per_year) {
        const months = Math.floor(elapsed / ms_per_month);
        if (months <= 5) {
            return `${months} month${months !== 1 ? 's' : ''} ago`;
        }
    }

    return new Intl.DateTimeFormat('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' }).format(given_date);
}

export const cart_item_options_to_array_of_variants = (options: any) => {
    let result: { name: string; caption: string; }[] = [];
    Object.keys(options).forEach((key) => {
        if (key !== "quantity") {
            result.push({ name: key, caption: options?.[key].caption || options?.[key]?.title });
        }
    });
    return result
};

export const getTomorrowMidnightISO = () => {
    let currentDate = new Date()
    let tomorrowDate = new Date(currentDate)
    tomorrowDate.setDate(currentDate.getDate() + 1)
    tomorrowDate.setHours(0, 0, 0, 0)
    return tomorrowDate.toISOString()
}

export const isDateExpired = (isoDate: string | null) => {
    if (!isoDate) return true

    const date = new Date(isoDate)
    return date < new Date()
}