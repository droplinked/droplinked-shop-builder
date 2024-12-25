import { useFormikContext } from 'formik'
import { ProductFormValues } from '../utils/types'

const useProductForm = () => {
    const formik = useFormikContext<ProductFormValues>()

    if (!formik) {
        throw new Error('useProductForm must be used within a Formik context')
    }

    return formik
}

export default useProductForm