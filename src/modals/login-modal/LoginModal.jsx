import { Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useContext } from "react";
import ModalWrapper from "../modal-wrapper/ModalWrapper";
import BasicButton from "../../components/shared/BasicButton/BasicButton";
import { Title, BottomText } from "./LoginModal-style";
import { PROFILE_STATUS } from "../../constant/profile-status-types";
import { toastValue } from "../../context/toastify/ToastContext";
import { useApi } from "../../hooks/useApi/useApi";
import { useProfile } from "../../hooks/useProfile/useProfile";
import { postLoginByEmail } from "lib/apis/authApiService";
import { setCurrentUser } from "lib/store/profile/profile.action";
import { appDeveloment } from "lib/utils/app/variable";
import AppInput from "components/shared/form/textbox/AppInput";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const LoginModal = ({ show, close, switchModal, switchReset }) => {
  // state for disable buttons
  const [loading, setLoading] = useState(false);

  // hooks
  const { postApi } = useApi();
  const { setShopData } = useProfile();
  const { errorToast } = useContext(toastValue);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // submit form function
  const onSubmit = async (data) => {
    const { email, password } = data
    setLoading(true);
    let result = await postApi(postLoginByEmail(email, password));
    setLoading(false);
    if (result) loginFunction(result);
  };

  // action on user data based on type and status
  const loginFunction = (data) => {
    //first close modal
    close();

    const status =
      appDeveloment && data.user.status === "NEW"
        ? "VERIFIED"
        : data.user.status;

    if (status === PROFILE_STATUS.NEW) {
      localStorage.setItem("registerEmail", JSON.stringify(data.user.email));
      navigateUser(status);
      return;
    } else if (status === PROFILE_STATUS.DELETED) {
      errorToast("This account has been deleted");
      return;
    } else {
      setShopData(data.shop);
      dispatch(setCurrentUser(data));
      navigateUser(status, data.shop.name);
      return;
    }
  };

  // navigate user based on status
  const navigateUser = (status, shopName) => {
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
    email: Yup.string().email('Invalid email').required('Required'),
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
                  error={errors.email}
                  name="email"
                  onChange={(e) => setFieldValue("email", e.target.value)}
                  value={values.email}
                />
                <Box mb="16px"></Box>
                <AppInput
                  type="password"
                  name="password"
                  error={errors.password}
                  onChange={(e) => setFieldValue("password", e.target.value)}
                  value={values.password}
                />
                <Box mb="16px"></Box>
                <BasicButton type="submit" disable={loading} loading={loading}>
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
