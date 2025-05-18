import { Box, Divider, Menu, MenuList, useDisclosure } from '@chakra-ui/react';
import { PROFILE_CONSTANTS, SUBSCRIPTION_STATUS_CONSTANTS } from 'components/layouts/dashboard/constants';
import { useCurrencyConverter } from 'hooks/useCurrencyConverter/useCurrencyConverter';
import { useCustomNavigate } from 'hooks/useCustomeNavigate/useCustomNavigate';
import { useProfile } from 'hooks/useProfile/useProfile';
import useShopUrl from 'hooks/useShopUrl/useShopUrl';
import { getShopCredit } from 'lib/apis/shop/shopServices';
import useAppStore from 'stores/app/appStore';
import React from 'react';
import { useQuery } from 'react-query';
import AppVersion from './components/AppVersion';
import ProfileMenuItems from './components/ProfileMenuItems';
import SubscriptionInfo from './components/SubscriptionInfo';
import UserInfo from './components/UserInfo';
import UserMenuButton from './components/UserMenuButton';

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
  const shopUrl = useShopUrl()

  const subscription = SUBSCRIPTION_STATUS_CONSTANTS({ STARTER: () => shopNavigate('/dashboard/plans') }, shop?.subscription?.daysUntilExpiration)[shop?.subscription?.subscriptionId?.type];

  const profileConstants = PROFILE_CONSTANTS({ ...shop, shopUrl }, logoutUser, convertCurrency);

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
