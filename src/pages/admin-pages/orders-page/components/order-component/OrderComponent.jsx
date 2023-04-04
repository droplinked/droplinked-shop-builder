
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Text,
  Box,
  Flex,
  useDisclosure,
  Stack,
  Skeleton,
  keyframes,
} from "@chakra-ui/react";
import { ORDER_TYPES } from "../../../../../constant/order.types";
import { getStatus , getTotalPrice } from "./order-component-utils"
import {
  selectIsCustomer,
} from "../../../../../store/profile/profile.selector";
import {
  OrderWrapper,
  OrderId,
  QuantityText,
  ProductImage,
  OrderStatus,
} from "./OrderComponent-style";
import OrderModal from "../../../../../modals/order/OrderModal";
//import BasicButton from "../BasicButton/BasicButton";

const animationKeyframes = keyframes`
0% { color: primary; }
40% { color: #fff; }
80% { color: primary; }
100% { color: primary; }
`;

const animation = `${animationKeyframes} 2s ease infinite`;

export default function OrderComponent({ updateOrder, order }) {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const isCustomer = useSelector(selectIsCustomer);
  const navigate = useNavigate();

  const getQuantity = () => {
    let quantity = 0;
    order.items.forEach((item) => (quantity += item.quantity));
    return quantity;
  };

  const imageUrl = (item) => item.product.media[0].url;
    // order.type == SHOP_TYPES.SHOPIFY
    //   ? item.image_url
    //   : item.product.media[0].url;

  const animationCondition = () => {
    const status = order.status;

    if (isCustomer) {
      if (status == ORDER_TYPES.WAITING_FOR_PAYMENT) return true;
      else return false;
    } else {
      if (status == ORDER_TYPES.WAITING_FOR_CONFIRMATION) return true;
      else return false;
    }
  };

  // const paynow = (event) => {
  //   event.stopPropagation();
  //   //    navigate(`/payment?CurrentOrderId=${order._id}&price=${parseFloat(order.totalPrice).toFixed(2)}`)
  //   let payOrder = {
  //     _id: order._id,
  //     totalPrice: parseFloat(order.totalPrice).toFixed(2),
  //   };

  //   sessionStorage.setItem("payOrder", JSON.stringify(payOrder));
  //   navigate(`/payment`);
  // };

  return (
    <OrderWrapper onClick={onOpen}>
      {order.items.length > 0 ? (
        <Box pos="relative">
          {/* date and total price */}
          <Flex justifyContent="space-between">
            {/* <DateText>Date: {calculateHowTimePassed(order.createdAt)}</DateText> */}
            <OrderId>Order id: {order._id}</OrderId>
          </Flex>
          {/* date and total price */}
          <Flex justifyContent="space-between">
            <QuantityText mb={{ base: "10px", md: "20px" }}>
              Quantity: {getQuantity()} item
            </QuantityText>
            <QuantityText>Total price: ${getTotalPrice(order)}</QuantityText>
          </Flex>

          {/* images */}
          <Flex mb="10px">
            {order.items.map((item, i) => {
              if (i < 4) return <ProductImage key={i} src={imageUrl(item)} />;
            })}
          </Flex>
          {/* images */}

          {/* status */}
          <Flex w="100%" justifyContent="space-between">
            <OrderStatus animation={animationCondition() && animation}>
              {getStatus(order.status)}
            </OrderStatus>
          </Flex>
          {/* status */}
        </Box>
      ) : (
        <Stack>
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      )}
      {order.items.length > 0 && (
        <OrderModal updateOrder={updateOrder} order={order} show={isOpen} close={onClose} />
      )}
    </OrderWrapper>
  );
}

   {/* {order.status == ORDER_TYPES.WAITING_FOR_PAYMENT && (
            <Box
              pos="absolute"
              w={{ base: "120px", md: "160px" }}
              h={{ base: "25px", md: "40px" }}
              right="0px"
              bottom="0px"
            >
              <BasicButton onClick={paynow}>Pay now</BasicButton>
            </Box>
          )} */}