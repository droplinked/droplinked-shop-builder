import { IproductState, Iproperties } from "lib/apis/product/interfaces"
import VariantsMakeDataModel from "./modules/makeData"

interface ImakeData {
    properties: Array<Iproperties>
    available_variant: Array<any>
    state: IproductState
}

const VariantsProductModel = ({
    makeData: ({ properties, available_variant, state }: ImakeData) => {
        const sort = VariantsMakeDataModel.sort({ properties })
        const makedataModel = VariantsMakeDataModel.makePropertyChild({ sort })
        const refactor = VariantsMakeDataModel.getOptions({
            properties: makedataModel,
            state,
            available_variant
        })
        return refactor.filter(el => el.options.length)
    }
})

export default VariantsProductModel