import {
  Box,
  Text,
  VStack
} from "@chakra-ui/react";
import OrderDetailTable from "./components/table/OrderDetailTable";
import OrderDetailCost from "./components/table/parts/cost/OrderModalProduct";
import OrderDetailPayment from "./components/table/parts/payment/OrderModalProduct";

const OrderDetailComponent = () => {

  return (
    <VStack align={"stretch"} color={"#FFF"}>
      <Box>
        <Text
          fontFamily="Avenir Next"
          fontWeight="700"
          fontSize="18px"
          color="lightGray"
          textAlign="center"
          mb="36px"
        >
          Order Details
        </Text>
      </Box>
      <VStack align={"stretch"} spacing={10}>
        <Box><OrderDetailTable /></Box>
        <Box><OrderDetailCost /></Box>
        <Box><OrderDetailPayment /></Box>
      </VStack>

    </VStack>
  );
};

export default OrderDetailComponent;
