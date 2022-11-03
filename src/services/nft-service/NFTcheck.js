import axios from 'axios'
//pricipal    address
//asset_identifiers     address
//limit    1
//offset     0

const fetchPrincipalNFTs = (principal, asset_identifiers, limit, offset) => {
	const baseURL = 'https://stacks-node-api.mainnet.stacks.co/'
	const url = 'extended/v1/tokens/nft/holdings'

	return axios
		.get(url, {
			baseURL,
			params: {
				principal,
				asset_identifiers,
				limit,
				offset,
			},
		})
		.then((response) => {
			return response.data.results
		})
}

const getTokens = (principal, limit, offset) => {
	return axios.get('/extended/v1/tokens/nft/holdings', {
		baseURL: 'https://stacks-node-api.mainnet.stacks.co/',
		params: {
			principal,
			limit,
			offset,
		},
	})
}

const checkRules = async (principal, rules) => {
	const limit = 200
	let offset = 0

	const results = await fetchPrincipalNFTs(principal, rules, limit, offset)
	return results.length > 0
}

export { fetchPrincipalNFTs, checkRules }
