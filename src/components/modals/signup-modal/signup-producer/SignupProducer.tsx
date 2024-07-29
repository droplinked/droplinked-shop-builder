import { Box, Divider, HStack, Stack, VStack } from "@chakra-ui/react";
import BasicButton from "components/common/BasicButton/BasicButton";
import AppInput from "components/common/form/textbox/AppInput";
import { Form, Formik } from "formik";
import useAppToast from "functions/hooks/toast/useToast";
import { passwordRegex } from "lib/utils/heper/regex";
import AppErrors from "lib/utils/statics/errors/errors";
import React, { useCallback, useMemo, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import ShowPassword from "./parts/showPassword/ShowPassword";
import AppTypography from "components/common/typography/AppTypography";
import AppIcons from "assest/icon/Appicons";
import { appDevelopment, BASE_URL } from "lib/utils/app/variable";
import { IsignupService } from "lib/apis/auth/interfaces";
import { signupService } from "lib/apis/auth/services";
import { useCustomNavigate } from "functions/hooks/useCustomeNavigate/useCustomNavigate";
import useHookStore from "functions/hooks/store/useHookStore";
import { navigating_user_based_on_status } from "lib/utils/heper/helpers";

const SignupProducer = ({ close, shopname, switchToggle, isFromPlansPage, subscriptionPlan }) => {
    const [searchParams] = useSearchParams();
    const { mutateAsync, isLoading } = useMutation((params: IsignupService) => signupService(params));
    const [States, setStates] = useState({ show: { password: false, repassword: false } });
    let navigate = useNavigate();
    const { showToast } = useAppToast();
    const toggleShowField = useCallback((field: any) => setStates((prev) => ({ ...prev, show: { ...prev.show, [field]: !prev.show[field] } })), []);
    const referral_code_from_params = useMemo(() => searchParams.get("referral"), [searchParams])

    const { app: { login } } = useHookStore()
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
            const status = isFromPlansPage ? "VERIFY" : user.status

            if (status === "DELETED")
                return showToast({ message: "This account has been deleted", type: "error" })

            if (user.type !== "SHOPBUILDER")
                return showToast({ message: "This account is unable to log in. Please check your credentials.", type: "error" })

            if (!isFromPlansPage) {
                const { href, dashboard } = navigating_user_based_on_status(status, data)
                dashboard ? shopNavigate(href) : navigate(href)
            }
            close()
        } catch (error) {
            showToast({ message: error.message, type: "error" })
        }
    }
    
    const onSubmit = async (data: any) => {
        try {
            const { email, password, referral } = data;
            await mutateAsync({ email, password, referralCode: referral && referral !== "" ? referral : undefined, hasProducerAccount: true });
            isFromPlansPage && handleLogin({email, password})
            localStorage.setItem("registerEmail", JSON.stringify(email));
            showToast({ message: "Account successfully created", type: "success" });
            close();
            !isFromPlansPage && navigate("/email-confirmation");
        } catch (error) {
            showToast({ message: error?.response?.data?.data?.message, type: "error" });
        }
    };

    const formSchema = Yup.object().shape({
        // username: Yup.string().matches(usernameRegex, "Username can contain letters (a-z), numbers (0-9) and underscores.").required("Required"),
        email: Yup.string().email(AppErrors.signin.invalid_email_address).required("Required"),
        password: Yup.string().matches(passwordRegex, AppErrors.signup.password_requirements_not_met).required("Required"),
        repassword: Yup.string()
            .oneOf([Yup.ref("password"), null], AppErrors.signup.when_the_password_and_confirmed)
            .required("Required"),
        referral: Yup.string(),
    });

    return (
        <Formik
            initialValues={{
                // username: shopname || "",
                email: "",
                password: "",
                repassword: "",
                referral: referral_code_from_params || "",
            }}
            validateOnChange={false}
            validationSchema={formSchema}
            onSubmit={onSubmit}
        >
            {({ errors, values, setFieldValue }) => (
                <Form>
                    <VStack align={'stretch'} spacing={'32px'}>
                        <Stack w="100%" h="100%" spacing="16px">
                            {/* <AppInput
                                error={errors?.username ? errors.username.toString() : ""}
                                name="username"
                                isReadOnly={shopname && shopname.length}
                                onChange={(e) => setFieldValue("username", e.target.value)}
                                value={values.username}
                            /> */}
                            <AppInput type="email" error={errors?.email ? errors.email.toString() : ""} name="email" onChange={(e) => setFieldValue("email", e.target.value)} value={values.email} />
                            <Box position={"relative"}>
                                <AppInput
                                    type={States.show.password ? "text" : "password"}
                                    name="password"
                                    error={errors?.password ? errors.password.toString() : ""}
                                    onChange={(e) => setFieldValue("password", e.target.value)}
                                    value={values.password}
                                />
                                <ShowPassword showed={States.show.password} onClick={() => toggleShowField("password")} />
                            </Box>
                            <Box position={"relative"}>
                                <AppInput
                                    type={States.show.repassword ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    name="repassword"
                                    error={errors?.repassword ? errors.repassword.toString() : ""}
                                    onChange={(e) => setFieldValue("repassword", e.target.value)}
                                    value={values.repassword}
                                />
                                <ShowPassword showed={States.show.repassword} onClick={() => toggleShowField("repassword")} />
                            </Box>
                            <AppInput
                                name="referral"
                                placeholder="Referral Code"
                                onChange={(e) => setFieldValue("referral", e.target.value)}
                                value={values.referral}
                                isDisabled={Boolean(searchParams.get("referral"))}
                            />
                        </Stack>
                        <VStack align={"stretch"} spacing={"8px"}>
                            <BasicButton type="submit" isLoading={isLoading}>Sign up</BasicButton>
                            <AppTypography fontWeight={"400"} fontSize={{ base: "12px", md: "14px" }} color={"white"} cursor={"pointer"} _hover={{ color: "#b3b3b3" }} onClick={switchToggle}>Already have an account?{" "}<Box as="span" color="#2EC99E !important">Sign in</Box>{" "}now</AppTypography>
                        </VStack>
                        <HStack align={"stretch"} alignItems={"center"}>
                            <Divider color={"line"} />
                            <AppTypography color={"lightGray"} fontSize={"12px"} fontWeight={"500"}>OR</AppTypography>
                            <Divider color={"line"} />
                        </HStack>
                        {/* <BasicButton onClick={() => { window.location.href = `${BASE_URL}/auth/login/google${(referral_code_from_params && referral_code_from_params !== "") ? `/?referralCode=${referral_code_from_params}` : ""}` }} backgroundColor={"mainGray.500"} borderRadius={"8px"} border={"none"} _hover={{ backgroundColor: "mainGray.500" }} color={"lightgray"} iconSpacing={"12px"} leftIcon={<AppIcons.Google />} isDisabled={isLoading}>Sign up with Google</BasicButton> */}
                        <BasicButton
                            onClick={() => {
                                const googleAuthUrl = new URL(`${BASE_URL}/auth/login/google`);
                                
                                if (referral_code_from_params && referral_code_from_params !== "") {
                                    googleAuthUrl.searchParams.append("referralCode", referral_code_from_params);
                                }
                                
                                if (isFromPlansPage && subscriptionPlan?._id) {
                                    googleAuthUrl.searchParams.append("subscriptionId", subscriptionPlan._id);
                                }
                                
                                window.location.href = googleAuthUrl.toString();
                            }}
                            backgroundColor={"mainGray.500"}
                            borderRadius={"8px"}
                            border={"none"}
                            _hover={{ backgroundColor: "mainGray.500" }}
                            color={"lightgray"}
                            iconSpacing={"12px"}
                            leftIcon={<AppIcons.Google />}
                            isDisabled={isLoading}
                            >
                                Sign up with Google
                        </BasicButton>
                    </VStack>
                </Form>
            )}
        </Formik>
    );
};

export default SignupProducer;
