

export const sumItems = cartItems => {
    
    let itemCount = cartItems.reduce((total, product) => total + product.quantity, 0);
    let total = cartItems.reduce((total, product) => total + parseFloat(product.variants[0].price) * product.quantity, 0).toFixed(2);
    return { itemCount, total }
}

export const CartReducer = (state, action) => {
    
    switch (action.type) {

        case "ADD_ITEM":
            if (!state.cartItems.find(item => item.product_id === action.payload.product.product_id)) {
                console.log("add item click");
                state.cartItems.push({
                    ...action.payload.product,
                    quantity:  action.payload.qun
                })
            } 
            
            return {
                ...state,
                ...sumItems(state.cartItems),
                cartItems: [...state.cartItems]
            }

        case "REMOVE_ITEM":
            return {
                ...state,
                ...sumItems(state.cartItems.filter(item => item.product_id !== action.payload.product_id)),
                cartItems: [...state.cartItems.filter(item => item.product_id !== action.payload.product_id)]
            }

        case "INCREASE":
            state.cartItems[state.cartItems.findIndex(item => item.product_id === action.payload.product.product_id)].quantity += action.payload.qun
            return {
                ...state,
                ...sumItems(state.cartItems),
                cartItems: [...state.cartItems]
            }

        case "DECREASE":
            state.cartItems[state.cartItems.findIndex(item => item.product_id === action.payload.product_id)].quantity--
            return {
                ...state,
                ...sumItems(state.cartItems),
                cartItems: [...state.cartItems]
            }

        case "CHECKOUT":
            return {
                cartItems: [],
                checkout: true,
                ...sumItems([]),
            }

        case "CLEAR":
                return {
                    cartItems: [],
                    ...sumItems([]),
                }
        default:
            return state

    }
}