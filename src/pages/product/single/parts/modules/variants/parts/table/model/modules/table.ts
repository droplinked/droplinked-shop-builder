import { IproductState } from "lib/apis/product/interfaces";

interface Ivariants {
    variants: any
    state: IproductState
}
const ProductSkuesTable = ({
    variants: ({ variants, state }: Ivariants) => {
        const artworks = [state.artwork, state.artwork2].filter(el => el).length
        return (artworks < 2 && !state.m2m_positions.length) || (!artworks && state.m2m_positions.length) ? variants?.single_print_price : variants?.front_back_print_price
    }
})

export default ProductSkuesTable