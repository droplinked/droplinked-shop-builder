import { Isku } from "lib/apis/product/interfaces";

const Artwork2dSkuModel = ({
    options: (sku: Array<Isku>) => {
        const options = sku.length ? sku.map(el => el.options.find(co => co.variantName === "Color")) : null

        // Remove color dublicate
        const uniqueOptions = options ? options.filter((option, index) => {
            const previousIndex = options.findIndex((prevOption, prevIndex) => prevIndex < index && prevOption.value === option.value);
            return previousIndex === -1;
        }) : []

        return uniqueOptions
    }
})

export default Artwork2dSkuModel