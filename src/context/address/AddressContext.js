import { createContext, useState ,useContext} from "react";
import { BasicURL } from "../../sevices/functoinal-service/CallApiService";
import { useToasty } from "../../context/toastify/ToastContext";


import axios from "axios";

export const AddressContext = createContext();

export default function AddressContextProvider({ children }) {
  const [addressList, setAddressList] = useState([]);

  const { successToast, errorToast } = useToasty();

  let token = JSON.parse(localStorage.getItem("token"));

  const updateAddressList = () => {
    axios
      .get(`${BasicURL}/address`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((e) => {
        setAddressList(e.data.data.addressBooks);
      })
      .catch((e) => {
        console.log(e.response.data.reason);
      });
  };

  const addAddress = async (formDate) => {
    let flag;
    await axios
      .post(`${BasicURL}/address`, formDate, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((e) => {
        // console.log(e.data.data.addressBook);
        successToast("Address added successfully");
        flag = true;
      })
      .catch((e) => {
        errorToast(e.response.data.reason);
        flag = false;
      });
    updateAddressList();
    return flag;
  };


  const deleteAddress = async (addressId) => {

    await axios.delete(`${BasicURL}/address/${addressId}`,{
      headers: { Authorization: "Bearer " + token },
    })
    .then(e => successToast("Address deleted successfully"))
    .catch(e => errorToast(e.response.data.reason))

    updateAddressList();

  };


  const updateAddress = async (addressBook ,addressId) => {
    let flag;
    await axios
      .put(`${BasicURL}/address/${addressId}`, addressBook, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((e) => {
        successToast("Address updated successfully");
        flag = true;
      })
      .catch((e) => {
        errorToast(e.response.data.reason);
        flag = false;
      });
    updateAddressList();
    return flag;
  

  };


  const contextValues = {
    addAddress,
    updateAddress,
    updateAddressList,
    deleteAddress,
    addressList,
  };

  return (
    <AddressContext.Provider value={contextValues}>
      {children}
    </AddressContext.Provider>
  );
}

export const useAddress = () => {
   
  const atx = useContext(AddressContext)

  return {
      ...atx
  }
}