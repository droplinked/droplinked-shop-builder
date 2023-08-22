const ProductArtworkModel = ({
    exactDimensions: (print_positions: any) => print_positions.find(el => el.positions.find(pos => pos.exactDimensions))
})

export default ProductArtworkModel