import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { Refresh1Md } from "assets/icons/Action/Refresh1/Refresh1Md";
import { DashboardMd } from "assets/icons/System/Dashboard/DashboardMd";
import { ShieldMd } from "assets/icons/System/Shield/ShieldMd";
import { SuitcaseLg } from "assets/icons/System/SuitCase/SuitcaseLg";
import IconWrapper from "components/redesign/icon-wrapper/IconWrapper";
import React from "react";

const ProPlanCard: React.FC<{ unlockedMonths: number }> = ({ unlockedMonths }) => {
  return (
    <Box
      borderRadius="2xl"
      border="1px solid"
      bg="url(https://upload-file-droplinked.s3.amazonaws.com/52035efed229f3e0e5b71851990da1ea02958f364a93d2341e7567ec8188aa56.png)"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      borderColor="label.primary"
      backdropFilter="blur(150px)"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="start"
      overflow="hidden"
    >
      <VStack p={6} w="full" gap={4} alignItems="start">
        <IconWrapper
          bg="label.primary"
          borderColor="label.primary"
          icon={<SuitcaseLg />}
        />

        <VStack w="full" gap={2} alignItems="start">
          <VStack w="full" gap={0.5} alignItems="start">
            <Text fontSize="lg" fontWeight="500" color="white" lineHeight="7">
              Pro Plan - {unlockedMonths} Month
            </Text>
            <Text
              fontSize="sm"
              color="text.subtext.placeholder.light"
              fontWeight="normal"
              lineHeight="tight"
            >
              For small businesses and teams ready to grow.
            </Text>
          </VStack>
        </VStack>

        <Flex w="full" justify="start" alignItems="center" gap={6}>
          <Flex justify="center" alignItems="center" gap={2}>
            <ShieldMd color="#2BCFA1" />
            <Text
              fontSize="sm"
              color="white"
              fontWeight="normal"
              lineHeight="tight"
            >
              Pro Access
            </Text>
          </Flex>

          <Flex justify="center" alignItems="center" gap={2}>
            <DashboardMd color="#2BCFA1" />
            <Text
              fontSize="sm"
              color="white"
              fontWeight="normal"
              lineHeight="tight"
            >
              Cancel anytime
            </Text>
          </Flex>

          <Flex justify="center" alignItems="center" gap={2}>
            <Refresh1Md color="#2BCFA1" />
            <Text
              fontSize="sm"
              color="white"
              fontWeight="normal"
              lineHeight="tight"
            >
              Seamless Activation
            </Text>
          </Flex>
        </Flex>
      </VStack>
    </Box>
  );
};

export default ProPlanCard;
