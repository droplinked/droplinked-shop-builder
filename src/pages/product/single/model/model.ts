import { IproductState } from "lib/apis/product/interfaces";
import AppendModule from "../parts/modules/properties/model/module/append";
import propertyFactor from "./modules/property";

const ProductSingleModel = ({

    // Sync data for IproductState interface
    refactorData: (data: any): IproductState => {
        const skuIDs: Array<any> = data?.skuIDs

        return {
            ...data?._id && { _id: data?._id },
            ...data?.ownerID && { ownerID: data?.ownerID },
            title: data?.title,
            description: data?.description,
            media: data?.media ? data?.media.map((el: any) => ({ thumbnail: el?.thumbnail, url: el?.url, isMain: el.isMain === 'true' })) : [],
            priceUnit: data?.priceUnit,
            productCollectionID: data?.productCollectionID?._id,
            properties: propertyFactor.refactor(skuIDs.map(el => el.options)),
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
                    recordData: {
                        ...el?.recordData,
                        commision: el?.recordData?.commision || 0
                    },
                    image: el?.image,
                    ...el?.rawPrice && { rawPrice: el?.rawPrice },
                    deployedShopAddress: el?.deployedShopAddress //TODO:
                }
            }),
            product_type: data?.product_type,
            publish_product: data?.publish_status && typeof data?.publish_status === "string" ? data?.publish_status !== "DRAFTED" : data?.publish_status,
            pod_blank_product_id: data?.pod_blank_product_id,
            prodviderID: data?.prodviderID || data?.shippingType || "PRINTFUL",
            artwork: data?.artwork,
            artwork2: data?.artwork2,
            m2m_positions: data?.m2m_positions,
            artwork_position: data?.artwork_position,
            artwork2_position: data?.artwork2_position,
            thumb: data?.thumb,
            m2m_services: data?.m2m_services ? data?.m2m_services.map((el: any) => el?._id) : [],
            purchaseAvailable: data?.purchaseAvailable,
            positions: data?.positions,
            printful_template_id: data?.printful_template_id,
            custome_external_id: data?.custome_external_id,
            digitalDetail: data?.digitalDetail,
            isAddToCartDisabled: data?.isAddToCartDisabled,
            m2m_positions_options: data?.m2m_positions_options || [],
            mainCategory: data?.mainCategory ? data?.mainCategory._id : null,
            subCategories: data?.subCategories ? data?.subCategories.map(el => el._id) : [],
            technique: data?.technique,
            pre_purchase_data_fetch: data?.pre_purchase_data_fetch,
            productTile: data?.productTile
            // isAddToCartDisabled: data?.isAddToCartDisabled,
        }
    },

    // Handle product type from url
    productTypeHandle: (type: string) => {
        switch (type) {
            case "pod":
                return "PRINT_ON_DEMAND"
            case "digital":
                return "DIGITAL"

            default:
                return "NORMAL"
        }
    }
})

export default ProductSingleModel