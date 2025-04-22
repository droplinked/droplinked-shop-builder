import React, { useState } from 'react'
import CheckoutModal from './_components/CheckoutModal'
import ConfirmPlan from './_components/ConfirmPlan'
import PaymentStatus from './_components/PaymentStatus'
import PaymentMethodSelection from './_components/payment-method-selection/PaymentMethodSelection'
import StripePayment from './_components/StripePayment'
import { ModalState } from './types/interfaces'

interface Props {
    isOpen: boolean;
    close: () => void;
}

function SubscriptionPlanCheckoutModal({ isOpen, close }: Props) {
    const [modalData, setModalData] = useState<ModalState>({
        step: "PlanConfirmation",
        stripeClientSecret: "",
        selectedPaymentMethod: null
    })

    const updateModalData = <K extends keyof ModalState>(key: K, value: ModalState[K]) =>
        setModalData({ ...modalData, [key]: value })

    const renderContent = () => {
        const { step, stripeClientSecret } = modalData
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
            return <StripePayment
                clientSecret={stripeClientSecret}
                setPlanPurchaseModalStep={(step) => updateModalData("step", step)}
                close={close}
            />

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