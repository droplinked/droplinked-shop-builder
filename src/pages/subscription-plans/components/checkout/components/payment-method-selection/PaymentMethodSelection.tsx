import { ModalBody, ModalFooter, useRadioGroup } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import BasicButton from 'components/common/BasicButton/BasicButton';
import AppTypography from 'components/common/typography/AppTypography';
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData';
import { Chain, ChainWallet, DropWeb3, Network, Web3Actions, ZERO_ADDRESS } from 'droplinked-web3';
import useAppToast from 'hooks/toast/useToast';
import { SubscriptionPlanPaymentMethod } from 'lib/apis/subscription/interfaces';
import {
	getSubscriptionPaymentMethodsService,
	sendPlanPurchaseTransactionToWeb3Service,
	subscriptionPlanCryptoPaymentService,
} from 'lib/apis/subscription/subscriptionServices';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import useSubscriptionPlanPurchaseStore from 'stores/subscription-plan.ts/subscriptionPlanStore';
import { appDevelopment } from 'utils/app/variable';
import { ModalState } from '../../types/interfaces';
import Loading from './Loading';
import PaymentMethodRadio from './PaymentMethodRadio';

interface Props {
	setModalData: React.Dispatch<React.SetStateAction<ModalState>>;
	selectedPaymentMethod: SubscriptionPlanPaymentMethod;
}

export default function PaymentMethodSelection({ setModalData, selectedPaymentMethod }: Props) {
	const { _id: selectedPlanId } = useSubscriptionPlanPurchaseStore((state) => state.selectedPlan);
	const preferredPlanDuration = useSubscriptionPlanPurchaseStore((state) => state.preferredPlanDuration);
	const { showToast } = useAppToast();
	const [isTransactionInProgress, setTransactionInProgress] = useState(false);
	const {
		isFetching: isFethingPaymentMethods,
		isError,
		data: paymentMethods,
		refetch: refetchPaymentMethods,
	} = useQuery({
		queryKey: 'plan-payment-methods',
		queryFn: () => getSubscriptionPaymentMethodsService(),
		staleTime: 1000 * 60 * 5, // 5 minutes
		onSuccess: (data: any) => {
			const paymentMethodsData = data?.data?.data;
			if (!selectedPaymentMethod && paymentMethodsData?.length > 0) {
				setModalData((prevData) => ({
					...prevData,
					selectedPaymentMethod: paymentMethodsData[0],
				}));
			}
		},
	});
	const { getRootProps, getRadioProps } = useRadioGroup({
		name: 'preferred-payment-method',
		onChange: (type) => {
			const paymentMethodsData = (paymentMethods as any)?.data?.data;
			if (paymentMethodsData?.length) {
				const selectedMethod = paymentMethodsData.find((method) => method.type === type);
				if (selectedMethod) {
					setModalData((prevData) => ({
						...prevData,
						selectedPaymentMethod: selectedMethod,
					}));
				}
			}
		},
		value: selectedPaymentMethod?.type,
	});

	useEffect(() => {
		if (!selectedPaymentMethod) refetchPaymentMethods();
	}, [selectedPaymentMethod, refetchPaymentMethods]);

	const handlePayment = () => (selectedPaymentMethod.type === 'STRIPE' ? handleStripePayment() : handleCryptoPayment());

	const handleStripePayment = async () => {
		try {
			setTransactionInProgress(true);
			setModalData((prevData) => ({
				...prevData,
				step: 'StripePayment',
			}));
		} catch (e) {
			showToast({ message: (e as Error).message, type: 'error' });
		} finally {
			setTransactionInProgress(false);
		}
	};

	const handleCryptoPayment = async () => {
		try {
			setTransactionInProgress(true);
			const paymentMethodType = selectedPaymentMethod.type;
			const tokenType = selectedPaymentMethod.tokens?.find((t) => t.isNative).type;
			const dropWeb3 = new DropWeb3(appDevelopment ? Network.TESTNET : Network.MAINNET);
			const loginProvider = dropWeb3.web3Instance({
				method: Web3Actions.LOGIN,
				preferredWallet: ChainWallet.Metamask,
			});
			const { address } = await loginProvider.walletLogin();
			const paymentProvider = dropWeb3.web3Instance({
				method: Web3Actions.PAYMENT,
				chain: Chain[paymentMethodType],
				preferredWallet: ChainWallet.Metamask,
				userAddress: address,
			});
			const {
				data: { shopSubscriptionId, paymentData },
			} = await subscriptionPlanCryptoPaymentService({
				chain: paymentMethodType,
				token: tokenType,
				checkoutData: {
					month: preferredPlanDuration.month,
					subId: selectedPlanId,
				},
			});
			const { transactionHash } = await paymentProvider.customPayment({
				tokenAddress: ZERO_ADDRESS,
				...paymentData,
			});
			await sendPlanPurchaseTransactionToWeb3Service(paymentMethodType, {
				deploy_hash: transactionHash,
				subscriptionId: shopSubscriptionId,
				recurring: false,
				walletAddress: address,
			});
			setModalData((prevData) => ({
				...prevData,
				step: 'SuccessfulPayment',
			}));
		} catch (e) {
			setModalData((prevData) => ({
				...prevData,
				step: 'FailedPayment',
			}));
		} finally {
			setTransactionInProgress(false);
		}
	};

	const renderContent = () => {
		if (isFethingPaymentMethods) return <Loading />;
		if (isError)
			return (
				<AppTypography fontSize={16} color={'red.400'}>
					Oops! It looks like we can not access payment methods at the moment. Give it another try soon?
				</AppTypography>
			);

		const paymentMethodsData = (paymentMethods as any)?.data?.data;
		if (!paymentMethodsData?.length) {
			return (
				<AppTypography fontSize={16} color={'gray.500'}>
					No payment methods available
				</AppTypography>
			);
		}
		
		return paymentMethodsData.map((paymentMethod) => (
			<PaymentMethodRadio 
				key={paymentMethod.type} 
				paymentMethod={paymentMethod} 
				{...getRadioProps({ value: paymentMethod.type })} 
			/>
		));
	};

	return (
		<>
			<ModalHeaderData
				icon={<AppIcons.PaymentMethodSelection />}
				title="Payment methods"
				description={'How would you like to pay for your subscription?'}
			/>
			<ModalBody display={'flex'} flexDirection={'column'} gap={4} {...getRootProps()}>
				{renderContent()}
			</ModalBody>
			<ModalFooter display={'flex'} alignItems={'center'} gap={{ xl: 6, base: 3 }}>
				<BasicButton
					minWidth={'unset'}
					width={'50%'}
					isDisabled={isTransactionInProgress}
					variant="outline"
					onClick={() =>
						setModalData((prevData) => ({
							...prevData,
							step: 'PlanConfirmation',
						}))
					}
				>
					Back
				</BasicButton>
				<BasicButton minWidth={'unset'} width={'50%'} isDisabled={isTransactionInProgress} isLoading={isTransactionInProgress} onClick={handlePayment}>
					Next
				</BasicButton>
			</ModalFooter>
		</>
	);
}