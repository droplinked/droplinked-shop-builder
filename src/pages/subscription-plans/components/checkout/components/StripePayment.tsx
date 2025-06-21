import { ModalBody } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData';
import React from 'react';
import { ModalStep } from '../types/interfaces';
import DroplinkedPaymentForm from 'components/redesign/payment/DroplinkedPaymentForm';

interface Props {
    clientSecret: string;
    intentType: 'payment' | 'setup';
    setPlanPurchaseModalStep: (step: ModalStep) => void;
}

function StripePayment({ clientSecret, intentType, setPlanPurchaseModalStep }: Props) {
    
    const onSuccess = () => {
        setPlanPurchaseModalStep("SuccessfulPayment");
    }
    
    const onError = (error?: any) => {
        setPlanPurchaseModalStep("FailedPayment");
    }
    
    const onCancel = () => {
        setPlanPurchaseModalStep("PaymentMethodSelection");
    }
    
    return (
      <>
        <ModalHeaderData
          icon={<AppIcons.StripePayment />}
          title="Credit card information"
          description={'Choose a credit card on file or add a new one.'}
        />

        <ModalBody>
          <DroplinkedPaymentForm
            intentType={intentType}
            clientSecret={clientSecret}
            onSuccess={onSuccess}
            onError={onError}
            onCancel={onCancel}
          />
        </ModalBody>
      </>
    )
}

export default StripePayment