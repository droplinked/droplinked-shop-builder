import { Iproperties, Isku } from "lib/apis/product/interfaces"
import { typesProperties } from "lib/utils/statics/types"

interface Iskues {
    skues: Array<Isku>
}

interface checkExistAllPropperty {
    properties: Array<Iproperties>
}

const ProductValidateModel = ({
    skues: ({ skues }: Iskues) => {
        return skues.find(sku => {
            return parseInt(sku.quantity) <= 0
        })
    },
    checkExistAllPropperty: ({ properties }: checkExistAllPropperty) => {
        const propery = properties && properties.filter(el => el.items.length).map(el => el.title)
        return propery.length === typesProperties.length
    }
})

export default ProductValidateModel