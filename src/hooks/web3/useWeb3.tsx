import useAppStore, { IUserWalletsProps } from 'stores/app/appStore';
import { appDevelopment } from 'utils/app/variable';
import web3Model, { IAcceptData, IrecordBatch, IRecordPrams, IRequestData } from './models';
import { DropWeb3, Network, Chain, Web3Actions, ChainWallet } from 'droplinked-web3';

// method: "record" | "request" | "accept"
export type IWeb3 =
	| {
		method: 'record';
		params: IRecordPrams | any;
		chain: string;
		stack: any;
		wallets: Array<IUserWalletsProps>;
		commission?: number;
		royalty?: number;
		product?: any;
		shop?: any;
	}
	| {
		method: 'request';
		params: IRequestData;
		chain: string;
		stack: any;
		wallets: Array<IUserWalletsProps>;
		commission?: number;
		royalty?: number;
		product?: any;
		shop?: any;
	}
	| {
		method: 'accept';
		params: IAcceptData;
		chain: string;
		stack: any;
		wallets: Array<IUserWalletsProps>;
		commission?: number;
		royalty?: number;
		product?: any;
		shop?: any;
	}
	| {
		method: 'record_batch';
		params: IrecordBatch | any;
		chain: string;
		stack: any;
		wallets: Array<IUserWalletsProps>;
		commission: number;
		royalty: number;
		product: any;
		shop: any;
	};

interface IGetChain {
	chain: string;
	wallets: Array<IUserWalletsProps>;
}

interface ILogin {
	chain: string;
	wallets: Array<IUserWalletsProps>;
	stack: any;
}

const useAppWeb3 = () => {
	const { record, request, accept, recordBatch } = web3Model;
	const { updateWallet } = useAppStore();

	const getChain = ({ chain, wallets }: IGetChain) => (wallets ? wallets.find((el) => el.type === chain && el?.address) : null);

	const login = ({ chain, wallets, stack }: ILogin) => {
		return new Promise<any>(async (resolve, reject) => {
			try {
				// userUpdateService({ wallets: null })
				const chainAccount = getChain({ chain, wallets });

				if (chainAccount?.address) {
					resolve(chainAccount[chain === 'CASPER' ? 'public_key' : 'address']);
				} else if (chain === 'STACKS') {
					const address: any = await stack.login();
					resolve(address);
					updateWallet({
						type: 'STACKS',
						address: stack.stxAddress,
					});
				} else {
					const web3 = new DropWeb3(appDevelopment ? Network.TESTNET : Network.MAINNET);

					const provider = web3.web3Instance({
						method: Web3Actions.LOGIN,
						preferredWallet: ChainWallet.Metamask,
						chain: chain as Chain
					});

					const accountInfo = await provider.walletLogin();

					resolve(accountInfo.address);
					updateWallet({
						type: chain,
						address: accountInfo.address,
					});
				}
			} catch (error) {
				reject(error);
			}
		});
	};

	const web3 = ({ method, params, chain, wallets, stack, product, commission, royalty, shop }: IWeb3) => {
		return new Promise<any>(async (resolve, reject) => {
			try {
				const accountAddress = await login({
					chain,
					wallets,
					stack,
				});
				if (method === 'record') {
					const records = await record({
						params,
						accountAddress,
						stack,
					});
					resolve(records);
				} else if (method === 'request') {
					const requests = await request({
						params,
						accountAddress,
						stack,
					});
					resolve(requests);
				} else if (method === 'accept') {
					const requests = await accept({
						params,
						accountAddress,
						stack,
					});
					resolve(requests);
				} else if (method === 'record_batch') {
					const requests = await recordBatch({
						params,
						accountAddress,
						blockchain: chain,
						product,
						shop,
						commission,
						royalty,
						stack,
					});
					resolve(requests);
				}
			} catch (error) {
				reject(error);
			}
		});
	};

	return { web3, login, getChain };
};

export default useAppWeb3;
