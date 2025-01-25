import { array, boolean, number, object, string } from 'yup'
import { Product } from './types'

export const validationSchema = object().shape({
    product_type: string().required('Please select a product type'),
    title: string().required('Please enter a title for the product'),
    description: string().required('Please provide a description for the product'),
    media: array()
        .min(1, 'Please upload at least one image to proceed')
        .required('At least one image is required'),
    productCollectionID: string().required('Please select a product collection'),
    canBeAffiliated: boolean(),
    commission: number()
        .when('canBeAffiliated', {
            is: true,
            then: (schema) => schema
                .min(0, 'Commission must be at least 0%')
                .max(100, 'Commission cannot exceed 100%')
                .typeError('Please enter a valid number')
                .required('Please enter a commission percentage between 0 and 100'),
            otherwise: (schema) => schema.nullable(),
        }),
    sku: array().of(
        object().shape({
            price: number()
                .required('Please enter a price for the SKU')
                .positive('Price must be greater than 0')
                .typeError('Please enter a valid numeric value for the price')
                .when('$product_type', {
                    is: 'PRINT_ON_DEMAND',
                    then: (schema) =>
                        schema.test(
                            'price-greater-than-rawPrice',
                            'Price must be greater than the raw price for POD products',
                            function (value) {
                                const { rawPrice } = this.parent // Access rawPrice from the same SKU object
                                return !rawPrice || value > rawPrice // Ensure price > rawPrice
                            }
                        ),
                    otherwise: (schema) => schema, // No additional validation for non-POD products
                }),
            quantity: number()
                .when('$product_type', {
                    is: 'PRINT_ON_DEMAND',
                    then: (schema) => schema.strip(),
                    otherwise: (schema) =>
                        schema
                            .required('Please enter a quantity for the SKU')
                            .min(1, 'Quantity must be at least 1')
                            .typeError('Please enter a valid numeric value for the quantity')
                }),
            dimensions: object().shape({
                height: number().required('Please enter the height').positive('Height must be greater than 0'),
                width: number().required('Please enter the width').positive('Width must be greater than 0'),
                length: number().required('Please enter the length').positive('Length must be greater than 0'),
            }).when('$product_type', {
                is: 'NORMAL',
                then: (schema) => schema.required('Please provide packaging dimensions for the SKU'),
                otherwise: (schema) => schema.strip(),
            }),
            weight: number()
                .nullable()
                .when('$product_type', {
                    is: 'NORMAL',
                    then: (schema) => schema.required('Please enter the weight').positive('Weight must be greater than 0'),
                    otherwise: (schema) => schema.nullable(),
                }),
        })
    ).min(1, 'Please add at least one SKU').required('SKU information is required'),
    m2m_positions: array().test(
        'm2m-positions-require-services',
        'Please select customer wallet options',
        function (positions) {
            const { m2m_services } = this.parent
            return !positions.length || (m2m_services && m2m_services.length > 0)
        }
    ),
    artwork: string().nullable(),
    artwork_position: string()
        .nullable()
        .when('artwork', {
            is: (artwork) => !!artwork,
            then: (schema) => schema.required('Please specify the position for the artwork'),
            otherwise: (schema) => schema.nullable(),
        }),
    artwork2: string().nullable(),
    artwork2_position: string()
        .nullable()
        .when('artwork2', {
            is: (artwork2) => !!artwork2,
            then: (schema) => schema.required('Please specify the position for the second artwork'),
            otherwise: (schema) => schema.nullable(),
        }),
    launchDate: string()
        .nullable()
        .test(
            'is-future-date',
            'The launch date and time must be in the future',
            (value) => {
                if (!value) return true
                const now = new Date()
                const selectedDate = new Date(value)
                return selectedDate.getTime() > now.getTime()
            }
        ),
})

export const initialValues: Product = {
    // Identifiers
    _id: undefined,
    ownerID: undefined,
    prodviderID: null,
    custome_external_id: null,

    // Product Type and Classification
    product_type: "NORMAL",
    productCollectionID: "",
    mainCategory: null,
    subCategories: [],

    // Product Details
    title: "",
    description: "",
    media: [],
    tags: [],
    thumb: "",

    // Pricing and Commission
    priceUnit: "USD",
    shippingType: "EASY_POST",
    shippingPrice: 0,
    commission: 0,
    canBeAffiliated: false,

    // Availability and Status
    purchaseAvailable: true,
    isAddToCartDisabled: false,
    publish_product: true,
    publish_status: "PUBLISHED",
    pre_purchase_data_fetch: false,
    launchDate: null,

    // Properties and Variants
    properties: [],
    sku: [],

    // POD and Printing Details
    pod_blank_product_id: null,
    printful_template_id: null,
    technique: null,
    printful_option_data: null,
    artwork: null,
    artwork2: null,
    artwork_position: null,
    artwork2_position: null,
    m2m_positions: [],
    m2m_positions_options: [],
    m2m_services: [],
    positions: null,

    // Record Details
    digitalDetail: { chain: "" },
    nftData: undefined
}