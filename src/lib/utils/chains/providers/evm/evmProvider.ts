import { ethers } from 'ethers';
import {
	ChainProvider,
	IChainPayment,
	WalletNotFoundException,
} from '../../chainProvider';
import {
	AffiliateRequestData,
	Beneficiary,
	EthAddress,
	ProductType,
	RecordData,
	Uint256,
} from '../../dto/chainStructs';
import { Chain, ChainWallet, getGasPrice, Network } from '../../dto/chains';
import { ModalInterface, defaultModal } from '../../dto/modalInterface';
import { EVMApproveRequest, EVMDisapproveRequest } from './evmAffiliate';
import { EVMDeployShop } from './evmDeployShop';
import {
	evmLogin,
	isMetamaskInstalled,
	getAccounts,
	isWalletConnected,
	isChainCorrect,
	changeChain,
	requestAccounts,
} from './evmLogin';
import { EVMPublishRequest } from './evmPublish';
import { EVMBatchRecord, EVMrecordMerch } from './evmRecord';
import { RecordProduct } from '../../dto/recordDTO';
import { EVMPayment } from './evmPayment';
import { getERC20TokenTransferABI } from './evmConstants';
import axiosInstance from 'lib/apis/axiosConfig';

export class EVMProvider implements ChainProvider {
	chain: Chain = Chain.BINANCE;
	network: Network = Network.TESTNET;
	address: string = '';
	modalInterface: ModalInterface = new defaultModal();
	wallet: ChainWallet = ChainWallet.Metamask;

	constructor(_chain: Chain, _network: Network) {
		this.chain = _chain;
		this.network = _network;
	}

	setWallet(wallet: ChainWallet) {
		this.wallet = wallet;
		return this;
	}

	setModal(modal: ModalInterface): ChainProvider {
		this.modalInterface = modal;
		return this;
	}

	getWalletProvider() {
		const ethereum = (window as any).ethereum;
		if (!ethereum)
			throw new WalletNotFoundException('No EVM Wallet is installed');
		// multiple wallet installed
		if (ethereum.providerMap) {
			if (this.wallet === ChainWallet.Metamask) {
				if (!ethereum.providerMap.get('MetaMask'))
					throw new WalletNotFoundException(
						'Metamask is not installed'
					);
				return new ethers.providers.Web3Provider(
					ethereum.providers.find((x: any) => {
						return x.isMetaMask;
					})
				);
			} else if (this.wallet === ChainWallet.CoinBase) {
				if (!ethereum.providerMap.get('CoinbaseWallet'))
					throw new WalletNotFoundException(
						'Coinbase wallet not found'
					);
				return new ethers.providers.Web3Provider(
					ethereum.providers.find((x: any) => {
						return x.isCoinbaseWallet;
					})
				);
			} else if (this.wallet === ChainWallet.Phantom) {
				if (!ethereum.providerMap.get('CoinbaseWallet'))
					throw new WalletNotFoundException(
						'Coinbase wallet not found'
					);
				return new ethers.providers.Web3Provider(
					ethereum.providers.find((x: any) => {
						return x.isCoinbaseWallet;
					})
				);
			} else {
				throw new Error('Wallet not implemented');
			}
		} else {
			// single wallet installed
			if (this.wallet === ChainWallet.CoinBase) {
				if (!(window as any).ethereum.isCoinbaseWallet)
					throw new WalletNotFoundException(
						'Coinbase wallet not found'
					);
			} else if (this.wallet === ChainWallet.Metamask) {
				if (!(window as any).ethereum.isMetaMask)
					throw new WalletNotFoundException(
						'Metamask wallet not found'
					);
			}
			return new ethers.providers.Web3Provider(
				(window as any).ethereum
			);
		}
	}

	async deployShop(
		shopName: string,
		shopAddress: string,
		shopOwner: string,
		shopLogo: string,
		shopDescription: string
	): Promise<any> {
		await this.handleWallet(this.address);
		return await EVMDeployShop(
			this.getWalletProvider(),
			this.chain,
			this.network,
			this.address,
			shopName,
			shopAddress,
			shopOwner,
			shopLogo,
			shopDescription,
			this.modalInterface
		);
	}

	casperRecordProduct(
		skuProperties: any,
		productTitle: string,
		description: string,
		imageUrl: string,
		price: number,
		amount: number,
		commission: number,
		skuID: string
	): Promise<string> {
		throw new Error('Method not implemented.');
	}

	setAddress(address: string): ChainProvider {
		this.address = address;
		return this;
	}

	async handleWallet(_address: string) {
		if (!isMetamaskInstalled()) {
			this.modalInterface.error('Metamask is not installed');
			throw new WalletNotFoundException('Metamask is not installed');
		}
		this.modalInterface.waiting('Getting accounts...');
		const provider = this.getWalletProvider();
		const ethereum = provider.provider as any;
		let accounts = await getAccounts(ethereum);
		if (!isWalletConnected(ethereum) || accounts.length === 0) {
			this.modalInterface.waiting('Please connect your wallet');
			let { address } = await this.walletLogin();
			if (
				_address.toLocaleLowerCase() !==
				address.toLocaleLowerCase()
			) {
				await (window as any).ethereum.request({
					method: 'wallet_requestPermissions',
					params: [
						{
							eth_accounts: {},
						},
					],
				});
				this.handleWallet(_address);
				// throw new AccountChangedException("The current account on your wallet is not the one you've logged in with!");
			}
		}
		if (!(await isChainCorrect(ethereum, this.chain, this.network))) {
			this.modalInterface.waiting('Changing chain...');
			await changeChain(ethereum, this.chain, this.network);
		}
		if (
			String(accounts[0]).toLocaleLowerCase() !==
			_address.toLocaleLowerCase()
		) {
			this.modalInterface.waiting(
				'Change your account based on the one you used to login...'
			);
			await (window as any).ethereum.request({
				method: 'wallet_requestPermissions',
				params: [
					{
						eth_accounts: {},
					},
				],
			});
			this.handleWallet(_address);
		}
		if (this.chain === Chain.SKALE) {
			const distributionRequest = (
				await axiosInstance.post(`shop/sFuelDistribution`, {
					wallet: this.address,
					isTestnet: this.network === Network.TESTNET,
				})
			).data;
			console.log(distributionRequest);
		}

		this.modalInterface.success('Wallet connected');
	}
	async walletLogin() {
		let { address, signature } = await evmLogin(
			this.getWalletProvider(),
			this.chain,
			this.network,
			this.modalInterface
		);
		this.address = address;
		return { address, signature };
	}
	async recordProduct(
		sku_properties: any,
		product_title: string,
		description: string,
		image_url: string,
		price: number,
		amount: number,
		commission: number,
		type: ProductType,
		beneficiaries: Beneficiary[],
		acceptsManageWallet: boolean,
		royalty: number,
		nftContract: EthAddress,
		shopAddress: EthAddress,
		currencyAddress: EthAddress,
		skuID: string
	): Promise<RecordData> {
		await this.handleWallet(this.address);
		return await EVMrecordMerch(
			this.getWalletProvider(),
			this.chain,
			sku_properties,
			this.address,
			product_title,
			description,
			image_url,
			price,
			amount,
			commission,
			type,
			beneficiaries,
			acceptsManageWallet,
			royalty,
			nftContract,
			shopAddress,
			currencyAddress,
			skuID,
			this.modalInterface
		);
	}

	async recordBatch(
		products: RecordProduct[],
		shopAddress: string,
		nftContract: string
	): Promise<RecordData> {
		await this.handleWallet(this.address);
		return await EVMBatchRecord(
			this.getWalletProvider(),
			this.chain,
			this.address,
			shopAddress,
			nftContract,
			this.modalInterface,
			products
		);
	}

	async publishRequest(
		productId: Uint256,
		shopAddress: EthAddress
	): Promise<AffiliateRequestData> {
		await this.handleWallet(this.address);
		return await EVMPublishRequest(
			this.getWalletProvider(),
			this.chain,
			this.address,
			productId,
			shopAddress,
			this.modalInterface
		);
	}
	async approveRequest(
		requestId: Uint256,
		shopAddress: EthAddress
	): Promise<string> {
		await this.handleWallet(this.address);
		return await EVMApproveRequest(
			this.getWalletProvider(),
			this.chain,
			this.address,
			requestId,
			shopAddress,
			this.modalInterface
		);
	}
	async disapproveRequest(
		requestId: Uint256,
		shopAddress: EthAddress
	): Promise<string> {
		await this.handleWallet(this.address);
		return await EVMDisapproveRequest(
			this.getWalletProvider(),
			this.chain,
			this.address,
			requestId,
			shopAddress,
			this.modalInterface
		);
	}

	async payment(
		data: IChainPayment
	): Promise<{ deploy_hash: string; cryptoAmount: any }> {
		// if (this.wallet !== ChainWallet.BaseSmartWallet)
		await this.handleWallet(this.address);
		return await EVMPayment(
			await this.getWalletProvider(),
			this.chain,
			this.network,
			this.address,
			data,
			this.wallet
		);
	}

	async d3Login(): Promise<{ address: string }> {
		const ethereum = this.getWalletProvider().provider;
		if (!(await isWalletConnected(ethereum))) {
			await requestAccounts(ethereum);
		}
		const res = await getAccounts(ethereum);
		let address = res[0];
		return { address };
	}

	async paymentWithToken(
		receiver: string,
		amount: number,
		tokenAddress: string
	): Promise<string> {
		await this.handleWallet(this.address);
		const abi = getERC20TokenTransferABI();
		const provider = (await this.getWalletProvider()).getSigner();
		const contract = new ethers.Contract(tokenAddress, abi, provider);
		try {
			await contract.callStatic.transfer(
				receiver,
				BigInt(Math.floor(amount * 1e6)) * BigInt(1e12)
			);
			const estimation = (
				await contract.estimateGas.transfer(
					receiver,
					BigInt(Math.floor(amount * 1e6)) * BigInt(1e12)
				)
			)
				.toBigInt()
				.valueOf();
			const gasPrice = (
				await getGasPrice(await this.getWalletProvider())
			).valueOf();
			const tx = await contract.transfer(
				receiver,
				BigInt(Math.floor(amount * 1e6)) * BigInt(1e12),
				{
					gasPrice: (gasPrice * BigInt(105)) / BigInt(100),
					gasLimit:
						(estimation * BigInt(105)) / BigInt(100),
				}
			);
			return tx.hash;
		} catch (e: any) {
			if (e.reason) {
				if (
					e.reason ===
					'ERC20: transfer amount exceeds balance'
				) {
					throw new Error('Insufficient token balance');
				} else if (
					e.reason ===
					'insufficient funds for gas * price + value'
				) {
					throw new Error('Insufficient ETH balance');
				}
				if (e.reason === 'bad result from backend') {
					throw new Error(
						'Something went wrong, check your eth and token balance'
					);
				}
				throw new Error(e.reason);
			}
			throw e;
		}
	}
}
