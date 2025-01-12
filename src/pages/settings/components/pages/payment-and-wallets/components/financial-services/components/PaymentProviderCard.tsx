import React from 'react';
import { Box, Divider, Flex, HStack, Text } from '@chakra-ui/react';
import SwitchBox from 'components/redesign/switch-box/SwitchBox';
import NavigationLink from 'pages/settings/components/common/NavigationLink';
import AppTooltip from 'components/common/tooltip/AppTooltip';
import AppIcons from 'assest/icon/Appicons';

const PaymentProviderCard = ({ title, buttonText, isChecked, onToggle, link, tooltip, icon }) => {
  return (
    <Box width={{ base: "100%", sm: "100%", md: "448px" }} ml={"auto"} border="1px solid #282828" borderRadius="lg" overflow="hidden">
      <HStack p="4" spacing="4">
        <Flex alignItems={"center"} justifyContent={"center"} w="12" h="12" p="3" bg="#1b1b1b" border="1px solid #282828" borderRadius="lg">
          {icon}
        </Flex>
        <Flex flex="1" align="center" gap="2">
          <Text color="white" fontSize="base" fontWeight="medium">
            {title}
          </Text>
          <AppTooltip flexShrink={0} placement="bottom-start" label={tooltip}>
            <AppIcons.TooltipIcon fill={'#292929'} />
          </AppTooltip>
        </Flex>
        <SwitchBox isChecked={isChecked} onToggle={onToggle} />
      </HStack>
      <Divider borderColor="#282828" />
      <Flex p={2} textAlign="center" justifyContent={"center"}>
        <NavigationLink to={link} title={buttonText} />
      </Flex>
    </Box>
  );
};

export default PaymentProviderCard;
