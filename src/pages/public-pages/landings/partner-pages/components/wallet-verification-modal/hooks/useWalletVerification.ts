import { ChainWallet, DropWeb3, Network, Web3Actions } from 'droplinked-web3';
import useAppToast from 'hooks/toast/useToast';
import { useMutation } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { IPostUserVerifyPartner } from 'services/user/interfaces';
import { postUserVerifyD3, postUserVerifyUD } from 'services/user/services';
import { appDevelopment } from 'utils/app/variable';
import { usePartnerLanding } from '../../../context/PartnerLandingContext';
import { useWalletVerificationContext } from '../../../context/WalletVerificationContext';

export const useWalletVerification = () => {
	const { showToast } = useAppToast();
	const [searchParams, setSearchParams] = useSearchParams();
	const { partnerName } = usePartnerLanding();
    const { methods: { updateStates }} = useWalletVerificationContext();
    
	const mutation = useMutation(async (props: IPostUserVerifyPartner) => {
		switch (partnerName) {
			case 'D3':
				return postUserVerifyD3(props);
			case 'Unstoppable Domains':
			case 'Polygon':
				return postUserVerifyUD(props);
			default:
				throw new Error('Unsupported partner');
		}
	});

	const UNSTOPPABLE_CLIENT_ID = process.env.REACT_APP_UNSTOPPABLE_CLIENT_ID;

	const handleVerification = async (walletAddress: string, walletType: string) => {
		try {
			const verifyRes = await mutation.mutateAsync({
				walletAddress,
				walletType,
			});

			const data = verifyRes?.data?.data;

			if (!data || data === 'false' || data === false) {
				updateStates({ key: 'currentStep', value: 'error' });
			} else {
				const paramKey = partnerName === 'D3' ? 'd3-id' : 'ud-id';
				searchParams.set(paramKey, data);
				setSearchParams(searchParams);

				updateStates({ key: 'currentStep', value: 'done' });
			}
		} catch (error) {
			updateStates({ key: 'currentStep', value: 'error' });
			throw error;
		}
	};

	const connectD3Wallet = () => {
		return new Promise<void>((resolve, reject) => {
			updateStates({ key: 'currentStep', value: 'loading' });

			new DropWeb3(appDevelopment ? Network.TESTNET : Network.MAINNET)
				.getWalletInfo()
				.then(async (res) => {
					await handleVerification(res?.address, 'EVM');
					resolve();
				})
				.catch((error) => {
					if (error?.message === 'No EVM Wallet is installed') {
						showToast({
							type: 'error',
							message: 'Metamask wallet is not installed!',
						});
						updateStates({
							key: 'currentStep',
							value: 'connect',
						});
					} else {
						updateStates({
							key: 'currentStep',
							value: 'error',
						});
					}
					reject(error);
				});
		});
	};

	const connectUnstoppableWallet = () => {
		return new Promise<void>((resolve, reject) => {
			updateStates({ key: 'currentStep', value: 'loading' });
			new DropWeb3(appDevelopment ? Network.TESTNET : Network.MAINNET)
				.web3Instance({
					method: Web3Actions.LOGIN,
					preferredWallet: ChainWallet.UnstoppableDomains,
				})
				.unstoppableLogin(UNSTOPPABLE_CLIENT_ID as string, window.location.origin)
				.then(async (res) => {
					const wallet = res.idToken.sub;
					await handleVerification(wallet, 'UNSTOPPABLEDOMAIN');
					resolve();
				})
				.catch((error) => {
					if (error?.message === 'No UNSTOPPABLEDOMAIN Wallet is installed') {
						showToast({
							type: 'error',
							message: 'Unstoppable Wallet is not installed!',
						});
						updateStates({
							key: 'currentStep',
							value: 'connect',
						});
					} else {
						updateStates({
							key: 'currentStep',
							value: 'error',
						});
					}
					reject(error);
				});
		});
	};

	const connectWallet = () => {
		switch (partnerName) {
			case 'D3':
				return connectD3Wallet();
			case 'Unstoppable Domains':
			case 'Polygon':
				return connectUnstoppableWallet();
			default:
				throw new Error('Unsupported partner');
		}
	};

	return { connectWallet };
};
