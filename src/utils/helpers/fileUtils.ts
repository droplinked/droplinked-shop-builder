// Utility functions for handling files and images, including size calculations and URL manipulations.

export const convertMBtoBytes = (value: number) => value * 1024 * 1024;

export const getFileSizeInMB = (file: File) => (file.size / (1024 * 1024)).toFixed(2)

export const getFileSizeInKB= (imageUrl: string) => {
    return fetch(imageUrl)
        .then((response) => response.blob())
        .then((blob) => {
            const fileSizeKB = Math.round(blob.size / 1024);
            return fileSizeKB;
        })
        .catch((error) => {
            console.error('Failed to fetch image:', error);
        });
}

export const getFileNameFromUrl = (url: string) => {
    const path = decodeURI(url);
    const lastSlashIndex = path.lastIndexOf('/');
    const fileNameWithExtension = path.substring(lastSlashIndex + 1);
    const splits = fileNameWithExtension.split('.')
    const fileName = splits[0].substring(0, 3) + '...' + splits[0].substring(3, 6) + '.' + splits[splits.length - 1];
    return fileName;
}
