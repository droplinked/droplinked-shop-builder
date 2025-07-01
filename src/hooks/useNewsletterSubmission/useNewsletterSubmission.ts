import { FormikHelpers } from 'formik'
import useAppToast from 'hooks/toast/useToast'
import { subscribeFeature } from 'services/user/services'
import { useLocation } from 'react-router-dom'
import useLocaleResources from '../useLocaleResources/useLocaleResources'

interface NewsletterFormValues {
    email: string
}

const useNewsletterSubmission = () => {
    const { showToast } = useAppToast()
    const { pathname } = useLocation()
    const { t } = useLocaleResources('common')

    const feature = pathname !== "/" ? pathname.replace('/', '') : "home"

    const handleSubmit = async (values: NewsletterFormValues, { resetForm }: FormikHelpers<NewsletterFormValues>) => {
        try {
            await subscribeFeature({ feature, email: values.email })
            showToast({ type: "success", message: t('hooks.success.newsletterSubscribed') })
            resetForm()
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : t('hooks.errors.newsletterError')
            showToast({ type: "error", message: errorMessage })
        }
    }

    return { handleSubmit }
}

export default useNewsletterSubmission 