import { VStack } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import Checkbox from 'components/redesign/checkbox/Checkbox'
import AppInput from 'components/redesign/input/AppInput'
import InteractiveText from 'components/redesign/interactive-text/InteractiveText'
import { Form, Formik } from 'formik'
import useAppToast from 'hooks/toast/useToast'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'
import { arePasswordRulesMet } from 'pages/onboarding/utils/passwordRules'
import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { signupService } from 'services/auth/services'
import { InputChangeEvent } from 'types/eventTypes'
import * as Yup from 'yup'
import AuthRedirectLink from '../common/AuthRedirectLink'
import DividerText from '../common/DividerText'
import GoogleAuthButton from '../common/GoogleAuthButton'
import OnboardingStepHeader from '../common/OnboardingStepHeader'
import PasswordInput from '../common/PasswordInput'
import PasswordValidationRules from '../common/PasswordValidationRules'

const formSchema = (t) => Yup.object().shape({
    email: Yup.string().email(t('common.emailError')).required(t('SignUpForm.emailRequired', 'Email address is required.')),
    password: Yup.string().required(t('SignUpForm.passwordRequired', 'Password is required.')),
    referralCode: Yup.string()
})

function SignUpForm() {
    const [searchParams] = useSearchParams()
    const [acceptTerms, setAcceptTerms] = useState(false)
    const { updateOnboardingState } = useOnboardingStore()
    const { showToast } = useAppToast()
    const { t } = useLocaleResources('onboarding')

    const referralCode = searchParams.get("referral")
    const d3Id = searchParams.get("d3-id")
    const udId = searchParams.get("ud-id")
    const source = searchParams.get("source")

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
            const errorMessage = error?.response?.data?.data?.message || t('SignUpForm.errorMessage')
            showToast({ message: errorMessage, type: "error" })
        }
    }

    return (
        <>
            <OnboardingStepHeader
                heading={t('common.welcomeTitle')}
                description={t('SignUpForm.subtitle')}
            />

            <Formik
                initialValues={{ email: "", password: "", referralCode: referralCode ?? "" }}
                validateOnChange={false}
                validationSchema={formSchema(t)}
                onSubmit={handleSignUp}
            >
                {({ values, errors, handleChange, submitForm, isSubmitting }) => {
                    const isPasswordValid = arePasswordRulesMet(values.password)

                    return (
                        <Form style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                            <AppInput
                                label={t('common.emailLabel')}
                                inputProps={{
                                    name: "email",
                                    value: values.email,
                                    onChange: handleChange,
                                    placeholder: t('common.emailPlaceholder'),
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
                                label={t('SignUpForm.referralLabel')}
                                inputProps={{
                                    name: "referralCode",
                                    value: values.referralCode,
                                    onChange: handleChange,
                                    placeholder: t('SignUpForm.referralPlaceholder')
                                }}
                            />

                            <Checkbox
                                marginBlock={3}
                                onChange={(e: InputChangeEvent) => setAcceptTerms(e.target.checked)}
                            >
                                {t('SignUpForm.termsPrefix')}{" "}
                                <InteractiveText to="/terms" display="contents">{t('SignUpForm.termsLink')}</InteractiveText>
                            </Checkbox>

                            <AppButton
                                isLoading={isSubmitting}
                                isDisabled={!acceptTerms || isSubmitting || !isPasswordValid}
                                onClick={submitForm}
                            >
                                {t('common:signUp')}
                            </AppButton>

                            <DividerText text={t('common.orContinueWith')} />

                            <GoogleAuthButton
                                isSignUp={true}
                                isDisabled={!acceptTerms || isSubmitting}
                                referralCode={values.referralCode}
                                d3Id={d3Id}
                                udId={udId}
                                source={source}
                            />

                            <AuthRedirectLink
                                justifyContent="center"
                                text={t('SignUpForm.haveAccountText')}
                                linkText={t('SignUpForm.signInLink')}
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