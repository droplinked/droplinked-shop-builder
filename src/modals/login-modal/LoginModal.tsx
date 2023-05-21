import { Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import ModalWrapper from "../modal-wrapper/ModalWrapper";
import BasicButton from "../../common/BasicButton/BasicButton";
import { Title, BottomText } from "./LoginModal-style";
import { PROFILE_STATUS } from "../../constant/profile-status-types";
import { toastValue } from "../../context/toastify/ToastContext";
import { appDeveloment } from "lib/utils/app/variable";
import AppInput from "common/form/textbox/AppInput";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import AppErrors from "lib/utils/statics/errors/errors";
import { useStore } from "zustand";
import { toast } from "react-toastify";
import useAppStore from "lib/stores/app/appStore";

interface Iform {
  email: string
  password: string
}

const LoginModal = ({ show, close, switchModal, switchReset }) => {
  const { login, loading } = useStore(useAppStore)
  const { errorToast } = useContext(toastValue);
  const navigate = useNavigate();

  // submit form function
  const onSubmit = async (data: Iform) => {
    try {
      let result = await login(data)
      if (result) loginFunction(result);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // action on user data based on type and status
  const loginFunction = (data: any) => {
    // check customer
    if (data.user.type !== "PRODUCER") return errorToast("This account cant login");

    //first close modal
    close();

    const status =
      appDeveloment && data.user.status === "NEW"
        ? "VERIFIED"
        : data.user.status;

    if (status === PROFILE_STATUS.NEW) {
      localStorage.setItem("registerEmail", JSON.stringify(data.user.email));
      navigateUser(status, data.shop.name);
      return;
    } else if (status === PROFILE_STATUS.DELETED) {
      errorToast("This account has been deleted");
      return;
    } else {
      navigateUser(status, data.shop.name);
      return;
    }
  };

  // navigate user based on status
  const navigateUser = (status: string, shopName: string) => {
    // eslint-disable-next-line default-case
    switch (status) {
      case PROFILE_STATUS.NEW:
        navigate("/email-confirmation");
        return;
      case PROFILE_STATUS.VERIFIED:
        navigate(`/${shopName}/c/register/shop-info`);
        return;
      case PROFILE_STATUS.PROFILE_COMPLETED:
        navigate(`/${shopName}/c/register/shop-info`);
        return;
      case PROFILE_STATUS.SHOP_INFO_COMPLETED:
        navigate(`/${shopName}/c/products/`);
        return;
      case PROFILE_STATUS.IMS_TYPE_COMPLETED:
        navigate(`/${shopName}/c/products/`);
        return;
      case PROFILE_STATUS.ACTIVE:
        navigate(`/${shopName}/c/products/`);
        return;
    }
  };

  const formSchema = Yup.object().shape({
    email: Yup.string().email(AppErrors.signin.invalid_email_address).required('Required'),
    password: Yup.string().required('Required'),
  });

  return (
    <ModalWrapper show={show} close={close}>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validateOnChange={false}
        validationSchema={formSchema}
        onSubmit={onSubmit}
      >

        {({ errors, values, setFieldValue }) => (
          <Form>
            <Box w="100%">
              <Title>Sign in</Title>
              <Box w="100%" pt="20px">
                <AppInput
                  error={errors.email ? errors.email.toString() : ""}
                  name="email"
                  onChange={(e) => setFieldValue("email", e.target.value)}
                  value={values.email}
                />
                <Box mb="16px"></Box>
                <AppInput
                  type="password"
                  name="password"
                  error={errors.password ? errors.password.toString() : ""}
                  onChange={(e) => setFieldValue("password", e.target.value)}
                  value={values.password}
                />
                <Box mb="16px"></Box>
                <BasicButton type="submit" minWidth={"100%"} isDisabled={loading} isLoading={loading}>
                  Login
                </BasicButton>
              </Box>
              <Box mb="8px"></Box>
              <BottomText onClick={switchReset}>
                Forgot
                <Box as="span" ml={1} color="green.500">
                  password?
                </Box>
              </BottomText>
              <Box mb="4px"></Box>
              <BottomText onClick={switchModal}>
                Don’t have an account?{" "}
                <Box as="span" mx={1} color="green.500">
                  Sign up
                </Box>
                now!
              </BottomText>
            </Box>
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
};

export default LoginModal;
