export const getImageFileSize = (imageUrl: string) => {
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