import { Box, Flex, Image, ModalBody, Text, VStack } from '@chakra-ui/react';
import { Refresh1Md } from 'assets/icons/Action/Refresh1/Refresh1Md';
import { ChevrondownMd } from 'assets/icons/Navigation/ChevronDown/ChevrondownMd';
import { AvailableoutlinedSm } from 'assets/icons/Sign/AvailableOutlined/AvailableoutlinedSm';
import { DashboardMd } from 'assets/icons/System/Dashboard/DashboardMd';
import { MedalstarLg } from 'assets/icons/System/MedalStar/MedalstarLg';
import { ShieldMd } from 'assets/icons/System/Shield/ShieldMd';
import { SuitcaseLg } from 'assets/icons/System/SuitCase/SuitcaseLg';
import PaymentModal from 'components/modals/payment-modal/PaymentModal';
import AppButton from 'components/redesign/button/AppButton';
import ExternalLink from 'components/redesign/external-link/ExternalLink';
import IconWrapper from 'components/redesign/icon-wrapper/IconWrapper';
import AppModal from 'components/redesign/modal/AppModal';
import PlanDurationRadioContainer from 'components/redesign/plan-duration-radio/PlanDurationRadioContainer';
import PlanPrice from 'components/redesign/plan-price/PlanPrice';
import { getSubscriptionPlansService } from 'lib/apis/subscription/subscriptionServices';
import { getFeaturesWithInheritance } from 'pages/onboarding/components/subscription-plans/utils';
import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import useAppStore from 'stores/app/appStore';

export interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ProPlanModal = ({ isOpen, onClose }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const { shop } = useAppStore();

  const canActivateTrial = shop.subscription.canActivateTrial;

  const handlePaymentSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['shop-subscription-plan'] });
    onClose();
  };

  const businessPlan = useQuery({
    queryKey: ['subscription-plans'],
    queryFn: () => getSubscriptionPlansService(),
    select: (data) => data.data.find((plan) => plan.type === 'BUSINESS')
  });

  return (
    <AppModal modalRootProps={{ isOpen, onClose, size: 'xl', isCentered: true }} modalContentProps={{ width: 'auto !important', padding: '0px !important' }}>
      <ModalBody bg="neutral.grey.1000" display="flex" flexDirection="column" justifyContent="center" alignItems="center" padding="0px !important" rounded="24px">
        <Box w="100%">
          <Image src="https://upload-file-droplinked.s3.amazonaws.com/a8127623df1b0dc11be743677f3ca3c1eb5c0d2251d5801eb61a96835ac39ce9.png" position="absolute" />
          <Flex p={12} flexDirection="column" justifyContent="center" alignItems="center" gap={2} position="relative" zIndex={2}>
            <Flex p={3} bg="rgba(43, 206, 161, 0.1)" borderRadius="lg" border="1px solid rgba(43, 206, 161, 0.1)" alignItems="center" gap={2}>
              <MedalstarLg color="#2BCFA1" />
            </Flex>
            <Text fontSize="2xl" fontWeight="bold" color="white">
              {canActivateTrial ? 'Use droplinked AI to Create A Shop' : 'Access Exclusive Features'}
            </Text>
            <Text fontSize="md" color="text.subtext.placeholder.light" textAlign="center">
              {canActivateTrial
                ? 'Feel free to use the AI tools to customize shops and inventory. Add your details below to get started.'
                : 'Upgrade today to take advantage of the benefits associated with a Premium Plan.'}
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

              <PlanPrice plan={businessPlan.data} showFree={canActivateTrial} />
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

          <Flex w="full" px={4} py={2} justify="center" alignItems="center" gap={1.5} onClick={() => setIsExpanded(!isExpanded)}>
            <Text fontSize="sm" color="white" fontWeight="normal" lineHeight="tight">
              More
            </Text>
            <ChevrondownMd />
          </Flex>
        </Box>

        {canActivateTrial ? (
          null
        ) : <Text display="flex" fontSize="sm" justifyContent="center" alignItems="center" gap={1} mt={6} color="white" > Still unsure? <ExternalLink onClick={() => window.open("/plans", "_blank")}>Compare plans and pricing options</ExternalLink></Text>}

        <Box mt={9} w="full" h="0" border="1px solid" borderColor="neutral.gray.900" />

        <Flex py={9} px={12} gap={4} w="full">
          <AppButton variant="secondary" onClick={onClose}>
            {canActivateTrial ? 'Close' : 'Keep Current Plan'}
          </AppButton>
          <AppButton flex={1} onClick={() => setIsPaymentModalOpen(true)}>
            {canActivateTrial ? 'Claim Trial Now' : 'Upgrade'}
          </AppButton>
        </Flex>
      </ModalBody>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        plan="BUSINESS"
        onSuccess={handlePaymentSuccess}
        successMessage="Trial activated successfully! Your Pro features are now available."
      />
    </AppModal>
  );
};

export default ProPlanModal;
