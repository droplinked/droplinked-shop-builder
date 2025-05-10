import { Box, Flex, Text } from '@chakra-ui/react'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import AppButton from 'components/redesign/button/AppButton'
import useSubscriptionPlanStore from 'lib/stores/subscription-plan.ts/subscriptionPlanStore'
import React, { useState } from 'react'
import useOnboardingStore from '../../../../stores/useOnboardingStore'
import useAppToast from 'hooks/toast/useToast'
import { getShopSubscriptionDataService, subscriptionPlanStripePaymentService, getSubscriptionPlansService } from 'lib/apis/subscription/subscriptionServices'

interface PaymentFormProps {
  onClose: () => void
  planDetail: any
}

const PaymentForm = ({ onClose, planDetail }: PaymentFormProps) => {
  const stripe = useStripe()
  const elements = useElements()
  const [isFormCompleted, setFormCompleted] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const nextStep = useOnboardingStore(state => state.nextStep)
  const updateSelectedPlan = useSubscriptionPlanStore(state => state.updateSelectedPlan)
  const preferredPlanDuration = useSubscriptionPlanStore(state => state.preferredPlanDuration)
  const { showToast } = useAppToast()
  
  const handlePaymentSubmit = async () => {
    if (!isFormCompleted) return
    
    setIsProcessing(true)
    setErrorMessage('')
    
    try {
      if (!stripe || !elements) {
        setErrorMessage('Stripe has not been properly initialized.')
        setIsProcessing(false)
        return
      }
      
      const { error } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
      })
      
      if (error) {
        setErrorMessage(error.message || 'An error occurred during payment processing.')
        showToast({ message: error.message || 'Payment failed. Please try again.', type: 'error' })
        setIsProcessing(false)
        return
      }

      // Get the original plan data from the API
      const plansResponse = await getSubscriptionPlansService()
      const updatedPlan = plansResponse.data.find(plan => plan.type === planDetail.type)
      
      if (!updatedPlan) {
        console.error('Plan not found in API response:', planDetail.type)
        showToast({ message: 'Failed to find subscription plan. Please contact support.', type: 'error' })
        setIsProcessing(false)
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
      
      setIsProcessing(false)
      
      // Close the modal and proceed to next step
      onClose()
      nextStep()
      
    } catch (err) {
      const errorMessage = 'An unexpected error occurred. Please try again.'
      setErrorMessage(errorMessage)
      showToast({ message: errorMessage, type: 'error' })
      console.error('Payment error:', err)
      setIsProcessing(false)
    }
  }

  return (
    <>
      <Box p={6}>
        <PaymentElement onChange={(e) => setFormCompleted(e.complete)} />
      </Box>
      {errorMessage && (
        <Text color="red.500" mt={2} fontSize="sm">
          {errorMessage}
        </Text>
      )}
      <Flex gap={4} px={12} py={6} borderTop="1px solid" borderColor="neutral.gray.800" bg="#1C1C1C">
        <AppButton variant="secondary" onClick={onClose}>  Discard  </AppButton>
        <AppButton 
          flexGrow={1} 
          onClick={handlePaymentSubmit}
          isLoading={isProcessing}
          isDisabled={!isFormCompleted || isProcessing}
        >
          Get {planDetail.title}
        </AppButton>
      </Flex>
    </>
  )
}

export default PaymentForm 