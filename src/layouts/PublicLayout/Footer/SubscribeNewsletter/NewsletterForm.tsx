import { useBreakpointValue } from '@chakra-ui/react'
import AppInput from 'components/redesign/input/AppInput'
import { Form, Formik } from 'formik'
import useNewsletterSubmission from 'hooks/useNewsletterSubmission/useNewsletterSubmission'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import * as Yup from 'yup'
import SubscribeButton from './SubscribeButton'

function NewsletterForm() {
    const isMobileBreakpoint = useBreakpointValue({ base: true, md: false })
    const { handleSubmit } = useNewsletterSubmission()
    const { t } = useLocaleResources('layout/PublicLayout')

    const newsletterFormSchema = Yup.object().shape({
        email: Yup.string().email(t('Footer.SubscribeNewsletter.NewsletterForm.invalidEmail')).required(t('Footer.SubscribeNewsletter.NewsletterForm.emailRequired'))
    })

    return (
        <Formik
            initialValues={{ email: '' }}
            validationSchema={newsletterFormSchema}
            validateOnChange={false}
            onSubmit={handleSubmit}
        >
            {({ errors, values, handleChange, isSubmitting }) => {
                const rightElement = isMobileBreakpoint
                    ? undefined
                    : <SubscribeButton isSubmitting={isSubmitting} />

                return (
                    <Form>
                        <AppInput
                            inputContainerProps={{
                                padding: { base: "12px 16px", md: "8px 8px 8px 16px" }
                            }}
                            inputProps={{
                                name: 'email',
                                placeholder: t('Footer.SubscribeNewsletter.NewsletterForm.enterYourEmail'),
                                value: values.email,
                                onChange: handleChange
                            }}
                            rightElement={rightElement}
                            {...errors.email && { state: "error", message: errors.email }}
                            showErrorIcon={false}
                        />
                        {isMobileBreakpoint && <SubscribeButton isSubmitting={isSubmitting} isFullWidth />}
                    </Form>
                )
            }}
        </Formik>
    )
}

export default NewsletterForm 