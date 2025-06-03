import { VStack } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import { Form, Formik } from 'formik'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'
import { OnboardingStepProps } from 'pages/onboarding/types/onboarding'
import React from 'react'
import OnboardingStepHeader from '../common/OnboardingStepHeader'
import PasswordInput from '../common/PasswordInput'
import PasswordValidationRules from '../common/PasswordValidationRules'
import { resetPassword } from 'lib/apis/user/services'
import useAppToast from 'hooks/toast/useToast'

function SetNewPasswordForm({ onNext, onBack }: OnboardingStepProps) {
    const { updateOnboardingState, credentials, resetToken } = useOnboardingStore()
    const { showToast } = useAppToast()

    const handleSubmit = async (values: { password: string, confirmPassword: string }) => {
         if (resetToken === null) {
            showToast({ type: "error", message: "Reset token not found. Please try again." });
           return;
        }

        try {
            await resetPassword({
                token: resetToken || '',
                newPassword: values.password
            });
            
            updateOnboardingState("credentials", { 
                email: credentials.email, 
                password: values.password 
            });
            // Clear the reset token after successful password reset
            updateOnboardingState("resetToken", null);
            showToast({ type: "success", message: "Password reset successfully" });
            onNext();
        } catch (error) {
            showToast({ type: "error", message: error?.response?.data?.message || "Failed to reset password" });
        }
    }

    return (
        <>
            <OnboardingStepHeader
                heading='Set a New Password'
                description='Create a strong, new password for your account.'
            />

            <Formik
                initialValues={{
                    password: "",
                    confirmPassword: ""
                }}
                validateOnChange={false}
                onSubmit={handleSubmit}
            >
                {({ values, errors, handleChange, isSubmitting }) => (
                    <Form style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                        <VStack align='stretch' spacing={4}>
                            <PasswordInput
                                name="password"
                                label="New Password"
                                value={values.password}
                                onChange={handleChange}
                                message={errors.password?.toString()}
                                isRequired
                            />
                            <PasswordValidationRules password={values.password} />
                            
                            <PasswordInput
                                name="confirmPassword"
                                label="Confirm New Password"
                                value={values.confirmPassword}
                                onChange={handleChange}
                                message={errors.confirmPassword?.toString()}
                                isRequired
                                placeholder="Confirm New Password"
                            />
                        </VStack>

                        <AppButton size='lg' type="submit" isLoading={isSubmitting}>
                             Reset password
                        </AppButton>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default SetNewPasswordForm 