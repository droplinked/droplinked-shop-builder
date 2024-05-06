import { Box, Flex, Show } from '@chakra-ui/react';
import BasicButton from 'components/common/BasicButton/BasicButton';
import AppTextarea from 'components/common/form/textarea/AppTextarea';
import AppTypography from 'components/common/typography/AppTypography';
import { Form, Formik } from 'formik';
import useAppToast from 'functions/hooks/toast/useToast';
import { contactUsService } from 'lib/apis/constact-us/services';
import React from 'react';
import { useMutation } from 'react-query';
import * as Yup from "yup";
import ContactUsInput from '../contact-us-input/ContactUsInput';

interface IFormData {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
}

function ContactUsForm() {
    const { mutateAsync, isLoading } = useMutation((data: IContactUs) => contactUsService(data))
    const { showToast } = useAppToast()

    const onSubmit = async (data: IFormData, actions) => {
        try {
            await mutateAsync(data)
            actions.resetForm()
            showToast({ type: "success", message: "Message sent successfully!" })
        } catch (error) {
            showToast({ type: "error", message: "Oops. Something went wrong!" })
        }
    }

    const formSchema = Yup.object().shape({
        firstName: Yup.string(),
        lastName: Yup.string(),
        email: Yup.string().email("Please enter a valid email address.").required("This field is required."),
        message: Yup.string().required("This field is required.")
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
                            <AppTypography fontSize={24} fontWeight={600} color={"#fff"} whiteSpace={"nowrap"}>Let’s connect constellations</AppTypography>
                        </Show>

                        <Flex direction={{ base: "column", lg: "row" }} alignItems={"center"} gap={{ base: 2, lg: 4 }}>
                            <Box width={{ base: "100%", lg: "50%" }}>
                                <ContactUsInput
                                    id="firstName"
                                    name="firstName"
                                    value={values.firstName}
                                    placeholder='First Name'
                                    onChange={handleChange}
                                />
                            </Box>
                            <Box width={{ base: "100%", lg: "50%" }}>
                                <ContactUsInput
                                    id="lastName"
                                    name="lastName"
                                    value={values.lastName}
                                    placeholder='Last Name'
                                    onChange={handleChange}
                                />
                            </Box>
                        </Flex>

                        <ContactUsInput
                            id="email"
                            name="email"
                            value={values.email}
                            placeholder='Email'
                            onChange={handleChange}
                        />

                        <AppTextarea
                            id='message'
                            name='message'
                            value={values.message}
                            onChange={handleChange}
                            border={"1px solid #3C3C3C"}
                            borderRadius={8}
                            backgroundColor={"#262626"}
                            padding={"12px 16px"}
                            color={"#7B7B7B"}
                            fontSize={16}
                            resize={"none"}
                            rows={11}
                            _hover={{ backgroundColor: "#262626" }}
                            _focus={{ backgroundColor: "#262626" }}
                        />

                        <BasicButton
                            type='submit'
                            fontSize={16}
                            fontWeight={500}
                            isDisabled={!values.firstName || !values.lastName || !values.email || !values.message || isLoading}
                            isLoading={isLoading}
                        >
                            Send
                        </BasicButton>
                    </Flex>
                </Form>
            )}
        </Formik>
    )
}

export default ContactUsForm