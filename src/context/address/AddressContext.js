// import { createContext, useState, useContext } from "react";
// import { useToasty } from "../../context/toastify/ToastContext";
// import {
//   getAddressList,
//   newAddress,
//   DeleteAddress,
//   UpdateAddress,
// } from "../../api/base-user/Address-api";


// export const AddressContext = createContext();

// export default function AddressProvider({ children }) {
//   const [addressList, setAddressList] = useState([]);

//   const { successToast, errorToast } = useToasty();

//   const updateAddressList = async () => {
//     let result = await getAddressList(errorToast);
//     if (result != null) {
//       setAddressList(result);
//     }
//   };

//   const addAddress = async (formDate) => {
//     let result = await newAddress(formDate);
//     if (result == true) {
//       successToast("Address added successfully");
//     } else {
//       errorToast(result);
//     }
//     await updateAddressList();
//     return result == true ? true : false;
//   };

//   const deleteAddress = async (addressId) => {
//     let result = await DeleteAddress(addressId);
//     if (result == true) successToast("Address deleted successfully");
//     else errorToast(result);

//     updateAddressList();
//   };

//   const updateAddress = async (addressBook, addressId) => {
//     let result = await UpdateAddress(addressBook , addressId);
//     if(result == true) successToast("Address updated successfully")
//     else errorToast(result)

//     updateAddressList()
//     return (result == true)? true : false

//   };

//   const contextValues = {
//     addAddress,
//     updateAddress,
//     updateAddressList,
//     deleteAddress,
//     addressList,
//   };

//   return (
//     <AddressContext.Provider value={contextValues}>
//       {children}
//     </AddressContext.Provider>
//   );
// }

// export const useAddress = () => {
//   const atx = useContext(AddressContext);

//   return {
//     ...atx,
//   };
// };
