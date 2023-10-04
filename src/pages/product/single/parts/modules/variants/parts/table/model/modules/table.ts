import { IproductState, IskuOption } from "lib/apis/product/interfaces";
import ProductModel from "pages/product/single/model";
import VariantsMakeDataModel from "../../../../model/modules/makeData";

interface Ivariants {
    available_variant: Array<any>
    state: IproductState
    options: Array<IskuOption>
    prodviderID: string
}
const ProductSkuesTable = ({
    variants: ({ available_variant, state, options, prodviderID }: Ivariants) => {
        if (!options || !options.length) return 0

        const artworkCount = [state.artwork, state.artwork2].filter(el => el).length
        const avaliable = VariantsMakeDataModel.check_available({ options, available_variant })

        const printPrice = artworkCount > 1 ? avaliable.data?.printPrice * artworkCount : avaliable.data?.printPrice
        return ProductModel.isPrintful(prodviderID) ? avaliable.size?.price : avaliable.size.price + printPrice
    }
})

export default ProductSkuesTable