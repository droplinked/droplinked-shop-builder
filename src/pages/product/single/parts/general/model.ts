interface IrefactorImage {
    isMain: boolean
    url: string
}

export default class introductionClass {
    static refactorImage = (images: Array<string>): Array<IrefactorImage> => {
        return images.map((el, key) => {
            return {
                isMain: key === 0,
                url: el
            }
        })
    }

    static defactorImage = (images: Array<IrefactorImage | any>) => {
        return images.map((el) => el.url)
    }
} 