import React from 'react';
import { Flex, Grid, ModalBody, Text, VStack } from '@chakra-ui/react';
import { CreditcardLg } from 'assets/icons/Finance/CreditCard/CreditcardLg';
import { InformationSm } from 'assets/icons/Sign/Information/InformationSm';
import Button from 'components/redesign/button/Button';
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData';
import ExpandableInfo from '../../shop-setup/AiAssistant/components/ExpandableInfo';
import BillingSummary from './BillingSummary';
import CreditCardForm from './CreditCardForm';
import PlanCard from './PlanCard';

const PaymentContent = ({ onClose, onSubmit, planDetail, isDrawer }) => {
  const commonStyles = {
    background: '#1C1C1C',
    borderColor: 'neutral.gray.800'
  };

  const billingContent = (
    <VStack spacing={4} alignItems="flex-start">
      <PlanCard plan={planDetail} />
      <BillingSummary subscriptionCost={179} tax={0.99} total="Free" />
      <Flex w="473px" alignItems="center" gap={1}>
        <InformationSm color="#7b7b7b" />
        <Text flex={1} textAlign="center" color="#7b7b7b" fontSize="xs" fontFamily="Inter" lineHeight="none">
          Your account will be automatically charged for renewal once the free trial ends.
        </Text>
      </Flex>
    </VStack>
  );

  if (isDrawer) {
    return (
      <Flex direction="column" gap={4} background={commonStyles.background}>
        <CreditCardForm />
        <ExpandableInfo icon={<planDetail.icon color="white" />} title={planDetail.title} description={planDetail.description}>
          {billingContent}
        </ExpandableInfo>
      </Flex>
    );
  }

  return (
    <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }}>
      <Flex flexDirection="column">
        <ModalHeaderData
          icon={<CreditcardLg color="white" />}
          title="Credit card information"
          description="Choose a credit card on file or add a new one."
          descriptionProps={{ color: '#B1B1B1 !important' }}
          modalHeaderProps={{
            paddingBlock: '48px !important',
            borderBottom: '1px solid #292929'
          }}
        />
        <ModalBody padding="0px !important">
          {' '}
          <CreditCardForm />
        </ModalBody>
        <Flex gap={4} px={12} py={6} borderTop="1px solid" borderColor={commonStyles.borderColor} bg={commonStyles.background}>
          <Button variant="secondary" onClick={onClose}>
            Discard
          </Button>
          <Button flexGrow={1} variant="primary" onClick={onSubmit}>
            Get {planDetail.title} Plan (Free Trial)
          </Button>
        </Flex>
      </Flex>

      <VStack display={{ base: 'none', lg: 'flex' }} flex="0 0 50%" bg="neutral.background" p={6} alignItems="flex-start" spacing={4}>
        {billingContent}
      </VStack>
    </Grid>
  );
};

export default PaymentContent;
