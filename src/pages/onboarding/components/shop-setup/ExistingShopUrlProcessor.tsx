import AppButton from 'components/redesign/button/AppButton'
import AppInput from 'components/redesign/input/AppInput'
import { Form, Formik } from 'formik'
import { useShopUrlProcessor } from 'pages/onboarding/hooks/useShopUrlProcessor'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'
import React from 'react'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
    url: Yup.string().url('Please enter a valid URL').required('URL is required')
})

function ExistingShopUrlProcessor() {
    const { shopSetupUI } = useOnboardingStore()
    const { processShopUrl, isLoading } = useShopUrlProcessor()

    if (!shopSetupUI.hasExistingShop) return null

    const handleSubmit = async (values) => await processShopUrl(values.url)

    return (
        <Formik
            initialValues={{ url: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ values, errors, handleChange, isSubmitting }) => (
                <Form
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 24,
                        border: '1px solid',
                        borderColor: 'neutral.gray.800',
                        borderRadius: 16,
                        padding: 16,
                    }}
                >
                    <AppInput
                        label="Import"
                        description="Add a website link and we'll import the content into the account."
                        inputProps={{
                            placeholder: 'Paste URL here',
                            value: values.url,
                            onChange: handleChange,
                            name: 'url',
                            fontSize: { base: 14, xl: 16 }
                        }}
                        state={errors.url ? 'error' : undefined}
                        message={errors.url as string ?? undefined}
                    />

                    <AppButton
                        type="submit"
                        paddingBlock="10px"
                        isDisabled={isSubmitting || isLoading}
                        isLoading={isSubmitting || isLoading}
                    >
                        Start Import
                    </AppButton>
                </Form>
            )}
        </Formik>
    )
}

export default ExistingShopUrlProcessor