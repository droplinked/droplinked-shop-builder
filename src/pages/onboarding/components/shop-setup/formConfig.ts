import { FormikValues } from "formik"
import * as Yup from "yup"

export interface SetupFormValues {
    logoUrl: string
    coverImage: string
    url: string
    name: string
    description: string
}


export const validationSchema = Yup.object({
    name: Yup.string()
        .required('Store name is required')
        .min(3, 'Store name must be at least 3 characters'),
    url: Yup.string()
        .required('Store URL is required')
        .matches(/^[a-zA-Z0-9-_]+$/, 'Only letters, numbers, dash and underscore allowed'),
    logoUrl: Yup.string()
        .required('Logo URL is required')
        .url('Must be a valid URL'),
    coverImage: Yup.string()
        .required('Cover image URL is required')
        .url('Must be a valid URL'),
    description: Yup.string()
        .required('Description is required')
        .min(10, 'Description must be at least 10 characters')
})

export const initialValues: FormikValues = {
    logoUrl: '',
    coverImage: '',
    url: '',
    name: '',
    description: ''
}