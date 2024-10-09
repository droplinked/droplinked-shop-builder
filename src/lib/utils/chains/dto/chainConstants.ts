import axios from 'axios';
import { Chain, ChainWallet, Network } from './chains';
import { ethers } from 'ethers';

export const testnetNetworks = [Chain.POLYGON];

async function getShopByteCode(chain: Chain, network: Network) {
	// TODO: needs refactor
	console.log({ chain, network });
	if (network === Network.TESTNET) {
		if (testnetNetworks.includes(chain)) {
			let result = String(
				(
					await axios.get(
						`https://apiv3dev.droplinked.com/storage/shopBytecodeV0`
					)
				).data.value
			);
			return result;
		} else {
			if (
				chain !== Chain.BINANCE &&
				chain !== Chain.SKALE &&
				chain !== Chain.REDBELLY
			) {
				throw new Error('Network not supported');
			}
		}
	}
	if (chain !== Chain.REDBELLY && chain !== Chain.SKALE) {
		let result = String(
			(
				await axios.get(
					`https://apiv3dev.droplinked.com/storage/shopByteCode`
				)
			).data.value
		);
		return result;
	} else {
		if (chain === Chain.REDBELLY) {
			let result = String(
				(
					await axios.get(
						`https://apiv3dev.droplinked.com/storage/shopBytecodeRedbelly`
					)
				).data.value
			);
			return result;
		} else if (chain === Chain.SKALE) {
			let result = String(
				(
					await axios.get(
						`https://apiv3dev.droplinked.com/storage/shopBytecodeSkale`
					)
				).data.value
			);
			return result;
		}
	}
}

async function getDeployerAddress(chain: Chain, network: Network) {
	const snakeCase = (str: string) =>
		str[0].toUpperCase() + str.slice(1).toLowerCase();
	let result = String(
		(
			await axios.get(
				`https://${
					network === Network.TESTNET ? 'apiv3dev' : 'apiv3'
				}.droplinked.com/storage/${snakeCase(
					Chain[chain]
				)}${snakeCase(Network[network])}ContractAddressDeployer`
			)
		).data.value
	);
	return result;
}

async function getProxyAddress(chain: Chain, network: Network) {
	const snakeCase = (str: string) =>
		str[0].toUpperCase() + str.slice(1).toLowerCase();
	let result = String(
		(
			await axios.get(
				`https://${
					network === Network.TESTNET ? 'apiv3dev' : 'apiv3'
				}.droplinked.com/storage/${snakeCase(
					Chain[chain]
				)}${snakeCase(Network[network])}ContractAddressProxy`
			)
		).data.value
	);
	return result;
}

async function getGasPrice(provider: ethers.providers.Web3Provider): Promise<BigInt> {
	return (await provider.getGasPrice()).toBigInt();
}

async function getFundsProxy(chain: Chain, network: Network) {
	const snakeCase = (str: string) =>
		str[0].toUpperCase() + str.slice(1).toLowerCase();

	let result = String(
		(
			await axios.get(
				`https://${
					network === Network.TESTNET ? 'apiv3dev' : 'apiv3'
				}.droplinked.com/storage/${snakeCase(
					Chain[chain]
				)}${snakeCase(Network[network])}ContractAddressFundsProxy`
			)
		).data.value
	); // example: BinanceContractAddress
	return result;
}

export {
	getShopByteCode,
	getDeployerAddress,
	getProxyAddress,
	getGasPrice,
	getFundsProxy,
};
