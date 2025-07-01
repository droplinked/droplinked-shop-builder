import { useFormikContext } from 'formik'
import { Blog } from 'services/blog/interfaces'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

const useBlogForm = () => {
    const formik = useFormikContext<Blog>()
    const { t } = useLocaleResources('common')

    if (!formik) {
        throw new Error(t('blogs.hooks.errors.formikContextError'))
    }

    return formik
}

export default useBlogForm