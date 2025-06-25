import { Box, Text } from '@chakra-ui/react';
import DroplinkedPaymentForm from 'components/redesign/payment/DroplinkedPaymentForm';
import useAppToast from 'hooks/toast/useToast';
import { getShopSubscriptionDataService, getSubscriptionPlansService, subscriptionPlanStripePaymentService } from 'lib/apis/subscription/subscriptionServices';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import useSubscriptionPlanStore from 'stores/subscription-plan.ts/subscriptionPlanStore';

interface PaymentFormProps {
  planDetail: any;
  TrialMonths?: number;
  onClose: () => void;
  onSuccess?: () => void;
  successMessage?: string;
}


const PaymentForm = ({ planDetail, TrialMonths, onClose, onSuccess, successMessage }: PaymentFormProps) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [intentType, setIntentType] = useState<'payment' | 'setup'>();
  const [clientSecret, setClientSecret] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const updateSelectedPlan = useSubscriptionPlanStore((state) => state.updateSelectedPlan);
  const preferredPlanDuration = useSubscriptionPlanStore((state) => state.preferredPlanDuration);
  const { showToast } = useAppToast();


  const {
    data: plansData,
    isLoading: isPlansLoading,
    error: plansError
  } = useQuery(['subscriptionPlans'], getSubscriptionPlansService);


  const paymentMutation = useMutation({
    mutationFn: subscriptionPlanStripePaymentService,
    retry: false,
    onSuccess: (data) => {
      setClientSecret(data.data.clientSecret);
      setIntentType(data.data.intentType);
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.data?.message || 'Failed to initialize payment. Please try again.';
      showToast({ message: errorMessage, type: 'error' });
    }
  });


  useEffect(() => {
    if (plansError) {
      showToast({ message: 'Failed to fetch subscription plans. Please try again.', type: 'error' });
      onClose();
      return;
    }
  
    if (plansData && !clientSecret && !intentType && !paymentMutation.isLoading) {
      const selectedPlan = plansData.data.find((plan) => plan.type === planDetail.type);
  
      if (!selectedPlan) {
        showToast({ message: 'Selected plan not found. Please try again.', type: 'error' });
        onClose();
        return;
      }
  
      paymentMutation.mutate(
        {
          month: preferredPlanDuration.month,
          subId: selectedPlan._id,
          trialMonths: TrialMonths
        },
        {
          onError: () => {
            showToast({ message: 'Failed to initialize payment. Please try again.', type: 'error' });
            onClose();
          }
        }
      );
    }
  }, [plansData, plansError, planDetail, preferredPlanDuration, clientSecret, intentType, paymentMutation.isLoading]);

  const handleSuccess = async () => {
    setIsProcessingPayment(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      await getShopSubscriptionDataService();

      const plansResponse = await getSubscriptionPlansService();
      const updatedPlan = plansResponse.data.find((plan) => plan.type === planDetail.type);
      if (updatedPlan) updateSelectedPlan(updatedPlan);

      showToast({ message: successMessage || 'Payment successful! Your subscription has been activated.', type: 'success' });

      onClose();
      onSuccess?.();
    } catch {
      const errorMessage = 'An unexpected error occurred. Please try again.';
      setErrorMessage(errorMessage);
      showToast({ message: errorMessage, type: 'error' });
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handleError = (error: any) => {
    setIsProcessingPayment(false);
    const errorMsg = error?.message || 'An error occurred during payment processing.';
    setErrorMessage(errorMsg);
    showToast({ message: errorMsg, type: 'error' });
  };

  const handleCancel = () => {
    if (!isProcessingPayment) {
      onClose();
    }
  };

  if (isPlansLoading || paymentMutation.isLoading) {
    return (
      <Box p={6}>
        <Text color="white">Initializing payment...</Text>
      </Box>
    );
  }

  if (plansError || paymentMutation.isError || !intentType || !clientSecret) {
    return (
      <Box p={6}>
        <Text color="red.500">Failed to initialize payment.</Text>
      </Box>
    );
  }

  return (
    <>
      <Box p={6}>
        {isProcessingPayment && (
          <Text color="blue.400" mb={4} fontSize="sm" textAlign="center">
            Processing payment... Please wait.
          </Text>
        )}
        <DroplinkedPaymentForm
          clientSecret={clientSecret}
          intentType={intentType}
          onSuccess={handleSuccess}
          onError={handleError}
          onCancel={handleCancel}
          isProcessing={isProcessingPayment}
        />
      </Box>
      {errorMessage && (
        <Text color="red.500" mt={2} fontSize="sm">
          {errorMessage}
        </Text>
      )}
    </>
  );
};

export default PaymentForm;
