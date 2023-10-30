import { Box, Flex, VStack } from "@chakra-ui/react";
import AppModal from 'components/common/modal/AppModal';
import { IgetOrderService } from "lib/apis/order/interfaces";
import { getOrderService } from "lib/apis/order/services";
import React, { useEffect } from "react";
import { useMutation } from "react-query";
import BlockChainOrderModal from "./components/blockchain/BlockChainOrderModal";
import CustomerInformationComponent from "./components/customer-information-component/customerInformationComponent";
import OrderDetailComponent from "./components/order-detail-component/OrderDetailComponent";
import LoadingComponent from "components/common/loading-component/LoadingComponent";
import orderModalContext from "./context";

export default function OrderModal({ orderID, show, close }) {
  const { mutate, isLoading, data } = useMutation((params: IgetOrderService) => getOrderService(params))

  useEffect(() => mutate({ orderID }), [orderID])

  return (
    <orderModalContext.Provider value={{ order: data?.data?.data }}>
      <AppModal open={show} isCentered={false} close={close} size="3xl" contentProps={{ padding: 9 }}>
        <Flex justifyContent="center">
          {isLoading ? <LoadingComponent /> : (
            <VStack align="stretch" spacing="24px" width="100%">
              <CustomerInformationComponent />
              <OrderDetailComponent />
              {/* <BlockChainOrderModal /> */}
            </VStack>
          )}
        </Flex>
      </AppModal>
    </orderModalContext.Provider>
  )
}
