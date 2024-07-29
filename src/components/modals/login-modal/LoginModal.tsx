import { Box, Divider, HStack, VStack } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import BasicButton from "components/common/BasicButton/BasicButton";
import AppInput from "components/common/form/textbox/AppInput";
import AppModal from "components/common/modal/AppModal";
import AppTypography from "components/common/typography/AppTypography";
import { Form, Formik } from "formik";
import useHookStore from "functions/hooks/store/useHookStore";
import useAppToast from "functions/hooks/toast/useToast";
import { useCustomNavigate } from "functions/hooks/useCustomeNavigate/useCustomNavigate";
import { BASE_URL, appDevelopment } from "lib/utils/app/variable";
import { navigating_user_based_on_status } from "lib/utils/heper/helpers";
import AppErrors from "lib/utils/statics/errors/errors";
import React, { useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as Yup from "yup";

const formSchema = Yup.object().shape({
    email: Yup.string().email(AppErrors.signin.invalid_email_address).required("Required"),
    password: Yup.string().required("Required"),
})

const LoginModal = ({ show, close, switchModal, switchReset, isFromPlansPage }) => {
    const [searchParams] = useSearchParams()
    const { app: { login, loading } } = useHookStore()
    const { showToast } = useAppToast()
    const navigate = useNavigate()
    const { shopNavigate } = useCustomNavigate()

    const handleLogin = async (data) => {
        try {
            const result = await login({ type: "default", params: { ...data, userType: "PRODUCER" } })
            if (result) processLogin(result)
        } catch (error) {
            showToast({ message: error?.message, type: "error" })
        }
    }

    const processLogin = async (data: any) => {
        try {
            const { user } = data
            const status = user.status

            if (status === "DELETED")
                return showToast({ message: "This account has been deleted", type: "error" })

            if (user.type !== "SHOPBUILDER")
                return showToast({ message: "This account is unable to log in. Please check your credentials.", type: "error" })

            const { href, dashboard } = navigating_user_based_on_status(status, data)
            dashboard ? shopNavigate(href) : navigate(href)
            close()
        } catch (error) {
            showToast({ message: error.message, type: "error" })
        }
    }

    const loginWithGoogle = useCallback(async (access_token: string, refresh_token: string) => {
        let result = await login({ type: "get", access_token, refresh_token, params: { access_token } })
        if (result) await processLogin(result)
        close()
    }, [searchParams])

    useEffect(() => {
        const access_token = searchParams.get("access_token")
        const refresh_token = searchParams.get("refresh_token")
        if (access_token && refresh_token && searchParams.get("modal") === "login" && !loading)
            loginWithGoogle(access_token, refresh_token)
    }, [searchParams])

    return (
        <AppModal open={show} title="Sign In" close={close}>
            <Formik
                initialValues={{ email: "", password: "" }}
                validateOnChange={false}
                validationSchema={formSchema}
                onSubmit={handleLogin}
            >
                {({ errors, values, setFieldValue }) => (
                    <Form>
                        <VStack w="100%" spacing={"36px"} align={"stretch"}>
                            <VStack w="100%" spacing={"16px"} align={"stretch"}>
                                <AppInput error={errors.email ? errors.email.toString() : ""} name="email" onChange={(e) => setFieldValue("email", e.target.value)} value={values.email} />
                                <AppInput
                                    type="password"
                                    name="password"
                                    error={errors.password ? errors.password.toString() : ""}
                                    onChange={(e) => setFieldValue("password", e.target.value)}
                                    value={values.password}
                                />
                            </VStack>

                            <VStack spacing={"8px"} align={"stretch"} alignItems={"flex-start"}>
                                <BasicButton type="submit" minWidth={"100%"} isDisabled={loading} isLoading={loading}>
                                    Login
                                </BasicButton>
                                <AppTypography fontWeight={"400"} fontSize={{ base: "12px", md: "14px" }} color={"white"} cursor={"pointer"} _hover={{ color: "#b3b3b3" }} onClick={switchReset}>
                                    Forgot
                                    <Box as="span" ml={1} color="green.500">
                                        password?
                                    </Box>
                                </AppTypography>
                                <AppTypography fontWeight={"400"} fontSize={{ base: "12px", md: "14px" }} color={"white"} cursor={"pointer"} _hover={{ color: "#b3b3b3" }} onClick={switchModal}>
                                    Don’t have an account?{" "}
                                    <Box as="span" mx={1} color="green.500">
                                        Sign up
                                    </Box>
                                    now!
                                </AppTypography>
                            </VStack>
                            <HStack align={"stretch"} alignItems={"center"}>
                                <Divider color={"line"} />
                                <AppTypography color={"lightGray"} fontSize={"12px"} fontWeight={"500"}>
                                    OR
                                </AppTypography>
                                <Divider color={"line"} />
                            </HStack>
                            <BasicButton
                                onClick={() => {
                                    window.location.href = `${BASE_URL}/auth/login/google`;
                                }}
                                backgroundColor={"mainGray.500"}
                                borderRadius={"8px"}
                                border={"none"}
                                _hover={{ backgroundColor: "mainGray.500" }}
                                color={"lightgray"}
                                iconSpacing={"12px"}
                                leftIcon={<AppIcons.Google />}
                                isDisabled={loading}
                            >
                                Sign in with Google
                            </BasicButton>
                        </VStack>
                    </Form>
                )}
            </Formik>
        </AppModal>
    )
}

export default LoginModal