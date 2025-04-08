import { Box, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import AppIcons from 'assets/icon/Appicons';
import AppTooltip from 'components/common/tooltip/AppTooltip';
import AppTypography from 'components/common/typography/AppTypography';
import React from 'react';

const UserInfo = ({ shop, user }) => {
  const getShopInfo = () => {
    const text = shop?.description || shop?.name;
    if (!text) return '';
    return text.length <= 15 ? text : <AppTooltip label={text}>{`${text.slice(0, 15)}...`}</AppTooltip>;
  };

  return (
    <Box display="flex" alignItems="center" gap="16px" width="full">
      <Image width="48px" height="48px" src={shop?.logo} borderRadius="full" objectFit="contain" />
      <Box display="flex" flexDirection="column" flex="1">
        <AppTypography color="#FFF" fontSize="16px" fontWeight="600">
          {user?.firstName && user?.lastName ? `${user?.firstName} ${user?.lastName}` : 'Welcome'}
        </AppTypography>
        <AppTypography color="neutral.gray.400" fontSize="12px">
          {getShopInfo()}
        </AppTypography>
      </Box>
      <Link to="/shop-management">
        <AppIcons.ProfileSwitch width="20px" height="20px" />
      </Link>
    </Box>
  );
};

export default UserInfo;
