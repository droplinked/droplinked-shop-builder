import { Flex } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import { Form, Formik } from 'formik'
import useAppToast from 'hooks/toast/useToast'
import { acceptInvitationService } from 'lib/apis/user/services'
import useAppStore from 'lib/stores/app/appStore'
import { passwordRegex } from 'utils/helpers/regex'
import AppErrors from 'utils/constants/errors'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup"
import InvitationInput from '../input/Input'

interface Props {
    invitationId: string;
    email: string;
}

function InvitationForm({ invitationId, email }: Props) {
    const navigate = useNavigate()
    const [isLoading, setLoading] = useState(false)
    const { login } = useAppStore()
    const { showToast } = useAppToast()

    const onSubmit = async (data: any) => {
        const { password } = data
        try {
            setLoading(true)
            await acceptInvitationService({ invitationId, password })
            await login({ type: "default", params: { email, password, userType: "PRODUCER" } })
            navigate("/analytics")
        }
        catch (e) {
            showToast({ type: "error", message: (e as Error).message })
        }
        finally {
            setLoading(false)
        }
    }

    const formSchema = Yup.object().shape({
        email: Yup.string().email(AppErrors.signin.invalidEmailAddress).required("This field is required."),
        password: Yup.string().matches(passwordRegex, AppErrors.signup.passwordRequirementsNotMet).required("This field is required."),
        confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], AppErrors.signup.passwordsDoNotMatch).required("This field is required."),
    })

    return (
        <Formik
            initialValues={{ email, password: "", confirmPassword: "" }}
            validateOnChange={false}
            validationSchema={formSchema}
            onSubmit={onSubmit}
        >
            {({ errors, values, setFieldValue }) => <Form style={{ width: "100%" }}>
                <Flex direction={"column"} gap={9}>
                    <Flex direction={"column"} gap={4}>
                        <InvitationInput
                            label='Email'
                            type='email'
                            value={values.email}
                            placeholder='Email'
                            isReadOnly
                            error={errors.email && errors.email.toString()}
                            onChange={(e) => setFieldValue("email", e.target.value)}
                        />

                        <InvitationInput
                            label='Password'
                            type='password'
                            value={values.password}
                            placeholder='Password'
                            isRequired
                            error={errors.password && errors.password.toString()}
                            onChange={(e) => setFieldValue("password", e.target.value)}
                        />

                        <InvitationInput
                            label='Repeat Password'
                            type='password'
                            value={values.confirmPassword}
                            placeholder='Repeat Password'
                            isRequired
                            error={errors.confirmPassword && errors.confirmPassword.toString()}
                            onChange={(e) => setFieldValue("confirmPassword", e.target.value)}
                        />
                    </Flex>
                    <BasicButton type='submit' isDisabled={isLoading} isLoading={isLoading}>Sign up</BasicButton>
                </Flex>
            </Form>
            }
        </Formik>
    )
}

export default InvitationForm