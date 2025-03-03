import { HStack, Text } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import Button from 'components/redesign/button/Button'
import Checkbox from 'components/redesign/checkbox/Checkbox'
import Input from 'components/redesign/input/Input'
import { Form, Formik } from 'formik'
import AppErrors from 'lib/utils/statics/errors/errors'
import { useLogin } from 'pages/onboarding/hooks/useLogin'
import React from 'react'
import * as Yup from "yup"
import DividerText from '../DividerText'
import InteractiveText from '../InteractiveText'
import StepWrapper from '../StepWrapper'

const formSchema = Yup.object().shape({
    email: Yup.string().email(AppErrors.signin.invalid_email_address).required("Required"),
    password: Yup.string().required("Required")
})

function SignInForm() {
    const { authenticateUser, onLoginSubmit, finalizeLogin, loading } = useLogin()

    const loginWithGoogle = async (access_token: string, refresh_token: string) => {
        let result = await authenticateUser({ type: "get", access_token, refresh_token, params: { access_token } })
        if (result) await finalizeLogin(result)
    }

    return (
        <StepWrapper
            heading='Welcome to droplinked'
            description='Sign in with your credentials below.'
        >
            <Formik
                initialValues={{ email: "", password: "" }}
                validateOnChange={false}
                validationSchema={formSchema}
                onSubmit={onLoginSubmit}
            >
                {({ errors, values, setFieldValue }) => (
                    <Form style={{ display: 'flex', flexDirection: 'column', gap: "24px" }}>
                        <Input
                            label='Email Address'
                            inputProps={{
                                name: 'email',
                                value: values.email,
                                onChange: (e) => setFieldValue('email', e.target.value),
                                placeholder: 'Enter email address'
                            }}
                        />

                        <Input
                            label='Password'
                            inputProps={{
                                name: 'password',
                                type: 'password',
                                value: values.password,
                                onChange: (e) => setFieldValue('password', e.target.value),
                                placeholder: 'Enter password',
                            }}
                        />

                        <HStack w="full" justify="space-between" marginBlock={3}>
                            <Checkbox>Remember my password</Checkbox>
                            <InteractiveText>Reset Password</InteractiveText>
                        </HStack>

                        <Button>Sign In</Button>

                        <DividerText text='or continue with' />

                        <Button
                            variant='secondary'
                            leftIcon={<AppIcons.Google />}
                        >
                            Google Account
                        </Button>

                        <Text marginTop={3} textAlign="center" fontSize={14} color="#FFF">
                            Don’t have an account?{" "}
                            <InteractiveText>Join us and create one!</InteractiveText>
                        </Text>
                    </Form>
                )}
            </Formik>
        </StepWrapper>
    )
}

export default SignInForm