import { initialValues } from "./formSchema";
import { convertSKUsToProperties } from "./skuUtils";
import { Product, ProductType } from "./types";

interface Params {
    product?: any
    selectedProductType: ProductType
}

export default function getFormInitialValues({ product, selectedProductType }: Params): Product {
    if (!product) {
        return { ...initialValues, product_type: selectedProductType }
    }

    return {
        // Identifiers
        _id: product._id,
        ownerID: product.ownerID,
        prodviderID: product.prodviderID || product.shippingType || "PRINTFUL",
        custome_external_id: product.custome_external_id,

        // Product Type and Classification
        product_type: product.product_type,
        productCollectionID: product.productCollectionID?._id,
        mainCategory: product.mainCategory?._id || null,
        subCategories: product.subCategories?.map((c: any) => c._id) || [],

        // Product Details
        title: product.title,
        description: product.description,
        keywords: [],
        media: product.media,
        thumb: product.thumb,

        // Pricing and Commission
        priceUnit: product.priceUnit,
        shippingType: product.shippingType,
        shippingPrice: product.shippingPrice,
        commission: product.commission,
        canBeAffiliated: product.canBeAffiliated,

        // Availability and Status
        purchaseAvailable: product.purchaseAvailable,
        isAddToCartDisabled: product.isAddToCartDisabled,
        publish_product: product.publish_status !== "DRAFTED",
        publish_status: product.publish_status,
        pre_purchase_data_fetch: product.pre_purchase_data_fetch,
        launchDate: product.launchDate,

        // Properties and Variants
        properties: convertSKUsToProperties(product.skuIDs),
        sku: product.skuIDs,

        // POD and Printing Details
        pod_blank_product_id: product.pod_blank_product_id,
        printful_template_id: product.printful_template_id,
        technique: product.technique,
        printful_option_data: product.printful_option_data,
        artwork: product.artwork,
        artwork2: product.artwork2,
        artwork_position: product.artwork_position,
        artwork2_position: product.artwork2_position,
        m2m_positions: product.m2m_positions,
        m2m_positions_options: product.m2m_positions_options || [],
        m2m_services: product.m2m_services?.map((service: any) => service._id) || [],
        positions: product.positions,

        // Digital Product Details
        digitalDetail: product.digitalDetail || { chain: "" }
    }
}