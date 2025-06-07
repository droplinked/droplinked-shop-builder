import { VStack } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import { Form, Formik } from 'formik'
import useAppToast from 'hooks/toast/useToast'
import { resetPasswordService } from 'lib/apis/auth/services'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'
import { OnboardingStepProps } from 'pages/onboarding/types/onboarding'
import { arePasswordRulesMet } from 'pages/onboarding/utils/passwordRules'
import React from 'react'
import * as Yup from 'yup'
import OnboardingStepHeader from '../common/OnboardingStepHeader'
import PasswordInput from '../common/PasswordInput'
import PasswordValidationRules from '../common/PasswordValidationRules'

const formSchema = Yup.object().shape({
    password: Yup.string()
        .required("Password is required.")
        .min(8, "Password must be at least 8 characters long."),
    confirmPassword: Yup.string()
        .required("Confirm password is required.")
        .oneOf([Yup.ref("password"), null], "Passwords must match.")
})

function SetNewPasswordForm({ onNext, onBack }: OnboardingStepProps) {
    const { updateOnboardingState, credentials, resetToken } = useOnboardingStore()
    const { showToast } = useAppToast()

    const handleSubmit = async (values: { password: string, confirmPassword: string }) => {
        try {
            await resetPasswordService({ token: resetToken, newPassword: values.password })

            updateOnboardingState("credentials", {
                email: credentials.email,
                password: values.password
            })
            // Clear the reset token after successful password reset
            updateOnboardingState("resetToken", null)
            showToast({ type: "success", message: "Password reset successfully" })
            onNext()
        } catch (error) {
            showToast({ type: "error", message: error?.response?.data?.data?.message || "Failed to reset password" })
        }
    }

    return (
        <>
            <OnboardingStepHeader
                heading='Set a New Password'
                description='Create a strong, new password for your account.'
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
                                    label="New Password"
                                    value={values.password}
                                    onChange={handleChange}
                                    message={errors.password?.toString()}
                                />

                                <PasswordValidationRules password={values.password} />
                            </VStack>

                            <PasswordInput
                                name="confirmPassword"
                                label="Confirm New Password"
                                value={values.confirmPassword}
                                onChange={handleChange}
                                message={errors.confirmPassword?.toString()}
                                placeholder="Confirm New Password"
                            />

                            <AppButton type="submit" isLoading={isSubmitting} isDisabled={isSubmitting || !isPasswordValid} mt="3">
                                Reset password
                            </AppButton>
                        </Form>
                    )
                }}
            </Formik>
        </>
    )
}

export default SetNewPasswordForm 