import AppModal from 'components/common/modal/AppModal'
import { SubscriptionPlan } from 'lib/apis/subscription/interfaces'
import React, { useState } from 'react'
import ConfirmPlan from './_components/ConfirmPlan'
import PaymentStatus from './_components/PaymentStatus'
import StripeModal from './_components/StripeModal'

interface Props {
    selectedPlan: SubscriptionPlan
    isOpen: boolean;
    close: () => void;
    isFromPlansPage?: boolean;
    isLoggedInViaGoogle?: boolean;
    hasProfile?: any;
}

function SubscriptionPlanCheckoutModal({ selectedPlan, isOpen, close, isFromPlansPage, isLoggedInViaGoogle, hasProfile }: Props) {
    const [clientSecret, setClientSecret] = useState<string | null>(null)
    const [paymentStatus, setPaymentStatus] = useState<"success" | "error" | null>(null)

    const renderContent = () => {
        if (paymentStatus) return <PaymentStatus paymentStatus={paymentStatus} selectedPlan={selectedPlan} close={close} isFromPlansPage={isFromPlansPage} isLoggedInViaGoogle={isLoggedInViaGoogle} />
        if (clientSecret) return <StripeModal clientSecret={clientSecret} close={close} setPaymentStatus={setPaymentStatus} />
        return <ConfirmPlan selectedPlan={selectedPlan} setClientSecret={setClientSecret} close={close} hasProfile={hasProfile} />
    }

    return (
        <AppModal
            close={close}
            open={isOpen}
            size="2xl"
        >
            {renderContent()}
        </AppModal>
    )
}

export default SubscriptionPlanCheckoutModal