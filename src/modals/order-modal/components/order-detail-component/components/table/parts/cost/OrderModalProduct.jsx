import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { appDeveloment } from "lib/utils/app/variable";
import orderModalContext from "modals/order-modal/context";
import React, { useCallback, useContext, useMemo } from "react";

function OrderDetailCost() {
  const { order } = useContext(orderModalContext);

  const totalPrice = useMemo(() => {
    let total = order?.items?.reduce(
      (sum, product) => sum + product?.totalPriceItem,
      0
    );

    total += parseFloat(order?.shippingPrice);
    return total.toFixed(2);
  }, [order]);

  const textTypes = {
    typeA: {
      fontSize: { base: "sm", sm: "md" },
      fontWeight: "extrabold",
    },
    typeB: {
      fontSize: { base: "sm", sm: "md" },
      color: "lightGray",
    },
  };

  return (
    <VStack align={"stretch"} spacing={3}>
      {/* <HStack justifyContent={"space-between"}>
        <HStack>
          <Text {...textTypes.typeA}>Discount:</Text>
          <Text {...textTypes.typeB}>{appDeveloment ? "Ruleset, offer code" : ""}</Text>
        </HStack>
        <Box>$ 0.00</Box>
      </HStack> */}
      <HStack justifyContent={"space-between"}>
        <HStack>
          <Text {...textTypes.typeA}>Shipping:</Text>
          {/* <Text {...textTypes.typeB}>{appDeveloment ? "Express shipping" : ""}</Text> */}
        </HStack>
        <Box>
          <Text>$ {order?.shippingPrice}</Text>
        </Box>
      </HStack>
      <HStack justifyContent={"space-between"}>
        <HStack>
          <Text fontSize={{ base: "sm", sm: "md" }} fontWeight={"extrabold"}>
            Order Tax:
          </Text>
        </HStack>
        <Box>$ 0.00</Box>
      </HStack>
      <HStack justifyContent={"space-between"}>
        <HStack>
          <Text fontSize={{ base: "sm", sm: "2xl" }} fontWeight={"extrabold"}>
            Total Cost
          </Text>
        </HStack>
        <Box>
          <Text fontSize={{ base: "sm", sm: "2xl" }} fontWeight={"extrabold"}>
            $ {totalPrice}
          </Text>
        </Box>
      </HStack>
    </VStack>
  );
}

export default OrderDetailCost;
