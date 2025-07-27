import { VStack } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import { Form, Formik } from 'formik'
import useAppToast from 'hooks/toast/useToast'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'
import { arePasswordRulesMet } from 'pages/onboarding/utils/passwordRules'
import React from 'react'
import { resetPasswordService } from 'services/auth/services'
import * as Yup from 'yup'
import OnboardingStepHeader from '../common/OnboardingStepHeader'
import PasswordInput from '../common/PasswordInput'
import PasswordValidationRules from '../common/PasswordValidationRules'

function SetNewPasswordForm() {
    const { updateOnboardingState, credentials, resetToken } = useOnboardingStore()
    const { showToast } = useAppToast()
    const { t } = useLocaleResources('onboarding')

    const formSchema = Yup.object().shape({
        password: Yup.string()
            .required(t('ResetPasswordForm.validation.passwordRequired'))
            .min(8, t('ResetPasswordForm.validation.passwordMinLength')),
        confirmPassword: Yup.string()
            .required(t('ResetPasswordForm.validation.confirmPasswordRequired'))
            .oneOf([Yup.ref("password"), null], t('ResetPasswordForm.validation.passwordsMustMatch'))
    })

    const handleSubmit = async (values: { password: string, confirmPassword: string }) => {
        try {
            await resetPasswordService({ token: resetToken, newPassword: values.password })

            updateOnboardingState("credentials", {
                email: credentials.email,
                password: values.password
            })
            // Clear the reset token after successful password reset
            updateOnboardingState("resetToken", null)
            showToast({ type: "success", message: t('ResetPasswordForm.success.passwordReset') })
            updateOnboardingState('currentStep', 'PASSWORD_UPDATED')
        } catch (error) {
            showToast({ type: "error", message: error?.response?.data?.data?.message || t('ResetPasswordForm.errors.passwordResetFailed') })
        }
    }

    return (
        <>
            <OnboardingStepHeader
                heading={t('SetNewPasswordForm.title')}
                description={t('SetNewPasswordForm.description')}
            />

            <Formik
                initialValues={{ password: "", confirmPassword: "" }}
                validateOnChange={false}
                validationSchema={formSchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, handleChange, isSubmitting }) => {
                    const isPasswordValid = arePasswordRulesMet(values.password)

                    return (
                        <Form style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                            <VStack align='stretch' spacing={4}>
                                <PasswordInput
                                    name="password"
                                    label={t('SetNewPasswordForm.newPasswordLabel')}
                                    value={values.password}
                                    onChange={handleChange}
                                    message={errors.password?.toString()}
                                />

                                <PasswordValidationRules password={values.password} />
                            </VStack>

                            <PasswordInput
                                name="confirmPassword"
                                label={t('SetNewPasswordForm.confirmPasswordLabel')}
                                value={values.confirmPassword}
                                onChange={handleChange}
                                message={errors.confirmPassword?.toString()}
                                placeholder={t('SetNewPasswordForm.confirmPasswordPlaceholder')}
                            />

                            <AppButton type="submit" isLoading={isSubmitting} isDisabled={isSubmitting || !isPasswordValid} mt="3">
                                {t('SetNewPasswordForm.resetButton')}
                            </AppButton>
                        </Form>
                    )
                }}
            </Formik>
        </>
    )
}

export default SetNewPasswordForm 