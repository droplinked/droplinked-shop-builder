import { Box, Spinner } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import DashboardLinkWrapper from 'components/layouts/dashboard/components/common/DashboardLinkWrapper';

import React from 'react';

const ProfileMenuItems = ({ profileConstants, isFetching, credit, getFormattedPrice }) => {
  return (
    <Box display="flex" flexDirection="column">
      {profileConstants?.map((item) => (
        <DashboardLinkWrapper key={item?.title?.label} isExternalLink={item?.isExternalLink} linkTo={item?.linkTo}>
          <Box display="flex" height="52px" padding="16px" alignItems="center" gap="12px" cursor={item?.linkTo || item?.action ? 'pointer' : 'default'} onClick={() => item?.action?.()}>
            <item.icon.svg width="20px" height="20px" {...item?.title?.style} />
            <AppTypography color="#FFF" flex="1" fontSize="14px">
              {item?.title?.label}
            </AppTypography>
            {item?.rightSide?.value && (
              <Box {...item?.rightSide?.style}>
                {item.title.label === 'Credit' ? isFetching ? <Spinner /> : getFormattedPrice({ amount: credit, toUSD: false, toFixed: true }) : item?.rightSide?.value}
              </Box>
            )}
          </Box>
        </DashboardLinkWrapper>
      ))}
    </Box>
  );
};

export default ProfileMenuItems;
