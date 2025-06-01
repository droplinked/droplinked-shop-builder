import { Flex } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import { Form, Formik } from 'formik'
import useAppToast from 'hooks/toast/useToast'
import { acceptInvitationService } from 'services/user/services'
import useAppStore from 'stores/app/appStore'
import { passwordRegex } from 'utils/helpers'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup"
import InvitationInput from '../input/Input'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import arLocale from 'locales/public-pages/accept-invitation/ar.json'
import enLocale from 'locales/public-pages/accept-invitation/en.json'

interface Props {
    invitationId: string;
    email: string;
}

function InvitationForm({ invitationId, email }: Props) {
    const navigate = useNavigate()
    const [isLoading, setLoading] = useState(false)
    const { login } = useAppStore()
    const { showToast } = useAppToast()
    const { t } = useLocaleResources("acceptInvitation", {
        ar: arLocale,
        en: enLocale
    })

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
        } finally {
            setLoading(false)
        }
    }

    const formSchema = Yup.object().shape({
        email: Yup.string().email(t("validations.invalidEmail")).required(t("validations.fieldRequired")),
        password: Yup.string().matches(passwordRegex, t("validations.passwordRequirements")).required(t("validations.fieldRequired")),
        confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], t("validations.passwordsDoNotMatch")).required(t("validations.fieldRequired")),
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
                    <Flex direction={"column"} gap={4}>                        <InvitationInput
                        label={t("emailLabel")}
                        type='email'
                        value={values.email}
                        placeholder={t("emailLabel")}
                        isReadOnly
                        error={errors.email && errors.email.toString()}
                        onChange={(e) => setFieldValue("email", e.target.value)}
                    />

                        <InvitationInput
                            label={t("passwordLabel")}
                            type='password'
                            value={values.password}
                            placeholder={t("passwordLabel")}
                            isRequired
                            error={errors.password && errors.password.toString()}
                            onChange={(e) => setFieldValue("password", e.target.value)}
                        />

                        <InvitationInput
                            label={t("repeatPasswordLabel")}
                            type='password'
                            value={values.confirmPassword}
                            placeholder={t("repeatPasswordLabel")}
                            isRequired
                            error={errors.confirmPassword && errors.confirmPassword.toString()}
                            onChange={(e) => setFieldValue("confirmPassword", e.target.value)}
                        />
                    </Flex>
                    <BasicButton type='submit' isDisabled={isLoading} isLoading={isLoading}>{t("signUpButton")}</BasicButton>
                </Flex>
            </Form>
            }
        </Formik>
    )
}

export default InvitationForm