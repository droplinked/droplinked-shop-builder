import { PriceConversionParams } from "functions/hooks/useCurrencyConverter/useCurrencyConverter";
import { nanoid } from "nanoid";
import { initialValues } from "./formSchema";
import { convertSKUsToProperties } from "./skuUtils";
import { Product, ProductType, SKU } from "./types";

interface Params {
    product?: any
    selectedProductType: ProductType,
    convertPrice: (params: PriceConversionParams) => number
}

export function getFormInitialValues({ product, selectedProductType, convertPrice }: Params): Product {
    if (!product) {
        const digitalProductSKU: SKU = {
            externalID: "",
            price: 0,
            dimensions: { height: 0, length: 0, width: 0 },
            quantity: 0,
            recorded_quantity: 0,
            recordData: { status: "NOT_RECORDED" },
            deploy_hash: '',
            royalty: null,
        }

        const productTypeFields = {
            ...(selectedProductType === "DIGITAL" && { sku: [digitalProductSKU] }),
            ...(selectedProductType === "PRINT_ON_DEMAND" && {
                prodviderID: "PRINTFUL",
                shippingType: "PRINTFUL",
                custome_external_id: Date.now() + nanoid(13)
            })
        }

        return {
            ...initialValues,
            product_type: selectedProductType,
            ...productTypeFields
        }
    }

    const convertedSKUs = product.skuIDs.map((sku: SKU) => ({
        ...sku,
        price: convertPrice({ amount: sku.price, toUSD: false })
    }))

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
        media: product.media,
        tags: product.tags || [],
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
        sku: convertedSKUs,

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
        digitalDetail: product.digitalDetail || { chain: "" },
        nftData: product.nftData
    }
}

export function getFieldErrorMessage(error: any): string {
    if (!error) return '' // No error
    if (typeof error === 'string') return error // Error is a single string
    if (Array.isArray(error) && error.length > 0) {
        return getFieldErrorMessage(error[0]) // Recursively check the first element
    }
    if (typeof error === 'object' && error !== null) {
        const firstKey = Object.keys(error)[0] // Get the first key
        if (firstKey) return getFieldErrorMessage(error[firstKey]) // Recursively check the first property
    }
    return '' // Fallback in case of unexpected input
}