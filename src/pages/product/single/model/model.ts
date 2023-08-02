import { IproductState } from "lib/apis/product/interfaces";
import AppendModule from "../parts/modules/properties/model/module/append";
import propertyFactor from "./modules/property";

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
                            variantName: AppendModule.getCaption(option.variantID),
                            caption: option.caption
                        }
                    }),
                    price: el?.price,
                    quantity: el?.quantity,
                    record: false,
                    weight: el?.weight,
                    recordData: el?.recordData,
                    image: el?.image
                }
            }),
            product_type: data?.product_type,
            publish_product: data?.publish_status && typeof data?.publish_status === "string" ? data?.publish_status !== "DRAFTED" : data?.publish_status,
            pod_blank_product_id: data?.pod_blank_product_id,
            prodviderID: data?.prodviderID || "DLW",
            artwork: data?.artwork,
            artwork2: data?.artwork2,
            m2m_positions: data?.m2m_positions,
            artwork_position: data?.artwork_position,
            artwork2_position: data?.artwork2_position,
            thumb: data?.thumb,
            m2m_services: data?.m2m_services || []
        }
    }
} 