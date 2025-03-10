import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import AppTooltip from 'components/common/tooltip/AppTooltip';
import { TooltipLg } from 'assets/icons/Sign/Tooltip/TooltipLg';
import React from 'react';

interface props {
  icon: React.ReactNode;
  title: string;
  tooltip: string;
}

function PaymentProviderCard({ icon, title, tooltip }: props) {
  return (
    <HStack p="4" spacing="4">
      <Flex alignItems={'center'} justifyContent={'center'} w="12" h="12" p="3" bg="#1b1b1b" border="1px solid #282828" borderRadius="lg">
        {icon}
      </Flex>
      <Flex flex="1" align="center" gap="2">
        <Text color="white" fontSize="base" fontWeight="medium">
          {title}
        </Text>
        <AppTooltip label={tooltip}>
          <Box cursor="pointer">
            <TooltipLg color="#292929" />
          </Box>
        </AppTooltip>
      </Flex>
      <Text color={'text.primary'}>connect</Text>
    </HStack>
  );
}

export default PaymentProviderCard; 