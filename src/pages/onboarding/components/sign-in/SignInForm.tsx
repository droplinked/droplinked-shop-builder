import { HStack, Text } from '@chakra-ui/react'
import Button from 'components/redesign/button/Button'
import Checkbox from 'components/redesign/checkbox/Checkbox'
import Input from 'components/redesign/input/Input'
import { Form, Formik } from 'formik'
import { useLogin } from 'pages/onboarding/hooks/useLogin'
import { OnboardingStepProps } from 'pages/onboarding/types/onboarding'
import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import * as Yup from 'yup'
import DividerText from '../DividerText'
import GoogleAuthButton from '../GoogleAuthButton'
import InteractiveText from '../InteractiveText'
import PasswordInput from '../PasswordInput'

const formSchema = Yup.object().shape({
    email: Yup.string().email("Please enter a valid email address.").required("Email address is required."),
    password: Yup.string().required("Password is required.")
})

function SignInForm({ onNext }: Pick<OnboardingStepProps, "onNext">) {
    const { authenticateUser, onLoginSubmit, finalizeLogin, loading } = useLogin()
    const [searchParams] = useSearchParams()

    async function loginWithGoogle(access_token: string, refresh_token: string) {
        const result = await authenticateUser({
            type: "get",
            access_token,
            refresh_token,
            params: { access_token }
        })
        if (result) await finalizeLogin(result)
    }

    useEffect(() => {
        const access_token = searchParams.get("access_token")
        const refresh_token = searchParams.get("refresh_token")
        if (access_token && refresh_token && !loading) {
            loginWithGoogle(access_token, refresh_token)
        }
    }, [searchParams, loading, loginWithGoogle])

    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            validateOnChange={false}
            validationSchema={formSchema}
            onSubmit={onLoginSubmit}
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

                    <HStack w="full" justify="space-between" marginBlock={3}>
                        <Checkbox name="remember">Remember my password</Checkbox>
                        <InteractiveText>Reset Password</InteractiveText>
                    </HStack>

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
    )
}

export default SignInForm