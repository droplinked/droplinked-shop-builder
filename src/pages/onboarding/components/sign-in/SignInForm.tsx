import { Text } from '@chakra-ui/react'
import Button from 'components/redesign/button/Button'
import Checkbox from 'components/redesign/checkbox/Checkbox'
import Input from 'components/redesign/input/Input'
import { Form, Formik } from 'formik'
import Cookies from 'js-cookie'
import { useLogin } from 'pages/onboarding/hooks/useLogin'
import { OnboardingStepProps } from 'pages/onboarding/types/onboarding'
import React, { useState } from 'react'
import * as Yup from 'yup'
import DividerText from '../common/DividerText'
import GoogleAuthButton from '../common/GoogleAuthButton'
import InteractiveText from '../common/InteractiveText'
import OnboardingStepHeader from '../common/OnboardingStepHeader'
import PasswordInput from '../common/PasswordInput'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'

const formSchema = Yup.object().shape({
    email: Yup.string().email("Please enter a valid email address.").required("Email address is required."),
    password: Yup.string().min(8, "Password must be at least 8 characters.").required("Password is required.")
})

const savedEmail = Cookies.get('remembered_email')
const savedPassword = Cookies.get('remembered_password')

function SignInForm({ onNext }: Pick<OnboardingStepProps, "onNext">) {
    const [rememberPassword, setRememberPassword] = useState<boolean>(!!savedEmail && !!savedPassword)
    const { onLoginSubmit } = useLogin()
    const { updateOnboardingState } = useOnboardingStore()

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
                heading='Welcome to droplinked'
                description='Sign in with your credentials below.'
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
                        <Input
                            label="Email Address"
                            inputProps={{
                                name: "email",
                                value: values.email,
                                onChange: handleChange,
                                placeholder: "Enter email address",
                            }}
                            message={errors.email?.toString()}
                        />

                        <PasswordInput
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            message={errors.password?.toString()}
                        />

                        <Checkbox
                            marginBlock={3}
                            isChecked={rememberPassword}
                            onChange={(e) => setRememberPassword(e.target.checked)}
                        >
                            Remember my password
                        </Checkbox>

                        <Button type="submit" isLoading={isSubmitting}>
                            Sign In
                        </Button>

                        <DividerText text="or continue with" />

                        <GoogleAuthButton isSignUp={false} isDisabled={isSubmitting} />

                        <Text marginTop={3} textAlign="center" fontSize={14} color="#FFF">
                            Don’t have an account?{" "}
                            <InteractiveText onClick={onNext}>Join us and create one!</InteractiveText>
                        </Text>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default SignInForm