import { IproductState, IskuOption } from "lib/apis/product/interfaces";
import ProductArtworkModel from "pages/product/single/parts/modules/artwork/model";
import VariantsMakeDataModel from "../../../../model/modules/makeData";

interface Ivariants {
    available_variant: Array<any>
    state: IproductState
    options: Array<IskuOption>
    print_positions: Array<any>
}
const ProductSkuesTable = ({
    variants: ({ available_variant, state, options, print_positions }: Ivariants) => {
        const artworkCount = [state.artwork, state.artwork2].filter(el => el).length
        const avaliable = VariantsMakeDataModel.check_available({ options, available_variant })
        const printPrice = artworkCount > 1 ? avaliable.data?.printPrice * artworkCount : avaliable.data?.printPrice
        return ProductArtworkModel.exactDimensions(print_positions) ? avaliable.size?.price : avaliable.size.price + printPrice
    }
})

export default ProductSkuesTable