import { Box, Button, Divider, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import AppBadge from 'components/common/badge/AppBadge';
import SectionContainer from 'pages/settings/components/common/SectionContainer';
import SectionContent from 'pages/settings/components/common/SectionContent';
import React from 'react';

const MerchantWallet: React.FC = () => {
  return (
    <>
      <SectionContainer
        title=" Merchant Wallet"
        badge={<AppBadge text={'Default'} status="yellow" bg="#ffd9511a" color="#ffd850" px="2" py="1" borderRadius="md"></AppBadge>}
        rightContent={
          <Flex gap="2">
            <Button variant="ghost" color="white" size="sm">
              Manage
            </Button>
            <Button variant="ghost" color="#179ef8" size="sm">
              Recharge
            </Button>
          </Flex>
        }
      >
        <SectionContent
          title=" Address"
          description=" The merchant wallet enables USDC acceptance for all businesses. It offers a secure and seamless way to manage revenue while minimizing merchant processing fees.
             "
          rightContent={
            <VStack align="start" spacing="2">
              <Flex border="1px solid #282828" borderRadius="lg" px="4" py="3" align="center" justify="space-between" width="100%">
                <Text color="white" fontSize="base">
                  0xe29E7479c23Db494aAa0D36C93844B2d79f50c2245
                </Text>
              </Flex>
            </VStack>
          }
        >
          <Flex gap="9">
            <HStack>
              <Box p="2" bg="#2bcea11a" borderRadius="50px" />
              <Text color="white" fontSize="sm">
                Secure
              </Text>
            </HStack>
            <HStack>
              <Box p="2" bg="#2bcea11a" borderRadius="50px" />
              <Text color="white" fontSize="sm">
                Instant
              </Text>
            </HStack>
            <HStack>
              <Box p="2" bg="#2bcea11a" borderRadius="50px" />
              <Text color="white" fontSize="sm">
                Automatic Conversion
              </Text>
            </HStack>
          </Flex>
        </SectionContent>
      </SectionContainer>
      <Divider borderColor={'#292929'} />
    </>
  );
};

export default MerchantWallet;
