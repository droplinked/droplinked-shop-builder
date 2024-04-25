import { Box, Flex } from '@chakra-ui/react';
import BasicButton from 'components/common/BasicButton/BasicButton';
import AppTextarea from 'components/common/form/textarea/AppTextarea';
import { Form, Formik } from 'formik';
import React from 'react';
import * as Yup from "yup";
import ContactUsInput from '../contact-us-input/ContactUsInput';

interface IFormData {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
}

function ContactUsForm() {
    const onSubmit = async (data: IFormData) => {
        try {

        } catch (error) {
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
            {({ errors, values, setFieldValue }) => (
                <Form>
                    <Flex direction={"column"} gap={{ base: 4, lg: 6 }}>
                        <Flex direction={{ base: "column", lg: "row" }} alignItems={"center"} gap={4}>
                            <Box width={{ base: "100%", lg: "50%" }}>
                                <ContactUsInput
                                    name="firstName"
                                    value={values.firstName}
                                    placeholder='First Name'
                                    onChange={(e) => setFieldValue("firstName", e.target.value)}
                                />
                            </Box>
                            <Box width={{ base: "100%", lg: "50%" }}>
                                <ContactUsInput
                                    name="lastName"
                                    value={values.lastName}
                                    placeholder='Last Name'
                                    onChange={(e) => setFieldValue("lastName", e.target.value)}
                                />
                            </Box>
                        </Flex>

                        <ContactUsInput
                            name="email"
                            value={values.email}
                            placeholder='Email'
                            // error={errors.email ? errors.email.toString() : ""}
                            onChange={(e) => setFieldValue("email", e.target.value)}
                        />

                        <AppTextarea
                            name='message'
                            border={"1px solid #3C3C3C"}
                            borderRadius={8}
                            backgroundColor={"#262626"}
                            padding={"12px 16px"}
                            color={"#7B7B7B"}
                            fontSize={16}
                            resize={"none"}
                            rows={12}
                            _hover={{ backgroundColor: "#262626" }}
                            _focus={{ backgroundColor: "#262626" }}
                        // error={errors?.message ? errors.message.toString() : ""}
                        />

                        <BasicButton type='submit' fontSize={16} fontWeight={500}>Send</BasicButton>
                    </Flex>
                </Form>
            )}
        </Formik>
    )
}

export default ContactUsForm