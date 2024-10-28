import hashkeyModel from 'components/common/hashKey/model';
import { recordBatchCasperService, recordCasperService } from 'lib/apis/sku/services';
import { appDevelopment } from 'lib/utils/app/variable';
import {
	ChainNotImplementedException,
	getNetworkProvider,
} from 'lib/utils/chains/chainProvider';
import { Beneficiary } from 'lib/utils/chains/dto/chainStructs';
import { RecordProduct } from 'lib/utils/chains/dto/recordDTO';
import {
	SkaleUsdcAddressForMainnet,
	SkaleUsdcAddressForTestnet,
} from 'lib/utils/chains/providers/evm/evmConstants';
import { droplink_wallet } from 'lib/utils/statics/adresses';
import { IRecordParamsData } from '../..';
import {
	DropWeb3,
	Network,
	Chain,
	Web3Actions,
	ChainWallet,
	ProductType,
	toEthAddress,
	RecordResponse,
	ISKUDetails,
} from 'droplinked-web3';

interface Irecord {
	product: any;
	blockchain: string;
	accountAddress: string;
	nftContract: string;
	shopAddress: string;
	products: RecordProduct[];
}

export interface IStacks {
	login: any;
	isRequestPending: any;
	openContractCall: any;
	stxAddress: any;
}

export interface Ideploy {
	data: IRecordParamsData;
	product: any;
	sku: any;
	deployHash: string;
}

export interface IdeployBatch {
	royalty: any;
	commission: any;
	product: any;
	deployHash: string;
	blockchain: string;
}

const recordModel = {
	record: async ({
		product,
		blockchain,
		accountAddress,
		nftContract,
		shopAddress,
		products,
	}: Irecord) => {
		const web3 = new DropWeb3(
			appDevelopment ? Network.TESTNET : Network.MAINNET
		);
		const provider = web3.web3Instance({
			method: Web3Actions.RECORD_AFFILIATE,
			chain: Chain[blockchain],
			nftContractAddress: nftContract,
			shopContractAddress: shopAddress,
			preferredWallet: ChainWallet.Metamask,
			userAddress: accountAddress,
		});
		// ---------------- new parameters: ------------------------
		// get these parameters from recorder:
		const type = ProductType.DIGITAL; // type of the product
		const paymentWallet = accountAddress; // the wallet in which the funds would go
		let beneficiaries: Beneficiary[] = []; // this is the value added services
		const acceptsManageWallet = true; // if user accepts the manage wallet
		const pod = product.product_type === 'PRINT_ON_DEMAND';

		let record: RecordResponse;
		const commission = products[0].commission;
		const royalty = products[0].royalty;
		const skaleUSDCAddress = appDevelopment
			? SkaleUsdcAddressForTestnet
			: SkaleUsdcAddressForMainnet;
		// we want to set the usdc address for payment currency in skale
		const currencyAddress =
			Chain[blockchain] !== Chain.SKALE
				? '0x0000000000000000000000000000000000000000'
				: skaleUSDCAddress;

		if (products.length === 1) {
			// ----------------------------------------------------------
			if (blockchain === 'CASPER') {
				throw new ChainNotImplementedException(
					'Casper is not implemented'
				);
			} else {
				const sku = products[0].skuProperties;
				const imageUrl = products[0].image_url;
				const quantity = products[0].amount;
				if (pod)
					beneficiaries = [
						{
							isPercentage: false,
							value: sku.rawPrice * 100,
							wallet: droplink_wallet,
						},
					];
				const skuId = sku['_id']; // TODO: check here
				console.log(quantity, sku.quantity);
				record = await provider.recordProduct(
					{
						acceptsManageWallet: acceptsManageWallet,
						commission: commission * 100,
						royalty: royalty * 100,
						currencyAddress:
							toEthAddress(currencyAddress),
						description: product.description,
						productTitle: product.title,
						type: type,
					},
					[
						{
							amount: pod
								? quantity
								: sku.quantity,
							imageUrl:
								imageUrl ||
								product.media[0].url,
							beneficiaries,
							price: sku.price * 100,
							skuID: skuId,
							skuProperties: sku,
						},
					]
				);
			}
		} else {
			if (blockchain === 'CASPER') {
				throw new ChainNotImplementedException(
					'Casper is not implemented'
				);
			} else {
				const skus: ISKUDetails[] = products.map((sku) => {
					return {
						amount: pod
							? sku.amount
							: sku.skuProperties.quantity,
						imageUrl: sku.image_url,
						beneficiaries: !pod
							? sku.beneficiaries
							: [
									{
										isPercentage:
											false,
										value:
											sku
												.skuProperties
												.rawPrice *
											100,
										wallet: droplink_wallet,
									},
							  ],
						price: sku.price * 100,
						skuID: sku.skuProperties['_id'],
						skuProperties: sku.skuProperties,
					};
				});
				record = await provider.recordProduct(
					{
						acceptsManageWallet: acceptsManageWallet,
						commission: commission * 100,
						royalty: royalty * 100,
						currencyAddress:
							toEthAddress(currencyAddress),
						description: product.description,
						productTitle: product.title,
						type: type,
					},
					skus
				);
			}
		}

		return record;
	},

	refactorSku: (sku: any) => {
		const result = {};
		Object.keys(sku)
			.filter(
				(el) =>
					![
						'recordData',
						'partialOwners',
						'sold_units',
					].includes(el)
			)
			.forEach((el) => (result[el] = sku[el]));
		return result;
	},

	deploy: ({ data, deployHash, product, sku }: Ideploy) => {
		return new Promise<void>(async (resolve: any, reject) => {
			try {
				const record = await recordCasperService({
					chain: data.blockchain,
					params: {
						deploy_hash: deployHash,
						deploy_hash_link: hashkeyModel.getLink({
							blockchain: data.blockchain,
							hashkey: deployHash,
						}),
						skuID: sku._id,
						royalty: parseInt(data.royalty),
						canBeAffiliated: data.commission > 0,
						commision: parseInt(data.commission),
						...(product.product_type ===
							'PRINT_ON_DEMAND' && {
							recorded_quantity: parseInt(
								data.quantity
							),
						}),
					},
				});
				resolve(record);
			} catch (error) {
				reject(error);
			}
		});
	},

	deployBatch: ({
		royalty,
		commission,
		deployHash,
		product,
		blockchain,
	}: IdeployBatch) => {
		return new Promise<void>(async (resolve: any, reject) => {
			try {
				const record = await recordBatchCasperService({
					chain: blockchain,
					params: {
						deploy_hash: deployHash,
						deploy_hash_link: hashkeyModel.getLink({
							blockchain: blockchain,
							hashkey: deployHash,
						}),
						productId: product._id,
						royalty: parseInt(royalty),
						canBeAffiliated: commission > 0,
						commision: parseInt(commission),
					},
				});
				resolve(record);
			} catch (error) {
				reject(error);
			}
		});
	},
};

export default recordModel;
