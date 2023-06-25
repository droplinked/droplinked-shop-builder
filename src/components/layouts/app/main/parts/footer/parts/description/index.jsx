import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import droplinkFull from "assest/image/droplinkFull.svg";
import AppTypography from "components/common/typography/AppTypography";

function Description() {
  return (
    <VStack
      align="stretch"
      spacing={5}
      w="max-content"
    >
      <Image src={droplinkFull} maxW="210px" h="auto" mb="18px" />

      <Text
        fontFamily="Avenir Next"
        fontSize="12px"
        fontWeight="500"
        color="lightGray"
        mb="18px"
        w='max-content'
      >
        <AppTypography size="12px" weight="bolder" display={"inline-block"}>Community driven commerce</AppTypography>
        <br />
        Launch a drop in minutes & unlock the power of web3.
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
