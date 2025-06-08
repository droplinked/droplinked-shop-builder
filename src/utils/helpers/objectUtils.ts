/**
 * Deep comparison of two objects
 * @param obj1 - First object to compare
 * @param obj2 - Second object to compare
 * @returns boolean indicating if objects are equal
 */
export function areObjectsEqual(obj1: any, obj2: any): boolean {
    if (obj1 === obj2) return true;

    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) return false;

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (let key of keys1) {
        if (!keys2.includes(key) || !areObjectsEqual(obj1[key], obj2[key])) return false;
    }

    return true;
}

/**
 * Deep comparison of two arrays
 * @param arr1 - First array to compare
 * @param arr2 - Second array to compare
 * @returns boolean indicating if arrays are equal
 */
export const areArraysEqual = (arr1: any[], arr2: any[]): boolean => {
    if (arr1.length !== arr2.length) return false;

    const sortedArr1 = [...arr1].sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
    const sortedArr2 = [...arr2].sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));

    return sortedArr1.every((item, index) => areObjectsEqual(item, sortedArr2[index]));
};

/**
 * Removes falsy values from an object while preserving zero values
 * @param obj - The object to clean
 * @returns A new object with falsy values removed
 */
export const removeFalsyValues = (obj: Record<string, any>) => {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => {
            if (value === 0) return true; // Keep zero values
            return Boolean(value);
        })
    );
};
