import { Iproperties, Isku, IskuOption, product_type } from "lib/apis/product/interfaces"
import VariantsMakeDataModel from "./modules/makeData"
import VariantsRefactorModel from "./modules/refactor"

interface ImakeData {
    properties: Array<Iproperties>
    skues: Array<Isku>
    product_type: product_type
}

export default class VariantsProductModel {
    static refactorModel = VariantsRefactorModel
    static makedataModel = VariantsMakeDataModel

    static makeData = ({ properties, skues, product_type }: ImakeData) => {
        
        const sort = this.makedataModel.sort({ properties })
        const makedataModel = this.makedataModel.makePropertyChild({ sort })
        const refactor = this.makedataModel.getOptions({
            properties: makedataModel,
            skues,
            product_type
        })
        return refactor.filter(el => el.options.length)
    }
}