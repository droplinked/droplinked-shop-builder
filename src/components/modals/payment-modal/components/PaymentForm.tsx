import { Box, Text } from '@chakra-ui/react'
import DroplinkedPaymentForm from 'components/redesign/payment/DroplinkedPaymentForm'
import useAppToast from 'hooks/toast/useToast'
import { getShopSubscriptionDataService, getSubscriptionPlansService, subscriptionPlanStripePaymentService } from 'lib/apis/subscription/subscriptionServices'
import React, { useState } from 'react'
import useSubscriptionPlanStore from 'stores/subscription-plan.ts/subscriptionPlanStore'

interface PaymentFormProps {
  onClose: () => void;
  planDetail: any;
  onSuccess?: () => void;
  successMessage?: string;
}

const PaymentForm = ({ onClose, planDetail, onSuccess, successMessage }: PaymentFormProps) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [intentType, setIntentType] = useState<'payment' | 'setup'>()
  const [clientSecret, setClientSecret] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const updateSelectedPlan = useSubscriptionPlanStore(state => state.updateSelectedPlan)
  const preferredPlanDuration = useSubscriptionPlanStore(state => state.preferredPlanDuration)
  const { showToast } = useAppToast()
  
  const initializePayment = async () => {
    try {
      const plansResponse = await getSubscriptionPlansService()
      const updatedPlan = plansResponse.data.find(plan => plan.type === planDetail.type)
      const paymentResponse = await subscriptionPlanStripePaymentService({
        month: preferredPlanDuration.month,
        subId: updatedPlan._id,
        isTrial: true,
      })
      
      setIntentType(paymentResponse.data.intentType)
      setClientSecret(paymentResponse.data.clientSecret)
      setIsLoading(false)
    } catch (err) {
      const errorMessage = 'Failed to initialize payment. Please try again.'
      setErrorMessage(errorMessage)
      showToast({ message: errorMessage, type: 'error' })
      setIsLoading(false)
    }
  }

  // Initialize payment on component mount
  if (isLoading && !intentType) {
    initializePayment()
  }
  
  const handleSuccess = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      await getShopSubscriptionDataService()
      
      const plansResponse = await getSubscriptionPlansService()
      const updatedPlan = plansResponse.data.find(plan => plan.type === planDetail.type)
      
      if (updatedPlan) {
        updateSelectedPlan(updatedPlan)
      }
      
      const message = successMessage || 'Payment successful! Your subscription has been activated.'
      showToast({ message, type: 'success' })

      onClose()
      
      if (onSuccess) {
        onSuccess()
      }
    } catch (err) {
      const errorMessage = 'An unexpected error occurred. Please try again.'
      setErrorMessage(errorMessage)
      showToast({ message: errorMessage, type: 'error' })
    }
  }

  const handleError = (error: any) => {
    const errorMsg = error?.message || 'An error occurred during payment processing.'
    setErrorMessage(errorMsg)
    showToast({ message: errorMsg, type: 'error' })
  }

  if (isLoading) {
    return (
      <Box p={6}>
        <Text>Initializing payment...</Text>
      </Box>
    )
  }

  if (!intentType || !clientSecret) {
    return (
      <Box p={6}>
        <Text color="red.500">Failed to initialize payment.</Text>
      </Box>
    )
  }

  return (
    <>
      <Box p={6}>
        <DroplinkedPaymentForm
          clientSecret={clientSecret}
          intentType={intentType}
          onSuccess={handleSuccess}
          onError={handleError}
          onCancel={onClose}
        />
      </Box>
      {errorMessage && (
        <Text color="red.500" mt={2} fontSize="sm">
          {errorMessage}
        </Text>
      )}
    </>
  )
}

export default PaymentForm