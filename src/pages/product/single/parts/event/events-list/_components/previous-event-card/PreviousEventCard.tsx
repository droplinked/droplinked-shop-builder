import React from "react";
import { Flex, Box, Image } from "@chakra-ui/react";
import AppTypography from "components/common/typography/AppTypography";

interface IPreviousEventCard {
  imageSrc: string;
  text: string;
}

const PreviousEventCard = ({ imageSrc, text }: IPreviousEventCard) => {
  return (
    <Flex
      alignItems={"flex-start"}
      flexDirection={"column"}
      gap={"12px"}
      padding={"12px"}
      width={"100%"}
      maxWidth={"263px"}
      borderRadius={"12px"}
      border={"1px solid #2BCFA1"}
      position="relative"
    >
      <Box
        position="relative"
        width={"100%"}
        maxWidth={"239px"}
        height={"120px"}
        borderRadius={"10px"}
        overflow="hidden"
      >
        <Image
          src={imageSrc}
          width={"100%"}
          height={"100%"}
          objectFit={"cover"}
          borderRadius={"10px"}
        />
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          background={"linear-gradient(180deg, rgba(46, 201, 158, 0.00) 0%, #2EC99E 100%)"}
          borderRadius={"10px"}
        />
      </Box>
      <AppTypography fontSize={"16px"} fontWeight={700} color={"#2BCFA1"}>
        {text}
      </AppTypography>
    </Flex>
  );
};

export default PreviousEventCard;
