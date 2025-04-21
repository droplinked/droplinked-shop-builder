export const formattedDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

export const formattedTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
}

export const formatUnderlinedText = (status: string): string => {
    if (!status) return '';

    return status
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
};

export const truncateText = (text: string, maxLength: number = 15) => {
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
}