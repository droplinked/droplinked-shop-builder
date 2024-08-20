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
import PurchaseStepInformation from '../PurchaseStepInformation';
import PaymentMethodRadio from './PaymentMethodRadio';
import { ModalState, ModalStep } from '../../types/interfaces';
import Loading from './Loading';

interface Props {
    setModalData: React.Dispatch<React.SetStateAction<ModalState>>;
    selectedPaymentMethod: SubscriptionPlanPaymentMethod;
}

export default function PaymentMethodSelection({ setModalData, selectedPaymentMethod }: Props) {
    const { _id: selectedPlanId } = useSubscriptionPlanPurchaseStore((state) => state.selectedPlan)
    const preferredPlanDuration = useSubscriptionPlanPurchaseStore((state) => state.preferredPlanDuration)
    const { showToast } = useAppToast()
    const { isFetching: isFethingPaymentMethods, isError, data: paymentMethods } = useQuery({
        queryKey: "plan-payment-methods",
        queryFn: () => getSubscriptionPaymentMethodsService(),
        staleTime: 1000 * 60 * 5, // 5 minutes,
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            if (!selectedPaymentMethod) setModalData((prevData) => ({ ...prevData, selectedPaymentMethod: data.data[0] }))
        }
    })
    const { isLoading: stripePaymentLoading, mutateAsync: confirmStripePayment } = useMutation(() => subscriptionPlanStripePaymentService({ month: preferredPlanDuration.month, subId: selectedPlanId, recurring: false }))
    const { isLoading: cryptoPaymentLoading, mutateAsync: confirmCryptoPayment } = useMutation(() => subscriptionPlanCryptoPaymentService({
        chain: selectedPaymentMethod.type,
        token: selectedPaymentMethod.tokens?.find(t => t.isNative).type || "",
        checkoutData: { month: preferredPlanDuration.month, subId: selectedPlanId, recurring: false }
    }))
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'preferred-payment-method',
        onChange: (type) => setModalData((prevData) => ({ ...prevData, selectedPaymentMethod: paymentMethods.data.find((method) => method.type === type) })),
        value: selectedPaymentMethod?.type
    })

    const handlePayment = async () => {
        try {
            if (selectedPaymentMethod.type === "STRIPE") {
                const { data: { clientSecret } } = await confirmStripePayment()
                setModalData((prevData) => ({ ...prevData, modalStep: "StripePayment", stripeClientSecret: clientSecret }))
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
                    isFethingPaymentMethods ?
                        <Loading /> :
                        paymentMethods.data.map(paymentMethod =>
                            <PaymentMethodRadio
                                key={paymentMethod.type}
                                paymentMethod={paymentMethod}
                                {...getRadioProps({ value: paymentMethod.type })}
                            />
                        )
                }
            </ModalBody>
            <ModalFooter display={"flex"} alignItems={"center"} gap={{ xl: 6, base: 1 }}>
                <BasicButton width={"50%"} variant='outline' onClick={() => setModalData((prevData) => ({ ...prevData, modalStep: "PlanConfirmation" }))}>Back</BasicButton>
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