import { Imedia } from "lib/apis/product/interfaces"

const introductionClass = ({

    // refactor data like data incoming service
    refactorImage: (images: Array<Imedia>, isMain?: string): Array<Imedia> => {
        return images.map((el, key) => {
            return {
                isMain: isMain ? isMain === el.url : key === 0,
                url: el.url,
                thumbnail: el.thumbnail,
            }
        })
    },

    // data incoming service change to Array<string>
    defactorImage: (images: Array<Imedia | any>) => {
        return images.map((el) => el.url)
    },

    // set default image
    isMain: (images: Array<Imedia | any>) => {
        return images.find((el) => el.isMain)
    }
})

export default introductionClass