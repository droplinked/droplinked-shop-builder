import { array, object, string } from 'yup'

export interface ProductMedia {
    _id?: string
    url: string
    thumbnail: string
    isMain: boolean | string
    fileName?: string
    fileSize?: string
}

export interface ProductFormValues {
    action: string,
    product_type: string,
    title: string,
    description: string,
    media: ProductMedia[]
}

export const validationSchema = object({
    action: string().required('Action is required'),
    title: string().required('Title is required'),
    description: string().required('Description is required'),
    media: array()
        .min(1, 'An image is required to ensure your product is displayed correctly')
        .required('An image is required to ensure your product is displayed correctly')
})

export const initialValues: ProductFormValues = {
    action: "",
    product_type: "",
    title: "",
    description: "",
    media: [],
}