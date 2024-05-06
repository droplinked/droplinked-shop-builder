import { Flex } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppInput from 'components/common/form/textbox/AppInput'
import { Form, Formik } from 'formik'
import useAppToast from 'functions/hooks/toast/useToast'
import { sendInvitaionEmailService } from 'lib/apis/user/services'
import AppErrors from 'lib/utils/statics/errors/errors'
import React from 'react'
import { useMutation } from 'react-query'
import * as Yup from "yup"

function InvitationForm({ fetch }: { fetch: () => void }) {
    const sendInvitationEmail = useMutation((email: string) => sendInvitaionEmailService(email))
    const { showToast } = useAppToast()

    const onSubmit = async (values, actions) => {
        try {
            console.log(values, actions)
            await sendInvitationEmail.mutateAsync(values.email)
            showToast({ type: "success", message: "An invitation has been sent to this email." })
            fetch()
        }
        catch (e) {
            showToast({ type: "error", message: (e as Error).message })
        }
        finally {
            actions.resetForm()
        }
    }

    const formSchema = Yup.object().shape({
        email: Yup.string().email(AppErrors.signin.invalid_email_address).required("Email is required.")
    })

    return (
        <Formik
            initialValues={{ email: "" }}
            validateOnChange={false}
            validationSchema={formSchema}
            onSubmit={onSubmit}
        >
            {({ errors, values, setFieldValue }) => (
                <Form>
                    <Flex alignItems="center" backgroundColor={"bG"} paddingRight="7.5px" rounded="8px">
                        <AppInput name='newUser' value={values.email} placeholder="Enter email" border="none" error={errors.email && errors.email.toString()} onChange={(e) => setFieldValue("email", e.target.value)} />
                        <BasicButton
                            type='submit'
                            sizes="medium"
                            isDisabled={!values.email || sendInvitationEmail.isLoading}
                            isLoading={sendInvitationEmail.isLoading}
                        >
                            Send
                        </BasicButton>
                    </Flex>
                </Form>
            )}
        </Formik>
    )
}

export default InvitationForm