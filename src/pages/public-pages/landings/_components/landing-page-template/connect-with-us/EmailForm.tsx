import { Box, Flex, Input, InputGroup, useMediaQuery } from "@chakra-ui/react"
import Button from "components/redesign/button/Button"
import { Form, Formik } from "formik"
import useAppToast from "hooks/toast/useToast"
import { subscribeFeature } from "lib/apis/user/services"
import React from "react"
import { useLocation } from "react-router-dom"
import * as Yup from "yup"

export default function EmailForm() {
    const [isSmallerThan768] = useMediaQuery('(max-width: 767px)')
    const { pathname } = useLocation()
    const { showToast } = useAppToast()

    const formSchema = Yup.object().shape({ email: Yup.string().email().required() })

    const handleSubmit = async (values, { resetForm }) => {
        try {
            await subscribeFeature({ feature: pathname.replace(/^\/|[\/?]+$/g, ''), email: values.email })
            showToast({ type: "success", message: "You've successfully subscribed to this feature." })
            resetForm()
        }
        catch (error) {
            showToast({ type: "error", message: "Oops! Something went wrong." })
        }
    }

    return (
        <Formik
            initialValues={{ email: "" }}
            validateOnChange={false}
            validationSchema={formSchema}
            onSubmit={handleSubmit}
        >
            {({ values, setFieldValue, isSubmitting }) => (
                <Form>
                    {isSmallerThan768 ?
                        <VerticalFormLayout email={values.email} setFieldValue={setFieldValue} isSubmitting={isSubmitting} />
                        :
                        <HorizontalFormLayout email={values.email} setFieldValue={setFieldValue} isSubmitting={isSubmitting} />
                    }
                </Form>
            )}
        </Formik>
    )
}

const VerticalFormLayout = ({ email, setFieldValue, isSubmitting }) => (
    <Flex direction="column" gap={3} justify="stretch">
        <InputGroupContainer>
            <EmailInput email={email} onChange={e => setFieldValue('email', e.target.value)} />
        </InputGroupContainer>
        <SubmitButton isSubmitting={isSubmitting} />
    </Flex>
)

const HorizontalFormLayout = ({ email, setFieldValue, isSubmitting }) => (
    <InputGroupContainer padding={3}>
        <InputGroup display="flex" alignItems="center" gap={3}>
            <EmailInput email={email} onChange={e => setFieldValue('email', e.target.value)} />
            <SubmitButton isSubmitting={isSubmitting} />
        </InputGroup>
    </InputGroupContainer>
)

const EmailInput = ({ email, onChange }) => (
    <Input
        name="email"
        value={email}
        border="none"
        background="none"
        fontSize={{ base: 14, md: 18 }}
        color="white"
        placeholder="Enter your email address"
        _placeholder={{ color: "white" }}
        _hover={{}}
        _focus={{}}
        _focusVisible={{}}
        onChange={onChange}
        sx={{
            "&:-webkit-autofill": {
                caretColor: "white",
                WebkitTextFillColor: "white",
                WebkitBoxShadow: "0 0 0px 1000px transparent inset",
                transition: "background-color 5000s ease-in-out 0s"
            }
        }}
    />
)

const SubmitButton = ({ isSubmitting }) => (
    <Button
        type="submit"
        borderRadius={36}
        fontSize={{ base: 14, md: 16 }}
        fontWeight={500}
        isLoading={isSubmitting}
        isDisabled={isSubmitting}
    >
        Submit
    </Button>
)

const InputGroupContainer = ({ children, padding = 0 }) => (
    <Box
        borderRadius={36}
        padding={padding}
        background="radial-gradient(1915.68% 141.42% at 0% 0%, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.12) 100%)"
        boxShadow="0px -1px 2px 0px rgba(255, 255, 255, 0.04) inset, 0px 1px 4px 0px rgba(255, 255, 255, 0.24) inset"
        backdropFilter="blur(100px)"
    >
        {children}
    </Box>
)