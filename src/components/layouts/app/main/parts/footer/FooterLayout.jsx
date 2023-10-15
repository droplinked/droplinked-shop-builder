import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import Description from "./parts/description";
import Links from "./parts/links";
import BottomComponent from "./parts/bottom/BottomComponent";

export default function FooterLayout() {

  return (
    <VStack
      w="100%"
      padding="60px 0"
      backgroundColor="black"
      position="relative"
    >
      <VStack align="stretch" width="90%" maxWidth="1400px">
        <Flex
          flexDir={{ base: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ base: "start", md: "center" }}
          mb={{ base: '86px', md: "54px" }}
          gap="30px"
        >
          <Description />
          <Links />
        </Flex>
        <BottomComponent />
      </VStack>
    </VStack>
  );
}
