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
        .optional()
        .nullable()
        .url('Must be a valid URL'),
    coverImage: Yup.string()
        .optional()
        .nullable()
        .url('Must be a valid URL'),
    description: Yup.string()
        .optional()
        .nullable()
})

export const getInitialValues = (storeData: SetupFormValues) => {
    const { coverImage, description, logoUrl, name, url } = storeData;

    return (
        {
            logoUrl: logoUrl || '',
            coverImage: coverImage || '',
            url: url || '',
            name: name || '',
            description: description || ''
        }
    )
}