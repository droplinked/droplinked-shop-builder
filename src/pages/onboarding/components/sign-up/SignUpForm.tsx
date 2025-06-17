import { Flex, Text, VStack } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import Checkbox from 'components/redesign/checkbox/Checkbox'
import AppInput from 'components/redesign/input/AppInput'
import InteractiveText from 'components/redesign/interactive-text/InteractiveText'
import { Form, Formik } from 'formik'
import useAppToast from 'hooks/toast/useToast'
import { signupService } from 'services/auth/services'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'
import { arePasswordRulesMet } from 'pages/onboarding/utils/passwordRules'
import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { InputChangeEvent } from 'types/eventTypes'
import * as Yup from 'yup'
import DividerText from '../common/DividerText'
import GoogleAuthButton from '../common/GoogleAuthButton'
import OnboardingStepHeader from '../common/OnboardingStepHeader'
import PasswordInput from '../common/PasswordInput'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import arLocale from 'locales/onboarding/ar.json'
import enLocale from 'locales/onboarding/en.json'
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
    const { t } = useLocaleResources('onboarding', {
        en: enLocale,
        ar: arLocale
    })

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
            const errorMessage = error?.response?.data?.data?.message || t('signUp.errorMessage')
            showToast({ message: errorMessage, type: "error" })
        }
    }

    return (
        <>
            <OnboardingStepHeader
                heading={t('common.welcomeTitle')}
                description={t('signUp.subtitle')}
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
                                label={t('signUp.referralLabel')}
                                inputProps={{
                                    name: "referralCode",
                                    value: values.referralCode,
                                    onChange: handleChange,
                                    placeholder: t('signUp.referralPlaceholder')
                                }}
                            />

                            <Checkbox
                                display='flex'
                                marginBlock={3}
                                alignItems={{ base: "start", md: "center" }}
                                onChange={(e: InputChangeEvent) => setAcceptTerms(e.target.checked)}
                            >
                                <Text display='flex' gap='1' fontSize={14} color="text.white">
                                   {t('signUp.termsPrefix')}
                                    <InteractiveText to="/terms">{t('signUp.termsLink')}</InteractiveText>
                                </Text>
                            </Checkbox>

                            <AppButton
                                isLoading={isSubmitting}
                                isDisabled={!acceptTerms || isSubmitting || !isPasswordValid}
                                onClick={submitForm}
                            >
                                {t('signUp.submitButton')}
                            </AppButton>

                            <DividerText text={t('common.orContinueWith')} />

                            <GoogleAuthButton
                                isSignUp={true}
                                isDisabled={!acceptTerms || isSubmitting}
                                referralCode={values.referralCode}
                                d3Id={d3Id}
                                udId={udId}
                            />

                            <Flex
                                flexDirection={{ base: "column", md: "row" }}
                                justifyContent="center"
                                alignItems="center"
                                gap={{ base: 1, md: 2 }}
                                marginTop={3}
                            >
                                <Text fontSize={14} color="text.white">
                                    {t('signUp.haveAccountText')}
                                </Text>
                                <InteractiveText onClick={() => updateOnboardingState('currentStep', 'SIGN_IN')}>
                                    {t('signUp.signInLink')}
                                </InteractiveText>
                            </Flex>
                        </Form>
                    )
                }}
            </Formik>
        </>
    )
}

export default SignUpForm