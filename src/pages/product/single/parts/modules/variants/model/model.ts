import { Iproperties, Isku, IskuOption, product_type } from "lib/apis/product/interfaces"
import VariantsMakeDataModel from "./modules/makeData"

interface ImakeData {
    properties: Array<Iproperties>
    skues: Array<Isku>
    product_type: product_type
    available_variant: Array<any>
}

const VariantsProductModel = ({
    makeData: ({ properties, skues, product_type, available_variant }: ImakeData) => {
        const sort = VariantsMakeDataModel.sort({ properties })
        const makedataModel = VariantsMakeDataModel.makePropertyChild({ sort })
        const refactor = VariantsMakeDataModel.getOptions({
            properties: makedataModel,
            skues,
            product_type,
            available_variant
        })
        return refactor.filter(el => el.options.length)
    }
})

export default VariantsProductModel