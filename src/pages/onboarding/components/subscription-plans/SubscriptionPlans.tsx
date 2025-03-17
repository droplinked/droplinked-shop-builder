import { Grid } from '@chakra-ui/react'
import { ExternalarrowMd } from 'assets/icons/Navigation/ExternalArrow/ExternalarrowMd'
import BlueButton from 'components/redesign/button/BlueButton'
import PlanDurationRadioContainer from 'components/redesign/plan-duration-radio/PlanDurationRadioContainer'
import { SubscriptionPlan } from 'lib/apis/subscription/interfaces'
import { getSubscriptionPlansService } from 'lib/apis/subscription/subscriptionServices'
import { OnboardingStepProps, PlanType } from 'pages/onboarding/types/onboarding'
import Loading from 'pages/subscription-plans/_components/plans/_components/loading/Loading'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import ControlButtons from '../common/ControlButtons'
import OnboardingStepHeader from '../common/OnboardingStepHeader'
import PaymentModal from '../common/payment-modal/PaymentModal'
import SubscriptionPlanCard from './SubscriptionPlanCard'
import { getContinueText, getFeaturesWithInheritance } from './utils'

function SubscriptionPlans({ onBack, onNext }: OnboardingStepProps) {
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('BUSINESS')
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)

  const { isFetching, data } = useQuery({
    queryKey: ['subscription-plans'],
    queryFn: () => getSubscriptionPlansService()
  })

  const plans: SubscriptionPlan[] = data?.data || []

  const handleNext = (): void => {
    if (selectedPlan === 'ENTERPRISE' || selectedPlan === 'STARTER') {
      onNext()
      return
    }
    setIsPaymentModalOpen(true)
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
            />
          )
        })}
      </Grid>

      <ControlButtons 
        onBack={onBack} 
        onSubmit={handleNext} 
        continueText={getContinueText(selectedPlan)} 
      />
      
      <PaymentModal 
        plan={selectedPlan} 
        isOpen={isPaymentModalOpen} 
        onClose={handleCloseModal} 
      />
    </>
  )
}

export default SubscriptionPlans
