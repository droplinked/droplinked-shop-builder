import React from 'react';
import { Flex, Grid, ModalBody } from '@chakra-ui/react';
import { CreditcardLg } from 'assets/icons/Finance/CreditCard/CreditcardLg';
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData';
import ExpandableInfo from '../../../shop-setup/AiAssistant/components/ExpandableInfo';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { appDevelopment } from 'utils/app/variable';
import PaymentForm from '../components/PaymentForm';
import BillingInfo from '../components/BillingInfo';

// Initialize Stripe
const stripePromise = loadStripe(`${appDevelopment ? process.env.REACT_APP_STRIPE_KEY_DEV : process.env.REACT_APP_STRIPE_KEY_MAIN}`);

interface PaymentContentProps {
  onClose: () => void;
  planDetail: any;
  isDrawer?: boolean;
  clientSecret: string;
}

const PaymentContent = ({ onClose,  planDetail, isDrawer, clientSecret }: PaymentContentProps) => {
  const commonStyles = {
    background: '#1C1C1C',
    borderColor: 'neutral.gray.800'
  };

  const stripeOptions: StripeElementsOptions = {
    clientSecret,
    appearance: { theme: "night" },
    paymentMethodCreation: "manual" as const
  };

  if (isDrawer) {
    return (
      <Flex direction="column" gap={4} background={commonStyles.background}>
        <Elements stripe={stripePromise} options={stripeOptions}>
          <PaymentForm  onClose={onClose} planDetail={planDetail} />
        </Elements>
        <ExpandableInfo icon={<planDetail.icon color="white" />} title={planDetail.title} description={planDetail.description}>
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
            borderBottom: '1px solid #292929'
          }}
        />
        <ModalBody padding="0px !important">
          <Elements stripe={stripePromise} options={stripeOptions}>
            <PaymentForm onClose={onClose} planDetail={planDetail} />
          </Elements>
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
