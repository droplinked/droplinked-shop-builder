import { array, boolean, number, object, string } from 'yup'
import { Product } from './types'

export const validationSchema = object().shape({
    product_type: string().required('Product type is required'),
    title: string().required('Title is required'),
    description: string().required('Description is required'),
    media: array()
        .min(1, 'Please upload an image to proceed')
        .required('At least one media item is required'),
    productCollectionID: string().required('Product collection is required'),
    canBeAffiliated: boolean(),
    commission: number()
        .when('canBeAffiliated', {
            is: true,
            then: (schema) => schema
                .min(1, 'Commission must be at least 1%')
                .max(100, 'Commission must not exceed 100%')
                .typeError('Please enter a valid number')
                .required('Please enter a valid commission percentage between 1 and 100'),
            otherwise: (schema) => schema.nullable(),
        }),
    sku: array().of(object().shape({
        price: number()
            .required('Price is required for all SKUs')
            .positive('Price must be greater than 0'),
        quantity: number()
            .when('product_type', {
                is: 'PRINT_ON_DEMAND',
                then: (schema) => schema.nullable(),
                otherwise: (schema) => schema
                    .required('Quantity is required for all SKUs')
                    .min(1, 'Quantity must be at least 1'),
            }),
        dimensions: object().shape({
            height: number().required('Height is required').positive('Height must be greater than 0'),
            width: number().required('Width is required').positive('Width must be greater than 0'),
            length: number().required('Length is required').positive('Length must be greater than 0'),
        }).when('product_type', {
            is: 'NORMAL',
            then: (schema) => schema.required('Please enter packaging size property for all SKUs'),
            otherwise: (schema) => schema.strip()
        }),
        weight: number()
            .nullable().when('product_type', {
                is: 'NORMAL',
                then: (schema) => schema.required('Weight is required').positive('Weight must be greater than 0'),
                otherwise: (schema) => schema.nullable()
            }),
    })
    ).min(1, 'At least one SKU is required').required('SKU information is required'),
    m2m_positions: array()
        .test(
            'm2m-positions-require-services',
            'Please choose customer wallet options',
            function (positions) {
                const { m2m_services } = this.parent
                return !positions.length || (m2m_services && m2m_services.length > 0)
            }
        ),
    artwork: string().nullable(), // Artwork is optional and does not depend on position
    artwork_position: string()
        .nullable() // Artwork position is optional unless artwork is provided
        .when('artwork', {
            is: (artwork) => !!artwork, // When artwork is provided (truthy)
            then: (schema) => schema.required('Artwork position is required when artwork is provided'),
            otherwise: (schema) => schema.nullable(), // Keep optional if no artwork
        }),
    artwork2: string().nullable(), // Artwork2 is optional and does not depend on position
    artwork2_position: string()
        .nullable() // Artwork2 position is optional unless artwork2 is provided
        .when('artwork2', {
            is: (artwork2) => !!artwork2, // When artwork2 is provided (truthy)
            then: (schema) => schema.required('Artwork2 position is required when artwork2 is provided'),
            otherwise: (schema) => schema.nullable(), // Keep optional if no artwork2
        }),
    launchDate: string()
        .nullable()
        .test(
            'is-future-date',
            'Please choose a further date for launch time',
            (value) => {
                if (!value) return true // Skip validation if no date is provided
                const now = new Date()
                const selectedDate = new Date(value)
                return selectedDate > now // Validate if the date is in the future
            }
        )
})

export const initialValues: Product = {
    product_type: "NORMAL",
    title: "",
    description: "",
    media: [],
    productCollectionID: "",
    priceUnit: "USD",
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