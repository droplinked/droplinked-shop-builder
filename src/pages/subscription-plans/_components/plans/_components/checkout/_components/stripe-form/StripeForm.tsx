import { ModalBody, ModalFooter } from '@chakra-ui/react'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import BasicButton from 'components/common/BasicButton/BasicButton'
import useSubscriptionPlanPurchaseStore from 'pages/subscription-plans/_components/plans/store/planPurchaseStore'
import React, { useState } from 'react'
import { ModalStep } from '../../types/interfaces'

interface Props {
    setplanPurchaseModalStep: (step: ModalStep) => void
    closeModal: () => void
}

function StripeForm({ setplanPurchaseModalStep }: Props) {
    const elements = useElements()
    const stripe = useStripe()
    const [isFormCompleted, setFormCompleted] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const selectedPlanPrice = useSubscriptionPlanPurchaseStore((state) => state.selectedPlanPrice)

    const handleStripePayment = async () => {
        if (!stripe || !elements) return
        setLoading(true)
        const { error } = await stripe.confirmPayment({ elements, redirect: "if_required" })
        if (error) {
            setLoading(false)
            setplanPurchaseModalStep("FailedPayment")
            return
        }
        setLoading(false)
        setplanPurchaseModalStep("SuccessfulPayment")
    }

    return (
        <>
            <ModalBody>
                <PaymentElement onChange={(e) => setFormCompleted(e.complete)} />
            </ModalBody>

            <ModalFooter display={"flex"} alignItems={"center"} gap={{ xl: 6, base: 3 }}>
                <BasicButton minWidth={"unset"} width={"50%"} isDisabled={isLoading} variant='outline' onClick={() => setplanPurchaseModalStep("PaymentMethodSelection")}>Back</BasicButton>
                <BasicButton minWidth={"unset"} width={"50%"} isDisabled={!isFormCompleted || isLoading} isLoading={isLoading} onClick={handleStripePayment}>Pay ${selectedPlanPrice}</BasicButton>
            </ModalFooter>
        </>
    )
}

export default StripeForm