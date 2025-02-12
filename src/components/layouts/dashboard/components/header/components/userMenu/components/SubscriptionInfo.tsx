import { Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import AppTypography from 'components/common/typography/AppTypography';
import React from 'react';

const SubscriptionInfo = ({ subscription }) => {
  return (
    <Link to="/analytics/plans" style={{ display: 'flex', padding: '0 16px', alignItems: 'center', gap: '4px' }}>
      <Box display="flex" alignItems="center" gap="12px" flex="1">
        <subscription.icon width="20px" height="20px" color="white" />
        <AppTypography color="#FFF" fontSize="14px">{subscription.title}</AppTypography>
      </Box>
      <Box {...subscription.rightSide?.style}>{subscription.rightSide?.value}</Box>
    </Link>
  );
};

export default SubscriptionInfo;
