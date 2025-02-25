import { Spinner, Text } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import React from 'react';
import { CARD_STATUSES, CardStatus } from '../../../hook/useFollowStatus';

interface StatusIndicatorProps {
  status: CardStatus;
  loading: boolean;
  platform: string;
}

const StatusIndicator = ({ status, loading, platform }: StatusIndicatorProps) => {
  if (loading) {
    return <Spinner thickness="4px" speed="0.8s" color="primary" size="lg" />;
  }

  switch (status) {
    case CARD_STATUSES.NOT_FOLLOWED:
      return (
        <Text color="#2BCFA1" textAlign="center" fontSize="14px" fontWeight="500" lineHeight="24px" whiteSpace="nowrap">
          Claim Reward
        </Text>
      );

    case CARD_STATUSES.FOLLOWED:
      return <AppIcons.Tick width="24px" height="24px" color="#2BCFA1" />;

    case CARD_STATUSES.NOT_OPENED:
    case CARD_STATUSES.GUEST:
    default:
      return <AppIcons.ExternalArrow />;
  }
};

export default StatusIndicator;
