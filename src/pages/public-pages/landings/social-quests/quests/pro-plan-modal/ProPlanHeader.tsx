import { Box, Flex, Text } from "@chakra-ui/react";
import { MedalstarLg } from "assets/icons/System/MedalStar/MedalstarLg";
import React from "react";

const ProPlanHeader: React.FC<{ unlockedMonths: number }> = ({ unlockedMonths }) => {
  return (
    <Box w="100%">
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        position="relative"
        zIndex={2}
      >
        <Flex
          p={2}
          bg="rgba(43, 206, 161, 0.1)"
          borderRadius="lg"
          border="1px solid rgba(43, 206, 161, 0.1)"
          alignItems="center"
          mb={6}
        >
          <MedalstarLg color="#2BCFA1" />
        </Flex>
        <Text mb={2} fontSize="2xl" fontWeight="bold" color="white">
          Free Pro Plan Unlocked!
        </Text>
        <Text
          fontSize="md"
          color="text.subtext.placeholder.light"
          textAlign="center"
        >
          You now have access to the Pro Plan for {unlockedMonths} month for free.
        </Text>
      </Flex>
    </Box>
  );
};

export default ProPlanHeader;
