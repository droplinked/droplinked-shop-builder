import { Box, Divider, Menu, MenuList, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { useQuery } from 'react-query';
import { getShopCredit } from 'lib/apis/shop/shopServices';
import useAppStore from 'lib/stores/app/appStore';
import { useCurrencyConverter } from 'hooks/useCurrencyConverter/useCurrencyConverter';
import { useProfile } from 'hooks/useProfile/useProfile';
import { useCustomNavigate } from 'hooks/useCustomeNavigate/useCustomNavigate';
import { PROFILE_CONSTANTS, SUBSCRIPTION_STATUS_CONSTANTS } from 'components/layouts/dashboard/constants';
import UserMenuButton from './components/UserMenuButton';
import UserInfo from './components/UserInfo';
import SubscriptionInfo from './components/SubscriptionInfo';
import ProfileMenuItems from './components/ProfileMenuItems';
import AppVersion from './components/AppVersion';

const UserMenu = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { isFetching, data } = useQuery({
    queryKey: ['shop-credit'],
    queryFn: () => getShopCredit(),
    enabled: isOpen
  });

  const credit = data?.data?.data?.credit ?? 0;
  const convertCurrency = useCurrencyConverter();
  const { getFormattedPrice } = convertCurrency;
  const { shopNavigate } = useCustomNavigate();
  const { shop, user } = useAppStore();
  const { logoutUser } = useProfile();

  const subscription = SUBSCRIPTION_STATUS_CONSTANTS({ STARTER: () => shopNavigate('/dashboard/plans') }, shop?.subscription?.daysUntilExpiration)[shop?.subscription?.subscriptionId?.type];

  const profileConstants = PROFILE_CONSTANTS(shop, logoutUser, convertCurrency);

  return (
    <Menu isOpen={isOpen} onOpen={onOpen} onClose={onClose} variant="unstyled">
      <UserMenuButton />
      <MenuList right="16px" borderRadius="8px" background="#222" border="none" width="352px">
        <Box gap="16px" width="full" display="flex" padding="24px" flexDirection="column">
          <UserInfo shop={shop} user={user} />
          <Divider borderColor="neutral.gray.800" />
          <SubscriptionInfo subscription={subscription} />
          <Divider borderColor="neutral.gray.800" />
          <ProfileMenuItems profileConstants={profileConstants} isFetching={isFetching} credit={credit} getFormattedPrice={getFormattedPrice} />
          <Divider borderColor="neutral.gray.800" />
          <AppVersion />
        </Box>
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
