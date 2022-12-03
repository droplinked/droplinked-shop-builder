export function productIntroReducer(state, action) {
  switch (action.type) {
    case "updateTitle":
      return { ...state, title: action.payload };
    case "updateDescription":
      return { ...state, description: action.payload };
    case "updateMedia":
      return { ...state, media: action.payload };

    //   case "updateSku":
    //     return { ...action.payload };
    //   case "updatePrice":
    //     return { ...state, price: parseFloat(action.payload) };
    //   case "updateQuantity":
    //     return { ...state, quantity: parseInt(action.payload) };
    //   case "updateExternalId":
    //     return { ...state, externalID: action.payload };
    //   case "updateWeight":
    //     return { ...state, weight: parseFloat(action.payload) };
    //   case "updateLength":
    //     return {
    //       ...state,
    //       dimensions: { ...state.dimensions, length: parseFloat(action.payload) },
    //     };
    //   case "updateWidth":
    //     return {
    //       ...state,
    //       dimensions: { ...state.dimensions, width: parseFloat(action.payload) },
    //     };
    //   case "updateHeight":
    //     return {
    //       ...state,
    //       dimensions: { ...state.dimensions, height: parseFloat(action.payload) },
    //     };
    //   case "updateOptions":
    //     return {
    //       ...state,
    //       options: action.payload,
    //     };

    default:
      throw new Error();
  }
}
