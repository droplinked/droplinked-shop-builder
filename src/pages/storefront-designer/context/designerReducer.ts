import { DesignerActions, StateDesignPage } from "../types/designerTypes";

/**
 * Reducer for storefront designer state management
 * Handles state updates for shop data and general state changes
 */
export function designerReducer(
  state: StateDesignPage, 
  action: DesignerActions
): StateDesignPage {
  switch (action.type) {
    case "updateState":
      return {
        ...state,
        ...action.params,
      };
      
    case "updateShop": {
      const { shopDesign, ...otherParams } = action.params;
      
      return {
        ...state,
        shop: shopDesign
          ? {
              ...state.shop,
              shopDesign: {
                ...state.shop?.shopDesign,
                ...shopDesign,
              },
            }
          : {
              ...state.shop,
              ...otherParams,
            },
      };
    }
      
    default:
      return state;
  }
}

export default designerReducer;
