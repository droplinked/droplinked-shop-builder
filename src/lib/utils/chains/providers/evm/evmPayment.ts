import { ethers } from 'ethers';
import { Chain, ChainWallet, Network, getGasPrice } from '../../dto/chains';
import { getPaymentABI, getContractAddress } from './evmConstants';
import {
	ChainNotImplementedException,
	IChainPayment,
} from '../../../chains/chainProvider';

export let EVMPayment = async function (
	provider: any,
	chain: Chain,
	network: Network,
	address: string,
	data: IChainPayment,
	wallet: ChainWallet
) {
	const signer = provider.getSigner();
	if (chain === Chain.SKALE) {
		throw new ChainNotImplementedException(
			'Payments on skale are not supported in shop-builder'
		);
	}
	if (data.cartItems === undefined) {
		data.cartItems = [];
	}
	if (
		(await signer.getAddress()).toLocaleLowerCase() !==
		address.toLocaleLowerCase()
	)
		throw new Error('Address does not match signer address');
	const contract = new ethers.Contract(
		await getContractAddress(chain, network),
		await getPaymentABI(chain),
		signer
	);
	try {
		console.log(`
      data.tbdValues: ${data.tbdValues}
      data.tbdReceivers: ${data.tbdReceivers}
      data.cartItems: ${data.cartItems}
      "0x0000000000000000000000000000000000000000",
      data.chainLinkRoundId: ${data.chainLinkRoundId}
      data.memo: ${data.memo}
      data.totalPrice: ${Number(data.totalPrice)}
    `);

		if (chain === Chain.REDBELLY) {
			let tx = await contract.droplinkedPurchase(
				data.tbdValues,
				data.tbdReceivers,
				data.cartItems,
				'0x0000000000000000000000000000000000000000',
				data.chainLinkRoundId,
				data.memo,
				{
					value: data.totalPrice,
					gasLimit: 3e6,
				}
			);
			return { deploy_hash: tx.hash, cryptoAmount: data.totalPrice };
		}

		await contract.callStatic.droplinkedPurchase(
			data.tbdValues,
			data.tbdReceivers,
			data.cartItems,
			'0x0000000000000000000000000000000000000000',
			data.chainLinkRoundId,
			data.memo,
			{
				value: data.totalPrice,
			}
		);
		const gasPrice = await getGasPrice(provider);
		const gasEstimation = (
			await contract.estimateGas.droplinkedPurchase(
				data.tbdValues,
				data.tbdReceivers,
				data.cartItems,
				'0x0000000000000000000000000000000000000000',
				data.chainLinkRoundId,
				data.memo,
				{
					value: data.totalPrice,
				}
			)
		)
			.toBigInt()
			.valueOf();
		let tx = await contract.droplinkedPurchase(
			data.tbdValues,
			data.tbdReceivers,
			data.cartItems,
			'0x0000000000000000000000000000000000000000',
			data.chainLinkRoundId,
			data.memo,
			{
				gasLimit: (gasEstimation * BigInt(105)) / BigInt(100),
				gasPrice: gasPrice,
				value: data.totalPrice,
			}
		);
		return { deploy_hash: tx.hash, cryptoAmount: data.totalPrice };
	} catch (e: any) {
		console.log('e:', e);
		if (
			e.code.toString() === 'ACTION_REJECTED' ||
			(e.message !== undefined &&
				e.message === 'User cancelled transaction')
		) {
			console.error('Transaction Rejected');
			throw new Error('Transaction Rejected');
		}
		throw new Error("Something wen't wrong, check your balance");
		// const err = contract.interface.parseError(e);
		// console.log(err);
	}
};
