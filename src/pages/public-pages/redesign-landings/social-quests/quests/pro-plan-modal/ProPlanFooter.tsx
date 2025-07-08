import { Box, Flex, Text } from "@chakra-ui/react";
import AppButton from "components/redesign/button/AppButton";
import useShopSubscriptionData from "hooks/shop-subscription-data/useShopSubscriptionData";
import React from "react";
import { useNavigate } from "react-router-dom";
import useAppStore from "stores/app/appStore";

const ProPlanFooter: React.FC = () => {
  const navigate = useNavigate();
  const { refetch, isFetching } = useShopSubscriptionData();
  const { shop, fetchShop, loading } = useAppStore();

  const handleButtonClick = async () => {
    try {
      await refetch();
      await fetchShop({ shopName: shop.name });
      navigate('/analytics/dashboard');
    } catch (error) {
      console.error('Failed to refresh subscription data:', error);
    }
  };

  return (
    <>
      <Text
        fontSize="sm"
        textAlign="center"
        gap={1}
        mt={6}
        mb="48px"
        paddingInline="48px"
        color="text.subtext.placeholder.dark"
      >
        If you unfollow us at any time, your Pro Plan benefits will be revoked.
        Make sure to remain a follower to continue enjoying premium features!
      </Text>

      <Box
        w="full"
        h="0"
        border="1px solid"
        borderColor="neutral.gray.900"
      />

      <Flex py={9} px={12} gap={4} w="full">
        <AppButton flex={1} onClick={handleButtonClick} isLoading={isFetching || loading}>
          Go to Dashboard
        </AppButton>
      </Flex>
    </>
  );
};

export default ProPlanFooter;
