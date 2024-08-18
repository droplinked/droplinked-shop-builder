import { Box, ModalBody, ModalFooter, ModalHeader, useRadioGroup } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import BasicButton from 'components/common/BasicButton/BasicButton';
import useAppToast from 'functions/hooks/toast/useToast';
import { buySubscriptionPlanService } from 'lib/apis/subscription/subscriptionServices';
import useSubscriptionPlanPurchaseStore from 'pages/subscription-plans/_components/plans/store/planPurchaseStore';
import React, { ReactNode, useState } from 'react';
import { useMutation } from 'react-query';
import { ModalStep } from '../../SubscriptionPlanCheckoutModal';
import PurchaseStepInformation from '../PurchaseStepInformation';
import PaymentMethodRadio from './PaymentMethodRadio';

type PaymentMethod = {
    type: string
    label: string
    icon: ReactNode
}

const paymentMethods: PaymentMethod[] = [
    { type: "Stripe", label: "Stripe", icon: <AppIcons.NewStripe /> },
    { type: "Linea", label: "Linea", icon: <AppIcons.BlueLinea /> },
    { type: "Binance", label: "Binance", icon: <Box width={6} height={6}><AppIcons.Binance /></Box> },
    { type: "Polygon", label: "Polygon", icon: <AppIcons.NewPolygon /> },
    { type: "Base", label: "Base", icon: <AppIcons.BlueBase /> },
    { type: "Solana", label: "Solana", icon: <AppIcons.NewSolana /> },
    { type: "Redbelly", label: "Redbelly", icon: <AppIcons.NewRedbelly /> }
]

interface Props {
    setplanPurchaseModalStep: (step: ModalStep) => void;
    setStripeClientSecret: (clientSecret: string) => void;
}

function PaymentMethodSelection({ setStripeClientSecret, setplanPurchaseModalStep }: Props) {
    const { _id } = useSubscriptionPlanPurchaseStore((state) => state.selectedPlan)
    const preferredPlanDuration = useSubscriptionPlanPurchaseStore((state) => state.preferredPlanDuration)
    const { isLoading, mutateAsync: confirmPlan } = useMutation(() => buySubscriptionPlanService({ month: preferredPlanDuration.month, subId: _id, recurring: false }))
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>(paymentMethods[0])
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'preferred-payment-method',
        onChange: (type) => setSelectedPaymentMethod(paymentMethods.find((method) => method.type === type)),
        value: selectedPaymentMethod.type
    })
    const { showToast } = useAppToast()

    const handlePayment = async () => {
        try {
            if (selectedPaymentMethod.type === "Stripe") {
                const { data: { clientSecret } } = await confirmPlan()
                setplanPurchaseModalStep("StripePayment")
                setStripeClientSecret(clientSecret)
            }
        }
        catch (e) {
            showToast({ message: (e as Error).message, type: "error" })
        }
    }

    return (
        <>
            <ModalHeader paddingBlock={0}>
                <PurchaseStepInformation
                    icon={<AppIcons.PaymentMethodSelection />}
                    title='Payment methods'
                    description={"How would you like to pay for your subscription?"}
                />
            </ModalHeader>
            <ModalBody display={"flex"} flexDirection={"column"} gap={4} paddingBlock={0} {...getRootProps()}>
                {paymentMethods.map((method) => <PaymentMethodRadio
                    key={method.type}
                    paymentMethod={method}
                    {...getRadioProps({ value: method.type })}
                />)}
            </ModalBody>
            <ModalFooter display={"flex"} alignItems={"center"} gap={{ xl: 6, base: 1 }}>
                <BasicButton width={"50%"} variant='outline' onClick={() => setplanPurchaseModalStep("PlanConfirmation")}>Back</BasicButton>
                <BasicButton width={"50%"} isDisabled={isLoading} isLoading={isLoading} onClick={handlePayment}>Next</BasicButton>
            </ModalFooter>
        </>
    )
}

export default PaymentMethodSelection