import { useDisclosure } from '@chakra-ui/react'
import ProTrialModal from 'components/modals/pro-plan-upgrade-modal/ProPlanUpgradeModal'
import AppButton from 'components/redesign/button/AppButton'
import AppInput from 'components/redesign/input/AppInput'
import { Form, Formik } from 'formik'
import { useShopUrlProcessor } from 'pages/onboarding/hooks/useShopUrlProcessor'
import React from 'react'
import * as Yup from 'yup'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

function ExistingShopUrlProcessor() {
    const { hasPaidSubscription, processShopUrl, isLoading } = useShopUrlProcessor()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { t } = useLocaleResources('onboarding')

    const validationSchema = Yup.object().shape({
        url: Yup.string().url(t('ExistingShopUrlProcessor.validation.invalid')).required(t('ExistingShopUrlProcessor.validation.required'))
    })

    const handleSubmit = async (values) => {
        if (hasPaidSubscription()) await processShopUrl(values.url)
        else onOpen()
    }

    return (
        <>
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
                            label={t('ExistingShopUrlProcessor.label')}
                            description={t('ExistingShopUrlProcessor.description')}
                            inputProps={{
                                placeholder: t('ExistingShopUrlProcessor.placeholder'),
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
                            {t('ExistingShopUrlProcessor.button')}
                        </AppButton>
                    </Form>
                )}
            </Formik>

            <ProTrialModal isOpen={isOpen} onClose={onClose} />
        </>
    )
}

export default ExistingShopUrlProcessor