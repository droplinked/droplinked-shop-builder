import React from 'react';
import { Box, Divider, Flex, HStack, Spinner, Text } from '@chakra-ui/react';
import SwitchBox from 'components/redesign/switch-box/SwitchBox';
import AppTooltip from 'components/common/tooltip/AppTooltip';
import AppIcons from 'assets/icon/Appicons';
import { useFormikContext } from 'formik';
import { ISettings } from 'pages/settings/formConfigs';
import ExternalLink from 'components/redesign/external-link/ExternalLink';

const PaymentProviderCard = ({ title, buttonText, onToggle, type, link, tooltip, icon, isExternal, isDisabled, isFetching }) => {
  const { values } = useFormikContext<ISettings>();

  // Determine if the switch is checked based on whether the token is active in paymentMethods
  const isChecked = !!values.paymentMethods.find((item) => item.type === type.toUpperCase())?.isActive;

  const handleToggle = (e) => {
    onToggle(e);
  };

  return (
    <Box flex={1} width={{ base: "100%", xxl: "448px" }} border="1px solid #282828" borderRadius="lg" overflow="hidden">
      <HStack p="4" spacing="4">
        <Flex alignItems={"center"} justifyContent={"center"} w="12" h="12" p="3" bg="#1b1b1b" border="1px solid #282828" borderRadius="lg">
          {icon}
        </Flex>
        <Flex flex="1" align="center" gap="2">
          <Text color="white" fontSize="base" fontWeight="medium">
            {title}
          </Text>
          {tooltip &&
            <AppTooltip flexShrink={0} placement="bottom-start" label={tooltip}>
              <AppIcons.TooltipIcon fill={'#292929'} />
            </AppTooltip>
          }
        </Flex>
        <SwitchBox isDisabled={isDisabled} isChecked={isChecked} onToggle={handleToggle} />
      </HStack>
      {
        link && <>
          <Divider borderColor="#282828" />
          <Flex py={"14px"} textAlign="center" justifyContent={"center"}>
            <ExternalLink
              href={link}
              textDecor={"none"}
              display={"flex"}
              alignItems={"center"}
              fontSize={16}
              fontWeight={500}
              gap={"6px"}
              target='_blank'
              color={isExternal ? "#179EF8" : "#2BCFA1"}
              hasArrow={isExternal ? true : false}
            >
              {isFetching ? <Spinner size={"sm"} /> : buttonText}
            </ExternalLink>
          </Flex>
        </>
      }
    </Box>
  );
};

export default PaymentProviderCard;
