import { object, string } from 'yup'

export interface ProductFormValues {
    action: string,
    product_type: string,
    title: string,
    description: string,
}

export const validationSchema = object({
    action: string().required('Action is required'),
    title: string().required('Title is required'),
    description: string().required('Description is required')
})

export const initialValues: ProductFormValues = {
    action: "",
    product_type: "",
    title: "",
    description: ""
}