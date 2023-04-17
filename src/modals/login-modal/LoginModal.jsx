import { Box, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useContext } from "react";

import ModalWrapper from "../modal-wrapper/ModalWrapper";
import InputFieldComponent from "../../components/shared/input-field-component/InputFieldComponent";
import PasswordInputComponent from "../../components/shared/password-input-component/PasswordInputComponent";

import BasicButton from "../../components/shared/BasicButton/BasicButton";

import { Title, BottomText } from "./LoginModal-style";
import { PROFILE_STATUS } from "../../constant/profile-status-types";
import { toastValue } from "../../context/toastify/ToastContext";
import { isValidEmail } from "../../utils/validations/emailValidation";
import { setCurrentUser } from "../../store/profile/profile.action";
import { postLoginByEmail } from "../../apis/authApiService";
import { useApi } from "../../hooks/useApi/useApi";
import { useProfile } from "../../hooks/useProfile/useProfile";

const LoginModal = ({ show, close, switchModal, switchReset }) => {
  // state for disable buttons
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // hooks

  const { postApi } = useApi();
  const { setShopData } = useProfile();
  const { errorToast } = useContext(toastValue);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEmail = (e) => setEmail(e.target.value);
  const changePassword = (e) => setPassword(e.target.value);

  const validateForm = () => {
    if (email === "") {
      errorToast("Email is required.");
      return false;
    } else if (password === "") {
      errorToast("Password is required.");
      return false;
    } else if (isValidEmail(email) === false) {
      errorToast("Please enter a valid email address.");
      return false;
    } else {
      return true;
    }
  };

  // submit form function
  const onSubmit = async () => {
    // let info = {
    //   email: email,
    //   password: password,
    // };

    if (validateForm() === false) return;

    setLoading(true);
    let result = await postApi(postLoginByEmail(email, password));
    setLoading(false);
    if (result) loginFunction(result);
  };

  // action on user data based on type and status
  const loginFunction = (data) => {
    //first close modal
    close();
    
    const status = process.env.NODE_ENV === 'development' && data.user.status === "NEW" ? "VERIFIED" : data.user.status

    // if (data.user.type == USER_TYPE.CUSTOMER) {
    //   dispatch(setCurrentUser(data));
    //   dispatch(setCurrentShop(data.shop));
    //   return;
    // }
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

  return (
    <ModalWrapper show={show} close={close}>
      <Box w="100%">
        <Title>Sign in</Title>
        <Box w="100%" pt="20px">
          <InputFieldComponent
            value={email}
            change={changeEmail}
            placeholder={"Username"}
          />
          <Box mb="16px"></Box>

          <PasswordInputComponent
            value={password}
            change={changePassword}
            placeholder={"Password"}
          />
          <Box mb="16px"></Box>
          <BasicButton click={onSubmit} disable={loading} loading={loading}>
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
    </ModalWrapper>
  );
};

export default LoginModal;
