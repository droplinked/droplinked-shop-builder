export type OrderStatus = "PAYMENT_CONFIRMED" | "INITIALIZED_FOR_PAYMENT" | "CANCELED";

export const getStatusColorScheme = (status?: OrderStatus): "success" | "pending" | "error" => {
    switch (status) {
        case "PAYMENT_CONFIRMED":
            return "success";
        case "INITIALIZED_FOR_PAYMENT":
            return "pending";
        case "CANCELED":
            return "error";
        default:
            return "pending";
    }
};

export const isOrderCancelled = (status?: OrderStatus): boolean => status === "CANCELED";

/**
 * Formats a date to a localized string (e.g., April 22, 2023)
 */
export const formattedDate = (date: Date | string): string => {
    if (!date) return '---';

    return new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

/**
 * Formats a time to a localized string (e.g., 14:30)
 */
export const formattedTime = (date: Date | string): string => {
    if (!date) return '---';

    return new Date(date).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
}

/**
 * Converts underscored text to title case (e.g., PAYMENT_CONFIRMED → Payment Confirmed)
 */
export const formatUnderlinedText = (status: string): string => {
    if (!status) return '';

    return status
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
};

/**
 * Truncates text if it exceeds the specified maximum length
 */
export const truncateText = (text: string, maxLength: number = 15): string => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
}

/**
 * Formats a customer name from address book or falls back to email
 */
export const getCustomerDisplayName = (
    customerAddressBook?: { firstName: string; lastName: string },
    customerEmail?: string
): string => {
    if (customerAddressBook?.firstName || customerAddressBook?.lastName) {
        return `${customerAddressBook.firstName || ''} ${customerAddressBook.lastName || ''}`.trim();
    }
    return customerEmail || '';
}