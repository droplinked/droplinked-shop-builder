import { Text, Box, Flex } from "@chakra-ui/react";
import { ORDER_TYPES } from "../../../constant/order.types";
import { useApi } from "../../../hooks/useApi/useApi";
import { useMemo, useState, useEffect } from "react";

import { getOrders } from "../../../apis/orderApiService";

import { sortArrayBaseCreateTime } from "../../../utils/sort.utils/sort.utils";

import OrderComponent from "./components/order-component/OrderComponent";
import LoadingComponent from "../../../components/shared/loading-component/LoadingComponent";
import DropdownComponent from "./components/dropdown-component/Dropdown/DropdownComponent";

export default function OrderPage() {
  const [filter, setFilter] = useState("All");
  const [orders, setOrders] = useState(null);
  // const { orders } = useOrder()
  // const navigate = useNavigate();
  const { getApi } = useApi();
  //const isRegisteredProducer = useSelector(selectIsActiveProducer);

  const updateOrder = async () => {
    let result = await getApi(getOrders());
    if (result) {
      result = result.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setOrders(result);
    }
  };

  useEffect(() => {
    updateOrder();

    // if (isRegisteredProducer) {
    //   updateOrder();
    // } else {
    //   navigate("/");
    // }
  }, []);

  // const setTypesArray = () => {
  //   const arr = [
  //     { id: "All", value: "All" },
  //     {
  //       id: ORDER_TYPES.WAITING_FOR_CONFIRMATION,
  //       value: "Waiting for confirmation",
  //     },
  //     { id: ORDER_TYPES.WAITING_FOR_PAYMENT, value: "Waiting for payment" },
  //     { id: ORDER_TYPES.PROCESSING, value: "Processing" },
  //     { id: ORDER_TYPES.SENT, value: "Sent" },
  //     { id: ORDER_TYPES.CANCELED, value: "Canceled" },
  //     { id: ORDER_TYPES.REFUNDED, value: "Refunded" },
  //   ];
  //   return arr;
  // };

  // let typesArray = useMemo(() => setTypesArray(), []);

  if (orders === null) {
    return <LoadingComponent />;
  }

  return (
    <Box w="100%" px={{ base: "20px", md: "80px" }}>
      <Box w="100%" maxW="700px" m="auto">
        <Text
          color="white"
          fontSize={{ base: "30px", md: "40px" }}
          fontWeight="600"
          textAlign="center"
          mb="40px"
        >
          Incoming orders
        </Text>

        {orders.map((order, i) => {
          return (
            <Box key={i} mb="30px">
              <OrderComponent updateOrder={updateOrder} order={order} />
            </Box>
          );
        })}

        {/* <Flex w="100%" justifyContent="center">
          <Box w={{ base: "100%", md: "40%" }} mb="40px">
            <DropdownComponent
              value={filter}
              pairArray={typesArray}
              placeholder={filter}
              change={(e) => {
                setFilter(e.target.value);
              }}
            />
          </Box>
        </Flex> */}

        {/* {filter == "All" ? (
          <>
            {orders.map((order, i) => {
              if (order.status == ORDER_TYPES.WAITING_FOR_CONFIRMATION)
                return (
                  <Box key={i} mb="30px">
                    <OrderComponent updateOrder={updateOrder} order={order} />
                  </Box>
                );
            })}
            {orders.map((order, i) => {
              if (order.status != ORDER_TYPES.WAITING_FOR_CONFIRMATION)
                return (
                  <Box key={i} mb="30px">
                    <OrderComponent updateOrder={updateOrder} order={order} />
                  </Box>
                );
            })}
          </>
        ) : (
          <>
            {orders.map((order, i) => {
              if (order.status == ORDER_TYPES.REFUNDED) {
                if (filter == ORDER_TYPES.CANCELED)
                  return (
                    <OrderComponent
                      updateOrder={updateOrder}
                      key={i}
                      order={order}
                    />
                  );
              } else {
                if (order.status == filter)
                  return (
                    <OrderComponent
                      updateOrder={updateOrder}
                      key={i}
                      order={order}
                    />
                  );
              }
            })}
          </>
        )} */}
      </Box>
    </Box>
  );
}
