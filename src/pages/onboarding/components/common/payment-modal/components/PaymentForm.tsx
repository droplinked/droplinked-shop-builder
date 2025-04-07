import { Box, Flex, Text } from '@chakra-ui/react'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import Button from 'components/redesign/button/Button'
import useSubscriptionPlanStore from 'lib/stores/subscription-plan.ts/subscriptionPlanStore'
import React, { useState } from 'react'
import useOnboardingStore from '../../../../stores/useOnboardingStore'
import useAppToast from 'hooks/toast/useToast'
import { getShopSubscriptionDataService, subscriptionPlanStripePaymentService } from 'lib/apis/subscription/subscriptionServices'

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
  const { showToast } = useAppToast()
  
  const handlePaymentSubmit = async () => {
    console.log('handlePaymentSubmit')
    if (!isFormCompleted) return
    
    setIsProcessing(true)
    setErrorMessage('')
    
    try {
      if (!stripe || !elements) {
        setErrorMessage('Stripe has not been properly initialized.')
        setIsProcessing(false)
        return
      }
      
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
      })
      
      if (error) {
        setErrorMessage(error.message || 'An error occurred during payment processing.')
        showToast({ message: error.message || 'Payment failed. Please try again.', type: 'error' })
        setIsProcessing(false)
        return
      }
      
      // Update the subscription plan store with the selected plan
      updateSelectedPlan(planDetail)
      
      // Confirm payment with server
      try {
        // This ensures the payment is recorded on the server
        await subscriptionPlanStripePaymentService({
          month: 1, // Default to monthly subscription
          subId: planDetail._id,
          recurring: true
        })
        
        // Fetch updated subscription data from server
        await getShopSubscriptionDataService()
      } catch (fetchError) {
        console.error('Failed to confirm payment or fetch updated subscription data:', fetchError)
      }
      
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
      console.log('err', err)
      setIsProcessing(false)
    }
  }

  return (
    <>
      <Box p={1}>
        <PaymentElement onChange={(e) => setFormCompleted(e.complete)} />
      </Box>
      {errorMessage && (
        <Text color="red.500" mt={2} fontSize="sm">
          {errorMessage}
        </Text>
      )}
      <Flex gap={4} px={12} py={6} borderTop="1px solid" borderColor="neutral.gray.800" bg="#1C1C1C">
        <Button variant="secondary" onClick={onClose}>
          Discard
        </Button>
        <Button 
          flexGrow={1} 
          variant="primary" 
          onClick={handlePaymentSubmit}
          isLoading={isProcessing}
          isDisabled={!isFormCompleted || isProcessing}
        >
          Get {planDetail.title}
        </Button>
      </Flex>
    </>
  )
}

export default PaymentForm 