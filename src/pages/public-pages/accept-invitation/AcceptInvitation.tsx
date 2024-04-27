import { Box, Flex } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppInput from 'components/common/form/textbox/AppInput'
import ShowPassword from 'components/modals/signup-modal/signup-producer/parts/showPassword/ShowPassword'
import { Form, Formik } from 'formik'
import useAppToast from 'functions/hooks/toast/useToast'
import { acceptInvitationService } from 'lib/apis/user/services'
import { passwordRegex } from 'lib/utils/heper/regex'
import AppErrors from 'lib/utils/statics/errors/errors'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import * as Yup from "yup"

type inputType = "text" | "password"

function AcceptInvitation() {
    const { invitationId } = useParams()
    const [inputTypes, setInputTypes] = useState<{ password: inputType, confirmPassword: inputType }>({ password: "password", confirmPassword: "password" })
    const { showToast } = useAppToast()

    const toggleInputType = <K extends keyof typeof inputTypes>(key: K) =>
        setInputTypes({ ...inputTypes, [key]: inputTypes[key] === "text" ? "password" : "text" })

    const onSubmit = async (data: { password: string, confirmPassword: string }) => {
        try {
            await acceptInvitationService({ invitationId, password: data.password })
            showToast({ type: "success", message: "An invitation has been sent to this email." })
        }
        catch (e) {
            showToast({ type: "error", message: (e as Error).message })
        }
    }

    const formSchema = Yup.object().shape({
        password: Yup.string().matches(passwordRegex, AppErrors.signup.password_requirements_not_met).required("This field is required."),
        confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], AppErrors.signup.when_the_password_and_confirmed).required("This field is required."),
    })

    return (
        <Flex justifyContent={"center"} paddingBlock={120} paddingInline={{ base: "16px", sm: "28px" }}>
            <Flex
                width={{ base: "100%", lg: "50%" }}
                maxWidth="1400px"
                borderRadius={24}
                backgroundColor={"#1C1C1C"}
                padding={{ base: 5, md: 7, xl: 9 }}
            >
                <Formik
                    initialValues={{ password: "", confirmPassword: "" }}
                    validateOnChange={false}
                    validationSchema={formSchema}
                    onSubmit={onSubmit}
                >
                    {({ errors, values, setFieldValue }) => (
                        <Form style={{ width: "100%" }}>
                            <Flex direction={"column"} gap={9}>
                                <Box position={"relative"} width={"100%"}>
                                    <AppInput
                                        name="password"
                                        type={inputTypes.password}
                                        placeContent={"Password"}
                                        error={errors?.password ? errors.password.toString() : ""}
                                        onChange={(e) => setFieldValue("password", e.target.value)}
                                        value={values.password}
                                    />
                                    <ShowPassword showed={inputTypes.password === "text"} onClick={() => toggleInputType("password")} />
                                </Box>
                                <Box position={"relative"}>
                                    <AppInput
                                        name="confirm-password"
                                        type={inputTypes.confirmPassword}
                                        placeholder="Confirm Password"
                                        value={values.confirmPassword}
                                        error={errors?.confirmPassword ? errors.confirmPassword.toString() : ""}
                                        onChange={(e) => setFieldValue("confirmPassword", e.target.value)}
                                    />
                                    <ShowPassword showed={inputTypes.confirmPassword === "text"} onClick={() => toggleInputType("confirmPassword")} />
                                </Box>
                                <BasicButton type='submit'>Accept invitation</BasicButton>
                            </Flex>
                        </Form>
                    )}
                </Formik>
            </Flex>
        </Flex>
    )
}

export default AcceptInvitation