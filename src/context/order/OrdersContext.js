import { createContext, useState, useEffect ,useContext} from "react";
import { useProfile } from "../profile/ProfileContext";
import { getOrdersList ,SeenOrder } from "../../api/producer/Orders-api"


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


  const updateOrder = async() => {
    let result = await getOrdersList()
    if(result != null) setOrders(result)
  };


  const seenOrder = async(orderId) => {

      let result = await SeenOrder(orderId)
      if(result == true)updateOrder()
      else console.log(result)

  }


  const ContextValue = {
    seenOrder,
    updateOrder,
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
