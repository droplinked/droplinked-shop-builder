import { Box, Stack } from "@chakra-ui/react";
import BasicButton from "components/common/BasicButton/BasicButton";
import AppInput from 'components/common/form/textbox/AppInput';
import AppTypography from "components/common/typography/AppTypography";
import { Form, Formik } from 'formik';
import useAppToast from "functions/hooks/toast/useToast";
import { IsignupService } from "lib/apis/user/interfaces";
import { signupService } from "lib/apis/user/services";
import { passwordRegex, usernameRegex } from "lib/utils/heper/regex";
import AppErrors from "lib/utils/statics/errors/errors";
import React, { useCallback, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import ShowPassword from "./parts/showPassword/ShowPassword";

const SignupProducer = ({ close, shopname, switchToLogin }) => {
  const { mutateAsync, isLoading } = useMutation((params: IsignupService) => signupService(params))
  const [States, setStates] = useState({
    show: {
      password: false,
      repassword: false
    }
  })
  const navigate = useNavigate();
  const { showToast } = useAppToast();
  const toggleShowField = useCallback((field: any) => setStates(prev => ({ ...prev, show: { ...prev.show, [field]: !prev.show[field] } })), [])

  const onSubmit = async (data: any) => {
    try {
      const { email, password, username } = data
      await mutateAsync({ email, password, shopName: username });
      localStorage.setItem("registerEmail", JSON.stringify(email));
      showToast({ message: "Account successfully created", type: "success" });
      close();
      navigate("/email-confirmation");
    } catch (error) {
      showToast({ message: error?.response?.data?.data?.message, type: "error" })
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

            <AppTypography fontSize={{ base: "12px", md: "14px" }} fontWeight={400} color={"#FFFFFF"} cursor={"pointer"} _hover={{ color: "#b3b3b3" }} onClick={switchToLogin}>
              Already have an account?{" "}
              <Box as="span" color="green.500">Sign in</Box>{" "}
              now!
            </AppTypography>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}

export default SignupProducer