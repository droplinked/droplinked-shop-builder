import { Flex, Grid, ModalBody } from '@chakra-ui/react';
import { CreditcardLg } from 'assets/icons/Finance/CreditCard/CreditcardLg';
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData';
import React, { useState } from 'react';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import BillingInfo from '../components/BillingInfo';
import ExpandableInfo from '../components/ExpandableInfo';
import PaymentForm from '../components/PaymentForm';

interface PaymentContentProps {
  onClose: () => void;
  planDetail: any;
  TrialMonths?: number;
  isDrawer?: boolean;
  onSuccess?: () => void;
  successMessage?: string;
}

const PaymentContent = ({ onClose, planDetail, TrialMonths, isDrawer, onSuccess, successMessage }: PaymentContentProps) => {
  const { t } = useLocaleResources('subscription');
  const [paymentAmount, setPaymentAmount] = useState<number>(0);

  const handlePaymentAmountReceived = (amount: number) => {
    setPaymentAmount(amount);
  };

  if (isDrawer) {
    return (
      <Flex direction="column" gap={4} background="neutral.gray.1000">
        <PaymentForm
          onClose={onClose}
          planDetail={planDetail}
          onSuccess={onSuccess}
          successMessage={successMessage}
          onPaymentAmountReceived={handlePaymentAmountReceived}
        />
        <ExpandableInfo
          icon={<planDetail.icon color="white" />}
          title={planDetail.title}
          description={planDetail.description}
        >
          <BillingInfo planDetail={planDetail} actualPaymentAmount={paymentAmount} />
        </ExpandableInfo>
      </Flex>
    );
  }

  return (
    <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }}>
      <Flex flexDirection="column">
        <ModalHeaderData
          icon={<CreditcardLg color="white" />}
          title={t('PaymentContent.title')}
          description={t('PaymentContent.description')}
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
            onPaymentAmountReceived={handlePaymentAmountReceived}
          />
        </ModalBody>
      </Flex>

      <Flex
        display={{ base: 'none', lg: 'flex' }}
        flex="0 0 50%"
        bg="neutral.background"
        p="48px"
      >
        <BillingInfo planDetail={planDetail} actualPaymentAmount={paymentAmount} />
      </Flex>
    </Grid>
  );
};

export default PaymentContent;
