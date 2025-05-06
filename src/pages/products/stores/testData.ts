export const testData = Array.from({ length: 100 }, (_, index) => ({
    image: "https://upload-file-droplinked.s3.amazonaws.com/e1c6a3168548e724fa69574b83807d539b262af10f86a1de35683c2d0b56f0da_small.png",
    title: `Premium Product ${index + 1} - Limited Edition`,
    url: `https://example.com/product/${(index + 1).toString().padStart(5, '0')}`,
}));
