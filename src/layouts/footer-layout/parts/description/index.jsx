import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import droplinkFull from "assest/image/droplinkFull.svg";

function Description() {
  return (
    <VStack align="stretch" spacing={5} >
      <Image src={droplinkFull} maxW="210px" h="auto" mb="18px" />

      <Text
        fontFamily="Avenir Next"
        fontSize="12px"
        fontWeight="500"
        color="lightGray"
        mb="18px"
      >
        Community driven commerce
        <Box />
        Lunch a drop in minutes and unlock the{" "}
        <Box d={{ base: "block", md: "none" }} /> power of Web3
      </Text>

      <a href="mailto:Support@droplinked.com">
        <Text
          fontFamily="Avenir Next"
          fontSize="12px"
          fontWeight="500"
          color="lightGray"
        >
          Support@droplinked.com
        </Text>
      </a>
    </VStack>
  );
}

export default Description;
