export function productTechReducer(state, action) {
  switch (action.type) {
    case "updateCollectionId":
      return { ...state, productCollectionID: action.payload };
    case "updateShippingType":
      return { ...state, shippingType: action.payload };
    case "updateShippingPrice":
      return { ...state, shippingPrice: parseFloat(action.payload) };
    default:
      throw new Error();
  }
}
