import { Box, Flex, Input, InputGroup, SimpleGrid } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import { Form, Formik } from 'formik'
import Button from 'pages/invoice-management/components/Button'
import React from 'react'
import * as Yup from "yup"
import CustomHeading from '../heading/Heading'

export default function ConnectWithUs() {
    return (
        <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            alignItems="center"
            gap="88px"
            paddingBlock={{ base: 0, lg: "110px" }}
            paddingInline={{ base: 0, lg: 12 }}
        >
            <IntroSection />
            <EmailForm />
        </SimpleGrid>
    )
}

const IntroSection = () => (
    <Flex direction="column" gap={4}>
        <CustomHeading title="Let’s Connect" width="fit-content" fontSize={36} />
        <AppTypography fontSize={24} color="#C4C4C4">
            We value your interest and would like to stay in touch. Please provide your email below, and a member of our team will reach out to you shortly.
        </AppTypography>
    </Flex>
)

const EmailForm = () => {
    const formSchema = Yup.object().shape({
        email: Yup.string().email().required("Please enter a valid email address")
    })

    const handleSubmit = (values: { email: string }) => {
        console.log(values)
    }

    return (
        <Box
            borderRadius="88px"
            padding={3}
            paddingLeft={4}
            background="radial-gradient(1915.68% 141.42% at 0% 0%, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.12) 100%)"
            boxShadow="0px -1px 2px 0px rgba(255, 255, 255, 0.04) inset, 0px 1px 4px 0px rgba(255, 255, 255, 0.24) inset"
            backdropFilter="blur(100px)"
        >
            <Formik
                initialValues={{ email: "" }}
                validateOnChange={false}
                validationSchema={formSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, values, setFieldValue }) => (
                    <Form>
                        <InputGroup display="flex" alignItems="center">
                            <Input
                                name='email'
                                value={values.email}
                                border="none"
                                fontSize={20}
                                color="white"
                                placeholder="Enter your email address"
                                _placeholder={{ color: "white" }}
                                _hover={{}}
                                _focus={{}}
                                _focusVisible={{}}
                                _autofill={{}}
                                onChange={e => setFieldValue('email', e.target.value)}
                                sx={{
                                    "&:-webkit-autofill": {
                                        caretColor: "white",
                                        WebkitTextFillColor: "white",
                                        WebkitBoxShadow: "0 0 0px 1000px transparent inset",
                                        transition: "background-color 5000s ease-in-out 0s"
                                    }
                                }}
                            />
                            <Button
                                type="submit"
                                borderRadius="88px"
                                padding={6}
                                fontSize={20}
                                fontWeight={500}
                            >
                                Submit
                            </Button>
                        </InputGroup>
                    </Form>
                )}
            </Formik>
        </Box>
    )
}