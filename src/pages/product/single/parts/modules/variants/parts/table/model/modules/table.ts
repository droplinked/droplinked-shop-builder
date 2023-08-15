import { IproductState, IskuOption } from "lib/apis/product/interfaces";
import VariantsMakeDataModel from "../../../../model/modules/makeData";

interface Ivariants {
    available_variant: Array<any>
    state: IproductState
    options: Array<IskuOption>
}
const ProductSkuesTable = ({
    variants: ({ available_variant, state, options }: Ivariants) => {
        const artworkCount = [state.artwork, state.artwork2].filter(el => el).length
        const avaliable = VariantsMakeDataModel.check_available({ options, available_variant })
        const printPrice = artworkCount > 1 ? avaliable.data?.printPrice * artworkCount : avaliable.data?.printPrice

        return avaliable.size.price + printPrice
    }
})

export default ProductSkuesTable