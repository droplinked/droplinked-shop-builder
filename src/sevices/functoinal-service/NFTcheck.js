import axios from 'axios';
//pricipal    address
//asset_identifiers     address
//limit    1
//offset     0

const fetchPrincipalNFTs = (principal, asset_identifiers, limit, offset) => {
    const baseURL = "https://stacks-node-api.mainnet.stacks.co/"
    const url = "extended/v1/tokens/nft/holdings"
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
    return axios.get("/extended/v1/tokens/nft/holdings", {
        baseURL: "https://stacks-node-api.mainnet.stacks.co/",
        params: {
            principal,
            limit,
            offset,
        },
    })
}

const checkRules = async(principal, rules) => {
    const limit = 200
    let offset = 0
        //  console.log(rules);
    const results = (await getTokens(principal, limit, offset)).data
        // console.log(results)

    const holdings = Array.from(
        new Set([...results.results.map((result) => result.asset_identifier)])
    )

    for (let rIndex = 0; rIndex <= rules.length - 1; rIndex++) {
        const rule = rules[rIndex]
        for (let hIndex = 0; hIndex <= holdings.length - 1; hIndex++) {
            const holding = holdings[hIndex]
            if (holding.includes(rule)) return true
        }
    }
    return false
}

export { fetchPrincipalNFTs, checkRules }