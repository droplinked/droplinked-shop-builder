import { Flex } from "@chakra-ui/react";
import LoadingComponent from "components/common/loading-component/LoadingComponent";
import AppModal from 'components/common/modal/AppModal';
import { IgetOrderService } from "lib/apis/order/interfaces";
import { getOrderService } from "lib/apis/order/services";
import React, { useEffect } from "react";
import { useMutation } from "react-query";
import CustomerInformation from "./components/customer-information/CustomerInformation";
import OrderDetails from "./components/order-details/OrderDetails";
import OrderInformation from "./components/order-information/OrderInformation";
import OrderItems from "./components/order-items/OrderItems";
import orderModalContext from "./context";

export default function OrderModal({ orderID, show, close }) {
  const { mutate, isLoading, data } = useMutation((params: IgetOrderService) => getOrderService(params))

  useEffect(() => mutate({ orderID }), [orderID])

  return (
    <orderModalContext.Provider value={{ order: data?.data?.data }}>
      <AppModal open={show} isCentered={false} close={close} size="3xl" contentProps={{ padding: 9 }} title={"Order Details"}>
        <Flex justifyContent="center">
          {isLoading ? <LoadingComponent /> : (
            <Flex direction={"column"} gap={"36px"} width={"100%"}>
              <OrderInformation />
              <CustomerInformation />
              <OrderDetails title="Shipping" />
              <OrderDetails title="Tax" />
              <OrderDetails title="Gift Card" />
              <OrderDetails title="Affiliate" />
              <OrderDetails title="Commission" />
              <OrderDetails title="Payment Detail" />
              <OrderItems />
            </Flex>
          )}
        </Flex>
      </AppModal>
    </orderModalContext.Provider >
  )
}
