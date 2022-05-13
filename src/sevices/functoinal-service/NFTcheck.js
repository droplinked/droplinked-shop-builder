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
  export { fetchPrincipalNFTs }
  
//   fetchPrincipalNFTs(
//     "SPNWZ5V2TPWGQGVDR6T7B6RQ4XMGZ4PXTEE0VQ0S.marketplace-v3",
//     "SPQZF23W7SEYBFG5JQ496NMY0G7379SRYEDREMSV.Candy::candy",
//     1,
//     0
//   )
//     .then((results) => {
//       console.log(results)
//     })
//     .catch((reason) => {
//       console.log("could not fetch user nfts")
//     })
  