import { Box, Text } from "@chakra-ui/react";
import React from "react";

const SectionHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      alignSelf="stretch"
      borderRadius="lg"
      px={6}
      py={4}
      bg="#1C1C1C"
      color="white"
    >
      <Text fontSize="xl" fontWeight="bold">
        {children}
      </Text>
    </Box>
  );
};

export default SectionHeader;