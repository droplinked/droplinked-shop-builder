import React from "react";
import { Flex, VStack } from "@chakra-ui/react";
import AppTypography from 'components/common/typography/AppTypography';
import AppInput from 'components/common/form/textbox/AppInput';
import useAppToast from "functions/hooks/toast/useToast";
import AppModal from 'components/common/modal/AppModal';
import { useMutation } from "react-query";
import { forgetPasswordService } from "lib/apis/user/services";
import { IforgetPasswordService } from "lib/apis/user/interfaces";
import { Form, Formik } from "formik";
import AppErrors from "lib/utils/statics/errors/errors";
import * as Yup from 'yup';
import BasicButton from "components/common/BasicButton/BasicButton";

const ResetPassModal = ({ show, close, switchToLogin }) => {
  const { mutateAsync, isLoading } = useMutation((params: IforgetPasswordService) => forgetPasswordService(params))
  const { showToast } = useAppToast();

  const onSubmit = async (params: IforgetPasswordService) => {
    try {
      await mutateAsync(params)
      showToast(`Send an email to : ${params.email}`, "success");
      close();
    } catch (error) {
      showToast(error?.response?.data?.data?.message || error?.message, "error")
    }
  }

  const formSchema = Yup.object().shape({
    email: Yup.string().email(AppErrors.signin.invalid_email_address).required('Required'),
  });

  return (
    <AppModal open={show} close={close} title="Forgot Password">
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={formSchema}
        onSubmit={onSubmit}
      >

        {({ errors, values, setFieldValue }) => (
          <Form>
            <VStack align={"stretch"} spacing={4}>
              <AppTypography fontSize="14px" color={"#FFF"}>Please enter the email address you’ve been registered for your store, we will send you an email to help you change your password</AppTypography>
              <AppInput
                name="email"
                isRequired
                label={"Email"}
                error={errors.email}
                value={values.email}
                type={"email"}
                onChange={(e) => setFieldValue("email", e.target.value)}
              />
              <BasicButton minWidth={"100%"} type="submit" isLoading={isLoading}>Send Verification</BasicButton>
              <BasicButton width={"100%"} sizes="medium" onClick={switchToLogin} variant={"link"}>
                Back to login
              </BasicButton>
            </VStack>
          </Form>
        )}
      </Formik>
    </AppModal>
  );
};

export default ResetPassModal;
