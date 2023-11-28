import React, { useCallback, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ResetPassPage-style.scss";
import BasicButton from 'components/common/BasicButton/BasicButton';
import useAppToast from "functions/hooks/toast/useToast";
import { Box, Flex, VStack } from "@chakra-ui/react";
import AppInput from 'components/common/form/textbox/AppInput';
import AppTypography from 'components/common/typography/AppTypography';
import { useMutation } from "react-query";
import { IchangePasswordService } from "lib/apis/user/interfaces";
import { changePasswordService } from "lib/apis/user/services";
import ShowPassword from "components/modals/signup-modal/signup-producer/parts/showPassword/ShowPassword";
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import { passwordRegex } from "lib/utils/heper/regex";
import AppErrors from "lib/utils/statics/errors/errors";

export default function ResetPassPage() {
  const { mutateAsync, isLoading } = useMutation((params: IchangePasswordService) => changePasswordService(params))
  const { showToast } = useAppToast()
  const [States, setStates] = useState({
    show: {
      password: false,
      repassword: false
    }
  })
  let navigate = useNavigate();
  let token = useParams().token;

  const toggleShowField = useCallback((field: any) => setStates(prev => ({ ...prev, show: { ...prev.show, [field]: !prev.show[field] } })), [])

  const onSubmit = async (data) => {
    try {
      await mutateAsync({ accountRecoveryToken: token, newPassword: data.password })
      showToast("Confirmation email sent! Please check your inbox and follow the instructions to reset your account password.", "success");
      navigate("/?modal=login");
    } catch (error) {
      showToast(error?.response?.data?.data?.message || error?.message, 'error')
    }
  };

  const formSchema = Yup.object().shape({
    password: Yup.string().matches(passwordRegex, AppErrors.signup.password_requirements_not_met).required('Required'),
    repassword: Yup.string().oneOf([Yup.ref('password'), null], AppErrors.signup.when_the_password_and_confirmed).required('Required')
  });

  return (
    <Formik
      initialValues={{
        password: '',
        repassword: '',
      }}
      validateOnChange={false}
      validationSchema={formSchema}
      onSubmit={onSubmit}
    >

      {({ errors, values, setFieldValue }) => (
        <Form>
          <Flex justifyContent={"center"} padding="100px 0" margin="60px 0">
            <VStack align={"stretch"} spacing={6} color="#FFF" maxWidth="500px">
              <Flex justifyContent={"center"}>
                <AppTypography fontSize="20px" fontWeight="bold">Change Password</AppTypography>
              </Flex>
              <AppTypography fontSize="16px" textAlign="center">Please enter the email address you’ve been registered for your store, we will send you an email to help you change your password</AppTypography>
              <Box position={"relative"}>
                <AppInput
                  type={States.show.password ? "text" : "password"}
                  name="password"
                  placeholder="New password"
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
              <BasicButton type="submit" isLoading={isLoading}>Save</BasicButton>
            </VStack>
          </Flex>
        </Form>
      )}
    </Formik>
  );
}
