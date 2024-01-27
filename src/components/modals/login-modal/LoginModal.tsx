import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import BasicButton from "components/common/BasicButton/BasicButton";
import AppInput from "components/common/form/textbox/AppInput";
import AppModal from "components/common/modal/AppModal";
import AppTypography from "components/common/typography/AppTypography";
import { Form, Formik } from 'formik';
import useHookStore from "functions/hooks/store/useHookStore";
import useAppToast from "functions/hooks/toast/useToast";
import { useCustomNavigate } from "functions/hooks/useCustomeNavigate/useCustomNavigate";
import { appDeveloment } from "lib/utils/app/variable";
import AppErrors from "lib/utils/statics/errors/errors";
import React from "react";
import * as Yup from 'yup';
import ResetPassModal from "../reset-pass-modal/ResetPassModal";
import SignupModal from "../signup-modal/SignupModal";

interface Iform {
  email: string
  password: string
}

const LoginModal = ({ show, open, close }) => {
  const { app: { login, loading, shop } } = useHookStore()
  const { showToast } = useAppToast()
  const { shopNavigate } = useCustomNavigate()
  const signupModal = useDisclosure()
  const resetPasswordModal = useDisclosure()

  // submit form function
  const handleLoginFormSubmit = async (data: Iform) => {
    try {
      let result = await login(data)
      if (result) handleLoginProcess(result);
    } catch (error) {
      showToast({ message: error?.message, type: "error" });
    }
  };

  // action on user data based on type and status
  const handleLoginProcess = (data: any) => {
    // check customer
    if (data.user.type !== "PRODUCER") return showToast({ message: "This account can not login", type: "error" });

    //first close modal
    close();
    const status = appDeveloment && data.user.status === "NEW" ? "VERIFIED" : data.user.status
    status === "DELETED" ? showToast({ message: "This account has been deleted", type: "error" }) : navigateUser(status, data)
  };

  // navigate user based on status
  const navigateUser = (status: string, data: any) => {
    switch (status) {
      case "NEW":
        localStorage.setItem("registerEmail", JSON.stringify(data.user.email));
        shopNavigate("/email-confirmation");
        break;
      case "VERIFIED":
      case "PROFILE_COMPLETED":
        shopNavigate("register/shop-info");
        break;
      case "SHOP_INFO_COMPLETED":
      case "IMS_TYPE_COMPLETED":
      case "ACTIVE":
        shopNavigate("");
        break;
    }
  };

  const formSchema = Yup.object().shape({
    email: Yup.string().email(AppErrors.signin.invalid_email_address).required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  return (
    <>
      <AppModal title="Sign in" open={show} close={close}>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validateOnChange={false}
          validationSchema={formSchema}
          onSubmit={handleLoginFormSubmit}
        >
          {({ errors, values, setFieldValue }) => (
            <Form>
              <Flex direction={"column"} gap={"16px"}>
                <AppInput
                  error={errors.email ? errors.email.toString() : ""}
                  name="email"
                  onChange={(e) => setFieldValue("email", e.target.value)}
                  value={values.email}
                />
                <AppInput
                  type="password"
                  name="password"
                  error={errors.password ? errors.password.toString() : ""}
                  onChange={(e) => setFieldValue("password", e.target.value)}
                  value={values.password}
                />
                <BasicButton type="submit" isDisabled={loading} isLoading={loading}>
                  Login
                </BasicButton>
              </Flex>
              <Flex direction={"column"} gap={"4px"} mt={"8px"}>
                <AppTypography
                  fontSize={{ base: "12px", md: "14px" }}
                  fontWeight={400}
                  color={"#FFFFFF"}
                  cursor={"pointer"}
                  _hover={{ color: "#b3b3b3" }}
                  onClick={() => {
                    close()
                    resetPasswordModal.onOpen()
                  }}
                >
                  Forgot{" "}
                  <Box as="span" color="green.500">password?</Box>
                </AppTypography>
                <AppTypography
                  fontSize={{ base: "12px", md: "14px" }}
                  fontWeight={400}
                  color={"#FFFFFF"}
                  cursor={"pointer"}
                  _hover={{ color: "#b3b3b3" }}
                  onClick={() => {
                    close()
                    signupModal.onOpen()
                  }}
                >
                  Don’t have an account?{" "}
                  <Box as="span" color="green.500">Sign up</Box>{" "}
                  now!
                </AppTypography>
              </Flex>
            </Form>
          )}
        </Formik>
      </AppModal>
      <ResetPassModal show={resetPasswordModal.isOpen} close={resetPasswordModal.onClose} switchToLogin={() => {
        resetPasswordModal.onClose()
        open()
      }} />
      <SignupModal show={signupModal.isOpen} close={signupModal.onClose} shopName={shop?.name} switchToLogin={() => {
        signupModal.onClose()
        open()
      }} />
    </>
  );
};

export default LoginModal;
