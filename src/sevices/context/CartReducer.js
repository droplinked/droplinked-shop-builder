export const CartReducer = (state, action) => {
  switch (action.type) {
    case "INCREASE":
      // state.cartItems[state.cartItems.findIndex(item => item.product_id === action.payload.product.product_id)].quantity += action.payload.qun
      let lastArray = [];
      lastArray.push(...state);

      let find = lastArray.find((e) => {
        return e.variant.id == action.payload.variant.id;
      });
      if (find != undefined) {
        lastArray = lastArray.filter((item) => {
          if (item.variant.id == action.payload.variant.id) {
            item.amount += action.payload.amount;
          }
          return item;
        });
      } else {
        lastArray.push(action.payload);
      }
      console.log(lastArray);
      localStorage.setItem("shopping_cart", JSON.stringify(lastArray));
      return lastArray;

    // case "DECREASE":
    //     state.cartItems[state.cartItems.findIndex(item => item.product_id === action.payload.product_id)].quantity--
    //     return {
    //         ...state,
    //         ...sumItems(state.cartItems),
    //         cartItems: [...state.cartItems]
    //     }

    // case "CHECKOUT":
    //     return {
    //         cartItems: [],
    //         checkout: true,
    //         ...sumItems([]),
    //     }

    // case "CLEAR":
    //         return {
    //             cartItems: [],
    //             ...sumItems([]),
    //         }
    default:
      return state;
  }
};
