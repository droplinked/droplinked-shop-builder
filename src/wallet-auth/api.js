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

export const hasToken = async (principal, token) => {
	const response = await getAccountBalances(principal)
	const nfts = response.data.non_fungible_tokens
	const tokens = []
	for (const key in nfts)
		tokens.push(key)
	return tokens.filter(value => value.includes(token)).length != 0
}
