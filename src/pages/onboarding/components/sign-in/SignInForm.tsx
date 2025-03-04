import { HStack, Text } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import Button from 'components/redesign/button/Button'
import Checkbox from 'components/redesign/checkbox/Checkbox'
import Input from 'components/redesign/input/Input'
import { Form, Formik } from 'formik'
import { useLogin } from 'pages/onboarding/hooks/useLogin'
import React from 'react'
import * as Yup from "yup"
import DividerText from '../DividerText'
import InteractiveText from '../InteractiveText'
import StepWrapper from '../StepWrapper'

const formSchema = Yup.object().shape({
    email: Yup.string().email("Please enter a valid email address.").required("Email address is required."),
    password: Yup.string().required("Password is required.")
})

interface Props {
    onNext: () => void
}

function SignInForm({ onNext }: Props) {
    const { authenticateUser, onLoginSubmit, finalizeLogin, loading } = useLogin()

    // Future integration for Google login
    async function loginWithGoogle(access_token: string, refresh_token: string) {
        const result = await authenticateUser({
            type: "get",
            access_token,
            refresh_token,
            params: { access_token }
        })
        if (result) {
            await finalizeLogin(result)
        }
    }

    const initialValues = { email: "", password: "" }

    return (
        <StepWrapper
            heading="Welcome to droplinked"
            description="Sign in with your credentials below."
        >
            <Formik
                initialValues={initialValues}
                validateOnChange={false}
                validationSchema={formSchema}
                onSubmit={onLoginSubmit}
            >
                {({ values, handleChange }) => (
                    <Form style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                        <Input
                            label="Email Address"
                            inputProps={{
                                name: "email",
                                value: values.email,
                                onChange: handleChange,
                                placeholder: "Enter email address"
                            }}
                        />

                        <Input
                            label="Password"
                            inputProps={{
                                name: "password",
                                type: "password",
                                value: values.password,
                                onChange: handleChange,
                                placeholder: "Enter password"
                            }}
                        />

                        <HStack w="full" justify="space-between" marginBlock={3}>
                            <Checkbox>Remember my password</Checkbox>
                            <InteractiveText>Reset Password</InteractiveText>
                        </HStack>

                        <Button isLoading={loading}>Sign In</Button>

                        <DividerText text="or continue with" />

                        <Button variant="secondary" leftIcon={<AppIcons.Google />}>
                            Google Account
                        </Button>

                        <Text marginTop={3} textAlign="center" fontSize={14} color="#FFF">
                            Don’t have an account?{" "}
                            <InteractiveText onClick={onNext}>Join us and create one!</InteractiveText>
                        </Text>
                    </Form>
                )}
            </Formik>
        </StepWrapper>
    )
}

export default SignInForm