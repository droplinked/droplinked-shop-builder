import { Isku } from "lib/apis/product/interfaces";

const Artwork2dSkuModel = ({
    options: (sku: Array<Isku>) => {
        const getVariant = (variant: string) => sku.length ? sku.map(el => el.options.find(co => co.variantName === variant)) : null

        // Remove dublicate
        const uniqueOptions = (options) => options ? options.filter((option, index) => {
            const previousIndex = options.findIndex((prevOption, prevIndex) => prevIndex < index && prevOption?.value === option?.value);
            return previousIndex === -1;
        }) : []

        return {
            colors: uniqueOptions(getVariant("Color")),
            sizes: uniqueOptions(getVariant("Size"))
        }
    }
})

export default Artwork2dSkuModel