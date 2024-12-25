import { array, boolean, number, object, string } from 'yup'
import { ProductFormValues } from './types'

export const validationSchema = object({
    action: string().required('Action is required'),
    title: string().required('Title is required'),
    description: string().required('Description is required'),
    media: array()
        .min(1, 'At least one image is required to display your product correctly.')
        .required('Please upload an image to proceed.'),
    productCollectionID: string().required('Please select a product collection.'),
    canBeAffiliated: boolean(),
    commission: number(),
    keywords: array(),
    sku: array()
        .min(1, 'Please select at least one SKU to proceed with product creation.')
        .required('SKU selection is required to create a product.')
})

export const initialValues: ProductFormValues = {
    action: "",
    product_type: "NORMAL",
    title: "",
    description: "",
    media: [],
    productCollectionID: "",
    canBeAffiliated: false,
    commission: 1,
    properties: [],
    sku: [],
    shippingType: "EASY_POST",
    digitalDetail: { chain: "" },
    keywords: [],
    purchaseAvailable: true,
    pod_blank_product_id: null,
    printful_template_id: null,
    technique: null,
    publish_product: true,
    prodviderID: null,
    artwork: null,
    artwork2: null,
    m2m_positions: [],
    artwork_position: null,
    artwork2_position: null,
    thumb: "",
    m2m_services: [],
    positions: null,
    custome_external_id: null,
    m2m_positions_options: [],
    mainCategory: null,
    subCategories: [],
    isAddToCartDisabled: false,
    pre_purchase_data_fetch: false,
    printful_option_data: null,
    launchDate: null,
    publish_status: "PUBLISHED"
}

