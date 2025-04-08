import { Box, Divider, HStack, VStack } from "@chakra-ui/react";
import AppIcons from "assets/icon/Appicons";
import BasicButton from "components/common/BasicButton/BasicButton";
import AppInput from "components/common/form/textbox/AppInput";
import AppModal from "components/common/modal/AppModal";
import AppTypography from "components/common/typography/AppTypography";
import { Form, Formik } from "formik";
import useAppToast from "hooks/toast/useToast";
import { useCustomNavigate } from "hooks/useCustomeNavigate/useCustomNavigate";
import useAppStore from "lib/stores/app/appStore";
import { BASE_URL } from "utils/app/variable";
import { navigateUserBasedOnStatus } from "utils/helpers";
import AppErrors from "utils/constants/errors";
import React, { useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import Button from "components/redesign/button/Button";

const formSchema = Yup.object().shape({
    email: Yup.string().email(AppErrors.signin.invalidEmailAddress).required("Required"),
    password: Yup.string().required("Required"),
})

const LoginModal = ({ show, close, switchModal, switchReset, isFromPlansPage }) => {
    const [searchParams] = useSearchParams()
    const { login, loading } = useAppStore()
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

            if (!isFromPlansPage) {
                const { href, dashboard } = navigateUserBasedOnStatus(status, data)
                dashboard ? shopNavigate(href) : navigate(href)
            }
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
                                <AppTypography fontWeight={"400"} fontSize={{ base: "12px", md: "14px" }} color={"neutral.white"} cursor={"pointer"} _hover={{ color: "neutral.gray.450" }} onClick={switchReset}>
                                    Forgot
                                    <Box as="span" ml={1} color="text.primary">
                                        password?
                                    </Box>
                                </AppTypography>
                                <AppTypography fontWeight={"400"} fontSize={{ base: "12px", md: "14px" }} color={"neutral.white"} cursor={"pointer"} _hover={{ color: "neutral.gray.450" }} onClick={switchModal}>
                                    Don't have an account?{" "}
                                    <Box as="span" mx={1} color="text.primary">
                                        Sign up
                                    </Box>
                                    now!
                                </AppTypography>
                            </VStack>
                            <HStack align={"stretch"} alignItems={"center"}>
                                <Divider color={"neutral.gray.850"} />
                                <AppTypography color={"neutral.gray.300"} fontSize={"12px"} fontWeight={"500"}>
                                    OR
                                </AppTypography>
                                <Divider color={"neutral.gray.850"} />
                            </HStack>
                            <Button
                                onClick={() => {
                                    window.location.href = `${BASE_URL}/auth/login/google`;
                                }}
                                backgroundColor={"neutral.gray.900"}
                                borderRadius={"8px"}
                                border={"none"}
                                color={"text.subtextPlaceholder.light"}
                                iconSpacing={"12px"}
                                leftIcon={<AppIcons.Google />}
                                isDisabled={loading}
                            >
                                Sign in with Google
                            </Button>
                        </VStack>
                    </Form>
                )}
            </Formik>
        </AppModal>
    )
}

export default LoginModal