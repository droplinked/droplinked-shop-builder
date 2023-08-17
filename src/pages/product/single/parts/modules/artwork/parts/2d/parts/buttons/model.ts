const Artwork2dButtonsModel = ({
    getSizeImage: (artwork: string) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = function () {
                resolve({ width: img.width, height: img.height });
            };
            img.onerror = function () {
                reject(new Error('Failed to load image'));
            };
            img.src = artwork;
        });
    }
})

export default Artwork2dButtonsModel