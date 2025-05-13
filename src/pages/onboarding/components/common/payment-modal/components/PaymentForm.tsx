import { Box, Text } from '@chakra-ui/react'
import DroplinkedPaymentForm from 'components/redesign/payment/DroplinkedPaymentForm'
import useAppToast from 'hooks/toast/useToast'
import { getShopSubscriptionDataService, getSubscriptionPlansService, subscriptionPlanStripePaymentService } from 'lib/apis/subscription/subscriptionServices'
import useSubscriptionPlanStore from 'lib/stores/subscription-plan.ts/subscriptionPlanStore'
import React, { useState } from 'react'
import useOnboardingStore from '../../../../stores/useOnboardingStore'

interface PaymentFormProps {
  onClose: () => void;
  planDetail: any;
  clientSecret: string;
}

const PaymentForm = ({ onClose, planDetail, clientSecret }: PaymentFormProps) => {
  const [errorMessage, setErrorMessage] = useState('')
  const nextStep = useOnboardingStore(state => state.nextStep)
  const updateSelectedPlan = useSubscriptionPlanStore(state => state.updateSelectedPlan)
  const preferredPlanDuration = useSubscriptionPlanStore(state => state.preferredPlanDuration)
  const { showToast } = useAppToast()
  
  const handleSuccess = async () => {
    try {
      // Get the original plan data from the API
      const plansResponse = await getSubscriptionPlansService()
      const updatedPlan = plansResponse.data.find(plan => plan.type === planDetail.type)
      
      if (!updatedPlan) {
        console.error('Plan not found in API response:', planDetail.type)
        showToast({ message: 'Failed to find subscription plan. Please contact support.', type: 'error' })
        return
      }

      // Confirm payment with server using the selected duration
      await subscriptionPlanStripePaymentService({
        month: preferredPlanDuration.month,
        subId: updatedPlan._id,
        recurring: true
      })
      
      // Fetch updated subscription data
      await getShopSubscriptionDataService()
      
      // Update the store with the plan from API
      updateSelectedPlan(updatedPlan)
      
      // Show success toast
      showToast({ message: 'Payment successful! Your subscription has been activated.', type: 'success' })

      
      // Close the modal and proceed to next step
      onClose()
      nextStep()
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

  return (
    <>
      <Box p={6}>
        <DroplinkedPaymentForm
          clientSecret={clientSecret}
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