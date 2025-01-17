import { useFormikContext } from 'formik'
import { Product } from '../utils/types'

const useProductForm = () => {
    const formik = useFormikContext<Product>()

    if (!formik) {
        throw new Error('useProductForm must be used within a Formik context')
    }

    return formik
}

export default useProductForm