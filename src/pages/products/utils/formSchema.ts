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
    product_type: "",
    title: "",
    description: "",
    media: [],
    productCollectionID: "",
    canBeAffiliated: false,
    commission: 1,
    keywords: [],
    sku: [],
    digitalDetail: {
        chain: ""
    }
}