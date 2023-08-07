import {
  Box,
  Flex,
  Text,
  VStack
} from "@chakra-ui/react";
import OrderDetailTable from "./components/table/OrderDetailTable";
import OrderDetailCost from "./components/table/parts/cost/OrderModalProduct";

const OrderDetailComponent = () => {

  return (
    <VStack align={"stretch"} color={"#FFF"}>
      <VStack align={"stretch"} spacing={10}>
        <Box><OrderDetailTable /></Box>
        <Box><OrderDetailCost /></Box>
        {/* <Box><OrderDetailPayment /></Box> */}
      </VStack>

    </VStack>
  );
};

export default OrderDetailComponent;
