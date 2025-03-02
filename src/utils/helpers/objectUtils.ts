// Utility functions for deep comparison of objects and arrays.

export function areObjectsEqual(obj1, obj2) {
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

export const areArraysEqual = (arr1: any[], arr2: any[]): boolean => {
  if (arr1.length !== arr2.length) return false;

  const sortedArr1 = [...arr1].sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
  const sortedArr2 = [...arr2].sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));

  return sortedArr1.every((item, index) => areObjectsEqual(item, sortedArr2[index]));
};
