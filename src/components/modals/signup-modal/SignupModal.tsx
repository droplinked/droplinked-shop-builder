import { Box, Divider, HStack, Stack, VStack } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import BasicButton from "components/common/BasicButton/BasicButton";
import AppInput from "components/common/form/textbox/AppInput";
import AppModal from 'components/common/modal/AppModal';
import AppTypography from "components/common/typography/AppTypography";
import { Form, Formik } from "formik";
import useAppToast from "functions/hooks/toast/useToast";
import { useCustomNavigate } from "functions/hooks/useCustomeNavigate/useCustomNavigate";
import { signupService } from "lib/apis/auth/services";
import useAppStore from "lib/stores/app/appStore";
import { BASE_URL } from "lib/utils/app/variable";
import { navigating_user_based_on_status } from "lib/utils/helpers/helpers";
import { passwordRegex } from "lib/utils/helpers/regex";
import AppErrors from "lib/utils/statics/errors/errors";
import React, { useCallback, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import ShowPassword from "./ShowPassword";

const SignupModal = ({ show, close, switchModal, isFromPlansPage, subscriptionPlan, openPlanPurchaseModal }) => {
  const [searchParams] = useSearchParams();
  const [passwordVisibility, setPasswordVisibility] = useState({ password: false, confirmPassword: false })
  const [isLoading, setLoading] = useState(false)
  let navigate = useNavigate();
  const { showToast } = useAppToast();
  const toggleShowField = useCallback((field: any) => setPasswordVisibility((prev) => ({ ...prev, [field]: !prev[field] })), [])
  const referral_code_from_params = useMemo(() => searchParams.get("referral"), [searchParams])
  const d3_id_from_params = useMemo(() => searchParams.get("d3-id"), [searchParams])

  const { login } = useAppStore()
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
      const status = isFromPlansPage ? "VERIFIED" : user.status

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
      setLoading(true)
      const { email, password, referral } = data;
      await signupService({ email, password, referralCode: referral && referral !== "" ? referral : undefined, hasProducerAccount: true, d3UserId: d3_id_from_params || undefined });
      isFromPlansPage && await handleLogin({ email, password })
      localStorage.setItem("registerEmail", JSON.stringify(email));
      showToast({ message: "Account successfully created", type: "success" });
      close();
      isFromPlansPage ? openPlanPurchaseModal() : navigate("/email-confirmation")
    } catch (error) {
      showToast({ message: error?.response?.data?.data?.message, type: "error" });
    }
    finally {
      setLoading(false)
    }
  };

  const formSchema = Yup.object().shape({
    email: Yup.string().email(AppErrors.signin.invalid_email_address).required("Required"),
    password: Yup.string().matches(passwordRegex, AppErrors.signup.password_requirements_not_met).required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], AppErrors.signup.when_the_password_and_confirmed)
      .required("Required"),
    referral: Yup.string(),
  });

  return (
    <AppModal open={show} close={close} title="Sign Up">
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
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
                <AppInput type="email" error={errors?.email ? errors.email.toString() : ""} name="email" onChange={(e) => setFieldValue("email", e.target.value)} value={values.email} />
                <Box position={"relative"}>
                  <AppInput
                    type={passwordVisibility.password ? "text" : "password"}
                    name="password"
                    error={errors?.password ? errors.password.toString() : ""}
                    onChange={(e) => setFieldValue("password", e.target.value)}
                    value={values.password}
                  />
                  <ShowPassword showed={passwordVisibility.password} onClick={() => toggleShowField("password")} />
                </Box>
                <Box position={"relative"}>
                  <AppInput
                    type={passwordVisibility.confirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    error={errors?.confirmPassword ? errors.confirmPassword.toString() : ""}
                    onChange={(e) => setFieldValue("confirmPassword", e.target.value)}
                    value={values.confirmPassword}
                  />
                  <ShowPassword showed={passwordVisibility.confirmPassword} onClick={() => toggleShowField("confirmPassword")} />
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
                <AppTypography fontWeight={"400"} fontSize={{ base: "12px", md: "14px" }} color={"white"} cursor={"pointer"} _hover={{ color: "#b3b3b3" }} onClick={switchModal}>Already have an account?{" "}<Box as="span" color="#2EC99E !important">Sign in</Box>{" "}now</AppTypography>
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

                  if (d3_id_from_params && d3_id_from_params !== "") {
                    googleAuthUrl.searchParams.append("d3UserId", d3_id_from_params);
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
    </AppModal>
  );
};

export default SignupModal;
