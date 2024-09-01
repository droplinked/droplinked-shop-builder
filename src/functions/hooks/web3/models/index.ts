import { Isku } from 'lib/apis/product/interfaces';
import {
	deployShopContractService,
	getDeployPermission,
} from 'lib/apis/shop/shopServices';
import { SHOP_URL, appDevelopment } from 'lib/utils/app/variable';
// import { stacksRecord } from 'lib/utils/blockchain/stacks/record'
// import stacksRequest from 'lib/utils/blockchain/stacks/request'
import { getNetworkProvider } from 'lib/utils/chains/chainProvider';
import { Chain, Network } from 'lib/utils/chains/dto/chains';
import acceptModel from './module/accept/acceptModel';
import recordModel, { IStacks, Ideploy, IdeployBatch } from './module/record/recordModel';
import { SolanaProvider } from '../../../../lib/utils/chains/providers/solana/solana.provider';
import { defaultModal } from '../../../../lib/utils/chains/dto/modalInterface';
import { RecordProduct } from 'lib/utils/chains/dto/recordDTO';
import { Beneficiary, ProductType } from 'lib/utils/chains/dto/chainStructs';
import { droplink_wallet } from 'lib/utils/statics/adresses';

export interface IRecordParamsData {
	commission: any;
	quantity: any;
	blockchain: any;
	royalty: any;
}

export interface IRecordBatchParamsData {
	quantity: any;
	sku: any;
	imageUrl?: string;
}

export interface IRecordPrams {
	data: IRecordParamsData;
	product: any;
	sku: any;
	imageUrl?: string;
	shop: any;
}

export interface Irecord {
	params: IRecordPrams;
	accountAddress: any;
	stack: IStacks;
}

export interface IrecordBatch {
	params: IRecordBatchParamsData[];
	royalty: any;
	commission: any;
	accountAddress: any;
	shop: any;
	product: any;
	blockchain: any;
	stack: IStacks;
}

export interface IRequestData {
	sku: Isku;
	shop: any;
	deployedContracts: any;
}

interface IRequest {
	params: IRequestData;
	accountAddress: any;
	stack: IStacks;
}

export interface IAcceptData {
	accept: boolean;
	shop: any;
	deployedContracts: any;
	sku: any;
	recordData?: any;
}

interface IAccept {
	params: IAcceptData;
	accountAddress: any;
	stack: IStacks;
}

const web3Model = {
	record: async ({
		params: { data, product, sku, imageUrl, shop },
		accountAddress,
		stack: { isRequestPending, openContractCall, stxAddress },
	}: Irecord) => {
		return new Promise<void>(async (resolve: any, reject) => {
			try {
				const chain =
					product.product_type === 'DIGITAL'
						? product.digitalDetail.chain
						: data.blockchain;
				let deployedContract;
				let targetChainContract;
				if (shop.deployedContracts) {
					targetChainContract = shop.deployedContracts.find(
						(contract) => contract.type === chain
					);
					if (!targetChainContract) {
						if (chain === 'SKALE') {
							const req =
								await getDeployPermission();
							if (req.status !== 201) {
								console.log(
									`Getting permission failed, reason: ${req.data}`
								);
								throw new Error(
									'Permission denied'
								);
							}
						}
						deployedContract =
							await getNetworkProvider(
								Chain[chain as string],
								Network[
									appDevelopment
										? 'TESTNET'
										: 'MAINNET'
								],
								accountAddress
							).deployShop(
								shop.name,
								`${SHOP_URL}/${shop.name}`,
								accountAddress,
								shop.logo,
								shop.description
							);
						await deployShopContractService({
							type: chain,
							...deployedContract,
						});
					}
				} else {
					if (chain === 'SKALE') {
						const req = await getDeployPermission();
						if (req.status !== 201) {
							console.log(
								`Getting permission failed, reason: ${req.data}`
							);
							throw new Error(
								'Permission denied'
							);
						}
					}
					deployedContract = await getNetworkProvider(
						Chain[chain as string],
						Network[
							appDevelopment
								? 'TESTNET'
								: 'MAINNET'
						],
						accountAddress
					).deployShop(
						shop.name,
						`${SHOP_URL}/${shop.name}`,
						accountAddress,
						shop.logo,
						shop.description
					);
					await deployShopContractService({
						type: chain,
						...deployedContract,
					});
				}
				const commission = data.commission;
				const quantity: any = data.quantity;
				if (!data.royalty) data.royalty = 0;
				const dataDeploy: Ideploy = {
					data,
					deployHash: '',
					product,
					sku,
				};
				if (data.blockchain === 'STACKS') {
					// const query = await stacksRecord({
					// 	isRequestPending,
					// 	openContractCall,
					// 	params: {
					// 		price: sku.price * 100,
					// 		amount: product.product_type === 'PRINT_ON_DEMAND' ? quantity : sku.quantity,
					// 		commission,
					// 		productID: product?._id,
					// 		creator: stxAddress,
					// 		uri: 'record',
					// 	},
					// })
					// if (query) dataDeploy.deployHash = query.txId
				} else {
					const nftContract =
						targetChainContract?.deployedNFTAddress ||
						deployedContract.deployedNFTAddress;
					const shopAddress =
						targetChainContract?.deployedShopAddress ||
						deployedContract.deployedShopAddress;
					const currencyAddress =
						'0x0000000000000000000000000000000000000000';

					const products: RecordProduct[] = [];

					const beneficiaries: Beneficiary[] = [];
					if (product.product_type === 'PRINT_ON_DEMAND') {
						beneficiaries.push({
							isPercentage: false,
							value: sku.rawPrice * 100,
							wallet: droplink_wallet,
						});
					}

					const productType = ProductType.DIGITAL; // TODO: update this

					products.push({
						acceptsManageWallet: true,
						amount: quantity,
						commission: commission,
						royalty: data.royalty,
						image_url: imageUrl,
						beneficiaries: beneficiaries,
						currencyAddress: currencyAddress,
						description: product.description,
						price: sku.price * 100,
						productTitle: product.title,
						sku_id: sku._id,
						skuProperties: sku,
						type: productType,
					});

					const res = await recordModel.record({
						product,
						blockchain: data.blockchain,
						accountAddress,
						nftContract,
						shopAddress,
						products,
					});
					if (res)
						dataDeploy.deployHash =
							res.transactionHash;
				}

				await recordModel.deploy(dataDeploy);
				resolve(dataDeploy.deployHash);
			} catch (error) {
				reject(error);
			}
		});
	},

	recordBatch: async ({
		params,
		accountAddress,
		blockchain,
		product,
		shop,
		commission,
		royalty,
		stack: { isRequestPending, openContractCall, stxAddress },
	}: IrecordBatch) => {
		return new Promise<void>(async (resolve: any, reject) => {
			try {
				const chain =
					product.product_type === 'DIGITAL'
						? product.digitalDetail.chain
						: blockchain;
				let deployedContract;
				let targetChainContract;
				if (shop.deployedContracts) {
					targetChainContract = shop.deployedContracts.find(
						(contract) => contract.type === chain
					);
					if (!targetChainContract) {
						deployedContract =
							await getNetworkProvider(
								Chain[chain as string],
								Network[
									appDevelopment
										? 'TESTNET'
										: 'MAINNET'
								],
								accountAddress
							).deployShop(
								shop.name,
								`${SHOP_URL}/${shop.name}`,
								accountAddress,
								shop.logo,
								shop.description
							);
						await deployShopContractService({
							type: chain,
							...deployedContract,
						});
					}
				} else {
					deployedContract = await getNetworkProvider(
						Chain[chain as string],
						Network[
							appDevelopment
								? 'TESTNET'
								: 'MAINNET'
						],
						accountAddress
					).deployShop(
						shop.name,
						`${SHOP_URL}/${shop.name}`,
						accountAddress,
						shop.logo,
						shop.description
					);
					await deployShopContractService({
						type: chain,
						...deployedContract,
					});
				}
				const products: RecordProduct[] = [];

				const nftContract =
					targetChainContract?.deployedNFTAddress ||
					deployedContract.deployedNFTAddress;
				const shopAddress =
					targetChainContract?.deployedShopAddress ||
					deployedContract.deployedShopAddress;
				const currencyAddress =
					'0x0000000000000000000000000000000000000000';

				for (const data of params) {
					const prod = data;
					const quantity: any = prod.quantity;
					if (!royalty) royalty = 0;
					const beneficiaries: Beneficiary[] = [];
					if (product.product_type === 'PRINT_ON_DEMAND') {
						beneficiaries.push({
							isPercentage: false,
							value: prod.sku.rawPrice * 100,
							wallet: droplink_wallet,
						});
					}
					let productType = ProductType.DIGITAL; // TODO: update this
					if (product.product_type === 'PRINT_ON_DEMAND')
						productType = ProductType.POD;
					products.push({
						acceptsManageWallet: true,
						amount: quantity,
						commission: commission,
						royalty: royalty,
						image_url: prod.imageUrl,
						beneficiaries: beneficiaries,
						currencyAddress: currencyAddress,
						description: product.description,
						price: prod.sku.price * 100,
						productTitle: product.title,
						sku_id: prod.sku._id,
						skuProperties: prod.sku,
						type: productType,
					});
				}

				const dataDeploy: IdeployBatch = {
					blockchain,
					deployHash: '',
					product,
					royalty,
					commission,
				};

				const res = await recordModel.record({
					product,
					blockchain: blockchain,
					accountAddress,
					nftContract,
					shopAddress,
					products,
				});

				if (res) dataDeploy.deployHash = res.transactionHash;

				await recordModel.deployBatch(dataDeploy);

				resolve(dataDeploy.deployHash);
			} catch (error) {
				reject(error);
			}
		});
	},

	request: ({
		accountAddress,
		params: { sku, shop },
		stack: { isRequestPending, openContractCall, stxAddress },
	}: IRequest) => {
		return new Promise<any>(async (resolve: any, reject) => {
			try {
				const deployedContractAddress = sku.deployedShopAddress;
				const productId =
					sku?.recordData?.data?.details?.productId;
				const blockchain: string = sku?.recordData?.recordNetwork;
				const quantity = sku.recorded_quantity;
				if (!deployedContractAddress) {
					reject('Contract not deployed');
				}

				const shopAddress = deployedContractAddress;
				if (blockchain === 'STACKS') {
					// const request = await stacksRequest({
					// 	isRequestPending,
					// 	openContractCall,
					// 	params: {
					// 		amount: quantity,
					// 		commission: sku?.recordData?.data?.details?.commision,
					// 		id: parseInt(productId),
					// 		publisher: stxAddress,
					// 	},
					// })
					// resolve(request.txId)
				} else {
					const request = await getNetworkProvider(
						Chain[blockchain],
						Network[
							appDevelopment
								? 'TESTNET'
								: 'MAINNET'
						],
						accountAddress
					).publishRequest(productId, shopAddress);

					resolve(request.transactionHash);
				}
			} catch (error) {
				reject(error);
			}
		});
	},

	accept: ({
		accountAddress,
		params: { accept, shop, sku, recordData },
		stack: { isRequestPending, openContractCall },
	}: IAccept) => {
		return new Promise<any>(async (resolve, reject) => {
			try {
				const requestID = shop?.recordData?.details?.requestId;
				const blockchain: string = sku?.recordData?.recordNetwork;
				const deployShopContract = sku.deployedShopAddress;
				if (!deployShopContract) {
					reject('Contract not deployed');
				}
				let deployHash = null;
				if (blockchain === 'STACKS') {
					const request =
						await acceptModel.approveRequestStack({
							isRequestPending,
							openContractCall,
							params: {
								id: requestID,
								publisher: shop
									?.recordData
									?.details
									?.publisher,
							},
						});
					deployHash = request.txId;
					resolve(deployHash);
				} else if (blockchain === 'SOLANA') {
					const accept = await new SolanaProvider(
						Chain.SOLANA,
						Network.TESTNET
					)
						.setAddress(accountAddress)
						.setModal(new defaultModal())
						.approveRequest(shop, sku, recordData);
					deployHash = accept;
					resolve(deployHash);
				} else {
					//    approveRequest(requestId: Uint256, shopAddress: EthAddress): Promise<string>;
					const accept = await getNetworkProvider(
						Chain[blockchain],
						Network[
							appDevelopment
								? 'TESTNET'
								: 'MAINNET'
						],
						accountAddress
					).approveRequest(requestID, deployShopContract);
					deployHash = accept;
					resolve(deployHash);
				}
				await acceptModel.deploy({
					deployHash,
					accept,
					chain: blockchain,
					shop,
				});
			} catch (error) {
				reject(error);
			}
		});
	},
};

export default web3Model;
