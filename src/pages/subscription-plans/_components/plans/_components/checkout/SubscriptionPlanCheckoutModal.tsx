import React, { useState } from 'react'
import CheckoutModalTemplate from './_components/CheckoutModalTemplate'
import ConfirmPlan from './_components/ConfirmPlan'
import PaymentStatus from './_components/PaymentStatus'
import PaymentMethodSelection from './_components/payment-method-selection/PaymentMethodSelection'
import StripePayment from './_components/stripe-form/StripePayment'
import { ModalState } from './types/interfaces'

interface Props {
    isOpen: boolean;
    close: () => void;
    isFromPlansPage?: boolean;
    isLoggedInViaGoogle?: boolean;
    hasProfile?: any;
}

function SubscriptionPlanCheckoutModal({ isOpen, close, isFromPlansPage, isLoggedInViaGoogle, hasProfile }: Props) {
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
                setplanPurchaseModalStep={(step) => updateModalData("step", step)}
                close={close} hasProfile={hasProfile}
                isFromPlansPage={isFromPlansPage}
            />

        else if (step === "PaymentMethodSelection")
            return <PaymentMethodSelection
                setModalData={setModalData}
                selectedPaymentMethod={modalData.selectedPaymentMethod}
            />

        else if (step === "StripePayment")
            return <StripePayment
                clientSecret={stripeClientSecret}
                setplanPurchaseModalStep={(step) => updateModalData("step", step)}
                close={close}
                isFromPlansPage={isFromPlansPage}
            />

        return <PaymentStatus
            paymentStatus={step === "SuccessfulPayment" ? "success" : "error"}
            close={close}
            isFromPlansPage={isFromPlansPage}
            isLoggedInViaGoogle={isLoggedInViaGoogle}
        />
    }

    return (
        <CheckoutModalTemplate
            onClose={close}
            isOpen={isOpen}
            currentStep={modalData.step}
        >
            {renderContent()}
        </CheckoutModalTemplate>
    )
}

export default SubscriptionPlanCheckoutModal