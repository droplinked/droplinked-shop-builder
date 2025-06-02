import { VStack } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import { Form, Formik } from 'formik'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'
import { OnboardingStepProps } from 'pages/onboarding/types/onboarding'
import React from 'react'
import OnboardingStepHeader from '../common/OnboardingStepHeader'
import PasswordInput from '../common/PasswordInput'
import PasswordValidationRules from '../common/PasswordValidationRules'


function SetNewPasswordForm({ onNext, onBack }: OnboardingStepProps) {
    const { updateOnboardingState, credentials } = useOnboardingStore()

    const handleSubmit = async (values: { password: string, confirmPassword: string }) => {
        // TODO: Implement set new password logic
        console.log("Setting new password:", values.password)
        updateOnboardingState("credentials", { 
            email: credentials.email, 
            password: values.password 
        })
        onNext()
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