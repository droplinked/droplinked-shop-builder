import { Flex } from "@chakra-ui/react";
import AppModal from 'components/common/modal/AppModal';
import useAppToast from "functions/hooks/toast/useToast";
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
  const { showToast } = useAppToast()
  const { mutate, isLoading, data } = useMutation((params: IgetOrderService) => getOrderService(params), {
    onError: (error) => {
      showToast({ message: (error as Error).message, type: "error" })
      close()
    }
  })

  useEffect(() => mutate({ orderID }), [orderID])

  return (
    <AppModal open={show} close={close} title={"Order Details"} size="3xl" isCentered={false} contentProps={{ paddingX: 2, paddingY: 5 }} >
      <Flex justifyContent="center">
        {isLoading ? <ModalSkeleton /> : (
          <orderModalContext.Provider value={{ order: data?.data?.data }}>
            <Flex direction={"column"} gap={"36px"} width={"100%"}>
              <OrderInformation />
              <CustomerInformation />
              <OrderDetails />
              <OrderItems />
            </Flex>
          </orderModalContext.Provider>
        )}
      </Flex>
    </AppModal>
  )
}
