interface IrefactorImage {
    isMain: boolean
    url: string
}

const introductionClass = ({

    // refactor data like data incoming service
    refactorImage: (images: Array<string>, isMain?: string): Array<IrefactorImage> => {
        return images.map((el, key) => {
            return {
                isMain: isMain ? isMain === el : key === 0,
                url: el
            }
        })
    },

    // data incoming service change to Array<string>
    defactorImage: (images: Array<IrefactorImage | any>) => {
        return images.map((el) => el.url)
    },
    
    // set default image
    isMain: (images: Array<IrefactorImage | any>) => {
        return images.find((el) => el.isMain)
    }
})

export default introductionClass