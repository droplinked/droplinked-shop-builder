import { FormikHelpers } from 'formik'
import useAppToast from 'hooks/toast/useToast'
import { subscribeFeature } from 'services/user/services'
import { useLocation } from 'react-router-dom'

interface NewsletterFormValues {
    email: string
}

const useNewsletterSubmission = () => {
    const { showToast } = useAppToast()
    const { pathname } = useLocation()

    const feature = pathname !== "/" ? pathname.replace('/', '') : "home"

    const handleSubmit = async (values: NewsletterFormValues, { resetForm }: FormikHelpers<NewsletterFormValues>) => {
        try {
            await subscribeFeature({ feature, email: values.email })
            showToast({ type: "success", message: "Thank you for subscribing to our newsletter" })
            resetForm()
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An error occurred while subscribing to the newsletter"
            showToast({ type: "error", message: errorMessage })
        }
    }

    return { handleSubmit }
}

export default useNewsletterSubmission 