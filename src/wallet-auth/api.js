import axios from 'axios'

const MAIN_NET = 'https://stacks-node-api.mainnet.stacks.co'
const TEST_NET = 'https://stacks-node-api.testnet.stacks.co'

export const getUserAddress = userData => {
	const profile = userData.profile
	return {
		mainnet: profile.stxAddress.mainnet,
		testnet: profile.stxAddress.testnet,
	}
}

export const getAccountBalances = (principal, network = MAIN_NET) => {
	return axios({
		method: 'get',
		baseURL: network,
		url: `/extended/v1/address/${principal}/balances`,
	})
}