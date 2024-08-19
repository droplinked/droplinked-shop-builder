import React, { useState } from 'react'
import CheckoutModalTemplate from './_components/CheckoutModalTemplate'
import ConfirmPlan from './_components/ConfirmPlan'
import PaymentStatus from './_components/PaymentStatus'
import PaymentMethodSelection from './_components/payment-method-selection/PaymentMethodSelection'
import StripePayment from './_components/stripe-form/StripePayment'

export type ModalStep = 'PlanConfirmation' | 'PaymentMethodSelection' | 'StripePayment' | 'SuccessfulPayment' | 'FailedPayment'

interface Props {
    isOpen: boolean;
    close: () => void;
    isFromPlansPage?: boolean;
    isLoggedInViaGoogle?: boolean;
    hasProfile?: any;
}

function SubscriptionPlanCheckoutModal({ isOpen, close, isFromPlansPage, isLoggedInViaGoogle, hasProfile }: Props) {
    const [planPurchaseModalStep, setplanPurchaseModalStep] = useState<ModalStep>('PaymentMethodSelection')
    const [stripeClientSecret, setStripeClientSecret] = useState<string | null>(null)

    const renderContent = () => {
        if (planPurchaseModalStep === 'PlanConfirmation')
            return <ConfirmPlan
                setplanPurchaseModalStep={(step) => setplanPurchaseModalStep(step)}
                close={close} hasProfile={hasProfile}
                isFromPlansPage={isFromPlansPage}
            />

        else if (planPurchaseModalStep === "PaymentMethodSelection")
            return <PaymentMethodSelection
                setplanPurchaseModalStep={setplanPurchaseModalStep}
                setStripeClientSecret={setStripeClientSecret}
            />

        else if (planPurchaseModalStep === "StripePayment")
            return <StripePayment
                clientSecret={stripeClientSecret}
                setplanPurchaseModalStep={setplanPurchaseModalStep}
                close={close}
                isFromPlansPage={isFromPlansPage}
            />

        return <PaymentStatus
            paymentStatus={planPurchaseModalStep === "SuccessfulPayment" ? "success" : "error"}
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