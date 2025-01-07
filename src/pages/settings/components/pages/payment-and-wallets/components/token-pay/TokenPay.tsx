import { Box, Button, Image, Text, VStack } from '@chakra-ui/react';
import SectionContainer from 'pages/settings/components/common/SectionContainer';
import SectionContent from 'pages/settings/components/common/SectionContent';
import React from 'react';

const TokenPay: React.FC = () => {
  return (
    <>
      <SectionContainer
        title="Tokenpay"
        rightContent={
          <Button variant="ghost" color="#179ef8" size="sm">
            Payment Token
          </Button>
        }
      >
        <SectionContent
          title="Payment Tokens"
          description=" Enable checkout payments for any native ERC20, BRC20 and SPL (Solana) based tokens."
          rightContent={<Image src="/assets/images/Revenue Sharing.svg" height="100%" width="100%" />}
        >
          <VStack spacing="4" align="start" width="100%">
            {/* Learn More Text */}
            <Text fontSize="base" color="#179ef8" fontWeight="medium">
              Learn more
            </Text>

            {/* Wallet Requirement Box */}
            <Box p="4" bg="#ffd9511a" border="1px solid #ffd850" borderRadius="lg">
              <Text fontSize="sm" fontWeight="bold" color="white">
                Wallet Requirement
              </Text>
              <Text fontSize="sm" color="white">
                In order to receive native token payments with Tokenpay, you must connect an EVM or Solana based wallet. Otherwise, all received money will be converted to USD/USDC and applied to
                credits.
              </Text>
            </Box>
          </VStack>
        </SectionContent>
      </SectionContainer>
    </>
  );
};

export default TokenPay;
