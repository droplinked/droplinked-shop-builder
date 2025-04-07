import { Grid } from '@chakra-ui/react'
import { ExternalarrowMd } from 'assets/icons/Navigation/ExternalArrow/ExternalarrowMd'
import BlueButton from 'components/redesign/button/BlueButton'
import PlanDurationRadioContainer from 'components/redesign/plan-duration-radio/PlanDurationRadioContainer'
import { SubscriptionPlan } from 'lib/apis/subscription/interfaces'
import { getSubscriptionPlansService, subscriptionPlanStripePaymentService } from 'lib/apis/subscription/subscriptionServices'
import { OnboardingStepProps, PlanType } from 'pages/onboarding/types/onboarding'
import Loading from 'pages/subscription-plans/_components/plans/_components/loading/Loading'
import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import ControlButtons from '../common/ControlButtons'
import OnboardingStepHeader from '../common/OnboardingStepHeader'
import PaymentModal from '../common/payment-modal/PaymentModal'
import SubscriptionPlanCard from './SubscriptionPlanCard'
import { getContinueText, getFeaturesWithInheritance } from './utils'
import useSubscriptionPlanPurchaseStore from 'lib/stores/subscription-plan.ts/subscriptionPlanStore'

function SubscriptionPlans({ onBack, onNext }: OnboardingStepProps) {
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('BUSINESS')
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [clientSecret, setClientSecret] = useState<string>('')
  const preferredPlanDuration = useSubscriptionPlanPurchaseStore((state) => state.preferredPlanDuration)

  const { isFetching, data } = useQuery({
    queryKey: ['subscription-plans'],
    queryFn: () => getSubscriptionPlansService()
  })

  const { mutateAsync: createPaymentIntent, isLoading: isCreatingPaymentIntent } = useMutation(
    subscriptionPlanStripePaymentService,
    {
      onSuccess: (response) => {
        setClientSecret(response.data.clientSecret)
        setIsPaymentModalOpen(true)
      }
    }
  )

  const plans: SubscriptionPlan[] = data?.data || []

  const handleNext = async (): Promise<void> => {
    console.log('selectedPlan', selectedPlan)
    if (selectedPlan === 'ENTERPRISE' || selectedPlan === 'STARTER') {
      onNext()
      return
    }
    
    try {
      const selectedPlanData = plans.find(plan => plan.type === selectedPlan)
      if (!selectedPlanData) {
        console.error('Selected plan not found')
        return
      }

      console.log('selectedPlanData', selectedPlanData)

      await createPaymentIntent({
        month: preferredPlanDuration.month, // Use the selected plan duration
        subId: selectedPlanData._id,
        recurring: true
      })
    } catch (error) {
      console.error('Failed to create payment intent:', error)
    }
  }

  const handleCloseModal = (): void => {
    setIsPaymentModalOpen(false)
  }

  if (isFetching) return <Loading />

  return (
    <>
      <OnboardingStepHeader 
        heading="Plans" 
        description="Choose from the different package options below." 
      />
      <BlueButton 
        fontSize="16px" 
        mt="-46px" 
        justifyContent="flex-start" 
        padding={0}
        onClick={() => window.open('/plans', '_blank')}
      >
        View all plans and compare <ExternalarrowMd color="#179EF8" />
      </BlueButton>
      
      <PlanDurationRadioContainer />
      
      <Grid templateColumns="1fr" gap={6} p={4}>
        {plans.map((plan) => {
          const planType = plan.type as PlanType
          return (
            <SubscriptionPlanCard
              key={plan._id}
              plan={plan}
              features={getFeaturesWithInheritance(planType)}
              isPopular={planType === 'BUSINESS'}
              isSelected={selectedPlan === plan.type}
              onSelect={() => setSelectedPlan(planType)}
              planDuration={preferredPlanDuration}
            />
          )
        })}
      </Grid>

      <ControlButtons 
        onBack={onBack} 
        onSubmit={onNext} 
        continueText={getContinueText(selectedPlan)} 
      />
      
      <PaymentModal 
        plan={selectedPlan} 
        isOpen={isPaymentModalOpen} 
        onClose={handleCloseModal} 
        clientSecret={clientSecret}
      />
    </>
  )
}

export default SubscriptionPlans
