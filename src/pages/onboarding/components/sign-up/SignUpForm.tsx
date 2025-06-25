import { Text, VStack } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import Checkbox from 'components/redesign/checkbox/Checkbox'
import AppInput from 'components/redesign/input/AppInput'
import InteractiveText from 'components/redesign/interactive-text/InteractiveText'
import { Form, Formik } from 'formik'
import useAppToast from 'hooks/toast/useToast'
import { signupService } from 'lib/apis/auth/services'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'
import { arePasswordRulesMet } from 'pages/onboarding/utils/passwordRules'
import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { InputChangeEvent } from 'types/eventTypes'
import * as Yup from 'yup'
import AuthRedirectLink from '../common/AuthRedirectLink'
import DividerText from '../common/DividerText'
import GoogleAuthButton from '../common/GoogleAuthButton'
import OnboardingStepHeader from '../common/OnboardingStepHeader'
import PasswordInput from '../common/PasswordInput'
import PasswordValidationRules from '../common/PasswordValidationRules'

const formSchema = Yup.object().shape({
    email: Yup.string().email("Please enter a valid email address.").required("Email address is required."),
    password: Yup.string().required("Password is required."),
    referralCode: Yup.string()
})

function SignUpForm() {
    const [searchParams] = useSearchParams()
    const [acceptTerms, setAcceptTerms] = useState(false)
    const { updateOnboardingState } = useOnboardingStore()
    const { showToast } = useAppToast()

    const referralCode = searchParams.get("referral")
    const d3Id = searchParams.get("d3-id")
    const udId = searchParams.get("ud-id")

    async function handleSignUp(values: any) {
        try {
            const { email, password, referralCode } = values
            await signupService({
                email,
                password,
                referralCode: referralCode || undefined,
                d3UserId: d3Id || undefined,
                udUserId: udId || undefined,
                hasProducerAccount: true
            })
            updateOnboardingState("credentials", { email, password })
            updateOnboardingState('currentStep', 'SIGNUP_EMAIL_VERIFICATION')
        }
        catch (error: any) {
            const errorMessage = error?.response?.data?.data?.message || "Signup failed"
            showToast({ message: errorMessage, type: "error" })
        }
    }

    return (
        <>
            <OnboardingStepHeader
                heading='Welcome to droplinked'
                description='Complete the details below or use your Google account.'
            />

            <Formik
                initialValues={{ email: "", password: "", referralCode: referralCode ?? "" }}
                validateOnChange={false}
                validationSchema={formSchema}
                onSubmit={handleSignUp}
            >
                {({ values, errors, handleChange, submitForm, isSubmitting }) => {
                    const isPasswordValid = arePasswordRulesMet(values.password)

                    return (
                        <Form style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                            <AppInput
                                label="Email Address"
                                inputProps={{
                                    name: "email",
                                    value: values.email,
                                    onChange: handleChange,
                                    placeholder: "Enter email address",
                                    isRequired: true
                                }}
                                message={errors.email?.toString()}
                            />

                            <VStack align='stretch' spacing={4}>
                                <PasswordInput
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    message={errors.password?.toString()}
                                    isRequired
                                />
                                <PasswordValidationRules password={values.password} />
                            </VStack>

                            <AppInput
                                label="Referral Code"
                                inputProps={{
                                    name: "referralCode",
                                    value: values.referralCode,
                                    onChange: handleChange,
                                    placeholder: "Enter referral code"
                                }}
                            />

                            <Checkbox
                                display='flex'
                                marginBlock={3}
                                alignItems={{ base: "start", md: "center" }}
                                onChange={(e: InputChangeEvent) => setAcceptTerms(e.target.checked)}
                            >
                                <Text display='flex' gap='1' fontSize={14} color="text.white">
                                    By signing up, I agree to your {" "}
                                    <InteractiveText to="/terms" display="contents">Terms and Conditions.</InteractiveText>
                                </Text>
                            </Checkbox>

                            <AppButton
                                isLoading={isSubmitting}
                                isDisabled={!acceptTerms || isSubmitting || !isPasswordValid}
                                onClick={submitForm}
                            >
                                Sign Up
                            </AppButton>

                            <DividerText text="or sign up with" />

                            <GoogleAuthButton
                                isSignUp={true}
                                isDisabled={!acceptTerms || isSubmitting}
                                referralCode={values.referralCode}
                                d3Id={d3Id}
                                udId={udId}
                            />

                            <AuthRedirectLink
                                justifyContent="center"
                                text='Already have an account?'
                                linkText='Sign in'
                                action={() => updateOnboardingState('currentStep', 'SIGN_IN')}
                            />
                        </Form>
                    )
                }}
            </Formik>
        </>
    )
}

export default SignUpForm