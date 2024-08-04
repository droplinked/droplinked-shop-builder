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

export const cart_item_options_to_array_of_variants = (options: any) => {
    let result: { name: string; caption: string }[] = [];
    Object.keys(options).forEach((key) => {
        if (key !== "quantity") {
            result.push({ name: key, caption: options?.[key].caption || options?.[key]?.title });
        }
    });
    return result;
};

export const getTomorrowMidnightISO = () => {
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

export const percent_to_hex = {
    100: "FF",
    99: "FC",
    98: "FA",
    97: "F7",
    96: "F5",
    95: "F2",
    94: "F0",
    93: "ED",
    92: "EB",
    91: "E8",
    90: "E6",
    89: "E3",
    88: "E0",
    87: "DE",
    86: "DB",
    85: "D9",
    84: "D6",
    83: "D4",
    82: "D1",
    81: "CF",
    80: "CC",
    79: "C9",
    78: "C7",
    77: "C4",
    76: "C2",
    75: "BF",
    74: "BD",
    73: "BA",
    72: "B8",
    71: "B5",
    70: "B3",
    69: "B0",
    68: "AD",
    67: "AB",
    66: "A8",
    65: "A6",
    64: "A3",
    63: "A1",
    62: "9E",
    61: "9C",
    60: "99",
    59: "96",
    58: "94",
    57: "91",
    56: "8F",
    55: "8C",
    54: "8A",
    53: "87",
    52: "85",
    51: "82",
    50: "80",
    49: "7D",
    48: "7A",
    47: "78",
    46: "75",
    45: "73",
    44: "70",
    43: "6E",
    42: "6B",
    41: "69",
    40: "66",
    39: "63",
    38: "61",
    37: "5E",
    36: "5C",
    35: "59",
    34: "57",
    33: "54",
    32: "52",
    31: "4F",
    30: "4D",
    29: "4A",
    28: "47",
    27: "45",
    26: "42",
    25: "40",
    24: "3D",
    23: "3B",
    22: "38",
    21: "36",
    20: "33",
    19: "30",
    18: "2E",
    17: "2B",
    16: "29",
    15: "26",
    14: "24",
    13: "21",
    12: "1F",
    11: "1C",
    10: "1A",
    9: "17",
    8: "14",
    7: "12",
    6: "0F",
    5: "0D",
    4: "0A",
    3: "08",
    2: "05",
    1: "03",
    0: "00",
};
