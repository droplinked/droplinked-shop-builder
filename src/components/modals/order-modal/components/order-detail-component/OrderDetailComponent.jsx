import {
  Box,
  Flex,
  Text,
  VStack
} from "@chakra-ui/react";
import OrderDetailTable from "./components/table/OrderDetailTable";
import OrderDetailCost from "./components/table/parts/cost/OrderModalProduct";
import OrderChain from "./components/table/parts/chain/OrderChain";
import OrderModalPayment from "./components/table/parts/payment/OrderModalPayment";

const OrderDetailComponent = () => {

  return (
    <VStack align={"stretch"} color={"#FFF"}>
      <VStack align={"stretch"} spacing={10}>
        <Box><OrderDetailTable /></Box>
        <Box><OrderModalPayment /></Box>
        <Box><OrderDetailCost /></Box>
        {/* <Box><OrderChain /></Box> */}
      </VStack>

    </VStack>
  );
};

export default OrderDetailComponent;
