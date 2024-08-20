import { ModalBody, ModalFooter, ModalHeader, useRadioGroup } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import BasicButton from 'components/common/BasicButton/BasicButton';
import useAppToast from 'functions/hooks/toast/useToast';
import { SubscriptionPlanPaymentMethod } from 'lib/apis/subscription/interfaces';
import { getSubscriptionPaymentMethodsService, sendPlanPurchaseTransactionToWeb3Service, subscriptionPlanCryptoPaymentService, subscriptionPlanStripePaymentService } from 'lib/apis/subscription/subscriptionServices';
import { appDevelopment } from 'lib/utils/app/variable';
import { getNetworkProvider } from 'lib/utils/chains/chainProvider';
import { Chain, ChainWallet, Network } from 'lib/utils/chains/dto/chains';
import useSubscriptionPlanPurchaseStore from 'pages/subscription-plans/_components/plans/store/planPurchaseStore';
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { ModalState } from '../../types/interfaces';
import PurchaseStepInformation from '../PurchaseStepInformation';
import Loading from './Loading';
import PaymentMethodRadio from './PaymentMethodRadio';

interface Props {
    setModalData: React.Dispatch<React.SetStateAction<ModalState>>;
    selectedPaymentMethod: SubscriptionPlanPaymentMethod;
}

export default function PaymentMethodSelection({ setModalData, selectedPaymentMethod }: Props) {
    const { _id: selectedPlanId } = useSubscriptionPlanPurchaseStore((state) => state.selectedPlan)
    const preferredPlanDuration = useSubscriptionPlanPurchaseStore((state) => state.preferredPlanDuration)
    const { showToast } = useAppToast()
    const [isTransactionInProgress, setTransactionInProgress] = useState(false)
    const { isFetching: isFethingPaymentMethods, isError, data: paymentMethods } = useQuery({
        queryKey: "plan-payment-methods",
        queryFn: () => getSubscriptionPaymentMethodsService(),
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            if (!selectedPaymentMethod) setModalData((prevData) => ({ ...prevData, selectedPaymentMethod: data.data[0] }))
        }
    })
    const { mutateAsync: confirmStripePayment } = useMutation(() => subscriptionPlanStripePaymentService({ month: preferredPlanDuration.month, subId: selectedPlanId, recurring: false }))
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'preferred-payment-method',
        onChange: (type) => setModalData((prevData) => ({ ...prevData, selectedPaymentMethod: paymentMethods.data.find((method) => method.type === type) })),
        value: selectedPaymentMethod?.type
    })

    const handlePayment = () => selectedPaymentMethod.type === "STRIPE" ? hndleStripePayment() : handleCryptoPayment()

    const hndleStripePayment = async () => {
        try {
            setTransactionInProgress(true)
            const { data: { clientSecret } } = await confirmStripePayment()
            setModalData((prevData) => ({ ...prevData, modalStep: "StripePayment", stripeClientSecret: clientSecret }))
        }
        catch (e) {
            showToast({ message: (e as Error).message, type: "error" })
        }
        finally {
            setTransactionInProgress(false)
        }
    }

    const handleCryptoPayment = async () => {
        try {
            setTransactionInProgress(true)
            const paymentMethodType = selectedPaymentMethod.type
            const tokenType = selectedPaymentMethod.tokens?.find(t => t.isNative).type
            const chainProvider = getNetworkProvider(Chain[paymentMethodType], appDevelopment ? Network.TESTNET : Network.MAINNET, "", ChainWallet.Metamask)
            const { address } = await chainProvider.walletLogin()
            const { data: { totalPrice, shopSubscriptionId, paymentData } } = await subscriptionPlanCryptoPaymentService({ chain: paymentMethodType, token: tokenType, checkoutData: { month: preferredPlanDuration.month, subId: selectedPlanId, recurring: false } })
            const paymentResult = getNetworkProvider(Chain[paymentMethodType], appDevelopment ? Network.TESTNET : Network.MAINNET, address)
            const { deploy_hash } = await paymentResult.payment(paymentData)
            await sendPlanPurchaseTransactionToWeb3Service(paymentMethodType, {
                deploy_hash,
                subscriptionId: shopSubscriptionId,
                recurring: false,
                walletAddress: address
            })
            setModalData((prevData) => ({ ...prevData, modalStep: "SuccessfulPayment" }))
        }
        catch (e) {
            setModalData((prevData) => ({ ...prevData, modalStep: "FailedPayment" }))
        }
        finally {
            setTransactionInProgress(false)
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
                <BasicButton width={"50%"} isDisabled={isTransactionInProgress} variant='outline' onClick={() => setModalData((prevData) => ({ ...prevData, modalStep: "PlanConfirmation" }))}>Back</BasicButton>
                <BasicButton width={"50%"} isDisabled={isTransactionInProgress} isLoading={isTransactionInProgress} onClick={handlePayment}>Next</BasicButton>
            </ModalFooter>
        </>
    )
}