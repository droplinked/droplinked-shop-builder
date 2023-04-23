import { IproductState } from "apis/product/interfaces";
import propertyFactor from "./modules/property";
import AppendModule from "../parts/properties/parts/form/model/module/append";

export default class ProductSingleModel {
    private static property = propertyFactor

    static refactorData = (data: any): IproductState => {
        const skuIDs: Array<any> = data?.skuIDs

        return {
            title: data?.title,
            description: data?.description,
            media: data?.media ? data?.media : [],
            priceUnit: data?.priceUnit,
            productCollectionID: data?.productCollectionID?._id,
            properties: this.property.refactor(skuIDs.map(el => el.options)),
            shippingPrice: data?.shippingPrice,
            shippingType: data?.shippingType,
            sku: skuIDs.map(el => {
                const options: Array<any> = el.options
                return {
                    _id: el._id,
                    dimensions: el.dimensions,
                    externalID: el.externalID,
                    index: 0,
                    options: options.map(option => {
                        return {
                            value: option.value,
                            variantID: option.variantID,
                            variantName: AppendModule.getCaption(option.variantID)
                        }
                    }),
                    price: el?.price,
                    quantity: el?.quantity,
                    record: false,
                    weight: el?.weight
                }
            })
        }
    }
} 