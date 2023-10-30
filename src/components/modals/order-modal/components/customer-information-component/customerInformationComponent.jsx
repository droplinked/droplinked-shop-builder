import {
  Box,
  VStack,
  HStack,
  Flex,
} from "@chakra-ui/react";
import { useCallback, useContext, useMemo } from "react";
import { convertCustomerInformation, convertOrderInformation } from "./utils";
import orderModalContext from "components/modals/order-modal/context";
import AppTypography from 'components/common/typography/AppTypography';
import AppIcons from "assest/icon/Appicons";
import classes from './style.module.scss'

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
  console.log("customer_array", customer_array);
  return (
    <>
      {customer_array && customer_array.length ? (
        <VStack align={"stretch"} color="#C2C2C2">
          <Box textAlign={"center"} marginBottom={7}>
            <AppTypography size="18px" weight="bolder">Order Details</AppTypography>
          </Box>

          <VStack align="stretch" spacing="24px" paddingBottom={5}>
            <Box><AppTypography size="16px" weight="bold" color="#FFF">Order Information</AppTypography></Box>
            <VStack align={"stretch"} spacing="18px">
              {order_array.map((item, key) => container(key, item.name, item.data))}
            </VStack>
            <Flex alignItems="center" gap="6px" color="#808080">
              <AppIcons.InfoIcon width="14px" height="14px" className={classes.iconInfo} />
              <AppTypography size="12px">To track the transaction status, click on your transaction ID.</AppTypography>
            </Flex>
          </VStack>

          <VStack align="stretch" spacing="24px">
            <Box><AppTypography size="16px" weight="bold" color="#FFF">Customer Information</AppTypography></Box>
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
