import axios from "axios";

/**
 * principal         -> address
 * asset_identifiers -> [address]
 * limit             -> max number of tokens to fetch
 * offset            -> index of first tokens to fetch
 */

const fetchPrincipalNFTs = (principal, assetIdentifiers, limit, offset) => {
  const url = "extended/v1/tokens/nft/holdings";
  return axios
    .get(url, {
      baseURL: "https://stacks-node-api.mainnet.stacks.co/",
      params: {
        principal,
        assetIdentifiers,
        limit,
        offset,
      },
    })
    .then((response) => {
      return response.data.results.map((nft) => nft.asset_identifier);
    });
};

const getMaxDiscount = async (principal, ruleset) => {
  const limit = 200;
  const offset = 0;
  const identifiers = ruleset.map((rule) => rule.address);
  const NFTsOwned = await fetchPrincipalNFTs(
    principal,
    identifiers,
    limit,
    offset
  );

  const maxDiscountObject = {
    address: "",
    type: "",
    discountPercentage: 0,
    description: "",
  };
  for (let i = 0; i < NFTsOwned.length; i += 1) {
    const nft = NFTsOwned[i];
    const rule = ruleset.find((item) => item.address === nft);
    if (rule) {
      if (rule.discountPercentage > maxDiscountObject.discountPercentage) {
        maxDiscountObject.address = rule.address;
        maxDiscountObject.type = rule.type;
        maxDiscountObject.discountPercentage = rule.discountPercentage;
        maxDiscountObject.description = rule.description;
      }
    }
  }
  if (maxDiscountObject.address == "") return null;
  else return maxDiscountObject;
};

export { fetchPrincipalNFTs, getMaxDiscount };
