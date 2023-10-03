import { useNavigate } from "react-router-dom";
import React, { useState, useCallback } from "react";
import { Box, Stack } from "@chakra-ui/react";
import { BottomText } from "../SignupModal-style";
import AppInput from 'components/common/form/textbox/AppInput';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import ShowPassword from "./parts/showPassword/ShowPassword";
import AppErrors from "lib/utils/statics/errors/errors";
import { passwordRegex, usernameRegex } from "lib/utils/heper/regex";
import useAppToast from "functions/hooks/toast/useToast";
import { useMutation } from "react-query";
import { signupService } from "lib/apis/user/services";
import { IsignupService } from "lib/apis/user/interfaces";
import BasicButton from "components/common/BasicButton/BasicButton";

export default function SignupProducer({ close, shopname, switchToggle }) {
  const { mutateAsync, isLoading } = useMutation((params: IsignupService) => signupService(params))
  const [States, setStates] = useState({
    show: {
      password: false,
      repassword: false
    }
  })
  let navigate = useNavigate();
  const { showToast } = useAppToast();

  const toggleShowField = useCallback((field: any) => setStates(prev => ({ ...prev, show: { ...prev.show, [field]: !prev.show[field] } })), [])

  const onSubmit = async (data: any) => {
    try {
      const { email, password, username } = data
      await mutateAsync({ email, password, shopName: username });
      localStorage.setItem("registerEmail", JSON.stringify(email));
      showToast("Account successfully created", "success");
      close();
      navigate("/email-confirmation");
    } catch (error) {
      showToast(error?.response?.data?.data?.message, "error")
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
      validateOnChange={false}
      validationSchema={formSchema}
      onSubmit={onSubmit}
    >
      {({ errors, values, setFieldValue }) => (
        <Form>
          <Stack w="100%" h="100%" spacing="20px">
            <AppInput
              error={errors?.username ? errors.username.toString() : ""}
              name="username"
              isReadOnly={shopname && shopname.length}
              onChange={(e) => setFieldValue("username", e.target.value)}
              value={values.username}
            />
            <AppInput
              error={errors?.email ? errors.email.toString() : ""}
              name="email"
              onChange={(e) => setFieldValue("email", e.target.value)}
              value={values.email}
            />
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

            <BasicButton type="submit" isLoading={isLoading}>
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
