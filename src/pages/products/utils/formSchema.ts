import { object, string } from 'yup'

export interface ProductFormValues {
    action: string,
    title: string
}

export const validationSchema = object({
    action: string().required('Action is required'),
    title: string().required('Title is required'),
})

export const initialValues: ProductFormValues = {
    action: "",
    title: ""
}