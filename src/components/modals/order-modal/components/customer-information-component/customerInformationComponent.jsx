import {
  Box,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useCallback, useContext, useMemo } from "react";

import { convertCustomerInformation, convertOrderInformation } from "./utils";
import orderModalContext from "components/modals/order-modal/context";
import AppTypography from 'components/common/typography/AppTypography';

const CustomerInformationComponent = () => {
  const { order } = useContext(orderModalContext)
  const order_array = useMemo(() => convertOrderInformation(order), [order]);
  const customer_array = useMemo(() => convertCustomerInformation(order), [order]);

  const container = useCallback((key, name, value) => (
    <HStack key={key} color={"lightGray"}>
      <Box width={{ base: "40%", sm: "20%" }}><AppTypography size="12px">{name}</AppTypography></Box>
      <Box width={{ base: "60%", sm: "80%" }}><AppTypography size="12px">{value}</AppTypography></Box>
    </HStack>
  ), []);

  return (
    <>
      {customer_array.length ? (
        <VStack align={"stretch"} color="#C2C2C2">
          <Box textAlign={"center"} marginBottom={7}>
            <AppTypography size="18px" weight="bolder">Order Details</AppTypography>
          </Box>

          <VStack align="stretch" spacing={3} paddingBottom={5}>
            <Box><AppTypography size="16px" weight="bold">Order Information</AppTypography></Box>
            <VStack align={"stretch"} spacing={3}>
              {order_array.map((item, key) => container(key, item.name, item.data))}
            </VStack>
          </VStack>

          <VStack align="stretch" spacing={3}>
            <Box><AppTypography size="16px" weight="bold">Customer Information</AppTypography></Box>
            <VStack align={"stretch"} spacing={3}>
              {customer_array.map((item, key) => container(key, item.name, item.data))}
            </VStack>
          </VStack>

        </VStack>
      ) : null
      }
    </>
  );
};
export default CustomerInformationComponent;
