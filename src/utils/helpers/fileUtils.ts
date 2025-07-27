// Utility functions for handling files and images, including size calculations and URL manipulations.

export const convertMBtoBytes = (value: number) => value * 1024 * 1024;

export const getFileSizeInMB = (file: File) => (file.size / (1024 * 1024)).toFixed(2)