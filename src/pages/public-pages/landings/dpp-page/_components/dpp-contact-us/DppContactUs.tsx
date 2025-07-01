import React from "react";
import { Box, Flex, Input, Textarea } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { TFunction } from "i18next";

// API
import { contactUsService } from 'services/constact-us/services';

// Components
import useAppToast from 'hooks/toast/useToast';
import AppTypography from "components/common/typography/AppTypography";
import BasicButton from "components/common/BasicButton/BasicButton";

interface IFormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

interface DppContactUsProps {
  t: TFunction;
}

const DppContactUs = ({ t }: DppContactUsProps) => {
  const { mutateAsync, isLoading } = useMutation((data: IFormData) => contactUsService(data));
  const { showToast } = useAppToast();

  const onSubmit = async (data: IFormData, actions) => {
    try {
      await mutateAsync(data);
      actions.resetForm();
      showToast({ type: "success", message: t('dppContactUs.toast.success') });
    } catch (error) {
      showToast({ type: "error", message: t('dppContactUs.toast.error') });
    }
  };

  const formSchema = Yup.object().shape({
    firstName: Yup.string().required(t('dppContactUs.form.firstName.error')),
    lastName: Yup.string().required(t('dppContactUs.form.lastName.error')),
    email: Yup.string().email(t('dppContactUs.form.email.invalidError')).required(t('dppContactUs.form.email.error')),
    message: Yup.string().required(t('dppContactUs.form.message.error')),
  });

  return (
    <Flex flexDirection={"column"} alignItems={"center"} gap={"32px"} padding={{ base: "28px", md: "32px" }} width={"100%"}>
      <AppTypography fontSize={{ base: "32px", md: "48px" }} fontWeight={700} color={"#FFF"} textAlign={"center"}>
        {t('dppContactUs.title')}
      </AppTypography>
      <Formik
        initialValues={{ firstName: "", lastName: "", email: "", message: "" }}
        validateOnChange={false}
        validationSchema={formSchema}
        onSubmit={onSubmit}
      >
        {({ values, handleChange, handleSubmit, errors, touched }) => (
          <Form onSubmit={handleSubmit} style={{ width: "60%" }}>
            <Flex flexDirection={"column"} alignItems={"center"} justifyContent={"center"} gap={"24px"} width={"100%"}>
              <Flex flexDirection={{ base: "column", md: "row" }} gap="16px" width="100%">
                <Box width="100%">
                  <Input
                    name="firstName"
                    placeholder={t('dppContactUs.form.firstName.placeholder')}
                    backgroundColor={"transparent"}
                    border="1px solid #E0E0E0"
                    padding={"12px 20px"}
                    borderRadius={"8px"}
                    height={"50px"}
                    color={"#FFF"}
                    value={values.firstName}
                    onChange={handleChange}
                    isInvalid={touched.firstName && !!errors.firstName}
                    errorBorderColor="red.300"
                  />
                  {touched.firstName && errors.firstName && <Box color="red.500" mt="2">{errors.firstName}</Box>}
                </Box>
                <Box width="100%">
                  <Input
                    name="lastName"
                    placeholder={t('dppContactUs.form.lastName.placeholder')}
                    backgroundColor={"transparent"}
                    border="1px solid #E0E0E0"
                    padding={"12px 20px"}
                    borderRadius={"8px"}
                    width={"100%"}
                    height={"50px"}
                    color={"#FFF"}
                    value={values.lastName}
                    onChange={handleChange}
                    isInvalid={touched.lastName && !!errors.lastName}
                    errorBorderColor="red.300"
                  />
                  {touched.lastName && errors.lastName && <Box color="red.500" mt="2">{errors.lastName}</Box>}
                </Box>
              </Flex>
              <Box width="100%">
                <Input
                  name="email"
                  placeholder={t('dppContactUs.form.email.placeholder')}
                  backgroundColor={"transparent"}
                  border="1px solid #E0E0E0"
                  padding={"12px 20px"}
                  borderRadius={"8px"}
                  height={"50px"}
                  color={"#FFF"}
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={touched.email && !!errors.email}
                  errorBorderColor="red.300"
                />
                {touched.email && errors.email && <Box color="red.500" mt="2">{errors.email}</Box>}
              </Box>
              <Box width="100%">
                <Textarea
                  name="message"
                  placeholder={t('dppContactUs.form.message.placeholder')}
                  backgroundColor={"transparent"}
                  border="1px solid #E0E0E0"
                  padding={"12px 20px"}
                  borderRadius={"8px"}
                  height={"150px"}
                  color={"#FFF"}
                  value={values.message}
                  onChange={handleChange}
                  isInvalid={touched.message && !!errors.message}
                  errorBorderColor="red.300"
                />
                {touched.message && errors.message && <Box color="red.500" mt="2">{errors.message}</Box>}
              </Box>
              <BasicButton
                mt={4}
                colorScheme="teal"
                type="submit"
                width="100%"
                backgroundColor="#2BCFA1"
                color="black"
                isDisabled={!values.firstName || !values.lastName || !values.email || !values.message || isLoading}
                isLoading={isLoading}
              >
                {t('dppContactUs.form.submit')}
              </BasicButton>
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};

export default DppContactUs;
