import { Box, HStack, Text, VStack, Link } from "@chakra-ui/react";
import React from "react";

function Links() {
  const Sublink = ({ children }) => (
    <Text
      fontFamily="Avenir Next"
      fontWeight="500"
      fontSize="12px"
      color="lightGray"
    >
      {children}
    </Text>
  );

  const Header = ({ children }) => (
    <Text
      fontFamily="Avenir Next"
      fontWeight="bold"
      fontSize="14px"
      color="#808080"
    >
      {children}
    </Text>
  );

  const LinkComponent = ({ children, path }) => (
    <Link target="_blank" href={path}>
      {children}
    </Link>
  );

  return (
    <HStack
      spacing={{base: 4, lg: 24}}
      width={"100%"}
      alignItems={"baseline"}
      justifyContent={{ base: 'space-between', lg: "end" }}
    >
      <Box>
        <VStack align="stretch" spacing={3}>
          <Header>Get to know us</Header>

          <VStack align="stretch" spacing={3}>
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
        <VStack align="stretch" spacing={3}>
          <Header>Recourses</Header>
          <VStack align="stretch" spacing={3}>
            <Link
              target="_blank"
              href="https://droplinked.gitbook.io/droplinked-commerce-help-center"
            >
              <Sublink>Help center</Sublink>
            </Link>
            <a
              href="https://drive.google.com/file/d/1b5cggMs0D94Dl2e92-JIP_NPAMK2pjrr/view?usp=sharing"
              target="_blank"
              download
            >
              <Sublink>Media kit</Sublink>
            </a>
          </VStack>
        </VStack>
      </Box>

      <VStack align="stretch" spacing={33}>
        <VStack align="stretch" spacing={3}>
          <Header>Services</Header>

          <VStack align="stretch" spacing={3}>
            <Link target="_blank" href="https://events.droplinked.com">
              <Sublink>Events</Sublink>
            </Link>

            <Link target="_blank" href="https://www.flatlay.io">
              <Sublink>Flatlay</Sublink>
            </Link>
          </VStack>
        </VStack>
      </VStack>
    </HStack>
  );
}

export default Links;
