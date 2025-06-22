import { Box, Flex, Image, ModalBody, Text, VStack } from '@chakra-ui/react';
import { Refresh1Md } from 'assets/icons/Action/Refresh1/Refresh1Md';
import { ChevrondownMd } from 'assets/icons/Navigation/ChevronDown/ChevrondownMd';
import { AvailableoutlinedSm } from 'assets/icons/Sign/AvailableOutlined/AvailableoutlinedSm';
import { DashboardMd } from 'assets/icons/System/Dashboard/DashboardMd';
import { MedalstarLg } from 'assets/icons/System/MedalStar/MedalstarLg';
import { ShieldMd } from 'assets/icons/System/Shield/ShieldMd';
import { SuitcaseLg } from 'assets/icons/System/SuitCase/SuitcaseLg';
import AppButton from 'components/redesign/button/AppButton';
import IconWrapper from 'components/redesign/icon-wrapper/IconWrapper';
import AppModal from 'components/redesign/modal/AppModal';
import PlanDurationRadioContainer from 'components/redesign/plan-duration-radio/PlanDurationRadioContainer';
import PaymentModal from 'components/modals/payment-modal/PaymentModal';
import { getFeaturesWithInheritance } from 'pages/onboarding/components/subscription-plans/utils';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getSubscriptionPlansService } from 'lib/apis/subscription/subscriptionServices';
import useSubscriptionPlanPurchaseStore from 'stores/subscription-plan.ts/subscriptionPlanStore';

export interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ProPlanModal = ({ isOpen, onClose }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const { preferredPlanDuration } = useSubscriptionPlanPurchaseStore((state) => ({
    preferredPlanDuration: state.preferredPlanDuration
  }));

  // Fetch subscription plans from backend
  const { data: subscriptionPlansData } = useQuery({
    queryKey: ["subscription-plans"],
    queryFn: () => getSubscriptionPlansService(),
  });

  // Find the BUSINESS plan
  const businessPlan = subscriptionPlansData?.data?.find((plan) => plan.type === "BUSINESS");

  // Get the original price based on selected duration from backend
  const getOriginalPrice = () => {
    if (!businessPlan || typeof businessPlan.price === 'string') {
      return 0;
    }

    const targetPrice = businessPlan.price.find((price) => price.month === preferredPlanDuration.month);
    return targetPrice ? parseFloat(targetPrice.price) : 0;
  };


  return (
    <AppModal modalRootProps={{ isOpen, onClose, size: 'xl', isCentered: true }} modalContentProps={{ width: 'auto !important', padding: '0px !important' }}>
      <ModalBody bg="neutral.grey.1000" display="flex" flexDirection="column" justifyContent="center" alignItems="center" padding="0px !important" rounded="24px">
        <Box w="100%">
          <Image src="https://upload-file-droplinked.s3.amazonaws.com/a8127623df1b0dc11be743677f3ca3c1eb5c0d2251d5801eb61a96835ac39ce9.png" position="absolute" />
          <Flex p={6} flexDirection="column" justifyContent="center" alignItems="center" gap={6} position="relative" zIndex={2}>
            <Flex p={3} bg="rgba(43, 206, 161, 0.1)" borderRadius="lg" border="1px solid rgba(43, 206, 161, 0.1)" alignItems="center" gap={2}>
              <MedalstarLg color="#2BCFA1" />
            </Flex>
            <Text fontSize="2xl" fontWeight="bold" color="white">
              Use droplinked AI to Create A Shop
            </Text>
            <Text fontSize="md" color="text.subtext.placeholder.light" textAlign="center">
              Feel free to use the AI tools to customize shops and inventory. Add your details below to get started.∫∫
            </Text>
          </Flex>
        </Box>

        <Box mb="6" zIndex={3}>
          <PlanDurationRadioContainer bgColor="neutral.gray.900" showBorder={true} />
        </Box>

        <Box
          borderRadius="2xl"
          border="1px solid"
          bg="label.primary"
          borderColor="main.primary"
          backdropFilter="blur(150px)"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="start"
          overflow="hidden"
        >
          <VStack p={6} w="full" gap={4} alignItems="start">
            <IconWrapper bg="label.primary" borderColor="label.primary" icon={<SuitcaseLg />} />

            <VStack w="full" gap={2} alignItems="start">
              <VStack w="full" gap={0.5} alignItems="start">
                <Text fontSize="lg" fontWeight="bold" color="white" lineHeight="7">
                  Pro
                </Text>
                <Text fontSize="sm" color="text.subtext.placeholder.light" fontWeight="normal" lineHeight="tight">
                  For small businesses and teams ready to grow.
                </Text>
              </VStack>

              <Flex justify="end" alignItems="end" gap={2}>
                <Text fontSize="2xl" fontWeight="bold" color="white">
                  Free
                </Text>
                <Text textAlign="center" color="text.error" fontSize="lg" fontWeight="medium" textDecoration={'line-through'}>
                  ${getOriginalPrice().toFixed(2)}
                </Text>
              </Flex>
            </VStack>

            <Flex w="full" justify="start" alignItems="center" gap={6}>
              <Flex justify="center" alignItems="center" gap={2}>
                <ShieldMd color="#2BCFA1" />
                <Text fontSize="sm" color="white" fontWeight="normal" lineHeight="tight">
                  Pro Access
                </Text>
              </Flex>

              <Flex justify="center" alignItems="center" gap={2}>
                <DashboardMd color="#2BCFA1" />
                <Text fontSize="sm" color="white" fontWeight="normal" lineHeight="tight">
                  Cancel anytime
                </Text>
              </Flex>

              <Flex justify="center" alignItems="center" gap={2}>
                <Refresh1Md color="#2BCFA1" />
                <Text fontSize="sm" color="white" fontWeight="normal" lineHeight="tight">
                  Seamless Activation
                </Text>
              </Flex>
            </Flex>
          </VStack>

          <Box w="full" h="0" border="1px solid" borderColor="label.primary" />
          {isExpanded ? (
            <>
              <Box p={4}>
                {getFeaturesWithInheritance('BUSINESS').map((feature) => (
                  <Flex key={feature} gap={2} mb={4} alignItems="center">
                    <AvailableoutlinedSm color="white" />
                    <Text textColor="neutral.white" flex={1} fontSize="sm">
                      {feature}
                    </Text>
                  </Flex>
                ))}
              </Box>
              <Box w="full" h="0" border="1px solid" borderColor="label.primary" />
            </>
          ) : null}

          <Flex w="full" px={4} py={2.5} justify="center" alignItems="center" gap={1.5} onClick={() => setIsExpanded(!isExpanded)}>
            <Text fontSize="sm" color="white" fontWeight="normal" lineHeight="tight">
              More
            </Text>
            <ChevrondownMd />
          </Flex>
        </Box>

        <Box mt={9} w="full" h="0" border="1px solid" borderColor="neutral.gray.900" />

        <Flex py={9} px={12} gap={4} w="full">
          <AppButton variant="secondary" onClick={onClose}>
            Close
          </AppButton>
          <AppButton flex={1} onClick={() => setIsPaymentModalOpen(true)}>
            Claim Trial Now
          </AppButton>
        </Flex>
      </ModalBody>

      <PaymentModal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} plan="BUSINESS" onSuccess={() => {
        onClose()
      }} />
    </AppModal>
  );
};

export default ProPlanModal;
