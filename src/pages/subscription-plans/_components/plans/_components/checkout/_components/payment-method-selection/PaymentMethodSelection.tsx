import { ModalBody, ModalFooter, ModalHeader, useRadioGroup } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import BasicButton from 'components/common/BasicButton/BasicButton';
import useAppToast from 'functions/hooks/toast/useToast';
import { SubscriptionPlanPaymentMethod } from 'lib/apis/subscription/interfaces';
import { getSubscriptionPaymentMethodsService, subscriptionPlanCryptoPaymentService, subscriptionPlanStripePaymentService } from 'lib/apis/subscription/subscriptionServices';
import { appDevelopment } from 'lib/utils/app/variable';
import { getNetworkProvider } from 'lib/utils/chains/chainProvider';
import { Chain, ChainWallet, Network } from 'lib/utils/chains/dto/chains';
import useSubscriptionPlanPurchaseStore from 'pages/subscription-plans/_components/plans/store/planPurchaseStore';
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { ModalStep } from '../../SubscriptionPlanCheckoutModal';
import PurchaseStepInformation from '../PurchaseStepInformation';
import PaymentMethodRadio from './PaymentMethodRadio';

interface Props {
    setplanPurchaseModalStep: (step: ModalStep) => void;
    setStripeClientSecret: (clientSecret: string) => void;
}

export default function PaymentMethodSelection({ setStripeClientSecret, setplanPurchaseModalStep }: Props) {
    const { _id: selectedPlanId } = useSubscriptionPlanPurchaseStore((state) => state.selectedPlan)
    const preferredPlanDuration = useSubscriptionPlanPurchaseStore((state) => state.preferredPlanDuration)
    const { showToast } = useAppToast()
    const { isLoading: stripePaymentLoading, mutateAsync: confirmStripePayment } = useMutation(() => subscriptionPlanStripePaymentService({ month: preferredPlanDuration.month, subId: selectedPlanId, recurring: false }))
    const { isLoading: cryptoPaymentLoading, mutateAsync: confirmCryptoPayment } = useMutation(() => subscriptionPlanCryptoPaymentService({
        chain: selectedPaymentMethod.type,
        token: selectedPaymentMethod.tokens?.find(t => t.isNative).type || "",
        checkoutData: { month: preferredPlanDuration.month, subId: selectedPlanId, recurring: false }
    }))
    const { isFetching: isFethingPaymentMethods, isError, data: paymentMethods } = useQuery({
        queryKey: "plan-payment-methods",
        queryFn: () => getSubscriptionPaymentMethodsService(),
        refetchOnWindowFocus: false
    })
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<SubscriptionPlanPaymentMethod>(paymentMethods?.data[0])
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'preferred-payment-method',
        onChange: (type) => setSelectedPaymentMethod(paymentMethods.data.find((method) => method.type === type)),
        value: selectedPaymentMethod?.type
    })

    const handlePayment = async () => {
        try {
            if (selectedPaymentMethod.type === "STRIPE") {
                const { data: { clientSecret } } = await confirmStripePayment()
                setplanPurchaseModalStep("StripePayment")
                setStripeClientSecret(clientSecret)
                return
            }
            console.log(getChain(selectedPaymentMethod.type))
            const chainProvider = await getNetworkProvider(getChain(selectedPaymentMethod.type), appDevelopment ? Network.TESTNET : Network.MAINNET, "", ChainWallet.Metamask).walletLogin()
            const { address } = await chainProvider.walletLogin()

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
                {
                    isFethingPaymentMethods ? <p>Loading...</p> :
                        paymentMethods.data.map(paymentMethod => <PaymentMethodRadio
                            key={paymentMethod.type}
                            paymentMethod={paymentMethod}
                            {...getRadioProps({ value: paymentMethod.type })}
                        />
                        )
                }
            </ModalBody>
            <ModalFooter display={"flex"} alignItems={"center"} gap={{ xl: 6, base: 1 }}>
                <BasicButton width={"50%"} variant='outline' onClick={() => setplanPurchaseModalStep("PlanConfirmation")}>Back</BasicButton>
                <BasicButton width={"50%"} isDisabled={stripePaymentLoading} isLoading={stripePaymentLoading} onClick={handlePayment}>Next</BasicButton>
            </ModalFooter>
        </>
    )
}

const getChain = (selectedPaymentMethod: string) => {
    let selectedChain: Chain;
    switch (selectedPaymentMethod) {
        case "POLYGON":
            selectedChain = Chain.POLYGON
            break;
        case "BINANCE":
            selectedChain = Chain.BINANCE
            break;
        case "STACKS":
            selectedChain = Chain.STACKS
            break;
        case "XRPLSIDECHAIN":
            selectedChain = Chain.XRPLSIDECHAIN
            break;
        case "NEAR":
            selectedChain = Chain.NEAR
            break;
        case "SKALE":
            selectedChain = Chain.SKALE
            break;
        case "BASE":
            selectedChain = Chain.BASE
            break;
        case "LINEA":
            selectedChain = Chain.LINEA
            break;
        case "ETH":
            selectedChain = Chain.ETH
            break;
        default: selectedChain = Chain.POLYGON
    }
    return selectedChain
}