import { createContext, useState } from "react";
import { BasicURL } from "../functoinal-service/CallApiService";
import { useToasty } from "../hooks/useToastify";

import axios from "axios";

export const AddressContext = createContext();

export default function AddressContextProvider({ children }) {
  const [addressList, setAddressList] = useState([]);

  const { successToast, errorToast } = useToasty();

  let token = JSON.parse(localStorage.getItem("token"));

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

    return flag;
  };

  const contextValues = {
    addAddress,
    addressList,
  };

  return (
    <AddressContext.Provider value={contextValues}>
      {children}
    </AddressContext.Provider>
  );
}
