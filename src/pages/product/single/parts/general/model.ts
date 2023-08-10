interface IrefactorImage {
    isMain: boolean
    url: string
}

const introductionClass = ({
    refactorImage: (images: Array<string>): Array<IrefactorImage> => {
        return images.map((el, key) => {
            return {
                isMain: key === 0,
                url: el
            }
        })
    },

    defactorImage: (images: Array<IrefactorImage | any>) => {
        return images.map((el) => el.url)
    }
})

export default introductionClass