import { useNavigate } from "react-router-dom";
import { useState, useContext, useCallback } from "react";
import { Box, Stack } from "@chakra-ui/react";
import { toastValue } from "../../../context/toastify/ToastContext";
import { BottomText } from "../SignupModal-style";
import { useApi } from "../../../hooks/useApi/useApi";
import BasicButton from "../../../common/BasicButton/BasicButton";
import { postUserSignup } from "lib/apis/userApiService";
import AppInput from "common/form/textbox/AppInput";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import AppIcons from "assest/icon/Appicons";
import ShowPassword from "./parts/showPassword/ShowPassword";
import AppErrors from "lib/utils/statics/errors/errors";
import { passwordRegex, usernameRegex } from "lib/utils/heper/regex";

export default function SignupProducer({ close, shopname, switchToggle }) {
  const { successToast, errorToast } = useContext(toastValue);
  const [States, setStates] = useState({
    loading: false,
    show: {
      password: false,
      repassword: false
    }
  })
  const { postApi } = useApi();
  let navigate = useNavigate();

  const setLoading = useCallback((value) => setStates(prev => ({ ...prev, loading: value })), [])
  const toggleShowField = useCallback((field) => setStates(prev => ({ ...prev, show: { ...prev.show, [field]: !prev.show[field] } })), [])

  const onSubmit = async (data) => {
    const { email, password, username } = data
    setLoading(true);
    let result = await postApi(postUserSignup(email, password, username));
    setLoading(false);

    if (result) {
      localStorage.setItem("registerEmail", JSON.stringify(email));
      successToast("Account successfully created");
      close();
      navigate("/email-confirmation");
    }
  };

  const formSchema = Yup.object().shape({
    username: Yup.string().matches(usernameRegex, "Username can contain letters (a-z), numbers (0-9) and underscores.").required('Required'),
    email: Yup.string().email(AppErrors.signin.invalid_email_address).required('Required'),
    password: Yup.string().matches(passwordRegex, AppErrors.signup.password_requirements_not_met).required('Required'),
    repassword: Yup.string().oneOf([Yup.ref('password'), null], AppErrors.signup.when_the_password_and_confirmed).required('Required')
  });

  return (
    <Formik
      initialValues={{
        username: shopname || '',
        email: '',
        password: '',
        repassword: '',
      }}
      validationSchema={formSchema}
      onSubmit={onSubmit}
    >

      {({ errors, values, setFieldValue }) => (
        <Form>
          <Stack w="100%" h="100%" spacing="20px">
            <AppInput
              error={errors.username}
              name="username"
              isReadOnly={shopname && shopname.length}
              onChange={(e) => setFieldValue("username", e.target.value)}
              value={values.username}
            />
            <AppInput
              error={errors.email}
              name="email"
              onChange={(e) => setFieldValue("email", e.target.value)}
              value={values.email}
            />
            <Box position={"relative"}>
              <AppInput
                type={States.show.password ? "text" : "password"}
                name="password"
                error={errors.password}
                onChange={(e) => setFieldValue("password", e.target.value)}
                value={values.password}
              />
              <ShowPassword showed={States.show.password} onClick={() => toggleShowField("password")} />
            </Box>
            <Box position={"relative"}>
              <AppInput
                type={States.show.repassword ? "text" : "password"}
                placeholder="Confirm password"
                name="repassword"
                error={errors.repassword}
                onChange={(e) => setFieldValue("repassword", e.target.value)}
                value={values.repassword}
              />
              <ShowPassword showed={States.show.repassword} onClick={() => toggleShowField("repassword")} />
            </Box>

            <BasicButton type="submit" isDisabled={States.loading}>
              Sign up
            </BasicButton>

            <BottomText onClick={switchToggle}>
              Already have an account? <a>Sign in</a> now
            </BottomText>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
