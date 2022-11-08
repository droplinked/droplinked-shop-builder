export const convertAddressToArray = (ruleAddress) => {
  let addressArray = ruleAddress.replace(/\s+/g, "").split(";");
  addressArray = addressArray.filter((address) => {
    return address != "";
  });
  return addressArray;
};

export const convertArrayToAddress = (ruleArray) => {
  let addressString = ruleArray.join(";");
  addressString += ";";
  return addressString;
};
