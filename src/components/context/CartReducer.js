

export const sumItems = cartItems => {
   
    let itemCount = cartItems.reduce((total, product) => total + product.quantity, 0);
    let total = cartItems.reduce((total, product) => total + parseFloat(product.variants[0].price) * product.quantity, 0).toFixed(2);
    return { itemCount, total }
}

export const CartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_ITEM":
            if (!state.cartItems.find(item => item.product_id === action.payload.product_id)) {
                state.cartItems.push({
                    ...action.payload,
                    quantity: 1
                })
            } 

            return {
                ...state,
                ...sumItems(state.cartItems),
                cartItems: [...state.cartItems]
            }
        // case "REMOVE_ITEM":
        //     return {
        //         ...state,
        //         ...sumItems(state.cartItems.filter(item => item.id !== action.payload.id)),
        //         cartItems: [...state.cartItems.filter(item => item.id !== action.payload.id)]
        //     }
        case "INCREASE":
            state.cartItems[state.cartItems.findIndex(item => item.product_id === action.payload.product_id)].quantity++;
            state ={...state ,
                cartItems : state.cartItems.map((item)=>{
                    if(item.product_id===action.payload.product_id)
                    {return{...item,quantity:(action.payload.quantity+1)}}
                    else{return item}
                    
            })
            }
            
            console.log("reducer method"); 
          // let cartItems= [...state.cartItems]
            return {
                ...state,
                ...sumItems(state.cartItems),
                cartItems: [...state.cartItems]
            }
        case "DECREASE":
            state.cartItems[state.cartItems.findIndex(item => item.id === action.payload.id)].quantity--
            return {
                ...state,
                ...sumItems(state.cartItems),
                cartItems: [...state.cartItems]
            }
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
        // default:
        //     return state

    }
}