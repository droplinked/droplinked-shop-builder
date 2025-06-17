import { Flex, Text } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import Checkbox from 'components/redesign/checkbox/Checkbox'
import AppInput from 'components/redesign/input/AppInput'
import InteractiveText from 'components/redesign/interactive-text/InteractiveText'
import { Form, Formik } from 'formik'
import Cookies from 'js-cookie'
import { useLogin } from 'pages/onboarding/hooks/useLogin'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'
import React, { useState } from 'react'
import * as Yup from 'yup'
import DividerText from '../common/DividerText'
import GoogleAuthButton from '../common/GoogleAuthButton'
import OnboardingStepHeader from '../common/OnboardingStepHeader'
import PasswordInput from '../common/PasswordInput'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import arLocale from 'locales/onboarding/ar.json'
import enLocale from 'locales/onboarding/en.json'

const formSchema = Yup.object().shape({
    email: Yup.string().email("Please enter a valid email address.").required("Email address is required."),
    password: Yup.string().min(8, "Password must be at least 8 characters.").required("Password is required.")
})

const savedEmail = Cookies.get('remembered_email')
const savedPassword = Cookies.get('remembered_password')

function SignInForm() {
    const [rememberPassword, setRememberPassword] = useState<boolean>(!!savedEmail && !!savedPassword)
    const { onLoginSubmit } = useLogin()
    const { updateOnboardingState } = useOnboardingStore()
    const { t } = useLocaleResources('onboarding', {
        en: enLocale,
        ar: arLocale
    })

    const handleSubmit = async (values: { email: string, password: string }) => {
        if (rememberPassword) {
            Cookies.set('remembered_email', values.email, { expires: 30 })
            Cookies.set('remembered_password', values.password, { expires: 30 })
        } else {
            Cookies.remove('remembered_email')
            Cookies.remove('remembered_password')
        }
        updateOnboardingState("credentials", values)
        return onLoginSubmit(values)
    }

    return (
        <>
            <OnboardingStepHeader
                heading={t('common.welcomeTitle')}
                description={t('signIn.subtitle')}
            />

            <Formik
                initialValues={{
                    email: savedEmail || "",
                    password: savedPassword || ""
                }}
                validateOnChange={false}
                validationSchema={formSchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, handleChange, isSubmitting }) => (
                    <Form style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                        <AppInput
                            label={t('common.emailLabel')}
                            inputProps={{
                                name: "email",
                                value: values.email,
                                onChange: handleChange,
                                placeholder: t('common.emailPlaceholder'),
                            }}
                            message={errors.email ? t('common.emailError') : undefined}
                        />

                        <PasswordInput
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            label={t('common.passwordLabe')}
                            placeholder={t('common.passwordPlaceholder')}
                            message={errors.password ? t('common.passwordError') : undefined}
                        />

                        <Flex alignItems="center" justifyContent="space-between" marginBlock={3}>
                            <Checkbox
                                isChecked={rememberPassword}
                                onChange={(e) => setRememberPassword(e.target.checked)}
                            >
                                {t('signIn.rememberPassword')}
                            </Checkbox>
                            <InteractiveText onClick={() => updateOnboardingState("currentStep", "RESET_PASSWORD")}>
                            {t('signIn.resetPassword')} 
                            {/* TODO : add link to reset password page  Text:Reset Password */}
                            </InteractiveText>
                        </Flex>

                        <AppButton type="submit" isLoading={isSubmitting}>
                            {t('signIn.signInButton')}
                        </AppButton>

                        <DividerText text={t('common.orContinueWith')} />

                        <GoogleAuthButton isSignUp={false} isDisabled={isSubmitting} />

                        <Flex
                            flexDirection={{ base: "column", md: "row" }}
                            justifyContent="center"
                            alignItems="center"
                            gap={{ base: 1, md: 2 }}
                            marginTop={3}
                        >
                            <Text fontSize={14} color="text.white">
                            {t('signIn.noAccountText')}
                            </Text>
                            <InteractiveText onClick={() => updateOnboardingState('currentStep', 'SIGN_UP')}>
                                {t('signIn.createAccountText')}
                            </InteractiveText>
                        </Flex>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default SignInForm