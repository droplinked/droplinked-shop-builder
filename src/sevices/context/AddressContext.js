// import { createContext, useReducer } from 'react';
// import { AddressReducer } from "./AddressReducer"

// export const AddressContext = createContext();

// export default function AddressContextProvider({children}){

//     const[addressList , dispatch] = useReducer(AddressReducer, []  ) 

//     const add = payload =>{
//         dispatch({type: 'ADD_ADDRESS', payload})
//     }

//     const contextValues = {
//         add,
//         addressList,
//     } 

//     return(
//         <AddressContext.Provider value={contextValues}>
//             { children }
//         </AddressContext.Provider>
//     )

// }