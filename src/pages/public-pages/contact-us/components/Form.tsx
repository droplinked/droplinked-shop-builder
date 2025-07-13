import { Box, Flex, Show } from '@chakra-ui/react';
import BasicButton from 'components/common/BasicButton/BasicButton';
import AppTextarea from 'components/common/form/textarea/AppTextarea';
import AppTypography from 'components/common/typography/AppTypography';
import { Form, Formik } from 'formik';
import useAppToast from 'hooks/toast/useToast';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import React from 'react';
import { useMutation } from 'react-query';
import { contactUsService } from 'services/constact-us/services';
import * as Yup from "yup";
import ContactUsInput from './ContactUsInput';

interface IFormData {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
}

function ContactUsForm() {
    const { t } = useLocaleResources("contactUs");
    const { mutateAsync, isLoading } = useMutation((data: IContactUs) => contactUsService(data))
    const { showToast } = useAppToast()

    const onSubmit = async (data: IFormData, actions) => {
        try {
            await mutateAsync(data)
            actions.resetForm()
            showToast({ type: "success", message: t('form.success') })
        } catch (error) {
            showToast({ type: "error", message: t('form.error') })
        }
    }

    const formSchema = Yup.object().shape({
        firstName: Yup.string(),
        lastName: Yup.string(),
        email: Yup.string().email(t('form.emailError')).required(t('form.required')),
        message: Yup.string().required(t('form.required'))
    })

    return (
        <Formik
            initialValues={{ firstName: "", lastName: "", email: "", message: "" }}
            validateOnChange={false}
            validationSchema={formSchema}
            onSubmit={onSubmit}
        >
            {({ values, handleChange }) => (
                <Form>
                    <Flex direction={"column"} gap={{ base: 2, lg: 4 }}>
                        <Show above='md'>
                            <AppTypography fontSize={24} fontWeight={600} color={"#fff"} whiteSpace={"nowrap"}>
                                {t('form.title')}
                            </AppTypography>
                        </Show>

                        <Flex direction={{ base: "column", lg: "row" }} alignItems={"center"} gap={{ base: 2, lg: 4 }}>
                            <Box width={{ base: "100%", lg: "50%" }}>
                                <ContactUsInput
                                    id="firstName"
                                    name="firstName"
                                    value={values.firstName}
                                    placeholder={t('form.firstName')}
                                    onChange={handleChange}
                                />
                            </Box>
                            <Box width={{ base: "100%", lg: "50%" }}>
                                <ContactUsInput
                                    id="lastName"
                                    name="lastName"
                                    value={values.lastName}
                                    placeholder={t('form.lastName')}
                                    onChange={handleChange}
                                />
                            </Box>
                        </Flex>

                        <ContactUsInput
                            id="email"
                            name="email"
                            value={values.email}
                            placeholder={t('form.email')}
                            onChange={handleChange}
                        />

                        <AppTextarea
                            id='message'
                            name='message'
                            value={values.message}
                            onChange={handleChange}
                            border={"1px solid"}
                            borderColor="neutral.gray.700"
                            borderRadius={8}
                            backgroundColor={"neutral.gray.850"}
                            padding={"12px 16px"}
                            color={"text.subtext.placeholder.dark"}
                            fontSize={16}
                            resize={"none"}
                            rows={11}
                            _hover={{ backgroundColor: "neutral.gray.850" }}
                            _focus={{ backgroundColor: "neutral.gray.850" }}
                        />

                        <BasicButton
                            type='submit'
                            fontSize={16}
                            fontWeight={500}
                            isDisabled={!values.firstName || !values.lastName || !values.email || !values.message || isLoading}
                            isLoading={isLoading}
                        >
                            {t('form.send')}
                        </BasicButton>
                    </Flex>
                </Form>
            )}
        </Formik>
    )
}

export default ContactUsForm