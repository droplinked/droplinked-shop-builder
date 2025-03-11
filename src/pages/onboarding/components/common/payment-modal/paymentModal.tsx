import { Flex, VStack, Text, Box } from '@chakra-ui/react';
import { CreditcardLg } from 'assets/icons/Finance/CreditCard/CreditcardLg';
import AppModal from 'components/redesign/modal/AppModal';
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData';
import { PlanType } from 'pages/onboarding/types/onboarding';
import React, { useState } from 'react';
import { subscriptionPlans } from 'utils/constants/subscriptionPlans';
import BillingSummary from './BillingSummary';
import CreditCardForm from './CreditCardForm';
import PlanCard from './planCard';
import {InformationSm} from 'assets/icons/Sign/Information/InformationSm'

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: PlanType;
}

interface CardData {
  number: string;
  expirationDate: string;
  securityCode: string;
  country: string;
  zipCode: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, plan }) => {
  const planDetail = subscriptionPlans[plan];
  const [cardData, setCardData] = useState<CardData>({
    number: '',
    expirationDate: '',
    securityCode: '',
    country: '',
    zipCode: ''
  });

  const handleChange = (field: keyof CardData, value: string) => {
    setCardData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Form submitted:', cardData);
  };

  return (
    <AppModal
      modalRootProps={{
        isOpen,
        onClose,
        size: '5xl',
        isCentered: true
      }}
      modalContentProps={{
        width: { base: '100%', md: '100%', lg: '1200px' },
        height: { base: '85vh', md: '85vh', lg: '95vh' },
        position: { base: 'fixed', md: 'fixed', lg: 'relative' },
        bottom: { base: 0, md: 0, lg: 'auto' },
        top: { base: 'auto', md: 'auto', lg: 'auto' },
        margin: { base: '0', md: '0', lg: 'auto' }
      }}
    >
      <Flex flexDirection={{ base: 'column', lg: 'row' }} h="100%" position="relative">
        {/* Credit Card Information */}
        <Flex 
          flex={1} 
          flexDirection="column" 
          overflow="hidden"
          h="100%"
        >
          <ModalHeaderData icon={<CreditcardLg color="white" />} title="Credit card information" description="Choose a credit card on file or add a new one." />
          <CreditCardForm cardData={cardData} onCardDataChange={handleChange} onDiscard={onClose} onSubmit={handleSubmit} planTitle={planDetail.title} />
        </Flex>

        <VStack 
          display={{ base: 'none', lg: 'flex' }}
          flex="0 0 50%" 
          bg="neutral.background" 
          p={6} 
          alignItems="flex-start" 
          spacing={4} 
          marginBlock={{ lg: -12, md: -8, base: -4 }}
          h="200%"
        >
          <PlanCard plan={planDetail} />
          <BillingSummary subscriptionCost={179} tax={0.99} total="Free" />
          <Flex w="473px" alignItems="start" gap={1}>
          
              <InformationSm />
            <Text
              flex={1}
              textAlign="center"
              color="#7b7b7b" 
              fontSize="xs"
              fontFamily="Inter"
              lineHeight="none"
            >
              Your account will be automatically charged for renewal once the free trial ends.
            </Text>
          </Flex>
        </VStack>
      </Flex>
    </AppModal>
  );
};

export default PaymentModal;
