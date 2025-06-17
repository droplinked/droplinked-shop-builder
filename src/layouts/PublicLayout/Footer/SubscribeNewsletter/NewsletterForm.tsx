import AppButton from 'components/redesign/button/AppButton'
import AppInput from 'components/redesign/input/AppInput'
import { Form, Formik, FormikHelpers } from 'formik'
import useAppToast from 'hooks/toast/useToast'
import { subscribeFeature } from 'lib/apis/user/services'
import React from 'react'
import { useLocation } from 'react-router-dom'
import * as Yup from 'yup'

interface NewsletterFormValues {
    email: string;
}

const newsletterFormSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required")
})

function NewsletterForm() {
    const { showToast } = useAppToast()
    const { pathname } = useLocation()
    const feature = pathname !== "/" ? pathname : "/home"

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

    return (
        <Formik<NewsletterFormValues>
            initialValues={{ email: '' }}
            validationSchema={newsletterFormSchema}
            validateOnChange={false}
            onSubmit={handleSubmit}
        >
            {({ errors, values, handleChange, isSubmitting }) => (
                <Form>
                    <AppInput
                        inputContainerProps={{ padding: 2, paddingLeft: 4 }}
                        inputProps={{
                            name: 'email',
                            placeholder: 'Enter your email',
                            value: values.email,
                            onChange: handleChange
                        }}
                        rightElement={
                            <AppButton
                                type="submit"
                                isLoading={isSubmitting}
                                isDisabled={isSubmitting}
                            >
                                Subscribe
                            </AppButton>
                        }
                        {...errors.email && { state: "error", message: errors.email }}
                        showErrorIcon={false}
                    />
                </Form>
            )}
        </Formik>
    )
}

export default NewsletterForm 