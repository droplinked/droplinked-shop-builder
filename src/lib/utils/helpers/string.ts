// Utility functions for string manipulations like capitalization and array conversions.

export const capitalizeWords = (value: string = ""): string =>
    value
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ")


export const convertCartOptionsToVariantsArray = (options: any) => {
    if (!options) return
    let result: { name: string; caption: string }[] = [];
    Object.keys(options).forEach((key) => {
        if (key !== "quantity") {
            result.push({ name: key, caption: options?.[key].caption || options?.[key]?.title });
        }
    });
    return result;
};