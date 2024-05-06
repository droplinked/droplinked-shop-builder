import { Box, HStack, Link as ChakraLink, Text, VStack } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import React from "react"

function Links() {
  const Sublink = ({ children }) => (
    <Text
      fontFamily="Avenir Next"
      fontWeight="500"
      fontSize="12px"
      color="lightGray">
      {children}
    </Text>
  )

  const Header = ({ children }) => (
    <Text
      fontFamily="Avenir Next"
      fontWeight="bold"
      fontSize="14px"
      color="#808080">
      {children}
    </Text>
  )

  const LinkComponent = ({ children, path }) => (
    <ChakraLink
      target="_blank"
      href={path}>
      {children}
    </ChakraLink>
  )

  return (
    <HStack
      spacing={{ base: 4, lg: 24 }}
      width={"100%"}
      alignItems={"baseline"}
      justifyContent={{ base: "space-between", lg: "end" }}>
      <Box>
        <VStack
          align="stretch"
          spacing={3}>
          <Header>Get to know us</Header>

          <VStack
            align="stretch"
            spacing={3}>
            <LinkComponent path="https://discord.com/channels/1068939465025916959/1088500920406515763">
              <Sublink>Discord</Sublink>{" "}
            </LinkComponent>

            <LinkComponent path="https://twitter.com/droplinked">
              <Sublink>Twitter</Sublink>
            </LinkComponent>

            <LinkComponent path="https://www.instagram.com/drop_linked">
              <Sublink>Instagram</Sublink>
            </LinkComponent>

            <LinkComponent path="https://www.linkedin.com/company/droplinked">
              <Sublink>LinkedIn</Sublink>
            </LinkComponent>
          </VStack>
        </VStack>
      </Box>
      <Box>
        <VStack
          align="stretch"
          spacing={3}>
          <Header>Resources</Header>
          <VStack
            align="stretch"
            spacing={3}>
            <ChakraLink
              target="_blank"
              href="https://droplinked.gitbook.io/droplinked-store-front-help-center/about-us/what-is-droplinked">
              <Sublink>Help center</Sublink>
            </ChakraLink>
            <a
              href="https://drive.google.com/file/d/1b5cggMs0D94Dl2e92-JIP_NPAMK2pjrr/view?usp=sharing"
              target="_blank"
              download>
              <Sublink>Media kit</Sublink>
            </a>
            <Link
              target="_blank"
              to="/token-pay">
              <Sublink>Token Pay</Sublink>
            </Link>
          </VStack>
        </VStack>
      </Box>

      <VStack
        align="stretch"
        spacing={33}>
        <VStack
          align="stretch"
          spacing={3}>
          <Header>Services</Header>

          <VStack
            align="stretch"
            spacing={3}>
            <ChakraLink
              target="_blank"
              href="https://events.airfoil.studio/">
              <Sublink>Events</Sublink>
            </ChakraLink>
          </VStack>
        </VStack>
      </VStack>
    </HStack>
  )
}

export default Links
