import { createContext, useState, useEffect ,useContext} from "react";
import { useProfile } from "../profile/ProfileContext";
import { BasicURL } from "../../sevices/functoinal-service/CallApiService";

import axios from "axios";

export const OrderContext = createContext();

export default function OrderContextProvider({ children }) {
   const [orders, setOrders] = useState([]);

  const { profile } = useProfile();
  let token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    if (profile == null || token == null) return;
    if (profile.type != "PRODUCER") return;

    updateOrder()
    setInterval(updateOrder, 60000);
  }, [profile]);


  const updateOrder = () => {
    axios
      .get(`${BasicURL}/producer/order`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((e) => setOrders(e.data.data.orders))
      .catch((e) => console.log(e.response.data));
  };


  const seenOrder = (orderId) => {
    axios
      .post(`${BasicURL}/producer/order/seen/${orderId}`,{}
      , {
        headers: { Authorization: "Bearer " + token },
      })
      .then((e) =>updateOrder())
      .catch((e) => console.log(e.response.data));
  }

  //const cancelUpdater = () => {};

  const ContextValue = {
    seenOrder,
    orders
  };

  return (
    <OrderContext.Provider value={ContextValue}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrder = () => {
   
  const ctx = useContext(OrderContext)

  return {
      ...ctx
  }
}
