export function productTechReducer(state, action) {
  switch (action.type) {
    case "initialize":
      return { ...action.payload };
    case "updateCollectionId":
      return { ...state, productCollectionID: action.payload };
    case "updateShippingType":
      return { ...state, shippingType: action.payload };
    case "updateShippingPrice":
      return { ...state, shippingPrice: action.payload };
    default:
      throw new Error();
  }
}
