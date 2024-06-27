import React from "react";
import { Form, Formik } from "formik";
import { Button, Flex, Input, Textarea } from "@chakra-ui/react";

//Components
import AppTypography from "components/common/typography/AppTypography";

const DppContactUs = () => {
  return (
    <Flex flexDirection={"column"} alignItems={"center"} gap={"32px"}>
      <AppTypography fontSize={"48px"} fontWeight={700} color={"#FFF"} textAlign={"center"}>Contact us to learn more</AppTypography>
      <Formik
        initialValues={{ name: "", email: "", message: "" }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Flex flexDirection={"column"} alignItems={"center"} justifyContent={"center"} gap={"24px"} width={"444px"}>
              <Flex
                direction="column"
                justifyContent="center"
                alignItems="center"
                gap="16px"
                alignSelf="stretch"
                width={"100%"}
              >
                <Input
                  name="name"
                  placeholder="Name"
                  backgroundColor={"transparent"}
                  border="1px solid #E0E0E0"
                  padding={"12px 20px"}
                  borderRadius={"8px"}
                  height={"50px"}
                  value={values.name}
                  onChange={handleChange}
                />
                <Input
                  name="email"
                  placeholder="Email"
                  backgroundColor={"transparent"}
                  border="1px solid #E0E0E0"
                  padding={"12px 20px"}
                  borderRadius={"8px"}
                  height={"50px"}
                  value={values.email}
                  onChange={handleChange}
                />
                <Textarea
                  name="message"
                  placeholder="Your message"
                  backgroundColor={"transparent"}
                  border="1px solid #E0E0E0"
                  padding={"12px 20px"}
                  borderRadius={"8px"}
                  height={"150px"}
                  value={values.message}
                  onChange={handleChange}
                />
                <Button
                  mt={4}
                  colorScheme="teal"
                  type="submit"
                  width="100%"
                  backgroundColor="#2BCFA1"
                  color="black"
                >
                  Send
                </Button>
              </Flex>
            </Flex>
          </Form>
        )}
      </Formik>
  </Flex>
  )
}

export default DppContactUs;