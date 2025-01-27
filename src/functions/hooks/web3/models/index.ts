import { Chain, ChainWallet, DeployShopResponse, DropWeb3, Network, ProductType, Web3Actions, toEthAddress } from 'droplinked-web3';
import { Isku } from 'lib/apis/product/interfaces';
import { deployShopContractService, getDeployPermission } from 'lib/apis/shop/shopServices';
import useAppStore from 'lib/stores/app/appStore';
import { SHOP_URL, appDevelopment } from 'lib/utils/app/variable';
import acceptModel from './module/accept/acceptModel';
import recordModel, { IStacks, Ideploy, IdeployBatch } from './module/record/recordModel';

export type RecordProduct = {
	sku_id: string;
	skuProperties: any;
	productTitle: string;
	description: string;
	image_url: string;
	price: number;
	amount: number;
	commission: number;
	type: ProductType;
	acceptsManageWallet: boolean;
	royalty: number;
	currencyAddress: string;
};

const updateShopDeployedContracts = (deployedContracts) => {
	const { shop, updateState } = useAppStore.getState();
	updateState({ key: 'shop', params: { ...shop, deployedContracts } });
};

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
				const web3 = new DropWeb3(
					appDevelopment ? Network.TESTNET : Network.MAINNET
				);
				let deployedContract: DeployShopResponse;
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
									"Permission denied, make sure you've connected your skale wallet"
								);
							}
						}
						const chainInstance = web3.web3Instance({
							method: Web3Actions.DEPLOY,
							chain: Chain[chain as string],
							preferredWallet:
								ChainWallet.Metamask,
							userAddress: accountAddress,
						});
						deployedContract =
							await chainInstance.deployShop({
								shopAddress: `${SHOP_URL}/${shop?.name}`,
								shopDescription:
									shop?.description,
								shopLogo: shop?.logo,
								shopName: shop?.name,
							});
						const { data } =
							await deployShopContractService({
								type: chain,
								transaction_id:
									deployedContract.transactionHash,
								...deployedContract,
							});
						updateShopDeployedContracts(data);
					}
				} else {
					if (chain === 'SKALE') {
						const req = await getDeployPermission();
						if (req.status !== 201) {
							console.log(
								`Getting permission failed, reason: ${req.data}`
							);
							throw new Error(
								"Permission denied, make sure you've connected your skale wallet"
							);
						}
					}
					const chainInstance = web3.web3Instance({
						method: Web3Actions.DEPLOY,
						chain: Chain[chain as string],
						preferredWallet: ChainWallet.Metamask,
						userAddress: accountAddress,
					});
					deployedContract = await chainInstance.deployShop(
						{
							shopAddress: `${SHOP_URL}/${shop?.name}`,
							shopDescription:
								shop?.description,
							shopLogo: shop?.logo,
							shopName: shop?.name,
						}
					);

					const { data } = await deployShopContractService({
						type: chain,
						transaction_id:
							deployedContract.transactionHash,
						...deployedContract,
					});
					updateShopDeployedContracts(data);
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
					//  isRequestPending,
					//  openContractCall,
					//  params: {
					//      price: sku.price * 100,
					//      amount: product.product_type === 'PRINT_ON_DEMAND' ? quantity : sku.quantity,
					//      commission,
					//      productID: product?._id,
					//      creator: stxAddress,
					//      uri: 'record',
					//  },
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

					const productType = ProductType.DIGITAL; // TODO: update this

					products.push({
						acceptsManageWallet: true,
						amount: quantity,
						commission: commission,
						royalty: data.royalty,
						image_url: imageUrl,
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
				const web3 = new DropWeb3(
					appDevelopment ? Network.TESTNET : Network.MAINNET
				);
				if (chain === 'SKALE') {
					const req = await getDeployPermission();
					if (req.status !== 201) {
						console.log(
							`Getting permission failed, reason: ${req.data}`
						);
						throw new Error(
							"Permission denied, make sure you've connected your skale wallet"
						);
					}
				}
				let deployedContract: DeployShopResponse;
				let targetChainContract;
				if (shop.deployedContracts) {
					targetChainContract = shop.deployedContracts.find(
						(contract) => contract.type === chain
					);
					if (!targetChainContract) {
						const chainInstance = web3.web3Instance({
							method: Web3Actions.DEPLOY,
							chain: Chain[chain as string],
							preferredWallet:
								ChainWallet.Metamask,
							userAddress: accountAddress,
						});
						deployedContract =
							await chainInstance.deployShop({
								shopAddress: `${SHOP_URL}/${shop?.name}`,
								shopDescription:
									shop?.description,
								shopLogo: shop?.logo,
								shopName: shop?.name,
							});
						const { data } =
							await deployShopContractService({
								type: chain,
								transaction_id:
									deployedContract.transactionHash,
								...deployedContract,
							});
						updateShopDeployedContracts(data);
					}
				} else {
					const chainInstance = web3.web3Instance({
						method: Web3Actions.DEPLOY,
						chain: Chain[chain as string],
						preferredWallet: ChainWallet.Metamask,
						userAddress: accountAddress,
					});
					deployedContract = await chainInstance.deployShop(
						{
							shopAddress: `${SHOP_URL}/${shop?.name}`,
							shopDescription:
								shop?.description,
							shopLogo: shop?.logo,
							shopName: shop?.name,
						}
					);
					const { data } = await deployShopContractService({
						type: chain,
						transaction_id:
							deployedContract.transactionHash,
						...deployedContract,
					});
					updateShopDeployedContracts(data);
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
					let quantity: any = prod.quantity;
					if (!royalty) royalty = 0;
					let productType = ProductType.DIGITAL; // TODO: update this
					if (product.product_type === 'PRINT_ON_DEMAND') {
						productType = ProductType.POD;
						quantity = '1000000';
					}
					products.push({
						acceptsManageWallet: true,
						amount: quantity,
						commission: commission,
						royalty: royalty,
						image_url: prod.imageUrl,
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
				// const quantity = sku.recorded_quantity;
				if (!deployedContractAddress) {
					reject('Contract not deployed');
				}

				const shopAddress = deployedContractAddress;
				if (blockchain === 'STACKS') {
					// const request = await stacksRequest({
					//  isRequestPending,
					//  openContractCall,
					//  params: {
					//      amount: quantity,
					//      commission: sku?.recordData?.data?.details?.commision,
					//      id: parseInt(productId),
					//      publisher: stxAddress,
					//  },
					// })
					// resolve(request.txId)
				} else {
					const web3 = new DropWeb3(
						Network[
						appDevelopment
							? 'TESTNET'
							: 'MAINNET'
						]
					);
					const chainInstance = web3.web3Instance({
						method: Web3Actions.RECORD_AFFILIATE,
						preferredWallet: ChainWallet.Metamask,
						chain: Chain[blockchain],
						userAddress: accountAddress,
						nftContractAddress: '',
						shopContractAddress: shopAddress,
					});
					const request =
						await chainInstance.publishRequest(
							productId,
							toEthAddress(shopAddress)
						);
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
					//const web3 = new DropWeb3(Network.TESTNET);
					//const accept = await new SolanaProvider(
					//  Chain.SOLANA,
					//  Network.TESTNET
					//)
					//  .setAddress(accountAddress)
					//  .setModal(new defaultModal())
					//  .approveRequest(shop, sku, recordData);
					//deployHash = accept;
					//resolve(deployHash);
				} else {
					//    approveRequest(requestId: Uint256, shopAddress: EthAddress): Promise<string>;
					const web3 = new DropWeb3(
						Network[
						appDevelopment
							? 'TESTNET'
							: 'MAINNET'
						]
					);
					const chainInstance = web3.web3Instance({
						method: Web3Actions.RECORD_AFFILIATE,
						shopContractAddress: deployShopContract,
						nftContractAddress: '',
						userAddress: accountAddress,
						chain: Chain[blockchain],
						preferredWallet: ChainWallet.Metamask,
					});
					const accept = await chainInstance.approveRequest(
						requestID,
						deployShopContract
					);
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