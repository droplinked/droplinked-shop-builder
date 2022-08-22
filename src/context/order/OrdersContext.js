import { createContext, useState, useEffect, useContext } from "react";
import { useProfile } from "../profile/ProfileContext";
import { getOrdersList, SeenOrder } from "../../api/producer/Orders-api";
import { sortArrayBaseCreateTime } from "../../utils/sort.utils/sort.utils";

export const OrderContext = createContext();

export default function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);

  const { profile, isRegisteredProducer } = useProfile();
  
  let token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    if (profile == null || token == null) return;

    if (isRegisteredProducer()) {
      updateOrder();
    }
  }, [profile]);

  const updateOrder = async () => {
    let result = await getOrdersList();

    if (result != null) {
      result = sortArrayBaseCreateTime(result);
      setOrders(result);
    }
  };

  const seenOrder = async (orderId) => {
    let result = await SeenOrder(orderId);
    if (result == true) updateOrder();
    else console.log(result);
  };

  const ContextValue = {
    seenOrder,
    updateOrder,
    orders,
  };

  return (
    <OrderContext.Provider value={ContextValue}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrder = () => {
  const ctx = useContext(OrderContext);

  return {
    ...ctx,
  };
};
