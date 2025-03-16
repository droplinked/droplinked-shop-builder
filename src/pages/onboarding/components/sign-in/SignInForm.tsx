import { HStack, Text } from '@chakra-ui/react'
import Button from 'components/redesign/button/Button'
import Checkbox from 'components/redesign/checkbox/Checkbox'
import Input from 'components/redesign/input/Input'
import { Form, Formik } from 'formik'
import { useLogin } from 'pages/onboarding/hooks/useLogin'
import { OnboardingStepProps } from 'pages/onboarding/types/onboarding'
import React from 'react'
import * as Yup from 'yup'
import DividerText from '../common/DividerText'
import GoogleAuthButton from '../common/GoogleAuthButton'
import InteractiveText from '../common/InteractiveText'
import OnboardingStepHeader from '../common/OnboardingStepHeader'
import PasswordInput from '../common/PasswordInput'

const formSchema = Yup.object().shape({
    email: Yup.string().email("Please enter a valid email address.").required("Email address is required."),
    password: Yup.string().required("Password is required.")
})

function SignInForm({ onNext }: Pick<OnboardingStepProps, "onNext">) {
    const { onLoginSubmit } = useLogin()

    return (
        <>
            <OnboardingStepHeader
                heading='Welcome to droplinked'
                description='Sign in with your credentials below.'
            />

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
        </>
    )
}

export default SignInForm