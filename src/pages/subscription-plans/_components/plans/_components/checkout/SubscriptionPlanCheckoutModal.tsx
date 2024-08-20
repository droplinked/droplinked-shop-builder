import React, { useState } from 'react'
import CheckoutModalTemplate from './_components/CheckoutModalTemplate'
import ConfirmPlan from './_components/ConfirmPlan'
import PaymentStatus from './_components/PaymentStatus'
import PaymentMethodSelection from './_components/payment-method-selection/PaymentMethodSelection'
import StripePayment from './_components/stripe-form/StripePayment'
import { ModalState, ModalStep } from './types/interfaces'

interface Props {
    isOpen: boolean;
    close: () => void;
    isFromPlansPage?: boolean;
    isLoggedInViaGoogle?: boolean;
    hasProfile?: any;
}

function SubscriptionPlanCheckoutModal({ isOpen, close, isFromPlansPage, isLoggedInViaGoogle, hasProfile }: Props) {
    const [modalData, setModalData] = useState<ModalState>({
        modalStep: "PlanConfirmation",
        stripeClientSecret: "",
        selectedPaymentMethod: null
    })

    const updateModalData = <K extends keyof ModalState>(key: K, value: ModalState[K]) =>
        setModalData({ ...modalData, [key]: value })

    const renderContent = () => {
        const { modalStep, stripeClientSecret } = modalData
        if (modalStep === 'PlanConfirmation')
            return <ConfirmPlan
                setplanPurchaseModalStep={(step) => updateModalData("modalStep", step)}
                close={close} hasProfile={hasProfile}
                isFromPlansPage={isFromPlansPage}
            />

        else if (modalStep === "PaymentMethodSelection")
            return <PaymentMethodSelection
                setModalData={setModalData}
                selectedPaymentMethod={modalData.selectedPaymentMethod}
            />

        else if (modalStep === "StripePayment")
            return <StripePayment
                clientSecret={stripeClientSecret}
                setplanPurchaseModalStep={(step) => updateModalData("modalStep", step)}
                close={close}
                isFromPlansPage={isFromPlansPage}
            />

        return <PaymentStatus
            paymentStatus={modalStep === "SuccessfulPayment" ? "success" : "error"}
            close={close}
            isFromPlansPage={isFromPlansPage}
            isLoggedInViaGoogle={isLoggedInViaGoogle}
        />
    }

    return (
        <CheckoutModalTemplate
            onClose={close}
            isOpen={isOpen}
        >
            {renderContent()}
        </CheckoutModalTemplate>
    )
}

export default SubscriptionPlanCheckoutModal