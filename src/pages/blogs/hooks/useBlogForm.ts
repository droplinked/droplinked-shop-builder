import { useFormikContext } from 'formik'
import { Blog } from 'services/blog/interfaces'

const useBlogForm = () => {
    const formik = useFormikContext<Blog>()

    if (!formik) {
        throw new Error('useBlogForm must be used within a Formik context')
    }

    return formik
}

export default useBlogForm