import { Flex } from "@chakra-ui/react";
import AppModal from 'components/common/modal/AppModal';
import { IgetOrderService } from "lib/apis/order/interfaces";
import { getOrderService } from "lib/apis/order/services";
import React, { useEffect } from "react";
import { useMutation } from "react-query";
import orderModalContext from "./parts/context";
import CustomerInformation from "./parts/customer-information/CustomerInformation";
import ModalSkeleton from "./parts/modal-skeleton/ModalSkeleton";
import OrderDetails from "./parts/order-details/OrderDetails";
import OrderInformation from "./parts/order-information/OrderInformation";
import OrderItems from "./parts/order-items/OrderItems";

export default function OrderModal({ orderID, show, close }) {
  const { mutate, isLoading, data } = useMutation((params: IgetOrderService) => getOrderService(params))

  useEffect(() => mutate({ orderID }), [orderID])

  return (
    <orderModalContext.Provider value={{ order: data?.data?.data }}>
      <AppModal open={show} isCentered={false} close={close} size="3xl" contentProps={{ padding: 9 }} title={"Order Details"}>
        <Flex justifyContent="center">
          {isLoading ? <ModalSkeleton /> : (
            <Flex direction={"column"} gap={"36px"} width={"100%"}>
              <OrderInformation />
              <CustomerInformation />
              <OrderDetails />
              <OrderItems />
            </Flex>
          )}
        </Flex>
      </AppModal>
    </orderModalContext.Provider >
  )
}
