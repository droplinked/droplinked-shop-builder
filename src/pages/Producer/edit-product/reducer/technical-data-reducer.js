export const TECH_REDUCER_TYPES = {
  INITIALIZE: "INITIALIZE",
  CHANGE_COLLECTION: "CHANGE_COLLECTION",
  CHANGE_SHIPPING_TYPE: "CHANGE_SHIPPING_TYPE",
  CHANGE_SHIPPING_PRICE: "CHANGE_SHIPPING_PRICE",
};

export function productTechReducer(state, action) {
  switch (action.type) {
    case TECH_REDUCER_TYPES.INITIALIZE:
      return { ...action.payload };
    case TECH_REDUCER_TYPES.CHANGE_COLLECTION:
      return { ...state, productCollectionID: action.payload };
    case TECH_REDUCER_TYPES.CHANGE_SHIPPING_TYPE:
      return { ...state, shippingType: action.payload };
    case TECH_REDUCER_TYPES.CHANGE_SHIPPING_PRICE:
      return { ...state, shippingPrice: action.payload };
    default:
      throw new Error();
  }
}
