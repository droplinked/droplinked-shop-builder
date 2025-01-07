import React from 'react';
import { Box, Text, Flex, VStack, HStack, Button, Badge } from '@chakra-ui/react';
import SectionContainer from 'pages/settings/components/common/SectionContainer';
import SectionContent from 'pages/settings/components/common/SectionContent';


function WalletConfig({ title, description, badgeText, badgeBg, buttonText, inputPlaceholder }) {
  return (
    <SectionContainer
      title={title}
      badge={
        badgeText ? (
          <Badge bg={badgeBg} color="white" px="2" py="1" borderRadius="md">
            {badgeText}
          </Badge>
        ) : null
      }
      rightContent={
        <Button variant="ghost" color="#179ef8" size="sm">
          {buttonText}
        </Button>
      }
    >
      <SectionContent
        title="Address"
        description={description}
        rightContent={
          <HStack spacing="4" align="start" width="100%">
            {/* Wallet Input */}
            <VStack spacing="2" align="start" flex="1">
              <Flex
                border="1px solid #7b7b7b"
                borderRadius="lg"
                px="4"
                py="2"
                align="center"
                justify="space-between"
                width="100%"
              >
                <Text color="#4f4f4f" fontSize="base">
                  {inputPlaceholder}
                </Text>
                <Button size="sm" bg="gray.800" color="#4f4f4f">
                  Save
                </Button>
              </Flex>
            </VStack>

            {/* Percentage Input */}
            <Flex
              border="1px solid #282828"
              borderRadius="lg"
              px="4"
              py="3"
              align="center"
              justify="center"
              width="88px"
            >
              <Text color="#4f4f4f" fontSize="base">
                100
              </Text>
            </Flex>

            {/* Action Icons */}
            <HStack>
              <Box p="3" borderRadius="lg" bg="gray.800" />
              <Box p="3" borderRadius="lg" bg="gray.800" />
            </HStack>
          </HStack>
        }
      >
        <Text fontSize="base" color="#179ef8" fontWeight="medium">
          Learn more
        </Text>
      </SectionContent>
    </SectionContainer>
  );
}

export default WalletConfig;
