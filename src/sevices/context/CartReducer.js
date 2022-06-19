export const ItemCounter = (state) => {
  let itemTotal = 0;
  if (Object.keys(state).length === 0 ) return 0;
    state.marchs.forEach((item) => {
      itemTotal += item.quantity;
    }, 0);
  return itemTotal;
};


export const totalPrice = (state) => {
  let total = 0;
  if (Object.keys(state).length === 0 ) return 0;
    state.marchs.forEach((item) => {
      total += (item.quantity * item.price);
    }, 0);

  return total;
};
// add product structure
// {
//   shopName:"bedishop" ,
//   merch : {
//       skuID:skuID,
//       quantity :quantity ,
//       price : price ,
//       title:product.title ,
//       image:product.media[0].url
//   }
// }

export const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      let lastArray = {};
      // first merch
      if (Object.keys(state).length === 0 ) {
        let newCart = {
          shopName: action.payload.shopName,
          marchs: [{ ...action.payload.merch }],
        };
        lastArray = newCart;
      } else {
        // another shop
        if (state.shopName != action.payload.shopName) {
          let newCart = {
            shopName: action.payload.shopName,
            marchs: [{ ...action.payload.merch }],
          };
          lastArray = newCart;
        } else {
          // same shop
          let found = state.marchs.find(
            (item) => item.skuID == action.payload.merch.skuID
          );
          let lastMerchs = [];
          if (found == undefined) {
            lastMerchs = state.marchs.map((item) => item);
            lastMerchs.push(action.payload.merch);
          } else {
            lastMerchs = state.marchs.map((item) =>
              item.skuID == action.payload.merch.skuID
                ? {
                    ...item,
                    quantity: item.quantity + action.payload.merch.quantity,
                  }
                : { ...item }
            );
          }
          let newCart = {
            shopName: action.payload.shopName,
            marchs: lastMerchs,
          };
          lastArray = newCart;
        }
      }
      return { ...lastArray };

    // case "INCREASE":
    //   // state.cartItems[state.cartItems.findIndex(item => item.product_id === action.payload.product.product_id)].quantity += action.payload.qun
    //   let lastArray = [];
    //   lastArray.push(...state);

    //   let find = lastArray.find((e) => {
    //     return e.variant.id == action.payload.variant.id;
    //   });
    //   if (find != undefined) {
    //     lastArray = lastArray.filter((item) => {
    //       if (item.variant.id == action.payload.variant.id) {
    //         item.amount += action.payload.amount;
    //       }
    //       return item;
    //     });
    //   } else {
    //     lastArray.push(action.payload);
    //   }
    //   console.log(lastArray);
    //   localStorage.setItem("shopping_cart", JSON.stringify(lastArray));
    //   return lastArray;

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
