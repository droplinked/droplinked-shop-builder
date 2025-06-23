import React, { useState } from 'react'
import CheckoutModal from './components/CheckoutModal'
import ConfirmPlan from './components/ConfirmPlan'
import PaymentStatus from './components/PaymentStatus'
import PaymentMethodSelection from './components/payment-method-selection/PaymentMethodSelection'
import PaymentModal from 'components/modals/payment-modal/PaymentModal'
import { ModalState } from './types/interfaces'
import useSubscriptionPlanPurchaseStore from 'stores/subscription-plan.ts/subscriptionPlanStore'
import { PlanType } from 'pages/onboarding/types/onboarding'

interface Props {
    isOpen: boolean;
    close: () => void;
}

function SubscriptionPlanCheckoutModal({ isOpen, close }: Props) {
    const [modalData, setModalData] = useState<ModalState>({
        step: "PlanConfirmation",
        selectedPaymentMethod: null
    })

    const selectedPlan = useSubscriptionPlanPurchaseStore((state) => state.selectedPlan)

    const updateModalData = <K extends keyof ModalState>(key: K, value: ModalState[K]) =>
        setModalData({ ...modalData, [key]: value })

    const handlePaymentSuccess = () => {
        updateModalData("step", "SuccessfulPayment")
    }

    const renderContent = () => {
        const { step } = modalData
        
        if (step === 'PlanConfirmation')
            return <ConfirmPlan
                setPlanPurchaseModalStep={(step) => updateModalData("step", step)}
                close={close}
            />

        else if (step === "PaymentMethodSelection")
            return <PaymentMethodSelection
                setModalData={setModalData}
                selectedPaymentMethod={modalData.selectedPaymentMethod}
            />

        else if (step === "StripePayment")
            return selectedPlan ? (
                <PaymentModal
                    isOpen={true}
                    onClose={() => updateModalData("step", "PlanConfirmation")}
                    plan={selectedPlan.type as PlanType}
                    onSuccess={handlePaymentSuccess}
                    successMessage="Subscription activated successfully!"
                />
            ) : null

        return <PaymentStatus
            paymentStatus={step === "SuccessfulPayment" ? "success" : "error"}
            close={close}
        />
    }

    return (
        <CheckoutModal
            onClose={close}
            isOpen={isOpen}
            currentStep={modalData.step}
        >
            {renderContent()}
        </CheckoutModal>
    )
}

export default SubscriptionPlanCheckoutModal