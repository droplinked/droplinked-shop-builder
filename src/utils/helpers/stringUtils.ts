// Utility functions for string manipulations like capitalization and array conversions.

export const capitalizeFirst = (value: string = ""): string =>
    value.charAt(0).toUpperCase() + value.slice(1);

export function toCamelCase(str) {
    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

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