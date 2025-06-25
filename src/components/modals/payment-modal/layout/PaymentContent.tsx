import React from 'react';
import { Flex, Grid, ModalBody } from '@chakra-ui/react';
import { CreditcardLg } from 'assets/icons/Finance/CreditCard/CreditcardLg';
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData';
import ExpandableInfo from '../components/ExpandableInfo';
import PaymentForm from '../components/PaymentForm';
import BillingInfo from '../components/BillingInfo';

interface PaymentContentProps {
  onClose: () => void;
  planDetail: any; 
  TrialMonths?: number;
  isDrawer?: boolean;
  onSuccess?: () => void;
  successMessage?: string;
}

const PaymentContent = ({ onClose, planDetail,TrialMonths, isDrawer, onSuccess, successMessage }: PaymentContentProps) => {
  if (isDrawer) {
    return (
      <Flex direction="column" gap={4} background="neutral.gray.1000">
        <PaymentForm 
          onClose={onClose} 
          planDetail={planDetail}
          onSuccess={onSuccess}
          successMessage={successMessage}
        />
        <ExpandableInfo
          icon={<planDetail.icon color="white" />}
          title={planDetail.title}
          description={planDetail.description}
        >
          <BillingInfo planDetail={planDetail} />
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
            borderBottom: '1px solid #292929',
          }}
        />
        <ModalBody padding="0px !important">
          <PaymentForm 
            planDetail={planDetail}
            TrialMonths={TrialMonths}
            onClose={onClose}
            onSuccess={onSuccess}
            successMessage={successMessage}
          />
        </ModalBody>
      </Flex>

      <Flex
        display={{ base: 'none', lg: 'flex' }}
        flex="0 0 50%"
        bg="neutral.background"
        p="48px"
      >
        <BillingInfo planDetail={planDetail} />
      </Flex>
    </Grid>
  );
};

export default PaymentContent;
