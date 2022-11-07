export const convertRuleArray = (rulesArray) => {
  return rulesArray.map((rule) => {
    let addressArrays = rule.addresses.replace(/\s+/g, "").split(";");
    addressArrays = addressArrays.filter((address) => {
      return address != "";
    });
    return {
      addresses: addressArrays,
      nftsCount: rule.nftsCount,
      discountPercentage: rule.discountPercentage,
      description: rule.description,
    };
    // if (rule.gated) {
    //   return {
    //     addresses: addressArrays,
    //     gated: rule.gated,
    //     description: rule.description,
    //   };
    // } else {
    //   return {
    //     addresses: addressArrays,
    //     gated: rule.gated,
    //     nftsCount: rule.nftsCount,
    //     discountPercentage: rule.discountPercentage,
    //     description: rule.description,
    //   };
    // }
  });
};
