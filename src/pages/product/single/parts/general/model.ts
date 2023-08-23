interface IrefactorImage {
    isMain: boolean
    url: string
}

const introductionClass = ({
    refactorImage: (images: Array<string>, isMain?: string): Array<IrefactorImage> => {
        return images.map((el, key) => {
            return {
                isMain: isMain ? isMain === el : key === 0,
                url: el
            }
        })
    },

    defactorImage: (images: Array<IrefactorImage | any>) => {
        return images.map((el) => el.url)
    },

    isMain: (images: Array<IrefactorImage | any>) => {
        return images.find((el) => el.isMain)
    }
})

export default introductionClass